<template>
    <div class="timer">
        <div v-if="runningTimeInMilliseconds">{{timeOutput}}</div>

        <button class="btn btn-primary" v-if="state === states.START || state === states.PAUSED"
                v-on:click="startTimer">{{(state === states.PAUSED ? 'Resume timer' : 'Start timer')}}
        </button>
        <button class="btn btn-warning" v-if="state === states.RUNNING" v-on:click="pauseTimer">Pause timer</button>
        <button class="btn btn-danger" v-if="state === states.RUNNING || state === states.PAUSED"
                v-on:click="stopTimer">Stop timer
        </button>

        <div class="d-inline-block" v-if="state === states.STOPPED">
            <button class="btn btn-danger" v-if="state === states.STOPPED" v-on:click="resetTimer">Reset timer</button>
            <div>
                <span>Started on {{formattedStartTime}}</span><br/>
                <span>Ended on {{formattedStopTime}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    const states = Object.freeze({
        START: 'START',
        RUNNING: 'RUNNING',
        PAUSED: 'PAUSED',
        STOPPED: 'STOPPED',
    });

    export default {
        name: "Timer",
        data: function () {
            return {
                states: states,
                state: null,
                startTime: null,
                stopTime: null,
                pauseTimes: [],
                interval: null,
                time: 0,
                timeOffset: 0,
                runningTimeInMilliseconds: 0
            }
        },
        created() {
            this.state = this.states.START;
        },
        methods: {
            startTimer: function () {
                if (this.state === this.states.START) {
                    this.startTime = new Date();
                } else {
                    const currentPauseTime = this.pauseTimes[this.pauseTimes.length - 1];
                    const resumeDate = new Date();
                    const pausedTime = resumeDate.getTime() - currentPauseTime.pausedAt.getTime();
                    currentPauseTime.resumedAt = resumeDate;
                    currentPauseTime.pausedTime = pausedTime;
                }

                this.time = new Date();
                this.state = this.states.RUNNING;
                this.increaseInterval();
            },
            pauseTimer: function () {
                clearInterval(this.interval);
                this.timeOffset += (new Date()).getTime() - this.time.getTime();

                this.state = this.states.PAUSED;
                this.pauseTimes.push({pausedAt: new Date()});
            },
            stopTimer: function () {
                clearInterval(this.interval);

                if (this.state === this.states.PAUSED) {
                    this.stopTime = this.pauseTimes[this.pauseTimes.length - 1].pausedAt;
                } else {
                    this.stopTime = new Date();
                }

                this.state = this.states.STOPPED

                this.$emit('timer-retrieve-time', {
                    startedAt: this.startTime,
                    stoppedAt: this.stopTime,
                    pauses: this.pauseTimes,
                    timeRun: this.timeRun,
                });
            },
            resetTimer: function () {
                clearInterval(this.interval);

                this.state = this.states.START;
                this.startTime = null;
                this.stopTime = null;
                this.pauseTimes = new Array();
                this.interval = null;
                this.time = 0;
                this.timeOffset = 0;
                this.runningTimeInMilliseconds = 0;

                this.$emit('timer-reset');
            },
            increaseInterval() {
                const self = this;

                this.interval = setInterval(function () {
                    if (self.state !== self.states.PAUSED) {
                        self.runningTimeInMilliseconds = self.timeOffset + (new Date()).getTime() - self.time.getTime();
                    }
                }, 10);
            }
        },
        computed: {
            formattedStartTime: function () {
                if (this.startTime instanceof Date) {
                    return this.startTime.toLocaleString('de-DE', {timeZone: 'UTC'});
                }
            },
            formattedStopTime: function () {
                if (this.stopTime instanceof Date) {
                    return this.stopTime.toLocaleString('de-DE', {timeZone: 'UTC'});
                }
            },
            timeRun: function () {
                if (this.startTime instanceof Date) {
                    let stopTime;

                    if (this.stopTime instanceof Date) {
                        stopTime = this.stopTime;
                    } else {
                        stopTime = new Date();
                    }

                    let pausedTime = 0;
                    this.pauseTimes.forEach(function (item) {
                        if (item.pausedTime) {
                            pausedTime += item.pausedTime;
                        }
                    });

                    return ((stopTime.getTime() - this.startTime.getTime()) - pausedTime) / 1000;
                }

                return 0;
            },
            timeOutput: function () {
                return (parseInt(this.runningTimeInMilliseconds / 1000) + "s " + (this.runningTimeInMilliseconds % 1000));
            }
        },
    }
</script>

<style scoped>

</style>
<template>
    <div class="time-tracker">
        <h2>Jira time tracker</h2>

        <timer v-on:timer-retrieve-time="retrieveTime($event)"></timer>

        <div class="container">
            <div class="row">
                <div class="col-sm-8">
                    <div class="mb-3">
                        <label :for="rootId + '_ticket'">Ticketnummer</label>
                        <input class="form-control" :id="rootId + '_ticket'" type="text" name="ticket"
                               v-model="ticket"/>
                    </div>
                    <div class="mb-3">
                        <label :for="rootId + '_notes'">Notizen</label>
                        <textarea class="form-control" :id="rootId + '_notes'" name="notes"
                                  v-model="description"></textarea>
                    </div>
                </div>
                <div class="col-sm-4">
                    <button class="btn btn-success" v-if="retrievedTimeEvent" v-on:click="reportTime">Report time</button>
                </div>
            </div>
        </div>

        <hr/>

        <time-line :time-list="timeList"></time-line>

        <hr/>

        <settings></settings>
    </div>
</template>

<script>
    import axios from "axios";
    import TimeLine from "./TimeLine";
    import Timer from "./Timer";
    import Settings from "./Settings";

    export default {
        name: "TimeTracker",
        components: {Settings, Timer, TimeLine},
        data: function () {
            return {
                retrievedTimeEvent: null,
                timeList: [],
                ticket: '',
                description: '',
                errors: {}
            }
        },
        methods: {
            retrieveTime: function (event) {
                this.retrievedTimeEvent = event;
            },
            reportTime: function () {
                if (this.ticket) {
                    this.timeList.push({
                        ticket: this.ticket,
                        description: this.description,
                        ...this.retrievedTimeEvent
                    });

                    this.retrievedTimeEvent = null;

                    /*axios.post('/report', event)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });*/
                }
            }
        },
        watch: {},
        computed: {
            rootId: function () {
                return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            }
        },
    }
</script>

<style scoped>

</style>
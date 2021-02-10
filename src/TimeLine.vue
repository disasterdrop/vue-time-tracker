<template>
    <div class="time-line">
        <h3>Tracked Times</h3>
        <ol class="list-group" v-for="timeItem in timeListItems">
            <li class="list-group-item">
                <span class="badge bg-secondary">{{timeItem.ticket}}</span>
                Time: {{timeItem.timeRun}}
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        name: "TimeLine",
        props: {
            timeList: Array
        },
        data: function () {
            return {
                timeListItems: this.timeList
            }
        },
        computed: {}
    }
</script>

<style scoped>

</style>
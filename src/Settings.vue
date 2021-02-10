<template>
    <div class="settings">

    </div>
</template>

<script>
    export default {
        name: "Settings",
        data: function () {
            return {
                jiraUrl: ''
            };
        },
        mounted() {
            if (localStorage.name) {
                this.jiraUrl = localStorage.jiraUrl;
            }
        },
        watch: {
            jiraUrl(newUrl) {
                localStorage.jiraUrl = newUrl;
            }
        }
    }
</script>

<style scoped>

</style>
<template>
  <div class="container">
    <time-tracker></time-tracker>
  </div>
</template>

<script>
    import Vue from "vue";
    import TimeTracker from "./TimeTracker";

    export default Vue.extend({
      components: {TimeTracker},
      data() {
            return {
            };
        }
    });
</script>

<style lang="scss" scoped>
</style>
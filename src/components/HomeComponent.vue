<template>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script>
/**
 * browser component
 * file browser on the side
 * https://github.com/Kocal/jsdoc-vuejs
 * @vue-data {Array} directorys - directorys the user added are psuhed to this array
 * @vue-data {String} activePath - the path that is currently active
 * @vue-data {boolean} active - the path that is currently active
 * @vue-event {Object} activate - when a folder is selected a event is emited with the active path insie an object additional data could be send
 * @vue-event {string} activate.path - the path that is send
 */
export default {
  name: "homeComponent",
  methods: {},
  mounted () {
    // console.log(`mounted: ${this.name}`);
    // ipcRenderer.send("file-context", { from: "Browser", path: this.activePath });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {}
</style>

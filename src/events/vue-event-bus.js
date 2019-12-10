// https://gist.github.com/3zbumban/089e87f56fb785dc835d057762e253bf
import Vue from "vue";

const FileBus = new Vue();
export default FileBus;

// eventBus.$on("<event>", (args) => {
//     console.log(`${args.x, args.y}`);
//     this.removeActiveFolder();
// });

// eventBus.$emit("<event>", {x:"", y:""});

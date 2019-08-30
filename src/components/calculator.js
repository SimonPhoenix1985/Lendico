import Calculator from './Calculator.vue';

export default {

    // The install method will be called with the Vue constructor as the first argument, along with possible options
    install (Vue) {

        // Add a component or directive to your plugin, so it will be installed globally to your project.
        Vue.component('calculator', Calculator)
    }
}

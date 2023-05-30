<script>
import AppMenu from './views/AppMenu.vue';
import DrawerMenu from './views/DrawerMenu.vue';
import Loading from './components/Loading.vue';
import { useStore } from './stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    components: {
        AppMenu,
        DrawerMenu,
        Loading,
    },
    methods: {
        ...mapActions(useStore, []),
    },
    computed: {
        ...mapState(useStore, ['user', 'isAxiosLoading']),
    },
    mounted() {},
};
</script>

<template>
    <div v-if="isAxiosLoading">
        <loading></loading>
    </div>
    <div v-else>
        <app-menu class="fixed-menu"></app-menu>
        <drawer-menu class="fixed-drawer"></drawer-menu>
        <router-view class="router-view"></router-view>
        <notifications classes="my-notification" position="bottom right" />
    </div>
</template>

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css');

.fixed-menu {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
}

.fixed-drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0px;
    z-index: 1;
}

.my-notification {
    margin: 0 5px 5px;
    padding: 10px;
    color: #ffffff;
    font-size: 16px;

    background: #44a4fc;
    border-left: 5px solid #187fe7;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
}

.my-notification.success {
    background: #68cd86;
    border-left-color: #42a85f;
}

.my-notification.warn {
    background: #ffb648;
    border-left-color: #f48a06;
}

.my-notification.error {
    background: #e54d42;
    border-left-color: #b82e24;
}
</style>

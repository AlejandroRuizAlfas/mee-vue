<script>
import AppMenu from './views/AppMenu.vue';
import DrawerMenu from './views/DrawerMenu.vue';
import { useStore } from './stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    components: {
        AppMenu,
        DrawerMenu,
    },
    methods: {
        ...mapActions(useStore, []),
        showList() {
            // Add logic to show the list here
        },
    },
    computed: {
        ...mapState(useStore, ['user']),
    },
    mounted() {},
};
</script>

<template>
    <app-menu class="fixed-menu"></app-menu>
    <drawer-menu class="fixed-drawer"></drawer-menu>
    <app-messages></app-messages>
    <router-view class="router-view"></router-view>
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

/* .router-view {
    margin-top: 50px;
    z-index: 0;
} */
</style>

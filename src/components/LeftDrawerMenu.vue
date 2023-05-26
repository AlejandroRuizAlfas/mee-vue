<template>
    <transition name="slide">
        <div class="left-drawer-menu pt-5" v-if="isOpen">
            <div class="drawer-content">
                <div class="row p-4">
                    <div class="col-6">
                        <img src="/src/assets/mee-face.png" class="mee-face-logo" />
                    </div>
                    <div class="col-6 align-items-center user-data">
                        <p class="username">{{ getUsername() }}</p>
                        <button class="btn btn-danger" @click="logout">Logout</button>
                    </div>
                </div>
                <div class="row p-4">
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/house.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/">Home</router-link>
                    </div>
                </div>

                <div class="separator"></div>

                <div class="row p-4">
                    <p class="section-title">Management</p>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/to-do-list.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/todolist">TODO List</router-link>
                    </div>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/note-icon.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/notes">Notes</router-link>
                    </div>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/shopping-list.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/buyList">Buy List</router-link>
                    </div>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/map.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/maps">Map Gallery</router-link>
                    </div>
                </div>

                <div class="separator"></div>

                <div class="row p-4">
                    <p class="section-title">General information</p>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/weather-app.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/weather">Weather</router-link>
                    </div>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/newspaper.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/news">News</router-link>
                    </div>
                    <div class="col-12 menu-item d-flex align-items-center">
                        <img src="/src/assets/sidemenu/puzzle.png" class="me-2 menu-icon" />
                        <router-link @click="closeDrawer" to="/words">Words</router-link>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    name: 'LeftDrawerMenu',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        ...mapActions(useStore, ['toggleMenu']),
        closeDrawer() {
            this.toggleMenu();
        },
        logout() {
            localStorage.removeItem('mee_user');
            this.closeDrawer();
            this.$router.push('/auth');
        },
        getUsername() {
            try {
                return JSON.parse(localStorage.getItem('mee_user')).username;
            } catch (err) {
                return 'No user';
            }
        },
    },
};
</script>

<style scoped>
.left-drawer-menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300px;
    background-color: white;
    z-index: 1000;
    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
    /* padding: 20px; */
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}

.menu-item {
    width: 100%;
    height: 50px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bolder;
    font-size: 20px;
}

.mee-face-logo {
    width: 96px;
    height: 96px;
}

a:link,
a:visited,
a:active {
    text-decoration: none;
    color: black;
}

.separator {
    width: 100%;
    height: 1px;
    background-color: gray;
    opacity: 0.5;
}

.username {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bolder;
    font-size: 18px;
}

.menu-icon {
    widows: 30px;
    height: 30px;
}

.drawer-content {
    height: calc(100vh - 50px);
    overflow-y: auto;
}

.user-data {
    display: grid;
    place-items: center;
}

.section-title {
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
}
</style>

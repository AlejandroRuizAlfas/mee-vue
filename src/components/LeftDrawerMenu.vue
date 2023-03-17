<template>
    <transition name="slide">
        <div class="left-drawer-menu" v-if="isOpen">
            <div class="row p-4">
                <div class="col-6">
                    <img src="/src/assets/mee-face.png" class="mee-face-logo" />
                </div>
                <div class="col-6 d-flex align-items-center">
                    <p class="username">Alejandro</p>
                </div>
            </div>
            <div class="row p-4">
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/">Home</router-link>
                </div>
            </div>

            <div class="separator"></div>

            <div class="row p-4">
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/todolist">TODO List</router-link>
                </div>
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/notes">Notes</router-link>
                </div>
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/buyList">Buy List</router-link>
                </div>
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/maps">Map Gallery</router-link>
                </div>
            </div>

            <div class="separator"></div>

            <div class="row p-4">
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/weather">Weather</router-link>
                </div>
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/news">News</router-link>
                </div>
                <div class="col-12 menu-item d-flex align-items-center">
                    <img src="/src/assets/note-icon.png" class="me-2" />
                    <router-link to="/words">Words</router-link>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'LeftDrawerMenu',
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
.left-drawer-menu {
    position: absolute;
    top: 50px;
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
</style>

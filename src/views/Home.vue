<template>
    <div class="home-page justify-content-center">
        <div class="home-wrapper">
            <h1 class="display-1" style="font-weight: bolder">Welcome! I'm the robot Mee</h1>
            <h1>This Home page is yet being coded, please use the menu icon in the top-left corner!</h1>
            <img class="logo" src="/src/assets/mee/main.png" />
        </div>
    </div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions(useStore, []),
    },
    mounted() {
        if (!localStorage.mee_user) {
            this.$router.push('/auth');
        }
    },
};
</script>

<style scoped>
.home-page {
    /* height: 100vh;
    background-color: #233d4d; */
    color: white;
    display: grid;
    place-items: center;
}

.home-wrapper {
    display: grid;
    place-items: center;
}
.logo {
    width: 512px;
    height: 512px;
}
</style>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    props: {
        titulo: String,
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions(useStore, ['toggleMenu']),
        getUser() {
            return localStorage.getItem('mee_user');
        },
    },
    computed: {
        ...mapState(useStore, ['isOpen']),
    },
};
</script>

<template>
    <button class="open-list-btn" @click="toggleMenu">
        <i class="bi bi-list" style="font-size: 2rem"></i>
    </button>
</template>

<style scoped>
a {
    margin-left: 20px;
    display: flex;
    align-items: center;
}

.top-bar {
    height: 50px;
    background-color: black;
    color: white;
}

a:link,
a:visited,
a:active {
    text-decoration: none;
    color: azure;
}

a:hover {
    color: aqua;
}

.open-list-btn {
    background-color: black;
    color: white;
    border: none;
    outline: none;
    width: 50px;
    height: 50px;
    border-radius: 0 0 20px 0;
}
</style>

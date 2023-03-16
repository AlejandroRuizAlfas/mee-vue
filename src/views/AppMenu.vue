<script>
import { useStore } from "../stores/store.js";
import { mapState, mapActions } from "pinia";
export default {
    props: {
        titulo: String,
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions(useStore, ["toggleMenu"])
    },
    computed: {
        ...mapState(useStore, ["isOpen"])
    },
};
</script>

<template>
    <div class="container-fluid top-bar pt-1">
        <span class="navbar-brand">
            <i class="bi bi-list h2" @click="toggleMenu"></i>
        </span>
    </div>
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
</style>
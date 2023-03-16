<template>
    <div>
        <left-drawer-menu :is-open="isOpen" />
    </div>
</template>
  
<script>
import LeftDrawerMenu from "@/components/LeftDrawerMenu.vue";
import { useStore } from "../stores/store.js";
import { mapState, mapActions } from "pinia";

export default {
    components: {
        LeftDrawerMenu
    },
    data() {
        return {

        };
    },
    methods: {
        ...mapActions(useStore, ["toggleMenu"])
    },
    computed: {
        ...mapState(useStore, ["isOpen"])
    },
};
</script>

<style scoped>
.left-drawer-menu h2 {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.left-drawer-menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.left-drawer-menu li {
    margin-bottom: 10px;
}

.left-drawer-menu a {
    color: #333;
    text-decoration: none;
}

.left-drawer-menu a:hover {
    color: #666;
}
</style>
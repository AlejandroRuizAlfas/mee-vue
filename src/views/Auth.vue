<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    data() {
        return {};
    },
    methods: {
        ...mapActions(useStore, ['']),
    },
    computed: {
        ...mapState(useStore, ['']),
    },
};
</script>

<template>
    <form action="">
        <input />
        <button type="submit">Submit</button>
    </form>
</template>

<style scoped></style>

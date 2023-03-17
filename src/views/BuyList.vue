<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {
            lists: [],
        };
    },
    methods: {},
    computed: {},
};
</script>

<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div class="buycard p-4 m-5 mt-3">
            <div class="row">
                <div class="col-10 p-3">
                    <h4>Nombre lista</h4>
                    <p>Sasdaff</p>
                </div>
                <div class="col-2">
                    <img class="buy-image-right" src="/src/assets/compraEmpty.png" />
                </div>
            </div>
        </div>

        <div class="buycard p-4 m-5 mt-3">
            <div class="row">
                <div class="col-10 p-3">
                    <h4>Nombre lista</h4>
                    <p>Sasdaff</p>
                </div>
                <div class="col-2">
                    <img class="buy-image-right" src="/src/assets/compraEmpty.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    background-color: beige;
    height: 100vh;
}
.buycard {
    background-color: antiquewhite;
    border-radius: 20px;
}
.buy-image-right {
    width: 150px;
    height: auto;
}
</style>

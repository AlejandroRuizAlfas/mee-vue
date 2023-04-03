<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {
            products: [
                { id: 1, name: 'Product 1', quantity: 32, icon: '', bought: false },
                { id: 2, title: 'Product 2', quantity: 124, icon: '', bought: true },
                { id: 3, title: 'Product 3', quantity: 12, icon: '', bought: false },
            ],
        };
    },
    methods: {},
    computed: {},
};
</script>

<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div class="buyList py-4">
            <h2 class="mx-4 px-4">Lista X</h2>
            <hr class="hr" />
            <div class="product-row" v-for="product in products">
                <div class="row p-2">
                    <div class="col-1 text-center">
                        <input type="checkbox" />
                    </div>
                    <div class="col-8">
                        <p class="mb-0">Producto 1</p>
                    </div>
                    <div class="col-2 text-center">
                        <p class="m-0">Quantity: {{ product.quantity }}</p>
                    </div>
                    <div class="col-1 text-center">
                        <input type="checkbox" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    background-color: #233d4d;
    height: 100vh;
}
.buyList {
    background-color: white;
    border-radius: 40px;
    margin: 0px 20%;
}
</style>

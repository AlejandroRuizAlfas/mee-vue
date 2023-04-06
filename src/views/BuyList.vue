<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {
            lists: [
                { id: 0, name: 'Lista 1', elements: 32, count: 34 },
                { id: 1, name: 'Lista 2', elements: 12, count: 12 },
                { id: 2, name: 'Lista 3', elements: 22, count: 17 },
                { id: 3, name: 'Lista 4', elements: 56, count: 4 },
                { id: 4, name: 'Lista 5', elements: 22, count: 17 },
                { id: 5, name: 'Lista 6', elements: 56, count: 4 },
            ],
        };
    },
    methods: {
        handleShowList(id) {
            this.$router.push('buyList/' + id);
        },
    },
    computed: {},
};
</script>

<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div class="buycard p-4" @click="handleShowList(2)" v-for="item in lists">
            <div class="row">
                <div class="col-10 p-3">
                    <h4>{{ item.name }}</h4>
                    <div class="item-chip p-2 text-center">
                        <p>{{ item.count }} items</p>
                    </div>
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
    background-color: #233d4d;
    height: 100vh;
}
.buycard {
    background-color: antiquewhite;
    border-radius: 20px;
    margin: 30px 20%;
}

.buycard:hover {
    transform: scale(1.05);
}

.buy-image-right {
    width: 150px;
    height: auto;
}

.item-chip {
    width: 80px;
    height: 40px;
    background-color: aliceblue;
    border-radius: 40px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
}
</style>

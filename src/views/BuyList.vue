<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import Loading from '../components/Loading.vue';

export default {
    components: {
        Loading,
    },
    data() {
        return {
            lists: [],
            isLoading: false,
        };
    },
    methods: {
        handleShowList(id) {
            this.$router.push('buyList/' + id);
        },
    },
    computed: {
        ...mapState(useStore, ['getAllBuylist']),
    },
    async mounted() {
        this.isLoading = true;
        setTimeout(async () => {
            this.lists = await this.getAllBuylist();
            this.isLoading = false;
        }, 2000); // TODO QUITAR SET TIMEOUT
    },
};
</script>

<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div class="buycard p-4" @click="handleShowList(item.buylist_id)" v-for="item in lists">
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

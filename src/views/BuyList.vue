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
        ...mapActions(useStore, ['addBuylistStore', 'editBuylistStore', 'deleteListStore']),
        handleShowList(id) {
            this.$router.push('buyList/' + id);
        },
        async handleCreateList() {
            let lista = await this.addBuylistStore();
            console.log(lista);
            this.lists.push(lista);
        },
        async handleChangeTitle(item, content) {
            item.name = content;
            let response = await this.editBuylistStore(item);
            response ? this.$notify({ type: 'success', text: 'Buylist name changed!' }) : '';
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
        }, 1000); // TODO QUITAR SET TIMEOUT
    },
};
</script>

<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div class="button-wrapper text-center">
                <button class="btn btn-success w-100" @click="handleCreateList">Create new list!</button>
            </div>
            <div class="buycard p-4" @click="handleShowList(item.buylist_id)" v-for="item in lists">
                <div class="row">
                    <div class="col-7 p-3">
                        <div class="list-name" contenteditable="true" spellcheck="false" @click.stop @blur="handleChangeTitle(item, $event.target.textContent)">{{ item.name }}</div>
                        <div class="item-chip p-2 text-center">
                            <p>{{ item.count }} items</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <img class="buy-image-right" src="/src/assets/compraEmpty.png" />
                    </div>
                    <div class="col-1">
                        <span><i class="bi bi-trash" @click="handleDeleteList(item)" style="color: #dc3545; font-size: 24px; float: right"></i></span>
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
    float: right;
}

.item-chip {
    width: 80px;
    height: 40px;
    background-color: aliceblue;
    border-radius: 40px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
}

.button-wrapper {
    margin: 30px 20%;
}

button {
    color: white;
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
}

.list-name {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 32px;
    font-weight: bold;
}
</style>

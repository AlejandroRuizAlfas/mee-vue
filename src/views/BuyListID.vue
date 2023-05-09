<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import { debounce } from 'lodash';
import Loading from '../components/Loading.vue';
import AddProduct from '../components/AddProduct.vue';
import EditProduct from '../components/EditProduct.vue';

export default {
    components: {
        Loading,
        AddProduct,
        EditProduct,
    },
    data() {
        return {
            products: [],
            currentList: [{ name: '' }],
            currentProd: {},
            isLoading: false,
            showDialog: false,
            showDialogEdit: false,
            imgSrc: '/src/assets/buylist/',
        };
    },
    methods: {
        ...mapActions(useStore, ['addBuylistStore', 'editBuylistStore']),
        sortByBought(array) {
            array.sort((a, b) => {
                if (a.bought === b.bought) {
                    return 0;
                }
                if (a.bought) {
                    return 1;
                }
                return -1;
            });
            return array;
        },
        showAddProd() {
            this.showDialog = true;
        },
        showEditProd(product) {
            this.currentProd = product;
            this.showDialogEdit = true;
        },
        saveData(prod) {
            this.showDialog = false;
            this.products.products.push(prod);
            this.currentList[0].elements = JSON.stringify(this.products);
            this.currentList[0].count = this.products.products.length;
            this.editBuylistStore(this.currentList[0]);
        },
        checkOrUncheck: debounce(function (prod) {
            prod.bought = !prod.bought;
            const itemIndex = this.products.products.findIndex((item) => item.name === prod.name);
            this.currentList[0].elements = JSON.stringify(this.products);
            this.currentList[0].count = this.products.products.length;
            this.editBuylistStore(this.currentList[0]);
        }, 100),

        editData(prod) {
            const itemIndex = this.products.products.findIndex((item) => item.name === prod.name);
            if (itemIndex != -1) {
                this.products.products[itemIndex] = prod;
            }
            this.currentList[0].elements = JSON.stringify(this.products);
            this.currentList[0].count = this.products.products.length;
            this.editBuylistStore(this.currentList[0]);
            this.showDialogEdit = false;
        },
        deleteItemFromList(product) {
            const itemIndex = this.products.products.findIndex((item) => item.name === product.name);
            if (itemIndex !== -1) {
                this.products.products.splice(itemIndex, 1);
            }
        },
        handleCloseDialog() {
            this.showDialog = false;
            this.showDialogEdit = false;
        },
        checkaAll() {
            this.products.products.forEach((element) => {
                element.bought = true;
            });
            this.currentList[0].elements = JSON.stringify(this.products);
            this.currentList[0].count = this.products.products.length;
            this.editBuylistStore(this.currentList[0]);
        },
        uncheckaAll() {
            this.products.products.forEach((element) => {
                element.bought = false;
            });
            this.currentList[0].elements = JSON.stringify(this.products);
            this.currentList[0].count = this.products.products.length;
            this.editBuylistStore(this.currentList[0]);
        },
    },
    computed: {
        ...mapState(useStore, ['getBuylistID']),
    },
    async mounted() {
        this.isLoading = true;
        setTimeout(async () => {
            this.currentList = await this.getBuylistID(this.$route.params.id);
            this.products = JSON.parse(this.currentList[0].elements);
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
            <div class="buyList py-4">
                <div class="row">
                    <div class="col-6">
                        <h2 class="mx-4 px-4">{{ currentList[0].name }}</h2>
                    </div>
                    <div class="col-6">
                        <button class="btn btn-primary mx-4" @click="showAddProd" style="float: right"><i class="bi bi-plus-circle-fill"></i> Add product</button>
                        <button class="btn btn-success mx-1" @click="checkaAll" style="float: right"><i class="bi bi-check2-square"></i> Check all</button>
                        <button class="btn btn-danger mx-1" @click="uncheckaAll" style="float: right"><i class="bi bi-square"></i> Uncheck all</button>
                    </div>
                </div>
                <hr class="hr" />
                <div class="product-row" v-for="product in products.products" v-if="products.products">
                    <div class="row p-2">
                        <div class="col-1 text-center">
                            <input type="checkbox" :checked="product.bought" @click="checkOrUncheck(product)" />
                        </div>
                        <div class="col-6">
                            <div class="mb-0">{{ product.name }}</div>
                        </div>
                        <div class="col-3 text-center">
                            <div class="m-0">Quantity: {{ product.quantity }}</div>
                        </div>
                        <div class="col-2 text-center row-icons">
                            <img :src="imgSrc + product.icon" class="mx-2" style="display: inline-block" />
                            <span><i class="bi bi-pencil-fill" @click="showEditProd(product)"></i></span>
                            <!-- <img src="/src/assets/buylist/delete.png" class="mx-2" style="display: inline-block" @click="deleteItemFromList(product)" /> -->
                            <!-- <img src="/src/assets/buylist/edit.png" class="mx-2" style="display: inline-block" /> -->
                        </div>
                    </div>
                </div>
                <div v-if="products.products && products.products.length <= 0">
                    <div class="row empty-wrapper">
                        <img class="empty-img" src="/src/assets/empty/prodempty.png" />
                    </div>
                    <div class="row text-center">
                        <p class="empty-text">Let's fill the basket with</p>
                        <p class="empty-text">a few fresh products!</p>
                    </div>
                </div>
            </div>
            <div v-if="showDialog" class="backdrop">
                <div class="dialog-wrapper">
                    <teleport to="body">
                        <AddProduct @closeDialog="handleCloseDialog" @finishAdd="saveData" />
                    </teleport>
                </div>
            </div>
            <div v-if="showDialogEdit" class="backdrop">
                <div class="dialog-wrapper">
                    <teleport to="body">
                        <EditProduct @closeDialog="handleCloseDialog" :prod="currentProd" @finishEdit="editData" />
                    </teleport>
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

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 5;
}

.dialog-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}
.buyList {
    background-color: white;
    border-radius: 40px;
    margin: 0px 20%;
}

.row-icons {
    display: flex;
    align-items: center;
    padding-left: 5%;
}

.empty-img {
    width: 20rem;
    height: auto;
}

.empty-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
}
.empty-text {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: black;
}
</style>

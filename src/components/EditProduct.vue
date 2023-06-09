<template>
    <div id="dialog" class="dialog p-4">
        <div class="close-btn-container" style="height: 20px">
            <button class="btn btn-sm btn-outline-secondary close-dialog" @click="handleClose">
                <i class="bi bi-x"></i>
            </button>
        </div>
        <div class="dialog-content">
            <div class="form-group">
                <label for="prodName">Name:</label>
                <input type="text" class="form-control" placeholder="Enter product name..." v-model="product.name"
                    name="prodName" id="prodName" />
            </div>
            <div class="row">
                <div class="col-md-4 col-12">
                    <div class="form-group">
                        <label for="prodQty">Quantity:</label>
                        <input type="number" class="form-control" v-model="product.quantity" name="prodQty" id="prodQty" />
                    </div>
                </div>
                <div class="col-md-8 col-12">
                    <div class="form-group">
                        <label for="prodCat">Category:</label>
                        <select class="form-select" name="prodCat" id="prodCat" v-model="product.category">
                            <option value="default" selected disabled>Select a category...</option>
                            <option :value="item.code" v-for="item in categories" :key="item.id">{{ item.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="footer-dialog">
                <div class="actions mt-3">
                    <button class="btn btn-danger"><i class="bi bi-trash"></i> Delete?</button>
                    <div style="float: right">
                        <button type="cancel" class="btn btn-danger mx-2" @click="handleClose">Cancel</button>
                        <button type="submit" class="btn btn-warning" @click="handleFinishEdit">Edit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    props: {
        title: String,
        message: String,
        prod: Object,
    },
    data() {
        return {
            product: { name: '', quantity: 0, category: 'default', icon: 'default', bought: false },
        };
    },
    computed: {
        ...mapState(useStore, ['getAllCategories']),
    },
    methods: {
        handleFinishEdit() {
            let prod = {
                name: document.getElementById('prodName').value,
                quantity: document.getElementById('prodQty').value,
                category: document.getElementById('prodCat').value,
                icon: document.getElementById('prodCat').value + '.png',
                bought: this.product.bought,
            };
            this.$emit('finishEdit', prod);
        },
        handleClose() {
            this.$emit('closeDialog');
        },
    },
    async mounted() {
        this.categories = await this.getAllCategories();
        this.product = this.prod;
    },
};
</script>

<style scoped>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 4 0px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    z-index: 10;
    width: 512px;
    height: auto;
}

.close-dialog {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    padding: 0;
    font-size: 2rem;
    line-height: 1;
    color: #6c757d;
    border-radius: 20px;
}

.close-dialog:hover {
    color: white;
    border-radius: 20px;
    background-color: rgb(253, 99, 99);
}

.close-dialog:focus {
    box-shadow: none;
}

@media only screen and (max-width: 550px) {
    .dialog {
        width: 90%;
    }
}
</style>

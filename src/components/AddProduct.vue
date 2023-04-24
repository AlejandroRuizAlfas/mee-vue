<template>
    <div id="dialog" class="dialog p-4">
        <div class="dialog-content">
            <!-- <form> -->
            <div class="form-group">
                <label for="prodName">Name:</label>
                <input type="text" class="form-control" placeholder="Enter product name..." name="prodName" id="prodName" />
            </div>
            <div class="row">
                <div class="col-4">
                    <div class="form-group">
                        <label for="prodQty">Quantity:</label>
                        <input type="number" class="form-control" value="1" name="prodQty" id="prodQty" />
                    </div>
                </div>
                <div class="col-8">
                    <div class="form-group">
                        <label for="prodCat">Category:</label>
                        <select class="form-select" name="prodCat" id="prodCat">
                            <option value="default" selected disabled>Select a category...</option>
                            <option value="food">General Food</option>
                            <option value="health">Health & Care</option>
                            <option value="fruits">Fruits and Vegetables</option>
                            <option value="drinks">Drinks</option>
                            <option value="meat">Meat</option>
                            <option value="bread">Bread</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="footer-dialog">
                <div class="actions mt-3" style="float: right">
                    <button type="cancel" class="btn btn-danger mx-2">Cancel</button>
                    <button type="submit" class="btn btn-success" @click="handleFinishAdd">Add</button>
                </div>
            </div>
            <!-- </form> -->
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
    },
    data() {
        return {};
    },
    methods: {
        handleFinishAdd() {
            let prod = {
                name: document.getElementById('prodName').value,
                quantity: document.getElementById('prodQty').value,
                category: document.getElementById('prodCat').value,
                icon: document.getElementById('prodCat').value + '.png',
                bought: false,
            };
            this.$emit('finishAdd', prod);
        },
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
</style>

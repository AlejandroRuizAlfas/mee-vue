<template>
    <div id="dialog" class="dialog p-4" v-if="todo">
        <div class="close-btn-container" style="height: 20px">
            <div class="row">
                <div class="col-8">
                    <h4 style="font-weight: bold">Edit To-Do</h4>
                </div>
                <div class="col-4">
                    <button class="btn btn-sm btn-outline-secondary close-dialog" @click="handleClose">
                        <i class="bi bi-x"></i>
                    </button>
                </div>
            </div>
        </div>
        <hr class="hr" />
        <div class="dialog-content">
            <div class="form-group my-2">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" class="form-control" v-model="todo.name" />
            </div>
            <div class="form-group my-2">
                <label for="desc">Description</label>
                <textarea id="desc" name="desc" cols="40" rows="5" class="form-control" v-model="todo.desc"></textarea>
            </div>
            <div class="form-group my-2">
                <div>
                    <div class="custom-controls-stacked">
                        <div class="custom-control">
                            <input id="alarmActivated" name="alarmActivated" type="checkbox" class="custom-control-input" value="alarmActivated" v-model="todo.alarmActivated" />
                            <label for="checkbox_0" class="custom-control-label mx-2">Notify with alarm?</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-group my-2">
                <label for="limitDate">Expiration date: </label><br />
                <input type="datetime-local" id="limitDate" name="limitDate" v-model="todo.limitDate" />
            </div>

            <div class="form-group my-2">
                <label for="priority">Priority</label>
                <div>
                    <select id="priority" name="priority" class="form-control" v-model="todo.priority">
                        <option selected value="0">No priority</option>
                        <option value="1">Low priority</option>
                        <option value="2">Medium priority</option>
                        <option value="3">High priority</option>
                    </select>
                </div>
            </div>
            <div class="form-group my-2">
                <label for="earlyNotif">Notify earlier?</label>
                <div>
                    <select id="earlyNotif" name="earlyNotif" class="form-control" v-model="todo.earlyNotif">
                        <option selected value="0">Exact time</option>
                        <option value="10">10 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                    </select>
                </div>
            </div>
            <div class="form-group mt-4">
                <button name="submit" type="submit" class="btn btn-danger" style="float: left" @click="handleDeleteTodo">Delete To-Do</button>
                <button name="submit" type="submit" class="btn btn-warning" style="float: right" @click="handleFinishEdit">Edit To-Do</button>
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
        todo: Object,
    },
    data() {
        return {};
    },
    methods: {
        handleFinishEdit() {
            this.$emit('finishEdit', this.todo);
        },
        handleDeleteTodo() {
            alert('Are you sure you want to delete this To-Do?'); //TODO Delete todos
        },
        handleClose() {
            this.$emit('closeDialog');
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

input[type='datetime-local'] {
    width: 100%;
    height: 40px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 16px;
}

label {
    font-size: 20px;
    padding-bottom: 5px;
}

@media only screen and (max-width: 550px) {
    .dialog {
        width: 90%;
    }
}
</style>

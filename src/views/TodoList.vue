<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import { debounce } from 'lodash';
import Loading from '../components/Loading.vue';
import AddTodo from '../components/AddTodo.vue';
import EditTodo from '../components/EditTodo.vue';
export default {
    components: {
        Loading,
        AddTodo,
        EditTodo,
    },
    data() {
        return {
            todos: [],
            isLoading: false,
            showDialog: false,
            editDialog: false,
            currentTodo: {},
        };
    },
    methods: {
        ...mapActions(useStore, ['addTodoStore', 'editTodoStore', 'deleteTodoStore']),
        handleCreateTodo() {
            this.showDialog = true;
        },
        handleCloseDialog() {
            this.showDialog = false;
            this.editDialog = false;
        },
        handleEditTodo(item) {
            this.currentTodo = item;
            this.editDialog = true;
        },
        async saveData(newTodo) {
            // let newTodo = { name: 'New todo', completed: 0, desc: 'Empty description', alarmActivated: 0, notifActivated: 0, limitDate: new Date().toLocaleString().replaceAll('PM', ' ').replaceAll(' ', '').replace(',', ' ').replaceAll('/', '-'), priority: 1, earlyNotif: 0 };
            let response = await this.addTodoStore(newTodo);
            !this.todos ? (this.todos = []) : '';
            this.todos.push(response);
            this.showDialog = false;
        },
        async editData(edited) {
            let response = await this.editTodoStore(edited);
            const itemIndex = this.todos.findIndex((item) => item.todo_id === edited.todo_id);
            this.todos[itemIndex] = edited;
            this.editDialog = false;
        },
        checkOrUncheck: debounce(function (item) {
            item.completed == '1' ? (item.completed = '0') : (item.completed = '1');
            const itemIndex = this.todos.findIndex((e) => e.todo_id === item.todo_id);
            let checkedTodo = this.todos[itemIndex];
            console.log(checkedTodo);
            this.editTodoStore(checkedTodo);
        }, 100),
    },
    computed: {
        ...mapState(useStore, ['getAllTodos']),
    },
    async mounted() {
        this.isLoading = true;
        setTimeout(async () => {
            this.todos = await this.getAllTodos();
            this.isLoading = false;
            console.log(this.todos);
        }, 1000); // TODO QUITAR SET TIMEOUT
    },
};
</script>

<template>
    <div class="container-fluid">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div class="todo-bg p-2">
                <div class="btn-wrapper m-3">
                    <button class="btn btn-primary btn-add-todo" @click="handleCreateTodo">New To-Do</button>
                </div>
                <div class="item-list" v-if="todos.length > 0">
                    <div class="todo-item m-3" v-for="item in todos" :key="item.todo_id" @click="handleEditTodo(item)">
                        <div v-if="item.priority == 3" class="col-1 todo-prior-bar m-1 mx-2 todo-prior-bar-high"></div>
                        <div v-else-if="item.priority == 2" class="col-1 todo-prior-bar m-1 mx-2 todo-prior-bar-medium"></div>
                        <div v-else-if="item.priority == 1" class="col-1 todo-prior-bar m-1 mx-2 todo-prior-bar-low"></div>
                        <div v-else class="col-1 todo-prior-bar m-1 mx-2 todo-prior-bar-nothing"></div>
                        <div class="col-9 todo-content">
                            <div class="row">
                                <h5 class="my-0 mb-1">{{ item.name }}</h5>
                            </div>
                            <div class="row">
                                <p class="my-0 mt-1">{{ item.limitDate }}</p>
                            </div>
                        </div>
                        <div class="col-2 todo-controls">
                            <input type="checkbox" @click.stop :checked="item.completed == 1" @click="checkOrUncheck(item)" style="transform: scale(1.6)" />
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="row empty-wrapper">
                        <img class="empty-img" src="/src/assets/empty/alltodoempty.png" />
                    </div>
                    <div class="row text-center">
                        <p class="empty-text">This board looks so empty!</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showDialog" class="backdrop">
            <div class="dialog-wrapper">
                <teleport to="body">
                    <AddTodo @closeDialog="handleCloseDialog" @finishAdd="saveData" />
                </teleport>
            </div>
        </div>
        <div v-if="editDialog" class="backdrop">
            <div class="dialog-wrapper">
                <teleport to="body">
                    <EditTodo @closeDialog="handleCloseDialog" @finishEdit="editData" :todo="currentTodo" />
                </teleport>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    display: grid;
    place-items: center;
    /* background-color: #233d4d; */
    height: 100vh;
}
.item-list {
}

.todo-bg {
    background-color: #353640;
    height: 550px;
    width: 450px;
    border-radius: 40px;
    border: 5px solid #966f33;
    overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
.todo-bg::-webkit-scrollbar {
    display: none;
}

.todo-item {
    background-color: white;
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center; /* center vertically */
}

.todo-prior-bar {
    border-radius: 40px;
    height: 85%;
    width: 10px;
}

.todo-prior-bar-high {
    background-color: #dc3545;
}

.todo-prior-bar-medium {
    background-color: #ffc107;
}

.todo-prior-bar-low {
    background-color: #198754;
}

.todo-prior-bar-nothing {
    background-color: rgb(77, 77, 77);
}

.todo-content {
    padding-left: 8px;
}

.btn-add-todo {
    border-radius: 20px;
    width: 100%;
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
    color: white;
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

.todo-controls {
    display: grid;
    place-items: center;
}

@media (max-width: 575.98px) {
    .todo-bg {
        background-color: #353640;
        height: 550px;
        width: 350px;
        border-radius: 40px;
        border: 5px solid #966f33;
        overflow-x: hidden;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
}

@media (min-width: 576px) and (max-width: 767.98px) {
}

@media (min-width: 768px) and (max-width: 991.98px) {
}

@media (min-width: 992px) and (max-width: 1199.98px) {
}

@media (min-width: 1200px) {
}
</style>

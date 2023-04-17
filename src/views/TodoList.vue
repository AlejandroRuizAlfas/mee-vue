<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    data() {
        return {
            todos: [],
        };
    },
    methods: {
        ...mapActions(useStore, ['']),
    },
    computed: {
        ...mapState(useStore, ['getAllTodos']),
    },
    async mounted() {
        this.todos = await this.getAllTodos();
    },
};
</script>

<template>
    <div class="container-fluid">
        <div class="todo-bg p-2">
            <div class="btn-wrapper m-3">
                <button class="btn btn-primary btn-add-todo">New To-Do</button>
            </div>
            <div class="item-list">
                <div class="todo-item m-3" v-for="item in todos" :key="item.todo_id">
                    <div class="col-1 todo-prior-bar m-1 mx-2"></div>
                    <div class="col-9 todo-content">
                        <div class="row">
                            <h5 class="my-0 mb-1">{{ item.name }}</h5>
                        </div>
                        <div class="row">
                            <p class="my-0 mt-1">{{ item.limitDate }}</p>
                        </div>
                    </div>
                    <div class="col-2 todo-controls">
                        <div class="row my-2">
                            <input type="checkbox" :checked="item.completed == 1" style="transform: scale(1.6)" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    display: grid;
    place-items: center;
    background-color: #233d4d;
    height: 100vh;
}

.todo-bg {
    background-color: bisque;
    height: 500px;
    width: 400px;
    border-radius: 40px;
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
    background-color: red;
    height: 85%;
    width: 10px;
}

.todo-content {
    padding-left: 8px;
}

.btn-add-todo {
    border-radius: 20px;
    width: 100%;
}
.item-list {
}
</style>

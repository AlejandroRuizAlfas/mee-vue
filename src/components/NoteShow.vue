<template>
    <div id="dialog" class="dialog p-4" v-if="note">
        <div class="close-btn-container" style="height: 20px">
            <button class="btn btn-sm btn-outline-secondary close-dialog" @click="handleClose">
                <i class="bi bi-x"></i>
            </button>
        </div>
        <div class="dialog-content">
            <h4>Title</h4>
            <p id="noteTitle" ref="editable" contenteditable="true" spellcheck="false">{{ note.title }}</p>

            <h4>Content</h4>
            <div id="noteBody" class="note-body" contenteditable="true" spellcheck="false">{{ note.content }}</div>

            <div class="button-group">
                <button class="button bg-primary" @click="saveAndClose">
                    <i class="bi bi-save">Save</i>
                </button>
                <div class="dropdown">
                    <button class="button bg-warning" @click="toggleDropdown">
                        <i class="icon bi bi-palette-fill">Color</i>
                    </button>
                    <div class="dropdown-content" v-if="isDropdownOpen">
                        <div v-for="(color, index) in colors" :key="index" class="color-circle" :style="{ backgroundColor: color }" @click="changeNoteColor(color)"></div>
                    </div>
                </div>
                <button class="button bg-danger" @click="deleteNote">
                    <i class="bi bi-trash">Delete</i>
                </button>
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
        note: Object,
    },
    data() {
        return {
            isDropdownOpen: false,
            colors: ['#ffffff', '#dcedc1', '#a8e6cf', '#ffaaa5', '#cbdadb', '#ffdbac', '#e3f0ff', '#e4dcf1'],
        };
    },
    methods: {
        ...mapActions(useStore, ['editNoteStore', 'deleteNoteStore']),
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        changeNoteColor(color) {
            this.note.color = color;
            document.getElementById('dialog').style.backgroundColor = color;
        },
        async saveAndClose() {
            this.note.title = document.getElementById('noteTitle').textContent;
            this.note.content = document.getElementById('noteBody').textContent;
            let response = await this.editNoteStore(this.note);
            this.$router.push('/notes');
        },
        async deleteNote(note) {
            let response = await this.deleteNoteStore(this.note);
            this.$router.push('/notes');
        },
        handleClose() {
            this.$emit('closeDialog');
        },
    },
    mounted() {
        document.getElementById('dialog').style.backgroundColor = this.note.color;
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
    height: 512px;
}

.mydimensions {
    font-size: 7em;
}

textarea {
    width: 100%;
    height: auto;
    display: inline-block;
    word-break: break-all;
}

textarea {
    border: none;
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
}

.button-group {
    position: absolute;
    right: -70px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    margin-bottom: 10px;
    background-color: #ffffff;
    color: white;
    font-weight: bold;
}

.dropdown {
    position: relative;
    display: inline-block;
}
.dropdown-content {
    position: absolute;
    top: 0;
    left: 100%;
    display: inline-block;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}
.color-circle {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 5px;
    transition: transform 0.2s ease-in-out;
    border: 2px solid black;
}
.color-circle:hover {
    transform: scale(1.2);
}
.dropdown-enter-active {
    animation: dropdown-in 0.3s ease-out forwards;
}
.dropdown-leave-active {
    animation: dropdown-out 0.3s ease-out forwards;
}
@keyframes dropdown-in {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes dropdown-out {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(20px);
    }
}

.note-body {
    max-height: 300px;
    overflow-y: auto;
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
</style>

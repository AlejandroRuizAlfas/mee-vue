<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div id="note-board">
                <button class="add-note" type="button" @click="addNote">+</button>
                <textarea v-for="note in notes" :key="note.note_id" spellcheck="false" class="note" :style="{ backgroundColor: note.color }" :value="note.content" placeholder="Empty Sticky Note" @change="updateNote(note, $event.target.value)" @dblclick="showNote(note)"> </textarea>
                <div v-if="showDialog" class="backdrop">
                    <div class="dialog-wrapper">
                        <teleport to="body">
                            <NoteShow :note="currentNote" />
                        </teleport>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NoteShow from '../components/NoteShow.vue';
import Loading from '../components/Loading.vue';
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    components: {
        NoteShow,
        Loading,
    },
    data() {
        return {
            showDialog: false,
            currentNote: {},
            colors: ['#ffffff', '#dcedc1', '#a8e6cf', '#ffaaa5', '#cbdadb', '#ffdbac', '#e3f0ff', '#e4dcf1'],
            notes: [],
            isLoading: false,
        };
    },
    async mounted() {
        // this.isLoading = true;
        // this.notes = await this.getAllNotes();
        // this.isLoading = false;
        this.isLoading = true;
        setTimeout(async () => {
            this.notes = await this.getAllNotes();
            this.isLoading = false;
        }, 2000); // TODO QUITAR SET TIMEOUT
    },
    methods: {
        ...mapActions(useStore, ['addNoteStore', 'editNoteStore']),
        saveNotes(notes) {
            // localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
        },
        createNoteElement(id, content) {
            return {
                id: id,
                content: content,
            };
        },
        async addNote() {
            let response = await this.addNoteStore();
            this.notes.push(response);
        },
        async updateNote(note, newContent) {
            note.content = newContent;
            let response = await this.editNoteStore(note);
            this.notes.push(response);
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => note.id != id);
            this.saveNotes(this.notes);
        },
        showNote(note) {
            this.currentNote = note;
            this.showDialog = true;
        },
        randomColor() {
            // return this.colors[Math.floor(Math.random() * colors.length)];
            console.log(this.colors);
        },
    },
    computed: {
        ...mapState(useStore, ['getAllNotes']),
    },
};
</script>

<style scoped>
.container-fluid {
    background-color: #233d4d;
    height: 100vh;
}
#note-board {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    padding: 24px;
    gap: 24px;
}

.note {
    height: 200px;
    box-sizing: border-box;
    padding: 16px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.15);
    resize: none;
    font-family: sans-serif;
    font-size: 16px;
    overflow: hidden;
}
.note:hover {
    overflow: auto;
}

.add-note {
    height: 200px;
    border: none;
    outline: none;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 120px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    transition: background 0.2s;
    padding-top: -100px;
}

.add-note:hover {
    background: rgba(0, 0, 0, 0.2);
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
</style>

<template>
    <div class="container-fluid" style="padding-top: 20px">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div id="note-board">
                <div class="add-note text-center" type="button" @click="addNote">+</div>
                <textarea v-for="note in notes" :key="note.note_id" spellcheck="false" class="note" :style="{ backgroundColor: note.color }" :value="note.content" placeholder="Empty Sticky Note" @change="updateNote(note, $event.target.value)" @dblclick="showNote(note)"> </textarea>
                <div v-if="showDialog" class="backdrop">
                    <div class="dialog-wrapper">
                        <teleport to="body">
                            <NoteShow @closeDialog="handleCloseDialog" :note="currentNote" />
                        </teleport>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!notes">
            <div class="row empty-wrapper">
                <img class="empty-img" src="/src/assets/empty/notesempty.png" />
            </div>
            <div class="row text-center">
                <p class="empty-text">Do you usually forget things?</p>
                <p class="empty-text">Write it on a note!</p>
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
        this.isLoading = true;
        setTimeout(async () => {
            this.notes = await this.getAllNotes();
            this.isLoading = false;
        }, 1000); // TODO QUITAR SET TIMEOUT
    },
    methods: {
        ...mapActions(useStore, ['addNoteStore', 'editNoteStore']),
        saveNotes(notes) {},
        createNoteElement(id, content) {
            return {
                id: id,
                content: content,
            };
        },
        async addNote() {
            let response = await this.addNoteStore();
            !this.notes ? (this.notes = []) : '';
            this.notes.push(response);
        },
        async updateNote(note, newContent) {
            note.content = newContent;
            let response = await this.editNoteStore(note);
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => note.id != id);
            this.saveNotes(this.notes);
        },
        showNote(note) {
            this.currentNote = note;
            this.showDialog = true;
        },
        handleCloseDialog() {
            this.showDialog = false;
        },
    },
    computed: {
        ...mapState(useStore, ['getAllNotes']),
    },
};
</script>

<style scoped>
#note-board {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    place-content: center;
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
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    font-size: 120px;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
}

.add-note:hover {
    background: rgba(0, 0, 0, 0.4);
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

@media only screen and (max-width: 495px) {
    #note-board {
        display: grid;
        grid-template-columns: repeat(auto-fill, 175px);
        padding: 24px;
        gap: 24px;
    }

    .note,
    .add-note {
        width: 175px;
        height: 175px;
    }

    .add-note {
        font-size: 110px;
    }
}

@media only screen and (max-width: 450px) {
    #note-board {
        display: grid;
        grid-template-columns: repeat(auto-fill, 200px);
        padding: 24px;
        gap: 24px;
    }

    .note,
    .add-note {
        width: 200px;
        height: 200px;
    }
}
</style>

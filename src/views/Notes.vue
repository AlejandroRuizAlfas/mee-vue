<template>
    <div id="note-board">
        <button class="add-note" type="button" @click="addNote">+</button>
        <textarea v-for="note in notes" :key="note.id" class="note" :style="{ backgroundColor: note.color }"
            :value="note.content" placeholder="Empty Sticky Note" @change="updateNote(note.id, $event.target.value)"
            @dblclick="showNote(note.id)">                                                        </textarea>
        <div v-if="showDialog" class="backdrop">
            <div class="dialog-wrapper">
                <teleport to="body">
                    <NoteShow />
                </teleport>
            </div>
        </div>
    </div>
</template>
  
<script>
import NoteShow from "../components/NoteShow.vue";

export default {
    components: {
        NoteShow,
    },
    data() {
        return {
            showDialog: false,
            notes: [
                {
                    id: 1,
                    title: "Meeting Notes",
                    content: "Discussed Q1 sales strategy",
                    date: "2022-02-28",
                    color: "#af3",
                },
                {
                    id: 2,
                    title: "Shopping List",
                    content: "Milk, eggs, bread, cheese",
                    date: "2022-03-01",
                    color: "#435656",
                },
                {
                    id: 3,
                    title: "To-Do List",
                    content: "Finish project proposal, send email to boss",
                    date: "2022-02-27",
                    color: "#243574",
                },
                {
                    id: 4,
                    title: "Recipe",
                    content: "Ingredients:\n- 1 cup flour\n- 1 egg\n- 1 tsp salt\n...",
                    date: "2022-02-26",
                    color: "#357865",
                },
            ],
        };
    },

    mounted() {
        this.notes = this.getNotes();
    },
    methods: {
        getNotes() {
            // return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
            return this.notes;
        },
        saveNotes(notes) {
            // localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
        },
        createNoteElement(id, content) {
            return {
                id: id,
                content: content
            };
        },
        addNote() {
            const noteObject = {
                id: Math.floor(Math.random() * 100000),
                content: ""
            };

            this.notes.push(noteObject);
            this.saveNotes(this.notes);
        },
        updateNote(id, newContent) {
            const targetNote = this.notes.filter((note) => note.id == id)[0];
            targetNote.content = newContent;
            this.saveNotes(this.notes);
        },
        deleteNote(id) {
            this.notes = this.notes.filter((note) => note.id != id);
            this.saveNotes(this.notes);
        },
        showNote() {
            this.showDialog = true;
        },
    }
};
</script>
  
<style scoped>
#note-board {
    display: grid;
    grid-template-columns: repeat(auto-fill, 200px);
    padding: 24px;
    gap: 24px;
    background: #009578;

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
  
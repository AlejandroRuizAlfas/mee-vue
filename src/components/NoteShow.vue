<template>
    <div id="dialog" class="dialog p-4" v-if="note">
        <div class="dialog-content">
            <h4>Title</h4>
            <p ref="editable" @click="makeEditable">{{ note.title }}!</p>

            <h4>Content</h4>
            <div contenteditable="true">{{ note.content }}.</div>

            <div class="button-group">
                <button class="button">
                    <i class="bi bi-save">Save</i>
                </button>
                <button class="button">
                    <i class="icon"></i>
                </button>
                <button class="button">
                    <i class="icon"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        message: String,
        note: Object,
    },
    methods: {
        // makeEditable() {
        //     editable.value.contentEditable = true;
        //     editable.value.focus();
        // },
    },
    mounted() {
        console.log(this.note.color);
        document.getElementById('dialog').style.backgroundColor = this.note.color;
    },
};
</script>

<style>
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

    resize: none; /*remove the resize handle on the bottom right*/
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
</style>

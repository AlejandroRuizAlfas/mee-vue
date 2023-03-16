<template>
    <div class="dialog p-4">
        <h4>Title</h4>
        <p ref="editable" @click="makeEditable">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae earum
            animi pariatur, sint consectetur
            assumenda nemo incidunt, sit rem repudiandae doloremque veniam fugit voluptatibus quidem asperiores magni,
            perferendis officiis recusandae!</p>

        <h4>Content</h4>
        <textarea
            value="Lorem impssdahasufh wuefhwue hfwufh weufhwuhfweuhf wuhfuwhefui wfehfi< hfveiukrjhgfv euirhgfyuih" />
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        message: String,
    },
    methods: {
        makeEditable() {
            editable.value.contentEditable = true;
            editable.value.focus();
        }
    },
};
</script>

<style>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
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
</style>
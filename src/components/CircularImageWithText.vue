<template>
    <div class="circular-image-with-text">
        <div class="image-container">
            <img :src="imageSrc" alt="Profile Picture" class="image" />
        </div>
        <div class="text">{{ text }}</div>
    </div>
</template>

<script>
export default {
    name: 'CircularImageWithText',
    props: {
        imageSrc: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
.circular-image-with-text {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-container {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 10px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.text {
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
}
</style>

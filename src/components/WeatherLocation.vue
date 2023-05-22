<template>
    <div class="dialog p-4">
        <div class="locationList mt-3" v-if="locations.length > 0">
            <button class="btn btn-sm btn-outline-secondary close-dialog" @click="handleClose">
                <i class="bi bi-x"></i>
            </button>
            <div class="location-row my-0" v-for="item in locations" :key="item.name" @click="selectLocation(item)">
                <div class="row">
                    <div class="col-10 px-4">
                        {{ item.name }}
                    </div>
                    <div class="col-2">
                        <country-flag :country="item.country" size="normal"></country-flag>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty-locations">
            <p>No locations found. Try other names!</p>
            <button class="btn btn-primary" @click="handleClose">Go back</button>
        </div>
    </div>
</template>

<script>
import CountryFlag from 'vue-country-flag-next';

export default {
    components: {
        CountryFlag,
    },
    props: {
        title: String,
        message: String,
        locations: [],
    },
    methods: {
        selectLocation(location) {
            this.$emit('done', location);
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
    background-color: #0b131e;
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

.locationList {
    max-height: 450px;
    overflow: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}

.locationList::-webkit-scrollbar {
    display: none;
}

.location-row {
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.location-row:hover {
    background-color: #1a2433;
    cursor: pointer;
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
    color: rgb(253, 99, 99);
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

.empty-locations {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
}

@media only screen and (max-width: 550px) {
    .dialog {
        width: 90%;
    }
}
</style>

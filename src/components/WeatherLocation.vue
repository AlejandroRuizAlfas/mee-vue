<template>
    <div class="dialog p-4">
        <div class="locationList mt-3">
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

.locationList {
    max-height: 400px;
    overflow-y: auto;
}

.location-row {
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.location-row:hover {
    background-color: beige;
    cursor: pointer;
}
</style>

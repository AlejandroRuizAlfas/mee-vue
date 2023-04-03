<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';

export default {
    data() {
        return {
            locations: [
                { id: 0, title: 'Map 1', longitude: 32, latitude: 34 },
                { id: 1, title: 'Map 2', longitude: 124, latitude: 12 },
            ],
        };
    },
    methods: {
        initGeolocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.success, this.fail);
            } else {
                alert('Sorry, your browser does not support geolocation services.');
            }
        },
        success(position) {
            console.log(position.coords.longitude);
            console.log(position.coords.latitude);
            let location = { id: 3, title: 'Map 1', longitude: position.coords.longitude, latitude: position.coords.latitude };
            this.locations.push(location);
        },
        fail() {
            console.log('Failed');
        },
    },
    computed: {},
};
</script>

<template>
    <div class="container" style="padding-top: 20px">
        <button class="btn btn-primary w-100" @click="initGeolocation">Save location</button>
        <!-- <div class="row m-4 map-card" v-for="item in locations" :key="item.id">
            <div class="col-md-4 col-12 map-view">
                <iframe :src="'https://maps.google.com/maps?q=' + item.latitude + ',' + item.longitude + '&hl=es;z=14&amp;output=embed'" width="400" height="300" frameborder="0" style="border: 0" allowfullscreen="" aria-hidden="false" tabindex="0"> </iframe>
            </div>
            <div class="col-md-8 col-12 map-item p-4">
                <h4>{{ item.title }}</h4>
                <span class="text-span"><i class="bi bi-geo-alt-fill icon-text"></i>Alicante</span><br />
                <span class="text-span"><i class="bi bi-flag-fill icon-text"></i>Spain</span><br />
                <span class="text-span"><i class="bi bi-clock icon-text"></i>Location added on {{ new Date().toLocaleDateString() }} at {{ new Date().toLocaleTimeString() }}</span>
            </div>
        </div> -->
        <div class="card-container m-4">
            <div class="card" v-for="item in locations" :key="item.id">
                <iframe :src="'https://maps.google.com/maps?q=' + 25 + ',' + 7 + '&hl=es;z=14&amp;output=embed'" width="400" height="300" frameborder="0" style="border: 0" allowfullscreen="" aria-hidden="false" tabindex="0"> </iframe>
                <div class="card-data p-4">
                    <h4>{{ item.title }}</h4>
                    <span class="text-span"><i class="bi bi-geo-alt-fill icon-text"></i>Alicante</span><br />
                    <span class="text-span"><i class="bi bi-flag-fill icon-text"></i>Spain</span><br />
                    <span class="text-span"><i class="bi bi-clock icon-text"></i>Added on {{ new Date().toLocaleDateString() }} at {{ new Date().toLocaleTimeString() }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.map-item {
    background-color: white;
}

.map-card {
    background-color: aquamarine;
    padding: 10px;
    border-radius: 20px;
}
.icon-text {
    margin-right: 10px;
}
.text-span {
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: rgb(61, 61, 61);
}

.card {
    width: 400px;
}
.card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}

/* @media only screen and (max-width: 600px) {
    .card-container {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
    }
}
@media only screen and (min-width: 768px) {
    .card-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
} */
</style>

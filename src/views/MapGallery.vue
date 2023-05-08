<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import Loading from '../components/Loading.vue';
import axios from 'axios';

export default {
    components: {
        Loading,
    },
    data() {
        return {
            locations: [],
            isLoading: false,
        };
    },
    methods: {
        ...mapActions(useStore, ['addMapStore', 'editMapStore', 'deleteMapStore']),
        initGeolocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(this.success, this.fail);
            } else {
                alert('Sorry, your browser does not support geolocation services.');
            }
        },
        success(position) {
            // let location = { id: 3, title: 'Map 1', longitude: position.coords.longitude, latitude: position.coords.latitude };
            // this.locations.push(location);
            let url = 'https://nominatim.openstreetmap.org/reverse.php?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&zoom=13&format=jsonv2&accept-language=en';
            axios
                .get(url)
                .then((response) => {
                    let data = response.data;
                    let names = data.display_name.split(',');
                    let address = names[0] + ', ' + names[3];
                    let created = 'Created on ' + new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString();
                    let location = { title: 'Name your location...', address: address, latitude: position.coords.latitude, longitude: position.coords.longitude, info: names[4], createdAt: created };
                    this.locations.push(location);
                    this.addMapStore(location);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fail() {
            console.log('Failed');
        },
        async handleChangeTitle(map, newContent) {
            map.title = newContent;
            let response = await this.editMapStore(map);
        },
        handleDeleteMap(map) {
            this.deleteMapStore(map);
        },
    },
    computed: {
        ...mapState(useStore, ['getAllMaps']),
    },
    async mounted() {
        this.isLoading = true;
        this.locations = await this.getAllMaps();
        this.isLoading = false;
    },
};
</script>

<template>
    <div class="container" style="padding-top: 20px">
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <button class="btn btn-primary w-100" @click="initGeolocation">Save my current location</button>
            <div class="card-container m-4">
                <div class="card" v-for="item in locations" :key="item.id">
                    <iframe :src="'https://maps.google.com/maps?q=' + item.latitude + ',' + item.longitude + '&hl=es;z=14&amp;output=embed'" width="400" height="300" frameborder="0" style="border: 0" allowfullscreen="" aria-hidden="false" tabindex="0"> </iframe>
                    <div class="card-data p-4">
                        <div class="row">
                            <div class="col-10">
                                <div id="loc-title" class="location-title" contenteditable="true" spellcheck="false" @blur="handleChangeTitle(item, $event.target.textContent)">{{ item.title }}</div>
                            </div>
                            <div class="col-2">
                                <span><i class="bi bi-trash" @click="handleDeleteMap(item)" style="color: #dc3545; font-size: 24px; float: right"></i></span>
                            </div>
                        </div>
                        <span class="text-span"><i class="bi bi-geo-alt-fill icon-text"></i>{{ item.address }}</span
                        ><br />
                        <span class="text-span"><i class="bi bi-flag-fill icon-text"></i>{{ item.info }}</span
                        ><br />
                        <span class="text-span"><i class="bi bi-clock icon-text"></i>{{ item.createdAt }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    background-color: white;
}
.map-item {
    background-color: white;
}

.icon-text {
    margin-right: 10px;
}
.text-span {
    font-size: 18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    color: rgb(121, 121, 121);
}

.card-data {
    background-color: #202123;
}

.card {
    width: 400px;
}
.card-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}

.location-title {
    color: white;
    font-size: 30px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    line-height: 1.1em;
    padding-bottom: 10px;
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

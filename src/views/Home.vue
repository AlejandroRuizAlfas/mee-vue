<template>
    <!-- <div class="home-page justify-content-center"></div> -->
    <div class="container">
        <div class="row feature-row">
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/to-do-list.png" class="feature-img" />
            </div>
            <div class="col-md-8 col-12">
                <h1>Todo-List</h1>
                <h4>Stay organized and productive with interactive to-do list. Prioritize tasks, set due dates, and check off completed items. Never miss a beat again!</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
        </div>
        <hr class="hr" />

        <div class="row feature-row">
            <div class="col-md-8 col-12">
                <h1>Notes</h1>
                <h4>Create and manage your notes effortlessly. Write important information, ideas, or reminders. Save and access them anytime you need.</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/note-icon.png" class="feature-img" />
            </div>
        </div>
        <hr class="hr" />

        <div class="row feature-row">
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/shopping-list.png" class="feature-img" />
            </div>
            <div class="col-md-8 col-12">
                <h1>Buylist</h1>
                <h4>Keep track of your shopping needs with convenient buy list feature. Add items, manage quantities, and even mark them as purchased. Never forget your grocery list again!</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
        </div>
        <hr class="hr" />

        <div class="row feature-row">
            <div class="col-md-8 col-12">
                <h1>Map Gallery</h1>
                <h4>Save your favorite locations and never lose them again. Explore new places, mark your favorite spots, and access directions whenever you want. Adventure awaits!</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/map.png" class="feature-img" />
            </div>
        </div>
        <hr class="hr" />

        <div class="row feature-row">
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/weather-app.png" class="feature-img" />
            </div>
            <div class="col-md-8 col-12">
                <h1>Weather</h1>
                <h4>Stay informed about the latest weather conditions. Get real-time updates, forecasts, and temperature details for your current location or any city around the world.</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
        </div>
        <hr class="hr" />

        <div class="row feature-row">
            <div class="col-md-8 col-12">
                <h1>News</h1>
                <h4>Stay up to date with the latest headlines and breaking news. Search for news articles, browse different categories, and read the news that matters to you.</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/newspaper.png" class="feature-img" />
            </div>
        </div>
        <hr class="hr" />

        <div class="row feature-row">
            <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                <img src="/src/assets/sidemenu/puzzle.png" class="feature-img" />
            </div>
            <div class="col-md-8 col-12">
                <h1>Translation & Dictionary</h1>
                <h4>Break down language barriers with translation and dictionary tools. Translate text between multiple languages, expand your vocabulary, and enhance your language skills.</h4>
                <button class="btn btn-success mt-2">Take me there!</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    data() {
        return {
            clickedMenu: false,
            features: [
                { id: 0, image: '/src/assets/sidemenu/to-do-list.png', name: 'To-Do List', desc: 'Stay organized and productive with interactive to-do list. Prioritize tasks, set due dates, and check off completed items. Never miss a beat again!' },
                { id: 1, image: '/src/assets/sidemenu/note-icon.png', name: 'Notes', desc: 'Create and manage your notes effortlessly. Write important information, ideas, or reminders. Save and access them anytime you need.' },
                { id: 2, image: '/src/assets/sidemenu/shopping-list.png', name: 'Buylist', desc: 'Keep track of your shopping needs with convenient buy list feature. Add items, manage quantities, and even mark them as purchased. Never forget your grocery list again!' },
                { id: 3, image: '/src/assets/sidemenu/map.png', name: 'Map Gallery', desc: 'Save your favorite locations and never lose them again. Explore new places, mark your favorite spots, and access directions whenever you want. Adventure awaits!' },
                { id: 4, image: '/src/assets/sidemenu/weather-app.png', name: 'Weather', desc: 'Stay informed about the latest weather conditions. Get real-time updates, forecasts, and temperature details for your current location or any city around the world.' },
                { id: 5, image: '/src/assets/sidemenu/newspaper.png', name: 'News', desc: 'Stay up to date with the latest headlines and breaking news. Search for news articles, browse different categories, and read the news that matters to you.' },
                { id: 6, image: '/src/assets/sidemenu/puzzle.png', name: 'Translation & Dictionary', desc: 'Break down language barriers with translation and dictionary tools. Translate text between multiple languages, expand your vocabulary, and enhance your language skills.' },
            ],
        };
    },
    methods: {
        ...mapActions(useStore, []),
        goTo(action) {
            this.$router.push('/' + action);
        },
    },
    mounted() {
        // if (!localStorage.mee_user) {
        //     this.$router.push('/auth');
        // }
        document.getElementsByClassName('fixed-menu')[0].style.visibility = 'visible';
    },
};
</script>

<style scoped>
.home-page {
    height: 100vh;
    display: grid;
    place-items: center;
}

.feature-row {
    display: flex;
    align-items: center;
    margin-left: 25px;
    margin-right: 25px;
}
.feature-img {
    width: 200px;
    height: 200px;
    margin-top: 10%;
    margin-bottom: 10%;
}
h1,
h4 {
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bolder;
    text-align: justify;
    text-justify: inter-word;
}

.feature-icon-wrapper {
    display: grid;
    place-items: center;
}

.hr {
    color: white;
}
</style>

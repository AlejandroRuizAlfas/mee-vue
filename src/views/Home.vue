<template>
    <!-- <div class="home-page justify-content-center"></div> -->
    <div class="upper-header">
        <div class="row top-banner">
            <div class="col-lg-6 col-12 top-header-column">
                <h1 class="top-banner-main-title">Organize your life much better with Mee!</h1>
                <h5 class="top-banner-sub-title mt-2">Mee is a friendly robot that will help you organize everything much easier. Be productive and forget about everything else!</h5>
                <div class="header-buttons mt-5 pt-2" v-if="!user">
                    <button class="header-auth-btn" @click="goTo('auth')">Login</button>
                    <p class="or-text">or</p>
                    <button class="header-auth-btn" @click="goToRegister()">Register</button>
                </div>
            </div>
            <div class="col-lg-3 col-12 top-header-column">
                <img src="/src/assets/mee/main.png" width="400" height="400" />
            </div>
        </div>
    </div>
    <div class="container">
        <div class="below-header">
            <div class="row feature-row">
                <div class="col-md-4 col-12 pr-4 feature-icon-wrapper">
                    <img src="/src/assets/sidemenu/to-do-list.png" class="feature-img" />
                </div>
                <div class="col-md-8 col-12">
                    <h1>Todo-List</h1>
                    <h4>Stay organized and productive with interactive to-do list. Prioritize tasks, set due dates, and check off completed items. Never miss a beat again!</h4>
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('todolist')">Take me there!</button>
                    </div>
                </div>
            </div>
            <hr class="hr" />

            <div class="row feature-row">
                <div class="col-md-8 col-12">
                    <h1>Notes</h1>
                    <h4>Create and manage your notes effortlessly. Write important information, ideas, or reminders. Save and access them anytime you need.</h4>
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('notes')">Take me there!</button>
                    </div>
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
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('buyList')">Take me there!</button>
                    </div>
                </div>
            </div>
            <hr class="hr" />

            <div class="row feature-row">
                <div class="col-md-8 col-12">
                    <h1>Map Gallery</h1>
                    <h4>Save your favorite locations and never lose them again. Explore new places, mark your favorite spots, and access directions whenever you want. Adventure awaits!</h4>
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('maps')">Take me there!</button>
                    </div>
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
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('words')">Take me there!</button>
                    </div>
                </div>
            </div>
            <hr class="hr" />

            <div class="row feature-row">
                <div class="col-md-8 col-12">
                    <h1>News</h1>
                    <h4>Stay up to date with the latest headlines and breaking news. Search for news articles, browse different categories, and read the news that matters to you.</h4>
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('news')">Take me there!</button>
                    </div>
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
                    <div class="text-center">
                        <button class="product-row-button mt-4" @click="goTo('words')">Take me there!</button>
                    </div>
                </div>
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
            user: false,
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
        goToRegister() {
            this.$router.push({ name: 'authRegister', params: { action: 'register' } });
        },
    },
    mounted() {
        // if (!localStorage.mee_user) {
        //     this.$router.push('/auth');
        // }
        this.user = localStorage.getItem('mee_user');
        document.getElementsByClassName('fixed-menu')[0].style.visibility = 'visible';
    },
};
</script>

<style scoped>
.container {
    margin-top: 100px;
}
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
    padding-top: 100px;
    padding-bottom: 100px;
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
.upper-header {
    display: grid;
    place-items: center;
    padding-top: 10rem;
    padding-bottom: 10rem;
    background-color: #0b131e;
    border-bottom-left-radius: 50% 10%;
    border-bottom-right-radius: 50% 10%;
}

.top-banner {
    display: flex;
    align-items: center;
    justify-content: center;
}

.top-header-column {
    display: grid;
    place-items: center;
}

.top-banner-main-title {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 3rem;
    font-weight: bolder;
    text-align: start;
}

.top-banner-sub-title {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: white;
    font-weight: bold;
    text-align: start;
}

.header-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.header-auth-btn {
    appearance: none;
    background-color: transparent;
    border: 2px solid #0dd481;
    border-radius: 15px;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    max-height: 50px;
    min-width: 150px;
    outline: none;
    padding: 4px 24px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
    will-change: transform;
}

.header-auth-btn:hover {
    color: #fff;
    background-color: #0dd481;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
}
.or-text {
    font-size: 16px;
    font-weight: bold;
    margin-top: 12px;
    color: white;
}

.product-row-button {
    appearance: none;
    background-color: transparent;
    border: 2px solid #0dd481;
    border-radius: 40px;
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    margin: 0;
    height: 60px;
    min-width: 150px;
    max-width: 300px;
    outline: none;
    padding: 4px 24px;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 100%;
    will-change: transform;
}

.product-row-button:hover {
    color: #fff;
    background-color: #0b131e;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
}

@media only screen and (max-width: 800px) {
    .top-banner-main-title {
        font-size: 2.5rem;
        text-align: center;
        padding-left: 10%;
        padding-right: 10%;
    }

    .top-banner-sub-title {
        text-align: center;
        padding-left: 10%;
        padding-right: 10%;
    }

    .upper-header {
        border-bottom-left-radius: 50% 4%;
        border-bottom-right-radius: 50% 4%;
    }
    .container {
        margin-top: 0px;
    }
}
</style>

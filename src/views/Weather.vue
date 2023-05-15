<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';
import WeatherLocation from '../components/WeatherLocation.vue';
import Loading from '../components/Loading.vue';

export default {
    components: {
        WeatherLocation,
        Loading,
    },
    data() {
        return {
            place: { name: 'Madrid', country: 'ES', latitude: '40.417975083297925', longitude: '-3.6980873676940718' },
            currentWeather: [],
            forecast: [],
            forecast3days: [],
            filteredHours: [],
            citiesArray: [],
            cityString: '',
            showDialog: false,
            locations: [],
            isLoading: false,
        };
    },
    methods: {
        getTodayForecast(lat, lng) {
            axios
                .get('https://api.weatherapi.com/v1/forecast.json?key=fcd6ef5129334e7eba2133208221205&q=' + lat + ',' + lng + '&days=7&aqi=yes&alerts=no%22')
                .then((response) => {
                    this.forecast = response.data.forecast.forecastday[0];
                    this.currentWeather = response.data.current;
                    this.forecast3days = response.data.forecast.forecastday;
                    this.filteredHours = [];
                    const now = new Date().getHours();
                    this.forecast.hour.forEach((e) => {
                        if (new Date(e.time) > new Date() || new Date(e.time).getHours() == now) {
                            this.filteredHours.push(e);
                        }
                    });
                })
                .catch((err) => alert(err));
        },
        getAllCities() {
            fetch('https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json')
                .then((response) => response.json())
                .then((data) => {
                    this.citiesArray = data.map((city) => ({
                        name: city.name,
                        country: city.country,
                        latitude: city.lat,
                        longitude: city.lng,
                    }));
                })
                .catch((error) => console.error(error));
        },
        searchCityInArray() {
            const resultPromise = new Promise((resolve) => {
                if (this.cityString.length > 1) {
                    const result = this.citiesArray.filter((obj) => obj.name.toLocaleLowerCase().includes(this.cityString.toLocaleLowerCase()));
                    resolve(result);
                }
            });

            resultPromise.then((result) => {
                this.locations = result;
                this.showLocationDialog();
            });
        },
        showLocationDialog() {
            this.showDialog = true;
        },
        handleCloseDialog() {
            this.showDialog = false;
            this.cityString = '';
        },
        onLocationChosen(loc) {
            this.showDialog = false;
            this.cityString = '';
            this.place = loc;
            this.getTodayForecast(loc.latitude, loc.longitude);
        },
        getAmPmFormat(dateString) {
            const dateObj = new Date(dateString);
            const timeString = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(dateObj);
            return timeString;
        },
        getWeekDay(date) {
            let weekday = new Date(date);
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return weekdays[weekday.getDay()];
        },
        printCurrentDateString() {
            const today = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
            const dateStr = today.toLocaleDateString('en-US', options);
            const hour24 = today.getHours().toString().padStart(2, '0');
            const dateStr24 = dateStr.replace(/(\d{1,2}):(\d{2}):(\d{2})/, hour24 + ':$2:$3');
            return dateStr24;
        },
    },
    computed: {
        today() {
            return new Date().toLocaleString();
        },
    },
    async mounted() {
        this.isLoading = true;
        setTimeout(async () => {
            this.getAllCities();
            await this.getTodayForecast('40.417975083297925', '-3.6980873676940718');
            this.isLoading = false;
        }, 1000); // TODO QUITAR SET TIMEOUT
    },
};
</script>

<template>
    <div v-if="isLoading">
        <Loading />
    </div>
    <div class="weather-wrapper" v-else>
        <div class="container-fluid" style="padding-top: 20px">
            <div class="row justify-content-center">
                <div class="search-bar">
                    <input id="searchInput" type="text" v-model="cityString" placeholder="Search for the name of a city..." />
                    <datalist id="citiesList"></datalist>
                    <button type="submit" @click="searchCityInArray()"><i class="bi bi-search"></i></button>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-9" id="main-info">
                    <div class="today-forecast m-4 p-4">
                        <h3 class="display-5 px-4">{{ printCurrentDateString() }}</h3>

                        <div class="row mt-5">
                            <div class="col-8 mx-4">
                                <h1 class="display-1 place-name px-4">{{ place.name }}</h1>
                                <h3 class="display-2 place-temp px-4">{{ currentWeather.temp_c }}ºC</h3>
                            </div>
                            <div class="col-3">
                                <img v-if="currentWeather.condition" src="/src/assets/weather/sun.png" class="current-big-icon" width="250" height="250" />
                            </div>
                            <!-- <div class="col-2" v-if="forecast3days[0]">
                            <img :src="currentWeather.condition.icon" class="current-big-icon" />
                        </div> -->
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-12" id="aside-info">
                    <div class="week-forecast justify-content-center text-center m-4 p-4">
                        <h4>3-DAY FORECAST</h4>
                        <div class="row mt-4 align-items-center">
                            <div class="col-4 mx-auto">
                                <div>Today</div>
                            </div>
                            <div class="col-4">
                                <div v-if="forecast3days[0]">
                                    <img :src="forecast3days[0].day.condition.icon" />
                                    {{ forecast3days[0].day.condition.text }}
                                </div>
                            </div>
                            <div class="col-4">
                                <div v-if="forecast3days[0]">
                                    Min: {{ forecast3days[0].day.mintemp_c }}ºC <br />
                                    Max: {{ forecast3days[0].day.maxtemp_c }}ºC
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4 align-items-center">
                            <div class="col-4 mx-auto">
                                <div v-if="forecast3days[1]">{{ getWeekDay(forecast3days[1].date) }}</div>
                            </div>
                            <div class="col-4">
                                <div v-if="forecast3days[1]">
                                    <img :src="forecast3days[1].day.condition.icon" />
                                    {{ forecast3days[1].day.condition.text }}
                                </div>
                            </div>
                            <div class="col-4">
                                <div v-if="forecast3days[1]">
                                    Min: {{ forecast3days[1].day.mintemp_c }}ºC <br />
                                    Max: {{ forecast3days[1].day.maxtemp_c }}ºC
                                </div>
                            </div>
                        </div>

                        <div class="row mt-4 align-items-center">
                            <div class="col-4 mx-auto">
                                <div v-if="forecast3days[2]">{{ getWeekDay(forecast3days[2].date) }}</div>
                            </div>
                            <div class="col-4">
                                <div v-if="forecast3days[2]">
                                    <img :src="forecast3days[2].day.condition.icon" />
                                    {{ forecast3days[2].day.condition.text }}
                                </div>
                            </div>
                            <div class="col-4">
                                <div v-if="forecast3days[2]">
                                    Min: {{ forecast3days[2].day.mintemp_c }}ºC <br />
                                    Max: {{ forecast3days[2].day.maxtemp_c }}ºC
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-9">
                    <div class="hourly-panel m-4 p-4">
                        <h3 class="mx-3 py-2" style="margin-bottom: 16px">Today's forecast</h3>
                        <div class="hourly-forecast-container mt-2">
                            <div v-for="item in filteredHours" class="text-center hourly-forecast w-20">
                                <p>{{ getAmPmFormat(item.time) }}</p>
                                <img :src="item.condition.icon" />
                                <h3>{{ Math.round(item.temp_c) }}º</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="hourly-panel m-4 p-4">
                        <h3 class="mx-3 py-2" style="margin-bottom: 16px">Astro information</h3>
                        <div class="astro-info-container mt-2">
                            <div class="row">
                                <div class="col-4">
                                    <img v-if="currentWeather.condition" src="/src/assets/weather/sun.png" class="current-big-icon" width="100" height="100" style="float: left" />
                                </div>
                                <div class="col-8">
                                    <div v-if="forecast.astro" class="w-100">Sunrise: {{ forecast.astro.sunrise }}</div>
                                    <div v-if="forecast.astro" class="w-100">Sunset: {{ forecast.astro.sunset }}</div>
                                </div>
                            </div>

                            <hr class="hr" />
                            <div class="row">
                                <div class="col-8">
                                    <div v-if="forecast.astro" class="w-100">Moonrise: {{ forecast.astro.moonrise }}</div>
                                    <div v-if="forecast.astro" class="w-100">Moonset: {{ forecast.astro.moonset }}</div>
                                    <div v-if="forecast.astro" class="w-100">Moon Phase: {{ forecast.astro.moon_phase }}</div>
                                    <div v-if="forecast.astro" class="w-100">Moon Illumination: {{ forecast.astro.moon_illumination }}%</div>
                                </div>
                                <div class="col-4">
                                    <img v-if="currentWeather.condition" src="/src/assets/weather/moon.png" class="current-big-icon" width="100" height="100" style="float: left" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center">
                <div class="col-9">
                    <div class="conditions-panel m-4 p-4">
                        <h3 class="mx-3 py-2" style="margin-bottom: 16px">Air conditions</h3>
                        <div class="air-conditions-container mt-2 mb-4">
                            <div class="row mx-5">
                                <div class="col-6">
                                    <p class="mb-0 air-conditions-container-title"><span class="bi bi-thermometer-half"> Real feel</span></p>
                                    <div class="air-conditions-container-values">{{ currentWeather.feelslike_c }}º</div>
                                </div>
                                <div class="col-6">
                                    <p class="mb-0 air-conditions-container-title"><span class="bi bi-wind"> Wind</span></p>
                                    <div class="air-conditions-container-values">{{ currentWeather.gust_kph }} km/h</div>
                                </div>
                            </div>
                            <div class="row mx-5 mt-2">
                                <div class="col-6">
                                    <p class="mb-0 air-conditions-container-title"><span class="bi bi-droplet-fill"> Rain</span></p>
                                    <div class="air-conditions-container-values">{{ currentWeather.precip_mm }} mm</div>
                                </div>
                                <div class="col-6">
                                    <p class="mb-0 air-conditions-container-title"><span class="bi bi-sun-fill"> UV Index</span></p>
                                    <div class="air-conditions-container-values">{{ currentWeather.uv }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3"></div>
            </div>
        </div>

        <div v-if="showDialog" class="backdrop">
            <div class="dialog-wrapper">
                <teleport to="body">
                    <WeatherLocation :locations="locations" @done="onLocationChosen" @closeDialog="handleCloseDialog" />
                </teleport>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&family=Rubik:wght@600&display=swap');

.container-fluid {
    background-color: #0b131e;
    /* height: 100vh; */
}
.weather-card {
    background-color: azure;
    width: 60%;
    height: 200px;
    border-radius: 40px;
}
.weather-card-image {
    width: 200px;
    height: auto;
}

.search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
}

.search-bar form {
    display: flex;
    align-items: center;
    width: 100%;
}

.search-bar input[type='text'] {
    flex: 1;
    height: 40px;
    padding: 10px 20px 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 20px 0 0 20px;
}

.search-bar button[type='submit'] {
    height: 40px;
    width: 40px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
}

.search-bar button[type='submit'] i {
    color: #333;
    font-size: 16px;
}

.search-bar input[type='text']:focus {
    outline: none;
    box-shadow: 0 0 5px #ccc;
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

.week-forecast,
.hourly-panel,
.conditions-panel {
    background-color: #202b3b;
    border-radius: 20px;
    height: auto;
    color: white;
}
.place-name,
.place-temp {
    font-family: 'Rubik', sans-serif;
    font-weight: bolder;
}

/* .hourly-forecast {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

.hourly-forecast:hover {
    overflow-x: auto;
}

.hourly-forecast > div {
    flex: 0 0 auto;
    margin-right: 20px;
    margin-left: 20px;
} */

.hourly-forecast-container {
    display: flex;
    overflow-x: hidden;
    scroll-behavior: smooth;
}
.hourly-forecast-container:hover {
    overflow-x: auto;
}

.hourly-forecast {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #ccc;
    padding: 0 10px;
    min-width: 150px;
}

.hourly-forecast:last-child {
    border-right: none;
}

.air-conditions-container-title {
    font-family: 'Rubik', sans-serif;
    font-weight: bolder;
    font-size: 20px;
}
.air-conditions-container-values {
    font-family: 'Rubik', sans-serif;
    font-weight: bolder;
    font-size: 36px;
    color: white;
}

.astro-info-container {
    display: grid;
    place-items: center;
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
div {
    font-family: 'Rubik', sans-serif;
    color: #c4cad3;
}
</style>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';
import Loading from '../components/Loading.vue';

export default {
    components: {
        Loading,
    },
    data() {
        return {
            news: [],
            isLoading: false,
        };
    },
    methods: {
        loadNews(category) {
            this.news = [];
            // let url = 'https://newsapi.org/v2/top-headlines?language=en&pageSize=100';
            let url = 'https://gnews.io/api/v4/top-headlines?lang=en&country=us&max=10';
            if (category) {
                url = url + '&category=' + category;
            } else {
                url = url + '&category=general';
            }
            axios
                // .get(url + '&apiKey=c279ca20e57f4c47a810032b6b52a48f')
                .get(url + '&apikey=9116e08db9f993e7094071a2c1da334b')
                .then((response) => {
                    let notic = response.data.articles;
                    this.news = notic;
                    notic.forEach((e) => this.news.push(e));
                })
                .catch((err) => alert(err));
        },
        calculateDay(date) {
            const fecha = new Date(date);
            return fecha.getDate();
        },
        calculateMonth(date) {
            const fecha = new Date(date);
            return fecha.toLocaleString('en-US', { month: 'short' });
        },
        changeCategory(cat) {
            this.loadNews(cat);
            if (document.getElementsByClassName('bg-primary')[0]) {
                document.getElementsByClassName('bg-primary')[0].classList.remove('bg-primary');
                document.getElementsByClassName('text-white')[0].classList.remove('text-white');
            }
            event.currentTarget.classList.add('bg-primary');
            event.currentTarget.classList.add('text-white');
        },
        imageUrl(imageSrc) {
            return imageSrc ? imageSrc : '/src/assets/noimage.jpg';
        },
        showNews(url) {
            window.open(url, '_blank').focus();
        },
    },
    computed: {},
    mounted() {
        this.isLoading = true;
        setTimeout(async () => {
            this.loadNews();
            this.isLoading = false;
        }, 1000); // TODO QUITAR SET TIMEOUT
    },
};
</script>

<template>
    <div class="container justify-content-center" style="padding-top: 20px">
        <div class="row">
            <div class="md-chips text-center">
                <div class="md-chip md-chip-clickable bg-primary text-white" @click="changeCategory('general')">General</div>
                <div class="md-chip md-chip-clickable" @click="changeCategory('sports')">Sports</div>
                <div class="md-chip md-chip-clickable" @click="changeCategory('technology')">Technology</div>
                <div class="md-chip md-chip-clickable" @click="changeCategory('science')">Science</div>
                <div class="md-chip md-chip-clickable" @click="changeCategory('health')">Health</div>
                <div class="md-chip md-chip-clickable" @click="changeCategory('bussiness')">Bussiness</div>
                <div class="md-chip md-chip-clickable" @click="changeCategory('entertainment')">Entertainment</div>
            </div>
        </div>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-12 mx-auto news-feed" v-for="item in news" :key="news.id">
                    <figure class="snip1237">
                        <div class="image">
                            <!-- <img :src="imageUrl(item.urlToImage)" alt="sample74" /><i class="ion-ios-clock-outline"></i> -->
                            <img :src="imageUrl(item.image)" alt="No image available" /><i class="ion-ios-clock-outline"></i>
                            <div class="date">
                                <span class="day">{{ calculateDay(item.publishedAt) }}</span
                                ><span class="month">{{ calculateMonth(item.publishedAt) }}</span>
                            </div>
                        </div>
                        <figcaption>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.description }}</p>
                            <a @click="showNews(item.url)" class="read-more">Read More</a>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);
@import url(https://fonts.googleapis.com/css?family=Raleway:400,500);
@import url(https://fonts.googleapis.com/css?family=Roboto);
figure.snip1237 {
    font-family: 'Raleway', Arial, sans-serif;
    position: relative;
    overflow: hidden;
    margin: 10px;
    min-width: 220px;
    max-width: 310px;
    width: 100%;
    background: #1a1a1a;
    color: #ffffff;
    text-align: left;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
}
figure.snip1237 * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-transition: all 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
}
figure.snip1237 .image {
    position: relative;
}
figure.snip1237 img {
    max-width: 100%;
    vertical-align: top;
}
figure.snip1237 i {
    position: absolute;
    top: 7px;
    left: 12px;
    font-size: 32px;
    opacity: 0;
    z-index: 2;
    -webkit-transition-delay: 0;
    transition-delay: 0;
}
figure.snip1237 h3 {
    margin: 0 0 10px;
    font-weight: 500;
}
figure.snip1237 p {
    margin: 0;
}
figure.snip1237:before,
figure.snip1237:after {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    -webkit-transition: all 0.35s ease;
    transition: all 0.35s ease;
    z-index: 1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
}
figure.snip1237:before {
    background-color: #20638f;
    -webkit-transform: skew(-45deg) translateX(-150%);
    transform: skew(-45deg) translateX(-150%);
    border-right: 1px solid #20638f;
}
figure.snip1237:after {
    background-color: #962d22;
    -webkit-transform: skew(-45deg) translateX(-175%);
    transform: skew(-45deg) translateX(-175%);
    border-right: 1px solid #962d22;
}
figure.snip1237 figcaption {
    padding: 25px;
    background-color: #ffffff;
    color: #000000;
    position: relative;
    font-size: 0.9em;
}
figure.snip1237 figcaption p {
    margin-bottom: 15px;
}
figure.snip1237 figcaption:before {
    width: 100px;
    height: 100px;
    position: absolute;
    bottom: 100%;
    right: 0;
    content: '';
    background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.35) 100%);
    background-color: #20638f;
    -webkit-transform: skew(-45deg) translateX(50%);
    transform: skew(-45deg) translateX(50%);
    border-right: 1px solid #20638f;
}
figure.snip1237 .read-more {
    display: inline-block;
    width: auto;
    border: 2px solid #20638f;
    padding: 0.4em 0.6em;
    color: #20638f;
    text-decoration: none;
    font-weight: 800;
    font-size: 0.9em;
    text-transform: uppercase;
    cursor: pointer;
}
figure.snip1237 .read-more:hover {
    background-color: #20638f;
    color: #ffffff;
}
figure.snip1237 .date {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #fff;
    max-height: 48px;
    max-width: 48px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    z-index: 1;
}
figure.snip1237 .date span {
    display: block;
    line-height: 24px;
}
figure.snip1237 .date .month {
    font-size: 14px;
}
figure.snip1237:hover i,
figure.snip1237.hover i {
    opacity: 0.7;
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
}
figure.snip1237:hover:before,
figure.snip1237.hover:before {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
    -webkit-transform: skew(-45deg) translateX(-50%);
    transform: skew(-45deg) translateX(-50%);
}
figure.snip1237:hover:after,
figure.snip1237.hover:after {
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
    -webkit-transform: skew(-45deg) translateX(-75%);
    transform: skew(-45deg) translateX(-75%);
}
.md-chip {
    display: inline-block;
    background: white;
    padding: 0 20px;
    border-radius: 32px;
    font-size: 20px;
    font-weight: bold;
}
.md-chips {
    padding: 20px 0;
}
.md-chip.md-chip-hover:hover {
    background: #ccc;
}
.md-chip-clickable {
    cursor: pointer;
}
.md-chip,
.md-chip-icon {
    height: 32px;
    line-height: 32px;
}
.md-chip-icon {
    display: block;
    float: left;
    background: #009587;
    width: 32px;
    border-radius: 50%;
    text-align: center;
    color: white;
    margin: 0 8px 0 -12px;
}
.md-chip-remove {
    display: inline-block;
    background: #aaa;
    border: 0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 0;
    margin: 0 -4px 0 4px;
    cursor: pointer;
    font: inherit;
    line-height: 20px;
}
.md-chip-remove:after {
    color: #e0e0e0;
    content: 'x';
}
.md-chip-remove:hover {
    background: #999;
}
.md-chip-remove:active {
    background: #777;
}

.md-chips .md-chip {
    margin: 0 5px 3px 0;
}
.md-chip-raised {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}

@media (max-width: 767.98px) {
    .news-feed {
        display: grid;
        place-items: center;
    }
}
</style>

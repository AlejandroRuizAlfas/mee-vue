<!-- <script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';

export default {
    data() {
        return {};
    },
    methods: {},
    computed: {},
    mounted() {},
};
</script>

<template>
    <h1>Loading data...</h1>
</template>

<style scoped>
h1 {
    color: white;
    font-size: 80px;
}
</style> -->
<!-- 
<template>
    <div class="bg-loader">
        <div class="preloader" :style="cssVars">
            <span class="rot-1"></span>
            <span class="rot-2"></span>
            <span class="rot-3"></span>
            <span class="rot-4"></span>
            <span class="rot-5"></span>
            <span class="rot-6"></span>
            <span class="rot-7"></span>
            <span class="rot-8"></span>
        </div>
    </div>
</template> -->

<!-- <script>
export default {
    name: 'Preloader',
    props: {
        color: {
            type: String,
            default: '#41b883',
        },
        scale: {
            type: Number,
            default: 1,
        },
    },
    computed: {
        cssVars() {
            return {
                '--color': this.color,
                '--scale': this.scale,
            };
        },
    },
};
</script> -->

<!-- <style scoped>
.bg-loader {
    display: grid;
    place-items: center;
    height: 100vh;
}
.preloader {
    width: 125px;
    height: 125px;
    margin: auto;
    transform: scale(var(--scale));
}
.preloader > span {
    position: absolute;
    background-color: transparent;
    height: 22px;
    width: 22px;
    border-radius: 12px;
    animation-name: f_fadeG;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
    animation-direction: normal;
}
.rot-1 {
    left: 0;
    top: 51px;
    animation-delay: 0.45s;
}
.rot-2 {
    left: 15px;
    top: 15px;
    animation-delay: 0.6s;
}
.rot-3 {
    left: 51px;
    top: 0;
    animation-delay: 0.75s;
}
.rot-4 {
    right: 15px;
    top: 15px;
    animation-delay: 0.9s;
}
.rot-5 {
    right: 0;
    top: 51px;
    animation-delay: 1.05s;
}
.rot-6 {
    right: 15px;
    bottom: 15px;
    animation-delay: 1.2s;
}
.rot-7 {
    left: 51px;
    bottom: 0;
    animation-delay: 1.35s;
}
.rot-8 {
    left: 15px;
    bottom: 15px;
    animation-delay: 1.5s;
}
@keyframes f_fadeG {
    0% {
        background-color: var(--color);
    }
    100% {
        background-color: transparent;
    }
}
</style> -->
<template>
    <div class="wrapper">
        <div class="v-spinner" v-show="loading">
            <div class="v-sync v-sync1" v-bind:style="[spinnerStyle, spinnerDelay1]"></div>
            <div class="v-sync v-sync2" v-bind:style="[spinnerStyle, spinnerDelay2]"></div>
            <div class="v-sync v-sync3" v-bind:style="[spinnerStyle, spinnerDelay3]"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SyncLoader',
    props: {
        loading: {
            type: Boolean,
            default: true,
        },
        color: {
            type: String,
            default: '#5dc596',
        },
        size: {
            type: String,
            default: '15px',
        },
        margin: {
            type: String,
            default: '2px',
        },
        radius: {
            type: String,
            default: '100%',
        },
    },
    data() {
        return {
            spinnerStyle: {
                backgroundColor: this.color,
                height: this.size,
                width: this.size,
                margin: this.margin,
                borderRadius: this.radius,
                display: 'inline-block',
                animationName: 'v-syncStretchDelay',
                animationDuration: '0.6s',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out',
                animationFillMode: 'both',
            },
            spinnerDelay1: {
                animationDelay: '0.07s',
            },
            spinnerDelay2: {
                animationDelay: '0.14s',
            },
            spinnerDelay3: {
                animationDelay: '0.21s',
            },
        };
    },
};
</script>

<style>
@-webkit-keyframes v-syncStretchDelay {
    33% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
    }
    66% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}
@keyframes v-syncStretchDelay {
    33% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
    }
    66% {
        -webkit-transform: translateY(-10px);
        transform: translateY(-10px);
    }
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
}
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 95vh;
}
</style>

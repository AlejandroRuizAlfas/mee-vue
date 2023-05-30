<template>
    <div class="wrapper">
        <div class="v-spinner" v-show="loading">
            <div class="v-sync v-sync1" v-bind:style="[spinnerStyle, spinnerDelay1]"></div>
            <div class="v-sync v-sync2" v-bind:style="[spinnerStyle, spinnerDelay2]"></div>
            <div class="v-sync v-sync3" v-bind:style="[spinnerStyle, spinnerDelay3]"></div>
        </div>
        <div class="error-helper mt-5">
            <img src="/src/assets/mee/server-error.png" width="250" height="250" />
            <h3>Seems like we may have some troubles with our servers...</h3>
            <h6>If you think you've waited too much, you can keep waiting until it works or go back!</h6>
            <button class="btn btn-primary mt-2" @click="errorGoBack">Take me back!</button>
        </div>
    </div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
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
            timerId: null,
        };
    },
    computed: {},
    methods: {
        ...mapActions(useStore, ['stopAxiosLoading']),
        errorGoBack() {
            this.stopAxiosLoading();
            this.$router.push('/');
        },
    },
    beforeUnmount() {
        clearTimeout(this.timerId);
    },
    mounted() {
        this.timerId = setTimeout(() => {
            if (document.querySelector('.error-helper')) {
                document.querySelector('.error-helper').style.display = 'grid';
            }
        }, 7000);
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
    background-color: transparent;
    flex-direction: column;
}
.error-helper {
    display: grid;
    place-items: center;
    color: white;
    display: none;
}
</style>

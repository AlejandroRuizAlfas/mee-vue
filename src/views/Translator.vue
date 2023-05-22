<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import axios from 'axios';

export default {
    data() {
        return {
            langs: '',
            langFrom: '',
            langTo: '',
            mode: 0,
        };
    },
    methods: {
        swap() {
            const wrapper = document.querySelector('.translate-wrapper');
            const langFrom = document.getElementById('select-from').value;
            const langTo = document.getElementById('select-to').value;
            const inputFrom = document.getElementById('input-from').textContent;
            const inputTo = document.getElementById('input-to').textContent;
            document.getElementById('select-from').value = langTo;
            document.getElementById('select-to').value = langFrom;
            document.getElementById('input-from').textContent = inputTo;
            document.getElementById('input-to').textContent = inputFrom;

            if (this.mode == 0) {
                if (window.innerWidth >= 800) {
                    wrapper.style.flexDirection = 'row-reverse';
                } else {
                    wrapper.style.flexDirection = 'column-reverse';
                }

                this.mode = 1;
            } else {
                if (window.innerWidth >= 800) {
                    wrapper.style.flexDirection = 'row';
                } else {
                    wrapper.style.flexDirection = 'column';
                }
                this.mode = 0;
            }
        },
        getLanguages() {
            axios
                .get('/src/assets/languages.json')
                .then((response) => {
                    this.langs = response.data.translation;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        handleTranslate() {
            let from = document.getElementById('select-from').value;
            if (from === 'Detect language') {
                this.detectTranslate();
            } else {
                this.translate();
            }
        },
        handleReset() {
            document.getElementById('input-from').textContent = '';
            document.getElementById('input-to').textContent = '';
            this.langFrom = '';
            this.langTo = '';
        },
        translate() {
            let textFrom = document.getElementById('input-from');
            let textTo = document.getElementById('input-to');
            this.langFrom = document.getElementById('select-from').value;
            this.langTo = document.getElementById('select-to').value;
            const options = {
                method: 'POST',
                url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
                params: {
                    'api-version': '3.0',
                    'to[0]': this.langTo,
                    textType: 'plain',
                    profanityAction: 'NoAction',
                    from: this.langFrom,
                },
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'abace8d9b9msh4cac9c2f0610797p18ab96jsn0d2a2de2bb2c',
                    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
                },
                data: '[{"Text":"' + textFrom.textContent + '"}]',
            };
            axios
                .request(options)
                .then(function (response) {
                    textTo.textContent = response.data[0].translations[0].text;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
        detectTranslate() {
            let textFrom = document.getElementById('input-from');
            let textTo = document.getElementById('input-to');
            this.langTo = document.getElementById('select-to').value;
            const options = {
                method: 'POST',
                url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
                params: {
                    'api-version': '3.0',
                    'to[0]': this.langTo,
                    textType: 'plain',
                    profanityAction: 'NoAction',
                },
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': 'abace8d9b9msh4cac9c2f0610797p18ab96jsn0d2a2de2bb2c',
                    'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
                },
                data: '[{"Text":"' + textFrom.textContent + '"}]',
            };
            axios
                .request(options)
                .then(function (response) {
                    textTo.textContent = response.data[0].translations[0].text;
                    document.getElementById('select-from').value = response.data[0].detectedLanguage.language;
                })
                .catch(function (error) {
                    console.error(error);
                });
        },
    },

    computed: {},
    mounted() {
        this.getLanguages();
    },
};
</script>

<template>
    <div class="container-fluid justify-content-center" style="padding-top: 20px">
        <div class="translate-wrapper">
            <div class="translate-from p-4">
                <div class="row">
                    <div class="col-2">From:</div>
                    <div class="col-10">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-globe"></i>
                            </span>
                            <select class="form-select" id="select-from">
                                <option value="Detect language" selected>Detect language</option>
                                <option v-for="(item, $key) in langs" :value="$key">{{ item.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="input-container mt-4">
                        <div id="input-from" class="input" contenteditable="true" data-placeholder="Enter text..."></div>
                    </div>
                    <button class="btn btn-primary mt-4" @click="handleTranslate">Translate</button>
                </div>
            </div>
            <button type="button" class="btn btn-primary swap-btn" @click="swap"><i class="bi bi-arrow-repeat"></i></button>
            <div class="translate-to p-4">
                <div class="row">
                    <div class="col-2">To:</div>
                    <div class="col-10">
                        <div class="input-group">
                            <span class="input-group-text">
                                <i class="bi bi-globe"></i>
                            </span>
                            <select class="form-select" id="select-to">
                                <option value="en" selected>English</option>
                                <option v-for="(item, $key) in langs" :value="$key">{{ item.name }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="input-container mt-4">
                        <div id="input-to" class="input" contenteditable="false" data-placeholder="Translation..."></div>
                    </div>
                    <button class="btn btn-secondary mt-4" @click="handleReset">Reset</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap');
.container-fluid {
    background-color: #111116;
    height: 100vh;
    overflow: auto;
}

.row {
    display: flex;
    align-items: center;
}

.translate-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 90vh;
}

.translate-to {
    order: 3;
}

button {
    order: 2;
}

.translate-from {
    order: 1;
}

.translate-from,
.translate-to {
    background-color: #1c1b20;
    width: 400px;
    height: auto;
    border-radius: 20px;
    color: white;
    margin: 0 10px;
}

.input-container {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
}

.input {
    width: 100%;
    min-height: 50px;
    outline: none;
    font-size: 16px;
    line-height: 1.2;
    white-space: pre-wrap;
}

.input:empty:before {
    content: attr(data-placeholder);
    color: #ccc;
}

#select-from,
#select-to {
    border-radius: 0 40px 40px 0;
    background-color: #111116;
    border: none;
    color: white;
}
.input-group-text {
    border-radius: 40px 0 0 40px;
    background-color: #111116;
    border: none;
    color: white;
}

.translator-title {
    font-family: 'Poppins', sans-serif;
    color: white;
    font-size: 72px;
}

@media only screen and (max-width: 800px) {
    .translate-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 90vh;
    }
    .swap-btn {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .translate-from,
    .translate-to {
        width: 95%;
    }
}
</style>

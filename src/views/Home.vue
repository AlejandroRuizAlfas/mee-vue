<template>
    <div class="home-page justify-content-center"></div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    data() {
        return {
            clickedMenu: false,
        };
    },
    methods: {
        ...mapActions(useStore, []),
    },
    mounted() {
        if (!localStorage.mee_user) {
            this.$router.push('/auth');
        }
    },
};
</script>

<style scoped>
@import url('https://fonts.cdnfonts.com/css/sf-transrobotics-2');
.home-page {
    height: 100vh;
    display: grid;
    place-items: center;
}
</style>
<!-- <template>
    <div class="home-page justify-content-center">
        <div class="tablon-de-madera">
            <h1>Tablón de Madera</h1>
            <div class="notas">
                <div v-for="nota in notas" :key="nota.id" class="nota">
                    <a :href="nota.url" target="_blank">
                        <img :src="nota.logo" alt="Logo de la web" class="logo-web" />
                        <p class="nombre-web">{{ nota.nombre }}</p>
                    </a>
                </div>
            </div>
            <div class="agregar-nota">
                <input type="text" v-model="nuevaNota.nombre" placeholder="Nombre de la web" />
                <input type="text" v-model="nuevaNota.logo" placeholder="URL del logo" />
                <input type="text" v-model="nuevaNota.url" placeholder="URL de la web" />
                <button @click="agregarNota">Agregar nota</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notas: [
                { id: 1, nombre: 'Google', logo: 'https://example.com/google-logo.png', url: 'https://www.google.com' },
                { id: 2, nombre: 'Facebook', logo: 'https://example.com/facebook-logo.png', url: 'https://www.facebook.com' },
                // Agrega más notas de ejemplo o elimina las existentes y agrega nuevas
            ],
            nuevaNota: { nombre: '', logo: '', url: '' },
        };
    },
    methods: {
        agregarNota() {
            // Validar que se hayan ingresado todos los datos
            if (this.nuevaNota.nombre && this.nuevaNota.logo && this.nuevaNota.url) {
                // Generar un ID único para la nueva nota
                const nuevoId = Math.max(...this.notas.map((nota) => nota.id), 0) + 1;
                // Agregar la nueva nota al arreglo de notas
                this.notas.push({ id: nuevoId, nombre: this.nuevaNota.nombre, logo: this.nuevaNota.logo, url: this.nuevaNota.url });
                // Limpiar los campos del formulario
                this.nuevaNota = { nombre: '', logo: '', url: '' };
            }
        },
    },
};
</script>-->

<style scoped>
.home-page {
    height: 100vh;
    display: grid;
    place-items: center;
}
/* .tablon-de-madera {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    border: 10px solid #8b4513;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background-image: url('https://example.com/cork-texture.png');
}

.tablon-de-madera:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: -1;
}

.hanging-board {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
}

.hanging-board:before {
    content: '';
    position: absolute;
    top: 0;
    left: -10px;
    right: -10px;
    bottom: 0;
    background-color: #8b4513;
    transform: skew(-10deg);
}

.hanging-board:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #8b4513;
    transform: skew(-20deg);
}

h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
}

.notas {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.nota {
    width: 180px;
    background-color: #fff;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.logo-web {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 10px;
}

.nombre-web {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
}

.agregar-nota {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

input {
    margin-right: 10px;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
}

button {
    padding: 8px 16px;
    border-radius: 4px;
    border: none;
    background-color: #4caf50;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
} */
</style>

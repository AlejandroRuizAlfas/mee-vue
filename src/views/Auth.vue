<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const mySchema = yup.object({
            email: yup.string().required('Email is required'),
            password: yup.string().required('Password is required'),
        });
        const mySchemaReg = yup.object({
            username: yup.string().required('Username is required').min(3, 'Username lenght must be between 3 and 25 characters').max(25, 'Username lenght must be between 3 and 25 characters'),
            email: yup.string().required('Email is required').email('Enter a valid email address'),
            password: yup.string().required('Password is required'),
            passwordCopy: yup
                .string()
                .required('Password is required')
                .test('password-match', 'Passwords must match', function (value) {
                    return value === this.parent.password;
                }),
        });
        return {
            userLogin: { email: '', password: '' },
            newUser: { username: '', email: '', password: '', passwordCopy: '' },
            mySchema,
            mySchemaReg,
        };
    },
    computed: {
        ...mapState(useStore, ['user']),
    },
    methods: {
        ...mapActions(useStore, ['loginUser', 'registerUser']),
        async onSubmit(values) {
            this.credentials = values;

            let meeUser = await this.loginUser(this.credentials);
            if (meeUser.user_id) {
                localStorage.setItem('mee_user', JSON.stringify(meeUser));
                this.user.user_id = meeUser.user_id;
                this.user.username = meeUser.username;
                this.user.email = meeUser.email;
                document.getElementsByClassName('fixed-menu')[0].style.visibility = 'visible';
                this.$notify({ type: 'success', text: 'Welcome, ' + this.user.username });
                this.$router.push('/');
            } else {
                this.$notify({ type: 'error', text: 'Invalid credentials' });
            }
        },
        async onSubmitReg(values) {
            this.newUser = values;
            let response = await this.registerUser(this.newUser);
            if (response) {
                if (window.innerWidth >= 800) {
                    this.changeToLogin();
                } else {
                    this.changeToLoginMobile();
                }
            }
        },
        changeToLogin() {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container');
            container.classList.remove('right-panel-active');
        },
        changeToRegister() {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container');
            container.classList.add('right-panel-active');
        },
        changeToRegisterMobile() {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container');
            const overlay = document.getElementById('overlay-container');
            container.classList.add('right-panel-active');
            document.getElementById('sign-up-container').style.width = '100%';
            document.getElementById('sign-up-container').style.transform = 'translateX(0%)';
            document.querySelector('.mobile-swap-up').style.display = 'none';
            document.querySelector('.mobile-swap-in').style.display = 'block';
            document.getElementById('overlay-container').style.visibility = 'hidden';
        },
        changeToLoginMobile() {
            const signUpButton = document.getElementById('signUp');
            const signInButton = document.getElementById('signIn');
            const container = document.getElementById('container');
            container.classList.remove('right-panel-active');
            document.getElementById('sign-up-container').style.width = '0%';
            document.getElementById('sign-up-container').style.transform = 'translateX(100%)';
            document.querySelector('.mobile-swap-up').style.display = 'block';
            document.querySelector('.mobile-swap-in').style.display = 'none';
            document.getElementById('overlay-container').style.visibility = 'visible';
        },
        resetForm() {
            this.userLogin = {};
        },
    },
    mounted() {
        document.getElementsByClassName('fixed-menu')[0].style.visibility = 'hidden';
        if (this.$route.params.action) {
            if (window.innerWidth >= 800) {
                this.changeToRegister();
            } else {
                this.changeToRegisterMobile();
            }
        }
    },
};
</script>

<template>
    <div class="container-fluid">
        <div class="login-wrapper">
            <div class="container" id="container">
                <div class="form-container sign-up-container" id="sign-up-container">
                    <Form :initial-values="newUser" @submit="onSubmitReg" :validation-schema="mySchemaReg" style="padding-top: 20px">
                        <h3 class="mb-2">Create Account</h3>
                        <fieldset>
                            <div class="">
                                <Field name="username" type="text" placeholder="Username" />
                                <ErrorMessage class="error-msg" name="username" />
                            </div>
                            <div class="">
                                <Field name="email" type="email" placeholder="Email" />
                                <ErrorMessage class="error-msg" name="email" />
                            </div>
                            <div class="">
                                <Field name="password" type="password" placeholder="Password" />
                                <ErrorMessage class="error-msg" name="password" />
                            </div>
                            <div class="">
                                <Field name="passwordCopy" type="password" placeholder="Re-type password" />
                                <ErrorMessage class="error-msg" name="passwordCopy" />
                            </div>
                            <button type="submit" class="btn btn-default btn-dark mt-2">Register</button>
                        </fieldset>
                    </Form>
                </div>
                <div class="form-container sign-in-container" id="sign-in-container">
                    <Form :initial-values="userLogin" @submit="onSubmit" :validation-schema="mySchema">
                        <h1 class="mb-2">Sign In</h1>
                        <fieldset>
                            <div class="">
                                <Field name="email" type="email" placeholder="Email" />
                                <ErrorMessage class="error-msg" name="email" />
                            </div>
                            <div class="">
                                <Field name="password" type="password" placeholder="Password" />
                                <ErrorMessage class="error-msg" name="password" />
                            </div>
                            <button type="submit" class="btn btn-default btn-dark mt-2">Login</button>
                        </fieldset>
                    </Form>
                </div>
                <div class="overlay-container" id="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-left">
                            <h1>Already registered?</h1>
                            <p>Please login with your personal info to access Mee!</p>
                            <button class="ghost" id="signIn" @click="changeToLogin">Sign In</button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1>Nice to Mee-t you!</h1>
                            <p>Register first to start journey with mee or log-in with your account!</p>
                            <button class="ghost" id="signUp" @click="changeToRegister">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="ghost mobile-swap-up m-4" id="signUpMobile" @click="changeToRegisterMobile">Sign Up</button>
            <button class="ghost mobile-swap-in m-4" id="signInMobile" @click="changeToLoginMobile">Sign In</button>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');
.error-msg {
    color: red;
}
.container-fluid {
    height: 100vh;
    background: #233d4d;
}
.login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 95vh;
}

* {
    box-sizing: border-box;
}

h1,
h3 {
    font-weight: bold;
    margin: 0;
}

h2 {
    text-align: center;
}

p {
    font-size: 14px;
    font-weight: 100;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 30px;
}

a {
    color: #333;
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
}

button {
    border-radius: 20px;
    border: 1px solid #0b131e;
    background-color: #0b131e;
    color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

button.ghost {
    background-color: #0b131e;
    border-color: #ffffff;
}

form {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    min-width: 280px;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
}

@keyframes show {
    0%,
    49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%,
    100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
}

.overlay {
    background: #ff416c;
    background: -webkit-linear-gradient(to right, #0b131e, #111d2e);
    background: linear-gradient(to right, #0b131e, #111d2e);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #ffffff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.social-container {
    margin: 20px 0;
}

.social-container a {
    border: 1px solid #dddddd;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
    height: 40px;
    width: 40px;
}

.mobile-swap-up {
    display: none;
}

.mobile-swap-in {
    display: none;
}

@media only screen and (max-width: 800px) {
    .sign-in-container {
        width: 100%;
    }
    .overlay {
        display: none;
    }
    .mobile-swap-up {
        display: block;
    }
}
</style>

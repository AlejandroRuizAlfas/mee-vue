<!-- <template>
    <div>
        <h2>Register</h2>
        <form>
            <label>
                Username:
                <input type="text" v-model="username" />
            </label>
            <br />
            <label>
                Email:
                <input type="email" v-model="email" />
            </label>
            <br />
            <label>
                Password:
                <input type="password" v-model="password" />
            </label>
            <br />
            <label>
                Re-type password:
                <input type="password" v-model="passwordCopy" v-on:blur="checkPasswordMatch" />
                <span v-if="passwordMatchError" style="color: red">{{ passwordMatchError }}</span>
            </label>
            <br />
            <button type="submit" @click="handleRegister">Register</button>
        </form>
    </div>
</template>

<script>
import { useStore } from '../stores/store.js';
import { mapState, mapActions } from 'pinia';
export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordCopy: '',
            passwordMatchError: '',
        };
    },
    methods: {
        ...mapActions(useStore, ['registerUser']),
        checkPasswordMatch() {
            if (this.password !== this.passwordCopy) {
                this.passwordMatchError = 'Passwords do not match';
            } else {
                this.passwordMatchError = '';
            }
        },
        async handleRegister() {
            let user = { username: this.username, email: this.email, password: this.password };
            console.log(await this.registerUser(user));
        },
    },
};
</script> -->

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
            username: yup.string().required('Username is required').min(5, 'Username lenght must be between 5 and 25 characters').max(25, 'Username lenght must be between 5 and 25 characters'),
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
            newUser: { username: '', email: '', password: '', passwordCopy: '' },
            mySchema,
        };
    },
    computed: {
        ...mapState(useStore, ['user']),
    },
    methods: {
        ...mapActions(useStore, ['registerUser']),
        async onSubmit(values) {
            this.newUser = values;
        },
        resetForm() {
            this.newUser = {};
        },
    },
    mounted() {},
};
</script>

<template>
    <div class="container" style="margin-bottom: 50px">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-">
                <Form :initial-values="newUser" @submit="onSubmit" :validation-schema="mySchema" style="padding-top: 20px">
                    <fieldset>
                        <legend class="bg-dark text-white text-center">Register user</legend>
                        <div class="form-group">
                            <label>Username:</label>
                            <Field name="username" type="text" class="form-control" />
                            <ErrorMessage class="error-msg" name="username" />
                        </div>
                        <div class="form-group">
                            <label>Email:</label>
                            <Field name="email" type="email" class="form-control" />
                            <ErrorMessage class="error-msg" name="email" />
                        </div>
                        <div class="form-group">
                            <label>Password:</label>
                            <Field name="password" type="password" class="form-control" />
                            <ErrorMessage class="error-msg" name="password" />
                        </div>
                        <div class="form-group">
                            <label>Re-type password:</label>
                            <Field name="passwordCopy" type="password" class="form-control" />
                            <ErrorMessage class="error-msg" name="passwordCopy" />
                        </div>

                        <br />
                        <button type="submit" class="btn btn-default btn-dark">Register</button>
                        <button type="reset" class="btn btn-danger">Cancelar</button>
                    </fieldset>
                </Form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.error-msg {
    color: red;
}
</style>

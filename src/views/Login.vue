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
        return {
            userLogin: { email: '', password: '' },
            mySchema,
        };
    },
    computed: {
        ...mapState(useStore, ['user']),
    },
    methods: {
        ...mapActions(useStore, ['loginUser']),
        async onSubmit(values) {
            this.credentials = values;
            let meeUser = await this.loginUser(this.credentials);
            if (meeUser) {
                localStorage.setItem('mee_user', JSON.stringify(meeUser));
                this.user.user_id = meeUser.user_id;
                this.user.username = meeUser.username;
                this.user.email = meeUser.email;
                console.log(this.user);
                this.$router.push('/');
            } else {
                alert('Invalid credentials');
            }
        },
        resetForm() {
            this.userLogin = {};
        },
    },
    mounted() {},
};
</script>

<template>
    <div class="container" style="margin-bottom: 50px">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-">
                <Form :initial-values="userLogin" @submit="onSubmit" :validation-schema="mySchema" style="padding-top: 20px">
                    <fieldset>
                        <legend class="bg-dark text-white text-center">Login user</legend>
                        <!-- Aquí los inputs y botones del form -->
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

                        <br />
                        <button type="submit" class="btn btn-default btn-dark">Login</button>
                        <button type="reset" class="btn btn-danger">Cancelar</button>
                    </fieldset>
                </Form>
            </div>
        </div>
    </div>
</template>

<style>
.error-msg {
    color: red;
}
</style>

import {AuthUtils} from "../utils/auth-utils";
import {AuthService} from "../services/auth-service";

export class Form {
    constructor(page, openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.page = page;
        this.passwordElement = document.getElementById('password');

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                valid: false,
            },
        ]

        if (this.page === 'sign-in') {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false,
                },
                {
                    name: 'lastName',
                    id: 'lastName',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false,
                },
                {
                    name: 'passwordRepeat',
                    id: 'passwordRepeat',
                    element: null,
                    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                    valid: false,
                }
            );
        }

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        });

        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }
        if (field.name === 'passwordRepeat') {
            if (this.passwordElement.value === element.value) {
                element.classList.remove('is-invalid');
                field.valid = true;
            } else {
                element.classList.add('is-invalid');
                field.valid = false;
            }
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);

        if (validForm) {
            this.processElement.removeAttribute('disabled');
            return true;
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return validForm;
    }

    async processForm() {
        if (this.validateForm()) {

            const email = this.fields.find(item => item.name === 'email').element.value;
            const password = this.fields.find(item => item.name === 'password').element.value

            if (this.page === 'sign-in') {
                const signUpResult = await AuthService.signUp({
                    name: this.fields.find(item => item.name === 'name').element.value,
                    lastName: this.fields.find(item => item.name === 'lastName').element.value,
                    email: email,
                    password: password,
                    passwordRepeat: this.fields.find(item => item.name === 'passwordRepeat').element.value,
                });

                if (signUpResult) {
                    AuthUtils.setAuthInfo(null, null, {
                        id: signUpResult.user.id,
                        name: signUpResult.user.name + ' ' + signUpResult.user.lastName,
                    });

                    this.openNewRoute('/');
                } else {
                    console.log('Ответ на запрос имеет некорректные данные');
                    return;
                }
            }

            const loginResult = await AuthService.logIn({
                email: email,
                password: password,
            });

            if (loginResult) {
                AuthUtils.setAuthInfo(loginResult.tokens.accessToken, loginResult.tokens.refreshToken, {
                    id: loginResult.user.id,
                    name: loginResult.user.name + ' ' + loginResult.user.lastName
                });

                this.openNewRoute('/');
            } else {
                console.log('Ответ на запрос имеет некорректные данные');
                return;
            }
        }
    }
}

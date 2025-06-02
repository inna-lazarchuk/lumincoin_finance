import {Main} from "./components/main";
import {Form} from "./components/form";
import {Expenses} from "./components/expenses/expenses";
import {Income} from "./components/income/income";
import {IncomeExpenses} from "./components/income-expenses/income-expenses";
import {AuthUtils} from "./utils/auth-utils";
import {IncomeEdit} from "./components/income/income-edit";
import {IncomeDelete} from "./components/income/income-delete";
import {IncomeCreate} from "./components/income/income-create";
import {IncomeExpenseCreate} from "./components/income-expenses/income-expense-create";
import {ExpenseEdit} from "./components/expenses/expense-edit";
import {ExpenseDelete} from "./components/expenses/expense-delete";
import {ExpenseCreate} from "./components/expenses/expense-create";
import {IncomeExpenseEdit} from "./components/income-expenses/income-expense-edit";
import {IncomeExpenseDelete} from "./components/income-expenses/income-expense-delete";
import {Logout} from "./components/logout";
import {HttpUtils} from "./utils/http-utils";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.userName = null;

        this.initEvents();

        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main(this.openNewRoute.bind(this));
                },
                scripts: [
                    // 'pie-charts.js', 'chart.js'
                ],
                styles: []
            },
            {
                route: '/sign-in',
                title: 'Регистрация',
                filePathTemplate: '/templates/sign-in.html',
                useLayout: false,
                load: () => {
                    new Form('sign-in', this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                useLayout: false,
                load: () => {
                    new Form('login', this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/logout',
                title: 'Выход из аккаунта',
                filePathTemplate: '',
                useLayout: false,
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }
            },
            {
                route: '/expenses',
                title: 'Расходы',
                filePathTemplate: '/templates/expenses/expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Expenses(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/expense-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/expenses/expense-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseEdit(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/expense-delete',
                title: 'Удаление категории',
                filePathTemplate: '/templates/expenses/expense-delete.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseDelete(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/expense-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/expenses/expense-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new ExpenseCreate(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/income/income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Income(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-edit',
                title: 'Редактирование категории',
                filePathTemplate: '/templates/income/income-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeEdit(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-delete',
                title: 'Удаление категории',
                filePathTemplate: '/templates/income/income-delete.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeDelete(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-create',
                title: 'Создание категории',
                filePathTemplate: '/templates/income/income-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeCreate(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-expenses',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/income-expenses/income-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpenses(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-expense-create',
                title: 'Создание дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpenseCreate(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-expense-edit',
                title: 'Редактирование дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpenseEdit(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },
            {
                route: '/income-expense-delete',
                title: 'Удаление дохода или расхода',
                filePathTemplate: '/templates/income-expenses/income-expense-delete.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeExpenseDelete(this.openNewRoute.bind(this));
                },
                scripts: [],
                styles: []
            },

        ]
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async activateRoute(e, oldRoute = null) {
        const userInfo = AuthUtils.getAuthInfo();
        const accessToken = userInfo.accessToken;
        const urlRoute = window.location.pathname;

        if ((userInfo && accessToken) || (urlRoute === "/login") || (urlRoute === "/sign-in")) {
            if (oldRoute) {
                const currentRoute = this.routes.find(item => item.route === oldRoute);
                // if (currentRoute.styles && currentRoute.styles.length > 0) {
                //     currentRoute.styles.forEach(style => {
                //         document.querySelector(`link[href='/css/${style}']`).remove();
                //     });
                // }
                //
                // if (currentRoute.scripts && currentRoute.scripts.length > 0) {
                //     currentRoute.scripts.forEach(script => {
                //         document.querySelector(`script[src='/js/${script}']`).remove();
                //     });
                // }

                if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                    currentRoute.unload();
                }
            }
            const urlRoute = window.location.pathname;
            const newRoute = this.routes.find(item => item.route === urlRoute);

            if (newRoute) {
                // if (newRoute.styles && newRoute.styles.length > 0) {
                //     newRoute.styles.forEach(style => {
                //         FileUtils.loadPageStyle('/css/' + style)
                //     });
                // }
                //
                // if (newRoute.scripts && newRoute.scripts.length > 0) {
                //     for (const script of newRoute.scripts) {
                //         await FileUtils.loadPageScript('/js/' + script);
                //     }
                // }

                if (newRoute.title) {
                    this.titlePageElement.innerText = newRoute.title + ' | Lumincoin Finance';
                }

                if (newRoute.filePathTemplate) {
                    let contentBlock = this.contentPageElement;
                    if (newRoute.useLayout) {
                        this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                        contentBlock = document.getElementById('content-layout');

                        this.profileNameElement = document.getElementById('profile-name');
                        if (!this.userName) {
                            let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoTokenKey);
                            if (userInfo) {
                                userInfo = JSON.parse(userInfo);
                                if (userInfo.name) {
                                    this.userName = userInfo.name;
                                }
                            }
                        }
                        this.profileNameElement.innerText = this.userName;

                        this.activateMenuItem(newRoute);
                        this.getBalance();
                    }

                    contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                }

                if (newRoute.load && typeof newRoute.load === 'function') {
                    newRoute.load();
                }

            } else {
                console.log('No route found');
                history.pushState({}, '', '/404');
                await this.activateRoute();
            }
        } else {
            await this.openNewRoute('/login');
        }
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }

        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;
            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }

            await this.openNewRoute(url);
        }
    }

    activateMenuItem(route) {
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            const href = item.getAttribute('href');
            if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    async getBalance() {
        const balance = document.getElementById('balance');
        const result = await HttpUtils.request('/balance');
        if (result.error || !result.response.balance){
            console.log('Данные о балансе не получены');
            balance.innerText= '???';
        }
        balance.innerText = result.response.balance + '$';
    }
}
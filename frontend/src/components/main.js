import {Chart} from "chart.js/auto";
import {OperationsService} from "../services/operations-service";

export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.buttonToday = document.getElementById('buttonToday');
        this.buttonWeek = document.getElementById('buttonWeek');
        this.buttonMonth = document.getElementById('buttonMonth');
        this.buttonYear = document.getElementById('buttonYear');
        this.buttonAll = document.getElementById('buttonAll');
        this.buttonInterval = document.getElementById('buttonInterval');
        this.dateFrom = document.getElementById('inputFrom');
        this.dateTo = document.getElementById('inputTo');

        this.buttonAction().then();
        this.getAllOperations('day').then();

        this.allOperations = null;

        this.dataIncome = {};
        this.dataExpenses = {};

        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.diagramIncome = null;
        this.diagramExpenses = null;
        this.income = [];
        this.expenses = [];
    }

    async buttonAction() {
        this.buttonToday.addEventListener('click', () => {
            this.getAllOperations('day');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            this.buttonToday.classList.add('active');
        });

        this.buttonWeek.addEventListener('click', () => {
            this.getAllOperations('week');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            this.buttonWeek.classList.add('active');
        });

        this.buttonMonth.addEventListener('click', () => {
            this.getAllOperations('month');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            this.buttonMonth.classList.add('active');
        });

        this.buttonYear.addEventListener('click', () => {
            this.getAllOperations('year');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            this.buttonYear.classList.add('active');
        });

        this.buttonAll.addEventListener('click', () => {
            this.getAllOperations('all');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            this.buttonAll.classList.add('active');
        });

        this.buttonInterval.addEventListener('click', () => {
            let body = {
                dateFrom: this.dateFrom.value,
                dateTo: this.dateTo.value
            }
            this.getAllOperationsInterval('interval', body);
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            this.buttonInterval.classList.add('active');
        });
    }

    async getAllOperations(period) {
        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.income = [];
        this.expenses = [];
        if (this.diagramIncome) {
            this.diagramIncome.destroy();
        }
        if (this.diagramExpenses) {
            this.diagramExpenses.destroy();
        }

        const result = await OperationsService.getAllOperationsPeriod(period);
        if (result.error) {
            console.log('Ошибка при получении данных');
            return this.openNewRoute('/')
        }

        if (result.allOperations.length === 0) {
            console.log('Нет операций в выбранном периоде');
            return;
        }
        this.allOperations = result.allOperations;

        this.allOperations.forEach(operation => {
            if (operation.type === 'income') {

                if (this.income.length === 0) {
                    this.income.push({
                        category: operation.category,
                        amount: +operation.amount
                    });
                } else {
                    let categoryAlreadyInIncome = this.income.find(item => item.category === operation.category);
                    if (categoryAlreadyInIncome) {
                        categoryAlreadyInIncome.amount = +(categoryAlreadyInIncome.amount + operation.amount);
                    } else {
                        this.income.push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    }
                }
            }
            if (operation.type === 'expense') {

                if (this.expenses.length === 0) {
                    this.expenses.push({
                        category: operation.category,
                        amount: +operation.amount
                    });
                } else {
                    let categoryAlreadyInExpenses = this.expenses.find(item => item.category === operation.category);
                    if (categoryAlreadyInExpenses) {
                        categoryAlreadyInExpenses.amount = +(categoryAlreadyInExpenses.amount + operation.amount);
                    } else {
                        this.expenses.push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    }
                }
            }
        });
        this.income.forEach(income => {
            this.labelsIncome.push(income.category);
            this.amountsIncome.push(income.amount);
        })

        this.expenses.forEach(expense => {
            this.labelsExpenses.push(expense.category);
            this.amountsExpenses.push(expense.amount);
        })

        this.constructorDiagrams();
    }

    async getAllOperationsInterval(period, body) {
        this.labelsIncome = [];
        this.amountsIncome = [];
        this.labelsExpenses = [];
        this.amountsExpenses = [];
        this.income = [];
        this.expenses = [];
        if (this.diagramIncome) {
            this.diagramIncome.destroy();
        }
        if (this.diagramExpenses) {
            this.diagramExpenses.destroy();
        }

        const result = await OperationsService.getAllOperationsInterval(period, body);
        if (result.error) {
            console.log('Ошибка при получении данных');
            return this.openNewRoute('/')
        }

        if (result.allOperations.length === 0) {
            console.log('Нет операций в выбранном периоде');
            return;
        }
        this.allOperations = result.allOperations;

        this.allOperations.forEach(operation => {
            if (operation.type === 'income') {

                if (this.income.length === 0) {
                    this.income.push({
                        category: operation.category,
                        amount: +operation.amount
                    });
                } else {
                    let categoryAlreadyInIncome = this.income.find(item => item.category === operation.category);
                    if (categoryAlreadyInIncome) {
                        categoryAlreadyInIncome.amount = +(categoryAlreadyInIncome.amount + operation.amount);
                    } else {
                        this.income.push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    }
                }
            }
            if (operation.type === 'expense') {

                if (this.expenses.length === 0) {
                    this.expenses.push({
                        category: operation.category,
                        amount: +operation.amount
                    });
                } else {
                    let categoryAlreadyInExpenses = this.expenses.find(item => item.category === operation.category);
                    if (categoryAlreadyInExpenses) {
                        categoryAlreadyInExpenses.amount = +(categoryAlreadyInExpenses.amount + operation.amount);
                    } else {
                        this.expenses.push({
                            category: operation.category,
                            amount: +operation.amount
                        });
                    }
                }
            }
        });
        this.income.forEach(income => {
            this.labelsIncome.push(income.category);
            this.amountsIncome.push(income.amount);
        })

        this.expenses.forEach(expense => {
            this.labelsExpenses.push(expense.category);
            this.amountsExpenses.push(expense.amount);
        })

        this.constructorDiagrams();
    }

    constructorDiagrams() {
        const myDiagramIncomeCanvas = document.getElementById('myDiagramIncome');
        const myDiagramExpensesCanvas = document.getElementById('myDiagramExpenses');

        this.dataIncome = {
            labels: this.labelsIncome,
            datasets: [{
                label: 'Сумма, $',
                data: this.amountsIncome,
                backgroundColor: [
                    '#DC3545',
                    '#FD7E14',
                    '#FFC107',
                    '#20C997',
                    '#0D6EFD',
                ],
                hoverOffset: 4
            }]
        };

        this.diagramIncome = new Chart(myDiagramIncomeCanvas, {
            type: 'pie',
            data: this.dataIncome,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    // title: {
                    //     display: true,
                    //     text: 'Доходы'
                    // }
                }
            }
        });

        this.dataExpenses = {
            labels: this.labelsExpenses,
            datasets: [{
                label: 'Сумма, $',
                data: this.amountsExpenses,
                backgroundColor: [
                    '#DC3545',
                    '#FD7E14',
                    '#FFC107',
                    '#20C997',
                    '#0D6EFD',
                ],
                hoverOffset: 4
            }]
        };

        this.diagramExpenses = new Chart(myDiagramExpensesCanvas, {
            type: 'pie',
            data: this.dataExpenses,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    // title: {
                    //     display: true,
                    //     text: 'Доходы'
                    // }
                }
            }
        });
    }
}
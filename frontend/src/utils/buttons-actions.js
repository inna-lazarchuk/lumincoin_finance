import {IncomeExpenses} from "../components/income-expenses/income-expenses";

export class ButtonsActions {

    static async buttonAction(buttonToday, buttonWeek, buttonMonth, buttonYear, buttonAll, buttonInterval, dateFrom, dateTo) {
        buttonToday.addEventListener('click', () => {
           IncomeExpenses.getAllOperations('day');
           document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            buttonToday.classList.add('active');
        });

        buttonWeek.addEventListener('click', () => {
            IncomeExpenses.getAllOperations('week');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            buttonWeek.classList.add('active');
        });

        buttonMonth.addEventListener('click', () => {
            IncomeExpenses.getAllOperations('month');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            buttonMonth.classList.add('active');
        });

        buttonYear.addEventListener('click', () => {
            IncomeExpenses.getAllOperations('year');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            buttonYear.classList.add('active');
        });

        buttonAll.addEventListener('click', () => {
            IncomeExpenses.getAllOperations('all');
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            buttonAll.classList.add('active');
        });

        buttonInterval.addEventListener('click', () => {
            let body = {
                dateFrom: dateFrom.value,
                dateTo: dateTo.value
            }
            IncomeExpenses.getAllOperationsInterval('interval', body);
            document.querySelectorAll('.navigation-times .btn').forEach(button => {
                button.classList.remove('active');
            })
            buttonInterval.classList.add('active');
        });

    }
}
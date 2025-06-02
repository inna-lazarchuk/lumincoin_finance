import {IncomeService} from "../../services/income-service";
import {OperationsService} from "../../services/operations-service";
import {ExpensesService} from "../../services/expenses-service";

export class IncomeExpenseCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('saveButton').addEventListener('click', this.saveIncomeExpense.bind(this));

        this.type = document.getElementById('type-select');
        this.categorySelect = document.getElementById('category-select');
        this.sum = document.getElementById('sum');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');

        this.type.addEventListener('change',this.getCategories.bind(this))
        this.getCategories();
    }

    async getCategories() {
        this.categorySelect.innerHTML = "";

        if (this.type.value === 'income') {
            const result = await IncomeService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            result.categories.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.title;
                this.categorySelect.appendChild(option);
            })
        }

        if (this.type.value === 'expense') {
            const result = await ExpensesService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            result.categories.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.title;
                this.categorySelect.appendChild(option);
            })
        }
    }

    async saveIncomeExpense(e) {
        e.preventDefault();

        this.validateInputs();
        if (this.validateInputs()) {
            const body = {
                type: this.type.value,
                amount: this.sum.value,
                date: this.date.value,
                comment: this.comment.value,
                category_id: +this.categorySelect.value
            }

            const result = await OperationsService.addIncomeExpense(body);

            if (result.error || !result) {
                alert('Некорректные данные запроса');
            }
            return this.openNewRoute('/income-expenses');
        }

        if (!this.validateInputs()) {
            alert('not ok')
        }

    }

    validateInputs() {
        let isValid = false;

        if (this.sum.value) {
            this.sum.classList.remove('is-invalid');
            isValid = true;
        } else {
            this.sum.classList.add('is-invalid');
            isValid = false;
        }

        if (this.date.value) {
            this.date.classList.remove('is-invalid');
            isValid = true;
        } else {
            this.date.classList.add('is-invalid');
            isValid = false;
        }

        if (this.comment.value) {
            this.comment.classList.remove('is-invalid');
            isValid = true;
        } else {
            this.comment.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }
}
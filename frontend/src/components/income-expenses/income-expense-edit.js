import {OperationsService} from "../../services/operations-service";
import {IncomeService} from "../../services/income-service";
import {ExpensesService} from "../../services/expenses-service";

export class IncomeExpenseEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id = localStorage.getItem('operationId');

        this.type = document.getElementById('type-select');
        this.categorySelect = document.getElementById('category-select');
        this.sum = document.getElementById('sum');
        this.date = document.getElementById('date');
        this.comment = document.getElementById('comment');
        this.categories = null;

        this.getThisOperation(this.id);
        document.getElementById('edit-cancel').addEventListener('click', () => this.openNewRoute('/income-expenses'));
        document.getElementById('edit-save').addEventListener('click', this.editOperation.bind(this));
    }

    async getThisOperation(id) {
        const result = await OperationsService.getOperationById(id);
        if (result.error || !result.operation) {
            console.log('Ошибка запроса');
            return;
        }

        this.type.value = result.operation.type;
        this.type.setAttribute("disabled", "");
        await this.getCategories(this.type.value);
        this.categorySelect.value = this.categories.find(item => item.title === result.operation.category).id;
        this.sum.value = result.operation.amount;
        this.date.value = result.operation.date;
        this.comment.value = result.operation.comment;
    }

    async getCategories(type) {
        this.categorySelect.innerHTML = "";

        if (type === 'income') {
            const result = await IncomeService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            this.categories = result.categories;
            result.categories.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.title;
                this.categorySelect.appendChild(option);
            })
        }

        if (type === 'expense') {
            const result = await ExpensesService.getCategories();
            if (result.error) {
                console.log('Ошибка получения данных');
            }
            this.categories = result.categories;
            result.categories.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.innerText = item.title;
                this.categorySelect.appendChild(option);
            })
        }
    }

    async editOperation() {

        let data = {
            type: this.type.value,
            amount: this.sum.value,
            date: this.date.value,
            comment: this.comment.value,
            category_id: +this.categorySelect.value
        }

        let result = await OperationsService.editOperation(this.id, data);
        if (result.error) {
            console.log('Ошибка запроса');
        }
        return this.openNewRoute('/income-expenses');
    }
}
import {IncomeService} from "../../services/income-service";
import {ExpensesService} from "../../services/expenses-service";

export class ExpenseEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.id = localStorage.getItem('categoryId');

        this.getCategory(this.id).then();
    }

    async getCategory(id){
        let result = await ExpensesService.getCategory(id);
        if (result.error || !result.category) {
            console.log('Ошибка запроса');
        }

        const createBlock = document.getElementsByClassName('create-block')[0];

        const inputElement = document.createElement('input');
        inputElement.setAttribute('type','text');
        inputElement.setAttribute('id','nameCategoryIncomeEdit');
        inputElement.setAttribute('value',result.category.title);
        inputElement.classList.add('form-control');

        const actionsElement = document.createElement('div');
        actionsElement.classList.add('page-item-actions', 'd-flex');

        const buttonSaveElement = document.createElement('button');
        buttonSaveElement.setAttribute('type', 'button');
        buttonSaveElement.classList.add('btn','btn-success');
        buttonSaveElement.setAttribute('id', 'edit-save');
        buttonSaveElement.innerText = 'Сохранить';

        const buttonCancelElement = document.createElement('button');
        buttonCancelElement.setAttribute('type', 'button');
        buttonCancelElement.classList.add('btn','btn-danger');
        buttonCancelElement.setAttribute('id', 'edit-cancel');
        buttonCancelElement.innerText = 'Отмена';

        actionsElement.appendChild(buttonSaveElement);
        actionsElement.appendChild(buttonCancelElement);
        createBlock.appendChild(inputElement);
        createBlock.appendChild(actionsElement);

        document.getElementById('edit-cancel').addEventListener('click', () => this.openNewRoute('/expenses'));
        document.getElementById('edit-save').addEventListener('click', this.editCategory.bind(this));
    }

    async editCategory(e)  {
        e.preventDefault();

        const id = this.id;

        let newTitleCategory = document.getElementById('nameCategoryIncomeEdit').value;

        let result = await ExpensesService.editCategory(id, newTitleCategory);
        if(result.error) {
            console.log('Ошибка запроса');
        }
        return this.openNewRoute('/expenses');
    }
}
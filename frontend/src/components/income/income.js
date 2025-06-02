import {IncomeService} from "../../services/income-service";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getAllCategoriesIncome().then();
    }

    async getAllCategoriesIncome() {
        const response = await IncomeService.getCategories();

        if (response.error) {
            return;
        }
        this.showCategories(response.categories);

    }

    showCategories(categories) {
        const categoriesItemsElement = document.getElementById('categoriesItems');

        categories.forEach(category => {
            const categoryElement = document.createElement('div');
            categoryElement.classList.add('page-item');
            categoryElement.setAttribute('id', category.id);
            const titleElement = document.createElement('h3');
            titleElement.innerText = category.title;
            const actionsElement = document.createElement('div');
            actionsElement.classList.add('page-item-actions', 'd-flex');
            const buttonEditElement = document.createElement('button');
            buttonEditElement.setAttribute('type', 'button');
            buttonEditElement.classList.add('btn', 'btn-primary', 'button-edit');
            buttonEditElement.innerText = 'Редактировать';
            buttonEditElement.addEventListener('click', () => {
                localStorage.setItem('categoryId', category.id);
                localStorage.setItem('placeholder', category.title);
                this.openNewRoute('/income-edit')}
            );

            const buttonDeleteElement = document.createElement('button');
            buttonDeleteElement.setAttribute('type', 'button');
            buttonDeleteElement.classList.add('btn', 'btn-danger', 'button-delete');
            buttonDeleteElement.innerText = 'Удалить';
            buttonDeleteElement.addEventListener('click', () => {
                localStorage.setItem('categoryId', category.id);
                this.openNewRoute('/income-delete')
            });

            actionsElement.appendChild(buttonEditElement);
            actionsElement.appendChild(buttonDeleteElement);
            categoryElement.appendChild(titleElement);
            categoryElement.appendChild(actionsElement);
            categoriesItemsElement.appendChild(categoryElement);
        })

        const categoryLastElement = document.createElement('div');
        categoryLastElement.classList.add('page-item', 'd-flex', 'justify-content-center', 'align-items-center');
        const pageAddElement = document.createElement('div');
        pageAddElement.classList.add('page-item-add');
        pageAddElement.innerText = '+';
        categoryLastElement.appendChild(pageAddElement);
        categoriesItemsElement.appendChild(categoryLastElement);
        categoryLastElement.addEventListener('click', () => this.openNewRoute('/income-create'));
    }

}
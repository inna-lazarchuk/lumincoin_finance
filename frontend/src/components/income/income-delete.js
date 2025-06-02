import {IncomeService} from "../../services/income-service";

export class IncomeDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id = localStorage.getItem('categoryId');
        document.getElementById('buttonNo').addEventListener('click', () => {
            localStorage.removeItem('categoryId');
            this.openNewRoute('/income');
        });
        document.getElementById('buttonYes').addEventListener('click', this.deleteFunction.bind(this));
    }

    async deleteFunction() {
        const successDelete = await IncomeService.deleteIncomeCategory(this.id);
        if (!successDelete) {
            console.log('Ошибка при удалении')
        }

       return this.openNewRoute('/income');
    }
}
import {IncomeService} from "../../services/income-service";
import {OperationsService} from "../../services/operations-service";

export class IncomeExpenseDelete {
    constructor(openNewRoute) {
        this.id = localStorage.getItem('operationId');
        this.openNewRoute = openNewRoute;
        document.getElementById('buttonNo').addEventListener('click', () => this.openNewRoute('/income-expenses'))
        document.getElementById('buttonYes').addEventListener('click', this.deleteFunction.bind(this));
    }

    async deleteFunction() {
        const successDelete = await OperationsService.deleteIncomeExpenseCategory(this.id);
        if (!successDelete) {
            console.log('Ошибка при удалении')
        }

        localStorage.removeItem('operationId');
        return this.openNewRoute('/income-expenses');
    }
}
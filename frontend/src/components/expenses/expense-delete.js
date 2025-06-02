import {IncomeService} from "../../services/income-service";
import {ExpensesService} from "../../services/expenses-service";

export class ExpenseDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.id = localStorage.getItem('categoryId');
        document.getElementById('buttonNoE').addEventListener('click', () => {
            localStorage.removeItem('categoryId');
            this.openNewRoute('/expenses');
        });
        document.getElementById('buttonYesE').addEventListener('click', this.deleteFunction.bind(this));
    }

    async deleteFunction() {
        const successDelete = await ExpensesService.deleteExpenseCategory(this.id);
        if (!successDelete) {
            console.log('Ошибка при удалении')
        }

       return this.openNewRoute('/expenses');
    }
}
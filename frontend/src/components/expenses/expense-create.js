import {IncomeService} from "../../services/income-service";
import {AuthUtils} from "../../utils/auth-utils";
import {ExpensesService} from "../../services/expenses-service";

export class ExpenseCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('expense-cancel').addEventListener('click', () => this.openNewRoute('/expenses'));
        document.getElementById('expense-create').addEventListener('click', this.createCategory.bind(this));
    }

    async createCategory(e) {
        e.preventDefault();
        const titleCategory = document.getElementById('nameCategoryIncome');
        const result = await ExpensesService.createCategory(titleCategory.value);
        if (result.error) {
            console.log("Ошибка при создании новой категории расхода");
            return;
        }
       return this.openNewRoute('/expenses');
    }
}
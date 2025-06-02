import {IncomeService} from "../../services/income-service";
import {AuthUtils} from "../../utils/auth-utils";

export class IncomeCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('income-cancel').addEventListener('click', () => this.openNewRoute('/income'));
        document.getElementById('income-create').addEventListener('click', this.createCategory.bind(this));
    }

    async createCategory(e) {
        e.preventDefault();
        const titleCategory = document.getElementById('nameCategoryIncome');
        const result = await IncomeService.createCategory(titleCategory.value);
        if (result.error) {
            console.log("Ошибка при создании новой категории дохода");
            return;
        }
       return this.openNewRoute('/income');
    }
}
import {HttpUtils} from "../utils/http-utils";

export class OperationsService {

    static async getAllOperationsPeriod(period) {
        const returnObject = {
            error: false,
            allOperations: null
        }

        const result = await HttpUtils.request('/operations?period=' + period);

        if (result.error) {
            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.allOperations = result.response;
        return returnObject;
    }

    static async getAllOperationsInterval(period, body) {
        const returnObject = {
            error: false,
            allOperations: null
        }

        this.body = body;

        const result = await HttpUtils.request('/operations?period=' + period + '&dateFrom=' + this.body.dateFrom + '&dateTo=' + this.body.dateTo);

        if (result.error) {
            returnObject.error = 'Возникла ошибка при запросе доходов и расходов. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.allOperations = result.response;
        return returnObject;
    }

    static async getOperationById(id) {
        const returnObject = {
            error: false,
            operation: null
        }
        const result = await HttpUtils.request('/operations/' + id);

        if (result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при запросе операции. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.operation= result.response;
        return returnObject;
    }

    static async addIncomeExpense(body) {
        const returnObject = {
            error: false,
            id: null,
            type: null,
            amount: null,
            date: null,
            comment: null,
            category: null
        }

        const result = await HttpUtils.request('/operations', "POST", true, body);

        if (result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при добавлении категории дохода. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.id = result.response.id;
        returnObject.type = result.response.type;
        returnObject.amount = result.response.amount;
        returnObject.date = result.response.date;
        returnObject.comment = result.response.comment;
        returnObject.category = result.response.category;

        return returnObject;
    }

    static async editOperation(id, data) {
        const returnObject = {
            error: false
        };

        const result = await HttpUtils.request('/operations/' + id, "PUT", true, data);
        if (result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при редактировании дохода или расхода. Обратитесь в поддержку';
            return returnObject;
        }

        return returnObject;
    }

    static async deleteIncomeExpenseCategory (id) {

        const result = await HttpUtils.request('/operations/' + id, "DELETE", true);
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log('Возникла ошибка при удалении операции. Обратитесь в поддержку');
            return false;
        }
        console.log('Удаление операции прошло успешно')
        return true;
    }


}
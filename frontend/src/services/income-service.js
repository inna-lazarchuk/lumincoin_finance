import {HttpUtils} from "../utils/http-utils";

export class IncomeService {
    static async getCategories() {
        const returnObject = {
            error: false,
            redirect: null,
            categories: null
        }
        const result = await HttpUtils.request('/categories/income');

        if (result.error || !result.response) {
            returnObject.error = 'Возникла ошибка при запросе всех категорий доходов. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.categories = result.response;

        return returnObject;

    }

    static async getCategory(id) {
        const returnObject = {
            error: false,
            category: null
        }
        const result = await HttpUtils.request('/categories/income/' + id);

        if (result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при запросе категории. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.category= result.response;
        return returnObject;
    }

    static async createCategory(data) {
        const returnObject = {
            error: false,
            id: null,
            title: null
        };

        const changedData = {title: data};

        const result = await HttpUtils.request('/categories/income', "POST", true, changedData);
        if (result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при добавлении категории дохода. Обратитесь в поддержку';
            return returnObject;
        }

        returnObject.id = result.response.id;
        returnObject.title = result.response.title;
        return returnObject;
    }

    static async editCategory(id, data) {
        const returnObject = {
            error: false
        };

        const changeData = {title: data}

        const result = await HttpUtils.request('/categories/income/' + id, "PUT", true, changeData);
        if (result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при редактировании категории дохода. Обратитесь в поддержку';

            return returnObject;
        }

        return returnObject;
    }

    static async deleteIncomeCategory (id) {

        const result = await HttpUtils.request('/categories/income/' + id, "DELETE", true);
        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log('Возникла ошибка при удалении категории дохода. Обратитесь в поддержку');
            return false;
        }
        console.log('Удаление категории прошло успешно')
        return true;
    }
}
export default class CategoryService {

    static URL_API= 'http://127.0.0.1:8800/api/categories';
    static HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

    static getItemsList() {
        return fetch(this.URL_API)
            .then(res => res.json())
            .catch(error => error);
    }

    static getItemById(id) {
        return fetch(`${this.URL_API}/${id}`)
            .then(res => res.json())
            .catch(error => error);
    }

    static searchItemByName(name) {
        return fetch(`${this.URL_API}/search/${name}`)
            .then(res => res.json())
            .catch(error => error);
    }

    static insert(params) {
        const options = {
            method: 'POST',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(this.URL_API, options)
        .then(response => response.json())
        .catch(error => error);
    }

    static update(params) {
        const options = {
            method: 'PUT',
            headers: this.HEADERS,
            body: JSON.stringify(params)
        };
        return fetch(`${this.URL_API}`, options)
            .then(response => response.json())
            .catch(error => error);
    }

    static delete(id) {
        const options = { method: 'DELETE' };
        return fetch(`${this.URL_API}/${id}`, options)
            .then(response => response.json())
            // .catch(error => error);
    }
}
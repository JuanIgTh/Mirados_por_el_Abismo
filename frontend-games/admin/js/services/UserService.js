const HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const login = (params) => {
    const options = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(params)
    };
    return fetch( 'http://127.0.0.1:8800/api/login', options)
    .then(response => response.json())
    .catch(error =>error);
};

export const register = (params) => {
    const options = {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(params)
    };
    return fetch('http://127.0.0.1:8800/api/register', options)
    .then(response => response.json())
    .catch(error => error);
};

    

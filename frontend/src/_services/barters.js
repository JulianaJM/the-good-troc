import { authHeader } from '../_router';

export const barterService = {
    getAll,
    createBarter,
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('api/trocs', requestOptions).then(handleResponse);
}

function createBarter(data) {
    const headers = authHeader();
    // headers['Content-Type'] = 'multipart/formdata';
    const requestOptions = {
        method: 'POST',
        headers,
        body: data
    };

    return fetch('api/trocs', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
           
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
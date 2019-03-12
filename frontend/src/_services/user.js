import { authHeader } from '../_router';

export const userService = {
    login,
    logout,
    register,
    getAll,
    // getById,
    // update,
    // delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch("/auth/signin", requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('api/trocs', requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('/auth/signup', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (response.status === 401) {
        //location.reload(true);
        return Promise.reject("username et/ou password invalide");
    }
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
           
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
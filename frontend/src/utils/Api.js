
class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        }).then(this._errorHandler);
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        }).then(this._errorHandler);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH', 
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(this._errorHandler);
    }

    postCard(data) {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(this._errorHandler);
    }

    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers
        }).then(this._errorHandler);
    }

    setUserAvatar(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data
            })
        }).then(this._errorHandler);
    }
    
    changeLikeCardStatus(_id, isLiked) {
        return fetch(`${this._url}/cards/${_id}/likes`, {
            credentials: 'include',
            method: (isLiked ? 'PUT' : 'DELETE'),
            headers: this._headers,
        }).then(this._errorHandler);
    }

    _errorHandler(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }
}

const api = new Api({
    url: 'http://api.yzavyalova-mesto.nomoredomains.work',
    headers: {
        // authorization: '082e7c30-145f-4e11-a3cd-66bdd63d57bc',
        'Content-Type': 'application/json'
    }
});

export default api;
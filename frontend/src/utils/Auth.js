export const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const request = ({url, method = 'POST', body}) => {
  const config = {
    method,
    credentials: 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      //...!!token && { 'Authorization': `Bearer ${token}` 
    // },
    },
    ...!!body && { body: JSON.stringify(body) },
  }
  return fetch(`${BASE_URL}${url}`, config)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      
      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

export const register = (userData) => {
  return request({
    url: '/signup',
    body: userData,
  })
};

export const authorize = (userData) => {
  return request({
    url: '/signin',
    body: userData,
  })
};

// export const getContent = token => {
//   return request({
//     url: '/users/me',
//     method: 'GET',
//     //token,
//   })
// };

export const logout = () => {
  return request({
    url: '/signout',
    method: 'DELETE',
  })
};


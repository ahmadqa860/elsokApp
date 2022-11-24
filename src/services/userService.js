import {apiUrl, header} from '../config.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

let tokenKey = 'elsok-token';

const setTokenData = async tokenData => {
  const res = await AsyncStorage.setItem(tokenKey, tokenData)
    .then(response => response)
    .then(json => json)
    .catch(err => err);
  return res;
};

export async function getUserInfo() {
  const tokenData = await AsyncStorage.getItem(tokenKey)
    .then(response => response)
    .then(json => json)
    .catch(err => err);
  if (hasToken() && tokenData !== null) {
    const response = await fetch(`${apiUrl}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
        Accept: 'application/json',
      },
    });
    const json = await response.json();
    return json;
  }
}

export async function getUserProducts() {
  const tokenData = await AsyncStorage.getItem(tokenKey)
    .then(response => response)
    .then(json => json)
    .catch(err => err);
  if (hasToken() && tokenData !== null) {
    const response = await fetch(`${apiUrl}/seller-products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
        Accept: 'application/json',
      },
    });
    const json = await response.json();
    return json;
  }
}

export async function login(email, password) {
  const data = {
    email: email,
    password: password,
  };
  const tokenResponse = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        return false;
      } else {
        try {
          setTokenData(data.success.token);
          return data.success.token;
        } catch (error) {
          return false;
        }
      }
    })
    .catch(error => false);

  return tokenResponse;
}

export async function logout() {
  return await AsyncStorage.removeItem(tokenKey)
    .then(res => res)
    .catch(err => err);
}

export async function registerUser({email, password, password_confirmation}) {
  const userData = {
    email: email,
    password: password,
    password_confirmation: password_confirmation,
  };
  const response = await fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        console.log(data.errors);
        return false;
      } else {
        try {
          setTokenData(data.success.token);
          return true;
        } catch (error) {
          return false;
        }
      }
    })
    .catch(e => console.log(e));

  return response;
}

export async function registerProfile(
  {identity = null, name, mobile, address, city_id},
  userType,
) {
  const userData = {
    identity: identity,
    name: name,
    mobile: mobile,
    city_id: city_id,
    address: address,
    userType: userType,
  };
  const tokenData = await AsyncStorage.getItem(tokenKey)
    .then(response => response)
    .then(json => json)
    .catch(err => err);

  if (hasToken() && tokenData !== null) {
    const response = await fetch(`${apiUrl}/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          return false;
        } else {
          try {
            return true;
          } catch (error) {
            return false;
          }
        }
      })
      .catch(e => false);
    return response;
  }
}

export async function addProduct(
  {imagesArray, categorie_id, product_title, address, product_description},
  product_price,
) {
  var bodyFormData = new FormData();

  for (let uploadImage of imagesArray) {
    bodyFormData.append('uploadImages[]', uploadImage);
  }

  bodyFormData.append('categorie_id', categorie_id);
  bodyFormData.append('product_title', product_title);
  bodyFormData.append('product_description', product_description);
  bodyFormData.append('product_price', product_price);

  const tokenData = await AsyncStorage.getItem(tokenKey)
    .then(response => response)
    .then(json => json)
    .catch(err => err);

  if (hasToken() && tokenData !== null) {
    const response = await fetch(`${apiUrl}/seller-products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(bodyFormData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          console.log(data.errors);
          return false;
        } else {
          try {
            return true;
          } catch (error) {
            return false;
          }
        }
      })
      .catch(e => false);
    return response;
  }
}

export async function hasToken() {
  const token = await AsyncStorage.getItem(tokenKey)
    .then(res => true)
    .catch(res => false);
  return token;
}

export async function deleteItem(id) {
  const tokenData = await AsyncStorage.getItem(tokenKey)
    .then(response => response)
    .then(json => json)
    .catch(err => err);
  if (hasToken() && tokenData !== null) {
    const response = await fetch(`${apiUrl}/seller-products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenData}`,
        Accept: 'application/json',
      },
    })
      .then(res => res)
      .then(json => json)
      .catch(err => err);
    //const json = await response.json();
    console.log(response);
    return response;
    //return json;
  }
}

export default {
  login,
  registerUser,
  hasToken,
  logout,
  getUserInfo,
  getUserProducts,
  deleteItem,
  registerProfile,
  addProduct,
};

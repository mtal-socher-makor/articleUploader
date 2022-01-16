import axios from 'axios'


export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const END_POINT = {
  AUTH: '/auth',
  FILE: '/file',
  UTILS: '/utils',
  USER: '/user',
  ARTICLE: '/article',
}

export function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// export const storageKeys = {
//   userToken: "token",
//   userContent: "content",
// };

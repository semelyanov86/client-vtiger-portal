import Axios, { InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '../config';
import { useNotificationStore } from '../stores/notifications';

import { getToken } from './token.ts';

export interface DataResponse<T> {
  data: T;
}

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const access_token = getToken()?.value || null;
  if (!config.headers) {
    return config;
  }

  if (access_token) {
    config.headers.authorization = `Bearer ${access_token}`;
  }
  config.headers.Accept = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  }
);

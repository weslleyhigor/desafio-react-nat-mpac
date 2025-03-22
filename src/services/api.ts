import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://openingteste.mpac.mp.br/api/v1',
    timeout: 8000,
});
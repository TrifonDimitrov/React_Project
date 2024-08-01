import * as request from './requester';

const BASE_URL = ''

export const getAll = () => request.get(BASE_URL)

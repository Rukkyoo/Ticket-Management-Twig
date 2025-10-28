import axios from 'axios';

export const authInstance = axios.create({
  baseURL: 'https://api.mantahq.com/api/workflow/michaelomonedo001/ticket-management/authentication',
  timeout: 8000,
  headers: {'X-Custom-Header': 'foobar'}
});
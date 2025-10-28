import axios from 'axios';

export const ticketInstance = axios.create({
  baseURL: 'https://api.mantahq.com/api/workflow/rukkyomonedo/tickets',
  timeout: 8000,
  headers: {'Content-Type': 'application/json'}
});
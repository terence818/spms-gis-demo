import axios from 'axios'
// const BASE_URL = 'http://192.168.100.11:9020';
const BASE_URL = 'http://localhost:9020'
const apiClient = axios.create({
  baseURL: BASE_URL, // Replace with your API base URL
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
//     // Add any other headers you need
//   }
})

export default apiClient
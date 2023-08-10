import axios from 'axios'
const BASEURL ='http://localhost:4000'

const instance = axios.create({
  baseURL: BASEURL,
});

export default instance;
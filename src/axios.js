import axios from 'axios'

// axios.defaults.baseURL = 'https://api.fajarfaz.space/';
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

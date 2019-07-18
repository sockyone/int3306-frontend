import UserService from './../service/user.service';
import axios from 'axios';

function get(url) {
    let headers = {};
    if (UserService.token != null) {
        headers.Authorization = UserService.token;
    }
    return axios.get(url, {
        headers: headers
    });
}

function post(url, payload) {
    let headers = {};
    if (UserService.token != null) {
        headers.Authorization = UserService.token;
    }
    return axios.post(url, payload, {
        headers: headers
    });
}

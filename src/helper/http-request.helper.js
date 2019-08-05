import UserService from './../service/user.service';
import axios from 'axios';

function get(url) {
    let headers = {};
    if (UserService.getToken() != null) {
        headers.Authorization = 'Bearer ' + UserService.token;
    }
    return axios.get(url, {
        headers: headers
    });
}

function post(url, payload) {
    let headers = {};
    if (UserService.getToken() != null) {
        headers.Authorization = 'Bearer ' + UserService.token;
    }
    return axios.post(url, payload, {
        headers: headers
    });
}

export default {
    get: get,
    post: post
};

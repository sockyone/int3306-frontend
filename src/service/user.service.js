import axios from 'axios';
import httpRequest from './../helper/http-request.helper';

const apiUrl = "http://localhost:3000";

class UserService {
    constructor() {
        this.token = null;
        this.firstName = null;
        this.lastName = null;
    }

    setUser(user) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.token = user.token;
        localStorage.setItem("token", this.token);
    }

    async getFirstName() {
        if (this.isLoggedIn()) {
            let response = await httpRequest.post(apiUrl + "/auth/get-name", {});
            response = response.data;
            if (response.code) {
                return response.payload.firstName;
            } else {
                return 'undefined';
            }
        } else {
            return 'undefined';
        }
    }

    isLoggedIn() {
        if (this.token) return true;
        else {
            //try get from local storge
            this.token = localStorage.getItem("token");
            return this.token != null;
        }
    }

    getToken() {
        if (this.token) return this.token;
        else {
            this.token = localStorage.getItem("token");
            return this.token;
        }
    }

    logout() {
        if (this.token) {
            this.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            localStorage.removeItem('lastName');
        }
    }

    login(username, password) {
        return axios.post(apiUrl + '/auth/login', {
            username: username,
            password: password
        });
    }

    signUp(data) {
        return axios.post(apiUrl + '/auth/sign', data);
    }
}


let userService = new UserService();

export default userService;
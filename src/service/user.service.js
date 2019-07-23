class UserService {
    constructor() {
        this.token = null;
    }

    isLoggedIn() {
        if (this.token) return true;
        else {
            //try get from local storge
            this.token = localStorage.getItem("token");
            return this.token != null;
        }
    }

    logout() {
        if (this.token) {
            this.token = null;
            localStorage.removeItem('token');
        }
    }

    login() {
        return new Promise((resolve, reject)=> {

        });
    }
}


let userService = new UserService();

export default userService;
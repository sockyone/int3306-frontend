class UserService {
    constructor() {
        this.token = null;
    }

    isLoggedIn() {
        if (this.token) return true;
        else {
            //try get from local Storge
            this.token = localStorage.getItem("token");
            return this.token != null;
        }
    }
}


let userService = new UserService();

export default userService;
export class UserService{
    constructor($auth, API){
        'ngInject';

        this.$auth = $auth;
        this.API = API;

        //get this user
        this.user = $auth.isAuthenticated()? API.one('user').get() : {};
    }


}

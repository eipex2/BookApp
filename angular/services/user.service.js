/**
 * @Author: eipex
 * @Date:   2017-04-25T11:26:14-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-27T16:32:41-05:00
 */



export class UserService{
    constructor($auth, API, $state, ToastService){
        'ngInject';

        this.$auth = $auth;
        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService

        if(this.$auth.isAuthenticated()){
          this.user = this.API.one('user').get().then((response)=>{
              this.user = response;
          });
        }
    }

    getUser(){
      return this.$auth.isAuthenticated()? this.API.one('user').get() : {}
    }

    login(user){
      this.$auth.login(user)
        .then((response) => {
          this.$auth.setToken(response.data);
          this.API.one('user').get().then((response)=>{
            this.user = response;
            this.ToastService.show('Logged in successfully.');
            this.$state.go('app.landing', {}, {reload:true, inherit:false, notify:true});
          });
        })
      .catch(this.failedLogin.bind(this));
    }

    failedLogin(response) {
      if (response.status === 422) {
        for (let error in response.data.errors) {
          return this.ToastService.error(response.data.errors[error][0]);
        }
      }
      this.ToastService.error(response.statusText);
    }
}

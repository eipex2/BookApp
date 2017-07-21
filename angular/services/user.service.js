/**
 * @Author: eipex
 * @Date:   2017-04-25T11:26:14-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-20T20:29:04-05:00
 */



export class UserService{
    constructor($auth, API, $state, ToastService){
        'ngInject';

        this.$auth = $auth;
        this.API = API;
        this.$state = $state;
        this.ToastService = ToastService
    }

    getUser(){
      if(this.user){
        return this.user
      }else{
        return this.API.one('user').get()
        //his.$auth.isAuthenticated()? this.API.one('user').get() : {}
      }
    }

    login(user){
      this.$auth.login(user)
        .then((response) => {
          this.$auth.setToken(response.data);
          this.API.one('user').get().then((response)=>{
            this.user = response;
            this.ToastService.show('Logged in successfully.');
            this.$state.go('app.welcome', {}, {reload:false, inherit:false, notify:true});
            //this.redirectUser(this.user)
          });
        })
      .catch(this.failedLogin.bind(this));
    }

    logout(){
        if (!this.$auth.isAuthenticated()) { return; }
        this.$auth.logout()
            .then(() => {
                this.user = {};
                this.ToastService.show('You have been logged out.');
                this.$state.go('app.login');
            });
    }

    updateProfile(data){
      return this.API.all('user/update_profile').post(data);
    }

    // updateProfile(data){
    //   return this.API.all('user/update_profile').post(data).then((response)=>{
    //     this.user = response.data.user;
    //     this.redirectUser(this.user)
    //   });
    // }

    redirectUser(user){
      //redirect user to register if profile is incomplete
      if(!( user.type || user.dob || user.school || user.sex) ){
        this.$state.go('app.edit-profile', {}, {reload:true, inherit:false, notify:true});
      }else{
        if(user.type === 'Instructor'){
          this.$state.go('app.welcome', {}, {reload:false, inherit:false, notify:true});
        }else{
          this.$state.go('app.filter', {}, {reload:false, inherit:false, notify:true});
        }
      }
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

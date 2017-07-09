/**
 * @Author: eipex
 * @Date:   2017-03-11T14:56:01-06:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-06T17:27:45-05:00
 */



class AppHeaderController{
    constructor($sce, $auth, ToastService, $location, API, UserService, $mdSidenav){
        'ngInject';

        this.$sce = $sce;
        this.$auth = $auth;
        this.ToastService = ToastService;
        this.$location = $location;
        this.API = API;
        this.UserService = UserService;
        this.$mdSidenav = $mdSidenav;
    }

    $onInit(){
        if (this.$auth.isAuthenticated()) {
            // this.API.one('profile').get().then(response => {
            //     this.user= response;
            //     console.log(this.user);
            // });
        }
    }

    toggleMainSideNav(){
        this.$mdSidenav("main-sidenav")
       .toggle()
    }

    profile(id){
        if (!this.$auth.isAuthenticated()) { return; }
        this.$location.path('/profile/' + id);
    }

    logout(){
        if (!this.$auth.isAuthenticated()) { return; }
        this.$auth.logout()
            .then(() => {
                this.UserService.user = {};
                this.ToastService.show('You have been logged out.');
                this.$location.path('/');
            });
    }
}

export const AppHeaderComponent = {
    templateUrl: './views/app/components/app-header/app-header.component.html',
    controller: AppHeaderController,
    controllerAs: 'vm',
    bindings: {
        user: '<user',
        shadow:'<shadow'
    }
};

class AppHeaderController{
    constructor($sce, $auth, ToastService, $location, API){
        'ngInject';

        this.$sce = $sce;
        this.$auth = $auth;
        this.ToastService = ToastService;
        this.$location = $location;
        this.API = API;
    }

    $onInit(){
        if (this.$auth.isAuthenticated()) {
            // this.API.one('profile').get().then(response => {
            //     this.user= response;
            //     console.log(this.user);
            // });
        }
    }

    profile(id){
        if (!this.$auth.isAuthenticated()) { return; }
        this.$location.path('/profile/' + id);
    }

    logout(){
        if (!this.$auth.isAuthenticated()) { return; }
        this.$auth.logout()
            .then(() => {
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
        user: '<user'
    }
};

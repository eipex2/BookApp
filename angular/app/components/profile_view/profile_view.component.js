class ProfileViewController{
    constructor($location){
        'ngInject';

        this.$location = $location;
    }

    $onInit(){
        
    }

    showDetail(id){
      this.$location.path('/listings/'+ id);
    }
}

export const ProfileViewComponent = {
    templateUrl: './views/app/components/profile_view/profile_view.component.html',
    controller: ProfileViewController,
    controllerAs: 'vm',
    bindings: {
        userp: '<userp',
        currentUser: '<currentUser'
    }
}

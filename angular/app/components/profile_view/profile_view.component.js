class ProfileViewController{
    constructor($location, $mdDialog, $state, API, ToastService, $scope, Upload, $auth){
        'ngInject';

        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.API = API;
        this.ToastService = ToastService;
        this.$scope = $scope;
        this.Upload = Upload;
        this.$auth = $auth;
        this.rating = 5;
    }

    $onInit(){
      //only show change avatar button for current user
      this.showChangeAvatar = this.userp.id === this.currentUser.id;
    }


    showDetail(id){
      this.$location.path('/listings/'+ id);
    }

    rentalAction(rental){
      if(rental.status==="approved"){
        this.$state.go('app.chat');
      }else{
        this.$location.path('/listings/'+ rental.listing.id);
      }
    }

    selectImage(ev){
      console.log("yes");
      var vm = this;
      //vm.file = files[0];
      vm.$mdDialog.show({
        controller: AvatarDialogController,
        controllerAs: 'vm',
        templateUrl: './views/app/components/profile_view/avatar.tmpl.html',
        parent: angular.element(document.body),
        clickOutsideToClose:false,
        locals : {
                file:vm.file
              },
        fullscreen: false // Only for -xs, -sm breakpoints.
      })
      .then(function(file) {
        vm.uploadImage();
      }, function() {
          vm.file = "";
      });
    }

    // upload on file select or drop
    uploadImage() {
        var vm = this;
        this.Upload.upload({
            url: '/api/profile/file',
            method: 'POST',
            sendFieldsAs: 'form',
            data: {
                file: vm.file,
                id: vm.currentUser.id
            },
            headers: { 'Authorization': 'Bearer ' + this.$auth.getToken() },
            withCredentials: true
        }).then((response) => {
            console.log(response);
            vm.$state.reload();
            vm.ToastService.show('Avatar changed');
            vm.file = "";
        });
    }
}

class AvatarDialogController{
    constructor($scope,$mdDialog,file){
        'ngInject';

        this.$mdDialog = $mdDialog;
        this.file = file;
    }

    hide() {
      this.$mdDialog.hide();
    }

    cancel() {
      this.$mdDialog.cancel();
    }

    save(){
      this.$mdDialog.hide(this.file);
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

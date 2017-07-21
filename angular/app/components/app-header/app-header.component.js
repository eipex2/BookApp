/**
 * @Author: eipex
 * @Date:   2017-03-11T14:56:01-06:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-20T20:57:04-05:00
 */



class AppHeaderController{
    constructor($sce, $auth, ToastService, $location, API, UserService, $mdSidenav, $state, $mdDialog){
        'ngInject';

        this.$sce = $sce;
        this.$auth = $auth;
        this.ToastService = ToastService;
        this.$location = $location;
        this.API = API;
        this.UserService = UserService;
        this.$mdSidenav = $mdSidenav;
        this.$state = $state;
        this.$mdDialog = $mdDialog;
    }

    $onInit(){

    }

    editProfileEmoji(){
      var dialog = {
        controllerAs: 'vm',
        controller:ProfileEmojiDialogController,
        templateUrl: './views/app/components/app-header/profile_emoji_dialog.tmpl.html',
        // template:'<md-dialog class="course_dialog" layout="column" flex="50" aria-label="Add Book" ng-class="{error:vm.error}">
        //     <form layout="column" layout-fill>
        //       <md-dialog-content setheight="50" layout-padding style="overflow:hidden">
        //       </md-dialog-content>
        //     </form>
        //   </md-dialog>'
        parent: angular.element(document.body),
        autoWrap:false,
        fullscreen: false// Only for -xs, -sm breakpoints.
      };


      this.$mdDialog.show(dialog)
      .then((data) => {
          this.UserService.updateProfile(data).then((response)=>{
            this.user.color = response.data.user.color;
            this.UserService.user = response.data.user
            this.ToastService.show("Profile updated")
          })
      }, () => {
          this.$mdDialog.hide();
      });
    }

    toggleMainSideNav(){
        this.$mdSidenav("main-sidenav")
       .toggle()
    }

    profile(id){
        if (!this.$auth.isAuthenticated()) { return; }
        this.$location.path('/profile/' + id);
    }
}

class ProfileEmojiDialogController{
    constructor($mdDialog){
        'ngInject'
        this.$mdDialog = $mdDialog
        this.colors = ['white','#f1f1f0','#00659d','#b72b3d','#e2c58a','#00abbc','#fc8890','#bcdbdb','#b35d7f','#4a9590','#000000']
    }

    changeProfileColor(color){
      this.profileColor = color
    }

    updateProfileEmoji(){
      var data = {
        profile_color: this.profileColor
      }
      this.$mdDialog.hide(data);
    }

    cancel(){
      this.$mdDialog.cancel();
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

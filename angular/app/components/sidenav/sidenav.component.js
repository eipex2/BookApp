/**
 * @Author: eipex
 * @Date:   2017-06-20T20:45:30-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-20T20:52:22-05:00
 */



class SidenavController{
    constructor( $state, $mdDialog, $mdSidenav, ChannelService,SubscriptionService,UserService){
        'ngInject';

        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.$mdSidenav = $mdSidenav;
        this.ChannelService = ChannelService;
        this.SubscriptionService = SubscriptionService;
        this.UserService = UserService;
    }

    $onInit(){
      this.ChannelService.getUserChannels().then((response)=>{
        this.channels = response;
        this.no_channels = this.channels.length === 0
      });

      this.SubscriptionService.getUserSubscriptions().then((response)=>{
        this.subscriptions = response;
        this.no_subs = this.subscriptions.length === 0
      })
    }

    loadChannel(channel){
      this.$mdSidenav("main-sidenav")
      .close()

      this.ChannelService.loadChannel(channel);
      // this.$state.go('app.landing',{course_id:channel.id}, {reload:"app.landing"})
    }

    createChannel(){
      this.$mdSidenav("main-sidenav")
      .toggle()

      var dialog = {
        controllerAs: 'vm',
        controller: ChannelController,
        templateUrl: './views/app/components/sidenav/sidenav_dialog.tmpl.html',
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
      .then(() => {
          //view the page
          //this.ChannelService.loadChannel(this.channel);
      }, () => {
          //create another page
          this.$mdDialog.hide();
      });
    }

    createPage(){
        this.$state.go('app.create_page', {});
    }

}

class ChannelController{
  constructor($mdDialog){
      'ngInject';
    this.$mdDialog = $mdDialog
  }

  $onInit(){

  }

  cancel(){
    this.$mdDialog.cancel();
  }
}

export const SidenavComponent = {
    templateUrl: './views/app/components/sidenav/sidenav.component.html',
    controller: SidenavController,
    controllerAs: 'vm',
    bindings: {
      'user':'<'
    }
}

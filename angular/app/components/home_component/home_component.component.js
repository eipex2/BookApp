

class HomeComponentController{
    constructor($location, $mdDialog, $state, API, ToastService){
        'ngInject';

        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.API = API;
        this.ToastService = ToastService;
    }

    $onInit(){
        //console.log(this.listings);
    }

    goCreateBook(){
        //this.$location.path('/add-book');
        this.$state.go('app.add_book', {}, {reload:true, inherit:false, notify:true});
    }

    detail(id){
        this.$location.path('/posts/'+ id);
    }

    showProfile(id){
        this.$location.path('/profile/' + id);
    }

    /**
    shows rent dialog
    **/
    showAdvanced(ev,listing) {
        var vm = this;
        this.$mdDialog.show({
          controller: RentDialogController,
          controllerAs: 'vm',
          templateUrl: './views/app/components/home_component/rent.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          locals : {
                    listing : listing
                },
          fullscreen: true // Only for -xs, -sm breakpoints.
        })
        .then(function(dates) {
          //console.log(listing['user_id']);
            var data = {
              start_date: dates.start_date,
              end_date: dates.end_date,
              user_id: vm.currentUser.id,
              list_user_id:listing.user_id,
              list_id: listing.id
            }
            vm.API.all('rent').post(data).then(() => {
                vm.$state.go('app.landing', {}, {reload:true, inherit:false, notify:true});
                vm.ToastService.show('Owner contacted');
            });
        }, function() {

        });
    }


}

class RentDialogController{
    constructor($scope,$mdDialog){
        'ngInject';

        this.$mdDialog = $mdDialog;
    }

    hide() {
      this.$mdDialog.hide();
    }

    cancel() {
      this.$mdDialog.cancel();
    }

    rent(){
      var dates = {
        start_date:this.start_date,
        end_date: this.end_date
      }
      this.$mdDialog.hide(dates);
    }
}

export const HomeComponentComponent = {
    templateUrl: './views/app/components/home_component/home_component.component.html',
    controller: HomeComponentController,
    controllerAs: 'vm',
    bindings: {
        listings:'<listings',
        currentUser: '<currentUser'
    }
}

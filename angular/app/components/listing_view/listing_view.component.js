class ListingViewController{
    constructor($location, $state, $stateParams, API, ToastService){
        'ngInject';

        this.$location = $location;
        this.$state = $state;
        this.API = API;
        this.$stateParams = $stateParams;
        this.ToastService = ToastService;
    }

    $onInit(){
        if(this.listing.user.id===this.currentUser.id){
          this.showUpdateButton = true;
        }else{
          this.showUpdateButton = false;
        }
    }

    updateReservation(id, status){

        var data = {
            rent_id : id,
            status: status==='cancelled'||status==='pending'?'approved':'cancelled'
        };

        //had an error with rent/update as route changed to rents/update worked -- TD
        this.API.all('rents/update').post(data).then(() => {
            this.$state.go(this.$state.$current, {id: this.$stateParams.id}, {reload:true, inherit:false, notify:true});
            this.ToastService.show(data.status);
        });
    }

    showProfile(id){
        this.$location.path('/profile/' + id);
    }
}

export const ListingViewComponent = {
    templateUrl: './views/app/components/listing_view/listing_view.component.html',
    controller: ListingViewController,
    controllerAs: 'vm',
    bindings: {
      listing : '<listing',
      currentUser: '<currentUser'
    }
}



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
        //this.listings = new Listings(this.API);
    }

    imgPath(listing){
      return "/uploads/avatars/"+listing.user.avatar;
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
            var data = {
              start_date: dates.start_date,
              end_date: dates.end_date,
              user_id: vm.currentUser.id,
              listing_id:listing.id
            }
            vm.API.all('rent').post(data).then(() => {
                vm.$state.go('app.landing', {}, {reload:true, inherit:false, notify:true});
                vm.ToastService.show('Owner contacted');
            });
        }, function() {

        });
    }


}

class Listings {
    constructor(API){
      'ngIngect';

      this.API = API;

      this.loadedPages = {};

      this.numItems = 0;

      this.PAGE_SIZE = 10;

      this.fetchNumItems_();
    }

    getItemAtIndex(index){
       var pageNumber = Math.floor(index / this.PAGE_SIZE);
       var page = this.loadedPages[pageNumber];

       if (page) {
         return page[index % this.PAGE_SIZE];
       } else if (page !== null) {
         this.fetchPage_(pageNumber);
       }
    };

    getLength(){
      return this.numItems;
    };

    fetchPage_(pageNumber){

        // Set the page to null so we know it is already being fetched.
        this.loadedPages[pageNumber] = null;
        var vm = this;

        this.API.all('listings/').customGET("items",{page:pageNumber+1}).then((response) => {

            var listings = response.data;

            this.currentpage = response.current_page;

            this.loadedPages[pageNumber] = [];

            this.loadedPages[pageNumber] = listings;
            console.log(response);
        });



    };

    fetchNumItems_(){
      this.API.one('listings/count').get().then((response) => {
        console.log(response);
        this.numItems = response.data.count;
      });
    };


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



class HomeComponentController{
    constructor($location, $mdDialog, $state, API, ToastService,$scope){
        'ngInject';

        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.API = API;
        this.ToastService = ToastService;
        this.$scope = $scope;


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
        var data = {
          list_id: listing.id
        }

        this.API.all('rents').post(data).then((response)=>{
          var vm = this;
          var rents = response.data.rents;

          var scope = angular.extend(this.$scope.$new(true), {
            rents: rents
          });

          var dialog = {
            controllerAs: 'vm',
            controller: RentDialogController,
            templateUrl: './views/app/components/home_component/rent.tmpl.html',
            //template:'<md-dialog flex="50"><rent-component listing="currentListing"></rent-component><md-dialog>',
            parent: angular.element(document.body),
            scope: scope,
            autoWrap:false,
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
          };

          this.$mdDialog.show(dialog)
          .then((range) => {
              console.log(range)
              var data = {
                start_date: range.start_date,
                end_date: range.end_date,
                user_id: vm.currentUser.id,
                listing_id:listing.id
              }


              this.API.all('rent').post(data).then(() => {
                  this.$state.go('app.landing', {}, {reload:true, inherit:false, notify:true});
                  this.ToastService.show('Owner contacted');
              });
          }, function() {

          });

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
    }

    getLength(){
      return this.numItems;
    }

    fetchPage_(pageNumber){

        // Set the page to null so we know it is already being fetched.
        this.loadedPages[pageNumber] = null;
        var vm = this;

        this.API.all('listings/').customGET("items",{page:pageNumber+1}).then((response) => {

            var listings = response.data;

            this.currentpage = response.current_page;

            this.loadedPages[pageNumber] = [];

            this.loadedPages[pageNumber] = listings;
        });



    }

    fetchNumItems_(){
      this.API.one('listings/count').get().then((response) => {
        console.log(response);
        this.numItems = response.data.count;
      });
    }


}

class RentDialogController{
    constructor($scope,$mdDialog, $filter){
        'ngInject';
        $scope.selectedDate = [];
        this.$mdDialog = $mdDialog;
        this.$scope = $scope;
        $scope.rangeString = "None selected";
        $scope.lastDate = new Date();

        //TODO: show already approved dates on calendar

        // for(var n in $scope.rents){
        //     var rent = $scope.rents[n];
        //     var event = {
        //                   title: rent.user.firstname +' '+ rent.user.lastname,
        //                   start: rent.start_date,
        //                   end: rent.end_date,
        //                   allDay: true
        //                 }
        //     $scope.events.push(event);
        // }

        $scope.dayClick = function(date) {
          //  $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
          //  console.log($scope.msg);

            //  var lastDateSelected = $scope.selectedDate[]

              if ($scope.lastDate>date) {
                $scope.selectedDate = [];
                $scope.selectedDate.push(date);
              }
              $scope.lastDate = date;
              $scope.rangeString = $scope.getDateRange();
         };

         //get date range
         $scope.getDateRange = ()=>{
           var length = $scope.selectedDate.length;
           $scope.range = {
             start_date:$filter("date")($scope.selectedDate[0], "MMM d"),
             end_date:$filter("date")($scope.selectedDate[length-1], "MMM d")
           }

           if(length===0){
            return "None selected"
           }

           return "From: " +  $scope.range.start_date +"th to: "+  $scope.range.end_date+"th";
         }
    }

    $onInit(){

    }



    hide() {
      this.$mdDialog.hide();
    }

    cancel() {
      this.$mdDialog.cancel();
    }

    rent(){
      this.$mdDialog.hide(this.$scope.range);
    }

}

export const HomeComponentComponent = {
    templateUrl: './views/app/components/home_component/home_component.component.html',
    controller: HomeComponentController,
    controllerAs: 'vm',
    bindings: {
        rents:'<rents',
        listings:'<listings',
        currentUser: '<currentUser'
    }
}

/**
 * @Author: eipex
 * @Date:   2017-04-26T09:25:11-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-29T02:55:55-05:00
 */



class HomeComponentController{
    constructor($location, $mdDialog, $mdSidenav, $state, API, ToastService,$scope, CourseService, ActivityService){
        'ngInject';

        this.$location = $location;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
        this.API = API;
        this.ToastService = ToastService;
        this.$scope = $scope;
        this.CourseService = CourseService;
        this.ActivityService = ActivityService;
        this.$mdSidenav = $mdSidenav;

        this.page = null;





    }

    $onInit(){
      this.$mdDialog.hide();
      //this.current_page = {content:'Please select a course :)'};

      this.course = this.courseRes.data.course
      this.activities = this.activitiesRes.data.activities

      //initialize based on user type
      this.user.type === 'Student'? this.studentInit() : this.instructorInit();

    }

    studentInit(){
      //if $location.hash() is not set get the page number from the activity
      if(this.$location.hash()===""){
        this.page_no = this.ActivityService.getPageNo(this.course, this.activities);
        this.page = this.course.pages[this.page_no];
        this.$location.hash(this.page_no)
      }else{
        //if it is set get the page_no from the $location.hash()
        this.page_no = this.$location.hash();
        this.page = this.course.pages[this.page_no]

      }
    }

    instructorInit(){

      this.CourseService.getCourses().then((response)=>{
        this.courses = response;
      })

      if(this.$location.hash()===""){
        this.page = this.course.pages[0];
        this.$location.hash(0);


      }else{
        //if it is set get the page_no from the $location.hash()
        this.page_no = this.$location.hash();
        this.page = this.course.pages[this.page_no]
      }
    }

    loadCourse(course){
      this.$state.go('app.landing',{course_id:course.id}, {reload:"app.landing"})
    }

    // showPage(course){
    //   this.course = course;
    //   this.CourseService.getPage(course).then((response)=>{
    //     this.current_page = response.data.page[0]
    //     this.$mdSidenav("main-sidenav")
    //    .toggle()
    //   });
    // }

    createPage(){
        this.$state.go('app.create_page', {});
    }

    previousPage(){
      var page_no = parseInt(this.$location.hash()) - 1;
      this.selectPage(page_no)
    }

    nextPage(){
      var page_no = parseInt(this.$location.hash()) + 1;
      this.selectPage(page_no)
    }

    selectPage(page_no){
      if(page_no < 0 || page_no > this.course.pages.length - 1){
        return;
      }

      this.page = this.course.pages[page_no];
      this.$location.hash(page_no);
    }

    islastPage(){
      return this.$location.hash() == this.course.pages.length - 1;
    }

    showDiscussion(){
      // $scope.alert = '';
      // $mdBottomSheet.show({
      //   templateUrl: 'bottom-sheet-list-template.html',
      //   controller: 'ListBottomSheetCtrl'
      // }).then(function(clickedItem) {
      //   $scope.alert = clickedItem['name'] + ' clicked!';
      // }).catch(function(error) {
      //   // User clicked outside or hit escape
      // });
    }
}

// class Listings {
//     constructor(API){
//       'ngIngect';
//
//       this.API = API;
//
//       this.loadedPages = {};
//
//       this.numItems = 0;
//
//       this.PAGE_SIZE = 10;
//
//       this.fetchNumItems_();
//     }
//
//     getItemAtIndex(index){
//        var pageNumber = Math.floor(index / this.PAGE_SIZE);
//        var page = this.loadedPages[pageNumber];
//
//        if (page) {
//          return page[index % this.PAGE_SIZE];
//        } else if (page !== null) {
//          this.fetchPage_(pageNumber);
//        }
//     }
//
//     getLength(){
//       return this.numItems;
//     }
//
//     fetchPage_(pageNumber){
//
//         // Set the page to null so we know it is already being fetched.
//         this.loadedPages[pageNumber] = null;
//         var vm = this;
//
//         this.API.all('listings/').customGET("items",{page:pageNumber+1}).then((response) => {
//
//             var listings = response.data;
//
//             this.currentpage = response.current_page;
//
//             this.loadedPages[pageNumber] = [];
//
//             this.loadedPages[pageNumber] = listings;
//         });
//
//
//
//     }
//
//     fetchNumItems_(){
//       this.API.one('listings/count').get().then((response) => {
//         console.log(response);
//         this.numItems = response.data.count;
//       });
//     }
//
//
// }

// class CreatePageDialogController{
//     constructor($scope,$mdDialog, $filter){
//         'ngInject';
//         $scope.selectedDate = [];
//         this.$mdDialog = $mdDialog;
//         this.$scope = $scope;
//         $scope.rangeString = "None selected";
//         $scope.lastDate = new Date();
//
//         //TODO: show already approved dates on calendar
//
//         // for(var n in $scope.rents){
//         //     var rent = $scope.rents[n];
//         //     var event = {
//         //                   title: rent.user.firstname +' '+ rent.user.lastname,
//         //                   start: rent.start_date,
//         //                   end: rent.end_date,
//         //                   allDay: true
//         //                 }
//         //     $scope.events.push(event);
//         // }
//
//         $scope.dayClick = function(date) {
//           //  $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
//           //  console.log($scope.msg);
//
//             //  var lastDateSelected = $scope.selectedDate[]
//
//               if ($scope.lastDate>date) {
//                 $scope.selectedDate = [];
//                 $scope.selectedDate.push(date);
//               }
//               $scope.lastDate = date;
//               $scope.rangeString = $scope.getDateRange();
//          };
//
//          //get date range
//          $scope.getDateRange = ()=>{
//            var length = $scope.selectedDate.length;
//            $scope.range = {
//              start_date:$filter("date")($scope.selectedDate[0], "MMM d"),
//              end_date:$filter("date")($scope.selectedDate[length-1], "MMM d")
//            }
//
//            if(length===0){
//             return "None selected"
//            }
//
//            return "From: " +  $scope.range.start_date +"th to: "+  $scope.range.end_date+"th";
//          }
//     }
//
//     $onInit(){
//
//     }
//
//
//
//     hide() {
//       this.$mdDialog.hide();
//     }
//
//     cancel() {
//       this.$mdDialog.cancel();
//     }
//
//     rent(){
//       this.$mdDialog.hide(this.$scope.range);
//     }
//
// }

export const HomeComponentComponent = {
    templateUrl: './views/app/components/home_component/home_component.component.html',
    controller: HomeComponentController,
    controllerAs: 'vm',
    bindings: {
        user: '<',
        courseRes: '<',
        activitiesRes: '<'
    }
}

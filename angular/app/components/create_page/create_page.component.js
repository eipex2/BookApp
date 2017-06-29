 /**
 * @Author: eipex
 * @Date:   2017-05-10T22:14:43-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-29T13:18:07-05:00
 */

 //actions for final dialog
 const VIEW_PAGE = "VIEW_PAGE";
 const CREATE_ANOTHER_PAGE = "CREATE_ANOTHER_PAGE";

/**
 * contains CreatePageController, CreatePageDialogController and PageConfirmationController
 */
class CreatePageController{
    constructor($state, $mdDialog, API, ToastService, CourseService, $localStorage, $interval){
        'ngInject';



        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.API = API;
        this.CourseService = CourseService;
        this.ToastService = ToastService;
        this.$localStorage = $localStorage;
        this.$interval = $interval;
        this.course = {title:'Course'};
    }

    $onInit(){

      //initialize page content from local storage
      this.activities = this.$localStorage.activies;
      if(this.activies === undefined){
        this.$localStorage.activies = [];
      }

      //this.page_content = this.$localStorage.page_content;

      this.showCourseDialog()
      this.CourseService.getCourses().then((response)=>{
        this.courses = response;
      })
    }

    /**
     * show course selection or creation dialog
     */
    showCourseDialog(){
      this.showingDialog = true;

      var pageDialog = {
        controllerAs: 'vm',
        controller: CreatePageDialogController,
        templateUrl: './views/app/components/create_page/course_dialog.tmpl.html',
        parent: angular.element(document.body),
        onShowing: ()=>{
          this.showingDialog = false;
        },
        autoWrap:false,
        fullscreen: false// Only for -xs, -sm breakpoints.
      };


      this.$mdDialog.show(pageDialog)
      .then((data) => {
        //save course if its new
          if(data.new){
            //saving the course
            this.CourseService.saveCourse(data).then((response)=>{
              this.course = response.data.course;
              this.ToastService.show('Course created');
            })
          }else{
            this.course = data;
          }


          //set intervals for auto save
          // this.$interval(() => {
          //     this.auto_save();
          // }, 100);//100000
      }, function() {

      });
    }

    save(){
      //create new page if it doesnt exist else update existing page
      // if(this.page){
      //   var page_no = parseInt(this.page.page_no)
      //   var update = true;
      // }else{
      //   var page_no = parseInt(this.course.last_page_no) + 1;
      //   var update = false;
      // }

      var data = {
        course_id:this.course.id,
        content: this.page_content,
      }

      return this.CourseService.savePage(data);
    }

    auto_save(){
      var activity = {
        course_id: this.course.id,
        page_no: this.page.page_no,
        page_content: this.page_content
      }

      console.log(activity);
      // this.$localStorage.activity[this.activities.length] = this.page_content;
      // this.ToastService.show("Page Saved");
      // this.save().then((response)=>{
      //
      //   this.page = response.data.page;
      // });
    }

    publish(){
     this.save().then(()=>{
       var dialog = {
         controllerAs: 'vm',
         controller: PageConfirmationController,
         templateUrl: './views/app/components/create_page/page_confirmation_dialog.tmpl.html',
         parent: angular.element(document.body),
         autoWrap:false,
         fullscreen: false// Only for -xs, -sm breakpoints.
       };

       this.$mdDialog.show(dialog)
       .then(() => {
           //view the page
           this.CourseService.loadCourse(this.course);
       }, () => {
           //create another page
           this.showCourseDialog()
       });
     })
    }


}

class CreatePageDialogController{
  constructor($state, $mdDialog, API, CourseService){
      'ngInject';

      this.$state = $state;
      this.$mdDialog = $mdDialog;
      this.API = API;

      this.subjects = this.loadSubjects();
      this.selected_subjects = [];

      CourseService.getCourses().then((response)=>{
        this.courses = response;

        //if no causes show no causes div
        if(this.courses.length === 0){
          this.no_courses_div = true;
        }else{
          this.no_courses_div = false;
        }
      });
  }

  edit_course(course){
    this.$mdDialog.hide(course);
  }

  /**
   * exit dialog and return to landing page
   */
  dialog_cancel(){
    this.$state.go('app.welcome')
    this.$mdDialog.cancel();
  }

  /**
   * exit dialog when done
   */
  dialog_done(){
    if(this.dialog_validate()){
        var subject = this.selected_subjects[0].name;
        console.log(subject);
        var data = {
          title: this.course_title,
          subject,
          new:true
        }
        this.$mdDialog.hide(data);
    }else{
      this.error = true;
    }
  }

  /**
   * validate dialog form
   */
  dialog_validate(){
    return this.course_title && this.selected_subjects.length !== 0;
  }

    /**
    * Search for contacts; use a random delay to simulate a remote call
    */
   querySearch (criteria) {
       return criteria ? this.subjects.filter(this.createFilterFor(criteria)) : [];
   }

   /***
    * Create filter function for a query string
    */
   createFilterFor(query) {
       var lowercaseQuery = angular.lowercase(query);

       return function filterFn(subject) {
           return (subject._lowername.indexOf(lowercaseQuery) != -1);
       };

   }

   newSubject(chip){
     return {
      name: 'house',
      image: '//www.gravatar.com/avatar/' + this.selected_subjects.length + '?s=50&d=retro'
    };
   }

   loadSubjects() {
       var subjects = [
           'Geography',
           'History',
           'Languages and literature',
           'Philosophy',
           'Theology',
           'Economics',
           'Law',
           'Political science',
           'Psychology',
           'Sociology',
           'Biology',
           'Chemistry',
           'Mathematics',
           'Physics',
           'Agriculture',
           'Computer science',
           'Engineering'

       ];

       return subjects.map(function (c, index) {
           var subject = {
               name: c,
               image: '//www.gravatar.com/avatar/' + index + '?s=50&d=retro'
           };

           subject._lowername = subject.name.toLowerCase();
           return subject;
       });
   }
}

class PageConfirmationController{
  constructor($state, $mdDialog){
      'ngInject';
      this.$mdDialog = $mdDialog;
      this.$state = $state;
  }

  create_page(){
    this.$mdDialog.cancel();
  }

  view_page(){
    this.$mdDialog.hide();
  }

}

export const CreatePageComponent = {
    templateUrl: './views/app/components/create_page/create_page.component.html',
    controller: CreatePageController,
    controllerAs: 'vm',
    bindings: {
      'user':'<'
    }
}

 /**
 * @Author: eipex
 * @Date:   2017-05-10T22:14:43-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-26T11:03:03-05:00
 */

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
      this.page_content = this.$localStorage.page_content;

      this.showCourseDialog()
      this.CourseService.getCourses().then((response)=>{
        this.courses = response;
      })


      this.$interval(() => {
          this.auto_save();
      }, 100000);


    }

    /**
     * show course selection or creation dialog
     */
    showCourseDialog(){
      this.showingDialog = true;

      var dialog2 = {
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

      this.$mdDialog.show(dialog2)
      .then((data) => {
          //is the user creating a new course
          if(data.new){
            this.CourseService.saveCourse(data).then((response)=>{
              this.course = response.data.course;
              this.ToastService.show('Course created');
            })
          }else{
            this.course = JSON.parse(data);
          }
      }, function() {

      });
    }

    save(){
      //create new page if it doesnt exist else update existing page
      if(this.page){
        var page_no = parseInt(this.page.page_no)
        var update = true;
      }else{
        var page_no = parseInt(this.course.last_page_no) + 1;
        var update = false;
      }

      var data = {
        course_id:this.course.id,
        page_no,
        content: this.page_content,
        update
      }

      return this.CourseService.savePage(data);
    }

    auto_save(){
      this.$localStorage.page_content = this.page_content;
      this.ToastService.show("Page Saved");
      // this.save().then((response)=>{
      //
      //   this.page = response.data.page;
      // });
    }

    done(){
     this.save().then(()=>{
       this.ToastService.show("Page Saved");
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

       }, function() {

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
      this.subjects = [
        'Math',
        'Science'
      ];

      CourseService.getCourses().then((response)=>{
        this.courses = response;
      });
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
      if(this.show_form){
        var data = {
          title: this.course_title,
          subject: this.course_subject,
          new: true
        }
        this.$mdDialog.hide(data);
      }else{
        this.$mdDialog.hide(this.course);
      }
    }else{
      this.error = true;
    }
  }

  /**
   * go back to course selection
   */
  dialog_goBack(){
    this.show_form = false;
  }

  /**
   * show new course creation form
   */
  new_course(){
    this.show_form = true;
  }

  /**
   * exit page creation form
   */
  exit(){
    this.$state.go('app.landing', {}, {reload:false, inherit:false, notify:true})
  }

  /**
   * validate dialog form
   */
  dialog_validate(){
    return this.course || (this.course_title && this.course_subject)? true : false;
  }
}

class PageConfirmationController{
  constructor($state, $mdDialog){
      'ngInject';
      this.$mdDialog = $mdDialog;
  }

  create_page(){
    this.$mdDialog.hide();
  }

  view_page(){
    this.$mdDialog.hide();
    this.$state.go('app.landing')
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

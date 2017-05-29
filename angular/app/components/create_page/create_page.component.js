/**
 * @Author: eipex
 * @Date:   2017-05-10T22:14:43-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-05-23T10:02:09-05:00
 */
class CreatePageController{
    constructor($state, $mdDialog, API, ToastService, CourseService){
        'ngInject';

        this.$state = $state;
        this.$mdDialog = $mdDialog;
        this.API = API;
        this.CourseService = CourseService;
        this.ToastService = ToastService;
        this.course = {title:'Course'};
    }

    $onInit(){
      this.showCourseDialog()
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
     var data = {
       course_id:this.course.id,
       page_no: parseInt(this.course.last_page_no) + 1,
       content: this.page_content
     }
     console.log(this.course);
     this.CourseService.savePage(data).then(()=>{
       this.ToastService.show("Page Saved");
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
        this.courses = response.data.courses;
      });
  }

  /**
   * exit dialog and return to landing page
   */
  dialog_cancel(){
    this.$state.go('app.landing', {}, {reload:false, inherit:false, notify:true})
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

export const CreatePageComponent = {
    templateUrl: './views/app/components/create_page/create_page.component.html',
    controller: CreatePageController,
    controllerAs: 'vm',
    bindings: {}
}

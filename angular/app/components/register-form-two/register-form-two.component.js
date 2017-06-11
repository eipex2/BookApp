/**
 * @Author: eipex
 * @Date:   2017-05-27T21:46:13-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-11T09:55:23-05:00
 */



class RegisterFormTwoController{
    constructor(UserService, $state){
        'ngInject';

        this.UserService = UserService;
        this.$state = $state;

        this.show_form = true;
        this.show_review = false;
        this.step_one = true;
        this.step_two = false;
        this.step_three = false;
        this.step_four = false;
        this.show_undo = false;
        this.user_last_input = "";

        this.edit_user_type = false;
        this.edit_user_sex = false;
        this.edit_user_dob = false;
        this.edit_user_school = false;
    }

    $onInit(){

    }

    show_step(step){
      switch (step) {
        case 'two':
          this.step_one = false;
          this.step_two = true;
          this.show_undo = true;
          this.user_last_input = this.user_type;
          break;
        case 'three':
          this.step_two = false;
          this.step_three = true;
          this.show_undo = true;
          this.user_last_input = this.user_sex;
          break;
        case 'four':
          this.step_three = false;
          this.step_four = true;
          this.show_undo = true;
          this.user_last_input = this.user_dob;
          break;
        case 'review':
          this.show_form = false;
          this.show_review = true;
          break;
        default:

      }
    }

    edit(step){
      switch (step) {
        case 'type':
          this.edit_user_type = true;
          this.user_type = "";
          break;
        case 'sex':
          this.edit_user_sex = true;
          this.user_sex = "";
          break;
        case 'dob':
          this.edit_user_dob = true;
          this.user_dob = "";
          break;
        case 'school':
          this.edit_user_school = true;
          this.user_school = "";
          break;
        default:

      }
    }

    show(step){
      switch (step) {
        case 'type':
          this.edit_user_type = false;
          break;
        case 'sex':
          this.edit_user_sex = false;
          break;
        case 'dob':
          this.edit_user_dob = false;
          break;
        case 'school':
          this.edit_user_school = false;
          break;
        default:

      }
    }

    undo(){
      if(this.step_two){
        this.step_one = true;
        this.step_two = false;
        this.show_undo = false;
        this.user_type = "";
      }else if(this.step_three){
        this.step_two = true;
        this.step_three = false;
        this.user_last_input = this.user_type;
        this.user_sex = "";
      }else if(this.step_four){
        this.step_three = true;
        this.step_four = false;
        this.user_last_input = this.user_sex;
        this.user_dob = "";
      }
    }

    done(){
      var data = {
        'type' : this.user_type,
        'sex' : this.user_sex,
        'dob' : this.user_dob,
        'school' : this.user_school
      }
      this.UserService.updateProfile(data);
    }







}

export const RegisterFormTwoComponent = {
    templateUrl: './views/app/components/register-form-two/register-form-two.component.html',
    controller: RegisterFormTwoController,
    controllerAs: 'vm',
    bindings: {
        user: '<user'
    }
}

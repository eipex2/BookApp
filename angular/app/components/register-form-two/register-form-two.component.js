/**
 * @Author: eipex
 * @Date:   2017-05-27T21:46:13-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-05-29T10:19:52-05:00
 */



class RegisterFormTwoController{
    constructor(){
        'ngInject';

        this.step_one = true;
        this.step_two = false;
        this.step_three = false;
        this.step_four = false;
        this.show_undo = false;
    }

    $onInit(){

    }

    show_step_two(){
      this.step_one = false;
      this.step_two = true;
      this.show_undo = true;
    }

    show_step_three(){
      this.step_two = false;
      this.step_three = true;
      this.show_undo = true;
    }

    show_step_four(){
      this.step_three = false;
      this.step_four = true;
      this.show_undo = true;
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
        this.user_sex = "";
      }else if(this.step_four){
        this.step_three = true;
        this.step_four = false;
        this.user_dob = "";
      }
    }




}

export const RegisterFormTwoComponent = {
    templateUrl: './views/app/components/register-form-two/register-form-two.component.html',
    controller: RegisterFormTwoController,
    controllerAs: 'vm',
    bindings: {}
}

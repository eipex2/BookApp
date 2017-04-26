/**
 * @Author: eipex
 * @Date:   2017-03-11T14:56:01-06:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-26T01:13:13-05:00
 */



class LoginFormController {
	constructor($auth, ToastService, $state, $location, UserService) {
		'ngInject';

		this.$auth = $auth;
		this.ToastService = ToastService;
		this.$state = $state;
		this.$location = $location;
		this.UserService = UserService;
	}

    $onInit(){
			this.user = {
				email: '',
				password: ''
			}
    }

	/**
	 * log in user
	 */
	login() {
		let user = {
			email: this.email,
			password: this.password
		};
		this.UserService.login(user)
	}

	/**
	 * go to signup page
	 */
	signUp(){
		this.$state.go('app.register', {}, {reload:true, inherit:false, notify:true});
	}

	/**
	 * go to forgot password page
	 */
	forgotPassword(){
		this.$state.go('app.forgot_password', {}, {reload:true, inherit:false, notify:true});
	}
}

export const LoginFormComponent = {
	templateUrl: './views/app/components/login-form/login-form.component.html',
	controller: LoginFormController,
	controllerAs: 'vm',
	bindings: {}
}

/**
 * @Author: eipex
 * @Date:   2017-04-26T09:25:11-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-05T22:42:40-05:00
 */



class RegisterFormController {
	constructor($auth, ToastService, $location, $state, UserService) {
		'ngInject';

		this.$auth = $auth;
		this.ToastService = ToastService;
		this.$location = $location;
		this.$state = $state;
		this.UserService = UserService;
	}

    $onInit(){
        this.firstname = '';
				this.lastname = '';
        this.email = '';
        this.password = '';
				this.school = '';
    }

	register() {
		let user = {
			firstname: this.firstname,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			school: this.school
		};

		this.$auth.signup(user)
			.then((response) => {
				//remove this if you require email verification
				this.$auth.setToken(response.data);
				this.UserService.getUser().then((response)=>{
					this.UserService.user = response
				})
				this.ToastService.show('Successfully registered.');
				this.$state.go('app.welcome');
			})
			.catch(this.failedRegistration.bind(this));
	}

	login(){
		this.$state.go('app.login', {}, {reload:true, inherit:false, notify:true});
	}

	failedRegistration(response) {
		if (response.status === 422) {
			for (let error in response.data.errors) {
				return this.ToastService.error(response.data.errors[error][0]);
			}
		}
		this.ToastService.error(response.statusText);
	}
}

export const RegisterFormComponent = {
	templateUrl: './views/app/components/register-form/register-form.component.html',
	controller: RegisterFormController,
	controllerAs: 'vm',
	bindings: {}
}

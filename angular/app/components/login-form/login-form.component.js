class LoginFormController {
	constructor($auth, ToastService, $state, $location) {
		'ngInject';

		this.$auth = $auth;
		this.ToastService = ToastService;
		this.$state = $state;
		this.$location = $location;
	}

    $onInit(){
			this.user = {
				email: '',
				password: ''
			}
    }

	login() {
		let user = {
			email: this.email,
			password: this.password
		};

		this.$auth.login(user)
			.then((response) => {
				this.$auth.setToken(response.data);

				this.ToastService.show('Logged in successfully.');
				this.$state.go('app.landing', {}, {reload:true, inherit:false, notify:true});
			})
			.catch(this.failedLogin.bind(this));
	}

	signUp(){
		this.$state.go('app.register', {}, {reload:true, inherit:false, notify:true});
	}

	forgotPassword(){
		this.$state.go('app.forgot_password', {}, {reload:true, inherit:false, notify:true});
	}

	failedLogin(response) {
		if (response.status === 422) {
			for (let error in response.data.errors) {
				return this.ToastService.error(response.data.errors[error][0]);
			}
		}
		this.ToastService.error(response.statusText);
	}
}

export const LoginFormComponent = {
	templateUrl: './views/app/components/login-form/login-form.component.html',
	controller: LoginFormController,
	controllerAs: 'vm',
	bindings: {}
}

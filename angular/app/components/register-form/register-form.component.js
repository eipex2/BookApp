class RegisterFormController {
	constructor($auth, ToastService, $location, $state) {
		'ngInject';

		this.$auth = $auth;
		this.ToastService = ToastService;
		this.$location = $location;
		this.$state = $state;
	}

    $onInit(){
        this.firstname = '';
		this.lastname = '';
        this.email = '';
        this.password = '';
		this.university = '';
    }

	register() {
		let user = {
			firstname: this.firstname,
			lastname: this.lastname,
			email: this.email,
			password: this.password,
			university: this.university
		};

		this.$auth.signup(user)
			.then((response) => {
				//remove this if you require email verification
				this.$auth.setToken(response.data);

				this.ToastService.show('Successfully registered.');
				this.$location.path('/');
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

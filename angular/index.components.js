import {RentComponentComponent} from './app/components/rent_component/rent_component.component';
import {MessageBoxComponent} from './app/components/message-box/message-box.component';
import {ChatComponent} from './app/components/chat/chat.component';
import {ListingViewComponent} from './app/components/listing_view/listing_view.component';
import {ProfileViewComponent} from './app/components/profile_view/profile_view.component';
import {AddBookWizardComponent} from './app/components/add-book-wizard/add-book-wizard.component';
// import {ToolbarComponent} from './app/components/toolbar/toolbar.component';
import {HomeComponentComponent} from './app/components/home_component/home_component.component';
import {AppHeaderComponent} from './app/components/app-header/app-header.component';
import {AppRootComponent} from './app/components/app-root/app-root.component';
import {AppShellComponent} from './app/components/app-shell/app-shell.component';
import {ResetPasswordComponent} from './app/components/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './app/components/forgot-password/forgot-password.component';
import {LoginFormComponent} from './app/components/login-form/login-form.component';
import {RegisterFormComponent} from './app/components/register-form/register-form.component';

angular.module('app.components')
	.component('rentComponent', RentComponentComponent)
	.component('messageBox', MessageBoxComponent)
	.component('chat', ChatComponent)
	.component('listingView', ListingViewComponent)
	.component('profileView', ProfileViewComponent)
	.component('addBookWizard', AddBookWizardComponent)
	// .component('toolbar', ToolbarComponent)
	.component('homeComponent', HomeComponentComponent)
	.component('appHeader', AppHeaderComponent)
	.component('appRoot', AppRootComponent)
	.component('appShell', AppShellComponent)
	.component('resetPassword', ResetPasswordComponent)
	.component('forgotPassword', ForgotPasswordComponent)
	.component('loginForm', LoginFormComponent)
	.component('registerForm', RegisterFormComponent);

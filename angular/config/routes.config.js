export function RoutesConfig($stateProvider, $urlRouterProvider) {
	'ngInject';

	let getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
	};

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('app', {
			abstract: true,
            data: {auth:true},
			views: {
				'toolbar@' :{
					component: "appHeader",
					bindings:{user: 'user'}
				}
			},
			resolve:{
				user: function(API, $auth){
					return $auth.isAuthenticated()? API.one('user').get() : {};
				}
			}//{auth: true} would require JWT auth
		})
		.state('app.landing', {
		url: '/',
		data: {auth:false},
		views: {
			'main@' : {
				component: "homeComponent",
				bindings: {
						listings: 'listings',
						currentUser: 'user'
					}
			}
		},
		resolve: {
				listings: function (API){
					return  API.all('listings').getList();
				},
				currentUser: function(user){
					return user;
				}
			}
		})
		.state('app.login', {
			url: '/login',
			data: {auth:false},
			views: {
				'main@': {
					component: "loginForm"
				}
			}
		})
		.state('app.register', {
			url: '/register',
			data: {auth:false},
			views: {
				'main@': {
					templateUrl: getView('register')
				}
			}
		})
		.state('app.forgot_password', {
			url: '/forgot-password',
			data: {auth:false},
			views: {
				'main@': {
					templateUrl: getView('forgot-password')
				}
			}
		})
		.state('app.reset_password', {
			url: '/reset-password/:email/:token',
			data: {auth:false},
			views: {
				'main@': {
					templateUrl: getView('reset-password')
				}
			}
		})
		.state('app.listings',{
			url:'/listings/{id}',
			data: {auth:false},
			views:{
				'main@' : {
					component: "listingView",
					bindings: {
						listing:'listing',
						user: 'user'
					}
				}
			},
			resolve: {
				listing: function (API, $stateParams) {
						return API.one('listings',$stateParams.id).get();
				},
				currentUser :function(user){
					return user;
				}
			}
		})
		.state('app.profile', {
			url:'/profile/{id}',
			data:{auth:false},
			views:{
				'main@' : {
					component: "profileView",
					bindings:{
						userp: 'userp',
						currentUser: 'user'
					}
				}
			},
			resolve: {
				userp: function(API, $stateParams){
					return API.one('profile', $stateParams.id).get();
				},
				currentUser: function(user){
					return user;
				}
			}
		});

}

/**
 * @Author: eipex
 * @Date:   2017-03-29T07:32:32-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-05-27T21:51:27-05:00
 */



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
			},
			resolve:{
			}
		})
		.state('app.landing', {
		url: '/',
		data: {auth:true},
		views: {
			'main@' : {
				component: "homeComponent",
				bindings: {
						user: 'user'
					}
			}
		},
		resolve: {
				user: function(UserService){
					return UserService.getUser();
				}
			}
		})
		.state('app.login', {
			url: '/login',
			data: {auth:false},
			views: {
				'toolbar@':{},
				'main@': {
					component: "loginForm"
				}
			}
		})
		.state('app.register', {
			url: '/register',
			data: {auth:false},
			views: {
				'toolbar@':{},
				'main@': {
					templateUrl: getView('register')
				}
			}
		})
		.state('app.register-profile', {
			url: '/register-profile',
			data: {auth:true},
			views: {
				'toolbar@':{},
				'main@': {
					component: "registerFormTwo"
				}
			}
		})
		.state('app.forgot_password', {
			url: '/forgot-password',
			data: {auth:false},
			views: {
				'toolbar@':{},
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
		// .state('app.listings',{
		// 	url:'/listings/{id}',
		// 	data: {auth:false},
		// 	views:{
		// 		'main@' : {
		// 			component: "listingView",
		// 			bindings: {
		// 				listing:'listing',
		// 				user: 'user'
		// 			}
		// 		}
		// 	},
		// 	resolve: {
		// 		listing: function (API, $stateParams) {
		// 				return API.one('listings',$stateParams.id).get();
		// 		},
		// 		currentUser :function(user){
		// 			return user;
		// 		}
		// 	}
		//})
		.state('app.profile', {
			url:'/profile/{id}',
			data:{auth:true},
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
		})
		// .state('app.add_book', {
		// 	url:'/add-book',
		// 	data:{auth:true},
		// 	views:{
		// 		'main@' : {
		// 			component: "addBookWizard",
		// 			bindings:{
		//
		// 			}
		// 		}
		// 	}
		// })
		.state('app.chat', {
			url:'/chat',
			data:{auth:true},
			params:{
				id:null
			},
			views:{
				'main@' : {
					component: "chat",
					bindings:{
						activeConvo: 'activeConvo',
						convo:'messages',
						currentUser:'currentUser'
					}
				}
			},
			resolve:{
				activeConvo: function(API, $stateParams){
					return $stateParams.id;
				},
				conversations:function(ChatService){
						return ChatService.getConversations();
				},
				currentUser :function(user){
					return user;
				}
			}
		})
		.state('app.create_page', {
			url:'/create',
			data:{auth:true},
			params:{
				id:null
			},
			views:{
				'main@' : {
					component: "createPage",
					bindings:{
							user:'user'
					}
				}
			},
			resolve:{
				user :function(UserService){
					return UserService.user;
				}
			}
		});

}

/**
 * @Author: eipex
 * @Date:   2017-03-29T07:32:32-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-07T11:09:42-05:00
 */



export function RoutesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
	'ngInject';

	let getView = (viewName) => {
		return `./views/app/pages/${viewName}/${viewName}.page.html`;
	};

	$urlRouterProvider.otherwise('/app');

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
		url: '/app/course/{course_id}',
		data: {auth:true},
		params:{
			course_id:null
		},
		views: {
			'main@' : {
				component: "homeComponent"
			}
		},
		resolve: {
				user: function(UserService){
					return UserService.getUser();
				},
				courseRes:function(CourseService,$stateParams){
					return CourseService.getCourse($stateParams.course_id)
				},
				activitiesRes:function(ActivityService, $stateParams){
					return ActivityService.getActivities($stateParams.course_id)
				}
			}
		})
		.state('app.login', {
			url: '/app/login',
			data: {auth:false},
			views: {
				'toolbar@':{},
				'main@': {
					component: "loginForm"
				}
			}
		})
		.state('app.register', {
			url: '/app/register',
			data: {auth:false},
			views: {
				'toolbar@':{},
				'main@': {
					templateUrl: getView('register')
				}
			}
		})
		// .state('app.edit-profile', {
		// 	url: '/app/edit-profile',
		// 	data: {auth:true},
		// 	views: {
		// 		'toolbar@':{},
		// 		'main@': {
		// 			component: "registerFormTwo"
		// 		}
		// 	}
		// })
		.state('app.forgot_password', {
			url: '/app/forgot-password',
			data: {auth:false},
			views: {
				'toolbar@':{},
				'main@': {
					templateUrl: getView('forgot-password')
				}
			}
		})
		.state('app.reset_password', {
			url: '/app/reset-password/:email/:token',
			data: {auth:false},
			views: {
				'main@': {
					templateUrl: getView('reset-password')
				}
			}
		})
		/**
		 * /welcome route for instructor user
		 * The first view an instructor sees when they login
		 * @type {String}
		 */
		.state('app.welcome',{
			url:'/app/welcome',
			data:{auth:true},
			views:{
				'main@':{
					component:"welcome"
				}
			},
			resolve:{
				user: function(UserService){
					return UserService.getUser();
				},
				channels:function(ChannelService){
					return ChannelService.getChannels();
				}
			}
		})
		.state('app.channel', {
			url:'/app/channel/{id}',
			data:{auth:true},
			views:{
				'main@' : {
					component: "channelView"
				}
			},
			resolve: {
				channelRes:function(ChannelService,$stateParams){
					return ChannelService.getChannel($stateParams.id)
				},
				// channelRes: function(API, $stateParams){
				// 	return API.one('channel', $stateParams.id).get();
				// },
				user: function(UserService){
					return UserService.getUser();
				}
			}
		})
		/**
		 * /filter route for student user
		 * The first view the student sees when they login
		 * @type {String}
		 */
		.state('app.filter',{
			url:'/app/filter',
			data:{auth:true},
			views:{
				'main@':{
					component:"filter"
				}
			},
			resolve:{
				user:function(UserService){
					return UserService.getUser();
				},
				courses:function(CourseService){
					return CourseService.getOfferedCourses();
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
			url:'/app/profile/{id}',
			data:{auth:true},
			views:{
				'main@' : {
					component: "profileView"
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
		// .state('app.chat', {
		// 	url:'/app/chat',
		// 	data:{auth:true},
		// 	params:{
		// 		id:null
		// 	},
		// 	views:{
		// 		'main@' : {
		// 			component: "chat"
		// 		}
		// 	},
		// 	resolve:{
		// 		// activeConvo: function(API, $stateParams){
		// 		// 	return $stateParams.id;
		// 		// },
		// 		// conversations:function(ChatService){
		// 		// 		return ChatService.getConversations();
		// 		// },
		// 		// currentUser :function(user){
		// 		// 	return user;
		// 		// }
		// 	}
		// })
		.state('app.create_page', {
			url:'/app/create',
			data:{auth:true},
			views:{
				'main@' : {
					component: "createPage"
				}
			},
			resolve:{
				user :function(UserService){
					return UserService.getUser();
				}
			}
		});

		// use the HTML5 History API
    $locationProvider.html5Mode(true);

}

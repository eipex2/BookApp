/**
 * @Author: eipex
 * @Date:   2017-05-29T11:13:23-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-14T23:11:32-05:00
 */



import {SubscriptionService} from './services/subscription.service';
import {ChannelService} from './services/channel.service';
import {ActivityService} from './services/activity.service';
import {CourseService} from './services/course.service';
import {ChannelManagerService} from './services/channel_manager.service';
import {UserService} from './services/user.service';
import {ChatService} from './services/chat.service';
import {APIService} from './services/API.service';
import {DialogService} from './services/dialog.service';
import {ToastService} from './services/toast.service';

angular.module('app.services')
	.service('SubscriptionService', SubscriptionService)
	.service('ChannelService', ChannelService)
	.service('ActivityService', ActivityService)
	.service('CourseService', CourseService)
	.service('ChannelManagerService', ChannelManagerService)
	.service('UserService', UserService)
	.service('ChatService', ChatService)
	.service('API', APIService)
	.service('DialogService', DialogService)
	.service('ToastService', ToastService)

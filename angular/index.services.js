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
	.service('ChannelService', ChannelService)
	.service('ActivityService', ActivityService)
	.service('CourseService', CourseService)
	.service('ChannelManagerService', ChannelManagerService)
	.service('UserService', UserService)
	.service('ChatService', ChatService)
	.service('API', APIService)
	.service('DialogService', DialogService)
	.service('ToastService', ToastService)

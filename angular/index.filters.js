/**
 * @Author: eipex
 * @Date:   2016-12-01T13:46:23-06:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-04-25T21:41:52-05:00
 */



import {AvatarFilter} from './filters/avatar.filter';
import {UsernameFilter} from './filters/username.filter';
import {ConvoUsernameFilter} from './filters/convo_username.filter';
import {TimeSinceFilter} from './filters/time_since.filter';
import {CapitalizeFilter} from './filters/capitalize.filter';
import {HumanReadableFilter} from './filters/human_readable.filter';
import {TruncatCharactersFilter} from './filters/truncate_characters.filter';
import {TruncateWordsFilter} from './filters/truncate_words.filter';
import {TrustHtmlFilter} from './filters/trust_html.filter';
import {UcFirstFilter} from './filters/ucfirst.filter';

angular.module('app.filters')
	.filter('userAvatar', AvatarFilter)
	.filter('username', UsernameFilter)
	.filter('convoUsername', ConvoUsernameFilter)
	.filter('timeSince', TimeSinceFilter)
	.filter('capitalize', CapitalizeFilter)
	.filter('humanReadable', HumanReadableFilter)
	.filter('truncateCharacters', TruncatCharactersFilter)
	.filter('truncateWords', TruncateWordsFilter)
	.filter('trustHtml', TrustHtmlFilter)
	.filter('ucfirst', UcFirstFilter);

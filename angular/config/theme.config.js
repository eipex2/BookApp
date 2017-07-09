/**
 * @Author: eipex
 * @Date:   2017-04-26T09:25:11-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-07-07T00:17:34-05:00
 */



export function ThemeConfig($mdThemingProvider) {
	'ngInject';
	/* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
	$mdThemingProvider.theme('default')
		.primaryPalette('teal', {
            default: '600'
        })
		.accentPalette('grey')
		.warnPalette('red');

    $mdThemingProvider.theme('warn');
}

/**
 * @Author: eipex
 * @Date:   2017-03-29T07:32:32-05:00
 * @Last modified by:   eipex
 * @Last modified time: 2017-06-05T09:38:00-05:00
 */



export function RoutesRun($state, $transitions, $auth) {
    'ngInject';

    let requiresAuthCriteria = {
        to: ($state) => $state.data && $state.data.auth
    };

    let redirectToLogin = () => {
        'ngInject';
        if (!$auth.isAuthenticated()) {
            return $state.target('app.login', undefined, {location: false});
        }
    };

    // let redirectToRegisterProfile = () => {
    //   'ngInject';
    //   return false;
    // };

    $transitions.onBefore(requiresAuthCriteria, redirectToLogin, {priority:10});

}

import Controller from '@ember/controller';
import { observes, check } from 'app-mobile/utils';
import { inject as service } from '@ember/service';

export default Controller.extend({
    login: service(),
    queryParams: ['popLogin', 'isSignUp'],
    popLogin: '',
    isSignUp: '',
    @observes('popLogin')
    isPopLogin() {
        let { popLogin, login } = this.getProperties(['popLogin', 'login']);
        if (popLogin) {
            login.popLogin();
        } else {
            login.closeLogin();
        }
    },
    @observes('isSignUp')
    isSignUpChanged() {
        this.set('login.isSignUp', this.get('isSignUp'));
    }
});

import Component from '@ember/component';
import { on, check, computed, alias } from 'app-mobile/utils';
import { inject as service } from '@ember/service';

export default Component.extend({
    login: service(),
    @alias('login.isSignUp') isSignUp: '',
    @alias('login.remainSeconds') remainSeconds: 0,
    loginWay: 'password',
    @computed('login.remainSeconds')
    get getCodeText() {
        let remainSeconds = this.get('remainSeconds');
        return remainSeconds ? `剩余${remainSeconds}秒可再发送` : '发送验证码';
    },
    @computed('loginWay')
    get loginWayText() { 
        let loginWay = this.get('loginWay');
        switch(loginWay) {
            case 'password':
            return '短信快捷登录';
            case 'code':
            default:
            return '账号密码登录';
        }
    },
    classNames: 'login-screen',
    @on('didInsertElement')
    async domInsert() {
        await check(() => f7App);
        let login =  f7App.loginScreen.create({ 
            el: `#${this.get('elementId')}`
        });
        this.set('loginScreen', login);
        this.set('login.loginScreen', login);
    },
    actions: {
        changeLoginWay(way) {
            this.set('loginWay', way === 'password' ? 'code' : 'password');
        },
        toggleSignUp() {
            this.toggleProperty('isSignUp');
        }
    }
});

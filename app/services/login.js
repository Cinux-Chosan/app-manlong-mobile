import Service from '@ember/service';
import { on, check } from 'app-mobile/utils';
import { later } from '@ember/runloop';

export default Service.extend({
    remainSeconds: 0,
    isLoggedIn: false,
    userInfo: '',
    isSignUp: false,
    @on('init') 
    loginInit() {
        // 检查是否登录
        this.set('userInfo', {}); // 或者从cookie取
    },
    async popLogin() {
        let loginScreen;
        await check(() => f7App);
        await check(() => loginScreen = this.get('loginScreen'));
        loginScreen.open();
    },
    closeLogin() {
        this.get('loginScreen').close();
    },
    getCode() {
        // 发送验证码
        let account = this.get('userInfo.account');
        if (account) {
            f7App.toast.create({
                text: '验证码发送成功!',
                position: 'center',
                closeTimeout: 2000,
            }).open();
            // 倒计时
            let total = 59;
            this.set('remainSeconds', total);
            let intervalId = setInterval(() => {
                total ? this.set('remainSeconds', --total) : clearInterval(intervalId);
            }, 1000);
        } else {
            f7App.dialog.alert('', '请输入手机号/邮箱');
        }
    },
    signIn() {
        // 登录逻辑
        // let userinfo = this.get('userInfo');
        // 检查用户输入是否合格
        f7App.dialog.progress('登录中...');
        later(() => f7App.dialog.close(), 5000);
    },
    signUp() {
        // 注册逻辑
        // let userinfo = this.get('userInfo');
        // 检查用户输入是否合格

        f7App.dialog.progress('正在完成注册...');
        later(() => f7App.dialog.close(), 5000);
     }
});

<template>
    <div class="login-wrap">
        <div class="ms-title">Uenpay Test</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password"
                        placeholder="请输入密码"
                        v-model="ruleForm.password"
                        @keyup.enter.native="submitForm('ruleForm')">
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" :loading="isLogin" @click="submitForm('ruleForm')" ref="loginbtn">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;color:#999;">Tips : 按回车键即可登录欧。</p>
            </el-form>

        </div>
        <div class="footer-wrap">Copyright © 2019 ShengYiJun</div>
    </div>

</template>

<script>
    import myStorage from '@/utils/myStorage';
    export default {
        data: function(){
            return {
                isLogin: false,
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
            document.onkeydown = (event) => {
                var e = event || window.event;
                if (e && e.keyCode == 13) { //回车键的键值为13
                    console.log( this.submitForm('ruleForm'));
                    this.submitForm('ruleForm');
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post({
                            // url: '/login/',
                            url: '/auth/login/',
                            data: this.ruleForm
                        }).then(res => {
                            if (res['data'])
                            console.log(res);
                            localStorage.setItem('token', res['data']['data']['token']);
                            localStorage.setItem('username', res['data']['data']['username']);
                            // localStorage.setItem('username', res['data']['data']['password']); //存入浏览器账号不用每次都输入
                            this.$router.push('/index');
                            this.$message({
                                type: 'success',
                                message: '操作成功!'

                            });
                            // console.log(res['data']['data']['accessToken']);

                            sessionStorage.setItem('username', res['data']['data']['username']);
                        }).catch(error => {
                            console.log(666666);
                            console.log(error);
                            this.$message({
                                type: 'error',
                                message: '账号或密码不正确，请确认!',

                            });
                        });
                    }
                    else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background: url("~@/assets/op1.jpg") 100% 100%;
        background-position: center center;
    }
    .footer-wrap{
        position: absolute;
        color: #fff;
        bottom: 10px;
        text-align: center;
        width: 100%;
    }
    .ms-title{
        position: absolute;
        top:30%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:30%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>

<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
        </div>
        <div class="logo show-sm">Uenpay Test</div>
        <div class="header-right">
            <div class="header-user-con">
                <el-dropdown class="user-name" trigger="click" @command="handleTheme">
                    <span class="el-dropdown-link">
                        更换主题 <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="dark">默认主题</el-dropdown-item>
                        <el-dropdown-item divided command="green">浅绿色主题</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button class="loginBtn" @click="login" v-if="userName === ''" type="primary">登录</el-button>
                <!-- 用户名下拉菜单 -->
                <el-dropdown v-else class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userName}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <!-- <a href="javascript:void(0);" target="_blank">
                            <el-dropdown-item>修改密码</el-dropdown-item>
                        </a> -->
                        <el-dropdown-item command="loginout">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import bus from './bus';
    import myStorage from '@/utils/myStorage';
    export default {
        data() {
            return {
                collapse: false,
                fullscreen: false,
                userName: ''
            }
        },
        created() {
            this.userName = sessionStorage.getItem('username');
        },
        methods:{
            login() {
                window.location.href = this.$http.baseUrl + '/login';
            },
            // 更换主题
            handleTheme(command){
                if (command === 'dark' && myStorage.getItem('theme') === 'green') {
                   myStorage.setItem('theme', 'dark');
                   window.location.reload();
                }
                if (command === 'green' && myStorage.getItem('theme') !== 'green'){
                    myStorage.setItem('theme', 'green');
                    window.location.reload();
                }
            },
            // 用户名下拉菜单选择事件
            handleCommand(command) {
                // 注销登录，移除先关缓存
                if(command === 'loginout'){
                    // localstorge.clear();
                    localStorage.removeItem('token');
                    // cookie.delCookie('token');
                    // cookie.delCookie('name');
                    //重新触发store
                    //更新store数据
                    // this.$store.dispatch('setInfo');
                    this.$router.push('/login');
                    window.location.href = this.$http.baseUrl + '/loginout';
                }
            },
            // 侧边栏折叠
            collapseChage(){
                this.collapse = !this.collapse;
                bus.$emit('collapse', this.collapse);
            },
            // 全屏事件
            handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            }
        },
        mounted(){
            if(document.body.clientWidth < 1500){
                this.collapseChage();
            }
        }
    }
</script>
<style scoped>
    .loginBtn{
        margin: 0 15px;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell, .btn-fullscreen{
        position: relative;
        width: 30px;
        height: 30px;
        text-align: center;
        border-radius: 15px;
        cursor: pointer;
    }
    .btn-bell-badge{
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
    }
    .el-dropdown-link:hover{
        cursor: pointer;
    }
</style>

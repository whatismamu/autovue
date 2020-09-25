<template>
    <div class="wrapper">
        <v-head :userName="userName" ></v-head>
        <v-sidebar ref="mySidebar" :menu="menuData"></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse, 'leftZero': leftZero}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
            </div>
            <div class="footer-wrap copyright">
                Copyright © 2019 ShengYiJun
            </div>
        </div>
    </div>
</template>

<script>
    import vHead from '@/components/Header.vue';
    import vSidebar from '@/components/Sidebar.vue';
    import vTags from '@/components/Tags.vue';
    import bus from '@/components/bus';
    import myStorage from '@/utils/myStorage';
    export default {
        data(){
            return {
                tagsList: [],
                collapse: false,
                leftZero: false,
                menuData: [],
                userName: ''
            }
        },
        components:{
            vHead,
            vSidebar,
            vTags
        },
        created(){
            console.log(this.tagsList);
            let self = this;
            self.resetPage();
            window.onresize=function(){
                self.resetPage();
            }
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            
            // this.initMenuData();  根据权限登录时候生成目录，测试平台不需要

            // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
            bus.$on('tags', msg => {
                let arr = [];
                console.log(msg);
                for(let i = 0, len = msg.length; i < len; i ++){
                    msg[i].name && arr.push(msg[i].name);
                }
                this.tagsList = arr;
            });
            console.log(this.tagsList);
        },
        methods: {
            initMenuData(){
                this.$http.post({
                    // url: 'goods'  //首页跳转取消
                }).then(res => {
                    console.log(res);
                    this.userName = res.data.result.empNo;
                    this.menuData = res.data.result.manageMenuList;
                    if (res.data.result.role === 'ROLE_USER') {
                        this.permissionList();
                    }
                }).catch(error => {
                    console.log(error);
                });
            },
            permissionList() {
                this.$http.post({
                    url: 'wfbs-console/main/selectUserPermissionList'
                }).then(res => {
                    console.log(res);
                    myStorage.setItem('permission', JSON.stringify({ list: res.data.result.permissionUrls }));
                }).catch(error => {
                    console.log(error);
                });
            },
            resetPage(){
                if(document.body.clientWidth < 768){
                    bus.$emit('collapse', true);
                    this.leftZero = true;
                } else {
                    this.leftZero = false;
                }
            }
        },
        watch:{
            collapse(){
                if(this.collapse) {
                    this.resetPage();
                } else{
                    this.leftZero = false;
                }
            }
        }
    }
</script>
<style scoped>
    .leftZero{
        left: 0px;
    }
    .footer-wrap{
        position: absolute;
        bottom: 0;
        width: 100%;
        font-size: 13px;
        line-height: 30px;
        text-align: center;
    }
</style>

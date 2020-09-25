<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    import myStorage from '@/utils/myStorage';
    export default {
        name: 'unAdmin',
        created() {
            // 根据用户选择主题，加载对应css样式
            if (myStorage.getItem('theme') === 'green') {
                var head = document.getElementsByTagName('HEAD').item(0);
                var style = document.createElement('link');
                var style1 = document.createElement('link');
                style.href = 'static/css/theme-green/index.css';
                style.rel = 'stylesheet';
                style.type = 'text/css';
                style1.href = 'static/css/theme-green/color-green.css';
                style1.rel = 'stylesheet';
                style1.type = 'text/css';
                head.appendChild(style);
                head.appendChild(style1);
            } else {
                require('element-ui/lib/theme-chalk/index.css');
                require('static/css/color-dark.css');
            }
        }
    }
</script>
<style>
    @import "../static/css/main.css";
    .el-menu--collapse .el-icon-arrow-right{
        display: none !important;
    }
    .operate-box{
        padding: 15px 0;
    }
    .cell{
      white-space: nowrap !important;
    }
</style>

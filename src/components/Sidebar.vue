<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
                 :background-color="this.bgColor"
                 :text-color="this.textColor" @select="menuSelect">
            <el-menu-item index="index" :key="-1">
                <i class="my-icon-home"></i><span slot="title">系统首页</span>
            </el-menu-item>
            <NavMenu :menuData="menuData"></NavMenu>
        </el-menu>
    </div>
</template>

<script>
    import myStorage from '@/utils/myStorage';
    import bus from '@/components/bus';
    import NavMenu from './NavMenu.vue';

    export default {
        data() {
            return {
                collapse: false,
                menuData: [
                    {
                        menuName: '验证码查询',
                        menuId: '1',
                        menuParentId: '0',
                        children: [
                            {
                                menuName: '获取测试验证码',
                                menuId: '11',
                                menuOpenUrl: 'testCode',
                                children: []
                            },
                            {
                                menuName: '获取生产验证码',
                                menuId: '12',
                                menuOpenUrl: 'produceCode',
                                children: []
                            },
                            // {
                            //     menuName: '订单审核',
                            //     menuId: '13',
                            //     menuOpenUrl: 'checkOrder',
                            //     children: []
                            // },
                            // {
                            //     menuName: '调拨',
                            //     menuId: '13',
                            //     menuOpenUrl: 'checkOrder',
                            //     children: []
                            // }
                        ],

                    },
                    {
                        menuName: 'Q刷伙伴功能',
                        menuId: '2',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: '生成Q刷伙伴账号',
                                menuId: '21',
                                menuOpenUrl: 'createqAccount',
                                children: []
                            },
                        {
                                menuName: '快速开通商户',
                                menuId: '22',
                                menuOpenUrl: 'createqShop',
                                children: []
                            },
                        {
                                menuName: '机具调拨',
                                menuId: '23',
                                menuOpenUrl: 'terminalTransfer',
                                children: []
                            },
                        {
                                menuName: '实名认证',
                                menuId: '24',
                                menuOpenUrl: 'realNameauth',
                                children: []
                            },
                        {
                                menuName: '二维码',
                                menuId: '25',
                                menuOpenUrl: 'imageCode',
                                children: []
                            },
                        {
                                menuName: '发送加密请求',
                                menuId: '26',
                                menuOpenUrl: 'secrectRequest',
                                children: []
                            },
                             {
                                menuName: '数据解密',
                                menuId: '29',
                                menuOpenUrl: 'releaseSerect',
                                children: []
                            },
                        {
                                menuName: '获取odList',
                                menuId: '27',
                                menuOpenUrl: 'getOdlist',
                                children: []
                            },
                        {
                                menuName: '押金状态还原',
                                menuId: '28',
                                menuOpenUrl: 'returnMoneystatue',
                                children: []
                            },
                        {
                            menuName: '二维码',
                            menuId: '201',
                            menuOpenUrl: 'erweiMa',
                            children: []
                        },
                        ]
                    },
                    {
                        menuName: 'Epos功能',
                        menuId: '3',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: 'Epos代理商查询',
                                menuId: '31',
                                menuOpenUrl: 'createqEposDai',
                                children: []
                            },
                            {
                                menuName: 'Epos商户查询',
                                menuId: '32',
                                menuOpenUrl: 'createqEposShop',
                                children: []
                            },
                            {
                                menuName: 'Epos终端管理',
                                menuId: '33',
                                menuOpenUrl: 'createqEposTerm',
                                children: []
                            },



                        ]
                    },
                    {
                        menuName: '商户版助手功能',
                        menuId: '9',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: '商户版助手代理商查询',
                                menuId: '91',
                                menuOpenUrl: 'createqShbzsDai',
                                children: []
                            },
                            {
                                menuName: '商户版助手商户查询',
                                menuId: '92',
                                menuOpenUrl: 'createqShbzsShop',
                                children: []
                            },
                            {
                                menuName: '商户版助手终端管理',
                                menuId: '93',
                                menuOpenUrl: 'createqShbzsTerm',
                                children: []
                            },



                        ]
                    },
                    {
                        menuName: '店管家功能',
                        menuId: '6',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: 'Dgj代理商查询',
                                menuId: '61',
                                menuOpenUrl: 'createqDgjDai',
                                children: []
                            },
                            {
                                menuName: 'Dgj商户查询',
                                menuId: '62',
                                menuOpenUrl: 'createqDgjShop',
                                children: []
                            },
                            {
                                menuName: 'Dgj终端管理',
                                menuId: '63',
                                menuOpenUrl: 'createqDgjTerm',
                                children: []
                            },



                        ]
                    },
                    {
                        menuName: '即时到助手',
                        menuId: '7',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: 'jsd代理商查询',
                                menuId: '71',
                                menuOpenUrl: 'createqJsdDai',
                                children: []
                            },
                            {
                                menuName: 'jsd商户查询',
                                menuId: '72',
                                menuOpenUrl: 'createqJsdShop',
                                children: []
                            },
                            {
                                menuName: 'jsd终端管理',
                                menuId: '73',
                                menuOpenUrl: 'createqJsdTerm',
                                children: []
                            },



                        ]
                    },
                    {
                        menuName: '刷新助手',
                        menuId: '8',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: 'sxzs代理商查询',
                                menuId: '81',
                                menuOpenUrl: 'createqSxzsDai',
                                children: []
                            },
                            {
                                menuName: 'sxzs商户查询',
                                menuId: '82',
                                menuOpenUrl: 'createqSxzsShop',
                                children: []
                            },
                            {
                                menuName: 'sxzs终端管理',
                                menuId: '83',
                                menuOpenUrl: 'createqSxzsTerm',
                                children: []
                            },



                        ]
                    },
                    {
                        menuName: 'phone',
                        menuId: '4',
                        menuParentId: '1',
                        children: [
                            {
                                menuName: '申请记录',
                                menuId: '41',
                                menuOpenUrl: 'phoneShen',
                                children: []
                            },
                            {
                                menuName: '借出记录',
                                menuId: '42',
                                menuOpenUrl: 'phoneRecord',
                                children: []
                            },



                        ]
                    }
                ],
                bgColor: '#324157',
                textColor: '#bfcbd9'
            }
        },
        created() {
            // 判断用户选择的主题，改变侧边栏的颜色
            if (myStorage.getItem('theme') === 'green') {
                this.bgColor = '';
                this.textColor = '';
            } else {
                this.bgColor = '#324157';
                this.textColor = '#bfcbd9';
            }
            ;
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            menuSelect(index, indexPath) {
                if (index.indexOf('http') !== -1 || index.indexOf('https') !== -1) {
                    window.open(index);
                    return;
                }
                let myRoutes = this.$router.options.routes[1].children;
                let unHaveIndex = true;
                for (let item of myRoutes) {
                    if (item.path === '/' + index) {
                        unHaveIndex = false;
                        break;
                    }
                }
                if (unHaveIndex) {
                    let menu = this.getNewDbMenu(index, this.menuData);
                    myRoutes.push({
                        path: '/' + index,
                        component: () => import(`@/views/${index}/index.vue`),
                        meta: {
                            title: menu.menuName,
                        }
                    });
                    this.$router.addRoutes(this.$router.options.routes);
                }
                if (this.$route.fullPath === '/index') {
                    this.$router.push(index);
                } else {
                    this.$router.push(`/${index}`);
                }
            },
            getNewDbMenu(index, data) {
                let result;
                for (let m of data) {
                    if (m.menuOpenUrl === index) {
                        result = m;
                        break;
                    } else if (m.children.length > 0) {
                        result = this.getNewDbMenu(index, m.children);
                        if (result) {
                            break;
                        }
                    }
                }
                return result;
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        components: {
            NavMenu
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }
</style>

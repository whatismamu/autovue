<template>
	<div>
        <div v-for="(item, index) in menuData">
            <template v-if="item.children && item.children.length !== 0">
                <el-submenu :index="item.menuId.toString()" :key="item.menuId">
                    <template slot="title">
                        <i class="el-icon-menu"></i><span slot="title">{{ item.menuName }}</span>
                    </template>
                    <NavMenu :menuData="item.children"></NavMenu>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="item.menuOpenUrl" :key="item.menuId">
                    <i class="el-icon-document"></i><span slot="title">{{ item.menuName }}</span>
                </el-menu-item>
            </template>
        </div>
    </div>
</template>

<script>
export default {
	name: 'NavMenu',
	props: ['menuData']
}
</script>

<style scoped>
.el-menu--collapse .el-menu-item span, .el-menu--collapse .el-submenu>.el-submenu__title span {
    display: none;
}
</style>
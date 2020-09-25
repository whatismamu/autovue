<template>
	<el-button v-if="permissionList.indexOf(url) === -1"
        type="success"
        @click="clickEvent"
        icon="el-icon-download">
        <slot></slot>
    </el-button>
</template>

<script>
import myStorage from '@/utils/myStorage';
export default {
	props: {
		url: String
	},
	name: 'permissionBtn',
	data() {
		return {
			permissionList: []
		};
	},
	created() {
		this.permissionList = JSON.parse(myStorage.getItem('permission')).list;
	},
	methods: {
		clickEvent() {
			this.$emit('click');
		}
	}
}
</script>

<style scoped></style>
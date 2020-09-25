<template>
    <div class="table">
        <el-form :model="searchForm" ref="searchForm">
            <el-form-item label="请求地址：" prop="address">
                <el-input style="width: auto;" v-model="searchForm.address" placeholder="请填写请求地址"></el-input>
            </el-form-item>
            <el-form-item label="请求参数：" prop="requestdata">
                <el-input class="textarea" style="height: auto;" type="textarea"  v-model="searchForm.requestdata" placeholder="请填写请求参数"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search()">发送请求</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./index.js">
</script>
<style scoped>
    @import "./index.css";
</style>

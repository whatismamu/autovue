<template>
    <div class="table">
        <el-form :model="searchForm" ref="searchForm">
            <el-form-item label="加密数据：" prop="requestdata">
                <el-input class="textarea"  :rows="10" style="height: auto;" type="textarea"  v-model="searchForm.requestdata" placeholder="请填写加密数据"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search()">解密</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./index.js">
</script>
<style scoped>
    @import "./index.css";
</style>

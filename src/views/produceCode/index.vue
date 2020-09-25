<template>
    <div class="table">
        <el-form :model="searchForm" ref="searchForm">
            <el-form-item label="短信类型：" prop="adType">
                <el-select v-model="searchForm.messagetype" placeholder="请选择短信类型">
                  <el-option label="代理商注册" value="100001"></el-option>
                  <el-option label="代理商忘记密码" value="100002"></el-option>
                  <el-option label="商户注册" value="100003"></el-option>
                    <el-option label="epos验证码" value="100004"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="手机号码：" prop="odName">
                <el-input style="width: auto;" v-model="searchForm.phoneNo" placeholder="请填写手机号码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script src="./index.js">
</script>
<style scoped>
    @import "./index.css";
</style>

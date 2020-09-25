<template>
    <div class="table">
        <div class="my-content-wrap menu-wrap">
            <div class="handle-box">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                    <el-form-item label="O单名称：" prop="odName">
                        <el-select v-model="searchForm.odName" placeholder="请选择O单名称">
                            <el-option v-for="item in odList" :key="item.odName" :label="item.odName" :value="item.odName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="实名状态：" prop="authstatus">
                        <el-select v-model="searchForm.authstatus" placeholder="请选择实名状态">
                            <el-option label="未实名" value="0"></el-option>
                            <el-option label="实名" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Q刷伙伴账号：" prop="account">
                        <el-input v-model="searchForm.account" placeholder="请输入Q刷伙伴账号"></el-input>
                    </el-form-item>
                    <el-form-item label="Q刷伙伴密码：" prop="password">
                        <el-input v-model="searchForm.password" placeholder="请输入Q刷伙伴密码"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码：" prop="phoneNo">
                        <el-input v-model="searchForm.phoneNo" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
                <el-button type="success" @click="showDialog(0)" icon="el-icon-plus">生成QSJ账号</el-button>
                <el-button type="success" @click="showDialog(1)" icon="el-icon-search">查看</el-button>
                <el-button type="success" @click="showDialog(2)" icon="el-icon-edit">修改</el-button>
            </div>
            <div class="my-content-box">
                <baseTable
                    :page="page"
                    :handleCurrentChange="handleCurrentChange"
                    :handleSizeChange="handleSizeChange">
                    <template slot="content">
                        <el-table-column
                            prop="ODNAME"
                            label="O单名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="PHONENO"
                            label="手机号码"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="CERT_NO"
                            label="身份证号码"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="PSAM_NO"
                            label="机身号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="ID"
                            label="商户ID"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="ORGID"
                            label="机构编号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="ORGNAME"
                            label="机构名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="SHOPNO"
                            label="商户号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="SHOPNAME"
                            label="商户名"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="APPLYDATE"
                            label="申请时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="LAST_VALIDATOR_CODE"
                            label="验证码"
                            align="center">
                        </el-table-column>
                    </template>
                </baseTable>
            </div>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" title="查看" :visible.sync="editVisible"
                       width="50%">
                <el-form :model="dialogForm" :inline="true" ref="dialogForm"
                         label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item
                                label="广告页状态："
                                prop="switchState">
                                <el-select v-model="dialogForm.switchState" placeholder="请选择状态">
                                    <el-option label="开启" value="1"></el-option>
                                    <el-option label="关闭" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="图片地址："
                                prop="imagePath">
                                <el-input v-model="dialogForm.imagePath"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="广告链接地址："
                                prop="imageLinkAddr">
                                <el-input v-model="dialogForm.imageLinkAddr"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script src="./index.js">
</script>
<style scoped>
    @import "./index.css";
</style>

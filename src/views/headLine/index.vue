<template>
    <div class="table">
        <div class="my-content-wrap menu-wrap">
            <div class="handle-box">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline"  ref="searchForm">
                    <el-form-item label="O单名称：" prop="odName">
                        <el-select v-model="searchForm.odName" placeholder="请选择O单名称">
                            <el-option v-for="item in odList" :key="item.odName" :label="item.odName" :value="item.odName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
                <el-button type="success" @click="showDialog(0)" icon="el-icon-plus">添加</el-button>
                <el-button type="success" @click="showDialog(1)" icon="el-icon-search">查看</el-button>
                <el-button type="success" @click="showDialog(2)" icon="el-icon-edit">修改</el-button>
            </div>
            <div class="my-content-box">
                <baseTable
                    :page="page"
                    @row-dblclick="rowDblclick"
                    :handleCurrentChange="handleCurrentChange"
                    :handleSizeChange="handleSizeChange"
                    @row-click="rowClick">
                    <template slot="content">
                        <el-table-column
                            prop="odName"
                            label="O单名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="messageContent"
                            label="消息内容"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="url"
                            label="链接地址"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="dataStatus"
                            :formatter="formatterStatus"
                            label="状态"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="createUserName"
                            label="创建人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="创建时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="updateUserName"
                            label="修改人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="updateTime"
                            label="修改时间"
                            align="center">
                        </el-table-column>
                    </template>
                </baseTable>
            </div>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" :title="dialogTitle" :visible.sync="editVisible" width="50%">
                <el-form :model="dialogForm" :inline="true" ref="dialogForm"
                    :disabled="disabled"
                    label-width="120px"
                    :rules="dialogFormRules">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item
                                label="O单标识："
                                prop="odName">
                                <el-select v-model="dialogForm.odName" placeholder="请选择O单名称">
                                  <el-option label="tgb" value="tgb"></el-option>
                                  <el-option label="jsd" value="jsd"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="消息内容："
                                prop="ORG_NAME">
                                <el-input v-model="dialogForm.ORG_NAME"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="数据状态："
                                prop="dataStatus">
                                <el-select v-model="dialogForm.dataStatus" placeholder="请选择数据状态">
                                  <el-option label="有效" value="1"></el-option>
                                  <el-option label="无效" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="链接地址："
                                prop="url">
                                <el-input v-model="dialogForm.url"></el-input>
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

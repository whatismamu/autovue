<template>
    <div class="table">
        <div class="my-content-wrap menu-wrap">
            <div class="handle-box">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                    <el-form-item label="机构id：" prop="orgid">
                        <el-input v-model="searchForm.orgid" placeholder="请输入Q刷伙伴账号"></el-input>
                    </el-form-item>
                    <el-form-item label="机具号：" prop="fuselage_number">
                        <el-input v-model="searchForm.fuselage_number" placeholder="请输入Q刷伙伴密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
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
                            prop="ORG_ID"
                            label="机构编号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_ID"
                            label="商户id"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="REMARK"
                            label="机具号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="FUSELAGE_NUMBER"
                            label="机具号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="DATA_STATUS"
                            :formatter="formatterStatus"
                            label="机具绑定状态"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="AMOUNT"
                            label="达标金额"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="CREATE_TIME"
                            label="创建时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            fixed="left"
                            label="操作"
                            width="100" >
                            <template slot-scope="scope">
                                <!--<el-button type="primary"  size="mini"  @click="createqAccount(scope.row)">查看</el-button>-->
                                <el-button
                                    v-if="scope.row.DATA_STATUS ==='1' || scope.row.DATA_STATUS ==='0'"
                                    type="primary" size="mini"
                                    @click="returnMoneystatus(scope.row)">
                                    撤销状态
                                </el-button>
                            </template>
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

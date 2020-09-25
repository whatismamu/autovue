<template>
    <div class="table">
        <div class="my-content-wrap menu-wrap">
            <div class="handle-box">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                    <el-form-item label="实名状态：" prop="authstatus">
                        <el-select v-model="searchForm.authstatus" placeholder="请选择实名状态">
                            <el-option label="未实名" value="0"></el-option>
                            <el-option label="实名" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Epos商户账号：" prop="account">
                        <el-input v-model="searchForm.account" placeholder="请输入Epos商户账号"></el-input>
                    </el-form-item>
                    <el-form-item label="Epos注册手机号码：" prop="phoneNo">
                        <el-input v-model="searchForm.phoneNo" placeholder="请输入Epos注册手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="终端号：" prop="termno">
                        <el-input v-model="searchForm.termno" placeholder="请输入Epos终端编号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh">清空</el-button>
                    </el-form-item>
                    <el-form-item label="绑定状态：" prop="termstatus">
                        <el-select v-model="searchForm.termstatus" placeholder="请选择绑定状态">
                            <el-option label="未绑定" value="0"></el-option>
                            <el-option label="已绑定" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
                <el-button type="success" @click="showDialog(0)" icon="el-icon-plus">添加</el-button>
                <el-button type="success" @click="showDialog(1)" icon="el-icon-search">查看</el-button>
                <el-button type="success" @click="showDialog(2)" icon="el-icon-edit">Epos调拨</el-button>
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
                            prop="order_sn"
                            label="申请编号"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="部门"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="phone_type"
                            label="申请机型"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="signer_name"
                            label="申请人"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="jie_status"
                            :formatter="formatterisKeyDown"
                            label="申请状态"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="create_time"
                            label="申请时间"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            fixed="left"
                            label="操作"
                            width="130" >
                            <template slot-scope="scope">
                                <!--<el-button type="primary"  size="mini"  @click="createqAccount(scope.row)">查看</el-button>-->
                                <el-button
                                    v-if="scope.row.jie_status ==='0' "
                                    type="primary" size="mini"
                                        @click="phoneApprove(scope.row)" >
                                    审核
                                </el-button>
                                <el-button v-else type="text" size="mini">
                                    {{ scope.row.jie_status | formatterIsauth }}
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
                                label="迁入代理商："
                                prop="toagentid">
                                <el-input v-model="dialogForm.toagentid"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item
                                label="迁出代理商："
                                prop="fromagentid">
                                <el-input v-model="dialogForm.fromagentid"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" title="添加" :visible.sync="editVisible1"
                       width="50%">
                <el-form :model="addForm" :inline="true" ref="addForm" :rules="addFormrules"
                         label-width="120px">
                    <el-row>
                         <el-col :span="12">
                            <el-form-item
                                label="手机型号："
                                prop="phone_type">
                                <el-input v-model="addForm.phone_type"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="12">
                            <el-form-item
                                label="部门："
                                prop="bumen">
                                <el-input v-model="addForm.bumen"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="姓名："
                                prop="name">
                                <el-input v-model="addForm.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
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

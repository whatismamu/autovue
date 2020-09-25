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
                    <el-form-item label="机具类型：" prop="termType">
                        <el-select v-model="searchForm.termtype" placeholder="请选择机具类型">
                            <el-option v-for="item in termTypeList" :key="item.termtype" :label="item.termtype" :value="item.termtype">
                            </el-option>
                        </el-select>
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
                <el-button type="success" @click="showDialog(0)" icon="el-icon-plus">生成Dgj商户</el-button>
                <el-button type="success" @click="showDialog(1)" icon="el-icon-rank">绑定机具</el-button>
                <el-button type="success" @click="showDialog(2)" icon="el-icon-sort">Dgj机具调拨</el-button>
                <el-button type="success" @click="showDialog(3)" icon="el-icon-edit-outline">机具o单变更</el-button>
                <el-button type="success" @click="showDialog(4)" icon="el-icon-edit-outline">机具入库</el-button>
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
                            prop="DEV_NO"
                            label="机具号"
                            align="center" >
                        </el-table-column>
                         <el-table-column
                            prop="SHOP_NO"
                            label="商户号"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_ID"
                            label="商户id"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="ORG_ID"
                            label="机构id"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_NAME"
                            label="商户名称"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_PHONE"
                            label="商户手机号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="DEV_STATUS"
                            :formatter="formatterisBind"
                            label="绑定状态"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="OD_NAME"
                            label="o单"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="DEPOSIT_MARK"
                            :formatter="formatterisDeposit"
                            label="押金标识"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="CREATE_TIME"
                            label="创建时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            fixed="left"
                            label="操作"
                            width="250" >
                            <template slot-scope="scope">
                                <!--<el-button type="primary"  size="mini"  @click="createqAccount(scope.row)">查看</el-button>-->
                                <el-button
                                    type="primary" size="mini"
                                    @click="TermMiss(scope.row)" >
                                    解绑终端
                                </el-button>
                                <el-button
                                    type="primary" size="mini"
                                    @click="TermInit(scope.row)" >
                                    店管家终端初始化
                                </el-button>
                            </template>
                        </el-table-column>
                    </template>
                </baseTable>
            </div>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" title="机具入库" :visible.sync="editVisible1"
                       width="50%">
                <el-form :model="dialogForm" :inline="true" ref="dialogForm"
                         label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item
                                label="终端号："
                                prop="DEV_NO">
                                <el-input v-model="dialogForm.deviceNo"></el-input>
                            </el-form-item>
                            </el-col>
                        <el-col :span="12">
                                                        <el-form-item label="O单名称：" prop="odName">
                        <el-select v-model="dialogForm.OD_NAME" placeholder="请选择O单名称">
                            <el-option v-for="item in odList1" :key="item.odName" :label="item.odName" :value="item.odName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="机具类型：" prop="termType">
                        <el-select v-model="dialogForm.termtype" placeholder="请选择机具类型">
                            <el-option v-for="item in termTypeList" :key="item.termtype" :label="item.termtype" :value="item.termtype">
                            </el-option>
                        </el-select>
                    </el-form-item>
                            </el-col>
                        <el-col :span="12">
                                                        <el-form-item label="机具活动：" prop="deviceActivity">
                        <el-select v-model="dialogForm.deviceActivity" placeholder="请选择O单名称">
                            <el-option v-for="item in deviceActivity" :key="item.deviceactivityName" :label="item.deviceactivityName" :value="item.deviceactivityName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible1 = false">取 消
                    </el-button>
                    <el-button type="primary" @click="submitForm('dialogForm')">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" title="机具o单变更" :visible.sync="editVisible"
                       width="50%">
                <el-form :model="dialogForm1" :inline="true" ref="dialogForm1"
                         label-width="120px">
                    <el-row>

                        <el-col :span="12">
                            <el-form-item
                                label="终端号："
                                prop="DEV_NO">
                                <el-input v-model="dialogForm1.DEV_NO"></el-input>
                            </el-form-item>
                            <el-form-item label="O单名称：" prop="odName">
                        <el-select v-model="dialogForm1.changeOdName" placeholder="请选择O单名称">
                            <el-option v-for="item in odList" :key="item.odName" :label="item.odName" :value="item.odName">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消
                    </el-button>
                    <el-button type="primary" @click="submitForm1('dialogForm1')">确 定</el-button>
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

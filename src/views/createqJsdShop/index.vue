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
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()" >查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh" >清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
                <el-button type="success" @click="showDialog(0)" icon="el-icon-plus" >生成jsdp商户</el-button>
                <el-button type="success" @click="showDialog(1)" icon="el-icon-search">查看</el-button>
                <el-button type="success" @click="showDialog(2)" icon="el-icon-edit">绑定终端</el-button>
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
                            prop="ENC_SHOP_PHONE"
                            label="注册手机"
                            width="100"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="ORG_ID"
                            label="机构id"
                            width="80"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="ORG_NAME"
                            label="代理商名称"
                            width="160"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_NO"
                            label="商户编号"
                            width="160"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="DEV_NO"
                            label="终端号"
                            width="190"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_ID"
                            label="shopid"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_NAME"
                            label="商户名"
                            width="150"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="CHECK_STATUS"
                            :formatter="formatterUserType"
                            label="绑定状态"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="CASH_STATUS"
                            :formatter="formatterDebitRate"
                            label="押金状态"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="OD_NAME"
                            label="o单"
                            width="80"
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
                            width="350" >
                            <template slot-scope="scope">
                                <!--<el-button type="primary"  size="mini"  @click="createqAccount(scope.row)">查看</el-button>-->
                                <el-button
                                    v-if="scope.row.MERC_NO !=='' "
                                    type="primary" size="mini"
                                    @click="deleteShopRecord(scope.row)" >删除押金记录</el-button>
                                <el-button
                                    v-if="scope.row.MERC_NO !=='' "
                                    type="primary" size="mini"
                                    @click="termMiss(scope.row)" >解绑终端</el-button>
                                <el-button
                                    v-if="scope.row.MERC_NO !=='' "
                                    type="primary" size="mini"
                                    @click="initShopStatus(scope.row)" >初始化Q刷商户</el-button>
                            </template>

                        </el-table-column>
                    </template>
                </baseTable>
            </div>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" title="绑定终端" :visible.sync="editVisible"
                       width="50%">
                <el-form :model="dialogForm" :inline="true" ref="dialogForm"
                         label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item
                                label="终端号："
                                prop="DEV_NO">
                                <el-input v-model="dialogForm.DEV_NO"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="商户编号："
                                prop="SHOP_NO">
                                <el-input v-model="dialogForm.shopId"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="注册账号："
                                prop="ENC_SHOP_PHONE">
                                <el-input v-model="dialogForm.phoneNumber"></el-input>
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

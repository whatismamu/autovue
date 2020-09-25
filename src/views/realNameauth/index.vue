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
                <!--<el-button type="success" @click="showDialog(0)" icon="el-icon-plus">生成Q刷账号</el-button>-->
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
                            prop="CERTIFIC_SERIAL_NO"
                            label="认证流水号"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="PHONE_NO"
                            label="手机号码"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="ENC_PHONE_NO"
                            label="手机号码"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="ORG_NAME"
                            label="机构名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_NAME"
                            label="商户名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="SHOP_ID"
                            label="商户编号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="AUTH_CARD_NO"
                            label="实名卡号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="ID_NO"
                            label="身份证号码"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="REAL_NAME_TYPE"
                            :formatter="formatterRealNameType"
                            label="识别方式"
                            align="center" width="70">
                        </el-table-column>
                        <el-table-column
                            prop="CREATE_TIME"
                            label="创建时间"
                            align="center" width="150">
                        </el-table-column>
                        <el-table-column
                            prop="FREEZE_STATUS"
                            :formatter="formatterFreezeStatus"
                            label="冻结状态"
                            align="center">
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--fixed="left"-->
                            <!--label="操作"-->
                            <!--width="80" >-->
                            <!--<template slot-scope="scope">-->
                                <!--<el-button type="primary"  size="mini"  @click="reanNameauth(scope.row)">查看</el-button>-->
                                <!--&lt;!&ndash;<el-button&ndash;&gt;-->
                                    <!--&lt;!&ndash;v-if="scope.row.IS_AUTH ==='1' || scope.row.IS_AUTH ==='0'"&ndash;&gt;-->
                                    <!--&lt;!&ndash;type="primary" size="mini"&ndash;&gt;-->
                                    <!--&lt;!&ndash;@click="passBuy(scope.row)" >&ndash;&gt;-->
                                    <!--&lt;!&ndash;商城购买&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button&ndash;&gt;-->
                                    <!--&lt;!&ndash;v-if="scope.row.AUDIT_STATUS === '02' || scope.row.AUDIT_STATUS ==null && scope.row.IS_AUTH ==='1'"&ndash;&gt;-->
                                    <!--&lt;!&ndash;type="primary" size="mini"&ndash;&gt;-->
                                    <!--&lt;!&ndash;@click="passAuditstatus(scope.row)">&ndash;&gt;-->
                                    <!--&lt;!&ndash;服务商认证&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                                <!--&lt;!&ndash;<el-button v-else type="text" size="mini">&ndash;&gt;-->
                                    <!--&lt;!&ndash;{{ scope.row.AUDIT_STATUS | formatterIsauth }}&ndash;&gt;-->
                                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                    </template>
                </baseTable>
            </div>
            <el-dialog :close-on-click-modal="false" @close="closeDialog" :title="dialogTitle" :visible.sync="editVisible"
                       width="50%">
                <el-form :model="dialogForm" :inline="true" ref="dialogForm"
                         :disabled="disabled"
                    label-width="120px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item
                                label="消息内容："
                                prop="PHONE_NO">
                                <el-input v-model="dialogForm.PHONE_NO"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="身份证正面："
                                prop="ERROR_IMAGE_NO_ONE">
                                <el-select v-model="dialogForm.ERROR_IMAGE_NO_ONE" placeholder="请选择状态">
                                    <el-option label="冻结" value="1"></el-option>
                                    <el-option label="已认证" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="身份证反面："
                                prop="ERROR_IMAGE_NO_TWO">
                                <el-select v-model="dialogForm.ERROR_IMAGE_NO_TWO" placeholder="请选择状态">
                                    <el-option label="冻结" value="1"></el-option>
                                    <el-option label="已认证" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="手持或人脸："
                                prop="ERROR_IMAGE_NO_THREEE">
                                <el-select v-model="dialogForm.ERROR_IMAGE_NO_THREEE" placeholder="请选择状态">
                                    <el-option label="冻结" value="1"></el-option>
                                    <el-option label="已认证" value="0"></el-option>
                                </el-select>
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

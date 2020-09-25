<template>
    <div class="table">
        <div class="my-content-wrap menu-wrap">
            <div class="handle-box">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="searchForm">
                    <el-form-item label="实名状态：" prop="authstatus">
                        <el-select v-model="searchForm.authstatus" placeholder="请选择实名状态">
                            <el-option label="已通过" value="1"></el-option>
                            <el-option label="未通过" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否顶级代理商：" prop="authstatus">
                        <el-select v-model="searchForm.istop" placeholder="是否顶级代理商">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="不是" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Epos代理商账号：" prop="account">
                        <el-input v-model="searchForm.account" placeholder="请输入Epos代理商账号"></el-input>
                    </el-form-item>
                    <el-form-item label="Epos注册手机号码：" prop="phoneNo">
                        <el-input v-model="searchForm.phoneNo" placeholder="请输入Epos注册手机号码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
                <el-button type="success" @click="showDialog(0)" icon="el-icon-plus">生成Epos代理商</el-button>
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
                            prop="ENC_REG_USER_NO"
                            label="注册手机"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="AGENT_ID"
                            label="机构id"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="AGENT_NO"
                            label="代理商编号"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="AGENT_NAME"
                            label="代理商名称"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="PAGENT_ID"
                            label="上级机构id"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="PAGENT_NAME"
                            label="上级机构名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="DEBIT_CARD_RATE"
                            :formatter="formatterDebitRate"
                            label="借记卡费率%"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="DEBIT_FEETOP"
                            :formatter="formatterDebitFeetop"
                            label="借记卡封顶"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="AGENT_LEVEL"
                            label="机构等级"
                            align="center" >
                        </el-table-column>
                        <el-table-column
                            prop="RECOMMEND_CODE"
                            label="推荐码"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="CREATE_TIME"
                            label="创建时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="CHECK_STATUS"
                            :formatter="formatterIsAuth"
                            label="实名状态"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            fixed="left"
                            label="操作"
                            width="130" >
                            <template slot-scope="scope">
                                <!--<el-button type="primary"  size="mini"  @click="createqAccount(scope.row)">查看</el-button>-->
                                <el-button
                                    v-if="scope.row.CHECK_STATUS ==='2' "
                                    type="primary" size="mini"
                                    @click="passEpos(scope.row)" >
                                    审核
                                </el-button>
                                <el-button
                                    v-if="scope.row.CHECK_STATUS === '02' || scope.row.CHECK_STATUS ==null && scope.row.CHECK_STATUS ==='1'"
                                    type="primary" size="mini"
                                    @click="passAuditstatus(scope.row)">
                                    服务商认证
                                </el-button>
                                <el-button v-else type="text" size="mini">
                                    {{ scope.row.CHECK_STATUS | formatterIsauth }}
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

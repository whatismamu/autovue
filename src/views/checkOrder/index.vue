<template>
    <div class="table">
        <div class="my-content-wrap menu-wrap">
            <div class="handle-box">
                <el-form :inline="true" :model="searchForm" class="demo-form-inline"  ref="searchForm">
                    <el-form-item label="订单号：" prop="orderNo">
                        <el-input v-model="searchForm.orderNo" placeholder="请输入订单号"></el-input>
                    </el-form-item>
                    <el-form-item label="机构名称：" prop="orgName">
                        <el-input v-model="searchForm.orgName" placeholder="请输入机构名称"></el-input>
                    </el-form-item>
                    <el-form-item label="机构编号：" prop="orgCode">
                        <el-input v-model="searchForm.orgCode" placeholder="请输入机构编号"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" prop="contactPhone">
                        <el-input v-model="searchForm.contactPhone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="打款人姓名：" prop="payerName">
                        <el-input v-model="searchForm.payerName" placeholder="请输入打款人姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="申请时间：">
                        <el-date-picker
                            v-model="createTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            style="width: 300px !important;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="审核时间：">
                        <el-date-picker
                            v-model="auditTime"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                            :picker-options="pickerOptions"
                            style="width: 300px !important;">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="状态：" prop="orderStatus">
                        <el-select v-model="searchForm.orderStatus" placeholder="请选择订单状态">
                          <el-option label="取消" value="0"></el-option>
                          <el-option label="预订单" value="1"></el-option>
                          <el-option label="待审核" value="2"></el-option>
                          <el-option label="待发货" value="3"></el-option>
                          <el-option label="审核失败" value="4"></el-option>
                          <el-option label="待收货" value="5"></el-option>
                          <el-option label="已完成" value="6"></el-option>
                          <el-option label="已退货" value="7"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付金额：" prop="paymentAmount">
                        <el-select v-model="searchForm.paymentAmount" placeholder="请选择支付金额">
                          <el-option label="有金额" value="2"></el-option>
                          <el-option label="无金额" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="search()">查询</el-button>
                        <el-button @click="resetForm()" icon="el-icon-refresh">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="operate-box">
                <permission-btn
                    url="/order/getBatchExcel"
                    @click="exportChart('getBatchExcel')">
                    批量导出EXCEL
                </permission-btn>
                <permission-btn
                    url="/order/getReceiptExcelImpl"
                    @click="exportChart('getBatchExcel')">
                    海科查账导出EXCEL
                </permission-btn>
                <permission-btn
                    url="/order/getDFHExcelImpl"
                    @click="exportChart('getDFHExcelImpl')">
                    待发货导出EXCEL
                </permission-btn>
                <permission-btn
                    url="/order/getYFHExcelImpl"
                    @click="exportChart('getYFHExcelImpl')">
                    已发货导出EXCEL
                </permission-btn>
                <permission-btn
                    url="/order/importExcelImpl"
                    @click="exportChart('importExcelImpl')">
                    导入需要发货的EXCEL
                </permission-btn>
            </div>
            <div class="my-content-box">
                <baseTable
                    :page="page"
                    :handleCurrentChange="handleCurrentChange"
                    :handleSizeChange="handleSizeChange"
                    @row-dblclick="showDetail">
                    <template slot="content">
                        <el-table-column
                            prop="orderNo"
                            label="订单号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="deviceTypeExtendId"
                            label="商品编号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="deviceTypeName"
                            label="终端型号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="orgCode"
                            label="机构编号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="orgName"
                            label="机构名称"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="contactPhone"
                            label="手机号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="deviceNum"
                            label="商品数量"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="orderAmount"
                            label="总金额"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="paymentAmount"
                            label="应付金额"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="preferentialAmount"
                            label="使用积分"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="申请时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="checkPerson"
                            label="审核人"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="createTime"
                            label="审核时间"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            fixed="left"
                            label="操作"
                            width="150">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="checkOrder(scope.row)">查看</el-button>
                                <el-button v-if="scope.row.orderStatus === '2'"
                                    type="primary"
                                    @click="passOrder(scope.row)">
                                    通过
                                </el-button>
                                <el-button v-else type="text">
                                    {{ scope.row.orderStatus | formatterStatus }}
                                </el-button>
                            </template>
                        </el-table-column>
                    </template>
                </baseTable>
            </div>
            <el-dialog :close-on-click-modal="false" title="导入需要迁移的序列号" :visible.sync="downloadVisible">
                <el-row>
                    <el-col :span="5">
                        <label>批量发货数据：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-upload
                          class="upload-demo"
                          ref="upload"
                          :file-list="fileList"
                          :on-change="onChange"
                          :auto-upload="false"
                          :action="$http.baseUrl + '/wfbs-console/order/importExcelImpl?format=json'"
                          :on-success="uploadSuccess">
                          <el-button size="small" type="primary">选取文件</el-button>
                        </el-upload>
                    </el-col>
                    <el-col :span="5">
                        <label>下载Excel模板：</label>
                    </el-col>
                    <el-col :span="18">
                        <el-button type="primary" icon="el-icon-download" @click="downloadExcel">下载模板</el-button>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button type="success" @click="sureImport">确定导入</el-button>
                    <el-button type="danger" @click="downloadVisible = false">取消</el-button>
                </div>
            </el-dialog>
            <el-dialog :close-on-click-modal="false" @open="openDialog" title="查看" :visible.sync="editVisible" width="70%">
                <el-form :model="form" :inline="true" ref="addForm"
                    label-width="120px"
                    class="my-form"
                    :rules="addFormRules">
                    <el-row>
                        <el-col :span="24">
                            <p class="formItemTitle">商品信息</p>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="商品编号："
                                prop="deviceTypeId">
                                <el-input v-model="form.deviceTypeId" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="商品名称："
                                prop="deviceTypeName">
                                <el-input v-model="form.deviceTypeName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="押金状态："
                                prop="depositType">
                                <el-input v-model="form.depositType" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="终端型号："
                                prop="deviceTypeName">
                                <el-input v-model="form.deviceTypeName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="购买数量："
                                prop="deviceNum">
                                <el-input v-model="form.deviceNum" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="商品单价："
                                prop="devicePrice">
                                <el-input v-model="form.devicePrice" disabled></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="24">
                            <p class="formItemTitle">收货信息</p>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="收货人姓名："
                                prop="contactsName">
                                <el-input v-model="form.contactsName" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="收货人手机号："
                                prop="contactPhone">
                                <el-input v-model="form.contactPhone" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item
                                label="收货地址："
                                prop="deliveryAddress">
                                <el-input v-model="form.deliveryAddress" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" v-if="form.orderStatus === '1' || form.orderStatus === '2' || form.orderStatus === '3'">
                            <el-button type="success" @click="reviseInfo">修改信息</el-button>
                        </el-col>

                        <!-- 修改地址 -->
                        <div v-if="showReviseForm">
                            <el-col :span="24">
                                <p class="formItemTitle">修改地址</p>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item
                                    label="修改收货人姓名："
                                    prop="updateName">
                                    <el-input v-model="form.updateName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item
                                    label="修改收货人手机号："
                                    prop="updatePhone">
                                    <el-input v-model="form.updatePhone"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item
                                    label="省/直辖市："
                                    prop="updateAddress">
                                    <el-cascader
                                      :options="options"
                                      :props="props"
                                      v-model="selectedAddress">
                                    </el-cascader>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="详细地址："
                                    prop="updateAddress">
                                    <el-input v-model="form.updateAddress"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-button type="success" @click="updateAddress">确认保存</el-button>
                            </el-col>
                        </div>
                        
                        <el-col :span="24">
                            <p class="formItemTitle">支付信息</p>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="总金额(元)："
                                prop="orderAmount">
                                <el-input v-model="form.orderAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="使用积分："
                                prop="preferentialAmount">
                                <el-input v-model="form.preferentialAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="应付金额(元)："
                                prop="paymentAmount">
                                <el-input v-model="form.paymentAmount" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="支付方法："
                                prop="paymentType">
                                <el-input v-model="form.paymentType" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item
                                label="交易流水："
                                prop="accountNum">
                                <el-input v-model="form.accountNum" disabled></el-input>
                            </el-form-item>
                        </el-col>

                        <div v-if="(form.orderStatus > '1' && form.payerCardNo) || (form.orderStatus === '1')">
                            <el-col :span="8">
                                <el-form-item
                                    label="打款人姓名："
                                    prop="payerName">
                                    <el-input v-model="form.payerName" :disabled="form.orderStatus !== '1'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="打款人银行卡："
                                    prop="payBankNo">
                                    <el-input v-model="form.payBankNo" :disabled="form.orderStatus !== '1'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="打款人身份证："
                                    prop="payerCardNo">
                                    <el-input v-model="form.payerCardNo" :disabled="form.orderStatus !== '1'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="银行卡支行："
                                    prop="bankBranch">
                                    <el-input v-model="form.bankBranch" :disabled="form.orderStatus !== '1'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="打款人时间："
                                    prop="payTime">
                                    <el-date-picker type="date"
                                        placeholder="选择日期"
                                        :disabled="form.orderStatus !== '1'"
                                        value-format="yyyy-MM-dd"
                                        v-model="form.payTime">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" v-if="form.paymentVoucher">
                                <el-form-item label="支付凭证：">
                                    <img :src="$http.imgUrl + form.paymentVoucher" width="148px" height="148px">
                                </el-form-item>
                            </el-col>
                            <el-col :span="10" v-if="form.orderStatus === '1'">
                                <el-form-item label="支付凭证：">
                                    <el-upload
                                      action=""
                                      :before-upload="beforeUpload">
                                      <img :src="imgUrl ?  imgUrl : $http.imgUrl + 'defaultpic.png'" width="148px" height="148px">
                                      <el-button size="small" type="primary">上传凭证</el-button>
                                    </el-upload>
                                </el-form-item>
                                
                            </el-col>
                            <el-col :span="6" v-if="form.orderStatus === '1'">
                                <el-button type="success" @click="updatePayerInfo">确认保存</el-button>
                            </el-col>
                        </div>
                        
                        <div v-if="form.orderStatus === '3' || form.orderStatus === '5' || form.orderStatus === '6'">
                            <el-col :span="24">
                                <p class="formItemTitle">发货物流信息</p>
                            </el-col>
                            <el-col :span="10">
                                <el-form-item
                                    label="物流名称："
                                    prop="logisticsName">
                                    <el-select v-model="form.logisticsName" placeholder="请选择订单状态"
                                        :disabled="form.orderStatus !== '3'">
                                        <el-option label="圆通快运" value="圆通快运"></el-option>
                                        <el-option label="顺丰速运" value="顺丰速运"></el-option>
                                        <el-option label="嘉里大通" value="嘉里大通"></el-option>
                                        <el-option label="跨越速运" value="跨越速运"></el-option>
                                        <el-option label="优速物流" value="优速物流"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item
                                    label="运单号："
                                    prop="logisticsNo">
                                    <el-input v-model="form.logisticsNo" :disabled="form.orderStatus !== '3'"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" v-if="form.orderStatus !== '3'">
                                <el-form-item
                                    label="发货时间："
                                    prop="deliveryTime">
                                    <el-input v-model="form.deliveryTime" disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                        
                        <el-col :span="24">
                            <p class="formItemTitle">审核日志</p>
                        </el-col>
                        <el-col :span="24">
                            <el-table
                              :data="orderLogList"
                              border
                              style="width: 100%">
                              <el-table-column
                                prop="auditType"
                                align="center"
                                label="操作类型">
                              </el-table-column>
                              <el-table-column
                                prop="orderStatus"
                                align="center"
                                label="结果">
                              </el-table-column>
                              <el-table-column
                                prop="createUser"
                                align="center"
                                label="操作人">
                              </el-table-column>
                              <el-table-column
                                prop="createTime"
                                align="center"
                                label="操作时间">
                              </el-table-column>
                            </el-table>
                        </el-col>

                        <div v-if="form.orderStatus === '2' || form.orderStatus === '4'">
                            <el-col :span="24">
                                <p class="formItemTitle">审核备注</p>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="审核备注：">
                                    <el-input style="width: 400px" type="textarea" rows="4" v-model="form.remark"></el-input>
                                </el-form-item>
                            </el-col>
                        </div>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <template v-if="form.orderStatus === '2' || form.orderStatus === '4'">
                        <el-button type="success" @click="auditOrder(0)">审核成功</el-button>
                        <el-button type="danger" @click="auditOrder(1)">审核失败</el-button>
                    </template>
                    <el-button v-if="form.orderStatus === '3'" type="primary" @click="deliverGoods">发货</el-button>
                    <el-button v-if="form.orderStatus === '3' || form.orderStatus === '5' || form.orderStatus === '6'"
                        type="warning" @click="returnGoods">
                        退货
                    </el-button>
                    <el-button type="info" @click="editVisible = false">关闭</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script src="./index.js">
</script>
<style>
    @import "./index.css";
    .upload-demo{
        margin-bottom: 10px;
    }
    .upload-demo>.el-upload--text{
        width: 100px;
        height: 35px;
    }
</style>

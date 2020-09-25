import permissionBtn from '@/components/permissionBtn';
import { regionData } from 'element-china-area-data';
export default {
    components: {
        permissionBtn
    },
    name: 'checkOrder',
    data() {
        let validateCard = (rule, value, callback) => {
            let pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if (!pattern.test(this.form.payerCardNo)) {
                callback(new Error('身份证格式不正确'));
            }
            callback();
        };
        return {
            form: {},
            page: {
                curPage: 1,
                curPageSize: 10,
                totalSize: 1,
                result: []
            },
            searchForm: {
                orderNo: '',
                orgName: '',
                orgCode: '',
                contactPhone: '',
                payerName: '',
                orderStatus: '',
                createTimeS: '',
                createTimeE: '',
                auditTimeS: '',
                auditTimeE: '',
                paymentAmount: ''
            },
            createTime: '',
            auditTime: '',
            pickerOptions: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            addFormRules: {
                payerName: [
                    { required: true, message: '请输入打款人姓名', trigger: 'blur' },
                    { max: 50, message: '最长为50个字符', trigger: 'change' }
                ],
                payBankNo: [
                    { required: true, message: '请输入银行卡号', trigger: 'blur' }
                ],
                payerCardNo: [
                    { required: true, message: '请输入身份证号', trigger: 'blur' },
                    { validator: validateCard, trigger: 'blur' }
                ],
                payTime: [
                    { required: true, message: '请输入打款时间', trigger: 'change' }
                ]
            },
            editVisible: false,
            showReviseForm: false,
            options: regionData,
            props: {
              value: 'label'
            },
            selectedAddress: [],
            orderLogList: [],
            imgUrl: '',
            downloadVisible: false,
            fileList: []
        }
    },
    filters: {
        formatterStatus(data) {
            let orderStatus = '';
            switch (data) {
                case '0':
                    orderStatus = '取消订单';
                    break;
                case '1':
                    orderStatus = '预订单';
                    break;
                case '2':
                    orderStatus = '审核中';
                    break;
                case '3':
                    orderStatus = '待发货';
                    break;
                case '4':
                    orderStatus = '审核失败';
                    break;
                case '5':
                    orderStatus = '待收货';
                    break;
                case '6':
                    orderStatus = '已完成';
                    break;
                case '7':
                    orderStatus = '已退货';
                    break;
                default:
                    orderStatus = '未知状态'
                    break;
            }
            return orderStatus;
        }
    },
    created(){
        this.$nextTick(() => {
            this.initPageData();
        });
    },
    methods: {
        initPageData() {
            this.$http.initPageData('/wfbs-console/order/selectOrderList', this);
        },
        handleSizeChange(size){
            this.page.curPageSize = size;
            this.initPageData();
        },
        handleCurrentChange(val) {
            this.page.curPage = val;
            this.initPageData();
        },
        resetForm() {
            this.createTime = '';
            this.auditTime = '';
            this.$refs.searchForm.resetFields();
        },
        search() {
            if (this.createTime.length) {
                this.searchForm.createTimeS = this.createTime[0];
                this.searchForm.createTimeE = this.createTime[1];
            } else {
                this.searchForm.createTimeS = '';
                this.searchForm.createTimeE = '';
            }
            if (this.auditTime.length) {
                this.searchForm.auditTimeS = this.auditTime[0];
                this.searchForm.auditTimeE = this.auditTime[1];
            } else {
                this.searchForm.auditTimeS = '';
                this.searchForm.auditTimeE = '';
            }
            this.page.curPage = 1;
            this.initPageData();
        },
        downloadExcel() {
            window.open('https://uenpay.com/downloadTemplate/批量发货模板.xls');
        },
        uploadSuccess(res, file) {
            console.log(res);
            this.$message({
                type: 'error',
                message: res.message.content
            });
        },
        onChange(file, list) {
            this.fileList = [];
            this.fileList.push(file);
        },
        sureImport() {
            this.$refs.upload.submit();
        },
        exportChart(url) {
            if (url === 'importExcelImpl') {
                this.fileList = [];
                this.downloadVisible = true;
            } else {
                if (this.createTime.length) {
                    this.searchForm.createTimeS = this.createTime[0];
                    this.searchForm.createTimeE = this.createTime[1];
                } else {
                    this.searchForm.createTimeS = '';
                    this.searchForm.createTimeE = '';
                }
                if (this.auditTime.length) {
                    this.searchForm.auditTimeS = this.auditTime[0];
                    this.searchForm.auditTimeE = this.auditTime[1];
                } else {
                    this.searchForm.auditTimeS = '';
                    this.searchForm.auditTimeE = '';
                }
                let form = document.createElement("form");
                form.style.display = 'none';
                form.target = '_blank';
                form.action =  this.$http.baseUrl + '/wfbs-console/order/' + url;
                form.method = "post";
                document.body.appendChild(form);
                for(var key in this.searchForm){
                    if (this.searchForm[key] !== '') {
                        var input = document.createElement("input");
                        input.type = "hidden";
                        input.name = key;
                        input.value = this.searchForm[key];
                        form.appendChild(input);
                    }
                }
                form.submit();
                form.remove();
            }
        },
        showDetail(row, event) {
            this.$http.post({
                url: '/wfbs-console/order/queryAgentOrder',
                data: {
                    agentOrderId: row.agentOrderId
                }
            }).then(res => {
                console.log(res);
                if ((res.data.result.orderStatus > '1' && res.data.result.payerCardNo) || res.data.result.orderStatus === '1') {
                    res.data.result.paymentType = '线下对公支付';
                } else if (res.data.result.accountNum.indexOf('wx') !== -1) {
                    res.data.result.paymentType = '微信支付';
                } else if (res.data.result.accountNum.indexOf('alipay') !== -1){
                    res.data.result.paymentType = '支付宝支付';
                }
                this.form = res.data.result;
            }).catch(error => {
                console.log(error);
            })
            this.$http.post({
                url: '/wfbs-console/order/queryAgentOrderLogList',
                data: {
                    agentOrderId: row.agentOrderId
                }
            }).then(res => {
                console.log(res);
                this.orderLogList = res.data.result;
            }).catch(error => {
                console.log(error);
            })
            this.form = JSON.parse(JSON.stringify(row));
            this.showReviseForm = false;
            this.editVisible = true;
        },
        checkOrder(row) {
            this.showDetail(row);
        },
        passOrder(row) {
            this.$confirm('确认通过?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http.post({
                    url: '/wfbs-console/order/updateAuditSccuess',
                    data: {
                        agentOrderId: row.agentOrderId
                    }
                }).then(res => {
                    loading.close();
                    this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.initPageData(); 
                        }
                    });
                }).catch(error => {
                    console.log(error);
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });          
            });
        },
        openDialog() {
            this.$nextTick(() => {
                this.$refs.addForm.resetFields();
                this.imgUrl = '';
            });
        },
        updateAddress() {
            this.$http.post({
                url: '/wfbs-console/order/updateAddress',
                data: {
                    contactsName: this.form.updateName,
                    contactPhone: this.form.updatePhone,
                    deliveryAddress: this.selectedAddress.join(',') + this.form.updateAddress,
                    agentOrderId: this.form.agentOrderId
                }
            }).then(res => {
                console.log(res);
                this.$message({
                    type: 'success',
                    message: '操作成功!'
                });
                this.editVisible = false;
                this.initPageData();
            }).catch(error => {
                console.log(error);
            });
        },
        reviseInfo() {
            this.showReviseForm = true;
        },
        beforeUpload(file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.imgUrl = reader.result;
            };
            return false;
        },
        updatePayerInfo() {
            if (this.imgUrl === '') {
                this.$message({
                    type: 'error',
                    message: '上传凭证不能为空!'
                });
            } else {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$http.post({
                            url: '/wfbs-console/order/uploadVoucher',
                            data: {
                                agentOrderId: this.form.agentOrderId,
                                payBankNo: this.form.payBankNo,
                                payTimeS: this.form.payTime,
                                payerName: this.form.payerName,
                                payerCardNo: this.form.payerCardNo,
                                paymentVoucher: this.imgUrl.replace(/^data:image\/\w+;base64,/, '')
                            }
                        }).then(res => {
                            console.log(res);
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            });
                            this.editVisible = false;
                            this.initPageData();
                        }).catch(error => {
                            console.log(res);
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        auditOrder(type) {
            if (type === 0) {
                this.passOrder(this.form);
            } else {
                this.$http.post({
                    url: '/wfbs-console/order/updateAuditFail',
                    data: {
                        agentOrderId: this.form.agentOrderId,
                        remark: this.form.remark
                    }
                }).then(res => {
                    this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.editVisible = false;
                            this.initPageData(); 
                        }
                    });
                }).catch(error => {
                    console.log(error);
                })
            }
        },
        deliverGoods() {
            this.$http.post({
                url: '/wfbs-console/order/updatedeliverGoods',
                data: {
                    agentOrderId: this.form.agentOrderId,
                    logisticsName: this.form.logisticsName,
                    logisticsNo: this.form.logisticsNo
                }
            }).then(res => {
                this.$alert('操作成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.editVisible = false;
                        this.initPageData(); 
                    }
                });
            }).catch(error => {
                console.log(error);
            });
        },
        returnGoods() {
            this.$http.post({
                url: '/wfbs-console/order/updateReturnGoods',
                data: {
                    agentOrderId: this.form.agentOrderId,
                }
            }).then(res => {
                this.$alert('操作成功', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.editVisible = false;
                        this.initPageData(); 
                    }
                });
            }).catch(error => {
                console.log(error);
            });
        }
    }
}

// var paramsData = {
//     'meta': {
//       // 'appKey': 'vj5DYRpZ',
//       // 'accessToken': 'EOfaAAM8Qn-rk8zmg1wjUQ'
//       'appKey': localStorage.getItem('appKey'),
//       'accessToken': localStorage.getItem('accessToken')
//     },
//     'data': data
//   };
//   if (page) {
//     paramsData.page = page;
//   }
//   key = CryptoJS.enc.Base64.parse('y4fqVJFxKi6dwfaMHNgfAQ==');
//
//   var stringData = JSON.stringify(paramsData);
//
//   // 签名
//   // sign = SHA256(stringData);
//   // console.log(sign);
//   sign = CryptoJS.SHA256(stringData).toString();
//   console.log(sign);
//   // AES加密
//   var encryptedData = CryptoJS.AES.encrypt(stringData, key, {
//     mode: CryptoJS.mode.ECB
//   });
//   return sign + encryptedData.toString();

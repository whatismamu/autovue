export default {
    data() {
        return {
            ok:true,
            todo: '',
            list: [],
            editVisible: false,
            page: {
                curPage: 1,
                curPageSize: 10,
                totalSize: 1,
                result: []
            },
            dialogTitle: '添加',  //添加、查看、修改
            //前端需要清空的话需要这里和vue里的prop和model命名一样
            searchForm: {
                authstatus: '',
                account:'13764906431',
                password:'a111111',
                phoneNo: '',
                IS_AUTH: '',
                ORG_NAME:'',
            },
            //弹窗的字段，然后也要在vue文件里写入才会弹，然后传到后台
            dialogForm: {
                idcardzheng: '',
                idcardfan: '',
                handorface: '',
                ORG_NAME: '',
                switchState: '',
                advertisementId: '',
                ERROR_IMAGE_NO_ONE:'',
                ERROR_IMAGE_NO_TWO:'',
                ERROR_IMAGE_NO_THREEE:'',
                ENC_PHONE_NO:''
            },
            selectedRow: '',  //必须定义否则无法获取到这条数据的字段
        }
    },
    computed: {
        disabled() {
            return this.dialogTitle === '查看' ? true : false;
        }
    },
    filters: {
        formatterIsauth(data) {
            let AUDIT_STATUS = '';
            switch (data) {
                case '01':
                    AUDIT_STATUS = '已提交';
                    break;
                case '00':
                    AUDIT_STATUS = '已通过';
                    break;
                case '02':
                    AUDIT_STATUS = '未认证';
                    break;
                default:
                    AUDIT_STATUS = '未实名';
                    break;
            }
            return AUDIT_STATUS;
        }
    },
    created(){
        this.$nextTick(() => {
            this.initPageData();
        });
    },
    methods: {

        formatterIsAuth(row, cloumn) {
            // console.log(row.IS_AUTH);
            if (row.IS_AUTH === '1') {
                    return '已实名';
                }
                if (row.AUDIT_STATUS === '00'){
                    return '审核通过';
                }
                if (row.AUDIT_STATUS === '02'){
                    return '未认证';
                }
                else{
                    return '未认证';
                }
        },
        formatterRealNameType(row, cloumn) {
            if (row.REAL_NAME_TYPE === '1') {
                    return '手持';
                }
                else{
                    return '人脸';
                }
        },
        formatterFreezeStatus(row, cloumn) {
            if (row.FREEZE_STATUS === '01') {
                    return '正常';
                }
            if (row.FREEZE_STATUS === '02'){
                return '冻结';
            }
            if (row.FREEZE_STATUS === '03'){
                return '待解冻';
            }
            else{
                return '正常';
            }
        },
        formatterBalance(row, cloumn) {
            if (row.BALANCE !== null) {
                    return row.BALANCE;
                }
            else{
                return '0';
            }
        },
        doadd(e) {
				//console.log(e);
            // const info = { name: 'hou', age: 24, id: '001' };
            // const str="haha";
            // localStorage.setItem('hou', JSON.stringify(info));
            // localStorage.setItem('zheng', str);
            console.log(e.keyCode);
				if(e.keyCode == 13) {
					this.list.push({
						title: this.todo,
						checked: false
					});
				}

				//JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
				//保存列表数据
				//				localStorage.setItem('list', JSON.stringify(this.list));

				//用封装
				storage.set('list', this.list);
			},
        resetForm() {
            this.$refs.searchForm.resetFields();
        },
        search() {
            this.page.curPage = 1;
            this.initPageData();
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
        reanNameauth(row) {
            this.showDetail(row);
        },
                passAuditstatus(row) {
            // console.log(row);
            // if (row.AUDIT_STATUS ==null) {
            //     console.log(66666)
            // }
            // else {console.log(11111)}
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
                    url: '/shop/orgauth/',
                    data: {
                        agentorgid: row.ORG_ID,
                        phone:row.USER_NAME
                    }
                }).then(res => {
                    console.log(res);
                    loading.close();
                    if (!res['data'].message )
                    {
                        // console.log(200);
                    this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.initPageData();
                        }
                    });
                }
                    else {
                        // console.log(500);
                        this.$message({
                        type: 'error',
                        message: res['data']['message']
                    }
                    );
                        this.initPageData();
                    }
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
        passBuy(row) {
            // console.log(row);
            // if (row.AUDIT_STATUS ==null) {
            //     console.log(66666)
            // }
            // else {console.log(11111)}
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
                // if (!row.ORG_ID) {

                this.$http.post({
                    url: '/shop/orderbuy/',
                    data: {
                        agentorgid: row.ORG_ID,
                        phone:row.USER_NAME
                    }
                }).then(res => {
                    console.log(res['data']);
                    loading.close();
                    if (!res['data'].message )
                    {
                        console.log(200);
                    this.$alert('操作成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.initPageData();
                        }
                    });
                }
                    else {
                        console.log(500);
                        this.$message({
                        type: 'error',
                        message: res['data']['message']
                    }
                    );
                        this.initPageData();
                    }
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
        showDialog(type) {
            if (type === 0) {
                this.dialogTitle = '添加';
                this.editVisible = true;
            } else {
                // console.log(type);
                console.log('走查看type');
                type === 1 ? this.dialogTitle = '查看' : this.dialogTitle = '修改';
                console.log(this.selectedRow);
                if (this.selectedRow !== '') {
                    // var data='';
                    // this.selectedRow.AUTH_CARD_NO =data;
                    // console.log(data);
                    // this.dialogForm=Object.keys(this.dialogForm).map(key => this.dialogForm = this.selectedRow);
                    this.dialogForm = Object.assign({}, this.selectedRow);
                    // console.log(this.dialogForm);
                    this.editVisible = true;
                } else {
                    console.log('没有选择记录通道');
                    this.$alert('请选择一条记录', '提示', {
                      confirmButtonText: '确定'
                    });
                }
            }
        },
        initPageData() {
            const token = localStorage.getItem('token');
            console.log(555);
            console.log(token);
            this.$http.initPageData('/shop/Realnameauthdata/', this);
        },
        //需要走dilogform时默认显示数据就必须增加rowclick获取这条数据的字段
        rowClick(row, event) {
            this.selectedRow = row;
        },
        rowDblclick(row, event) {
            this.selectedRow = row;
            this.showAddDialog(1);
        },
        handleSizeChange(size){
            this.page.curPageSize = size;
            this.initPageData();
        },
        handleCurrentChange(val) {
            this.page.curPage = val;
            this.initPageData();
        },
        closeDialog() {
            this.$refs.dialogForm.resetFields();
        },

        submitForm(formName) {
            const token = localStorage.getItem('token');
            console.log(6666);
            console.log(token);
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$http.post({
                    url: '/shop/UpdateRealStatus/',
                    data: this.dialogForm
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: res['data']['message']
                    });
                    this.editVisible = false;
                    this.initPageData();
                }).catch(error => {
                    console.log(error);
                });
              } else {
                return false;
              }
            });
        }
    }
}

export default {
    name: 'testCode',
    data() {
        return {
            ok:true,
            todo: '',
            list: [],
            editVisible: false,
            editVisible1: false,
            page: {
                curPage: 1,
                curPageSize: 10,
                totalSize: 1,
                result: []
            },
            //前端需要清空的话需要这里和vue里的prop和model命名一样
            searchForm: {
                authstatus: '1',
                account:'15201704952',
                password:'a111111',
                phoneNo: '',
                termno: '',
                termstatus:'',
            },
            //弹窗的字段，然后也要在vue文件里写入才会弹，然后传到后台
            dialogForm: {
                toagentid: '',
                fromagentid: '',
                termno:'',
            },
            dialogForm1: {
                phoneNumber: '',
                shopId: '',
                DEV_NO: '',
                OD_NAME:'',
                DEV_STATUS:'',
                changeOdName:'',
                DEPOSIT_MARK:'',
                deviceActivity:''
            },
            selectedRow: '',
            deviceActivity:'',
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

        formatterisKeyDown(row, cloumn) {
            // console.log(row.IS_AUTH);
            if (row.IS_KEY_DOWN === '1') {
                    return '已下载';
                }
                if (row.IS_KEY_DOWN === '0'){
                    return '未下载';
                }
                if (row.IS_KEY_DOWN === '02'){
                    return '未认证';
                }
                else{
                    return '未认证';
                }
        },
        formatterENC_CER_NO(row, cloumn) {
            if (row.ENC_CER_NO === '数据错误' && row.IS_AUTH !=='1') {
                    return '未实名';
                }
            if(row.IS_AUTH ==='1'){
                return row.ENC_CER_NO;
            }
                else{
                    return '数据错误';
                }
        },
        formatterUserType(row, cloumn) {
            if (row.USER_TYPE === '01') {
                    return '销售代表';
                }
                else{
                    return '服务商';
                }
        },
        formatterDebitRate(row, cloumn) {
            if (row.CASH_STATUS==='02' ) {
                    return '已交押金';
                }
            if (row.CASH_STATUS === '01'){
                return '未支付';
            }
            if (row.CASH_STATUS === '03'){
                return '已退还 ';
            }
            else{
                return '脏数据';
            }
        },
        formatterDebitFeetop(row, cloumn) {
            if (row.DEBIT_FEETOP ) {
                    return row.DEBIT_FEETOP;
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
        createqAccount(row) {
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
        TermMiss(row) {
            // console.log(row);
            // if (row.AUDIT_STATUS ==null) {
            //     console.log(66666)
            // }
            // else {console.log(11111)}
            this.$confirm('确认解绑?', '提示', {
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
                    url: '/epos/EposTermMiss/',
                    data: {
                        MERC_NO: row.MERC_NO,
                        TERMPHY_NO:row.TERMPHY_NO
                    }
                }).then(res => {
                    console.log(res['data']);
                    loading.close();
                    if (!res['data'].message )
                    {
                        console.log(200);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.editVisible = false;
                    this.initPageData();
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
                console.log(type);
                console.log(this.searchForm);
                this.dialogTitle = '创建Q刷账号';
                this.$http.post({
                    url: '/epos/CreateEposShop/',
                    data: this.searchForm
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
            }
            else if (type===3) {
                console.log(type);
                this.dialogTitle = '机具入库';
                console.log(this.selectedRow);
                if (this.selectedRow !== '') {

                    this.$http.post({
                        url: '/shbzs/ShbzsDeviceActivityList/',
                        data: {
                            devno:this.selectedRow['TERMPHY_NO'],
                            orgid:this.selectedRow['AGENT_NO']
                        }
                    }).then(res => {
                        if (res.data.result) {

                            this.deviceActivity = res.data.result;
                            console.log(this.deviceActivity);
                        } else {
                            this.deviceActivity = '';
                        }
                    }).catch(error => {
                        console.log(error);
                        // this.$message.error('未获取到【支付渠道】')
                    });
                    // var data='';
                    // this.selectedRow.AUTH_CARD_NO =data;
                    // console.log(data);
                    // this.dialogForm=Object.keys(this.dialogForm).map(key => this.dialogForm = this.selectedRow);
                    // this.dialogForm = Object.assign({}, this.selectedRow);
                    Object.keys(this.dialogForm1).map(key => this.dialogForm1[key] = this.selectedRow[key]);
                    this.dialogForm1['DEV_NO'] = this.selectedRow['TERMPHY_NO'];
                    this.dialogForm1['shopId'] = this.selectedRow['MERC_NO'];
                    this.dialogForm1['deviceActivity'] = this.deviceActivity['deviceactivityName'];

                    console.log(this.dialogForm1);
                    this.editVisible1 = true;

                    // this.allChild = '';
                    // 获取渠道列表



                } else {
                    console.log('没有选择记录通道');
                    this.$alert('请选择一条记录', '提示', {
                      confirmButtonText: '确定'
                    });
                }

            }
            else {
                // console.log(type);
                console.log('走查看type');
                console.log(type);
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
            console.log(66666);
            console.log(token);
            this.$http.initPageData('/epos/EposTermInfo/', this);
        },
        //需要走dilogform时默认显示数据就必须增加rowclick获取这条数据的字段,vuebaseTable也需要加上rowClick属性获取这条数据的字段
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
                    url: '/epos/EposTermTransfer/',
                    data: this.dialogForm
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
              } else {
                return false;
              }
            });
        },
        submitForm1(formName) {
            const token = localStorage.getItem('token');
            console.log(6666);
            console.log(token);
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http.post({
                    url: '/shbzs/ShbzsaddTerm/',
                    data: this.dialogForm1
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.editVisible1 = false;
                    loading.close();
                    this.initPageData();
                }).catch(error => {
                    loading.close();
                    console.log(error);
                });
              } else {
                return false;
              }
            });
        },
    }
}

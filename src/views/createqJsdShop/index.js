export default {
    name: 'testCode',
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
            //前端需要清空的话需要这里和vue里的prop和model命名一样
            searchForm: {
                authstatus: '1',
                account:'15201704952',
                password:'a111111',
                phoneNo: '',
                IS_AUTH: '',
            },
            //弹窗的字段，然后也要在vue文件里写入才会弹，然后传到后台
            dialogForm: {
                DEV_NO: '',
                shopId: '',
                phoneNumber: '',
                imageLinkAddr: '',
                switchState: '',
                ORG_ID: '',
                advertisementId: ''
            },
            selectedRow: '',
            modal2: false,
            modal_loading: false,
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
            if (row.CASH_STATUS==='02' ) {
                    return '已绑定';
                }
            if (row.CASH_STATUS === '01'){
                return '已绑定';
            }
            if (row.CASH_STATUS === '03'){
                return '已绑定 ';
            }
            else{
                return '未绑定';
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
                return '未绑定';
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
        deleteShopRecord(row) {
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
                    url: '/epos/EposDeleteShopcash/',
                    data: {
                        MERC_NO: row.MERC_NO,
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
        termMiss(row) {
            // console.log(row);
            // if (row.AUDIT_STATUS ==null) {
            // }
            // else {console.log(11111)}
            this.$confirm('确认通过?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                console.log(66666)
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                // if (!row.ORG_ID) {

                this.$http.post({
                    url: '/jsd/TermMiss/',
                    data: {
                        SHOP_ID: row.SHOP_ID,
                        DEV_NO:row.DEV_NO,
                        ORG_ID:row.ORG_ID,
                        OD_NAME:row.OD_NAME
                    }
                }).then(res => {
                    // console.log(res);
                    this.$message({
                        type: 'success',
                        message: res['data']['message']['content']
                        // message: 111111
                    });
                    this.editVisible = false;
                    loading.close();
                    this.initPageData();
                }).catch(error => {
                    console.log(error);
                    loading.close()
                });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消操作'
              });
            });
        },
        initShopStatus(row) {
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
                    url: '/epos/InitShopStatus/',
                    data: {
                        MERC_NO: row.MERC_NO,
                        TERMPHY_NO:row.TERMPHY_NO,
                        DEV_NO:row.TERMPHY_NO
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
                        this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = true;
                    this.modal2 = true;
                    this.$Message.success('Successfully init');
                }, 2000);
                        console.log(res['data']['message']);
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
                const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                this.dialogTitle = '创建Q刷账号';
                this.$http.post({
                    url: '/jsd/CreateJsdShop/',
                    data: this.searchForm
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: res['data']['message']['content']
                    });
                    this.editVisible = false;
                    loading.close();
                    this.initPageData();
                }).catch(error => {
                     loading.close();
                    console.log(error);
                });
            } else {
                type === 1 ? this.dialogTitle = '查看' : this.dialogTitle = '绑定终端';
                if (this.selectedRow !== '') {
                    Object.keys(this.dialogForm).map(key => this.dialogForm[key] = this.selectedRow[key]);
                    this.dialogForm['phoneNumber'] = this.selectedRow['ENC_SHOP_PHONE'];
                    this.dialogForm['shopId'] = this.selectedRow['SHOP_ID'];
                    this.editVisible = true;
                } else {
                    this.$alert('请选择一条记录', '提示', {
                      confirmButtonText: '确定'
                    });
                }
            }
        },
        //需要走dilogform时默认显示数据就必须增加rowclick获取这条数据的字段,vuebaseTable也需要加上rowClick属性获取这条数据的字段
        rowClick(row, event) {
            console.log(row);
            this.selectedRow = row;
        },
        rowDblclick(row, event) {
            this.selectedRow = row;
            this.showAddDialog(1);
        },
        initPageData() {
            const token = localStorage.getItem('token');
            console.log(66666);
            console.log(token);
            this.$http.initPageData('/jsd/JsdShop/', this);
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
                  const loading = this.$loading({
                  lock: true,
                  text: 'Loading',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$http.post({
                    url: '/jsd/Bindterm/',
                    data: this.dialogForm
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.editVisible = false;
                    loading.close()
                    this.initPageData();
                }).catch(error => {
                    this.editVisible = false;
                    loading.close()
                    console.log(error);
                });
              } else {
                return false;
              }
            });
        }
    }
}

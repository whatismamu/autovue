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
            addForm: {
                phone_type:'',
                bumen:'',
                name:''
            },
            //弹窗的字段，然后也要在vue文件里写入才会弹，然后传到后台
            dialogForm: {
                toagentid: '',
                fromagentid: '',
                termno:'',
            },
            selectedRow: '',
            addFormrules: {
                phone_type:[
                    {required:true,message:'请填写手机类型',trigger:'change'}
                ],
                bumen:[
                    {required:true,message:'请填写出借部门',trigger:'change'}
                ],
                name:[
                    {required:true,message:'请填写姓名',trigger:'change'}
                ]
            }
        }
    },
    filters: {
        formatterIsauth(data) {
            let jie_status = '';
            switch (data) {
                case '1':
                    jie_status = '已通过';
                    break;
                case '2':
                    jie_status = '审核拒绝';
                    break;
                case '02':
                    jie_status = '未认证';
                    break;
                default:
                    jie_status = '未实名';
                    break;
            }
            return jie_status;
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
            if (row.jie_status === '0') {
                    return '未通过';
                }
                if (row.jie_status === '1'){
                    return '已通过';
                }
                if (row.IS_KEY_DOWN === '2'){
                    return '审核拒绝';
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
        phoneApprove(row) {
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
                    url: '/jiephone/PhoneApprove/',
                    data: {
                        order_sn: row.order_sn,
                        approvestasus:'1'
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
                if (this.addForm !== '') {
                    // var data='';
                    // this.selectedRow.AUTH_CARD_NO =data;
                    // console.log(data);
                    // this.dialogForm=Object.keys(this.dialogForm).map(key => this.dialogForm = this.selectedRow);
                    this.addForm = Object.assign({}, this.addForm);
                    // console.log(this.dialogForm);
                    this.editVisible1 = true;
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
            this.$http.initPageData('/jiephone/PhoneRecorShendList/', this);
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
            if (formName==='dialogForm'){
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
            });}
            else {
                console.log('走addForm通道');
                const token = localStorage.getItem('token');
            console.log(6666);
            console.log(token);
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$http.post({
                    url: '/jiephone/PhoneShenQing/',
                    data: this.addForm
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.editVisible1 = false;
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
}

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
                account:'13764906431',
                password:'a111111',
                phoneNo: '',
                IS_AUTH:'',
                odName:''
            },
            //弹窗的字段，然后也要在vue文件里写入才会弹，然后传到后台
            dialogForm: {
                image: '',
                adType: '',
                imagePath: '',
                imageLinkAddr: '',
                switchState: '',
                advertisementId: ''
            },
            odList:[]
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
            this.queryOdList();
        });
    },
    methods: {
        queryOdList() {
            this.$http.post({
                url: '/shop/GetOdList/',
                data: ''
            }).then(res => {
                // console.log(11111);
                console.log(res.data['message']);
                // console.log(222222);
                this.odList = res.data['message'];
            }).catch(error => {
                console.log(error);
            });
        },
        formatterDataStatus(row, cloumn) {
            // console.log(row.IS_AUTH);
            if (row.DATA_STATUS === '0') {
                    return '解绑';
                }
                if (row.DATA_STATUS === '1'){
                    return '已绑定';
                }
                else{
                    return '未认证';
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
        formatterAuditStatus(row, cloumn) {
            if (row.AUDIT_STATUS === '01') {
                    return '已提交';
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
                console.log(type);
                console.log(this.searchForm);
                this.dialogTitle = '创建Q刷+账号';
                this.$http.post({
                    url: '/shop/createshop/',
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
            } else {
                type === 1 ? this.dialogTitle = '查看' : this.dialogTitle = '修改';
                if (this.selectedRow !== '') {
                    Object.keys(this.dialogForm).map(key => this.dialogForm[key] = this.selectedRow[key]);
                    this.editVisible = true;
                } else {
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
            this.$http.initPageData('/goods/snippets/', this);
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
                    url: '/goods/snippetssss',
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
        }
    }
}

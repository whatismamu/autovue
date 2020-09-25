export default {
    name: 'testCode',
    data() {
        return {
            editVisible: false,
            page: {
                curPage: 1,
                curPageSize: 10,
                totalSize: 1,
                result: []
            },
            //前端需要清空的话需要这里和vue里的prop和model命名一样
            searchForm: {
                orgid: '',
                dev_no: ''
            },
            //弹窗的字段，然后也要在vue文件里写入才会弹，然后传到后台
            dialogForm: {
                image: '',
                adType: '',
                imagePath: '',
                imageLinkAddr: '',
                switchState: '',
                advertisementId: ''
            }
        }
    },
    created(){
        this.$nextTick(() => {
            this.initPageData();
        });
    },
    methods: {
        formatterStatus(row, cloumn) {
            // console.log(row.IS_AUTH);
            if (row.PREFERENTIA_MARK === '1') {
                    return '押金机具';
                }
                if (row.PREFERENTIA_MARK === '0'){
                    return '无押金机具';
                }
                else{
                    return '未知类型';
                }
        },
        resetForm() {
            this.$refs.searchForm.resetFields();
        },
        search() {
            this.page.curPage = 1;
            this.initPageData();
        },
        showDialog(type) {
            if (type === 3) {
                console.log(type);
                console.log(this.searchForm);
                this.dialogTitle = '调拨机具';
                this.$http.post({
                    url: '/shop/Diao/',
                    data: this.searchForm
                }).then(res => {
                    console.log(res);
                    if (!res['data'].code ){
                        console.log(111);
                    this.$message({
                        type: 'success',
                        message: res['data']['message']
                    });}
                    else {
                        console.log(222);
                        this.$message({
                        type: 'error',
                        message: res['data']['message']
                    });
                    }
                    this.editVisible = false;
                    // this.initPageData();
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
            // console.log(66666);
            // console.log(token);
            this.$http.initPageData('/goods/Devnodata/', this);
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
        changetype(row) {
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
                    url: '/goods/Changetype/',
                    data: {
                        DEV_NO: row.DEV_NO,
                        PREFERENTIA_MARK: row.PREFERENTIA_MARK,
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
        submitForm(formName) {
            const token = localStorage.getItem('token');
            console.log(6666);
            console.log(token);
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$http.post({
                    url: '/shop/Diao/',
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

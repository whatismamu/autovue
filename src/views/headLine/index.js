export default {
    data() {
        return {
            editVisible: false,
            page: {
                curPage: 1,
                curPageSize: 10,
                totalSize: 1,
                result: []
            },
            searchForm: {
                odName: ''
            },
            dialogTitle: '添加',  //添加、查看、修改
            dialogForm: {
                odName: '',
                messageContent: '',
                url: '',
                dataStatus: ''
            },
            dialogFormRules: {
                odName: [
                    { required: true, message: '请选择O单名称', trigger: 'change' }
                ],
                messageContent: [
                    { required: true, message: '请输入消息内容', trigger: 'blur' }
                ],
                dataStatus: [
                    { required: true, message: '请选择数据状态', trigger: 'change' }
                ]
            },
            selectedRow: '',
            odList: []
        }
    },
    computed: {
        disabled() {
            return this.dialogTitle === '查看' ? true : false;
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
                url: '/wfbs-console/comm/selectOdSigns',
                data: {}
            }).then(res => {
                console.log(res);
                this.odList = res.data.result;
            }).catch(error => {
                console.log(error);
            });
        },
        formatterStatus(row, cloumn) {
            if (row.dataStatus === '1') {
                return '有效';
            } else if (row.dataStatus === '0') {
                return '无效';
            } else {
                return '未知状态';
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
            if (type === 0) {
                this.dialogTitle = '添加';
                this.editVisible = true;
            } else {
                type === 1 ? this.dialogTitle = '查看' : this.dialogTitle = '修改';
                if (this.selectedRow !== '') {
                    this.dialogForm = Object.assign({}, this.selectedRow);
                    this.editVisible = true;
                } else {
                    this.$alert('请选择一条记录', '提示', {
                      confirmButtonText: '确定'
                    });
                }
            }
        },
        initPageData() {
            this.$http.initPageData('/wfbs-console/dynamicMessage/selectDynamicMessages/', this);
            // this.$http.post({
            //     url: '/wfbs-console/dynamicMessage/selectDynamicMessages',
            //     data: this.searchForm,
            //     page: {
            //         pageNumber: this.page.curPage,
            //         pageSize: this.page.curPageSize
            //     }
            // }).then(res => {
            //     console.log(res);
            //     this.page.result = res.data.result;
            //     this.page.totalSize = res.data.page.totalElements;
            // }).catch(error => {
            //     console.log(error);
            // });
        },
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
            let params_id = this.dialogTitle === '添加' ? '' : this.dialogForm.id;
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.$http.post({
                    url: '/wfbs-console/dynamicMessage/addOrUpdateDynamicMessage',
                    data: {
                        odName: this.dialogForm.odName,
                        messageContent: this.dialogForm.messageContent,
                        url: this.dialogForm.url,
                        dataStatus: this.dialogForm.dataStatus,
                        id: params_id
                    }
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.editVisible = false;
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

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
                phoneNo: '',
                messagetype: ''
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
            srcOrderNoArr: {
      phone: '', // 这个必须要有
        }
    }},
    created(){
        console.log(1);
        this.$nextTick(() => {
            this.initPageData();

        });
    },
    methods: {
        /**
   * 把搜索记录存入localStorage
   */
  setIntoStorage (searchForm) {
   let self = this.searchForm;
   console.log(this.searchForm);
   console.log(self.phoneNo);
   let noArr = [], // 订单号历史记录数组
       value = '13710043891';
   switch (searchForm) {

    case '13710043891':
        console.log(searchForm.phoneNo);
     // text = 'phoneNo';
     value = self.phoneNo;
     break;
    default:
     break
   }
   noArr.push({phone: value});
   console.log(noArr);
   // if(JSON.parse(localStorage.getItem(text))) { // 判断是否已有xxx查询记录的localStorage
   //  if(localStorage.getItem(text).indexOf(value) > -1 ) { // 判断是否已有此条查询记录，若已存在，则不需再存储
   //   return
   //  }
   //  if(JSON.parse(localStorage.getItem(text)).length >= 5) {
   //   let arr = JSON.parse(localStorage.getItem(text))
   //   arr.pop()
   //   localStorage.setItem(text, JSON.stringify(arr))
   //  }
   //  localStorage.setItem(text, JSON.stringify(noArr.concat(JSON.parse(localStorage.getItem(text)))))
   // }
   // else { // 首次创建
   //     console.log(text);
    localStorage.setItem('phone',JSON.stringify(noArr))
   // }
  },
        resetForm() {
            this.$refs.searchForm.resetFields();
        },
        search() {
            this.setIntoStorage();
            this.page.curPage = 1;
            this.initPageData();
        },
        showDialog(type) {
            if (type === 3) {
                console.log(type);
                console.log(this.searchForm);
                this.dialogTitle = '查询验证码';
                this.$http.post({
                    url: '/goods/Testyan/',
                    data: this.searchForm
                }).then(res => {
          //           console.log(res);
          //           this.$alert(res['data']['message'], '返回信息', {
          // confirmButtonText: '确定',
          //               callback: res => {
          //     this.$message({
          //         type: 'success',
          //         message: '操作成功',
          //         });
              // }

                    this.$message({
                        type: 'success',
                        message: res['data']['message']
                    });
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

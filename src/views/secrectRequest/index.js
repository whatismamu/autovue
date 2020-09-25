export default {
    name: 'produceCode',
    data() {
        return {
            searchForm: {
                address: '',
                messagetype: '',
                requestdata:'',
            }
        }
    },
    created(){
    },
    methods: {
        search(searchForm) {
            console.log(1);
            const token = localStorage.getItem('token');
            // console.log(6666);
            console.log(token);
                this.$http.post({
                    url: '/shop/SecrectRequest/',
                    data: this.searchForm
                }).then(res => {
                    console.log(res);

                    this.$alert(res['data']['message'], '返回信息', {
          confirmButtonText: '确定',
                        callback: res => {
              this.$message({
                  type: 'success',
                  message: '操作成功',
                  });
              }
                    // this.$message({
                    //     type: 'success',
                    //     message: res['data']['message'],
                    });
                    this.editVisible = false;
                    // this.initPageData();
                }).catch(error => {
                    console.log(error);
                });
              }
    }
}

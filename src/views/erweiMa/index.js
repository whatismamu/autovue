export default {
    name: 'produceCode',
    data() {
        return {
            searchForm: {
                phoneNo: '',
                messagetype: ''
            },
            odlist:['zgb', 'jsd', 'qshb', 'qsj'],
            images:[
                {"src":"https://uenpay.com/downloadcopy/jsd/down-jsd.html","name":"jsd测试环境"},
                {"src":"https://uenpay.com/downloadcopy/zgb/down-zgb.html","name":"zgb测试环境"},
                {"src":"https://uenpay.com/downloadcopy/qsj/down-qsj.html","name":"qsj测试环境"},
                {"src":"https://uenpay.com/downloadcopy/qshb/down-qshb.html","name":"qshb测试环境"},
                {"src":"https://uenpay.com/downloadcopy/sxzs/down-sxzs.html","name":"xuzs测试环境"},
                {"src":"https://uenpay.com/downloadcopy/sxzf/down-sxzf.html","name":"sxzf测试环境"},
                {"src":"https://uenpay.com/downloadcopy/jzs/down-jzs.html","name":"jzs生产环境"},
                {"src":"https://uenpay.com/downloadcopy/jsdp/down-jsdp.html","name":"jsdp生产环境"},
                {"src":"https://uenpay.com/downloadcopy/dgj/down-dgj.html","name":"dgj生产环境"},
                {"src":"https://uenpay.com/downloadcopy/dzgp/down-dzgp.html","name":"dzgp生产环境"},
                {"src":"https://uenpay.com/downloadcopy/sxzs/down-sxzs.html","name":"sxzs生产环境"},
                {"src":"https://uenpay.com/downloadcopy/sxzf/down-sxzf.html","name":"sxzf生产环境"},
            ],
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
                    url: '/goods/SCTestyan/',
                    data: this.searchForm
                }).then(res => {
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: res['data']['message'],
                    });
                    this.editVisible = false;
                    // this.initPageData();
                }).catch(error => {
                    console.log(error);
                });
              }
    }
}

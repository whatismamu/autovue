export default {
    name: 'produceCode',
    data() {
        return {
            components: {
    Icon
  },
            searchForm: {
                phoneNo: '',
                messagetype: ''
            },
            odlist:['zgb', 'jsd', 'qshb', 'qsj'],
            images:[
                {"src":"src/assets/jsd.png","name":"jsd测试环境"},
                {"src":"src/assets/zgb.png","name":"zgb测试环境"},
                {"src":"src/assets/qsj.png","name":"qsj测试环境"},
                {"src":"src/assets/qshb.png","name":"qshb测试环境"},
                {"src":"src/assets/uzs.png","name":"xuzs测试环境"},
                {"src":"src/assets/sfb.png","name":"sfb测试环境"},
                {"src":"src/assets/jsds.png","name":"jsd生产环境"},
                {"src":"src/assets/zgbs.png","name":"zgb生产环境"},
                {"src":"src/assets/qsjs.png","name":"qsj生产环境"},
                {"src":"src/assets/qshbs.png","name":"qshb生产环境"},
                {"src":"src/assets/uzss.png","name":"xuzs生产环境"},
                {"src":"src/assets/sfbs.png","name":"sfb生产环境"},
            ]
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

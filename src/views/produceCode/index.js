import Vue from "vue";
import VueQriously from "vue-qriously";

Vue.use(VueQriously)
export default {
    name: 'produceCode',
    data() {
        return {
            searchForm: {
                phoneNo: '',
                messagetype: ''
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

webpackJsonp([14],{"3NQu":function(e,t){},ISRS:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"produceCode",data:function(){return{searchForm:{phoneNo:"",messagetype:""}}},created:function(){},methods:{search:function(e){var t=this;console.log(1);var a=localStorage.getItem("token");console.log(a),this.$http.post({url:"/goods/SCTestyan/",data:this.searchForm}).then(function(e){console.log(e),t.$message({type:"success",message:e.data.message}),t.editVisible=!1}).catch(function(e){console.log(e)})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table"},[a("el-form",{ref:"searchForm",attrs:{model:e.searchForm}},[a("el-form-item",{attrs:{label:"短信类型：",prop:"adType"}},[a("el-select",{attrs:{placeholder:"请选择短信类型"},model:{value:e.searchForm.messagetype,callback:function(t){e.$set(e.searchForm,"messagetype",t)},expression:"searchForm.messagetype"}},[a("el-option",{attrs:{label:"代理商注册",value:"100001"}}),e._v(" "),a("el-option",{attrs:{label:"代理商忘记密码",value:"100002"}}),e._v(" "),a("el-option",{attrs:{label:"商户注册",value:"100003"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号码：",prop:"odName"}},[a("el-input",{staticStyle:{width:"auto"},attrs:{placeholder:"请填写手机号码"},model:{value:e.searchForm.phoneNo,callback:function(t){e.$set(e.searchForm,"phoneNo",t)},expression:"searchForm.phoneNo"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(o,s,!1,function(e){a("3NQu")},"data-v-a22fa6a4",null);t.default=r.exports}});
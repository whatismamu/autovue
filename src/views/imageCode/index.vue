<template>
    <div class="table">
        <div style="display: flex">
            <div class="c_img" v-for="image in images" style="text-align: center" >
                <img :src="image.src" alt="" width="100px" height="100px" >
                <p>{{image.name}}</p>
            </div>
        </div>
         <!--<div style="display: flex">-->
            <!--<div class="c_img" v-for="image in images" style="text-align: center" >-->
                <!--<img :src="image.src" alt="" width="100px" height="100px" >-->
                <!--<p>{{image.name}}测试环境</p>-->
            <!--</div>-->
        </div>

            <!--<div class="c_img1" v-for="od in odlist" >-->
                <!--&lt;!&ndash;<p>{{od}}</p>&ndash;&gt;-->
                <!--<div class="c_words1">{{ od }}生产二维码</div>-->
                <!--<img src="@/assets/jsd.png" alt="" width="100px" height="100px" >-->
            <!--</div>-->
            <!--<img src="@/assets/jsd.png" alt="" width="200">-->
            <!--<img src="@/assets/jsd.png" alt="" width="200">-->
            <!--<img src="@/assets/jsd.png" alt="" width="200">-->
            <!--<img src="@/assets/jsd.png" alt="" width="200">-->
            <!--<img src="@/assets/jsd.png" alt="" width="200">-->
    <!--</div>-->
</template>
<script src="./index.js">
</script>
<style scoped>
    @import "./index.css";
</style>

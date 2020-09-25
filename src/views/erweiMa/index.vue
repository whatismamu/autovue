<template>

    <div class="table">
    <div style="display: flex">
        <div class="c_img" v-for="image in images" style="text-align: center" >
            <qriously :value="image.src"  level="H" :size="100" />
            <p>{{image.name}}</p>
            <v-icon name="beer"/>
            <v-icon name="sync" scale="2" spin/>
<v-icon name="comment" flip="horizontal"/>
<v-icon name="code-branch" label="Forked Repository"/>
        </div>
    </div>
    </div>

</template>
<script src="./index.js">
</script>
<style scoped>
    @import "./index.css";
</style>

<template>
    <div class="tags" v-if="showTags">
        <div class="slide_btn_wrap slide_btn_left" @click="slide('left')">
        </div>
        <div class="tag_wrap" ref="tagelemnt"  @scroll="paperScroll">
            <ul>
                <li class="tags-li"
                    :ref="item.id"
                    v-for="(item,index) in tagsList"
                    :class="{'active': isActive(item.path)}"
                    :key="index">
                    <router-link :to="item.path" class="tags-li-title">
                        {{item.title}}
                    </router-link>
                    <span class="tags-li-icon" @click="closeTags(index)" v-show="item.title.indexOf('首页')  === -1"><i class="el-icon-close"></i></span>
                </li>
            </ul>
        </div>
        <div class="slide_btn_wrap slide_btn_right" @click="slide('right')">
        </div>
    </div>
</template>

<script>
    import bus from './bus';
    export default {
        data() {
            return {
                tagsList: [],
                scrollLeft: 0,
            }
        },
        created(){

        },
        methods: {
            paperScroll(e){
                this.scrollLeft = e.target.scrollLeft;
            },
            slide(type){
                let slideEle = this.$refs.tagelemnt;
                slideEle.scrollLeft = slideEle.offsetLeft;
                if((slideEle.scrollWidth  - slideEle.clientWidth) != 0){
                    if(type === 'left'){
                        if(this.scrollLeft-130 < 0){
                            this.scrollLeft = 0;
                        } else {
                            this.scrollLeft -= 130;
                        }
                    } else {
                        this.scrollLeft += 130;
                    }
                    slideEle.scrollTo(this.scrollLeft, 0);
                }
            },
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                }else{
                    this.$router.push('/');
                }
            },
            // 关闭全部标签
            closeAll(){
                this.tagsList = [];
                this.tagsList.push({
                    name: "index",
                    path: "/index",
                    title: "系统首页"
                });
                this.$router.push('/');
            },
            // 关闭其他标签
            closeOther(){
                let curItem = [];
                curItem = this.tagsList.filter(item => {
                    if (item.path === '/index') {
                        return false
                    } else {
                        return item.path === this.$route.fullPath;
                    }
                })
                curItem.unshift({
                    name: "index",
                    path: "/index",
                    title: "系统首页"
                });
                this.tagsList = curItem;
            },
            // 设置标签
            setTags(route){
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                });
                !isExist && this.tagsList.push({
                    title: route.meta.title,
                    path: route.fullPath,
                    name: route.matched[1].components.default.name
                });
                bus.$emit('tags', this.tagsList);
            },
            handleTags(command){
                command === 'other' ? this.closeOther() : this.closeAll();
            }
        },
        computed: {
            showTags() {
                return this.tagsList.length > 0;
            }
        },
        watch:{
            $route(newValue, oldValue){
                this.setTags(newValue);
                this.$nextTick(function () {
                    let slideEle = this.$refs.tagelemnt;
                    if(this.$refs[newValue.name])  {
                        slideEle.scrollTo(this.$refs[newValue.name][0].offsetLeft, 0);
                    }
                });
            },
            tagsList(){
                let slideEle = this.$refs.tagelemnt;
                slideEle.scrollLeft = slideEle.offsetLeft;
                this.$nextTick(function () {
                    if((slideEle.scrollWidth  - slideEle.clientWidth) != 0){
                        slideEle.scrollTo(slideEle.scrollWidth, 0);
                    }
                });
            }
        },
        created(){
            this.setTags(this.$route);
        }
    }

</script>


<style>
    .tags {
        position: relative;
        height: 30px;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        padding: 5px 120px 5px 0;
    }

    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .tags-li {
        display: inline-block;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }

    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }

    .tags-close-box {
        position: absolute;
        right: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
    .tag_wrap ul{
        white-space: nowrap;
    }
    .tag_wrap{
        position: absolute;
        left: 30px;
        right: 30px;
        overflow-x: auto;
    }
    .tag_wrap::-webkit-scrollbar{
        height: 0px;
    }
    .slide_btn_wrap{
        position: absolute;
        top: 0;
        width: 24px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
    }
    .slide_btn_right{
        right: 0px;
        background: url("~@/assets/right_off.png");
    }
    .slide_btn_left{
        left: 0px;
        background: url("~@/assets/left_off.png");
    }
</style>

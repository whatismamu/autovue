<template>
    <div class="table">
        <div class="my-content-box">
            <div class="table-wrap">
                <el-table
                    :data="page.result"
                    :height="tableHeight"
                    style="width: 100%"
                    ref="baseTable"
                    highlight-current-row
                    border
                    @row-dblclick="rowDbclick"
                    @select="select"
                    @row-click="rowClick"
                    @select-all="selectAll"
                    class="baseTable">
                    <slot name="content"></slot>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.curPage"
                    :page-sizes="[10, 20, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.totalSize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'baseTable',
    props: {
        handleSizeChange: {
            type: Function,
            required: true
        },
        handleCurrentChange: {
            type: Function,
            required: true
        },
        page: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            tableHeight: '',
            pageSize: 10
        }
    },
    created(){
        let winHeight = document.body.clientHeight || document.body.offsetHeight || 500;
        this.tableHeight = winHeight * 0.54;
    },
    methods: {
        rowClick(row, event) {
            this.$emit('row-click', row, event);
        },
        rowDbclick(row, event){
            this.$emit('row-dblclick', row, event);
        },
        select(selection, row){
            this.$emit('select', selection, row);
        },
        selectAll(){
            this.$emit('select-all', selection);
        }
    }
}
</script>
<style scoped>
</style>

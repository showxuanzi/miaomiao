<template>
    <div>
        <el-table :data="nowTableData" style="width: 100%">
            <el-table-column prop="date" label="注册日期"></el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="email" label="用户邮箱"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" @click="handleToFreeze(scope.$index,scope.row)">{{scope.row.isFreeze ? "已冻结" : "未冻结"}}</el-button>
                    <el-button size="small" type="danger" @click="handleToDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            class="page"
            background
            layout="prev, pager, next"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="tableData.length">
        </el-pagination>
    </div>
</template>
<script>
export default {
   name:'users',
   data(){
       return {
           tableData: [],
           currentPage: 1,
           pageSize: 4
       }
   },
   mounted(){
       this.axios('/api2/admin/usersList').then((res) => {
           console.log(res);
           var status = res.data.status;
           if(status === 0){
               this.tableData = res.data.data.usersList;
           }
       })
   },
   computed: {
    //    前端分页——一次性加载全部数据（数据量小），前端分页显示
       nowTableData(){
           return this.tableData.slice( (this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize ) || []
       }
   },
   methods: {
       handleToFreeze(index,row){
           this.axios.post('/api2/admin/updateFreeze',{
               email: row.email,
               isFreeze: !row.isFreeze
           }).then((res) => {
               var status = res.data.status;
               if(status === 0){
                   this.$alert('冻结操作已成功', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                           this.tableData[index].isFreeze = !row.isFreeze;
                        }
                   });
               }else{
                this.$alert('冻结操作失败', '信息', {
                        confirmButtonText: '确定'
                   });
               }
           })
       },
       handleToDelete(index,row){
           this.axios.post('/api2/admin/deleteUser',{
               email: row.email
           }).then((res) => {
               var status = res.data.status;
               if(status === 0){
                   this.$alert('删除用户成功！', '信息', {
                        confirmButtonText: '确定',
                        callback: action => {
                           this.tableData.splice(index,1);
                        }
                   });
               }else{
                   this.$alert('删除用户失败！', '信息', {
                        confirmButtonText: '确定'
                   });
               }
           })
       }
   }
}
</script>
<style scoped>
    .page{
        margin-top: 20px;
    }
</style>

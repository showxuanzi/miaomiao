<template>
    <div>
        <div>个人中心</div>
        <div>当前用户:{{ $store.state.user.name }}</div> 
        <div v-if="$store.state.user.isAdmin">用户身份: 管理员 <a href="/admin" target="_blank">进入后台管理</a></div>
        <div v-else>用户身份: 普通会员 </div>
        <div><a href="javascript:;" @touchstart='handleToLogout'>退出</a></div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
   name:'center',
    methods: {
        handleToLogout(){
            this.axios.get('/api2/users/logout').then((res) => {
                var status = res.data.status;
                if(status === 0){
                    localStorage.setItem('name','');
                    localStorage.setItem('isAdmin','');
                    this.$store.commit('user/USER_NAME',{name: '',isAdmin: false});
                    this.$router.push('/mine/login');
                }
            })
        }
    },
    beforeRouteEnter(to,form,next){
        // 路由钩子中不能获取this
        axios.get('/api2/users/getUser').then((res) => {
            var status = res.data.status;
            if(status === 0){
                next(vm => {
                    // 进入后台的页面是a标签跳转，状态存储在路由页面跳转无刷新的时候起作用，所以使用本地存储
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{name: res.data.data.username,isAdmin: res.data.data.isAdmin});
                });
            }else{
                next('/mine/login');
            }
        })
    }
}
</script>
<style scoped>

</style>

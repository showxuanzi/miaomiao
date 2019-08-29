<template>
    <div>
        <div>个人中心</div>
        <div>当前用户:{{ $store.state.user.name }}</div> 
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
                    this.$store.commit('user/USER_NAME',{name: ''})
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
                    vm.$store.commit('user/USER_NAME',{name: res.data.data.username})
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

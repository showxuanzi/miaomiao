<template>
    <div id="main">
        <TopHead title="我的喵喵"/>
            <div id="content">
                <!-- 登录 注册 修改密码 个人中心 -->
                <router-view />
            </div>
        <TabBar/>
    </div>
</template>
<script>
    import TopHead from '@/components/TopHead';
    import TabBar from '@/components/TabBar';
    // import Login from '@/components/Login';
    export default {
        name: "Mine",
        components: {
            TopHead,
            TabBar
        }
    }
</script>
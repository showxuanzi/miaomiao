<template>
    <div id="main">
        <TopHead title="我的喵喵"/>
            <div id="content">
                <Login></Login>
            </div>
        <TabBar/>
    </div>
</template>
<script>
    import TopHead from '@/components/TopHead';
    import TabBar from '@/components/TabBar';
    import Login from '@/components/Login';
    export default {
        name: "Mine",
        components: {
            TopHead,
            TabBar,
            Login
        }
    }
</script>
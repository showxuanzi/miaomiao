<template>
    <div id="main">
        <TopHead title="喵喵影院"/>
        <div id="content">
            <div class="cinema_menu">
                 <div class="city_switch">
                    全城 <i class="iconfont icon-xiangxiajiantoushixin"></i>     
                </div>
                <div class="brand_switch">
                    品牌 <i class="iconfont icon-xiangxiajiantoushixin"></i>
                </div>
                <div class="feature_switch">
                    特色 <i class="iconfont icon-xiangxiajiantoushixin "></i>
                </div>
            </div>
            <CinemaList></CinemaList>
        </div>
        <TabBar/>
    </div>
</template>
<script>
    import TopHead from '@/components/TopHead';
    import TabBar from '@/components/TabBar'; 
    import CinemaList from '@/components/CinemaList';
    export default {
        name: "Cinema",
        components: {
            TopHead,
            CinemaList,
            TabBar
        }
    }
</script>
<style scoped>
    #content .cinema_menu{
        width: 100%;
        height: 45px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        justify-content: space-around;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: white;
        margin-top: 50px;
    } 
</style>

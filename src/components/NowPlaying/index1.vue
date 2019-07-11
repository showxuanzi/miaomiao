// 没有封装better-scroll的使用方法
<template>
    <div class="movie_body" ref="movie_body">
        <ul>
            <li class="pull_down">{{scrollMsg}}</li>
            <li v-for="item in movieList" :key="item.id">
                <div class="pic_show" @tap="handleToDetail"><img :src="item.img | setWH('128.180')" alt=""></div>
                <div class="info_list" >
                    <h2>{{item.nm}} <img v-if="item.version" src="@/assets/3D-.png"/></h2>
                    <p>观众影评<span class="grade">{{item.sc}}</span></p>
                    <p>主演：{{item.star}}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div class="btn_mall">购票</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import BScroll from 'better-scroll';
    export default {
        name:'NowPlaying',
        data(){
            return {
                movieList: [],
                scrollMsg: ''
            }
        },
        mounted(){
            this.axios.get('/api/movieOnInfoList?cityId=10').then((res) => {
                var msg = res.data.msg;
                if(msg === 'ok'){
                    this.movieList = res.data.data.movieList;
                    // 页面渲染完成后调用BScroll，$nextTick方法指的是数据赋值完成，页面渲染完成后执行里面的回调
                    this.$nextTick(() => {
                        var scroll = new BScroll(this.$refs.movie_body,{
                            tap: true, // 点击事件
                            probeType: 1 // 触发滚动事件，非实时（屏幕滑动超过一定时间后）派发scroll事件
                        });
                        // 下拉刷新
                        scroll.on("scroll", (para) => {
                            if(para.y > 30){
                                this.scrollMsg = '正在更新';
                            }
                        });
                        scroll.on("touchEnd",(para) => {
                            if(para.y > 30){
                                
                                this.axios.get('/api/movieOnInfoList?cityId=11').then((res) => {
                                    var msg = res.data.msg;
                                    if(msg === 'ok'){
                                        this.scrollMsg = '更新完成';
                                        setTimeout(() => {
                                            this.movieList = res.data.data.movieList;
                                            this.scrollMsg = '';
                                        },1000)
                                    }
                                })
                            }
                            
                        })
                    });
                }
            })
        },
        methods: {
            handleToDetail(){
                console.log("dddser")
            }
        }
    }
</script>
<style scoped>
    #content .movie_body{
        flex:1;
        overflow: auto;
    }
    .movie_body ul{
        margin: 0 12px;
        overflow: hidden;
    }
    .movie_body ul li{
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
    }
    .movie_body .pic_show{
        width: 64px;
        height: 90px;
    }
    .movie_body .pic_show img{
        width: 100%;
        height: 100%;
    }
    .movie_body .info_list{
        margin-left: 10px;
        flex: 1;
        position: relative;
    }
    .movie_body .info_list h2{
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .movie_body .info_list p{
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .movie_body .info_list .grade{
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
    }
    .movie_body .info_list img{
        width: 32px;
        position: absolute;
        right: 10px;
        top: 2px;
    }
    .movie_body .btn_mall,.movie_body .btn_pre{
        width: 47px;
        height: 27px;
        line-height: 28px;
        text-align: center;
        background-color: #f03d37;
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
    }
    .movie_body .btn_pre{
        background-color: #3c9fe6;
    }
    .movie_body .pull_down{
        padding: 0;
        margin: 0;
        border: none;
    }
</style>

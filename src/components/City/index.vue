<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading"/>
            <Scroll v-else ref="city_list">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{item.nm}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="city_sort">
                        <div v-for="item in cityList" :key="item.id">
                            <h2>{{item.index}}</h2>
                            <ul>
                                <li v-for="city in item.list" :key="city.id" @tap="handleToCity(city.nm,city.id)">{{city.nm}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroll>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="(item,index) in cityList" :key="item.id" @touchstart="handleToIndex(index)">{{item.index}}</li>
            </ul>
        </div>
        
    </div>
</template>
<script>
    export default {
        name:'City',
        data(){
            return {
                cityList: [],
                hotList: [],
                isLoading: true
            }
        },
        mounted(){
            var cityList = window.localStorage.getItem('cityList');
            var hotList = window.localStorage.getItem('hotList');
            if(cityList && hotList){
                this.cityList = JSON.parse(cityList);
                this.hotList = JSON.parse(hotList);
                this.isLoading = false;
            }else{
                this.axios.get('/api/cityList').then((res) => {
                var msg = res.data.msg;
                if(msg === "ok"){
                    var cities = res.data.data.cities;
                    var { cityList,hotList } = this.formatCity(cities);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    this.isLoading =  false;
                    window.localStorage.setItem('cityList',JSON.stringify(cityList));
                    window.localStorage.setItem('hotList',JSON.stringify(hotList));
                }
            });
            }
        },
        methods : {
            formatCity (cities) {
                var cityList = [];
                var hotList = [];
                for(var i = 0; i < cities.length; i++){
                    var indexLetter = cities[i].py.substring(0,1).toUpperCase();
                    if(isCom(indexLetter)){ // 新添加
                        cityList.push({index : indexLetter, list: [{nm: cities[i].nm, id: cities[i].id}]})
                    }else{ //已存在
                        for(var j = 0; j < cityList.length; j++){
                            if(indexLetter === cityList[j].index){
                                cityList[j].list.push({nm: cities[i].nm, id: cities[i].id});
                            }
                        }
                    }
                    // 是否热门
                    if(cities[i].isHot == 1){
                        hotList.push(cities[i]);  
                    }
                }
                cityList.sort((n1,n2) => {
                    if(n1.index > n2.index){
                        return  1;
                    }else if( n1.index < n2.index){
                        return -1;
                    }else{
                        return 0;
                    }
                });
                // 判断是否已经存在首字符
                function isCom(indexLetter){
                    for(var i = 0; i < cityList.length; i++){
                        if( indexLetter === cityList[i].index){
                            return false
                        }
                    }
                    return true
                }
                return {
                	cityList,
                	hotList
                };

            },
            handleToIndex(index){
                var h2 = this.$refs.city_sort.getElementsByTagName("h2");
                // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop; 被better-scroll管理，原生方法失效
                this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
            },
            // 各个城市点击事件
            handleToCity(nm,id){
                this.$store.commit('city/CITY_INFOR',{nm,id});
                window.localStorage.setItem('nowNm',nm);
                window.localStorage.setItem('nowId',id);
                this.$router.push('/movie/nowPlaying');
            }
        }
    }
</script>
<style scoped>
    #content .city_body{
        margin-top: 95px;
        display: flex;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
    }
    .city_body .city_list{
        flex: 1;
        overflow: auto;
        background-color: #fff5f0;
    }
    .city_body .city_list::-webkit-scrollbar{
        background-color: transparent;
        width: 0;
    }
    .city_body .city_hot{
        margin-top: 20px;
    }
    .city_body .city_hot h2{
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #f0f0f0;
        font-weight: normal;
    }
    .city_body .city_hot ul li{
        float: left;
        background-color:#fff;
        width: 29%;
        height: 33px;
        margin-top:15px;
        margin-left: 3%;
        padding: 0 4px;
        border: 1px solid #e6e6e6;
        border-radius: 3px;
        line-height: 33px;
        text-align: center;
        box-sizing: border-box;
    }
    .city_body .city_sort div{
        margin-top: 20px;
    }
    .city_body .city_sort h2{
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background-color: #f0f0f0;
        font-weight: normal;
    }
    .city_body .city_sort ul{
        padding-left: 10px;
        margin-top: 10px;
    }
    .city_body .city_sort ul li{
        line-height: 30px;
    }
    .city_body .city_index{
        width: 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        border-left: 1px solid #e6e6e6;
        height: 90%;
        position: fixed;
        top: 95px;
        background: #fff;
        right: 0;
        bottom: 50px;
    }
    
</style>

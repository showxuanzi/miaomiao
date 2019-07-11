<template>
    <div class="cinema_body">
        <Scroll>
            <ul>
                <li v-for="item in cinemaList" :key="item.id">
                    <div>
                        <span>{{item.nm}}</span>
                        <span class="q"><span class="price">{{item.sellPrice}}</span>元起</span>
                    </div>
                    <div class="address">
                        <span>{{item.addr}}</span>
                        <span>{{item.distance}}</span>
                    </div>
                    <div class="card">
                        <!-- vue 不建议v-for 和v-if一起使用-->
                        <!-- <div v-for="(itemCard,key) in item.tag" :key="key" :class="key | formatClass" v-if="itemCard == 1">{{key | formatCard}}</div> -->
                        <div v-for="(itemCard,key) in item.tag" :key="key" :class="key | formatClass">
                            <span v-if="itemCard == 1" :key="key">{{key | formatCard}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </Scroll>
    </div>
</template>
<script>
    export default {
        name:'CinemaList',
        data(){
            return{
                cinemaList: []
            }
        },
        mounted(){
            this.axios.get('/api/cinemaList?cityId=10').then((res) => {
                var msg =  res.data.msg;
                if(msg === 'ok'){
                    this.cinemaList = res.data.data.cinemas;
                }
            })
        },
        filters:{
            formatCard(key){
                var data = [
                    {key: 'allowRefund', value: '改签'},
                    {key: 'endorse', value: '退票'},
                    {key: 'sell', value: '折扣卡'},
                    {key: 'snack', value: '小吃'}
                ];
                for(var i = 0; i < data.length; i++){
                    if(key === data[i].key){
                        return data[i].value;
                    }
                }
                return '';
            },
            formatClass(key){
                var data = [
                    {key: 'allowRefund', value: 'bl'},
                    {key: 'endorse', value: 'bl'},
                    {key: 'sell', value: 'or'},
                    {key: 'snack', value: 'or'}
                ];
                for(var i = 0; i < data.length; i++){
                    if(key === data[i].key){
                        return data[i].value;
                    }
                }
                return '';
            }
        }
    }
</script>
<style scoped>

    .cinema_body{
        flex: 1;
        overflow: auto;
    }
    .cinema_body ul{
        padding: 20px;
    }
    .cinema_body li{
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
    }
    .cinema_body div{
        margin-bottom: 10px;
    }
    .cinema_body .q{
        font-size: 11px;
        color: #666;
    }
    .cinema_body .price{
        font-size: 18px;
        color: #f90;
    }
    .cinema_body .address{
        font-size: 13px;
        color: #666;
    }
    .cinema_body .address span:nth-of-type(2){
        float: right;
    }
    .cinema_body .card{
        display: flex;
    }
    .cinema_body .card div span{
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        margin-right: 4px;
    }
    .cinema_body .card div.or span{
        color: #f90;
        border: 1px solid #f90;
    }
    .cinema_body .card div.bl span{
        color: #589daf;
        border: 1px solid #589daf;
    }
</style>

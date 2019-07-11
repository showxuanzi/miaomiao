<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
    import BScroll from "better-scroll";
    export default {
        name: 'Scroll',
        data () {
            return {
            
            };
        },
        props:{
            handleToScroll:{
                type: Function,
                default: function(){}
            },
            handleToTouchEnd:{
                type: Function,
                default: function(){}
            }
        },
        mounted(){
            var scroll = new BScroll(this.$refs.wrapper,{
                tap: true, // 点击事件
                probeType: 1 // 触发滚动事件，非实时（屏幕滑动超过一定时间后）派发scroll事件
            });
            this.scroll = scroll;
            scroll.on('scroll', (pos) => {
                this.handleToScroll(pos);
            });
            scroll.on('touchEnd',(pos) =>{
                this.handleToTouchEnd(pos);
            })
        },
        methods:{
            toScrollTop(y){
                this.scroll.scrollTo(0,y);
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        height: 100%;
    }
</style>
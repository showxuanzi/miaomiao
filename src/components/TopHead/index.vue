<template>
    <header id="topHead"> 
        <h1>{{title}}</h1>
    </header>
</template>
<script>
    export default {
        name:'TopHead',
        props: {
            title: {
                type: String,
                default: "喵喵电影"
            }
        }
    }
</script>
<style scoped>
    #topHead{
        width: 100%;
        height: 50px;
        color: #fff;
        background: #e54847;
        border-bottom: 1px solid #e54847;
        position: fixed;
        left: 0;
        top:0;
    }
    #topHead h1{
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        font-weight: normal;
    }
    #topHead i{
        position: absolute;
        left: 5px;
        top: 50%;
        margin-top: -13px;
        font-size: 26px;
    }
</style>

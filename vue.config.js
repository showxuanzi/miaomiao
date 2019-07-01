module.exports = {
    devServer : { //开发环境下的配置
        proxy : { //反向代理
            "/api": { // 代理接口，所有接口都以/api 开始，即http://39.97.33.178/api后面是各个接口名字
                target : "http://39.97.33.178",
                changeOrigin : true //反向代理的时候是否改变地址
            }
        }
    }
}
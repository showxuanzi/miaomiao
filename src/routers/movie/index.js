export default{
    path: "/movie",
    component: () => import("@/views/Movie"),
    children: [
        {
            path: 'city',//这样写得到的路径是/movie/city,但是如果写成/city,就会得到这样的路径/city，与movie同级
            component: () => import('@/components/City')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },{
            path: '/movie',
            redirect: '/movie/nowPlaying'
        }
    ]
}
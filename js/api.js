var webApi = {
    base: {
        url: 'http://10.10.10.52:8080/cmp',
        // url: 'https://zksqgl.ruicz.cn:8080/cmp',
        // url: 'https://sqgl.ruicz.cn:9917/cmp',
        // url: 'http://68.156.103.207:8080/cmp',
        getUrl: function(path) {
            return this.url + path
        },
    },
    commonUrl: {
        column: '/ycyj/category/list', // 栏目
        columnList: '/ycyj/article/getNewsListByCategoryId', // 栏目列表
        newsDetails: '/ycyj/article/detail', // 新闻详情 - 村警之星 - 派出所动态等后台创建栏目详情
        // moreTypeDetails: '/ycyj/ycyjWork/queryById', // 新闻详情
        pcsList: '/ycyj/ycyjRank/pcsRank', // 派出所排行榜
        xxfbList: '/ycyj/ycyjRank/cjRank', // 村居排行榜
        zcjlList: '/ycyj/ycyjRank/list', // 驻村警力排行榜
        treelList: '/ycyj/YcyjPolice/queryTreeList', // 树形结构
        // sqmyList: '/ycyj/ycyjYnjh/list', // 社区民意
        // bmlmList: '/ycyj/ycyjBmlm/list', // 便民利民
        // jftjList: '/datamanager/cjfw/generalList', // 纠纷调解
        // bfknqzList: '/ycyj/ycyjBfkn/list', // 帮扶困难群众
        // pczzList: '/ycyj/ycyjTcwt/list', // 排查整治
        // newsTypeDetails: '/ycyj/article/queryByIdAndType', // 类型新闻详情
        typeList: '/ycyj/ycyjWork/queryByTypelist', // 栏目
        zcmjList: '/ycyj/ycyjWork/queryUserList', // 驻村(居)警力
        zcmjList2: '/ycyj/ycyjWork/queryUserListNew', // 驻村(居)警力

        workTrack: '/ycyj/ycyjJlgj/jlgjList', // 工作轨迹
        generalSituation: '/reportstat/index/pcStatic', // 基本概况
        getBasicNewsList: '/ycyj/article/getBasicNewsList', // 基本概况详情
        getJbjkTableList: '/reportstat/index/tzStatic', // 基本概况详情2
        siteUrl: '/ycyj/ycyjJlgj/getXyListByUserId', // 当前人员位置
        
        customSwiperList: '/ycyj/website/imgList', // 轮播图列表
        customNewsList: '/ycyj/website/getNewsList', // 轮播下面的四个栏目列表
        customNewsDetails: '/ycyj/website/detail', // 轮播下面的四个栏目列表新闻详情
        customMyjson: './customJson.json', // 模拟数据请求 （测试使用）
        
        leaderList: '/ycyj/ycyjCjwgb/queryTreePersonList', // 两委干部
        yjssList: '/ycyj/ycyjYjpz/cjList', // 硬件设施列表
        yjssDetails: '/ycyj/ycyjYjpz/list', // 硬件设施详情
        
        gcjphList: '/ycyj/ycyjRank/cjRankList', // 各村居排行
        cjphList: '/ycyj/ycyjRank/grRankList', // 村警排行

        cjbjlList: '/ycyj/ycyjZcjl/list', // 驻村（居）警力 (村警办警力)
    }
}
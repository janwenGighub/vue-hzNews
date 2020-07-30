window.hostsrp = {
    // 部署环境
    // host: 'http://68.156.103.207/ycyj',
    // locationHref: 'http://68.156.103.207/ycyj/',
    // imgUrl: 'http://68.156.103.207:80/',
    // swiperImgUrl: 'http://68.156.103.13/',
    // zcmjImgUrl: 'http://68.156.103.207:8080/cmp/sys/common/view/',

    // 本地环境
    host: 'http://localhost:9527/',
    locationHref: 'http://localhost:9527/',
    imgUrl: 'http://localhost:9527/',

    // host: 'http://47.113.124.49/ycyj/', // 测试环境 47
    // locationHref: 'http://47.113.124.49/ycyj/', // 测试环境 47
    // imgUrl: 'http://47.113.124.49:8888/', // 测试环境 47
    // zcmjImgUrl: 'https://zksqgl.ruicz.cn:8080/cmp/sys/common/view/', // 测试环境 47


    // host: 'http://218.106.133.206:9916/ycyj/', // 218服务器
    // locationHref: 'http://218.106.133.206:9916/ycyj/', // 218服务器
    // imgUrl: 'http://218.106.133.206:9913/', // 218服务器
    // zcmjImgUrl: 'https://sqgl.ruicz.cn:9917/cmp/sys/common/view/', // 驻村民警 / 工作轨迹

    // customHref: 'http://localhost:9527/',


    detailsPage: 'pages/newsDetails.html',
    moreListPage: 'pages/moreList.html',
    policeMorePage: 'pages/policeMore.html',
    homePage: 'index.html',
    policeListPage: 'pages/policeList.html',
    synopsisDetailsPage: 'pages/synopsis.html', // 基本概况
    workTrackMorePage: 'pages/workTrackMore.html', // 工作轨迹
    rankingListPage: 'pages/rankingList.html', // 排行榜
    xqdtListPage: 'pages/xqdtList.html', // 辖区地图
    cjzxListPage: 'pages/cjzxList.html', // 村警之星
    policeDetailsPage: 'pages/cjzxDetails.html', // 村警之星详情
    leaderPage: 'pages/leader.html', // 两委干部
    zcmjPage: 'pages/zcjjlList.html', // 驻村居民警力
    jbqkTablePage: 'pages/jbqkTable.html', // 基本情况详情
    allDtDetailsPage: 'pages/allDtDetails.html', // 所有第三方接口新闻详情页面
    allDtMoreListPage: 'pages/allDtMoreList.html', // 所有第三方接口新闻更多列表页面
    yjssListPage: 'pages/yjssList.html', // 硬件设施列表
    yjssDetailsPage: 'pages/yjssDetails.html', // 硬件设施详情
    // 发布 环境
    //host: window.location.origin + '/web_finance',
}
window.transferJson = {
    urlTransform: function (href) {
        var paramsObj = href.split('?')[1]
        var obj = decodeURI(paramsObj)
        var transferJson = obj.split('=')[1]
        return JSON.parse(transferJson)
    },
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
    },
    customUrlParam: function (name, url) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = url.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
        if (r != null) return unescape(r[2]);
        return null;
    }
}
window.customAjax = {
    crossDomainAjax: function (url, customJson, successCallback) {
        // IE8 & 9 only Cross domain JSON GET request
        if ('XDomainRequest' in window && window.XDomainRequest !== null) {
            var xdr = new XDomainRequest(); // Use Microsoft XDR
            xdr.open('get', url + '?' + customJson, true);
            xdr.onload = function () {
                var dom = new ActiveXObject('Microsoft.XMLDOM'),
                    JSON = $.parseJSON(xdr.responseText);
                dom.async = false;
                if (JSON == null || typeof (JSON) == 'undefined') {
                    JSON = $.parseJSON(data.firstChild.textContent);
                }
                successCallback(JSON); // internal function
            };
            xdr.onerror = function () {
                _result = false;
            };
            xdr.send();
        }
        // IE7 and lower can't do cross domain
        else if (navigator.userAgent.indexOf('MSIE') != -1 &&
            parseInt(navigator.userAgent.match(/MSIE ([\d.]+)/)[1], 10) < 8) {
            return false;
        }
        // Do normal jQuery AJAX for everything else          
        else {
            $.ajax({
                url: url + '?' + customJson,
                cache: false,
                dataType: 'json',
                type: 'GET',
                async: false, // must be set to false
                success: function (data, success) {
                    successCallback(data);
                }
            })
        }
    },
    AjaxGet: function (url, data, callback) {
        $.ajax({
            url: url,
            type: "get",
            contentType: "application/json",
            dataType: "json",
            timeout: 10000,
            data: data,
            success: function (data) {
                callback(data);
            }
        })
    }
}
window.timeChange = {
    dateChange: function (string) {
        var str = ''
        return str = string.substring(0, 10)
    },
    createDateChange: function (string) {
        var str = ''
        str = new Date(string);
        var year = str.getFullYear()
        var month = str.getMonth()
        var date = str.getDate()
        return str = [year, month, date].join('/')
    },
    momentChange: function (str) {
        return moment(str).format('YYYY-MM-DD')
    },
}
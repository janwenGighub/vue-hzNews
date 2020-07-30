$(function () {
    var mainApp = {
        store: {

        },
        methods: {
            createCjphblList: function () {
                $('#customGcjphId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.gcjphList)
                let data = {}
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = gsphScript.innerHTML,
                                orderInfoDiv = document.getElementById('customGcjphId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                    }
                })
            },
            createCjphblList2: function () {
                $('#customGcjphId2').empty()

                let url = webApi.base.getUrl(webApi.commonUrl.cjphList)
                let data = {}
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = gsphScript.innerHTML,
                                orderInfoDiv = document.getElementById('customGcjphId2')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                    }
                })

            },
        },
        event: function () {
            $('header').load('/ycyj/pages/commonNav.html .commonNav', function () {
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navHomeId').attr('href', hostsrp.locationHref + hostsrp.homePage) // 首页
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navGzzdId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('gzzdId') + '&columnTitle=规章制度') // 规章制度
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navYxcjId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('yxcjId') + '&columnTitle=优秀村居') // 优秀村居
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navTcwtzzId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('tcwtzzId') + '&columnTitle=突出问题整治') // 突出问题整治
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navCjzxId').attr('href', hostsrp.locationHref + hostsrp.cjzxListPage) // 村警之星
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navLwgbId').attr('href', hostsrp.locationHref + hostsrp.leaderPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('lwgbId') + '&columnTitle=两委干部') // 两委干部
                $.getScript("/ycyj/js/commonNav.js")
            })
        }, 
        init: function () {
            mainApp.event()
            mainApp.methods.createCjphblList()
            mainApp.methods.createCjphblList2()
        }
    }
    mainApp.init()
})
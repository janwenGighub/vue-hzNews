$(function () {
    var mainApp = {
        store: {
            policeId: '441330',
            categoryId: '',
            policeName: '仲恺公安分局一村 (居) 一警专栏',
            treeArr: [],
            allTotal: 0,
            curr: 1,
            limit: 10,
            tcwtzzCategoryId: '', // 突出问题整治 栏目 id
            yxcjCategoryId: '', // 优秀村居 栏目 id
            gzzdCategoryId: '', // 规章制度 栏目 id
            opts: {
                lines: 9, // The number of lines to draw
                length: 0, // The length of each line
                width: 10, // The line thickness
                radius: 15, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                color: '#000', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
            }
        },
        methods: {
            // 创建栏目
            createColumn: function () {
                let url = webApi.base.getUrl(webApi.commonUrl.column)
                let data = {
                    pageNo: 1,
                    pageSize: 30
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        mainApp.store.columnArr = res.result.records
                        for (let i = 0; i < res.result.records.length; i++) {
                            var item = res.result.records[i]
                            mainApp.methods.columnSwitch(item)
                        }
                    }
                })
            },
            // 栏目遍历
            columnSwitch: function (obj) {
                mainApp.store.categoryId = obj.id
                switch (obj.name) {
                    case '派出所动态':
                        mainApp.store.pcsCategoryId = obj.id
                        break;
                    case '村居动态':
                        mainApp.store.cjdtCategoryId = obj.id
                        break;
                    case '领导批示':
                        mainApp.store.ldpsCategoryId = obj.id
                        break;
                    case '通知通告':
                        mainApp.store.tztgCategoryId = obj.id
                        break;
                    case '工作简报':
                        mainApp.store.gzjbCategoryId = obj.id
                        break;
                    case '工作动态表':
                        mainApp.store.gzdtbCategoryId = obj.id
                        break;
                    case '村警之星':
                        mainApp.store.cjzxCategoryId = obj.id
                        break;
                    case '三+N结合':
                        mainApp.store.snjhCategoryId = obj.id
                        break;
                    case '联席村居':
                        mainApp.store.lxcjCategoryId = obj.id
                        break;
                    case '问题整治':
                        mainApp.store.wtzzCategoryId = obj.id
                        break;
                    case '化解矛盾纠纷':
                        mainApp.store.hjmdjfCategoryId = obj.id
                        break;
                    case '安全检查监督':
                        mainApp.store.aqjcjdCategoryId = obj.id
                        break;
                    case '宣传教育':
                        mainApp.store.xcjyCategoryId = obj.id
                        break;
                    case '重点人员管控':
                        mainApp.store.zdrygkCategoryId = obj.id
                        break;
                    case '联系群众':
                        mainApp.store.lxqzCategoryId = obj.id
                        break;
                    case '其他工作':
                        mainApp.store.qtCategoryId = obj.id
                        break;
                    case '优秀村居':
                        mainApp.store.yxcjCategoryId = obj.id
                        break;
                    case '规章制度':
                        mainApp.store.gzzdCategoryId = obj.id
                        break;
                    case '基本概况':
                        mainApp.store.jbgkCategoryId = obj.id
                        break;

                    default:
                        break;
                }
            },
            createNewsList: function (curr, limit) {
                $('#customListId').empty()
                // $('#foo').removeClass('spinShow')

                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage,
                        layer = layui.layer;

                    let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                    let data = {
                        pageNo: curr,
                        pageSize: limit,
                        policeId: mainApp.store.policeId,
                        categoryId: mainApp.store.categoryId,
                        title: '',
                    }
                    customAjax.AjaxGet(url, data, function (res) {
                        if (res.code === 200) {
                            if (res.result.records.length > 0) {
                                var customArr = res.result.records
                                mainApp.store.allTotal = res.result.total
                                layui.use('laytpl', function () {
                                    var laytpl = layui.laytpl
                                    var orderInfoTpl = ldpsAndTztgScript2.innerHTML,
                                        orderInfoDiv = document.getElementById('customListId')
                                    laytpl(orderInfoTpl).render(customArr, function (html) {
                                        orderInfoDiv.innerHTML = html
                                    })
                                })
                                //调用分页
                                laypage.render({
                                    elem: 'demo3',
                                    curr: curr,
                                    limit: limit,
                                    count: res.result.total, //数据总数，从服务端得到
                                    jump: function (obj, first) {
                                        if (!first) {
                                            console.log('rhllo')
                                            mainApp.store.curr = obj.curr
                                            mainApp.store.limit = obj.limit
                                            mainApp.methods.createNewsList(mainApp.store.curr, mainApp.store.limit)
                                        }
                                    }
                                })
                            }
                        }
                        $('#foo').addClass('spinShow')
                    })
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

            let customHref = window.location.href
            let stationUrl = decodeURI(customHref)
            mainApp.store.policeId = transferJson.getUrlParam('policeId')
            mainApp.store.categoryId = transferJson.getUrlParam('categoryId')
            let columnTitle = transferJson.customUrlParam('columnTitle', stationUrl)
            $('.commonTitle').children('h3').text(columnTitle)

            /////////////
            // 加载状态 //
            /////////////
            var target = document.getElementById('foo')
            var spinner = new Spinner(mainApp.store.opts).spin(target)

            $('header').on('click', '#customTree', function () {
                if ($(this).nextAll('.zTreeDemoBackground').hasClass('customShow')) {
                    $(this).nextAll('.zTreeDemoBackground').removeClass('customShow')
                } else {
                    $(this).nextAll('.zTreeDemoBackground').addClass('customShow')
                }
            })

        },
        init: function () {
            mainApp.event()
            mainApp.methods.createNewsList(mainApp.store.curr, mainApp.store.limit)
        },
    }
    mainApp.init()
})
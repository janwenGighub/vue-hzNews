$(function () {
    var mainApp = {
        store: {
            policeId: '441330',
            policeName: '仲恺公安分局一村 (居) 一警专栏',
            treeArr: [],

            tztgCategoryId: '', // 通知通告 栏目 id
            tztgCategoryId2: '4179', // 通知通告 栏目 id
            ldpsCategoryId: '', // 领导批示 栏目 id
            ldpsCategoryId2: '4475', // 领导批示 栏目 id

            fjjbCategoryId: '', // 分局简报 栏目 id

            gsjbCategoryId: '', // 各所简报 栏目 id

            gzjbCategoryId: '', // 工作简报 栏目 id
            gzjbCategoryId2: '4180', // 工作简报 栏目 id
            gzdtbCategoryId: '', // 工作动态表 栏目 id
            cjzxCategoryId: '', // 村警之星 栏目 id
            pcsCategoryId: '', // 派出所动态 栏目 id
            cjdtCategoryId: '', // 村居动态 栏目 id
            snjhCategoryId: '', // 三N结合 栏目 id
            lxcjCategoryId: '', // 联席村居 栏目 id
            wtzzCategoryId: '', // 问题整治 栏目 id
            hjmdjfCategoryId: '', // 化解矛盾纠纷 栏目 id
            aqjcjdCategoryId: '', // 安全检查监督 栏目 id
            lxqzCategoryId: '', // 联系群众 栏目 id
            zdrygkCategoryId: '', // 重点人员管控 栏目 id
            qtCategoryId: '', // 其他 栏目 id
            yxcjCategoryId: '', // 优秀村居 栏目 id
            gzzdCategoryId: '', // 规章制度 栏目 id
            xcjyCategoryId: '', // 宣传教育 栏目 id
            jbgkCategoryId: '', // 基本概况 栏目 id
            tcwtzzCategoryId: '', // 突出问题整治 栏目 id

            range: 100,
            totalheight: 0,
            custonNum: 1,
            curr: 1,
            limit: 3,

            userId: '',
            userName: '',
            startTime: '',
            endTime: '',

            setting: {
                data: {
                    key: {
                        name: 'title'
                    }
                },
                callback: {
                    beforeClick: function (treeId, treeNode) {
                        mainApp.store.policeId = treeNode.key

                        // 页面刷新后返回浏览器最顶端
                        document.documentElement.scrollTop = 0; //ie下
                        document.body.scrollTop = 0; //非ie

                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                        // $('.contentArea').find('.nameChange').children().first().addClass('.targetBdCor').siblings().addClass('.targetBdCor') //
                        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


                        $('.contentArea').find('.nameChange').each(function () {
                            $(this).children('p:first-child').addClass('targetBdCor').siblings('p:last-child').removeClass('targetBdCor')
                        })
                        mainApp.store.custonNum = 1

                        switch (treeNode.jgjb) {
                            case '2':
                                console.log('切換至分局動態')
                                $('.zcmjBox').children('.policeList').children('.police_ul:first-child').removeClass('zcjjlShow').siblings('.police_ul').addClass('zcjjlShow')
                                $('.dtTag_ul').children('li:first-child').children().addClass('dtCor').text('分局动态').parent().siblings().children().removeClass('dtCor').text('派出所动态')
                                mainApp.methods.createFjdt() // 分局动态
                                break;
                            case '3':
                                console.log('切換至派出所动态')
                                $('.zcmjBox').children('.policeList').children('.police_ul:first-child').addClass('zcjjlShow').siblings('.police_ul ').removeClass('zcjjlShow')
                                $('.dtTag_ul').children('li:first-child').children().addClass('dtCor').text('派出所动态').parent().siblings().children().removeClass('dtCor').text('村居动态')
                                mainApp.methods.createLocalPoliceStation('派出所动态')
                                mainApp.methods.createSwiper('3', mainApp.store.policeId, mainApp.store.pcsCategoryId)
                                break;
                            case '4':
                                console.log('切換至村居动态')
                                $('.zcmjBox').children('.policeList').children('.police_ul:first-child').addClass('zcjjlShow').siblings('.police_ul ').removeClass('zcjjlShow')
                                $('.dtTag_ul').children('li:last-child').children().addClass('dtCor').text('村居动态').parent().siblings().children().removeClass('dtCor').text('派出所动态')
                                mainApp.methods.createCjdtList('村居动态') // 村居动态
                                mainApp.methods.createSwiper('4', mainApp.store.policeId, mainApp.store.cjdtCategoryId)
                                break;
                        }
                        $('header').children('.commonNav').children('.navTitle').children('h1').text(treeNode.jgmc + '一村 (居) 一警专栏')
                        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(treeNode.jgmc)
                        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').nextAll('.zTreeDemoBackground').addClass('customShow')
                        mainApp.methods.createLdpsAndTztg(mainApp.store.tztgCategoryId2, '通知通告') // 领导批示 / 通知通告
                        mainApp.methods.createGzjbAndGzdtb(mainApp.store.gzjbCategoryId2, '分局简报') // 分局简报
                        mainApp.methods.createZcmjList() // 驻村(居)警力
                        mainApp.methods.createJbgkList() // 基本概况
                    }
                }
            }
        },
        methods: {
            /* 树形结构 */
            createTreeList: function () {
                let url = webApi.base.getUrl(webApi.commonUrl.treelList)
                let data = {}
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 0) {
                        var customArr = res.result
                        mainApp.store.treeArr = customArr
                        let treeDemoId = $('header').find('.navList').children('ul').children().last().find('#treeDemo')
                        $.fn.zTree.init(treeDemoId, mainApp.store.setting, mainApp.store.treeArr)
                    }
                })
            },
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
                        window.sessionStorage.setItem('yxcjId', obj.id)
                        break;
                    case '规章制度':
                        mainApp.store.gzzdCategoryId = obj.id
                        window.sessionStorage.setItem('gzzdId', obj.id)
                        break;
                    case '基本概况':
                        mainApp.store.jbgkCategoryId = obj.id
                        break;
                    case '突出问题整治':
                        mainApp.store.tcwtzzCategoryId = obj.id
                        window.sessionStorage.setItem('tcwtzzId', obj.id)
                        break;
                    case '两委干部':
                        // mainApp.store.tcwtzzCategoryId = obj.id
                        window.sessionStorage.setItem('lwgbId', obj.id)
                        break;

                    default:
                        break;
                }
            },
            // 轮播图
            createSwiper: function (string, policeId, categoryId) {
                $('#swiperBox').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let fjdtUrl = webApi.base.getUrl(webApi.commonUrl.customNewsList)
                let data = {
                    pageNo: 1,
                    pageSize: 5,
                    categoryId: categoryId,
                    policeId: policeId
                }
                let fjdtData = {
                    pageNo: 1,
                    pageSize: 5,
                    categoryId: categoryId,
                }
                switch (string) {
                    case '2':
                        customAjax.AjaxGet(fjdtUrl, fjdtData, function (res) {
                            if (res.result.records.length > 0) {
                                var customArr = res.result.records
                                layui.use('laytpl', function () {
                                    var laytpl = layui.laytpl
                                    var orderInfoTpl = fjdtSwiperList.innerHTML,
                                        orderInfoDiv = document.getElementById('swiperBox')
                                    laytpl(orderInfoTpl).render(customArr, function (html) {
                                        orderInfoDiv.innerHTML = html
                                    })
                                })

                                // 轮播图
                                layui.use('carousel', function () {
                                    var carousel = layui.carousel

                                    //建造实例
                                    carousel.render({
                                        elem: '#test1',
                                        index: 2
                                        //,full: true
                                        ,
                                        arrow: 'always',
                                        width: '588px',
                                        height: '400px',
                                        interval: 5000
                                        //,autoplay: false
                                        //,indicator: 'outside'
                                        //,trigger: 'hover'
                                    })
                                    //事件
                                    carousel.on('change(test1)', function (res) {
                                        console.log(res)
                                    })
                                    carousel.render({
                                        elem: '#test2',
                                        interval: 1800
                                        //,full: true
                                        ,
                                        anim: 'fade',
                                        height: '120px'
                                    })
                                    carousel.render({
                                        elem: '#test3'
                                        //,full: true
                                        ,
                                        arrow: 'always'
                                        //,autoplay: false
                                        //,indicator: 'outside'
                                        //,trigger: 'hover'
                                        ,
                                        anim: 'updown'
                                        //,full: true
                                    })
                                    carousel.render({
                                        elem: '#test4',
                                        width: '588px',
                                        height: '400px',
                                        interval: 5000
                                    })
                                })
                            }
                        })
                        break;
                    case '3':
                        customAjax.AjaxGet(url, data, function (res) {
                            console.log('轮播图')
                            if (res.result.records.length > 0) {
                                var customArr = res.result.records
                                console.log('customArr')
                                console.log(customArr)
                                layui.use('laytpl', function () {
                                    var laytpl = layui.laytpl
                                    var orderInfoTpl = swiperList.innerHTML,
                                        orderInfoDiv = document.getElementById('swiperBox')
                                    laytpl(orderInfoTpl).render(customArr, function (html) {
                                        orderInfoDiv.innerHTML = html
                                    })
                                })

                                // 轮播图
                                layui.use('carousel', function () {
                                    var carousel = layui.carousel

                                    //建造实例
                                    carousel.render({
                                        elem: '#test1',
                                        index: 2
                                        //,full: true
                                        ,
                                        arrow: 'always',
                                        width: '588px',
                                        height: '400px',
                                        interval: 5000
                                        //,autoplay: false
                                        //,indicator: 'outside'
                                        //,trigger: 'hover'
                                    })
                                    //事件
                                    carousel.on('change(test1)', function (res) {
                                        console.log(res)
                                    })
                                    carousel.render({
                                        elem: '#test2',
                                        interval: 1800
                                        //,full: true
                                        ,
                                        anim: 'fade',
                                        height: '120px'
                                    })
                                    carousel.render({
                                        elem: '#test3'
                                        //,full: true
                                        ,
                                        arrow: 'always'
                                        //,autoplay: false
                                        //,indicator: 'outside'
                                        //,trigger: 'hover'
                                        ,
                                        anim: 'updown'
                                        //,full: true
                                    })
                                    carousel.render({
                                        elem: '#test4',
                                        width: '588px',
                                        height: '400px',
                                        interval: 5000
                                    })
                                })
                            }
                        })
                        break;
                    case '4':
                        customAjax.AjaxGet(url, data, function (res) {
                            console.log('轮播图')
                            if (res.result.records.length > 0) {
                                var customArr = res.result.records
                                layui.use('laytpl', function () {
                                    var laytpl = layui.laytpl
                                    var orderInfoTpl = swiperList.innerHTML,
                                        orderInfoDiv = document.getElementById('swiperBox')
                                    laytpl(orderInfoTpl).render(customArr, function (html) {
                                        orderInfoDiv.innerHTML = html
                                    })
                                })

                                // 轮播图
                                layui.use('carousel', function () {
                                    var carousel = layui.carousel

                                    //建造实例
                                    carousel.render({
                                        elem: '#test1',
                                        index: 2
                                        //,full: true
                                        ,
                                        arrow: 'always',
                                        width: '588px',
                                        height: '400px',
                                        interval: 5000
                                        //,autoplay: false
                                        //,indicator: 'outside'
                                        //,trigger: 'hover'
                                    })
                                    //事件
                                    carousel.on('change(test1)', function (res) {
                                        console.log(res)
                                    })
                                    carousel.render({
                                        elem: '#test2',
                                        interval: 1800
                                        //,full: true
                                        ,
                                        anim: 'fade',
                                        height: '120px'
                                    })
                                    carousel.render({
                                        elem: '#test3'
                                        //,full: true
                                        ,
                                        arrow: 'always'
                                        //,autoplay: false
                                        //,indicator: 'outside'
                                        //,trigger: 'hover'
                                        ,
                                        anim: 'updown'
                                        //,full: true
                                    })
                                    carousel.render({
                                        elem: '#test4',
                                        width: '588px',
                                        height: '400px',
                                        interval: 5000
                                    })
                                })
                            }
                        })
                        break;

                }
            },
            // 分局动态
            createFjdt: function () {
                $('#common_Dt_Ul').empty()
                $('.dtTagTitle').children().last().children().attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.customNewsList)
                let data = {
                    pageNo: 1,
                    pageSize: 8,
                    categoryId: '4178'
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = fjdtList.innerHTML,
                                    orderInfoDiv = document.getElementById('common_Dt_Ul')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('.dtTagTitle').children().last().children().attr('href', hostsrp.locationHref + hostsrp.allDtMoreListPage + '?categoryId=4178' + '&columnTitle=分局动态')
                            mainApp.methods.createSwiper('2', mainApp.store.policeId, '4178')
                        }
                    }
                })
            },
            // 派出所动态
            createLocalPoliceStation: function (currentText) {
                $('#common_Dt_Ul').empty()
                $('.dtTagTitle').children().last().children().attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 8,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.pcsCategoryId,
                    title: '',
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = commonDtList.innerHTML,
                                orderInfoDiv = document.getElementById('common_Dt_Ul')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('.dtTagTitle').children().last().children().attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.pcsCategoryId + '&columnTitle=' + currentText)
                    }
                })
            },
            // 村居动态
            createCjdtList: function (currentText) {
                $('#common_Dt_Ul').empty()
                $('.dtTagTitle').children().last().children().attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 8,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.cjdtCategoryId,
                    title: '',
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = commonDtList.innerHTML,
                                orderInfoDiv = document.getElementById('common_Dt_Ul')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('.dtTagTitle').children().last().children().attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '?categoryId=' + mainApp.store.pcsCategoryId + '?columnTitle=' + currentText)
                    }
                })
            },
            // 领导批示 / 通知通告
            createLdpsAndTztg: function (categoryId, titleName) {
                $('#ldpsAndTztg').empty()
                $('#ldpsAndTztg').parent('.newsList').prev().find('.total').text('0条')
                $('#ldpsAndTztg').nextAll('.lookMore').children().attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.customNewsList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    categoryId: categoryId,
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = ldpsAndTztgScript2.innerHTML,
                                orderInfoDiv = document.getElementById('ldpsAndTztg')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#ldpsAndTztg').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                        $('#ldpsAndTztg').nextAll('.lookMore').children().attr('href', hostsrp.locationHref + hostsrp.allDtMoreListPage + '?categoryId=' + categoryId + '&columnTitle=' + titleName)
                    }
                })
            },
            // 分局简报
            createGzjbAndGzdtb: function (categoryId, titleName) {
                $('#gzjbAndGzdtb').empty()
                $('#gzjbAndGzdtb').parent('.newsList').prev().find('.total').text('0条')
                $('#gzjbAndGzdtb').nextAll('.lookMore').children().attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.customNewsList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    categoryId: categoryId,
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = ldpsAndTztgScript2.innerHTML,
                                orderInfoDiv = document.getElementById('gzjbAndGzdtb')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#gzjbAndGzdtb').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                        $('#gzjbAndGzdtb').nextAll('.lookMore').children().attr('href', hostsrp.locationHref + hostsrp.allDtMoreListPage + '?categoryId=' + categoryId + '&columnTitle=' + titleName)
                    }
                })
            },
            // 各所简报
            createGsjbList: function () {
                $('#gzjbAndGzdtb').empty()
                $('#gzjbAndGzdtb').nextAll('.lookMore').children('a').attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.gzdtbCategoryId,
                    title: '',
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = gsjbScript.innerHTML,
                                orderInfoDiv = document.getElementById('gzjbAndGzdtb')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#gzjbAndGzdtb').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                        $('#gzjbAndGzdtb').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.gzdtbCategoryId + '&columnTitle=各所简报')
                    }
                })
            },
            // 基本概况
            createJbgkList: function () {
                // $('#imgs').empty()
                $('.xqdtMap').children('img').attr('src', '')
                let url = webApi.base.getUrl(webApi.commonUrl.getBasicNewsList)
                let data = {
                    pageNo: 1,
                    pageSize: 1,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.jbgkCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var item = res.result.records[0]
                            $('.xqdtMap').children('img').attr('src', hostsrp.imgUrl + item.image)
                            // var newImgArr = customArr.filter(item => {
                            //     return item.image
                            // })
                            // layui.use('laytpl', function () {
                            //     var laytpl = layui.laytpl
                            //     var orderInfoTpl = xqdtScript.innerHTML,
                            //         orderInfoDiv = document.getElementById('imgs')
                            //     laytpl(orderInfoTpl).render(newImgArr, function (html) {
                            //         orderInfoDiv.innerHTML = html
                            //     })
                            // })
                            // ImagePreview.init({ id: "imgs" })
                        }
                    }
                })
            },
            // 驻村(居)警力
            createZcmjList: function () {
                $('#customZcmjId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.zcmjList)
                let data = {
                    pageNo: 1,
                    pageSize: 3,
                    policeId: mainApp.store.policeId
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = zcmjScript.innerHTML,
                                orderInfoDiv = document.getElementById('customZcmjId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#customZcmjId').nextAll().children('a').attr('href', hostsrp.locationHref + hostsrp.zcmjPage)
                    }
                })
            },
            // 基本概况
            createGeneralSituation: function () {
                $('#customJbgkId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.generalSituation)
                let data = {
                    areaId: mainApp.store.policeId
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.classStatic.length > 0) {
                        var customArr = res.result.classStatic
                        var newArr = customArr.filter((item) => {
                            return item.CLASSCODE === 'RK' || item.CLASSCODE === 'FW' || item.CLASSCODE === 'CS' || item.CLASSCODE === 'QY' || item.CLASSCODE === 'ZDRY'
                        })
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = jbgkScript.innerHTML,
                                orderInfoDiv = document.getElementById('customJbgkId')
                            laytpl(orderInfoTpl).render(newArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                    }
                })
            },
            // 优秀村居
            createYxcjList: function () {
                $('#customYxcjId').empty()
                $('.yxcj_div').nextAll('.lookMore').children('a').attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 3,
                    policeId: '441330',
                    categoryId: mainApp.store.yxcjCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = yxcjScript.innerHTML,
                                orderInfoDiv = document.getElementById('customYxcjId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('.yxcj_div').nextAll().children().attr('href', 'hello.html')
                        $('.yxcj_div').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.yxcjCategoryId + '&columnTitle=优秀村居')
                    }
                })
            },
            // 规章制度
            createGzzdList: function () {
                $('#customGzzdId').empty()
                $('#customGzzdId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 5,
                    policeId: '441330',
                    categoryId: mainApp.store.gzzdCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = gsjbScript.innerHTML,
                                orderInfoDiv = document.getElementById('customGzzdId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#customGzzdId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.gzzdCategoryId + '&columnTitle=规章制度')
                    }
                })
            },
            // 驻村（居）警力工作动态排行
            createZcjlList: function () {
                $('#customZcjlId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 4,
                    policeId: '441330',
                    categoryId: mainApp.store.cjzxCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = zcjlScript.innerHTML,
                                orderInfoDiv = document.getElementById('customZcjlId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#customZcjlId').parent().nextAll().children().attr('href', hostsrp.locationHref + hostsrp.cjzxListPage)
                    }
                })
            },
            // 派出所排行榜
            createPcsList: function () {
                $('#customGsphId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.pcsList)
                let data = {}
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.length > 0) {
                        var customArr = res.result.slice(0, 7)
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = pcsPhScript.innerHTML,
                                orderInfoDiv = document.getElementById('customGsphId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        // $('#customGsphId').parent().nextAll().children().attr('href', 'hello.html')
                    }
                })
            },
            // 各村（居）排行
            createGcjphList: function () {
                $('#customGcjphId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.xxfbList)
                let data = {
                    pageNo: 1,
                    pageSize: 7
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.length > 0) {
                        var customArr = res.result.slice(0, 7)
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = gsphScript.innerHTML,
                                orderInfoDiv = document.getElementById('customGcjphId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#customGcjphId').nextAll().children().attr('href', hostsrp.locationHref + hostsrp.rankingListPage)
                    }
                })
            },
            // 村警排行
            createCjphList: function () {
                $('#customCjphId').empty()
                let url = webApi.base.getUrl(webApi.commonUrl.cjphList)
                let data = {
                    pageNo: 1,
                    pageSize: 7
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.result.records.length > 0) {
                        var customArr = res.result.records.slice(0, 7)
                        layui.use('laytpl', function () {
                            var laytpl = layui.laytpl
                            var orderInfoTpl = gsphScript.innerHTML,
                                orderInfoDiv = document.getElementById('customCjphId')
                            laytpl(orderInfoTpl).render(customArr, function (html) {
                                orderInfoDiv.innerHTML = html
                            })
                        })
                        $('#customCjphId').nextAll().children().attr('href', hostsrp.locationHref + hostsrp.rankingListPage)
                    }
                })
            },
            // 三+N结合
            createThreeN: function () {
                $('#customThreeNId').empty()
                $('#customThreeNId').parent('.newsList').prev().find('.total').text('0条')
                $('#customThreeNId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.snjhCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customThreeNId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customThreeNId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customThreeNId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.snjhCategoryId + '&columnTitle=三+N结合')

                        }
                    }
                })
            },
            //  联席村居
            createLxcj: function () {
                $('#customThreeNId').empty()
                $('#customThreeNId').parent('.newsList').prev().find('.total').text('0条')
                $('#customThreeNId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.lxcjCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customThreeNId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customThreeNId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customThreeNId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.lxcjCategoryId + '&columnTitle=联席村居')

                        }
                    }
                })
            },
            //  问题整治
            createWtzz: function () {
                $('#customWtzzId').empty()
                $('#customWtzzId').parent('.newsList').prev().find('.total').text('0条')
                $('#customWtzzId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.wtzzCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customWtzzId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customWtzzId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customWtzzId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.wtzzCategoryId + '&columnTitle=问题整治')

                        }
                    }
                })
            },
            //  化解矛盾纠纷
            createHjmdjf: function () {
                $('#customWtzzId').empty()
                $('#customWtzzId').parent('.newsList').prev().find('.total').text('0条')
                $('#customWtzzId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.hjmdjfCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customWtzzId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customWtzzId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customWtzzId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.hjmdjfCategoryId + '&columnTitle=化解矛盾纠纷')
                        }
                    }
                })
            },
            //  安全检查监督
            createAqjcjd: function () {
                $('#customAqjdjcId').empty()
                $('#customAqjdjcId').parent('.newsList').prev().find('.total').text('0条')
                $('#customAqjdjcId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.aqjcjdCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customAqjdjcId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customAqjdjcId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customAqjdjcId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.aqjcjdCategoryId + '&columnTitle=安全检查监督')

                        }
                    }
                })
            },
            //  联系群众
            createLxqz: function () {
                $('#customAqjdjcId').empty()
                $('#customAqjdjcId').parent('.newsList').prev().find('.total').text('0条')
                $('#customAqjdjcId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.aqjcjdCategoryId + '&columnTitle=安全检查监督')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.lxqzCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customAqjdjcId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customAqjdjcId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customAqjdjcId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.lxqzCategoryId + '&columnTitle=联系群众')

                        }
                    }
                })
            },
            //  重点人员管控
            createZdrygk: function () {
                $('#customZdrygkId').empty()
                $('#customZdrygkId').parent('.newsList').prev().find('.total').text('0条')
                $('#customZdrygkId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.zdrygkCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customZdrygkId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customZdrygkId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customZdrygkId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.zdrygkCategoryId + '&columnTitle=重点人员管控')

                        }
                    }
                })
            },
            //  其他
            createQt: function () {
                $('#customZdrygkId').empty()
                $('#customZdrygkId').parent('.newsList').prev().find('.total').text('0条')
                $('#customZdrygkId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')

                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 6,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.qtCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = newsListScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customZdrygkId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('#customZdrygkId').parent('.newsList').prev().find('.total').text(res.result.total + '条')
                            $('#customZdrygkId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.qtCategoryId + '&columnTitle=其他')
                        }
                    }
                })
            },
            //  宣传教育
            createXcjy: function () {
                $('.xcjyBox').children().last().text('')
                $('#customXcjyId').empty()
                $('#customXcjyId').nextAll('.lookMore').children('a').attr('href', 'javascript:;')
                let url = webApi.base.getUrl(webApi.commonUrl.columnList)
                let data = {
                    pageNo: 1,
                    pageSize: 4,
                    policeId: mainApp.store.policeId,
                    categoryId: mainApp.store.xcjyCategoryId,
                    title: ''
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = xcjyScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customXcjyId')
                                laytpl(orderInfoTpl).render(customArr, function (html) {
                                    orderInfoDiv.innerHTML = html
                                })
                            })
                            $('.xcjyBox').children().last().text(res.result.total + '条')
                            $('#customXcjyId').nextAll('.lookMore').children('a').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=' + mainApp.store.policeId + '&categoryId=' + mainApp.store.xcjyCategoryId + '&columnTitle=宣传教育')

                        }
                    }
                })
            },
            // 工作轨迹
            createWorkTrack: function (curr, limit, userId, userName, startTime, endTime) {
                $('#customGzgjId').empty()
                layui.use(['laypage', 'layer'], function () {
                    var laypage = layui.laypage,
                        layer = layui.layer;
                    let url = webApi.base.getUrl(webApi.commonUrl.workTrack)
                    let data = {
                        pageNo: curr,
                        pageSize: limit,
                        userid: userId,
                        username: userName,
                        startTime: startTime,
                        endTime: endTime,
                        policeId: mainApp.store.policeId
                    }
                    customAjax.AjaxGet(url, data, function (res) {
                        if (res.result.records.length > 0) {
                            var customArr = res.result.records
                            mainApp.store.gzgjCunt = res.result.total
                            layui.use('laytpl', function () {
                                var laytpl = layui.laytpl
                                var orderInfoTpl = gzgjScript.innerHTML,
                                    orderInfoDiv = document.getElementById('customGzgjId')
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
                                        if (obj.curr >= 2) {
                                            $('.mjFlag_ul').addClass('mjShow')
                                        } else {
                                            $('.mjFlag_ul').removeClass('mjShow')
                                        }
                                        mainApp.store.curr = obj.curr
                                        mainApp.store.limit = obj.limit
                                        mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime)
                                    }
                                }
                            })
                            $('#customGzgjId').parent().nextAll().children().attr('href', hostsrp.locationHref + hostsrp.workTrackMorePage)
                        }
                    })
                })
            },
            // 获取当前人员位置
            getPersonSite: function (usernames) {
                let url = webApi.base.getUrl(webApi.commonUrl.siteUrl)
                let data = {
                    policeId: mainApp.store.policeId,
                    userid: usernames
                }
                customAjax.AjaxGet(url, data, function (res) {
                    if (res.code === 200) {
                        var newArr3 = res.result
                        var newArr = []
                        var timeArr = []
                        for (let i = 0; i < newArr3.length; i++) {
                            let item = newArr3[i]
                            let obj = {}
                            obj.time = item.time
                            timeArr.push(obj)
                            newArr.push(mainApp.methods.qqMapTransBMap(item.lng, item.lat))
                        }
                        mainApp.methods.createMap(newArr, timeArr)
                    }
                })

            },
            // 地图定点
            createMap: function (siteArr, timeArr) {
                // 百度地图API功能
                if (siteArr.length >= 1) {
                    console.log(siteArr)
                    let firstObj = siteArr[0]
                    var map = new BMap.Map("allmap"); // 创建Map实例
                    map.centerAndZoom(new BMap.Point(firstObj.lng, firstObj.lat), 18); // 初始化地图,设置中心点坐标和地图级别
                    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                    map.clearOverlays()
                    var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                        scale: 0.6, //图标缩放大小
                        strokeColor: '#fff', //设置矢量图标的线填充颜色
                        strokeWeight: '2', //设置线宽
                    })
                    var icons = new BMap.IconSequence(sy, '10', '30');
                    // 创建polyline对象
                    var pois = []
                    for (let i = 0; i < siteArr.length; i++) {
                        let item = siteArr[i]
                        let customPoint = {}
                        customPoint.lng = item.lng
                        customPoint.lat = item.lat
                        mainApp.methods.addMarker(map, customPoint, timeArr[i].time)
                        pois.push(new BMap.Point(item.lng, item.lat))
                    }
                    var polyline = new BMap.Polyline(pois, {
                        enableEditing: false, //是否启用线编辑，默认为false
                        enableClicking: true, //是否响应点击事件，默认为true
                        icons: [icons],
                        strokeWeight: '8', //折线的宽度，以像素为单位
                        strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
                        strokeColor: "#2652DD" //折线颜色
                    });

                    map.addOverlay(polyline); //增加折线
                } else {
                    // 百度地图API功能
                    if (siteArr.length >= 1) {
                        var map = new BMap.Map("allmap"); // 创建Map实例
                        map.centerAndZoom(new BMap.Point(114.347659, 23.041654), 18); // 初始化地图,设置中心点坐标和地图级别
                        map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                        map.clearOverlays()
                        var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                            scale: 0.6, //图标缩放大小
                            strokeColor: '#fff', //设置矢量图标的线填充颜色
                            strokeWeight: '2', //设置线宽
                        });
                        var icons = new BMap.IconSequence(sy, '10', '30')
                        // 创建polyline对象
                        var pois = []
                        for (let i = 0; i < siteArr.length; i++) {
                            let item = siteArr[i]
                            pois.push(new BMap.Point(item.lng, item.lat))
                        }
                        var polyline = new BMap.Polyline(pois, {
                            enableEditing: false, //是否启用线编辑，默认为false
                            enableClicking: true, //是否响应点击事件，默认为true
                            icons: [icons],
                            strokeWeight: '8', //折线的宽度，以像素为单位
                            strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
                            strokeColor: "#2652DD" //折线颜色
                        });
                        map.addOverlay(polyline); //增加折线
                    }
                }
            },
            // 创建标注
            addMarker: function (map, point, time) {
                var marker = new BMap.Marker(point)
                var label = new BMap.Label(time, { offset: new BMap.Size(20, -10) })
                label.setStyle({
                    padding: '5px 10px',
                    border: '1px solid #999',
                    color: 'red',
                })
                map.addOverlay(marker)
                marker.setLabel(label)
            },
            qqMapTransBMap: function (lng, lat) {
                // 腾讯/高德地图转换成百度子图经纬度
                let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
                let x = lng;
                let y = lat;
                let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
                let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
                let lngs = z * Math.cos(theta) + 0.0065;
                let lats = z * Math.sin(theta) + 0.006;

                return {
                    lng: lngs,
                    lat: lats
                }
            },
            // 默认初始化地图
            initializeMap: function () {
                // 百度地图API功能
                var map = new BMap.Map("allmap");    // 创建Map实例
                map.centerAndZoom(new BMap.Point(114.347659, 23.041654), 16);  // 初始化地图,设置中心点坐标和地图级别
                //添加地图类型控件
                map.addControl(new BMap.MapTypeControl({
                    mapTypes: [
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]
                }))
                map.setCurrentCity("仲恺");          // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            },
        },
        event: function () {

            $('.xqdtMap').find('#xqdtMore').attr('href', hostsrp.locationHref + hostsrp.xqdtListPage) // 辖区地图 - 更多

            // 地图定点事件
            $('#customGzgjId').on('click', 'a', function () {
                var customUserNames = $(this).attr('data-usernames')
                mainApp.methods.getPersonSite(customUserNames)
            })


            // 公共动态切换事件
            $('.dtTag_ul li').each(function () {
                $(this).on('click', 'a', function () {
                    $(this).addClass('dtCor').parent().siblings().children().removeClass('dtCor')

                    let currentText = $(this).text()

                    switch (currentText) {
                        case '分局动态':
                            mainApp.methods.createFjdt()
                            mainApp.methods.createSwiper('2', mainApp.store.policeId, '4178')
                            break;
                        case '派出所动态':
                            mainApp.methods.createLocalPoliceStation(currentText)
                            mainApp.methods.createSwiper('3', mainApp.store.policeId, mainApp.store.pcsCategoryId)
                            break;
                        case '村居动态':
                            mainApp.methods.createCjdtList(currentText)
                            mainApp.methods.createSwiper('4', mainApp.store.policeId, mainApp.store.cjdtCategoryId)

                            break;
                    }
                })
            })

            // 通知通告 / 领导批示 / 分局动态 / 各所简报 切换事件
            var customP = $('.nameChange').children()
            customP.each(function () {
                $(this).on('click', 'a', function () {
                    var titleName = $(this).children('span').text()
                    switch (titleName) {
                        case '通知通告':
                            mainApp.methods.createLdpsAndTztg(mainApp.store.tztgCategoryId2, titleName)
                            break;
                        case '领导批示':
                            mainApp.methods.createLdpsAndTztg(mainApp.store.ldpsCategoryId2, titleName)
                            break;
                        case '分局简报':
                            mainApp.methods.createGzjbAndGzdtb(mainApp.store.gzjbCategoryId2, titleName)
                            break;
                        case '各所简报':
                            mainApp.methods.createGsjbList(mainApp.store.gsjbCategoryId)
                            break;
                        case '三+N结合':
                            mainApp.methods.createThreeN(mainApp.store.snjhCategoryId)
                            break;
                        case '联席村居':
                            mainApp.methods.createLxcj(mainApp.store.lxcjCategoryId)
                            break;
                        case '问题整治':
                            mainApp.methods.createWtzz(mainApp.store.wtzzCategoryId)
                            break;
                        case '化解矛盾纠纷':
                            mainApp.methods.createHjmdjf(mainApp.store.hjmdjfCategoryId)
                            break;
                        case '安全检查监督':
                            mainApp.methods.createAqjcjd(mainApp.store.aqjcjdCategoryId)
                            break;
                        case '联系群众':
                            mainApp.methods.createLxqz(mainApp.store.lxqzCategoryId)
                            break;
                        case '重点人员管控':
                            mainApp.methods.createZdrygk(mainApp.store.zdrygkCategoryId)
                            break;
                        case '其他':
                            mainApp.methods.createQt(mainApp.store.qtCategoryId)
                            break;
                    }
                    $(this).parent().addClass('targetBdCor').siblings('p').removeClass('targetBdCor')
                })
            })

            // 屏幕滚动事件
            $(window).scroll(function () {

                // $(windown).height()      - 当前浏览器可显示范围
                // $(window).scrollTop()    - 当前滚动条滚动的高度
                // $(document).height()     - 当前所有内容总高度

                var jbgkStatisticsHeight = parseFloat($('.jbgkStatistics').offset().top)
                var zcjlParentBoxHeight = parseFloat($('.zcjlParentBox').offset().top)
                var srollPos = $(window).scrollTop()

                if (jbgkStatisticsHeight - parseFloat($(window).scrollTop()) <= parseFloat($(window).height()) && mainApp.store.custonNum == 1) {

                    mainApp.methods.createGeneralSituation() // 基本概況
                    mainApp.methods.createYxcjList() // 优秀村居
                    mainApp.methods.createGzzdList() // 规章制度
                    mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime) // 工作轨迹


                    mainApp.store.custonNum = 2
                }
                if (zcjlParentBoxHeight - parseFloat($(window).scrollTop()) <= parseFloat($(window).height()) && mainApp.store.custonNum == 2) {


                    mainApp.methods.createZcjlList() // 村警之星
                    mainApp.methods.createPcsList() // 各所排行
                    mainApp.methods.createGcjphList() // 各村（居）排行
                    mainApp.methods.createCjphList() // 村警排行

                    mainApp.methods.createThreeN() // 三+N结合
                    mainApp.methods.createWtzz() // 问题整治
                    mainApp.methods.createAqjcjd() // 安全检查监督
                    mainApp.methods.createZdrygk() // 重点人员管控
                    mainApp.methods.createXcjy() // 宣传教育

                    mainApp.store.custonNum = 3
                }

                // 监听浏览器刷新
                window.onbeforeunload = function () {
                    document.documentElement.scrollTop = 0; //ie下
                    document.body.scrollTop = 0; //非ie
                }
            })
        },
        init: function () {

            $('header').load('./pages/commonNav.html .commonNav', function () {
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navHomeId').attr('href', hostsrp.locationHref + hostsrp.homePage) // 首页
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navGzzdId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('gzzdId') + '&columnTitle=规章制度') // 规章制度
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navYxcjId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('yxcjId') + '&columnTitle=优秀村居') // 优秀村居
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navTcwtzzId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('tcwtzzId') + '&columnTitle=突出问题整治') // 突出问题整治
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navCjzxId').attr('href', hostsrp.locationHref + hostsrp.cjzxListPage) // 村警之星
                $('header').children('.commonNav').children().last().children('ul').children('li').find('#navLwgbId').attr('href', hostsrp.locationHref + hostsrp.leaderPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('lwgbId') + '&columnTitle=两委干部') // 两委干部
                $.getScript("./js/commonNav.js")

                mainApp.event()

                mainApp.methods.createColumn()

                mainApp.methods.createMap([])

                // 点击搜索
                $('#searchBtn').on('click', function () {
                    var userName = $('#inputUserName').val()

                    mainApp.store.userName = userName
                    mainApp.store.curr = 1
                    mainApp.store.limit = 3

                    mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime)
                })

                setTimeout(() => {
                    mainApp.methods.createTreeList()
                    // mainApp.methods.createFjdt() // 分局动态
                    // mainApp.methods.createLdpsAndTztg(mainApp.store.tztgCategoryId2, '通知通告') // 领导批示 / 通知通告
                    // mainApp.methods.createGzjbAndGzdtb(mainApp.store.gzjbCategoryId2, '分局简报') // 分局简报
                    // mainApp.methods.createJbgkList() // 基本概况
                    // mainApp.methods.createZcmjList() // 驻村(居)警力
                    // mainApp.methods.initializeMap()
                }, 1000)
            })

        },
    }
    mainApp.init()
})
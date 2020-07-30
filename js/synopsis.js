$(function () {
  var mainApp = {
    store: {
      policeId: '441330',
      categoryId: '',
      treeArr: [],
      setting: {
        data: {
          key: {
            name: 'title'
          }
        },
        callback: {
          beforeClick: function (treeId, treeNode) {
            mainApp.store.policeId = treeNode.key

            $('header').children('.commonNav').children('.navTitle').children('h1').text(treeNode.jgmc + '一村 (居) 一警专栏')
            $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(treeNode.jgmc)
            $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').nextAll('.zTreeDemoBackground').addClass('customShow')

            mainApp.methods.createColumnList(1, 1, mainApp.store.categoryId)
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
          pageSize: 11
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            var newArr = res.result.records
            for (var i = 0; i < newArr.length; i++) {
              var item = newArr[i]
              if (item.name === '基本概况') {
                console.log(item.id)
                mainApp.store.categoryId = item.id
                mainApp.methods.createColumnList(1, 30, item.id)
                break;
              }
            }
          }
        })
      },
      // 栏目列表
      createColumnList: function (pageNo, pageSize, categoryId) {
        let url = webApi.base.getUrl(webApi.commonUrl.getBasicNewsList)
        let data = {
          pageNo: pageNo,
          pageSize: pageSize,
          policeId: mainApp.store.policeId,
          categoryId: categoryId,
          title: ''
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            if (res.result.records.length > 0) {
              let obj = res.result.records[0]
              mainApp.methods.createDetails(obj.id)
            } else {
              mainApp.methods.createDetails('')
            }
          }
        })
      },
      // 栏目详情
      createDetails: function (newsId) {
        $('.mainContent h1').text('')
        $('.mainContent h3').children('span:first-child').text('')
        $('.mainContent h3').children('span:last-child').text('')
        $('.news_content').children('img').attr('src', '')
        $('.news_content').children('.content').html('')
        let url = webApi.base.getUrl(webApi.commonUrl.newsDetails)
        let data = {
          newsId: newsId,
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            if (res.code === 200) {
              $('.mainContent h1').text(res.result.title)
              $('.mainContent h3').children('span:first-child').text(res.result.policeareaname)
              $('.mainContent h3').children('span:last-child').text(res.result.createDate)
              $('.news_content').children('img').attr('src', hostsrp.imgUrl + res.result.image)
              $('.news_content').children('.content').append(res.result.articleData.content)
            }
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
      mainApp.methods.createTreeList()
      mainApp.methods.createColumn()
    }
  }
  mainApp.init()
})
$(function () {
  var mainApp = {
    store: {
      policeId: '441330',
      categoryId: '',
      setting: {
        data: {
          key: {
            name: 'title'
          }
        },
        callback: {
          beforeClick: function (treeId, treeNode) {
            mainApp.store.policeId = treeNode.key

            if (treeNode.jgjb === '3' || treeNode.jgjb === '4') {
              $('.mjFlag_ul').addClass('mjShow')
            } else {
              $('.mjFlag_ul').removeClass('mjShow')
            }

            $('header').children('.commonNav').children('.navTitle').children('h1').text(treeNode.jgmc + '一村 (居) 一警专栏')
            $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(treeNode.jgmc)
            $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').nextAll('.zTreeDemoBackground').addClass('customShow')

            mainApp.methods.getJbqkList(treeNode.jgmc)
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
          pageSize: 30
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            var newArr = res.result.records
            for (var i = 0; i < newArr.length; i++) {
              var item = newArr[i]
              if (item.name === '基本概况') {
                mainApp.store.categoryId = item.id
                mainApp.methods.createColumnList(1, 1, mainApp.store.categoryId)
                break;
              }
            }
          }
        })
      },
      // 栏目列表
      createColumnList: function (pageNo, pageSize, categoryId) {
        $('#imgs').empty()
        let url = webApi.base.getUrl(webApi.commonUrl.getBasicNewsList)
        let data = {
          pageNo: pageNo,
          pageSize: pageSize,
          policeId: mainApp.store.policeId,
          categoryId: categoryId,
          title: ''
        }
        customAjax.AjaxGet(url, data, function (res) {
          console.log('res start')
          console.log(res)
          if (res.code === 200) {
            if (res.result.records.length > 0) {
              var newImgArr = res.result.records
              layui.use('laytpl', function () {
                var laytpl = layui.laytpl
                var orderInfoTpl = xqdtScript.innerHTML,
                  orderInfoDiv = document.getElementById('imgs')
                laytpl(orderInfoTpl).render(newImgArr, function (html) {
                  orderInfoDiv.innerHTML = html
                })
              })
            }
          }
        })
      },
      getJbqkList: function (title) {
        $('#customers').html('')
        $('h1').text('')
        let url = webApi.base.getUrl(webApi.commonUrl.getJbjkTableList)
        let data = {
          areaId: mainApp.store.policeId
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 0) {
            let item = res.result
            if (mainApp.store.policeId === '441330') {
              $('h1').text('仲恺高新技术产业开发区')
            } else {
              $('h1').text(title)
            }
            let str = '<tr>' +
              '<th colspan="3" style="text-align: center;">基本情况表 </th>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>户籍人口（约）</td>' +
              '<td>' + item.czrk + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>流动人口（约）</td>' +
              '<td>' + item.ldrk + '</td>' +
              '</tr>' +
              '<tr>' +
              '<td>精神病人（约）</td>' +
              '<td>' + item.jsbr + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>吸毒人口（约）</td>' +
              '<td>' + item.xdrk + '</td>' +
              '</tr>' +
              '<tr>' +
              '<td>出租屋（约）</td>' +
              '<td>' + item.czw + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td width="">企业（约）</td>' +
              '<td width="">' + item.qy + '</td>' +
              '</tr>' +
              '<tr>' +
              '<td>剧毒企业（约）</td>' +
              '<td>' + item.jdqy + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>物流企业（约）</td>' +
              '<td>' + item.wlqy + '</td>' +
              '</tr>' +
              '<tr>' +
              '<td>学校（约）</td>' +
              '<td>' + item.xx + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>酒店（约）</td>' +
              '<td>' + item.jd + '</td>' +
              '</tr>' +
              '<tr>' +
              '<td>娱乐（约）</td>' +
              '<td>' + item.ylcs + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>加油站（约）</td>' +
              '<td>' + item.jyz + '</td>' +
              '</tr>' +
              '<tr class="">' +
              '<td>小区（约）</td>' +
              '<td>' + item.xq + '</td>' +
              '</tr>' +
              '<tr class="alt">' +
              '<td>商场（约）</td>' +
              '<td>' + item.sc + '</td>' +
              '</tr>' +
              '<tr class="">' +
              '<td>其他重点单位（约）</td>' +
              '<td>' + item.qtzddw + '</td>' +
              '</tr>'

            $('#customers').append(str)
          }
        })
      }
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
      $('[data-magnify]').magnify({
        headToolbar: [
          'close'
        ],
        initMaximized: true
      })
    },
    init: function () {
      mainApp.event()
      mainApp.methods.getJbqkList('')
      mainApp.methods.createColumn('')
      setTimeout(() => {
        mainApp.methods.createTreeList()
      }, 1000)
    },
  }
  mainApp.init()
})
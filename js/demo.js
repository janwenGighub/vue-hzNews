$(function () {
  let mainApp = {
    store: {
      policeId: '441330',
      curr: 1,
      limit: 12,
    },
    methods: {
      // 两委干部
      createLwgbList (curr, limit) {
        $('#customLwgbId').empty()
        layui.use(['laypage', 'layer'], function () {
          var laypage = layui.laypage,
            layer = layui.layer;

          let url = webApi.base.getUrl(webApi.commonUrl.leaderList)
          let data = {
            pageNo: curr,
            pageSize: limit,
            xm: '',
            zw: '',
            policeId: mainApp.store.policeId
          }
          customAjax.AjaxGet(url, data, function (res) {
            if (res.code === 200) {
              if (res.result.records.length > 0) {
                let customArr = res.result.records
                layui.use('laytpl', function () {
                  var laytpl = layui.laytpl
                  var orderInfoTpl = lwgbScript.innerHTML,
                    orderInfoDiv = document.getElementById('customLwgbId')
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
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数

                    //首次不执行
                    if (!first) {
                      mainApp.store.curr = obj.curr
                      mainApp.store.limit = obj.limit
                      mainApp.methods.createLwgbList(mainApp.store.curr, mainApp.store.limit)
                    }
                  }
                });
              }
            }
          })

        })
      },
    },
    event: function () {
      $('header').load('../pages/commonNav.html .commonNav', function () {
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navHomeId').attr('href', hostsrp.locationHref + hostsrp.homePage) // 首页
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navGzzdId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('gzzdId') + '&columnTitle=规章制度') // 规章制度
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navYxcjId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('yxcjId') + '&columnTitle=优秀村居') // 优秀村居
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navTcwtzzId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('tcwtzzId') + '&columnTitle=突出问题整治') // 突出问题整治
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navCjzxId').attr('href', hostsrp.locationHref + hostsrp.cjzxListPage) // 村警之星
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navLwgbId').attr('href', hostsrp.locationHref + hostsrp.leaderPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('lwgbId') + '&columnTitle=两委干部') // 两委干部
        /**---------------------------------------------------------------- 顶部 基本概况点击 */
        $('header').on('click', '#navJbgkId', function () {
          console.log('hellll')
          if ($(this).nextAll('.customMenu').hasClass('customShow')) {
            $(this).nextAll('.customMenu').removeClass('customShow')
          } else {
            $(this).nextAll('.customMenu').addClass('customShow')
          }
        })

        /**---------------------------------------------------------------- 顶部 基本概况子节点点击 */
        var customLis = $('header').children('.commonNav').children('.navList').children('ul').children('li').find('.customMenu').children()
        customLis.each(function () {
          $(this).on('click', function () {
            let customText = $(this).text()
            switch (customText) {
              case '基本概况':
                $(this).children().attr('href', hostsrp.locationHref + hostsrp.synopsisDetailsPage)
                break;
              case '基本情况':
                break;
              case '驻村(居)警力':
                $(this).children().attr('href', hostsrp.locationHref + hostsrp.zcmjPage)
                break;
              case '硬件设施':

                break;
            }
          })
        })
      })
    },
    init: function () {
      mainApp.event()
      mainApp.methods.createLwgbList(mainApp.store.curr, mainApp.store.limit)
    }
  }
  mainApp.init()
})
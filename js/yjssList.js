var mainApp = {
  store: {
    policeId: '441330',
    treeArr: [],
    categoryId: '',
    curr: 1,
    limit: 12,
    customTotal: 0
  },
  methods: {
    // 硬件设施
    createYjssList: function () {
      $('#imgs').empty()
      let url = webApi.base.getUrl(webApi.commonUrl.yjssList)
      let data = {}
      customAjax.AjaxGet(url, data, function (res) {
        if (res.code === 200) {
          if (res.result.length > 0) {
            var customArr = res.result
            layui.use('laytpl', function () {
              var laytpl = layui.laytpl
              var orderInfoTpl = yjssScript.innerHTML,
                orderInfoDiv = document.getElementById('imgs')
              laytpl(orderInfoTpl).render(customArr, function (html) {
                orderInfoDiv.innerHTML = html
              })
            })
          }
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
  },
  init: function () {
    mainApp.event()
    mainApp.methods.createYjssList()
  }
}
mainApp.init()
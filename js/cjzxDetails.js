$(function () {
  var mainApp = {
    store: {
      newsId: '',
    },
    methods: {
      createNewsDetails: function () {
        $('.imgBox').children().attr('src', '')
        $('h2').text('')
        $('.synopsis').html('')
        let url = webApi.base.getUrl(webApi.commonUrl.newsDetails)
        let data = {
          newsId: mainApp.store.newsId
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            var newDeteilsObj = res.result
            $('.imgBox').children().attr('src', hostsrp.imgUrl + newDeteilsObj.image)
            $('h2').text(newDeteilsObj.title)
            $('.synopsis').html(newDeteilsObj.articleData.content)
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
      })
      /**---------------------------------------------------------------- 顶部 基本概况点击 */
      $('header').on('click', '#navJbgkId', function () {
        if ($(this).nextAll('.customMenu').hasClass('customShow')) {
          $(this).nextAll('.customMenu').removeClass('customShow')
        } else {
          $(this).nextAll('.customMenu').addClass('customShow')
        }
      })

      /**---------------------------------------------------------------- 顶部 基本概况子节点点击 */
      var customLiA = $('header').children('.commonNav').children('.navList').children('ul').children('li').find('#navJbgkId')
      var customMenu = $('header').children('.commonNav').children('.navList').children('ul').children('li').find('.customMenu')
      var customLis = $('header').children('.commonNav').children('.navList').children('ul').children('li').find('.customMenu').children()

      customLiA.on('mouseover', function () {
        $(this).nextAll('.customMenu').show()
      })
      customLiA.on('mouseout', function () {
        $(this).nextAll('.customMenu').hide()
      })
      customMenu.on('mouseover', function () {
        $(this).show()
      })
      customMenu.on('mouseout', function () {
        $(this).hide()
      })
      customLis.each(function () {
        $(this).on('click', function () {
          let customText = $(this).text()
          switch (customText) {
            case '基本概况':
              $(this).children().attr('href', hostsrp.locationHref + hostsrp.synopsisDetailsPage)
              break;
            case '基本情况':
              $(this).children().attr('href', hostsrp.locationHref + hostsrp.jbqkTablePage)
              break;
            case '驻村(居)警力':
              $(this).children().attr('href', hostsrp.locationHref + hostsrp.zcmjPage)
              break;
            case '硬件设施':
              $(this).children().attr('href', hostsrp.locationHref + hostsrp.yjssListPage)
              break;
          }
        })
      })
      mainApp.store.newsId = transferJson.getUrlParam('id')

    },
    init: function () {
      mainApp.event()
      mainApp.methods.createNewsDetails()
    },
  }
  mainApp.init()
})
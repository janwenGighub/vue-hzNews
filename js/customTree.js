setTimeout(() => {
  $('#menuTree').find('p a').each(function (value, index) {
    $(this).hover(function () {
      $(this).parent().next().fadeIn(600)
      $(this).parent().next().siblings('.treeUl').fadeOut(300)
    }, function () {
      $(this).parent().next().siblings('.treeUl').fadeOut(300)
    })
  })

  $('#menuTree').find('p a').each(function (value, index) {
    $(this).on('click', function () {
      var customText = $(this).text()
      var customKey = $(this).attr('id')
      var customJgjb = $(this).attr('jgjb')

      mainApp.store.policeId = customKey

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

      switch (customJgjb) {
        case '2':
          console.log('切換至分局動態')
          $('.zcmjBox').children('.policeList').children('.police_ul:first-child').removeClass('zcjjlShow').siblings('.police_ul').addClass('zcjjlShow')
          $('.dtTag_ul').children('li:first-child').children().addClass('dtCor').text('分局动态').parent().siblings().children().removeClass('dtCor').text('派出所动态')
          // mainApp.methods.createFjdt() // 分局动态
          break;
        case '3':
          console.log('切換至派出所动态')
          $('.zcmjBox').children('.policeList').children('.police_ul:first-child').addClass('zcjjlShow').siblings('.police_ul ').removeClass('zcjjlShow')
          $('.dtTag_ul').children('li:first-child').children().addClass('dtCor').text('派出所动态').parent().siblings().children().removeClass('dtCor').text('村居动态')
          // mainApp.methods.createLocalPoliceStation('派出所动态')
          // mainApp.methods.createSwiper('3', mainApp.store.policeId, mainApp.store.pcsCategoryId)
          break;
        case '4':
          console.log('切換至村居动态')
          $('.zcmjBox').children('.policeList').children('.police_ul:first-child').addClass('zcjjlShow').siblings('.police_ul ').removeClass('zcjjlShow')
          $('.dtTag_ul').children('li:last-child').children().addClass('dtCor').text('村居动态').parent().siblings().children().removeClass('dtCor').text('派出所动态')
          // mainApp.methods.createCjdtList('村居动态') // 村居动态
          // mainApp.methods.createSwiper('4', mainApp.store.policeId, mainApp.store.cjdtCategoryId)
          break;
      }
      $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
      $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)
      $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').nextAll('.zTreeDemoBackground').addClass('customShow')
      // mainApp.methods.createLdpsAndTztg(mainApp.store.tztgCategoryId2, '通知通告') // 领导批示 / 通知通告
      // mainApp.methods.createGzjbAndGzdtb(mainApp.store.gzjbCategoryId2, '分局简报') // 分局简报
      // mainApp.methods.createZcmjList() // 驻村(居)警力
      mainApp.methods.createJbgkList() // 基本概况

      $('#menuTree').hide()
    })
  })

  $('header').children('.commonNav').children('.navList').find('li:last-child').hover(function () {
    $(this).children('.menuTree').fadeIn(600)
  }, function () {
    $(this).children('.menuTree').fadeOut(600)
  })
}, 1000)
setTimeout(() => {
  $('#menuTree').find('p a').each(function () {
    $(this).hover(function () {
      $(this).parent().next().stop().fadeIn(600)
      $(this).parent().next().siblings('.treeUl').stop().fadeOut(300)
    }, function () {
      $(this).parent().next().siblings('.treeUl').stop().fadeOut(300)
    })
  })

  $('#menuTree').find('p a').each(function () {
    $(this).on('click', function () {
      var customText = $(this).text()
      var customKey = $(this).attr('id')
      var customJgjb = $(this).attr('jgjb')

      mainApp.store.policeId = customKey

      // 基本情况 - 表格切换
      if (mainApp.store.jbqkTableFlag) {
        console.log('基本情况 - 表格切换')
        if (customJgjb === '3' || customJgjb === '4') {
          $('.mjFlag_ul').addClass('mjShow')
        } else {
          $('.mjFlag_ul').removeClass('mjShow')
        }

        $('header').children('.commonNav').children('.navTitle').children('h1').text(customJgjb + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)

        mainApp.methods.getJbqkList(customJgjb.jgmc)
        mainApp.methods.createColumnList(1, 1, mainApp.store.categoryId)
      }

      // 首页
      if (mainApp.store.indexFlag) {
        console.log('首页')
        // 页面刷新后返回浏览器最顶端
        document.documentElement.scrollTop = 0; //ie下
        document.body.scrollTop = 0; //非ie

        $('.contentArea').find('.nameChange').each(function () {
          $(this).children('p:first-child').addClass('targetBdCor').siblings('p:last-child').removeClass('targetBdCor')
        })
        mainApp.store.custonNum = 1

        switch (customJgjb) {
          case '2':
            console.log('切換至分局動態')
            $('.zcmjBox').children('.policeList').children('.police_ul:first-child').removeClass('zcjjlShow').siblings('.police_ul').addClass('zcjjlShow')
            $('.dtTag_ul').children('li:first-child').children().addClass('dtCor').text('分局动态').parent().siblings().children().removeClass('dtCor').text('派出所动态')
            mainApp.methods.createFjdt() // 分局动态
            mainApp.methods.createCjbList() // 驻村（居）警力 - 村警办
            break;
          case '3':
            console.log('切換至派出所动态')
            $('.zcmjBox').children('.policeList').children('.police_ul:first-child').addClass('zcjjlShow').siblings('.police_ul ').removeClass('zcjjlShow')
            $('.dtTag_ul').children('li:first-child').children().addClass('dtCor').text('派出所动态').parent().siblings().children().removeClass('dtCor').text('村居动态')
            mainApp.methods.createLocalPoliceStation('派出所动态')
            mainApp.methods.createSwiper('3', mainApp.store.policeId, mainApp.store.pcsCategoryId)
            mainApp.methods.createZcmjList() // 驻村(居)警力
            break;
          case '4':
            console.log('切換至村居动态')
            $('.zcmjBox').children('.policeList').children('.police_ul:first-child').addClass('zcjjlShow').siblings('.police_ul ').removeClass('zcjjlShow')
            $('.dtTag_ul').children('li:last-child').children().addClass('dtCor').text('村居动态').parent().siblings().children().removeClass('dtCor').text('派出所动态')
            mainApp.methods.createCjdtList('村居动态') // 村居动态
            mainApp.methods.createSwiper('4', mainApp.store.policeId, mainApp.store.cjdtCategoryId)
            mainApp.methods.createZcmjList() // 驻村(居)警力
            break;
        }
        $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)
        mainApp.methods.createLdpsAndTztg(mainApp.store.tztgCategoryId2, '通知通告') // 领导批示 / 通知通告
        mainApp.methods.createGzjbAndGzdtb(mainApp.store.gzjbCategoryId2, '分局简报') // 分局简报
        mainApp.methods.createJbgkList() // 基本概况
      }

      // 两委干部
      if (mainApp.store.leaderFlag) {
        if (customJgjb === '3' || customJgjb === '4') {
          $('.mjFlag_ul').addClass('mjShow')
        } else {
          $('.mjFlag_ul').removeClass('mjShow')
        }

        if (customJgjb === '2') {
          mainApp.methods.createZcmjList()
        } else if (customJgjb === '3') {
          mainApp.methods.createZcmjList2()
        } else {
          mainApp.methods.createZcmjList3()
        }

        $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)
      }

      // 基本概况
      if (mainApp.store.synopsisFlag) {

        $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)

        mainApp.methods.createColumnList(1, 1, mainApp.store.categoryId)
      }

      // 工作轨迹
      if (mainApp.store.workTrackMoreFlag) {

        $('.contentArea').find('.nameChange').each(function () {
          $(this).children('p:first-child').addClass('targetBdCor').siblings('p:last-child').removeClass('targetBdCor')
        })

        $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)

        mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime)

      }

      // 辖区地图
      if (mainApp.store.xqdtListFlag) {
        if (customJgjb === '3' || customJgjb === '4') {
          $('.mjFlag_ul').addClass('mjShow')
        } else {
          mainApp.store.policeId = ''
          $('.mjFlag_ul').removeClass('mjShow')
        }

        $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)

        mainApp.methods.createColumnList(1, 300, mainApp.store.categoryId)
      }

      // 驻村（居）警力
      if (mainApp.store.zcjjlListFlag) {

        if (customJgjb === '3' || customJgjb === '4') {
          $('.mjFlag_ul').addClass('mjShow')
        } else {
          $('.mjFlag_ul').removeClass('mjShow')
        }

        if (customJgjb === '2') {
          mainApp.methods.createAll()
          mainApp.methods.createZcmjList()
        } else if (customJgjb === '3') {
          mainApp.methods.createZcmjList2()
        } else {
          mainApp.methods.createZcmjList3()
        }

        $('header').children('.commonNav').children('.navTitle').children('h1').text(customText + '一村 (居) 一警专栏')
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(customText)

      }

      $('#menuTree').hide()
    })
  })

  $('header').children('.commonNav').children('.navList').find('li:last-child').hover(function () {
    if (mainApp.store.workTrackMoreFlag) {
      $('#allmap').css({
        'z-index': -1
      })
    }

    if (mainApp.store.xqdtListFlag) {
      console.log('辖区地图')
      $('#imgs').find('li a').css({
        'z-index': -1
      })
    }
    $(this).children('.menuTree').stop().fadeIn(600)
  }, function () {
    if (mainApp.store.workTrackMoreFlag) {
      $('#allmap').css({
        'z-index': 0
      })
    }

    if (mainApp.store.xqdtListFlag) {
      $('#imgs').find('li a').css({
        'z-index': 0
      })
    }
    $(this).children('.menuTree').stop().fadeOut(600)
  })
}, 1000)
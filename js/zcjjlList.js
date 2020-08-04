 var mainApp = {
    store: {
      customStr: '',
      zcjjlListFlag: true,
      policeId: '441330',
      treeArr: [],
      curr: 1,
      limit: 16
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
            document.getElementById("menuTree").innerHTML = mainApp.methods.forTree(customArr)
            $.getScript('../js/customTree.js')
          }
        })
      },
      forTree: function (o) {
        for (var i = 0; i < o.length; i++) {
          var urlstr = ""
          try {
            if (typeof o[i]["url"] == "undefined") {
              urlstr = "<p><a jgjb=" + o[i].jgjb + " id=" + o[i].key + " href='javascript:;'><span>" + o[i]["title"] + "</span></a><div class='treeUl'>"
            } else {
              urlstr = "<li><span><a href=" + o[i]["url"] + ">" + o[i]["title"] + "</a></span><ul>"
            }
            mainApp.store.customStr += urlstr
            if (o[i]["children"] != null) {
              mainApp.methods.forTree(o[i]["children"])
            }
            mainApp.store.customStr += "</div></p>"
          } catch (e) { }
        }
        return mainApp.store.customStr
      },
      // 分局
      createZcmjList: function () {
        $('.policeBox').empty()
        let url = webApi.base.getUrl(webApi.commonUrl.zcmjList2)
        let data = {
          policeId: mainApp.store.policeId,
          pageNo: 1,
          pageSize: 16
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            if (res.result.length > 0) {
              var customArr = res.result
              var newHtml = ''
              for (let m = 0; m < customArr.length; m++) {
                let pcsArr = customArr[m].children
                $('.policeBox').load('../pages/zcjlDiv.html', function () {
                  for (let i = 0; i < pcsArr.length; i++) {
                    let pcsItem = pcsArr[i]
                    newHtml += '<div class="viewBox">'
                    newHtml += '<h4>' + pcsItem.title + '</h4>'
                    for (let j = 0; j < pcsItem.children.length; j++) {
                      let cwItem = pcsItem.children[j]
                      if (cwItem.zcjls.length > 0) {
                        newHtml += '<div class="person">'
                        newHtml += '<div class="villageName">' + cwItem.title + '</div>'
                        newHtml += '<div class="personList">'
                        newHtml += '<ul class="zcmj_ul mjFlag_ul">'
                        for (let k = 0; k < cwItem.zcjls.length; k++) {
                          let item = cwItem.zcjls[k]
                          if (item.avatar) {
                            newHtml += '<li>'
                            newHtml += '<div class="imgBox">'
                            newHtml += '<img src="' + hostsrp.zcmjImgUrl + item.avatar + '" alt="">'
                            newHtml += '</div>'
                            newHtml += '<div class="describe">'
                            newHtml += '<p>'
                            newHtml += '<span>姓名:</span><span>' + item.name + '</span>'
                            newHtml += '</p>'
                            newHtml += '<p>'
                            newHtml += '<span>警号:</span><span>' + item.policeNum + '</span>'
                            newHtml += '</p>'
                            newHtml += '<p>'
                            newHtml += '<span>联系方式:</span><span>' + item.phone + '</span>'
                            newHtml += '</p>'
                            newHtml += '<p>'
                            newHtml += '<span>村居:</span><span>' + cwItem.title + '</span>'
                            newHtml += '</p>'
                            newHtml += '<p>'
                            newHtml += '<span>职务:</span><span>' + item.post + '</span>'
                            newHtml += '</p>'
                            newHtml += '</div>'
                            newHtml += '</li>'
                          }
                          // else {
                          //   newHtml += '<li>'
                          //   newHtml += '<div class="imgBox">'
                          //   newHtml += '<img src="../image/police.png" alt="">'
                          //   newHtml += '</div>'
                          //   newHtml += '<div class="describe">'
                          //   newHtml += '<p>'
                          //   newHtml += '<span>姓名:</span><span>' + item.name + '</span>'
                          //   newHtml += '</p>'
                          //   newHtml += '<p>'
                          //   newHtml += '<span>警号:</span><span>' + item.policeNum + '</span>'
                          //   newHtml += '</p>'
                          //   newHtml += '<p>'
                          //   newHtml += '<span>联系方式:</span><span>' + item.phone + '</span>'
                          //   newHtml += '</p>'
                          //   newHtml += '<p>'
                          //   newHtml += '<span>村居:</span><span>' + cwItem.title + '</span>'
                          //   newHtml += '</p>'
                          //   newHtml += '<p>'
                          //   newHtml += '<span>职务:</span><span>' + item.post + '</span>'
                          //   newHtml += '</p>'
                          //   newHtml += '</div>'
                          //   newHtml += '</li>'
                          // }
                        }
                        newHtml += '</ul>'
                        newHtml += '</div>'
                        newHtml += '</div>'
                      }
                    }
                    newHtml += '</div>'

                  }
                  $('.policeBox').append(newHtml)
                })
              }
            }
          }
        })
      },
      // 各派出所
      createZcmjList2: function () {
        $('.policeBox').empty()
        let url = webApi.base.getUrl(webApi.commonUrl.zcmjList2)
        let data = {
          policeId: mainApp.store.policeId,
          pageNo: 1,
          pageSize: 16
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            if (res.result.length > 0) {
              var customArr = res.result
              var newHtml = ''
              for (let i = 0; i < customArr.length; i++) {
                let item = customArr[i]
                newHtml += '<div class="viewBox">'
                newHtml += '<h4>' + item.title + '</h4>'
                for (let k = 0; k < item.children.length; k++) {
                  let value = item.children[k]
                  if (value.zcjls.length > 0) {
                    newHtml += '<div class="person">'
                    newHtml += '<div class="villageName">' + value.title + '</div>'
                    newHtml += '<div class="personList">'
                    newHtml += '<ul class="zcmj_ul mjFlag_ul">'
                    for (let j = 0; j < value.zcjls.length; j++) {
                      let zcjlsItem = value.zcjls[j]
                      if (zcjlsItem.avatar) {
                        newHtml += '<li>'
                        newHtml += '<div class="imgBox">'
                        newHtml += '<img src="' + hostsrp.zcmjImgUrl + zcjlsItem.avatar + '" alt="">'
                        newHtml += '</div>'
                        newHtml += '<div class="describe">'
                        newHtml += '<p>'
                        newHtml += '<span>姓名:</span><span>' + zcjlsItem.name + '</span>'
                        newHtml += '</p>'
                        newHtml += '<p>'
                        newHtml += '<span>警号:</span><span>' + zcjlsItem.policeNum + '</span>'
                        newHtml += '</p>'
                        newHtml += '<p>'
                        newHtml += '<span>联系方式:</span><span>' + zcjlsItem.phone + '</span>'
                        newHtml += '</p>'
                        newHtml += '<p>'
                        newHtml += '<span>村居:</span><span>' + value.title + '</span>'
                        newHtml += '</p>'
                        newHtml += '<p>'
                        newHtml += '<span>职务:</span><span>' + zcjlsItem.post + '</span>'
                        newHtml += '</p>'
                        newHtml += '</div>'
                        newHtml += '</li>'
                      }
                      // else {
                      //   newHtml += '<li>'
                      //   newHtml += '<div class="imgBox">'
                      //   newHtml += '<img src="../image/police.png" alt="">'
                      //   newHtml += '</div>'
                      //   newHtml += '<div class="describe">'
                      //   newHtml += '<p>'
                      //   newHtml += '<span>姓名:</span><span>' + zcjlsItem.name + '</span>'
                      //   newHtml += '</p>'
                      //   newHtml += '<p>'
                      //   newHtml += '<span>警号:</span><span>' + zcjlsItem.policeNum + '</span>'
                      //   newHtml += '</p>'
                      //   newHtml += '<p>'
                      //   newHtml += '<span>联系方式:</span><span>' + zcjlsItem.phone + '</span>'
                      //   newHtml += '</p>'
                      //   newHtml += '<p>'
                      //   newHtml += '<span>村居:</span><span>' + value.title + '</span>'
                      //   newHtml += '</p>'
                      //   newHtml += '<p>'
                      //   newHtml += '<span>职务:</span><span>' + zcjlsItem.post + '</span>'
                      //   newHtml += '</p>'
                      //   newHtml += '</div>'
                      //   newHtml += '</li>'
                      // }
                    }
                    newHtml += '</ul>'
                    newHtml += '</div>'
                    newHtml += '</div>'
                  }
                }
                newHtml += '</div>'
                $('.policeBox').append(newHtml)
              }
            }
          }
        })
      },
      // 各村委
      createZcmjList3: function () {
        $('.policeBox').empty()
        let url = webApi.base.getUrl(webApi.commonUrl.zcmjList2)
        let data = {
          policeId: mainApp.store.policeId,
          pageNo: 1,
          pageSize: 16
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 200) {
            if (res.result.length > 0) {
              var customArr = res.result
              var newHtml = ''
              for (let i = 0; i < customArr.length; i++) {
                let item = customArr[i]
                newHtml += '<div class="viewBox">'
                newHtml += '<h4>' + item.title + '</h4>'
                newHtml += '<div class="person">'
                newHtml += '<div class="villageName">' + item.title + '</div>'
                newHtml += '<div class="personList">'
                newHtml += '<ul class="zcmj_ul mjFlag_ul">'
                for (let j = 0; j < item.zcjls.length; j++) {
                  let zcjlsItem = item.zcjls[j]
                  if (zcjlsItem.avatar) {
                    newHtml += '<li>'
                    newHtml += '<div class="imgBox">'
                    newHtml += '<img src="' + hostsrp.zcmjImgUrl + zcjlsItem.avatar + '" alt="">'
                    newHtml += '</div>'
                    newHtml += '<div class="describe">'
                    newHtml += '<p>'
                    newHtml += '<span>姓名:</span><span>' + zcjlsItem.name + '</span>'
                    newHtml += '</p>'
                    newHtml += '<p>'
                    newHtml += '<span>警号:</span><span>' + zcjlsItem.policeNum + '</span>'
                    newHtml += '</p>'
                    newHtml += '<p>'
                    newHtml += '<span>联系方式:</span><span>' + zcjlsItem.phone + '</span>'
                    newHtml += '</p>'
                    newHtml += '<p>'
                    newHtml += '<span>村居:</span><span>' + item.title + '</span>'
                    newHtml += '</p>'
                    newHtml += '<p>'
                    newHtml += '<span>职务:</span><span>' + zcjlsItem.post + '</span>'
                    newHtml += '</p>'
                    newHtml += '</div>'
                    newHtml += '</li>'
                  }
                  // else {
                  //   newHtml += '<li>'
                  //   newHtml += '<div class="imgBox">'
                  //   newHtml += '<img src="../image/police.png" alt="">'
                  //   newHtml += '</div>'
                  //   newHtml += '<div class="describe">'
                  //   newHtml += '<p>'
                  //   newHtml += '<span>姓名:</span><span>' + zcjlsItem.name + '</span>'
                  //   newHtml += '</p>'
                  //   newHtml += '<p>'
                  //   newHtml += '<span>警号:</span><span>' + zcjlsItem.policeNum + '</span>'
                  //   newHtml += '</p>'
                  //   newHtml += '<p>'
                  //   newHtml += '<span>联系方式:</span><span>' + zcjlsItem.phone + '</span>'
                  //   newHtml += '</p>'
                  //   newHtml += '<p>'
                  //   newHtml += '<span>村居:</span><span>' + item.title + '</span>'
                  //   newHtml += '</p>'
                  //   newHtml += '<p>'
                  //   newHtml += '<span>职务:</span><span>' + zcjlsItem.post + '</span>'
                  //   newHtml += '</p>'
                  //   newHtml += '</div>'
                  //   newHtml += '</li>'
                  // }
                }
                newHtml += '</ul>'
                newHtml += '</div>'
                newHtml += '</div>'
                newHtml += '</div>'
                $('.policeBox').append(newHtml)
              }
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

      mainApp.methods.createZcmjList()

      setTimeout(() => {
        mainApp.methods.createTreeList()
      }, 1000)
    }
  }
  mainApp.init()
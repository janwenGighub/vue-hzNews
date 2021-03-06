
  var mainApp = {
    store: {
      customStr: '',
      leaderFlag: true,
      policeId: '441330',
      treeArr: [],
      curr: 1,
      limit: 16,
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
        let url = webApi.base.getUrl(webApi.commonUrl.leaderList)
        let data = {
          policeId: mainApp.store.policeId,
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 0) {
            if (res.result.length > 0) {
              var customArr = res.result
              var newHtml = ''
              for (let m = 0; m < customArr.length; m++) {
                let pcsArr = customArr[m].children
                for (let i = 0; i < pcsArr.length; i++) {
                  let pcsItem = pcsArr[i]
                  newHtml += '<div class="viewBox">'
                  newHtml += '<h4>' + pcsItem.jgmc + '</h4>'
                  for (let j = 0; j < pcsItem.children.length; j++) {
                    let cwItem = pcsItem.children[j]
                    if (cwItem.persons.length > 0) {
                      newHtml += '<div class="person">'
                      newHtml += '<div class="villageName">' + cwItem.jgmc + '</div>'
                      newHtml += '<div class="personList">'
                      newHtml += '<ul class="zcmj_ul mjFlag_ul">'
                      for (let k = 0; k < cwItem.persons.length; k++) {
                        let item = cwItem.persons[k]
                        if (item.zp) {
                          newHtml += '<li>'
                          newHtml += '<div class="imgBox">'
                          newHtml += '<img src="' + hostsrp.imgUrl + item.zp + '" alt="">'
                          newHtml += '</div>'
                          newHtml += '<div class="describe">'
                          newHtml += '<p>'
                          newHtml += '<span>姓名:</span><span>' + item.xm + '</span>'
                          newHtml += '<p>'
                          newHtml += '<span>职务:</span><span>' + item.zw + '</span>'
                          newHtml += '</p>'
                          newHtml += '<p>'
                          newHtml += '<span>联系方式:</span><span>' + item.lxdh + '</span>'
                          newHtml += '</p>'
                          newHtml += '</div>'
                          newHtml += '</li>'
                        } else {
                          newHtml += '<li>'
                          newHtml += '<div class="imgBox">'
                          newHtml += '<img src="../image/police.png" alt="">'
                          newHtml += '</div>'
                          newHtml += '<div class="describe">'
                          newHtml += '<p>'
                          newHtml += '<span>姓名:</span><span>' + item.name + '</span>'
                          newHtml += '</p>'
                          newHtml += '<p>'
                          newHtml += '<span>职务:</span><span>' + item.zw + '</span>'
                          newHtml += '</p>'
                          newHtml += '<p>'
                          newHtml += '<span>联系方式:</span><span>' + item.lxdh + '</span>'
                          newHtml += '</p>'
                          newHtml += '</div>'
                          newHtml += '</li>'
                        }
                      }
                      newHtml += '</ul>'
                      newHtml += '</div>'
                      newHtml += '</div>'
                    }
                  }
                  newHtml += '</div>'
                }
                $('.policeBox').append(newHtml)
              }
            }
          }
        })
      },
      // 各派出所
      createZcmjList2: function () {
        $('.policeBox').empty()
        let url = webApi.base.getUrl(webApi.commonUrl.leaderList)
        let data = {
          policeId: mainApp.store.policeId
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 0) {
            if (res.result.length > 0) {
              var customArr = res.result
              var newHtml = ''
              for (let i = 0; i < customArr.length; i++) {
                let item = customArr[i]
                newHtml += '<div class="viewBox">'
                newHtml += '<h4>' + item.jgmc + '</h4>'
                for (let k = 0; k < item.children.length; k++) {
                  let value = item.children[k]
                  if (value.persons.length > 0) {
                    newHtml += '<div class="person">'
                    newHtml += '<div class="villageName">' + value.jgmc + '</div>'
                    newHtml += '<div class="personList">'
                    newHtml += '<ul class="zcmj_ul mjFlag_ul">'
                    for (let j = 0; j < value.persons.length; j++) {
                      let zcjlsItem = value.persons[j]
                      if (zcjlsItem.zp) {
                        newHtml += '<li>'
                        newHtml += '<div class="imgBox">'
                        newHtml += '<img src="' + hostsrp.imgUrl + zcjlsItem.zp + '" alt="">'
                        newHtml += '</div>'
                        newHtml += '<div class="describe">'
                        newHtml += '<p>'
                        newHtml += '<span>姓名:</span><span>' + zcjlsItem.xm + '</span>'
                        newHtml += '<p>'
                        newHtml += '<span>职务:</span><span>' + zcjlsItem.zw + '</span>'
                        newHtml += '</p>'
                        newHtml += '<p>'
                        newHtml += '<span>联系方式:</span><span>' + zcjlsItem.lxdh + '</span>'
                        newHtml += '</p>'
                        newHtml += '</div>'
                        newHtml += '</li>'
                      } else {
                        newHtml += '<li>'
                        newHtml += '<div class="imgBox">'
                        newHtml += '<img src="../image/police.png" alt="">'
                        newHtml += '</div>'
                        newHtml += '<div class="describe">'
                        newHtml += '<p>'
                        newHtml += '<span>姓名:</span><span>' + zcjlsItem.xm + '</span>'
                        newHtml += '<p>'
                        newHtml += '<span>职务:</span><span>' + zcjlsItem.zw + '</span>'
                        newHtml += '</p>'
                        newHtml += '<p>'
                        newHtml += '<span>联系方式:</span><span>' + zcjlsItem.lxdh + '</span>'
                        newHtml += '</p>'
                        newHtml += '</div>'
                        newHtml += '</li>'
                      }
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
        let url = webApi.base.getUrl(webApi.commonUrl.leaderList)
        let data = {
          policeId: mainApp.store.policeId
        }
        customAjax.AjaxGet(url, data, function (res) {
          if (res.code === 0) {
            if (res.result.length > 0) {
              var customArr = res.result
              var newHtml = ''
              for (let i = 0; i < customArr.length; i++) {
                let item = customArr[i]
                newHtml += '<div class="viewBox">'
                newHtml += '<h4>' + item.jgmc + '</h4>'
                newHtml += '<div class="person">'
                newHtml += '<div class="villageName">' + item.jgmc + '</div>'
                newHtml += '<div class="personList">'
                newHtml += '<ul class="zcmj_ul mjFlag_ul">'
                for (let j = 0; j < item.persons.length; j++) {
                  let zcjlsItem = item.persons[j]
                  if (zcjlsItem.zp) {
                    newHtml += '<li>'
                    newHtml += '<div class="imgBox">'
                    newHtml += '<img src="' + hostsrp.imgUrl + zcjlsItem.zp + '" alt="">'
                    newHtml += '</div>'
                    newHtml += '<div class="describe">'
                    newHtml += '<p>'
                    newHtml += '<span>姓名:</span><span>' + zcjlsItem.xm + '</span>'
                    newHtml += '<p>'
                    newHtml += '<span>职务:</span><span>' + zcjlsItem.zw + '</span>'
                    newHtml += '</p>'
                    newHtml += '<p>'
                    newHtml += '<span>联系方式:</span><span>' + zcjlsItem.lxdh + '</span>'
                    newHtml += '</p>'
                    newHtml += '</div>'
                    newHtml += '</li>'
                  } else {
                    newHtml += '<li>'
                    newHtml += '<div class="imgBox">'
                    newHtml += '<img src="../image/police.png" alt="">'
                    newHtml += '</div>'
                    newHtml += '<div class="describe">'
                    newHtml += '<p>'
                    newHtml += '<span>姓名:</span><span>' + zcjlsItem.xm + '</span>'
                    newHtml += '<p>'
                    newHtml += '<span>职务:</span><span>' + zcjlsItem.zw + '</span>'
                    newHtml += '</p>'
                    newHtml += '<p>'
                    newHtml += '<span>联系方式:</span><span>' + zcjlsItem.lxdh + '</span>'
                    newHtml += '</p>'
                    newHtml += '</div>'
                    newHtml += '</li>'
                  }
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
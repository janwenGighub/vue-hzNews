$(function () {
  var mainApp = {
    store: {
      policeId: '441330',
      treeArr: [],
      curr: 1,
      limit: 5,
      count: 1,
      userId: '',
      userName: '',
      startTime: '',
      endTime: '',
      zcmjTitle: '',
      searchFlag: 0,
      searchStartTime: '',
      searchEndTime: '',
      setting: {
        data: {
          key: {
            name: 'title'
          }
        },
        callback: {
          beforeClick: function (treeId, treeNode) {
            mainApp.store.policeId = treeNode.key

            $('.contentArea').find('.nameChange').each(function () {
              $(this).children('p:first-child').addClass('targetBdCor').siblings('p:last-child').removeClass('targetBdCor')
            })

            $('header').children('.commonNav').children('.navTitle').children('h1').text(treeNode.jgmc + '一村 (居) 一警专栏')
            $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').text(treeNode.jgmc)
            $('header').children('.commonNav').children().last().children('ul').children('li').find('#customTree').nextAll('.zTreeDemoBackground').addClass('customShow')

            mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime)

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
      // 工作轨迹
      createWorkTrack: function (curr, limit, userId, userName, startTime, endTime) {
        $('#workTrack').empty()
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
            policeId: mainApp.store.policeId,
          }
          customAjax.AjaxGet(url, data, function (res) {
            if (res.result.records.length > 0) {
              var customArr = res.result.records
              mainApp.store.count = res.result.total
              mainApp.store.gzgjCunt = res.result.total
              layui.use('laytpl', function () {
                var laytpl = layui.laytpl
                var orderInfoTpl = gzgjScript.innerHTML,
                  orderInfoDiv = document.getElementById('workTrack')
                laytpl(orderInfoTpl).render(customArr, function (html) {
                  orderInfoDiv.innerHTML = html
                })
              })
              //调用分页
              laypage.render({
                elem: 'demo3',
                curr: curr,
                limit: limit,
                groups: 3,
                count: mainApp.store.count, //数据总数，从服务端得到
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
      // 默认初始化地图
      initializeMap: function () {
        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(114.347659, 23.041654), 16);  // 初始化地图,设置中心点坐标和地图级别
        map.clearOverlays()
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
      // 获取当前人员位置
      getPersonSite: function (usernames, startTime, endTime) {
        let url = webApi.base.getUrl(webApi.commonUrl.siteUrl)
        let data = {
          policeId: mainApp.store.policeId,
          userid: usernames,
          startTime: startTime,
          endTime: endTime,
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
          })

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
    },
    event: function () {
      $('header').load('../pages/commonNav.html .commonNav', function () {
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navHomeId').attr('href', hostsrp.locationHref + hostsrp.homePage) // 首页
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navGzzdId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('gzzdId') + '&columnTitle=规章制度') // 规章制度
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navYxcjId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('yxcjId') + '&columnTitle=优秀村居') // 优秀村居
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navTcwtzzId').attr('href', hostsrp.locationHref + hostsrp.moreListPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('tcwtzzId') + '&columnTitle=突出问题整治') // 突出问题整治
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navCjzxId').attr('href', hostsrp.locationHref + hostsrp.cjzxListPage) // 村警之星
        $('header').children('.commonNav').children().last().children('ul').children('li').find('#navLwgbId').attr('href', hostsrp.locationHref + hostsrp.leaderPage + '?policeId=441330&categoryId=' + window.sessionStorage.getItem('lwgbId') + '&columnTitle=两委干部') // 两委干部
        $.getScript("../js/commonNav.js")
      })

      layui.use('laydate', function () {
        var laydate = layui.laydate;
        //按年查询
        laydate.render({
          elem: '#test6',
          range: true
        })
      })

      // 点击搜索
      $('#searchBtn').on('click', function () {
        var userName = $('#inputUserName').val()
        var policeId = $('#inputPoliceId').val()
        var customTime = $('#test6').val()

        mainApp.store.searchFlag = 1
        mainApp.store.searchStartTime = customTime.substring(0, 10)
        mainApp.store.searchEndTime = customTime.substring(13, customTime.length)

        mainApp.store.curr = 1
        mainApp.store.limit = 5
        mainApp.store.userId = policeId
        mainApp.store.userName = userName
        mainApp.store.startTime = customTime.substring(0, 10)
        mainApp.store.endTime = customTime.substring(13, customTime.length)

        mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime)
      })

      // 重置
      $('#resetBtn').on('click', function () {
        $('#inputUserName').val('')
        $('#inputPoliceId').val('')
        $('#test6').val('')

        mainApp.store.searchFlag = 0

        mainApp.store.userId = mainApp.store.userName = mainApp.store.startTime = mainApp.store.endTime = mainApp.store.searchStartTime = mainApp.store.searchEndTime = ''
        mainApp.methods.initializeMap()
        mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime)
      })

      // 地图定点事件
      $('#workTrack').on('click', 'a', function () {
        var customUserNames = $(this).attr('data-usernames')
        mainApp.methods.getPersonSite(customUserNames, mainApp.store.searchStartTime, mainApp.store.searchEndTime)
      })

    },
    init: function () {
      mainApp.event()


      mainApp.methods.createWorkTrack(mainApp.store.curr, mainApp.store.limit, mainApp.store.currPage, mainApp.store.pageSize, mainApp.store.userId, mainApp.store.userName, mainApp.store.startTime, mainApp.store.endTime) // 工作轨迹

      setTimeout(() => {
        mainApp.methods.createTreeList()
        mainApp.methods.initializeMap()
      }, 1000)
    },
  }
  mainApp.init()
})
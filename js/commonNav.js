
/**---------------------------------------------------------------- 顶部 树形结构点击 */
$('header').on('click', '#customTree', function () {
    if ($(this).nextAll('.zTreeDemoBackground').hasClass('customShow')) {
        $(this).nextAll('.zTreeDemoBackground').removeClass('customShow')
    } else {
        $(this).nextAll('.zTreeDemoBackground').addClass('customShow')
    }
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



// $('body').on('click',function(e){
//     console.log(abc)
//     if (!abc.hasClass('customShow')) {
//         abc.removeClass('customShow')
//     }
// })

// $(document).bind('click', function (e) {
//     console.log(999)
//     var abc = $('header').children('.commonNav').children().last().children('ul').children('li').find('#navJbgkId')
//     var customMenu = $('header').children('.commonNav').children().last().children('ul').children('li').find('.customMenu')
//     var e = e || window.event; //浏览器兼容性
//     var elem = e.target || e.srcElement;
//     while (elem) {
//         //循环判断至跟节点，防止点击的是div子元素
//         if (elem.id && elem.id == abc) {
//             return;
//         }
//         elem = elem.parentNode;
//     }
//     //点击的不是div或其子元素
//     $('header').removeClass('customShow')
// });


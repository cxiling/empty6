//引用store
import { stopDoubleClick , jumpLink} from './computed.js'
import game_store from '../store/dispatch/game-area'
import { setUserFollowState } from '../store/actions/game-area'
/*
    后期改为f7dom操作便捷一些
    优化插件 改进插件写法 废弃部分  webapi.prototype 写法
    支持定点固定toolbar
    实现原理类似于切换样式相对定位 
    Indicator 是否显示置顶右侧按钮
    let parameter = {
        scrollTab:'', //需要滑动后展示的内容
        scrollId:'#index-debug-api-page', //页面滚动的page-content
        parseId:'#parseId', //向上滑动的头部容器
        contentId:'#contentId', //需要隐藏的头部栏目
        toolbarId:'#toolbarId', //展示的头部栏目
        navtollbar:'#navtollbar' //底部出现的toolbar  如置顶按钮等
        callback //无限滚动回调函数执行
    }
    myApp.scrollTollbar(parameter,Indicator).init()
    myApp.scrollTollbar(parameter,Indicator).load()
*/
var scrollTollbar = function (parameter,Indicator){
    var apps = this;
    var defaults = {
        scrollTab:null,
        scrollId:null,
        parseId:null,
        childId:null,
        contentId:null,
        toolbarId:null,
        navtollbar:null,
        callback:null
        /* Callbacks
         onSearch
         onEnable
         onDisable
         onClear
         */
    };
    parameter = parameter || {};
    for (var def in defaults) {
        if (typeof parameter[def] === 'undefined' || parameter[def] === null) {
            parameter[def] = parameter[def];
        }
    }
    
    apps.parameter = parameter;
    if(!apps.parameter) return false;

    apps.props = {}
    apps.sHeight = 0
    apps.parseIdHeight = $$(apps.parameter.parseId).height();
    apps.toolbarHeight = $$(apps.parameter.toolbarId).height() > 0 
            ? $$(apps.parameter.toolbarId).height() : 44;
    apps.clientHeight = parseInt(Math.abs(apps.parseIdHeight - apps.toolbarHeight));        
     //设置debounce
    apps.debounceLoad = _.debounce(function(){
           apps.load();
    }, 300);
    //初始化数据函数
    apps.init = function(){
        var apps = this;
        //滚动挂载
        apps.scroll();
        apps.debounceLoad();
    };
    //切换tab获取当前容器高度
    apps.load = function(){
        var apps = window.scrollTollbar;
        apps.dHeight = Math.abs($$('body').height() - apps.parseIdHeight);
        //console.log(apps.parameter.container)
        apps.sHeight = $$(apps.parameter.container).height() 
            > apps.dHeight? $$(apps.parameter.container).height(): apps.dHeight
        if(!apps.parameter.scrollTab) return 
        $$(apps.parameter.scrollTab).css('height', apps.sHeight+'px');
    };
    //判断滑动页面的高度
    apps.start = function(){
        var apps = this;
        var apps = window.scrollTollbar
        var scrollTollbar =  window.scrollTollbar
        //执行高度函数
        apps.debounceLoad()
        //定义需要的滚动高度
        //滚动高度的公式
        // a = b + c (a : 头部高度容器 + b: 底部内容滚动的高度 a:page-content)
        // 滚动底部的公式
        // a = b+d-e-c (滚动的高度+距离 == 实际的列表高度+头部栏高度)
        apps.scrollHeight = $$(apps.parameter.scrollId).height();
        apps.scrollTop = $$(apps.parameter.scrollId).scrollTop();
        apps.cHeight = scrollTollbar.sHeight+apps.clientHeight - apps.scrollHeight - apps.scrollTop;
        //toobal初始化滑动style 'height'
        apps.props = {
            static:{'top':0+'px','position':'absolute','z-index':999,'width':'100%'}
        };
        //dom滚动的高度小于头部栏高度
        if(apps.scrollTop < apps.clientHeight){
            $$(apps.parameter.toolbarId).hide();
        }
        else if(apps.scrollTop >= apps.clientHeight){
            $$(apps.parameter.toolbarId).show().css(apps.props.static);
            if(apps.parameter.callback) apps.parameter.callback()
        }
        //dom滚动的高度小于dom滚动高度减去toobar本身的高度
        if( apps.cHeight  < 0 && apps.scrollTop){
            Indicator && $$(apps.parameter.navtollbar).show();
        }else{
            Indicator && $$(apps.parameter.navtollbar).hide();
        }
    };
    //添加监听滚动事件
    apps.scroll = function(){
        var apps = this
        //监听页面滚动
        $$(apps.parameter.scrollId).on('scroll', function() {
            apps.start()
        })
    };
}
myApp.scrollTollbar = function(parameter,Indicator){
    window.scrollTollbar = new scrollTollbar(parameter,Indicator); //定义全局函数 针对事件覆盖函数的方法
    return new scrollTollbar(parameter,Indicator);
}


/*
    采用循环展示 中奖用户的信息列表项目 
    *****************************************
    自定义各个方法属性
        ready 绘制图片
        start  开始旋转 
        pause 暂定旋转
        contiue 继续旋转
        duration 旋转持续时间 默认为固定时间 旋转的速度 按照贝塞尔曲线 
        end 终止旋转
    *****************************************   
    自定义传入的绘制图片展示
    obj 
        time 循环滚动的时间

        path: //数组
            ttid 传入中奖TT用户id
            describe_text 传入绘制的图片的描述
            id 传入绘制图片的id
        colos 传入当前色块
        callback 抽奖回调成功函数
    **********************************************************************************  
    使用方法按照 说明所需的参数传入 调用插件返回所需的函数 调取成功一次 按需调取所需的
    demo:
        var obj = {
                parseId:'.records-slide-wrap',
                scrollId:'.records-list',
                childId:'.child-item',
                path:vue_this.state.lottery_record_list,
                time:300,
                num:12
            }
            myApp.recordLottery(obj)
*/

var recordLottery = function(parameter){

    var apps = this;
    var defaults = {
        parseId:null,
        scrollId:null,
        childId:null,
        path:null,
        time:null,
        num:null,
        /* Callbacks
         onSearch
         onEnable
         onDisable
         onClear
         */
    };
    parameter = parameter || {};
    for (var def in defaults) {
        if (typeof parameter[def] === 'undefined' || parameter[def] === null) {
            parameter[def] = parameter[def];
        }
    }
    // apps = window.recordLottery
    apps.parameter = parameter;

    apps.str = undefined
    apps.strList = []
    apps.path = apps.parameter.path// 获取传入的中奖列表数据
    apps.parseId = apps.parameter.parseId 
    apps.scrollId = apps.parameter.scrollId
    apps.childId = apps.parameter.childId
    apps.num = apps.parameter.num ? apps.parameter.num : 10 // 限制滚动的条数
    apps.time = apps.parameter.time ? apps.parameter.time : 500
    apps.roate = 0
    apps.str = apps.parameter.str ? apps.parameter.str : ''
    //初始化高度
    apps.init = function(){
        if(!apps.path.length) return false
        apps.parseInSelector = document.querySelector(apps.parseId) //获取父元素
        
        apps.scrollInSelector = document.querySelector(apps.scrollId)  //获取列表父元素
        apps.liClientHeight = document.querySelectorAll(apps.childId)[0].clientHeight

        apps.parseInSelector.style.overflow = "hidden" //
        apps.parseInSelector.style.height = (apps.num*apps.liClientHeight)+'px' //设置子列表高度


        if(!window.timeout){
            apps.setInterval = window.setInterval(apps.start,apps.time*10)
            window.timeout = apps.setInterval
        }

    };
    //开始滚动
    apps.start = function(){
        apps.roate += apps.liClientHeight
        if(apps.support()){
            $$(apps.scrollId).transition(apps.time).transform('translateY(-'+ apps.roate + 'px)').transitionEnd(function(){
                if (apps.roate > (apps.path.length-apps.num)*apps.liClientHeight){
                    apps.roate = 0;
                    $$(apps.scrollId).removeAttr('style')
                } 
            })
        }else{

            /* //如果不支持css3可以考虑使用jq animate方法
            $$(apps.scrollId).animate({
                top: -apps.roate+'px',
                position:'absolute'},
                apps.time, function() {
                if (apps.roate > (apps.path.length-apps.num)*apps.liClientHeight){
                   $$(apps.scrollId).transition(apps.time*2);
                   $$(apps.scrollId).transform('translateY(0px)');
                   $$(apps.scrollId).animate({
                    top: 0,
                    position:'absolute'},
                    apps.time*2, function() {
                        apps.roate = 0;
                   });
                }
            });
            */
        }
        apps.change(apps.roate)
    };
    //判断是否支持css3
    apps.support = function(){
        var thisBody = document.body || document.documentElement,
            thisStyle = thisBody.style,
            support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;       
            return support; 
    };
    //获取向上滚动的高度
    apps.change = function(val){
        apps.roate = val
    };

    apps.init()

    return apps
}

myApp.recordLottery = function(parameter){
    window.recordLottery = new recordLottery(parameter); //定义全局函数 针对事件覆盖函数的方法
    return new recordLottery(parameter);
}

myApp.redictNewPage = function (pageName, navbar, toolbar, animation, history, query){
    var navbarInit = '';
    var navbarInitClass = '';
    var toolbarInit = '';
    var toolbarInitClass = '';

    if(navbar == true){
        navbarInit = '<div class="navbar"></div>';
        navbarInitClass = ' navbar-fixed';
    }else if(_.isString(navbar)){
        navbarInit = '<div class=' + navbar + '></div>';
    }

    if(toolbar == true){
        toolbarInit = '<div class="toolbar"></div>';
        toolbarInitClass = ' toolbar-fixed';
    }else if(_.isString(toolbar)){
        toolbarInit = '<div class=' + toolbar + '></div>';
    }

    var pageInit = '<div id=' + pageName + ' data-page=' + pageName + ' class="page' + navbarInitClass + toolbarInitClass + '">' + navbarInit + toolbarInit + '<div class="page-content"></div></div>';
    var pageContaner = $$('.page') ? $$('.page')  : []
    var findLastIndex = _.findLastIndex(pageContaner,function(item){
        return $$(item).data('page') === pageName
    }) 
    if(findLastIndex !== -1){
      mainView.router.load({
            content :pageInit,
            animatePages: animation !=null ? animation : true,
            pushState: history !=null ? history : true,
            query: query != null ? query : null,
            reload:true,
            reloadPrevious:true
        })  
    }else{
        mainView.router.load({
            content :pageInit,
            animatePages: animation !=null ? animation : true,
            pushState: history !=null ? history : true,
            query: query != null ? query : null
        })
    } 
}

// 获取当前登陆过客户端的用户列表
myWebview.getUidList = function (){
    if(myWebview.isInAppFunc()){
        try{
            TTJSBridge.invoke("data", "getUidList")
        }catch(e){
            webErrorReport('apiError', 'get uid list failed - ' + e.name + ": " + e.message);
        }
    }
    else{
        
    }
}

//跳转公会主页
myWebview.jumpGuild = function(guildbyid){
    if(myWebview.isInAppFunc()){
        try{
           myWebview.appNav('tt://navigation/guildbyid/'+guildbyid)
        }catch(e){
            webErrorReport('apiError', 'jump Guild failed - ' + e.name + ": " + e.message);
        }
    }else{
        myApp.downloadTT(true)
    }
}

//跳转公会列表
myWebview.jumpGuildList = function(gameName,gameId,enterCuildCount){
    let CuildCount = enterCuildCount ? enterCuildCount : 0
    // alert('tt://navigation/guild/'+gameName+'/'+gameId+'/'+CuildCount)
    if(myWebview.isInAppFunc()){
        try{
           myWebview.appNav('tt://navigation/guild/'+gameName+'/'+gameId+'/'+CuildCount)
        }catch(e){
            webErrorReport('apiError', 'jump Guild failed - ' + e.name + ": " + e.message);
        }
    }else{
        myApp.downloadTT(true)
    }
}

//游戏圈是否已经关注过
myWebview.setGameCircle = function(setfocusCircle){
    try{
        TTJSBridge.invoke("gamearea", "setGameCircleStatus", setfocusCircle); 
    }catch(e){
        //webErrorReport('apiError', 'setGameCircleStatus failed - ' + e.name + ": " + e.message);
    }
    return setfocusCircle
}

//显示隐藏游戏圈关注 setVisibleGameCircleFocus
myWebview.setVisibleCircle = function(focusCircle){
    try{
        TTJSBridge.invoke("gamearea", "setVisibleGameCircleFocus", focusCircle); 
    }catch(e){
         //webErrorReport('apiError', 'setVisibleGameCircleFocus failed - ' + e.name + ": " + e.message);
    }
    return focusCircle
}

//打开游戏
myWebview.startGameByPackage = function(Package){
    try{
        TTJSBridge.invoke("gamearea", "startGameByPackage", Package); 
    }catch(e){
         //webErrorReport('apiError', 'setVisibleGameCircleFocus failed - ' + e.name + ": " + e.message);
    }
}

//客户端调取的公共函数
myWebview.checkGameFocusCircle  = function (){
    if(!stopDoubleClick(this,300)) return false
    setUserFollowState(game_store)
}
//是否隐藏Titlebar
myWebview.setRightTextVisibility = function(setTitle){
    try{
        TTJSBridge.invoke("ui", "setRightTextVisibility", setTitle ? true : false)
    }catch(e){
    }
}

//设置右侧按钮文字
myWebview.updateRightText = function(setTitle){
    try{
        TTJSBridge.invoke("ui", "updateRightText", setTitle)
    }catch(e){}
}
//setTitle 设置的文本 callbackname传入的方法 全局函数
myWebview.setRightTextRunMethod = function(callbackname){
    try{
        if(callbackname) TTJSBridge.invoke("ui", "setRightTextRunMethod", '{"method" : '+callbackname+'}')
    }catch(e){

    }
}
myApp.jumpBox = function(){
    jumpLink('tt://navigation/giftpackage')
}
//图片浏览
//参数说明: 序号 - index: 0, gallery: ['url']
myApp.photoBrowserPage = function(index, gallery){
    var template = '<div class="toolbar tabbar photo-browser-toolbar">' +
        '<div class="toolbar-inner">' +
        '<div class="center sliding">' +
        '<span class="photo-browser-current"></span>' +
        '<span class="photo-browser-of">{{ofText}}</span>' +
        '<span class="photo-browser-total"></span>' +
        '</div>'+
        '</div>' +
        '</div>';

    var myPhotoBrowserPopupDark = myApp.photoBrowser({
        photos : gallery,
        type: 'page',
        exposition: false,
        toolbar : true,
        maxZoom: 2,
        lazyLoading:true,
        lazyLoadingInPrevNext:true,
        ofText: '/',
        toolbarTemplate : template
    });
    myPhotoBrowserPopupDark.open(index);
}

//封装
// myApp.showBottomIndicator = function () {
//     if(!$$('.preloader-indicator-modal-bottom').length){
//         $$('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal-bottom indicator-hidden"><span class="preloader preloader-white">' + (myApp.params.material ? myApp.params.materialPreloaderHtml : '') + '</span></div>');
//     }
//     setTimeout(function(){
//         $$('.preloader-indicator-modal-bottom').removeClass('indicator-hidden');
//     },10);

// };
myApp.hideBottomIndicator = function () {
    $$('.preloader-indicator-modal-bottom').addClass('indicator-hidden');
    $$('.preloader-indicator-modal-bottom').transitionEnd(function(){
        $$('.preloader-indicator-overlay, .preloader-indicator-modal-bottom').remove();
    })
    setTimeout(function(){
        if($$('.preloader-indicator-overlay').length){
            $$('.preloader-indicator-overlay, .preloader-indicator-modal-bottom').remove();
        }
    },1000)
    
};

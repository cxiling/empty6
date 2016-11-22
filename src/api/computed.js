//定义公共计算属性方法 & 校验等方法
import game_store from '../store/dispatch/game-area'
import { linkGameArea } from '../store/actions/game-area'
/*
    定义弹消息方法 ——
        参数 ——
            toastStr: 需要提示的消息字符串
*/
export const showToast = (toastStr) => {
	
	if (myWebview.isInAppFunc()){
		myWebview.showToast(toastStr);
	} else {
		myApp.alert(toastStr);
	}
}

/*
    定义跳转方式 ——
        参数 ——
            link: 需要跳转的url
*/
export const jumpLink = (link) => {
	if (myWebview.isInAppFunc()){
		myWebview.appNav(link)
	} else {
		window.location.href = link
	}
}

/*
	防止重复触发按钮
		参数 ——
			vm: vue组件的实例
			delay: 按钮禁用的延迟时间
		返回 ——
			true or false
		用法示例 ——
			// 点击按钮后500ms内再次点击不会触发按钮行为
			if (!stopDoubleClick(this, 500)){
                return;
            }
*/
export const stopDoubleClick = (vm, delay) => {
	if(vm.isVmClick){
		return false;
	}
	vm.isVmClick = true;
	setTimeout(() => {
		vm.isVmClick = false
	}, delay ? delay : 1000)
	return true;
}
/*
  跳转到游戏专区
*/
export const linkToZone = (gid,page) => {

  if(!gid) return

  const pageName = page ? page : "index-game-area-page"
  const obj = {gid:gid}
  const href = window.location.href
  const pageContaner = $$('.page') ? $$('.page')  : []
  const findLastIndex = _.findLastIndex(pageContaner,function(item){
      return $$(item).data('page') === pageName
  })  
  const  link = window.location.host.search('app.52tt.com') != -1 
  ? 'http://app.52tt.com/gray/guild/index.html?pageName='+pageName+'&gid=' + gid
  : 'http://192.168.9.230/project/guild/index.html?pageName='+pageName+'&gid=' + gid;

  linkGameArea(game_store,obj,function(){
    myApp.redictNewPage(pageName, false, true) //只带上底部toolbar
  })
  
}

/*
  跳转到游戏圈
*/
export const linkToCircle = (circle_id) => {
  let link_inapp = 'tt://navigation/circle/' + circle_id;
    let link_no_inapp;
    if (window.location.host.search('app.52tt.com') != -1){
      link_no_inapp = 'http://i.52tt.com/game/forum_bang/' + circle_id;
    } else {
      link_no_inapp = 'http://192.168.9.230:9094/game/forum_bang/' + circle_id;
    }
    // link_no_inapp = 'http://i.52tt.com/game/forum_bang/' + circle_id;
    if (myWebview.isInAppFunc()){
    myWebview.appNav(link_inapp)
  } else {
    window.location.href = link_no_inapp;
  }
}

/*
  跳转到任务中心
*/
export const linkToMission = () => {
  let link;
    if (window.location.host.search('app.52tt.com') != -1){
      link = 'http://app.52tt.com/mission/index.html';
    } else {
      link = 'http://192.168.9.230/mission/index.html';
    }
   
    if (myWebview.isInAppFunc()){
      myWebview.appNav(link)
    } else {
      window.location.href = link;
    }
}
/*
	转换为滑动组件
		参数
			swiperWrap 滑动容器.swiper-container(默认为)
			slidesPerView 默认为1个页面滑动
			nextButtonName 下一页 默认为 .swiper-button-next
			prevButtonName 下一页 默认为 .swiper-button-prev
			type 默认为转化
*/
export const swiperNav = (swiperWrap,slidesPerView,spaceBetween,nextButtonName,prevButtonName) =>{
	let mySwiper = new Swiper(swiperWrap, {
        slidesPerView: slidesPerView ? slidesPerView : 'auto',
        spaceBetween: 0,
        observer:true,
        observeParents:true,
        nextButton: nextButtonName,
        prevButton: prevButtonName,
        slidesPerView:slidesPerView,
        spaceBetween: spaceBetween,
        onTouchMove: function(swiperWrap){
          //你的事件
          myApp.initImagesLazyLoad('.page')
        }
    });
  return mySwiper
}

/*
    栏目数据结构调整
        参数
            num: 分组显示的条数
        返回
            返回筛选出来的新结构
*/

export const devideCloumn = (list,rowLength) => {
	let row = rowLength > 0 ? rowLength : 1
	let path = []
	if(list){
		for(let i = 0 ; i < list.length ; i += row){
			path.push(list.slice(i,i+row))
		}
	}else{
		return list
	}
	return path
}

/*
	转换为时间格式方法自定义方式
		参数
			dateStr 为时间戳
			formaTime 格式比如yyyy-MM-dd hh:mm:ss
*/
export const setFormatTime = (dateStr,formaTime) =>{
	let time = new Date(parseInt(dateStr)*1000)
	let format = formaTime ? formaTime : 'yyyy-MM-dd h:m:s'
	let date = {
              "M+": time.getMonth() + 1,
              "d+": time.getDate(),
              "h+": time.getHours(),
              "m+": time.getMinutes(),
              "s+": time.getSeconds(),
              "q+": Math.floor((time.getMonth() + 3) / 3),
              "S+": time.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (let k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
}

/** 
     * 使用方法 xx.chartStr(str,len)
     * js截取字符串，中英文都能用 
     * @param str：需要截取的字符串 
     * @param len: 需要截取的长度 
     */
export const  chartStr = (str, len) => {
	if(!str) return null
    let str_length = 0;
    let str_cut = '';
    let str_len = str.length;
    let a = '';
    for (let i = 0; i < str_len; i++) {
        str_length++;
        a = str.charAt(i);
        if (escape(a).length > 4) {
            //中文字符的长度经编码之后大于4  
            str_length++;
        }
        str_cut = str_cut.concat(a);
        if (str_length >= len) {
            str_cut = str_cut.concat("...");
            return str_cut;
        }
    }
    //如果给定字符串小于指定长度，则返回源字符串；  
    if (str_length < len) {
        return str;
    }
}


export const exapStr = (s)=>{
    if(s){
        s = s.replace(/[\\\b\f\n\r\t]/g,''); //替换掉反斜杠的字符串
        // s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/g,'');
    }
    return s
}

//第一个参数html为html代码,time为全屏弹窗显示的时间
export const fullDiag = (html,time) => {
    var divObj=document.createElement("div");
    var time=time||true;
    divObj.className="toast-full show fadein";
    divObj.innerHTML=html;
    var first=document.body.firstChild;//得到页面的第一个元素 
    document.body.insertBefore(divObj,first);//在得到的第一个元素之前插入 
    setTimeout(function(){
      document.body.removeChild(document.body.firstChild);
    },time)
    

}

/*
  转换为提取url地址栏里面的参数类型pageName = index-page等
    参数
      str 传入的url地址栏
*/
export const formatParmters = () =>{
  
  const urlString = window.location.href

  if(urlString){

    var extendParameter = $$.parseUrlQuery(urlString);
    //过滤参数里的hash #
    extendParameter = _.mapObject(extendParameter, function(val, key) {
        if(val.toString().indexOf('#') != -1){
            return val.toString().substr(0, val.toString().indexOf('#'));
        }else {
            return val;
        }
    });

    return extendParameter

  }else{

    return urlString

  }
}

/*
  转换为百分比数值
    参数
      remained 剩余数量
      total 总数
*/
export const formatPercent = (remained,total) =>{
  if(!total) return total
  let percentage =  remained < total ? Math.ceil(( remained > 0 ? remained/total*100 : 0)) : 100
  return percentage
}

/*
  设置弹框的样式
    参数
      parameter:{
        title
        text
        text_desc
        closed_txt
        click_txt
      }
*/
export const modalData = (parameter,callback) => {

  let title = parameter.title ? parameter.title : '提示'
  let text = parameter.text ? parameter.text : ''
  let text_desc = parameter.text_desc ? parameter.text_desc : ''
  let closed_txt = parameter.closed_txt 
  let click_txt = parameter.click_txt 
  let buttons = []
  if(closed_txt){
    buttons.push({
      text: closed_txt,
      color: 'grey',
      close: true
    })
  }
  if(click_txt){
    buttons.push({
        text: click_txt,
        color: 'green',
        onClick: function (){
          callback && callback()
        }
    })
  }
  myApp.modal({ 
        title: title,
        text: '<div id="model-f7"><p class="main-model">'+text+'</p>'+'<p class="main-content">'+text_desc+'</p><div id="mount-modal"></div></div>',
        buttons: buttons
    });
}

/*
合并gid商店礼包中心首页组件需要的结构
转化前正常的礼包、商品list表
转化后的：  商品列表（数组）：
  [
    profile:{
      gid:0, ···
    },
    list:[{
      使用方法：usage_method ···
    }]   
  ]
*/
export const filterGiftList = (list,type,source) => {

    if(!list.length) return list
    let filterPath = list
    let giftList = []
    let giftFilteList = []
    //过滤需要的分类数据
    if(source == 2){
      filterPath = _.filter(list,function(obj) {
        return obj.source === source
      });
    }else if(type) {
      filterPath = _.filter(list,function(obj) {
        return obj.type === type && obj.source === source
      });
    }

    //遍历数据
    $$.each(filterPath,function(index, item) {
          const findLastIndex = _.findLastIndex(filterPath,function(obj) {
            return obj.gid === item.gid
          });
          const itemList = _.filter(filterPath, function(obj){
            return obj.gid === item.gid
          });
          const parmter = {
            profile:{
              gid:item.gid,
              game_name:item.game_name,
              icon:item.icon,
              total:item.total,
              gift_total:item.gift_total,
              type:item.type,
              status:item.status
            },
            list:itemList
          }
          //过滤掉重复数组
          if(findLastIndex !== -1){
            giftList.splice(findLastIndex,1,parmter)
          }else{
            giftList.push(parmter)
          }
    });
    //合并重复数据
    giftFilteList = _.uniq(giftList, function(obj){
      return obj.profile.gid
    });
    // console.log(giftFilteList)
    return giftFilteList
}
/*
    转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串
*/
export const filterCurrery = (type) => {

    let typeList = [
      {
        type:1,
        name:'红钻'
      },
      {
        type:2,
        name:'公会贡献值'
      },
      {
        type:3,
        name:'公会会员贡献值'
      }
  ];
  if(!type) return '红钻'
  let filterInfo = _.filter(typeList, function(obj){
    return obj.type === type;
  });
  return filterInfo.length ? filterInfo[0].name:'红钻'

};

/*
    转换类型
        参数 ——
          该商品奖项数据：
          gift_list:{
              领取id：id
              type 1 (1 激活码，2 礼包，3 代金券，4 充值卡，5 首充号，6 周边)
              gift_list（奖品内容数组）
              content
          }  
          type:1  
        返回 ——
            格式化后的字符串
*/
export const filterRecord = (list,type) => {

  if(!list) return list

  let key_list = [
    {
      type:1,
      list:[
        {name:'激活码'},
        {name:'账户'},
        {name:'密码'}
      ]
    },
    {
      type:2,
      list:[
        {name:'兑换码'},
        {name:'账户'},
        {name:'密码'}
      ]
    },
    {
      type:3,
      list:[
        {name:'兑换码'},
        {name:'账户'},
        {name:'密码'}
      ]
    },
    {
      type:4,
      list:[
        {name:'兑换码'},
        {name:'账户'},
        {name:'密码'}
      ]
    },
    {
      type:5,
      list:[
        {name:'兑换码'},
        {name:'账户'},
        {name:'密码'}
      ]
    },
    {
      type:6,
      list:[
        {name:'兑换码'},
        {name:'账户'},
        {name:'密码'}
      ]
    },
  ]
  let path = [
      {
        type:6,
        list:[
          {name:'兑换码'},
          {name:'账户'},
          {name:'密码'}
        ]
      }
    ]
  let keyFilterList = _.filter(key_list, function(obj){
    return obj.type === type;
  });
  keyFilterList = keyFilterList.length ? keyFilterList : path
  //遍历gift_list
  $$.each(list,function(index, item) {
     if(list.length == 1){
        item.name = keyFilterList[0].list[index].name
     }else if(list.length == 2){
        item.name = keyFilterList[0].list[index+1].name
     }
  });
  return list
};
/*
过滤三种或者更多状态颜色值
  转换类型
        参数 ——
          type
          source
        返回 ——
            格式化后的字符串
*/
export const filterTag = (type,source) => {
    const typeList = [
     {
        type:1,
        style:{'tag-color-other':true}
     },
     {
        type:2,
        style:{'tag-color-red':true}
     },
     {
        type:3,
        style:{'tag-color-yellow':true}
     },
     {
        type:3,
        style:{'tag-color-blue':true}
     },
    ]
    const filterInfo = _.filter(typeList, function(obj){
     return obj.type === type;
    });
    if(source == 2){
      return {'tag-color-blue':true}
    }else{
      return filterInfo.length ? filterInfo[0].style : {'tag-color-yellow':true}
    }
}

/*
过滤三种或者更多状态颜色值
  转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串
*/
export const filterIdentey = (type) => {
    const typeList = [
     {
        type:1,
        style:{'tag-color-guild':true}
     },
     {
        type:2,
        style:{'tag-color-purple':true}
     },
     {
        type:3,
        style:{'tag-color-purple':true}
     },
    ]
    const filterInfo = _.filter(typeList, function(obj){
       return obj.type === type;
    });

    return filterInfo.length ? filterInfo[0].style : {'tag-color-purple':true}
    
}

//筛选类型
export const filterTabSelect = (list,type,source) =>{
  if(!list) return list
  const filter_list = _.filter(list, function(obj){
    return type === obj.type  && source === obj.source //筛选出tab类型数据
  });
  return filter_list
} 

//滑块容器移动方法
export const swiperTab = (id,index,item,time) =>{
  let linkIndex = index ? index : 0
  let linkId = id ? id : '#tabs-animated-wrap'
  let linkWidth = $$(item) ? $$(item).width()*index+'px' : (100*index)+'%'
  // $$(linkId).transition(time?time:500).transform('translate3d(-'+linkWidth+', 0px, 0px)')
  $$(linkId).transition(time?time:500).css({
    '-webkit-transform':'translate3d(-'+linkWidth+', 0px, 0px)',
    'transform': 'translate3d(-'+linkWidth+', 0px, 0px)',
  });
}

//获取三十天前日期或今天日期
export const thirtyDaysAgo = (server_time,today) =>{
  if(today){
    let date = new Date(parseInt(server_time)*1000);
    let month=date.getMonth()+1;
    let day=date.getDate();
    return month+'月'+day+'日';
  }
  else{
    let ago_time=parseInt(server_time)*1000-24*60*60*1000*30;
    let date = new Date(ago_time);
    let month=date.getMonth()+1;
    let day=date.getDate();
    return month+'月'+day+'日';
  }  
}

export const getDate=(tm)=>{ 
  var tt=new Date(parseInt(tm)*1000); 
  var year=tt.getFullYear();
  //var month=tt.getMonth()+1;
  if(tt.getMonth()+1<10){
    var month="0"+(tt.getMonth()+1);
  }
  else{
    var month=tt.getMonth()+1;
  }
  //let day=tt.getDate();
  if(tt.getDate()+1<10){
    var day="0"+tt.getDate();
  }
  else{
    var day=tt.getDate();
  }
  return year+'.'+month+'.'+day; 
} 

/*
礼包中心 过滤礼包类型列表

    key:'',// 'type' 指定礼包类型， 'gid' 指定礼包游戏id 
    value:0//  type值 或 gid值
*/
export const filterCenterGiftList = (list, key, value ) => {

    if(!list.length) return list
    let filterPath = list

    filterPath = _.filter(list,function(obj) {
      if(obj && obj.hasOwnProperty(key)){
        return obj[key] == value
      }else{
        return false
      }
    });

    return filterPath
}

/*
   返回指定列表、指定类型类型总数

    key:'',// 'type' 指定类型返回礼包总数， 'gid' 指定游戏id返回礼包总数 , 'gift_id' 指定礼包id返回公会总数 
    value:0//  type值 或 gid值
    total 默认指定类型返回礼包总数 'total'， 'gift_total' 指定游戏id返回礼包总数 , 'icon' 指定礼包icon
*/
export const filterCenterGiftTotal = (list, key, value ,total) => {

  if(!list.length) return list
  let filterPath = list
  const findLastIndex = _.findLastIndex(list,function(item){ //查找遍历活动的数据
      if(item && item.hasOwnProperty(key)){
        return item[key] == value
      }else{
        return false
      }
      // return item[key] == value
  })
  return findLastIndex !== -1 ? list[findLastIndex][total?total:'total'] : 0 
  
}
/*
   返回指定列表、指定类型类型总数 升级版
    key:'',// 'type' 指定类型返回礼包总数， 'gid' 指定游戏id返回礼包总数 , 'gift_id' 指定礼包id返回公会总数 
    value:0//  type值 或 gid值
    parmeter {'type':0 , 'source':0}
*/
export const filterCenterGiftAllTotal = (list, parmeter , total) => {

  if(!list.length) return list
  let filterPath = list
  const findLastIndex = _.findLastIndex(list,function(item){ //查找遍历活动的数据
      return _.isMatch(item,parmeter)
  })
  return findLastIndex !== -1 ? list[findLastIndex][total?total:'total'] : 0 
  
}

/*
  过滤激活码等类型
*/
export const filterCenterType = (type) => {
      if(!type) return type
      let typeList = [
        {
          type:0,
          name:'全部'
        },
        {
          type:1,
          name:'激活码'
        },
        {
          type:2,
          name:'礼包'
        },
        {
          type:3,
          name:'代金券'
        },
        {
          type:4,
          name:'充值卡'
        },
        {
          type:5,
          name:'首充号'
        },
        {
          type:6,
          name:'周边'
        }
    ];
    let filterInfo = _.filter(typeList, function(obj){
      return obj.type === type;
    });
    return filterInfo.length ? filterInfo[0].name : '全部'
}

/*
  过滤来源kind等类型
*/
export const filterCenterKind = (type) => {
  if(!type) return 'TT'
      let typeList = [
        {
          type:1,
          name:'TT'
        },
        {
          type:2,
          name:'公会'
        },
    ];
    let filterInfo = _.filter(typeList, function(obj){
      return obj.type === type;
    });
    return filterInfo.length ? filterInfo[0].name : 'TT'
}

/*
  返回礼包数组前number条数据
*/
export const filterGiftListSlice = (list, number) => {
  if(!list.length) return list

  if(list.length > number){
    const filterList = list.slice(list,number)
    return filterList
  }else{
    const filterList = list.concat()
    return filterList
  }

}

/*
  数组分组
  将原数组按number数分组 (number 默认值 4)
  [[{},{},{},{}],[{},{},{},{}],....]
  
*/
export const filterToGroupList = (list, number) => {
  if(!list.length) return list

  let groupList = []
  let num = number ? number : 4
  for(let i=0, len = list.length; i < len; i+=num ){
     groupList.push(list.slice(i,i+num))
  }
  
  return groupList
}

// /*
//   数组去重
//   (热门游戏图标 去掉 公会入驻游戏图标部分)
// */
// export const filterDifferenceList = (list, excludelist) => {

//   if(!list.length) return list
//   let filterList = list.concat()
  
//   filterList = _.difference(filterList, excludelist) 

//   return filterList
// }

/*
  数组去重
  (热门游戏图标 去掉 公会入驻游戏图标部分)
*/
export const filterDifferenceIconList = (list, excludelist) => {

  if(!list.length) return list

  let filterList = _.filter(list, function(obj){

        const findLastIndex = _.findLastIndex(excludelist,function(item){
            return item.gid === obj.gid
        })
        if(findLastIndex !== -1){
            return false
        }else{
            return true
        }
  });

  return filterList
}

/*

  按照hardcode 顺序显示
  比如固定显示 全部(source 1 type 0) 礼包(source1 type 2 ) 激活码(source1 type 1 ) 会长上传(source2 type 0 )
  
*/
export const filterOrderSortList = (list,parameter) =>{

  if(!list) return list
  //设定固定的顺序  
  const orderList = [
      {
        source:0,
        type:0,
        total:0,
        game_total:0
      },
      {
        source:1,
        type:2,
        total:0,
        game_total:0
      },
      {
        source:1,
        type:3,
        total:0,
        game_total:0
      },
      {
        source:1,
        type:1,
        total:0,
        game_total:0
      },
      {
        source:2,
        type:0,
        total:0,
        game_total:0
      },
  ]
  const parameterList = parameter ? parameter :  orderList

  $$.each(parameterList,function(index, item) {
    const findLastIndex = _.findLastIndex(list,function(obj){
        return obj.type === item.type && obj.source === item.source     
    })
    if(findLastIndex !== -1){
      const thisItem = _.extend(item,list[findLastIndex]);
      item = thisItem
    }
  });

  return parameterList
}

/*
  转换为base64图片格式方法自定义方式
    参数
      photo 为传入的图片格式
      type 默认为转化
*/
export const setBasePhoto = (photo) =>{
  try{
    photo = photo ? "data:image/png;base64," + TTJSBridge.invoke("data", "getAssetsImage", photo) : photo
  }catch(e){}
  return photo
}
/*
    限制七牛cdn的图片大小 ——
        参数 ——
            value： 图片url,
            w: 限制图片的width
            h：限制图片的height
            type:图片类型
        返回 ——
            限制图片后的url

    使用方式 —— 
       

    说明 ——
        已把'img-filter'过滤器封装在内
*/
export const imageView = (value, w, h , type) => {

    if(!value) return value
      
    const fileType = type ? type : 'jpg'
    const valueType = value.indexOf('?') > -1 ? value.substr(0,value.indexOf('?')) : value

    if (valueType){
        if (w === 'auto'){
            return valueType + '?imageView2/1/h/' + h+'/format/'+fileType;

        } else if (h === 'auto'){
            return valueType + '?imageView2/2/w/' + w+'/format/'+fileType;

        } else if(h && w) {
            return valueType + '?imageView2/1/w/' + w + '/h/' + h+'/format/'+fileType;
        } else{
             return valueType + '?imageView2/1'+'/format/'+fileType;
        }
    } else {
        return value;
    }
};

/*
过滤三种或者更多状态颜色值
  转换类型
        参数 ——
          status
          user_status
        返回 ——
            格式化后的字符串
*/
export const filterFetchTag = (status,user_status) => {
    const typeList = [
      {
        status:0,
        user_status:2,
        style:{'received':true}
      },
      {
        status:0,
        user_status:3,
        style:{'received':true}
      },
      {
        status:0,
        user_status:4,
        style:{'received':true}
      },
      {
        status:2,
        user_status:0,
        style:{'received':true}
      },
      {
        status:3,
        user_status:0,
        style:{'disabled':true}
      },
      {
        status:4,
        user_status:0,
        style:{'received':true}
      },
      
    ]
    const findLastIndex = _.findLastIndex(typeList, function(obj){
     return obj.status === status || obj.user_status === user_status
    });

    return findLastIndex !== -1 ? typeList[findLastIndex].style : {'':true}
}
//
/*
   排除部分不需要返回指定列表、指定类型类型总数 升级版
    list:'',
    key:''
    parmeter {'type':0 , 'source':0}
*/
export const rejectFilterGift = (list, parmeter,key) => {

  if(!list.length) return list
  const rejectList = _.reject(list,function(item){ //查找遍历活动的数据
      return _.isMatch(key?item[key]:item,parmeter)
  })
  return rejectList
  
}
/*
  hardcode游戏专区的图片大小
*/
export const filterImageWidth = (type,width,height) => {

    let w,h 
    let _w =  width ? width : 220
    let _h = height ? height : 152
    if(type == 1){
      w = _w
      h = _h
    }else if(type == 2){
      w = _h
      h = _w
    }else{
      w = _w
      h = _h
    }
    let style = {'width':w+'px','height':h+'px'} //
    return style

}

/*
    使用方式 —— 
        {{data | image-view '1' }}

    说明 ——
        已把'img-view'过滤器封装在内
*/
export const filterImageType = (value,type,width,height) => {

  let w,h,imgList

  let _w = width ? width : 220
  let _h = height ? height : 152

  //竖屏 152*220  横屏 220*152
  //1.0 竖屏 90*160 横屏 192*108
  if(type == 1){
    w = 220*2
    h = 152*2
  }else if(type == 2){
    w = 152*2
    h = 220*2
  }else{
    w = 220*2
    h = 152*2
  }
  if(value.match('vframe|mp4')){
    value = value.substr(0,value.indexOf('?'))
    imgList =  videoViewList(value,w,h); //获取图片大小过滤器
  }else{
    imgList =  imageView(value,w,h); //获取图片大小过滤器
  }

  return imgList

}
/*
  转换为判断照片展示方式
    参数
      list 为时间戳
        url 图片链接
        id 序号
        type 类型为1横屏2竖屏
        按照类型1,2返回数据
*/
export const photoViewList = (list)=> {

  let path = []

  let array1 = _.filter(list, function(obj){  
    return obj.type === 1 
  });
  let array2 = _.filter(list, function(obj){
    return obj.type === 2
  });
  path = array1.concat(array2).length ? array1.concat(array2) : list
  return path
}
/*
    限制七牛cdn的图片大小 ——
        参数 ——
            value： 图片url,
            w: 限制图片的width
            h：限制图片的height
        返回 ——
            限制图片后的url

    使用方式 —— 
        {{data | image-view 'auto' '230'}}

    说明 ——
        已把'img-filter'过滤器封装在内
*/
export const videoViewList = (value, w, h)=> {

    if (value){
        if (w === 'auto'){
          return value + '?vframe/jpg/offset/3/h/' + h;

        } else if (h === 'auto'){
          return value + '?vframe/jpg/offset/3/w/'+w;

        } else {
          return value + '?vframe/jpg/offset/3/w/'+w+'/h/' + h;
        }
    } else {
        
        return imgFilter;
    }
    
}


import Vue from 'vue';

/*
    金额限制两位小数
        参数 ——
                value： 数字或内容是数字的字符串
            返回 ——
                带有2位小数位的数字

        使用方式 ——
            {{data | cash-fix2}}
*/
Vue.filter('cash-fix2', (value) => {
    if (value){
        return parseFloat(value).toFixed(2);
    } else {
        return value;
    }
});
/*
    img filter, 当值为空时调用此base64
        返回 ——
            若值不是正常的图片url，则返回默认的base64

        使用方式 —— 
            {{data | img-filter}} 

        说明 ——
            'image-view'已把'img-filter'过滤器封装在内
*/

Vue.filter('img-filter', (value) => {
    if(!value || value.toString().search('http://') ==-1){
     return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
    } else {
        return value;
    }
});
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
Vue.filter('image-view', (value, w, h) => {

    const imgFilter = Vue.filter('img-filter')(value);

    if (imgFilter == value){
        if (w === 'auto'){
            return value + '?imageView2/1/h/' + h+'/format/jpg';

        } else if (h === 'auto'){
            return value + '?imageView2/2/w/' + w+'/format/jpg';

        } else {
            return value + '?imageView2/1/w/' + w + '/h/' + h+'/format/jpg';
        }
    } else {
        
        return imgFilter;
    }
    
});

Vue.filter('video-view', (value, w, h) => {

    const imgFilter = Vue.filter('img-filter')(value);

    if (imgFilter == value){
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
    
});

/*
    格式化时间,时间戳转化为时间格式 ——
        参数 ——
            value： 时间戳10位
            type:   为需要的时间格式 'yyyy-MM-dd hh:mm:ss'
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{data | format-time type}}
*/
Vue.filter('format-time', (value,type) => {
    if(!value) return null
    let time = new Date(parseInt(value)*1000)
    let formatTime = type ? type : 'yyyy-MM-dd'
    let date = {
              "M+": time.getMonth() + 1,
              "d+": time.getDate(),
              "h+": time.getHours(),
              "m+": time.getMinutes(),
              "s+": time.getSeconds(),
              "q+": Math.floor((time.getMonth() + 3) / 3),
              "S+": time.getMilliseconds()
       };
       if (/(y+)/i.test(formatTime)) {
              formatTime = formatTime.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (let k in date) {
              if (new RegExp("(" + k + ")").test(formatTime)) {
                     formatTime = formatTime.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return formatTime;
});

/*
    换算方法,大于1w显示1万 少于显示实际 数量格式 ——
        参数 ——
            total：1000 总数
            limit: 4 默认为万位单位 (可以不填) 
            type:  '万'|'千'|'w'|'k' 默认为需要的时间格式 '万'(可以不填)
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ total | format-number type limit   }}
*/

Vue.filter('format-number',function(total,limit,type) {

    if(!total) return 0
    let tyleNum = type ? type : '万'
    let limitNum = limit ? limit : 4
    let totalNum 
    
    totalNum = (total.toString().length > limitNum) ? (total / Math.pow(10,limitNum)).toFixed(1)+tyleNum : total

    return totalNum

});

/*
    换算方法,换算为百分比 数量格式 ——
        参数 ——
            remained: 12.154
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ remained | format-number   }}
*/

Vue.filter('format-percent',function(remained,total) {

  if(!total) return null
  let percentage =  remained <= total ? (remained/total*100) : 100
  return percentage.toFixed(1)

});

/*
    转换类型
        参数 ——
          status
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ type | format-type  reserved }}
*/

Vue.filter('format-status',function(type) {

    if(!type) return '领取'
    let typeList = [
      {
        type:0,
        name:'领取中···'
      },
      {
        type:1,
        name:'领取'
      },
      {
        type:2,
        name:'已售罄'
      },
      {
        type:3,
        name:'未上架'
      },
      {
        type:4,
        name:'已过期'
      }
  ];
  
  let filterInfo = _.filter(typeList, function(obj){
    return obj.type === type;
  });
  return filterInfo[0] ? filterInfo[0].name:'领取'

});

/*
    转换类型
        参数 ——
          status
        返回 ——
            格式化后的字符串
        用户礼包状态：user_status（0不可领 1 未领取，2 已领取，3 审核中, 4 审核通过）
    使用方式 —— 
        {{ type | format-userstatus }}
*/

Vue.filter('format-user-status',function(type) {

    if(!type) return '领取'
    let typeList = [
      {
        type:0,
        name:'领取'
      },
      {
        type:1,
        name:'领取'
      },
      {
        type:2,
        name:'已领取'
      },
      {
        type:3,
        name:'审核中'
      },
      {
        type:4,
        name:'已领取'
      }
  ];
  
  let filterInfo = _.filter(typeList, function(obj){
    return obj.type === type;
  });
  return filterInfo.length ? filterInfo[0].name:'领取'

});

/*
    转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ type | format-type  }}
*/

Vue.filter('format-type',function(type,source) {

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
  let name
  let filterInfo = _.filter(typeList, function(obj){
    return obj.type === type;
  });
  //优先筛选source
  if(source == 2){
    name = '会长上传'
  }else{
    name  = filterInfo.length ? filterInfo[0].name : '全部'
  }
  return name

});

/*
    转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ type | format-type  }}
*/

Vue.filter('format-currency',function(type) {

    if(!type) return '红钻'
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
        name:'贡献值'
      }
  ];

  let filterInfo = _.filter(typeList, function(obj){
    return obj.type === type;
  });
  return filterInfo.length ? filterInfo[0].name : '红钻'

});

/*
  过滤三种或者更多状态颜色值
  转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ type | format-tag  }}
*/
Vue.filter('format-tag',function(type) {

   const typeList = [
     {
        type:1,
        style:'tag-color-other'
     },
     {
        type:2,
        style:'tag-color-yellow'
     },
     {
        type:3,
        style:'tag-color-blue'
     },
   ]
   const filterInfo = _.filter(typeList, function(obj){
     return obj.type === type;
   });
  return filterInfo.length ? filterInfo[0].name : 'tag-color-yellow'

})

/*
  过滤成员的身份
  转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ type | format-identity  }}
*/
Vue.filter('format-identity',function(type) {
  
   const typeList = [
     {
        type:1,
        name:'会长'
     },
     {
        type:2,
        name:'管理员'
     },
     {
        type:3,
        name:'普通成员'
     },
   ]
   const filterInfo = _.filter(typeList, function(obj){
     return obj.type === type;
   });
  return filterInfo.length ? filterInfo[0].name : '普通成员'

})

/*
  过滤标签
  转换类型
        参数 ——
          type
        返回 ——
            格式化后的字符串

    使用方式 —— 
        {{ type | format-tag  }}
*/

Vue.filter('filter-tag',function(type,source) {
 const typeList = [
     {
        type:1,
        style:'tag-color-other'
     },
     {
        type:2,
        style:'tag-color-yellow'
     },
     {
        type:3,
        style:'tag-color-blue'
     },
    ]
  const filterInfo = _.filter(typeList, function(obj){
     return obj.type === type;
  });
    if(source == 2){
      name = 'tag-color-blue'
    }else{
      name = filterInfo.length ? filterInfo[0].style : 'tag-color-yellow'
    }
    
    return name
})
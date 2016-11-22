import {
    USER_PROFILE_UPDATE,
    GUILD_CENTER_SHOP_UPDATE,
    GUILD_CENTER_GIFT_UPDATE,
    GUILD_CENTER_SHOP_SEARCH_LIST,
    GUILD_CENTER_GIFT_SEARCH_LIST,
    GUILD_CENTER_GIFT_MORE_LIST,
    GUILD_CENTER_SHOP_MORE_LIST,
    GUILD_CENTER_GIFT_INFO,
    GUILD_CENTER_SHOP_INFO,
    GUILD_CENTER_SHOP_RECORD,
    GUILD_CHANGE_CURRENT_GIFT,
    GUILD_CHANGE_CURRENT_GAME,
    GUILD_CENTER_STAR_UPDATE
} from './mutation-types'
import { getShareData } from '../api/js_api.js'
//initial state
export const guildInitState = {
    //localStorage
    cache:{
        key:'tt_guild_system'
    },
    //接口
    request:{
        userInit:'/user/init', //用户信息
        guildInit:'guild_shop/init', //商店中心 首页
        giftInit:'/gift_center/init', //礼包中心 首页
        activity:'/gift_center/activity', //礼包中心 活动接口
        ttGift:'/gift_center/tt_gift', //礼包中心 TT礼包
        guildGift:'/gift_center/guild_gift', //礼包中心 公会礼包
        guildSearch:'/guild_shop/search', // 公会商店中心搜索
        giftSearch:'/gift_center/search', // 礼包中心 搜索礼包
        giftInfo:'/gift_center/game', //礼包中心 游戏ID查礼包 
        fetchTtGift:'/gift_center/fetch_tt_gift', //礼包中心 领取 TT礼包
        fetchGuildGift:'/gift_center/fetch_guild_gift', //礼包中心 会员领取公会礼包
        notify:'/gift_center/notify', //礼包中心 通知会长申请礼包
        giftGuild:'/gift_center/gift_guild', //礼包中心 非会员查找礼包公会
        purChase:'/gift_center/purchase', //礼包中心 会长申请礼包
        additionalList:'/guild_star/additional_list', //公会贡献加成名单
        cms:'http://m.52tt.com/umbraco/api/MyCmsApi/GetPageBodyText' //cms规则接口路径
    },

    data: {
        user : {
            uid: '500012',
            account: 'my_account',
            name: '昵称',
            level: 10, //等级
            contribution: 1000, //历史贡献值
            consume: 100, //可消费贡献值
            diamond: 1000, //红钻
            guild_title: '公会之花',
            guild_identity: '会长',
            record : [
                {
                    id: '21414141',
                    gift_id: '14141412', //礼包id
                    account: 'tt12441', //领取账号
                    pass : '1241151515', //密码
                    exchange: 'twggwwy', //兑换码
                }
            ]
        },
        current : {
            gift_id: '1441414', 
            game_id: 295166,
        },
        //公会星级
        guild_star:{
            home:{
                //贡献
                contribute:{
                    now_number:0,//公会当前基础贡献值
                    additional:0,//额外加成贡献值
                    now_rate:0,//当前贡献加成比率
                    now_start:0,//当前等级起始贡献值
                    next_level_number:0,//下一等级贡献值
                    next_level_rate:0,//下一等级加成比率
                    today:0,//今日贡献
                    month_before:0,//30天前当日贡献
                },
                //签到人数
                sign_number:{
                    yesterday:0,
                    today:0,
                },
                //捐献人数
                contribute_number:{
                    yesterday:0,
                    today:0,
                },
                //入会人数
                enrollment_number:{
                    yesterday:0,
                    today:0,
                },
                server_time:0,//服务器时间
            },
            //贡献加成名单
            additional:{
                list:[
                    {
                        uid:0,//用户id
                        head:'',//头像
                        name:'',//昵称
                        member_level:'',//会员等级
                        guild_title:'',//会员称号（公会之花）
                        buy:0,//消费T点
                        guild_identity:'',//职位
                    }
                ],
                total:0,
                server_time:0,//服务器时间
            },          
        },
        //公会商店
        guild_shop:{
            //礼包总数
            gift_total:{
                activation:0,//激活码
                gift:0,//礼包
                coupon:0,//代金卷
                recharge:0,//充值卡
                first:0,//首充号
                side:0,//周边
                upload:0,//会长上传
            },
            //礼包
            gift: {
                list:[
                {
                    gift_id: '1151515', //礼包id
                    gid: 299165, //相关游戏gid
                    game_name:'',//游戏名
                    icon:'',//游戏图标
                    type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    source: 1, //礼包来源: 1为官方，2为会长录入
                    gift_name: '王者荣耀礼包', //礼包名称
                    //tag: '标签',
                    //sa: 2000, //淘号次数,仅用于淘号
                    total: 1000, //礼包总数
                    remained: 200, //可领取数量
                    currency: 1, //购买货币: 1为红钻，2为公会贡献值，3为公会会员贡献值
                    price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    status:0,//礼包状态（1 上架，2 已售完，3 下架）
                    receive: true, //当前用户是否可领取
                    need_approve:false,//是否需要审批
                    period: '2016.9.30~2017.1.30', //有效期
                    desc: '礼包内容',
                    usage_method : '使用方法',
                }],
                total:0,  //总长度
                server_time:0,//服务器时间  
            },
            //领取记录
            record: 
                { 
                    list:[
                        {
                            gift_id:0,//礼包id
                            list:[
                            {
                                user: {
                                    uid: '124221',
                                    icon: 'http://app.52tt.com/assets/images/touch-icon.png', //头像
                                    name: '昵称',
                                    guild_identity: '会长',//职位
                                    level: 10, //会员等级
                                    guild_title: '公会之花',//称号
                                },
                                receive_time: '2016-9-18',//领取时间
                            }],
                            total:0,//记录总数
                            server_time:0,//服务器时间
                        },
                    ],
                total:0
            },
            //公会商店搜索列表
            search_list:{
                list:[
                    // {

                    // }
                ],
                total:0
            },
            //公会商店点击更多查看列表
            more_list:{
                list:[
                    {

                    }
                ],
                total:0
            },
            //公会商店商品详情
            guild_info:{

            },
        },
        //礼包中心
        gift_center:{
            //活动
            activity:{
                list:[{
                    icon:'',//活动图标
                    name:'',//游戏名
                    title:'',//活动名称
                    stage:0,//活动阶段（1 预热，2 进行，3 结束）
                    period: '2016.9.30~2017.1.30', //活动时间
                    // start_time:0,//开始时间
                    // end_time:0,//结束时间
                    url:'',//活动链接
                }],
                total:0,//活动总数
                server_time:0,//服务器时间
            },
            //banner图片
            banner_list:[

            ],
            //热门游戏列表
            hot_game_list:[

            ],
            //公会游戏列表
            guild_game_list:[

            ],
            //TT礼包
            tt_gift: {
                list:[
                {
                    gift_id: '1151515', //礼包id
                    gift_icon:'',//礼包图标
                    kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    gid: 299165, //相关游戏gid
                    game_name:'',//游戏名
                    icon:'',//游戏图标
                    type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    gift_name: '王者荣耀礼包', //礼包名称
                    //currency: 1, //购买货币: 1为红钻，2为公会贡献值，3为公会会员贡献值
                    //source: 1, //礼包来源: 1为官方，2为会长录入
                    //tag: '标签',
                    total: 1000, //礼包总数
                    remained: 200, //可领取数量
                    price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    tao:false,//是否淘号（true 淘号 false 不是淘号）
                    sa: 2000, //淘号次数,仅用于淘号
                    receive: true, //当前用户是否可领取
                    period: '2016.9.30~2017.1.30', //有效期
                    desc: '礼包内容',
                    usage_method : '使用方法',
                }],
                total:0,  //总长度
                server_time:0,//服务器时间  
            },
            //公会礼包
            guild_gift: {
                list:[
                {
                    gift_id: '1151515', //礼包id
                    gift_icon:'',//礼包图标
                    kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    gid: 299165, //相关游戏gid
                    game_name:'',//游戏名
                    icon:'',//游戏图标
                    type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    gift_name: '王者荣耀礼包', //礼包名称
                    //currency: 1, //购买货币: 1为红钻，2为公会贡献值，3为公会会员贡献值
                    //source: 1, //礼包来源: 1为官方，2为会长录入
                    //tag: '标签',
                    total: 1000, //礼包总数
                    remained: 200, //可领取数量
                    price: 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    have:true,//当前公会是否有此礼包
                    receive: true, //当前用户是否可领取
                    period: '2016.9.30~2017.1.30', //有效期
                    desc: '礼包内容',
                    usage_method : '使用方法',
                }],
                total:0,  //总长度
                server_time:0,//服务器时间  
            },
            //礼包搜索列表
            search_list:{
                list:[
                    // {

                    // }
                ],
                total:0
            },
            //礼包中心点击更多查看列表
            more_list:{
                list:[
                    {

                    }
                ],
                total:0
            },
            //礼包中心礼包详情
            gift_info:{
                
            },        
        },
        
        game: [
            {
                gid: 295166, //游戏id
                name: '王者荣耀',
                icon: 'http://app.52tt.com/assets/images/touch-icon.png',
                count: 1000, //礼包总数
                recommended: true, //公会推荐游戏
                hot: true, //热门游戏
            }
        ],
        // activity: [
        //     {
        //         id: '251512', //活动id
        //         title: '标题',
        //         tag: '标签',
        //         icon: 'http://app.52tt.com/assets/images/touch-icon.png',
        //         schedule: '2016-9-30 至 2017-1-30',
        //         url: 'tt://navigation/xxxx',
        //     }
        // ],
    }
}


//mutation
export const guildMutations = {
     //用户的信息
    [USER_PROFILE_UPDATE](state,data){

        let shareData = getShareData();
        let partialData = shareData.data ? shareData.data : data

        if(!data){
            //data中拿gid， UserInfo中拿 uid
            state.data.user.gid = (partialData && partialData.hasOwnProperty('gid')) 
                                ? partialData.gid : $$.parseUrlQuery(window.location.href).gid;
            state.data.user.uid = ( shareData && shareData.hasOwnProperty('UserInfo') &&shareData.UserInfo.hasOwnProperty('uid')) 
                                ?shareData.UserInfo.uid : $$.parseUrlQuery(window.location.href).uid;
            state.data.user.gid = state.user.gid ? state.user.gid :237539 //活动gid 237539 测试内部使用
            state.data.user.uid = state.user.uid ? state.user.uid : 2165700 //活动uid 2165700 测试内部使用
            state.data.user.name = state.user.nickName ? state.user.nickName : '暂无昵称' //用户昵称
            state.data.user.head = state.user.head ? state.user.head : '暂无昵称' //用户头像
        }else{
            //用户基本信息
            state.data.user.uid = data.uid ? data.uid : state.data.user.uid
            state.data.user.name = data.name ? data.name : state.data.user.name
            state.data.user.head = data.head ? data.head : state.data.user.head
            state.data.user.contribution = data.contribution ? data.contribution : state.data.user.contribution
            state.data.user.consume = data.consume ? data.consume : state.data.user.consume
            state.data.user.consume = data.diamond ? data.diamond : state.data.user.diamond
            //用户所在公会基本信息
            state.data.user.guild_id = data.guild_id ? data.guild_id : state.data.user.guild_id
            state.data.user.guild_title = data.guild_title ? data.guild_title : state.data.user.guild_title
            state.data.user.level = data.level ? data.level : state.data.user.level
            state.data.user.guild_identity = data.guild_identity ? data.guild_identity : state.data.user.guild_identity
            state.data.user.guild_consume = data.guild_consume ? data.guild_consume : state.data.user.guild_consume
            //用户兑换的记录
        }
    },

     //更新公会商店信息
    [GUILD_CENTER_SHOP_UPDATE](state,data){

        let gift_total = {
            activation:data.activation,
            gift:data.gift,
            coupon:data.coupon,
            recharge:data.recharge,
            first:data.first,
            side:data.side,
            upload:data.upload
        }
        //商品列表
        if(data.gift.hasOwnProperty('list') && data.gift.list.length){
            $$.each(data.list, function(index, item){

                item.server_time = data.gift.server_time //赋值礼包的服务时间
                const findLastIndex = _.findLastIndex(state.data.guild_shop.gift.list,function(obj){ //查找遍历活动的数据
                    obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                    return item.id === obj.id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.gift.list.$set(item)
                }else{ //存在就添加数据
                    state.data.guild_shop.gift.list.push(item)
                }

            })
        }
        state.data.guild_shop.gift_total = gift_total
        state.data.guild_shop.gift.total = data.total ? data.total : state.data.guild_shop.gift.total

    },

    //更新公会礼包中心信息    
    [GUILD_CENTER_GIFT_UPDATE](state,data){

        const game_list = ['banner_list','hot_game_list','guild_game_list']

        $$.each(game_list,function(index, gameItem) {
            //头部轮播图（数组）热门游戏（数组）入驻游戏（数组）
            if(data.hasOwnProperty(gameItem) && data[gameItem].length){
                $$.each(data[gameItem], function(index, item){

                    const findLastIndex = _.findLastIndex(state.data.gift_center[gameItem],function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1){ //查找不到就更新数据
                        state.data.gift_center[gameItem].$set(item)
                    }else{ //存在就添加数据
                        state.data.gift_center[gameItem].push(item)
                    }

                })
            }
        });
        //公会礼包中心活动列表
        if(data.hasOwnProperty('activity')){
            if(data.activity.list.length){
                $$.each(data.activity.list, function(index, item){
                    item.keywords = data.keywords
                    const findLastIndex = _.findLastIndex(state.data.gift_center.active.list,function(obj){ //查找遍历活动的数据
                        obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                        return item.id === obj.id
                    })
                    if(findLastIndex !== -1){ //查找不到就更新数据
                        state.data.gift_center.active.list.$set(item)
                    }else{ //存在就添加数据
                        state.data.gift_center.active.list.push(item)
                    }

                })
            }
        }

    },

    [GUILD_CENTER_SHOP_SEARCH_LIST](state,data){

        //赋值搜索商品list表
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){
                item.keywords = data.keywords
                const findLastIndex = _.findLastIndex(state.data.guild_shop.search_list.list,function(obj){ //查找遍历活动的数据
                    obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                    return item.id === obj.id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.search_list.list.$set(item)
                }else{ //存在就添加数据
                    state.data.guild_shop.search_list.list.push(item)
                }

            })
        }
        //赋值搜索商品list表总页码
        state.data.guild_shop.search_list.total = data.total

    },  



    
    //游戏商品中心商品更多列表
    [GUILD_CENTER_SHOP_MORE_LIST](state,data){
          //赋值搜索商品list表
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){
                const findLastIndex = _.findLastIndex(state.data.guild_shop.more_list.list,function(obj){ //查找遍历活动的数据
                    obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                    return item.id === obj.id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.more_list.list.$set(item)
                }else{ //存在就添加数据
                    state.data.guild_shop.more_list.list.push(item)
                }
            })
        }
        //赋值搜索商品list表总页码
        state.data.guild_shop.more_list.total = data.total
    },



    //商店中心礼包详情
    [GUILD_CENTER_GIFT_INFO](state,data){

        //当前的礼包id
        const gift_id = state.data.current.gift_id
        const guild_list = state.data.guild_shop.more_list.list
        const findLastIndex = _.findLastIndex(guild_list,function(obj){
            return obj.gift_id === gift_id
        })
        if(findLastIndex !== -1){
            state.data.guild_shop.guild_info = shop_list[findLastIndex]
        }

    },

    //公会商品领取记录
    [GUILD_CENTER_SHOP_RECORD](state,data){
        if(data.hasOwnProperty('list') && data.list.length){
             $$.each(data.list, function(index, item){
                const findLastIndex = _.findLastIndex(state.data.guild_shop.record.list,function(obj){ //查找遍历活动的数据
                    obj.id ? obj.id : obj.id = 0 //防止不存在id报错 
                    return item.id === obj.id
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_shop.record.list.$set(item)
                }else{ //存在就添加数据
                    state.data.guild_shop.record.list.push(item)
                }
            })
        }
        //赋值搜索商品list表总页码
        state.data.guild_shop.record.total = data.total
    },

    //更新即将访问的礼包id,用于详情页参数传递
    [GUILD_CHANGE_CURRENT_GIFT] (state, id) {
        state.data.current.gift_id = id;
    },

    //更新即将访问的游戏id,用于详情页参数传递
    [GUILD_CHANGE_CURRENT_GAME] (state, id) {
        state.data.current.game_id = id;
    },

    //公会星级页面
    [GUILD_CENTER_STAR_UPDATE](state,data){

    }

}

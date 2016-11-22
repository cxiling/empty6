export const guildInitState = {
    //localStorage
    cache:{
        key:'tt_guild_system'
    },
    //接口
    request:{
        //公会体系接口http://api.52tt.com http://192.168.8.57:3000
        userInit:'/guild_star/user/init', //用户信息
        starInit:'/guild_star/init', //公会星级首页
        guildInit:'/guild/guild_shop/init', //商店中心 首页
        guildSearch:'/guild/guild_shop/search', // 公会商店中心搜索
        guildGame:'/guild/guild_shop/game', // 公会查询gameid
        fetchShopGift:'/guild/guild_shop/fetch_gift',//领取商店礼包
        shopRecod:'/guild/guild_shop/fetch_record', //公会商品礼包领取记录
        additionalList:'/guild_star/additional_list', //公会贡献加成名单
        giftInit:'/guild/gift_center/init', //礼包中心 首页
        activity:'/guild/gift_center/activity', //礼包中心 活动接口
        ttGift:'/guild/gift_center/tt_gift', //礼包中心 TT礼包
        guildGift:'/guild/gift_center/guild_gift', //礼包中心 公会礼包
        fetchTtGift:'/guild/gift_center/purchase_tt_gift', //礼包中心 领取 TT礼包
        notify:'/guild/gift_center/notify', //礼包中心 通知会长申请礼包
        giftGuild:'/guild/gift_center/search_gift_guild', //礼包中心 非会员查找礼包公会
        purchase:'/guild/gift_center/purchase_guild_gift', //礼包中心 会长申请礼包
        cms:'http://m.52tt.com/umbraco/api/MyCmsApi/GetPageBodyText', //cms规则接口路径
        singleGiftInfo:'/guild/gift_center/single_gift_info',//礼包中心 单个礼包详情
        //游戏专区接口
        zone_index: '/game/areav2', //游戏专区信息
        circle_focus: '/circle/join', //加入公会 关注游戏专区
        fetch_game_gifts: '/game/fetch_giftpkg',//领取专区礼包
        purchase_first_charge: '/game/precharge_apply',//首充号
        join_t_group: '/game/join_tgroup', //加入T群
        order_benefits:'/game/order_benefits', //预约福利
    },

    data: {
        user : {
            uid: 0, //'1965630'
            gid: 0, //'237539'
            account: '',
            name: '',
            level: 0, //等级
            guild_level:0,//公会等级
            contribution: 0, //历史贡献值
            consume: 0, //可消费贡献值
            diamond: 0, //红钻
            guild_title: '',//'公会之花'
            guild_identity: '',//（1 会长，2 副会长 ，3 普通成员）
            guild_id:0, //101336 101481
            guild_consume:0,
            purchase_rights:0,//公会礼包采购权限(1 可以 ,0 不能)
            record : [
                // {
                // id:0,
                // type:2,
                // gift_list:[
                //     {
                //         content:'menggege'
                //     },
                //     {
                //         content:'45878798xx4654'
                //     },
                // ]
                //}
            ]
        },
        share_data:{
            uri:'http://app.52tt.com/project/guild/index.html',
            pageName:'',//跳转入口页面
            gift_id:0, //商品详情id
            kind:0,//（0 其他礼包，1 礼包中心 TT礼包，2 礼包中心 公会礼包）
            gid:0,
            guildStarIcons:[
                // {
                //     level:0,
                //     icon:'',
                // }
            ],
        },
        current : {
            gift_id: '',
            game_id: '',
            game_name:'',
            keywords:'',
            page_id:0,
            fail_info:'',
            partermter:{
                
            },
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
                level:'',
                server_time:0,//服务器时间
            },
            //贡献加成名单
            additional:{
                list:[
                    // {
                    //     uid:0,//用户id
                    //     head:'',//头像
                    //     name:'',//昵称
                    //     member_level:'',//会员等级
                    //     guild_title:'',//会员称号（公会之花）
                    //     buy:0,//消费T点
                    //     guild_identity:'',//职位
                    // }
                ],
                total:0,
                server_time:0,//服务器时间
            },
            //公会规则
            rule:{
                pageTitle:'',
                bodyText:''
            }
        },
        //公会商店
        guild_shop:{
            //礼包总数
            gift_total:[
                // {
                //     source:1,
                //     total:0,
                //     type:0
                // },
                // {
                //     source:1,
                //     total:0,
                //     type:1
                // },
                // {
                //     source:1,
                //     total:0,
                //     type:2
                // },
                // {
                //     source:1,
                //     total:0,
                //     type:3
                // }
            ],
            //过滤后数据
            gift_total_list:[

            ],
            //礼包
            gift: {
                list:[
                    // {
                    //     gift_id: 0, //礼包id
                    //     gid: 0, //相关游戏gid
                    //     game_name:'TT礼包名称',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 0, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     source: 1, //礼包来源: 1为官方，2为会长录入
                    //     gift_name: 'TT礼包名称', //礼包名称
                    //     tag: '标签',
                    //     sa: 2000, //淘号次数,仅用于淘号
                    //     total: 0, //礼包总数
                    //     remained: 0, //可领取数量
                    //     currency: 0, //购买货币: 1为红钻，2为公会贡献值，3为公会会员贡献值
                    //     price : 0, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     status:0,//礼包状态（1 上架，2 已售完，3 下架）
                    //     receive: true, //当前用户是否可领取
                    //     need_approve:false,//是否需要审批
                    //     period: '2016.9.30~2017.1.30', //有效期
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // }
                ],
                total:0,  //总长度
                server_time:0,//服务器时间
            },
            //领取记录
            record:
            {
                list:[
                    // {
                    //     user: {
                    //         gift_id:0,//礼包id
                    //         uid: '124221',
                    //         icon: 'http://app.52tt.com/assets/images/touch-icon.png', //头像
                    //         name: '昵称',
                    //         guild_identity: '会长',//职位
                    //         level: 10, //会员等级
                    //         guild_title: '公会之花',//称号
                    //     },
                    //     receive_time: '2016-9-18',//领取时间
                    // },
                ],
                total:0,
                total_list:[
                    // {
                    //     gift_id:0,
                    //     total:0
                    // }
                ]
            },
            //公会商店搜索列表
            search_list:{
                list:[
                    // {
                    // }
                ],
                total:0,
                total_list:[
                    // {
                    //     keywords:'',
                    //     total:0
                    // }   
                ],
            },
            //公会商店所有查询下列表
            more_list:{
                list:[
                    // {
                    // }
                ],
                total:0
            },
            //公会商店点击更多查看列表
            gid_list:{
                list:[
                    // {

                    // }
                ],
                total_list:[
                    // {
                    //     gid:0,
                    //     total:0
                    // }   
                ],
                total:0
            },
            //公会商店商品详情
            shop_info:{
                // gift_id: 0, //礼包id
                // gid: 0, //相关游戏gid
                // game_name:'TT礼包名称',//游戏名
                // icon:'http://app.52tt.com/api/face?account=1117621@guild',//游戏图标
                // type: 0, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                // source: 1, //礼包来源: 1为官方，2为会长录入
                // gift_name: 'TT礼包名称', //礼包名称
                // tag: '标签',
                // sa: 2000, //淘号次数,仅用于淘号
                // total: 0, //礼包总数
                // remained: 0, //可领取数量
                // currency: 0, //购买货币: 1为红钻，2为公会贡献值，3为公会会员贡献值
                // price : 0, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                // status:0,//礼包状态（1 上架，2 已售完，3 下架）
                // receive: true, //当前用户是否可领取
                // need_approve:false,//是否需要审批
                // period: '2016.9.30~2017.1.30', //有效期
                // start_time:0,//有效期开始时间
                // end_time:0,//有效期结束时间
                // desc: '礼包内容',
                // usage_method : '使用方法',
                record:{
                    gift_id:0,
                    type:0,
                    gift_list:[

                    ]
                }
            },
            //奖励
            award:{
                gift_id:0,
                type:0,
                gift_list:[
                    // {
                    //     content:'TT兑换码'
                    // }
                ]
            },
            award_list:[
                // {
                //     gift_id:0,
                //     type:0,
                //     gift_list:[
                //         // {
                //         //     content:'TT兑换码'
                //         // }
                //     ]
                // }
            ]
        },
        //礼包中心
        gift_center:{
            //当前信息参数
            center_current : {
                //当前页面名
                page_name:'',
                //设置当前礼包列表位置
                position:'home',//(首页'home' 搜索页 'search' 游戏查礼包页 'game')
                //首页
                home:{
                    kind:1,//当前显示类别（1 TT礼包，2 公会礼包） 
                },
                //所有列表
                gift_list:{
                    kind:1,
                    type:2,
                },
                //详情页
                detail:{
                    position:'',//详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')
                    kind:1,//当前显示类别（1 TT礼包，2 公会礼包）
                    gift_id: 0,//当前礼包详情 礼包id    
                },
                //游戏查礼包
                game:{
                    kind:1,//当前显示类别（1 TT礼包，2 公会礼包）
                    gid: 0,//游戏查礼包 游戏id   
                    game_name:'',//游戏名
                },
                //搜索页
                search:{
                    kind:1,
                    keywords:'',
                },
                //礼包查公会
                gift_guild:{
                    gift_id:0,//礼包id
                },
                parameter:{
                    
                },
            },
            //活动
            activity:{
                list:[
                /*{
                    activity_id:0,//活动id
                    icon:'http://app.52tt.com/assets/images/touch-icon.png',//活动图标
                    name:'皇室战争',//游戏名
                    title:'抢礼包',//活动名称
                    stage:1,//活动阶段（1 预热，2 进行，3 结束）
                    start_time:1476414499,//活动开始时间
                    end_time:1476414499,//活动结束时间
                    url:'',//活动链接
                }*/
                ],
                total:0,//活动总数
                server_time:0,//服务器时间
            },
            //banner图片
            banner_list:[
                {
                    picture:'assets/img/preload.gif',
                    url:'',
                }
            ],
            //热门游戏列表
            hot_game_list:[

            ],
            //公会游戏列表
            guild_game_list:[

            ],
            //TT礼包
            tt_gift: {
                //各类型礼包总数
                gift_total:[
                    {
                        type:0,// (1 激活码，2 礼包，3 代金券，4 充值卡，5 首充号，6 周边）
                        total:0,
                    }
                ],
                list:[
                    // {
                    //     gift_id: '1151515', //礼包id
                    //     gift_icon:'',//礼包图标
                    //     // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    //     gid: 299165, //相关游戏gid
                    //     game_name:'',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     gift_name: '王者荣耀礼包', //礼包名称
                    //     total: 1000, //礼包总数
                    //     remained: 200, //可领取数量
                    //     price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     tao:false,//是否淘号（true 淘号 false 不是淘号）
                    //     sa: 2000, //淘号次数,仅用于淘号
                    //     receive: true, //当前用户是否可领取
                    //     // period: '2016.9.30~2017.1.30', //有效期
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // },
                    // {
                    //     gift_id: '1151515', //礼包id
                    //     gift_icon:'',//礼包图标
                    //     // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    //     gid: 299165, //相关游戏gid
                    //     game_name:'',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     gift_name: '王者荣耀礼包', //礼包名称
                    //     total: 1000, //礼包总数
                    //     remained: 200, //可领取数量
                    //     price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     tao:false,//是否淘号（true 淘号 false 不是淘号）
                    //     sa: 2000, //淘号次数,仅用于淘号
                    //     receive: true, //当前用户是否可领取
                    //     // period: '2016.9.30~2017.1.30', //有效期
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // },
                    // {
                    //     gift_id: '1151515', //礼包id
                    //     gift_icon:'',//礼包图标
                    //     // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    //     gid: 299165, //相关游戏gid
                    //     game_name:'',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     gift_name: '王者荣耀礼包', //礼包名称
                    //     total: 1000, //礼包总数
                    //     remained: 200, //可领取数量
                    //     price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     tao:false,//是否淘号（true 淘号 false 不是淘号）
                    //     sa: 2000, //淘号次数,仅用于淘号
                    //     receive: true, //当前用户是否可领取
                    //     // period: '2016.9.30~2017.1.30', //有效期
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // }
                    ],
                total:0,  //总长度
                server_time:0,//服务器时间
            },
            //公会礼包
            guild_gift: {
                //各类型礼包总数
                gift_total:[
                    // {
                    //     type:0,// (1 激活码，2 礼包，3 代金券，4 充值卡，5 首充号，6 周边）
                    //     total:0,
                    // }
                ],
                list:[
                    // {
                    //     gift_id: '1151515', //礼包id
                    //     gift_icon:'',//礼包图标
                    //     // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    //     gid: 299165, //相关游戏gid
                    //     game_name:'',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     gift_name: '王者荣耀礼包', //礼包名称
                    //     total: 1000, //礼包总数
                    //     remained: 200, //可领取数量
                    //     price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     tao:false,//是否淘号（true 淘号 false 不是淘号）
                    //     sa: 2000, //淘号次数,仅用于淘号
                    //     receive: true, //当前用户是否可领取
                    //     // period: '2016.9.30~2017.1.30', //有效期
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // },
                    // {
                    //     gift_id: '1151515', //礼包id
                    //     gift_icon:'',//礼包图标
                    //     // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    //     gid: 299165, //相关游戏gid
                    //     game_name:'',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     gift_name: '王者荣耀礼包', //礼包名称
                    //     total: 1000, //礼包总数
                    //     remained: 200, //可领取数量
                    //     price : 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     tao:false,//是否淘号（true 淘号 false 不是淘号）
                    //     sa: 2000, //淘号次数,仅用于淘号
                    //     receive: true, //当前用户是否可领取
                    //     // period: '2016.9.30~2017.1.30', //有效期
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // },
                    // {
                    //     gift_id: '1151515', //礼包id
                    //     gift_icon:'',//礼包图标
                    //     // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    //     gid: 299165, //相关游戏gid
                    //     game_name:'',//游戏名
                    //     icon:'',//游戏图标
                    //     type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    //     gift_name: '王者荣耀礼包', //礼包名称
                    //     total: 1000, //礼包总数
                    //     remained: 200, //可领取数量
                    //     price: 200, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    //     have:true,//当前公会是否有此礼包
                    //     receive: true, //当前用户是否可领取
                    //     start_time:0,//有效期开始时间
                    //     end_time:0,//有效期结束时间
                    //     desc: '礼包内容',
                    //     usage_method : '使用方法',
                    // }
                    ],
                total:0,  //总长度
                server_time:0,//服务器时间
            },
            //礼包搜索列表
            search_list:{
                //TT礼包
                tt_gift:{
                    list:[
                        // {

                        // }
                    ],
                    total:0,
                    total_list:[
                    // {
                    //     keywords:'',
                    //     total:0
                    // }   
                    ],
                    server_time:0,//服务器时间
                },
                //公会礼包
                guild_gift:{
                    list:[
                        // {

                        // }
                    ],
                    total_list:[
                        // {
                        //     keywords:'',
                        //     total:0
                        // }   
                    ],
                    total:0,
                    server_time:0,//服务器时间
                }
            },
            //游戏查礼包 礼包列表
            gid_list:{
                //TT礼包
                tt_gift:{
                    //各游戏礼包总数
                    gift_total:[
                        // {
                        //     gid:0,//游戏id
                        //     total:0,
                        // }
                    ],
                    list:[
                        /*{

                        }*/
                    ],
                    total:0,
                    server_time:0,//服务器时间
                },
                //公会礼包
                guild_gift:{
                    //各游戏礼包总数
                    gift_total:[
                        // {
                        //     gid:0,//游戏id
                        //     total:0,
                        // }
                    ],
                    list:[
                        /*{

                        }*/
                    ],
                    total:0,
                    server_time:0,//服务器时间
                }
            },
            //公会礼包查公会列表
            gift_guild:
            {
                //各个礼包，有此礼包的公会数
                guild_total:[
                    {
                        gift_id:'',
                        total:0,
                    }
                ],
                list:[
                    {
                        gift_id:0,//礼包id(本地附加字段)
                        guild_id:0,//公会id
                        short_id:0,//公会短号id
                        icon:'',//公会图标'http://app.52tt.com/assets/images/touch-icon.png'
                        name:'',//公会名 '公会名公会名公会名公会名公会名公会名公会名公会名'
                        level:0,//公会等级
                        description:'',//公会描述 '公会描述公会描述公会描述'
                    }
                ],
                total:0,
                server_time:0,//服务器时间
            }, 
            //礼包中心礼包详情
            gift_detail:{
                kind:1,//当前显示礼包类型(1 TT礼包 ，2 公会礼包)        
                tt_gift_info:{
                    gift_id: 0, //礼包id
                    gift_icon:'',//礼包图标
                    // kind:0,//礼包分类（1 TT礼包，2 公会礼包）
                    gid: 0, //相关游戏gid
                    game_name:'',//游戏名
                    icon:'',//游戏图标
                    type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    gift_name: '', //礼包名称
                    total: 0, //礼包总数
                    remained: 0, //可领取数量
                    price : 0, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    tao:false,//是否淘号（true 淘号 false 不是淘号）
                    sa: 0, //淘号次数,仅用于淘号
                    // receive: true, //当前用户是否可领取
                    start_time:0,//有效期开始时间
                    end_time:0,//有效期结束时间
                    desc: '',
                    usage_method : '',
                    package_name:'',//游戏包名
                    exchange_type:255,//兑换类型（1 兑换码/单行，2 卡密/帐号密码/两行，255 没有/不显示）
                },
                guild_gift_info:{
                    gift_id: 0, //礼包id
                    gift_icon:'',//礼包图标
                    // kind:2,//礼包分类（1 TT礼包，2 公会礼包）
                    gid: 0, //相关游戏gid
                    game_name:'',//游戏名
                    icon:'',//游戏图标
                    type: 1, //礼包类型: 1为激活码，2为游戏礼包，3为代金券，4为充值卡，5为首充号，6为周边
                    gift_name: '', //礼包名称
                    total: 0, //礼包总数
                    remained: 0, //可领取数量
                    price: 0, //价格, 购买货币类型相关,比如购买货币类型是红钻,这里就是红钻价格
                    have:true,//当前公会是否有此礼包
                    // receive: true, //当前用户是否可领取                    
                    start_time:0,//有效期开始时间
                    end_time:0,//有效期结束时间
                    desc: '',
                    usage_method : '',
                    package_name:'',//游戏包名
                    exchange_type:255,//兑换类型（1 兑换码/单行，2 卡密/帐号密码/两行，255 没有/不显示）
                },
            },
            //最后一次领取记录
            //与当前详情页显示礼包相同就显示: kind,gift_id都相同
            //*如果显示领取记录，按钮状态显示为"已领取"
            fetch_info:{
                kind:1,//(1 TT礼包，2 公会礼包)
                gift_id:0,
                type:0,//(礼包类型)
                exchange_type:255,//1 兑换码/单行，2 卡密/帐号密码/两行，255 没有/不显示
                gift_list:[
                    //'zhangyugezhenshuai','zyg666666'
                ],//领取信息，字符串数组,为帐号时数组为帐号，密码 -- ['zhangyugezhenshuai','zyg666666']
            },     
        },
        /*****合并部分*****/
        //游戏专区
        game_area:{
            // cache:{
            //     key:'tt_game_zone'
            // },
            status:{
                current_game:{
                    gid:0
                },
                lottery_user_info: {
                    gameId: 10000,  //联运的游戏id
                    userId: 1365142  //联运的userId
                }
            },
            game:{
                gid:1,
                time_now:'',
                profile : { //游戏下载状态简述
                    guild_id:'',
                    id:'',
                    name: '',
                    icon: 'http://obsiq8rn7.bkt.clouddn.com/img_all_placeholder.png?imageView2/1/w/45/h/45/interlace/1',
                    status: '',
                    focus:'',
                    download_total: '', //安装次数总计
                    topic_total:0
                },
                circle: { //圈子
                    cid: 0,
                    total: 1000,
                    uri: ''
                },
                official_discussion_group:{
                    total:0,
                    url:''
                },
                summary: { //简介
                    description: '',
                    screenshot:{ //截图
                        list: [],
                        total: 0
                    },
                    video:{ //视频
                        list: [],
                        total:0
                    },
                    tag:{
                        list:[]
                    }
                },
                game_activity: {
                    list:[]
                },
                status:{
                    gid: 1,
                    follow: 0, //当前用户是否关注
                    is_order:0, //当前用户是否预约
                    installed: false,
                    downloading: false,
                    downloaded : false,
                    repeat_download: false,
                    packageUrl:'',
                    download_progress: 0,
                    focus: 500, //关注人数
                    download_total: 3000, //安装次数总计
                    h5_game: false, //h5游戏
                    status_order:0,//预约状态0未开始1已开始
                    order_times:0,//预约人数
                    activity_url:'',
                },
                game_notice:{ //公告信息开服
                    list:[]
                },
                game_open_service : {
                    list:[]
                },
                game_hotguild_list:{
                    list:[]
                },
                game_first_charge:{
                    // time_end: 0,
                    // product_id: 0,
                    // diamond: 0,
                    // charge: 0,
                },
                giftpkg_profile:{
                    // pic_url:'',//礼包图片地址
                    // has_fetched:0,//礼包领取状态，0未领取，非0已领取
                    // title:'新人礼包开抢！',
                    // desc:'数量有限果断来抢'
                },
                lotto_profile:{
                    // charge: 0,
                    // time: 0,
                },
                game_other_list:{
                    list:[]
                }
            },

        },
        //游戏专区列表存储
        game_area_list:[
        
        ],
        //游戏活动预约
        game_order:{
            list:[
                // {
                //     profile:{
                //         gid:0,
                //         game_name:'',
                //         description:'',
                //         tag:[],
                //         activity_url:''
                //         order_times:0,
                //         status_order:0,
                //         is_order:0 
                //     },
                //     summary:{
                //         game_screenshot:{
                //             list:[],
                //             total:0
                //         },
                //         game_video:{
                //             list:[],
                //             total:0
                //         },
                //         gift_list:{
                //             list:[],
                //             total:0
                //         }
                //     }
                // }
            ],
            total:0
        }
    }
}

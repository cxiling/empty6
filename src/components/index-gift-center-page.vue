<template>
   
    <div id="gift-center-content" class="index-gift-center-page page-content pull-to-refresh-content" 
     data-ptr-distance="80" :style="store_height()"> 
    <!-- <div id="gift-center-content" class="index-gift-center-page page-content">   -->   
       
        <!-- 下拉刷新占位 -->
        <div class="pull-to-refresh-layer">
            <div class="preloader"></div>
            <div class="pull-to-refresh-arrow"></div>
        </div>   
        <!-- 头部组件gift-center-head 页面mounted之后再挂载 -->  
        <gift-center-head></gift-center-head>

        <div class="tabs center-tabs">          
            <div id="tab1" class="tab active">
                <!-- 热门游戏 -->
                <gift-hot-game :kind="1"></gift-hot-game>            
                <!-- 激活码、礼包 -->
                <gift-center-content v-if="activityList.length > 0" :kind="1" :type="0"></gift-center-content>
                <gift-center-content v-if="hasGift(1,1)" :kind="1" :type="1"></gift-center-content>
                <gift-center-content v-if="hasGift(1,2)" :kind="1" :type="2"></gift-center-content>
                  
            </div>
            
            <div id="tab2" class="tab">
                <!-- 公会入驻游戏、热门游戏 -->
                <gift-guild-game></gift-guild-game>
                <gift-hot-game :kind="2"></gift-hot-game>
                <!-- 激活码、礼包 -->
                <gift-center-content v-if="hasGift(2,1)" :kind="2" :type="1"></gift-center-content>
                <gift-center-content v-if="hasGift(2,2)" :kind="2" :type="2"></gift-center-content>

            </div>
        </div>
               
    </div>
</template>

<script>
    import Vue from 'vue';
    import store from '../store/dispatch/gift-center';
    import { filterCenterGiftList , swiperNav } from "../api/computed.js";
    import { centerGiftListPosition, centerGuildGift, centerTTGift , centerInit, centerActivity } from '../store/actions/gift-center';
  
    import giftCenterHead from './gift-commponents/gift-center-head.vue'//礼包中心头部
    import giftHotGame from './gift-commponents/gift-hot-game.vue'//热门游戏
    import giftGuildGame from './gift-commponents/gift-guild-game.vue'//公会入驻游戏
    import giftCenterContent from './gift-commponents/gift-center-content.vue'//公会入驻游戏
    import gift_tab from './gift-commponents/gift-tab-package.vue'

    export default{
        data() {
            return {
                img_path:'assets/img/',
                ptrContent:'#gift-center-content',
                ttLastRequest:0,//TT礼包最后请求时间
                guildLastRequest:0,//公会礼包最后请求时间
                limitTime:20*1000,//刷新间隔
            }
        },
        components: {
           'gift-center-head':giftCenterHead,
           'gift-hot-game':giftHotGame,
           'gift-guild-game':giftGuildGame,
           'gift-center-content':giftCenterContent,
        },
        computed:{
            //当前TAB
            current_tab(){
                return store.state.data.gift_center.center_current.home.kind
            },
            //活动列表
            activityList(){
                return store.state.data.gift_center.activity.list
            },
        },
        methods:{
            //插件初始化
            init(){
                 //挂载组件
                //init接口数据返回后再显示头部组件
                // $$('#gift-center-head').show()
                //banner图轮播插件
                setTimeout(function(){
                    var giftCenterBannerSwiper = new Swiper('.banner-swiper-container', {
                        pagination: '.banner-swiper-pagination',
                        spaceBetween: 0,
                        paginationClickable: true,
                        centeredSlides: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false
                    });
                },100)
                //初始化滚动隐藏插件
                setTimeout(()=>{
                  let parameter = {
                      scrollId:'#gift-center-content',
                      parseId:'#gift-center-head',
                      contentId:'#banner-content',
                      toolbarId:'.buttons-row:nth-child(1)',
                      // scrollTab:'.center-tabs',
                      // navtollbar:'#store-sticky'
                  }
                  myApp.scrollTollbar(parameter,false).init();
                },300);
            },
            //不同kind，type是否有礼包
            hasGift(kind,type){
                let list
                if(kind == 1){
                    list = filterCenterGiftList(store.state.data.gift_center.tt_gift.list,'type', type )
                    return list.length > 0
                }
                else if(kind == 2){
                    list = filterCenterGiftList(store.state.data.gift_center.guild_gift.list,'type', type )
                    return list.length > 0
                }else{
                    console.log('kind 有误')
                }
            },
            // 延迟图片加载
            lazyImg(){                
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-gift-center-page');
                },200)
            },
            store_height(){
                const cheight = $$('body').height()+44
                return {'height':cheight+'px'}
            }
        },
        mounted(){
            //设置当前礼包列表位置
            centerGiftListPosition(store,{position:'home'})

            let vue_this = this;
            vue_this.guildSwiper = false;
            //加载头部到nav
            // const giftCenterHeadPage = new Vue(giftCenterHead)
            // giftCenterHeadPage.$mount('#index-gift-center-page .navbar')

            //请求首页数据
            let obj = {}
            // obj.uid = 2187044
            // obj.uid = 1985863
            // obj.uid = 2195884
            // obj.uid = 1973120
            // obj.uid = 1963840 //有公会贡献值
            // obj.uid = 2197532 //hotcoffee
            // obj.uid = 2676052 //wuyanzu 线上
            // obj.uid = 3522965 //chenmeiling
            // obj.uid = 5414063 //灰度，会员，公会有礼包
        
            // obj.uid = 500101
            // obj.guild_id = 100920

            centerInit(store,obj,()=>{
                vue_this.init()
            })
            centerActivity(store,{},vue_this.lazyImg)
            centerTTGift(store,{type:1},vue_this.lazyImg)
            centerTTGift(store,{type:2},vue_this.lazyImg)
            centerGuildGift(store,{type:1},vue_this.lazyImg)
            centerGuildGift(store,{type:2},vue_this.lazyImg)

            //设置最后请求时间
            let timeInit = new Date().getTime()
            vue_this.ttLastRequest = timeInit
            vue_this.guildLastRequest = timeInit

            //下拉刷新
            myApp.initPullToRefresh(vue_this.ptrContent)
            $$(vue_this.ptrContent).on('refresh',()=>{

                let timePull = new Date().getTime()//下拉刷新时间

                //刷新TT礼包
                if(vue_this.current_tab == 1){      
                    if(timePull - vue_this.ttLastRequest > vue_this.limitTime ){
                        console.log('TT礼包 actions')
                        // centerInit(store,{},vue_this.lazyImg,true)
                        centerActivity(store,{refresh:1},vue_this.lazyImg,true)
                        centerTTGift(store,{type:1,refresh:1},vue_this.lazyImg,true)
                        centerTTGift(store,{type:2,refresh:1},vue_this.lazyImg,true)
                        vue_this.ttLastRequest = timePull
                    }else{
                        console.log('TT礼包 刷新过于频繁！')
                    }
                }
                //刷新公会礼包
                else{
                    if(timePull - vue_this.guildLastRequest > vue_this.limitTime ){
                        console.log('公会礼包 actions')
                        centerGuildGift(store,{type:1,refresh:1},vue_this.lazyImg,true)
                        centerGuildGift(store,{type:2,refresh:1},vue_this.lazyImg,true)
                        vue_this.guildLastRequest = timePull                  
                    }else{
                        console.log('公会礼包 刷新过于频繁！')
                    }
                }

                setTimeout(()=>{
                    myApp.pullToRefreshDone(vue_this.ptrContent)
                },600)
            })
          
        },
    }
</script>
<style lang="less">
    @import url('../../assets/less/varsbank.less'); 
    #gift-center-content{
        margin-top: -44px;
        padding-top: 44px;
        background: @color-Cbg;
        // .navbar:after{
        //     display:none;
        // }
        .banner{
            position: relative;
            img{
                width:100%;
                vertical-align: center;
            }
            .search{
                position:absolute;
                z-index:10;
                top:12px;
                left:16px;
                right:16px;
                height:32px;
                border-radius: 4px;
                -webkit-boder-radius:4px;
                background-color: rgba(255,255,255,0.46);

                .flexbox();
                .justify-content(center);
                .align-items(center);

                .search-icon{
                    width:20px;
                    height:20px;
                    .icon-seaching(@color-Cb2);                          
                }
                .text{
                    height:18px;
                    line-height: 18px;
                    color:@color-Cb2;
                    font-size:@size-T2_2;
                }
            }

            //图片展播下方圆点
            .swiper-container-horizontal>.swiper-pagination {
              bottom: 10px;
            }
            .swiper-pagination-bullet {
              box-sizing: border-box;
              width: 6px;
              height: 6px;
              background-color:transparent;
              border: 1px solid #fff;
              margin: 0 2px;
            }
            .swiper-pagination-bullet.swiper-pagination-bullet-active{
              background-color:#fff;
            }
        }
    }
</style>
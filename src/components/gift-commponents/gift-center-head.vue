<template>  
   <div id="gift-center-head" class="gift-center-head">

       <div class="banner" id="banner-content">
           <div @click="toSearchPage" class="search">
               <div class="search-icon icon-seaching"></div>
               <div class="text">输入商品关键词搜索</div>
           </div>  
           <div class="swiper-container banner-swiper-container">
               <div class="swiper-wrapper">
                   <div v-for="banner in banner_list" class="swiper-slide">
                       <img @click="bannerLink(banner.url)" :src="banner.picture" alt="">
                   </div>
               </div>
               <div :class="{ 'one-picture': onePicture}" class="swiper-pagination banner-swiper-pagination"></div>
           </div>
       </div>
      <!--  <div class="buttons-row" id="button-container">
         <a @click="ttTab" href="#tab1" class="tab-link active button">TT礼包</a>
         <a @click="guildTab" href="#tab2" class="tab-link button">公会礼包</a>
       </div> -->
       <gift-tab-package :info="this"></gift-tab-package>
   </div>
</template>

<script>
    import Vue from 'vue'
    import store from '../../store/dispatch/gift-center';
    import { centerClearSearchList } from '../../store/actions/gift-center.js'
    import { jumpLink } from "../../api/computed.js"
    import gift_tab_package from './gift-tab-package.vue'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
         components: {
           'gift-tab-package':gift_tab_package
        },
        // props: ['user_info'],
        computed: {
          //活动banner列表
          banner_list(){
            return store.state.data.gift_center.banner_list
          },
          //只有一张banner图
          onePicture(){
            return this.banner_list.length <= 1
          },
            
        },
        methods: {
          //跳转banner链接
          bannerLink(url){
            console.log(url)
            if(url != ''){
              jumpLink(url)
            }
          },
          //跳转搜索页
          toSearchPage(){
            // console.log('to search page') 
            centerClearSearchList(store)//清空搜索结果
            myApp.redictNewPage('index-gift-search-page', false, false)

          },
          //TT礼包 热门游戏swiper
          initHotGameSwiper(){
              let vue_this = this
              if($$('.tt-swiper').length){
                setTimeout(function(){                 
                    vue_this.giftCenterHotGameSwiper = new Swiper('.tt-swiper', {
                        initialSlide:0,
                        slidesPerView: 'auto',
                        pagination: '.tt-dot',
                        spaceBetween: 0,
                        paginationClickable: true,
                        centeredSlides: true,
                        autoplayDisableOnInteraction: false
                    });
                    vue_this.hotGameSwiper = true  
                    // console.log('HotGameSwiper 初始化')                      
                },100)
              }
          },
          //公会礼包 公会游戏Swiper
          initGuildGameSwiper(){
            let vue_this = this;
            if($$('.guild-game-swiper-container').length){
              setTimeout(function(){
                  vue_this.giftCenterGuildGameSwiper = new Swiper('.guild-game-swiper-container', {
                      initialSlide:0,
                      slidesPerView: 'auto',
                      pagination: '.guild-game-swiper-pagination',
                      spaceBetween: 0,
                      paginationClickable: true,
                      centeredSlides: true,
                      autoplayDisableOnInteraction: false
                  });
                  vue_this.guildSwiper = true
                  // console.log('GuildGameSwiper 初始化')
              },100)
            }
          },
          //公会礼包 热门游戏swiper
          initHotGameSwiper2(){
            let vue_this = this;
            if($$('.guild-swiper').length){
              setTimeout(function(){ 
                  vue_this.giftCenterHotGameSwiper2 = new Swiper('.guild-swiper', {
                      initialSlide:0,
                      slidesPerView: 'auto',
                      pagination: '.guild-dot',
                      spaceBetween: 0,
                      paginationClickable: true,
                      centeredSlides: true,
                      autoplayDisableOnInteraction: false
                  });
                  vue_this.hotGameSwiper2 = true
                  // console.log('HotGameSwiper2 初始化')
              },100)
            }
          },
          //切换TT礼包TAB
          ttTab(){
            let vue_this = this;
            
            if(store.state.data.gift_center.center_current.home.kind == 1) return
            store.state.data.gift_center.center_current.home.kind = 1//设置 center_current参数

            //初始化TT TAB下的 热门游戏swiper
            if(vue_this.hotGameSwiper != true){
              vue_this.initHotGameSwiper()
            }else{
              vue_this.giftCenterHotGameSwiper.destroy(true,true)
              vue_this.initHotGameSwiper()
            }  

          },
          //切换公会礼包TAB
          guildTab(){
              let vue_this = this;

              if(store.state.data.gift_center.center_current.home.kind == 2) return     
              store.state.data.gift_center.center_current.home.kind = 2 //设置 center_current参数  
         
              //重置公会TAB下的 公会入驻游戏swiper
              if(vue_this.guildSwiper != true){      
                vue_this.initGuildGameSwiper()
              }else{         
                vue_this.giftCenterGuildGameSwiper.destroy(true,true)
                vue_this.initGuildGameSwiper()                
              }

              //重置公会TAB下的 热门游戏swiper
              if(vue_this.hotGameSwiper2 != true){
                vue_this.initHotGameSwiper2()
              }else{
                vue_this.giftCenterHotGameSwiper2.destroy(true,true)
                vue_this.initHotGameSwiper2()
              }           
          },
            
        },
        mounted () {
          let vue_this = this
          //初始化TT tab下热门游戏
          setTimeout(()=>{
            this.initHotGameSwiper()
          },700)

          //其他页面回退首页时，重置swiper
          myApp.onPageReinit('index-gift-center-page', ()=>{
            // console.log('重置')
            if(store.state.data.gift_center.center_current.home.kind == 1){
              if(vue_this.hotGameSwiper != true){
                vue_this.initHotGameSwiper()
              }else{
                vue_this.giftCenterHotGameSwiper.destroy(true,true)
                vue_this.initHotGameSwiper()
              }  
            }else{
              if(vue_this.guildSwiper != true){      
                vue_this.initGuildGameSwiper()
              }else{         
                vue_this.giftCenterGuildGameSwiper.destroy(true,true)
                vue_this.initGuildGameSwiper()                
              }
              if(vue_this.hotGameSwiper2 != true){
                vue_this.initHotGameSwiper2()
              }else{
                vue_this.giftCenterHotGameSwiper2.destroy(true,true)
                vue_this.initHotGameSwiper2()
              } 
            }
          })
          //挂载赋值
          const giftTab2 = new Vue(gift_tab_package)
          giftTab2.info = vue_this
          giftTab2.$mount('#index-gift-center-page .navbar')
        },
        updated(){
        }
    }
</script>
<style lang="less">
    @import url('../../../assets/less/varsbank.less'); 
    
    #gift-center-head{
      // display:none;
      width: 100%;
      height: auto;
      background: @color-Cbg;
      // padding-bottom:4px;

      &.navbar:after{
        display:none;
      }
      .banner{
          position: relative;
          .swiper-slide{
            vertical-align: center;
          }
          img{
              display:block;
              vertical-align: center;
              width:100%;
          }
          .search{
              position:absolute;
              z-index:99;
              top:12px;
              left:16px;
              right:16px;
              height:32px;
              // line-height: 32px;
              border-radius: 4px;
              -webkit-boder-radius:4px;
              background-color: rgba(255,255,255,0.7);

              .flexbox();
              .justify-content(center);
              .align-items(center);

              .search-icon{
                  width:20px;
                  height:20px;
                  .icon-seaching(@color-Cb2); 
                  vertical-align: center;                         
              }
              .text{
                  box-sizing: border-box;
                  padding-top:3px;
                  vertical-align: center;
                  height:32px;
                  padding-left:4px;
                  line-height: 30px;
                  color:@color-Cb2;
                  font-size:@size-T2_2;
              }
          }

          //图片展播下方圆点
          .swiper-container-horizontal>.swiper-pagination {
            bottom: 10px;
            &.one-picture{
              display:none;
            }
          }
          .swiper-pagination-bullet {
            box-sizing: border-box;
            width: 5px;
            height: 5px;
            background-color:rgba(255,255,255,.7);
            // background-color:transparent;
            // border: 1px solid #fff;
            margin: 0 2px;
          }
          .swiper-pagination-bullet.swiper-pagination-bullet-active{
            background-color:#fff;
          }
      }
      .buttons-row{
          background:@color-Cw;
          box-sizing: border-box;
          // height:44px;
          // .button{
          //     border:none;
          //     box-sizing: border-box;
          //     height:44px;
          //     line-height: 46px;
          //     vertical-align: center;
          //     color:@color-Cb2;
          //     font-size:@size-T2_2;
          //     font-weight: 800;
          //     &.active{
          //         color:@color-Cgreen;
          //         border-bottom: 2px solid @color-Cgreen;
          //     }
          //     &:first-child{
          //         border-radius: 0;    
          //     }
          //     &:last-child{
          //         border-radius: 0;    
          //     }
          // }
      }

    }   
</style>
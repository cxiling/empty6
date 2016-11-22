<template>
   <div class="sort-list" id="sort-list">
      <div class="sort-content" id="sort-content">
          <div class="swiper-container " id="sort-tab">
            <div class="swiper-wrapper " id="sort-wrapper">
                 <div href=""class="swiper-slide" 
                  v-for="(val,index) in gift_total"
                  @click="onTab(val,index)"
                  :class="onClass(val)"> 
                    {{ val.type | format-type(val.source) }} {{ val.total}}
                  </div>
            </div>
          </div>
          <div id="sort-search" @click="onSearch">
            <a href="#" class="link-search">
              <i class="icon icon-search"></i></a>
          </div>
      </div>
   </div>
</template>

<script>
    import store from '../../store/dispatch/guild-shop.js'
    import { currentGuildIndex , guildInit } from '../../store/actions/guild-shop.js'
    import { swiperNav , filterTabSelect, swiperTab,filterOrderSortList , stopDoubleClick } from '../../api/computed.js'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                obj:{
                  type:0, //初始化tab数据
                  source:0, //初始化tab数据
                },
                parameter_ui:{}
            }
        },
        // props:['gift_total'],
        computed: {
          //当前数据
          parameter(){
             return store.state.data.current.partermter
          },
          gift_total(){
              const gift_total = store.state.data.guild_shop.gift_total
              const gift_filter_total = filterOrderSortList(gift_total)
              return gift_filter_total
            },
        },
        methods: {
            imageLazy(){
               const vue_this = this
               setTimeout(function(){
                    myApp.initImagesLazyLoad(vue_this.parameter_ui.scrollId);
                },300)
            },
            onInit(){
                const vue_this = this
          
                vue_this.parameter_ui.container = '.hot-content-0'
                myApp.scrollTollbar(vue_this.parameter_ui,true).init() //初始化
                myApp.attachInfiniteScroll(vue_this.parameter_ui.scrollId); //挂载下拉
                myApp.initPullToRefresh(vue_this.parameter_ui.scrollId);

                 //监听页面无限滚动
                $$(vue_this.parameter_ui.scrollId).on('infinite',function(){  
                    const obj = vue_this.parameter ? vue_this.parameter : vue_this.obj
                    guildInit(store,obj,'',false,true)
                })

                //监听页面上拉刷新
                $$(vue_this.parameter_ui.scrollId).on('refresh',function(){ 
                    const obj = vue_this.parameter ? vue_this.parameter : vue_this.obj
                    guildInit(store,obj,'',true)
                    setTimeout(function(){
                      myApp.pullToRefreshDone(vue_this.parameter_ui.scrollId)
                    },300)
                })
                vue_this.swiper = swiperNav('#sort-list .swiper-container',4) //设置顶部tab滑块
            },
            onTab(val,index){
                //定义this
                const vue_this = this 
                //销毁
                // myApp.detachInfiniteScroll(vue_this.parameter_ui.scrollId) //销毁
                // myApp.destroyPullToRefresh(vue_this.parameter_ui.scrollId)//销毁
                //挂载
                vue_this.parameter_ui.container = '.hot-content-'+index
                myApp.scrollTollbar(vue_this.parameter_ui,true).load()
                //赋值请求切换tab类型商品列表
                vue_this.obj = { 
                  type:val.type,
                  source:val.source
                }
                console.log(vue_this.obj)
                //异步挂载
                const p1 = new Promise(function(resolve, reject) {
                     //发送参数请求赋值
                      currentGuildIndex(store,vue_this.obj,function(){
                        //滑动容器
                        $$.each(vue_this.swiper,function(index2, item) {
                          item.slideTo(index-1,500,false)
                        });
                        //滑动礼包的容器
                        swiperTab('#tabs-animated-wrap',index,'#tabs-animated-wrap',500)
                        //有总数或者为空则请求一次数据
                        guildInit(store,vue_this.obj)
                        resolve()
                      })
                })
                p1.then(function(){
                  //触发滚动
                  //$$(vue_this.parameter_ui.scrollId).trigger('scroll')
                  vue_this.imageLazy()
                })
            },
            onClass(val){
              const vue_this = this
              const type = vue_this.parameter.type
              const source = vue_this.parameter.source
              return val.type === type && val.source === source ? {'active':true} :{'':true}
            },
            onSearch(){
                if(!stopDoubleClick(this,300)) return false
                myApp.redictNewPage('index-store-search-page', false, false)
            }
        },
        mounted() {
          //初始化
          const vue_this = this
          vue_this.parameter_ui = {
              scrollTab:'#tabs-container',
              scrollId:'#store-content',
              parseId:'#store-head-info',
              contentId:'#hide-content',
              toolbarId:'#index-store-page > .sort-list',
              navtollbar:'#store-sticky',
              // childId:'#index-store-page>.sort-list'
          }
          setTimeout(function(){
            vue_this.onInit()
          },600)
         
        },
        updated(){
            const vue_this = this
            vue_this.imageLazy()
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #index-store-page > .sort-list{
      display: none;
    }
    #sort-list{
        #sort{
          &-content{
            .flexbox();
            .align-items(center);
            background: @color-Cw;
          }
          &-tab{
            flex:1;
            #sort-wrapper{
               .swiper-slide{
                  text-align: center;
                  height: 44px;
                  line-height: 46px;
                  font-size: @size-T2_2;
                  width: 25%;
                  display: block;
                  font-weight: 800;
                  background: @color-Cw;
                  &.active{
                    position: relative;
                    color:@d_green_main;
                    border-bottom: 2px solid @d_green_sub;
                  }
              }
            }
          }
          &-search{
            height: 44px;
            width: 46px;
            border-left: 1px solid @d_gray_6;
            background: @color-Cw;
            .link-search{
              display: block;
              margin-top:6px;
              margin-top: ~"-webkit-calc(100% - 40px)";
              margin-top: ~"calc(100% - 40px)";
              .icon-search{
                display: block;
                margin: 0 auto;
                .icon-seaching(@d_green_main);
                background-size: 20px 20px;
              }
            }
          }
        }
    }
</style>
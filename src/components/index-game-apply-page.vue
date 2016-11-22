<template>

    <div class="page-content infinite-scroll pull-to-refresh-content"  id="order-container" 
    data-distance="100" data-ptr-distance="55" :style="store_height()"> 
        <!-- 下拉刷新 -->
        <div class="pull-to-refresh-layer">
            <div class="preloader"></div>
            <div class="pull-to-refresh-arrow"></div>
        </div>
        <div class="order-items" v-for="val in order.list"  v-if="order.list.length">
           <apply-head :order="val"></apply-head>
           <apply-shot :zone="val"></apply-shot>
           <apply-benefits :order="val"></apply-benefits>
           <area-download :order="val"></area-download>
        </div>
        <no-data :msg="'暂无预约活动'" v-if="!order.list.length"></no-data>
    </div>
    
</template>


<script>
    import  Vue from 'vue'
    import store from '../store/dispatch/game-order'
    import { inintGameOrder } from '../store/actions/game-order'
    import { filterCenterGiftList } from '../api/computed.js';
    import applyHead from './game-apply-commponnets/game-head.vue'
    import applyShot from './game-commponnets/shot_list.vue'
    import applyBenefits from './game-apply-commponnets/game-benefits.vue'
    import areaDownload from './common-commponents/apply-game-button.vue' //关注下载组件
    import no_data  from "./common-commponents/no-data.vue"; // 暂无数据    
    export default {
        data() {
            return {
                container:'#order-container'
            }
        },
        computed: {
           order(){
             return store.state.order.game_order
           }
        },
        methods: {
          store_height(){
              const cheight = $$('body').height()+44
              return {'height':cheight+'px'}
          },
          imageLazy(){
             setTimeout(function(){
                myApp.initImagesLazyLoad('#index-game-apply-page');
            },500)
          }
        },
        components: {
          'apply-head':applyHead,
          'apply-shot':applyShot,
          'apply-benefits':applyBenefits,
          'area-download':areaDownload,
          'no-data':no_data
        },
        mounted(){
            const vue_this = this
            const container = vue_this.container
            const reflash = vue_this.container

            inintGameOrder(store,{},function(){
              vue_this.imageLazy()
            })

            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(container);
            myApp.initPullToRefresh(container);
            $$(container).on('infinite', function () {
                inintGameOrder(store,{},function(){
                    vue_this.imageLazy(container)
                })
                console.log('loading');  
            })
            //监听页面上拉刷新
            $$(container).on('refresh',function(){
                inintGameOrder(store,{},'',true)
                setTimeout(function(){
                    myApp.pullToRefreshDone(container);
                },500)
            })
        }
    }
</script>
<style lang="less" scoped>
  @import url('../../assets/less/varsbank.less');
  #index-game-apply{

  }
  #order-container{
    padding-top: 44px;
    margin-top: -44px;
    .order-items{
      background: @color-Cw;
      margin-bottom: 12px;
      padding-bottom: 10px;
    }
  }
</style>

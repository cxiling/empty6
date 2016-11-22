<template>
   <div class="store-content page-content infinite-scroll pull-to-refresh-content" id="store-content-list" 
   data-distance="100" data-ptr-distance="55" :style="store_height()">
       <div class="refresh-layer-content "  id="store-refresh-list">
             <!-- 下拉刷新 -->
            <div class="pull-to-refresh-layer">
                <div class="preloader"></div>
                <div class="pull-to-refresh-arrow"></div>
            </div>
            <store-zone-list :guild_list="gid_list" :user_info="user_info" v-if="gid_list.length"></store-zone-list>
            <no-data :msg="'暂无商品'" v-else></no-data>
        </div>
   </div>
</template>

<script>
    import store from '../store/dispatch/guild-shop';
    import store_zone_list  from "./store-commponents/store-zone-list.vue"; //商店热门信息
    import no_data  from "./common-commponents/no-data.vue"; // 暂无数据
    import { currentGuildGidList } from '../store/actions/guild-shop';
    import { filterCenterGiftList ,rejectFilterGift } from '../api/computed.js'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                container:'#store-content-list',
                reflash:'#store-refresh-list'
            }
        },
        computed: {
            gid(){
                return store.state.data.current.gid
            },
            gid_list() {
                const gid = this.gid
                const gid_filter_list = filterCenterGiftList(store.state.data.guild_shop.gid_list.list,'gid',gid)
                const rejectGuildList = rejectFilterGift(gid_filter_list,{status:3})
                return rejectGuildList
            },
            user_info(){
                return store.state.data.user
            }
        },
        methods: {
            imageLazy(){
               const vue_this = this
               setTimeout(function(){
                    myApp.initImagesLazyLoad(vue_this.container);
                },300)
            },
            store_height(){
                const cheight = $$('body').height()+44
                return {'height':cheight+'px'}
            }
        },
        components: {
            'store-zone-list': store_zone_list,
            'no-data':no_data
        },
        mounted () {
            let vue_this = this
            let obj = {
                gid:this.gid
            }
            //发送该游戏下请求
            currentGuildGidList(store,obj)
            let loading = false;
            //添加无限滚动事件监听器
            myApp.attachInfiniteScroll(vue_this.container)
            // 注册'infinite'事件处理函数
            $$(vue_this.container).on('infinite', function () {
                  // 如果正在加载，则退出
                  if (loading) return;
                  // 设置flag
                  loading = true;
                  currentGuildGidList(store,obj,function(){
                    loading = false;
                    vue_this.imageLazy()
                  })
                  console.log('loading')
            })
            //加载无限滚动的初始化 
            myApp.initPullToRefresh(vue_this.container);
            //监听页面上拉刷新
            $$(vue_this.container).on('refresh',function(){
                currentGuildGidList(store,obj,function(){},true)
                setTimeout(function(){
                    myApp.pullToRefreshDone(vue_this.container);
                },500)
            })
            vue_this.imageLazy()
        },
        updated(){
            const vue_this = this
            vue_this.imageLazy()
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../assets/less/varsbank.less');   
    #store-content-list{
        margin-top: -44px;
        padding-top: 44px;
    }
</style>
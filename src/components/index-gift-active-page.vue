<template>
    <div class="page-content index-gift-active-page infinite-scroll" data-distance="50" >

        <template v-if="activity_list.length !== 0">
            <div class="list-block media-list common-list">
                <!-- 活动列表 -->                
                <ul class="item-content">
                    <li v-for="item in activity_list">
                        <!-- activity:单个活动信息 -->
                        <gift-active-package :activity="item"></gift-active-package>
                    </li>
                </ul>
            </div>
        </template>

        <template v-else>
            暂无相关活动
        </template>

    </div>
</template>

<script>
    import store from '../store/dispatch/gift-center';
    import { centerActivity } from '../store/actions/gift-center.js'
    import gift_active_package  from "./gift-commponents/gift-active-package.vue"; // 活动
    // import { }  from "../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
            }
        },
        computed: {
            activity_list() {
                return store.state.data.gift_center.activity.list
            }
        },
        methods: {
            
        },
        components: {
            "gift-active-package" : gift_active_package
        },
        mounted () {
            let vue_this = this
            let loadFlag = false
            let queryStr = '#index-gift-active-page .infinite-scroll'
            let lazyImg = ()=>{ // 延迟图片加载
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-gift-active-page')
                },300)
            }

            lazyImg()

            //加载无限滚动的初始化 
            myApp.attachInfiniteScroll(queryStr);
            $$(queryStr).on('infinite', function () {
                // 加载中，避免重复触发
                if(loadFlag) return;
                loadFlag = true

                centerActivity(store,null,function(){
                    lazyImg()

                    loadFlag = false
                },'bottom')

                console.log('loading') 
            })

        },

        updated(){
            let vue_this = this
        }
    }
</script>
<style lang="less" scoped>

.index-gift-active-page{
    /*.list-block{
        margin: 0;
    }*/
}
    
</style>
<template>
    <div class="gift-center-content">
        <!-- 礼包中心内容(激活码、礼包) -->
        <!-- 头部 -->
        <div v-if="type == 0" class="title-wrapper activity">
            <!-- <div class="bar"></div>
            <div class="icon"><img src="assets/img/ic_giftEvent.png" alt=""></div>
            <div>活动礼包</div>
            <div class="bar"></div>   -->
            <img src="assets/img/ic_giftEvent.png" alt="">   
        </div>
        <div v-if="type == 1" class="title-wrapper activation">
            <!-- <div class="bar"></div>
            <div class="icon"><img src="assets/img/ic_keygent.png" alt=""></div>
            <div>激活码</div>
            <div class="bar"></div> -->
            <img src="assets/img/ic_keygent.png" alt="">     
        </div>
        <div v-if="type == 2" class="title-wrapper gift">
            <!-- <div class="bar"></div>
            <div class="icon"><img src="assets/img/ic_specialGift.png" alt=""></div>
            <div>独家礼包</div>
            <div class="bar"></div> -->
            <img src="assets/img/ic_specialGift.png" alt="">     
        </div>


        <!-- 活动列表 -->
        <template v-if="type == 0 && activity_list.length > 0">
            <div class="list-block media-list common-list">              
                <ul class="item-content">
                    <template v-for="item in activity_list">
                        <gift-active-package :activity="item"></gift-active-package>
                    </template>
                </ul>
            </div>
        </template>
        <!-- 激活码、礼包列表 -->
        <template v-else>
            <gift-list :kind="kind" :list="gift_list" :user="user"></gift-list>
        </template>


        <template v-if=" type == 0 ">
            <!-- 查看更多活动(3个以上显示) -->
            <div @click="toActivityListPage" v-if="activity_list.length >= 3" class="more-gift">
                <div class="text">全部活动</div>
                <div class="icon-wrap"><div class="icon-arrow"></div></div>
            </div>
        </template>
        <template v-else>
            <!-- 查看更多激活码、礼包(3个以上显示) -->
            <div @click="toHomeGiftList(kind,type)" v-if="type == 1 && gift_list.length >= 3" class="more-gift">
                <div class="text">全部激活码</div>
                <div class="icon-wrap"><div class="icon-arrow"></div></div>
            </div>
            <div @click="toHomeGiftList(kind,type)" v-if="type == 2 && gift_list.length >= 20" class="more-gift">
                <div class="text">全部礼包</div>
                <div class="icon-wrap"><div class="icon-arrow"></div></div>
            </div>
        </template>

    </div>
</template>

<script>
    import store from '../../store/dispatch/gift-center';
    import { centerGiftList, centerTTGift } from '../../store/actions/gift-center.js'
    import gift_list  from "./gift-list.vue"; // 礼包列表
    import gift_active_package  from "./gift-active-package.vue"; // 活动
    import { filterGiftListSlice, filterCenterGiftList, showToast , jumpLink }  from "../../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
            }
        },
        props: ['kind','type'],
        components: {
            "gift-list" : gift_list,
            "gift-active-package" : gift_active_package,
        },
        computed: {
            //活动列表(返回3条)
            activity_list(){
                return filterGiftListSlice(store.state.data.gift_center.activity.list,3)
            },
            //返回3条礼包数据列表(kind type过滤)
            gift_list() {
                let vue_this = this;

                if( vue_this.kind == 1 ){//过滤kind
                    let tt_gift_list = store.state.data.gift_center.tt_gift.list
                    let list = filterCenterGiftList(tt_gift_list, 'type', vue_this.type )//过滤类型
                    if(vue_this.type == 1){
                        return filterGiftListSlice(list,3)//激活码返回3条（长度大于3时）
                    }else{
                        return filterGiftListSlice(list,20)//独家礼包返回20条
                    }            
                }
                else if( vue_this.kind == 2){      
                    let guild_gift_list = store.state.data.gift_center.guild_gift.list
                    let list = filterCenterGiftList(guild_gift_list, 'type', vue_this.type )
                    if(vue_this.type == 1){
                        return filterGiftListSlice(list,3)//激活码返回3条（长度大于3时）
                    }
                    else{
                        return filterGiftListSlice(list,20)//独家礼包返回20条
                    } 
                }
                else{
                    console.log('kind 参数错误')
                }

            },
            //用户信息
            user() {
                return store.state.data.user
            }
            
        },
        methods: {
            lazyImg(){                
                // 延迟图片加载
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-gift-tt-page');
                },310)
            },
            //跳转更多活动页面
            toActivityListPage(){
                console.log('跳转活动列表页')
                myApp.redictNewPage('index-gift-active-page', false, false)

            },
            //跳转更多礼包页面
            toHomeGiftList(kind,type){        
                // console.log('跳转kind '+ kind + ' type '+ type + ' 所有列表')
                let vue_this = this
                
                let obj = {}
                obj.kind = kind
                obj.type = type 
                //设置当前所有列表 gift_list 的 kind type
                centerGiftList(store,obj,function(){
                    //跳转 home更多列表页
                    myApp.redictNewPage('index-gift-tt-page', false, false) 
                    vue_this.lazyImg()
                })
            },
        },
        mounted () {

        }
    }
</script>
<style lang="less">
    @import url('../../../assets/less/varsbank.less'); 

    .gift-center-content{
        margin-bottom:4px;
        background:@color-Cw;

        //头部标题
        .title-wrapper{
            // padding-top: 5px;
            width:100%;
            height:40px;
            color:#ff6084;
            font-size:@size-T2_2;
            .flexbox();
            .justify-content(center);
            .align-items(center);

            img{
                height:20px;
            }
            .bar{
                height:0px;
                width:20px;
                margin:0 4px;
                border-bottom:1px solid #ff6084;
            }
            .icon{
                width:20px;
                height:20px;
                margin-right: 2px;
                img{
                    width:100%;
                }
            }
            &.activity{
                color:#ffbc00;
                .bar{
                    border-bottom:1px solid #ffbc00;
                }
            }
            &.activation{
                color:#1e92f6;
                .bar{
                    border-bottom:1px solid #1e92f6;
                }
            }
            &.gift{
                color:#ba80f3;
                .bar{
                    border-bottom:1px solid #ba80f3;
                }
            }
        }

        //更多礼包
        .more-gift{
            height:44px;   
            .flexbox();
            .justify-content(center);
            .align-items(center);
            .text{
                height:13px;
                line-height: 13px;
                font-size:@size-T2_2;
                color:@color-Cgreen;
            }
            .icon-wrap{
                box-sizing: border-box;
                height:44px;
                padding:18px 0;
                //箭头
                .icon-arrow{
                    .icon-forward(@color-Cgreen); 
                    // .flex-shrink(0);
                    margin-left:4px;
                    width:4px; 
                    height:7px;
                }
            }

            // &.active-state{
            //     background-color:#F4F4F4;
            // }
        }

        .list-block.media-list ul{
            border-top: none;
            border-bottom: none;
        }
    }
    
</style>
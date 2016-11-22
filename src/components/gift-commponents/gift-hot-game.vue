<template>
   
    <div v-if="iconHotList.length > 0" class="gift-hot-game">
        <!-- gift-hot-game -->
        <div class="title-wrapper">
            <!-- <div class="bar"></div>
            <div class="icon"><img src="assets/img/ic_hotGame.png" alt=""></div>
            <div>热门游戏</div>
            <div class="bar"></div> -->
            <img src="assets/img/ic_hotGame.png" alt="">
        </div>

        <div class="game-icons">
            <div :class="{ 'tt-swiper': isTTTab, 'guild-swiper': isGuildTab }" class="swiper-container hot-game-swiper-container">
                <div class="swiper-wrapper">
                    <div v-for="group in iconHotList" class="icon-row swiper-slide">
                        <div v-for="game in group"  @click="toGidGiftList(game.gid,game.name)" class="icon">
                            <img :src="imageViewFilter(game.icon)" alt="">
                            <div class="name">{{game.name}}</div>
                        </div>
                    </div>
                </div>
                <div :class="{ 'one-group': oneGroup,'tt-dot': isTTTab, 'guild-dot': isGuildTab }" class="hot-game-swiper-pagination swiper-pagination "></div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';
    import store from '../../store/dispatch/gift-center';
    import { centerGiftGidList } from '../../store/actions/gift-center';

    import { imageView, filterDifferenceIconList, filterToGroupList, filterCenterGiftList , swiperNav , linkToZone } from "../../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
                tab_kind:store.state.data.gift_center.center_current.home.kind,
            }
        },
        props: ['kind'],
        computed: {
            isTTTab(){
                return this.kind == 1
            },
            isGuildTab(){
                return this.kind == 2
            },
            //热门游戏(分组)
            iconHotList(){
                if(this.kind == 1){        
                    let hot_game_list = store.state.data.gift_center.hot_game_list.concat()
                    return filterToGroupList(hot_game_list)
                }
                else if(this.kind == 2){
                    let hot_game_list = store.state.data.gift_center.hot_game_list.concat()
                    let guild_game_list = store.state.data.gift_center.guild_game_list.concat()
                    let diff_list = filterDifferenceIconList(hot_game_list,guild_game_list)
                    return filterToGroupList(diff_list)
                }
            },
            //只有一组（不显示圆点）
            oneGroup(){
                return this.iconHotList.length == 1
            },
        },
        methods:{
            imageViewFilter(val){
                return imageView(val,128,'auto')
            },
            lazyImg(){                
                // 延迟图片加载
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-gift-game-page');
                },200)
            },
            //跳转游戏查礼包列表页
            toGidGiftList(gid,game_name){
                // console.log('gid:' + gid + '游戏查礼包页,热门游戏')

                let obj = {}
                obj.gid = gid
                obj.game_name = game_name
                obj.kind = this.kind
                //设置gid_list current参数并跳转
                centerGiftGidList(store,obj,function(){
                    myApp.redictNewPage('index-gift-game-page', false, false)
                })
            },
            zoneList(gid){
                if(gid) linkToZone(gid)
            }
        },
        mounted () {
        },
        updated(){

        },
    }
</script>
<style lang="less">
    @import url('../../../assets/less/varsbank.less'); 

    .gift-hot-game{
        // margin-bottom:4px;
        margin:4px 0;
        background:@color-Cw;

        .title-wrapper{
            width:100%;
            height:40px;
            color:#ff6084;
            font-size:@size-T2_2;
            .flexbox();
            .justify-content(center);
            .align-items(center);

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
                    display:block;
                    width:100%;
                }
            }
            img{
                display:block;
                height:20px;
            }
        }

        .game-icons{
            margin-top:13px;
            .swiper-wrapper{
                padding-bottom: 30px;
            }

            .icon-row{
                padding:0 5%;
                box-sizing: border-box;
                .flexbox();
                // .justify-content(space-between);
                .justify-content(flex-start);
                .align-items(center);
                   
                .icon{
                    // width:64px;
                    width:25%;
                    text-align: center;
                    overflow:hidden;
                    // .flexbox();
                    // -webkit-flex-direction:column;
                    // flex-direction:column;
                    // .justify-content(center);
                    // .align-items(center);
                    
                    img{
                        display:block;
                        margin:0 auto;
                        width:64px;
                        border-radius: 4px;
                        -webkit-border-radius: 4px;
                    }
                    .name{
                        margin-top: 5px;
                        font-size:@size-T2;
                        color:@color-Cb2;
                        white-space:nowrap;
                        overflow:hidden;
                    }
                }
                
            }

            //swiper下方圆点
            .swiper-container-horizontal>.swiper-pagination {
              bottom: 10px;
              &.one-group{
                display:none;
              }
            }
            .swiper-pagination-bullet {
              box-sizing: border-box;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              -webkit-border-radius: 50%;
              // background-color:transparent;
              background-color:rgba(38,58,67,1);
              border: 1px solid #fff;
              margin: 0 2px;
            }
            .swiper-pagination-bullet.swiper-pagination-bullet-active{
              // background-color:#fff;
              background-color:@color-Cgreyl;
            }
        }
    }
</style>
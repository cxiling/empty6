<template>
   <div class="recommend-container" id="game-prize-warp" v-if="gift_list.list.length">
        <h2>预约福利</h2>
        <div class="swiper-container game-swiper-container" id="game-prize-container">
            <div class="swiper-wrapper">
                <div v-for="val in gift_list.list" class="swiper-slide">
                    <div class="game-content">
                        <div class="game-media">
                            <img :data-src="imageView(val.icon)" class="lazy lazy-fadeIn">
                        </div>
                        <div class="game-desc">
                            <p class="name">{{val.gift_name}}</p>
                            <p class="number">x{{val.number}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import store from '../../store/dispatch/game-order'
    import { jumpLink , filterImageWidth , swiperNav, imageView , linkToZone } from '../../api/computed.js'
    export default{
        props:['order'],
        computed:{
          gift_list(){
            return this.order.game.summary.gift_list
          }
        },
        methods: {
            appNav(uri){
                jumpLink(uri)
            },
            imageView(val){
                return imageView(val,80,80)
            },
            zoneList(gid){
                if(gid) linkToZone(gid)
            }
        },
        mounted(){
            setTimeout(function(){
             swiperNav('#game-prize-container','auto')
            },600)
        }
    }
</script>
<style lang="less" scoped>
   @import url('../../../assets/less/varsbank.less');
   #game-prize-warp{
    background: @color-Cw;
      h2{
        margin:0;
        font-size: @size-T3;
        color: @color-Cgreyl;
        font-style: normal;
        font-weight: normal;
        margin-left: 16px;
      }
      #game-prize-container{
        padding:10px 16pt*@pt;
        .swiper-wrapper{
            .swiper-slide{
                width: auto;
                .game-content{
                    margin-right: 10px;
                    padding-right: 10px;
                    border-right: 1px solid @color-Cgrey;
                    .flexbox();
                    .align-items(center);
                    .game-media{
                        img{
                            width: 40px;
                            height: 40px;
                            display: block;
                            margin: 0 auto;
                        }
                        margin-right: 8px;
                    }
                    .game-desc{
                        .name{
                            font-size: @size-T2;
                        }
                        .number{
                            font-size: @size-T2;
                            color:@color-Cgreyl;
                        }
                    }
                }
                &:last-child{
                    .game-content{
                        border:none;
                    }
                }
            }
        }
      }
   }
</style>
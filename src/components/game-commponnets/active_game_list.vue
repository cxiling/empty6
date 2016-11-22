<template>
   <div class="recommend-container" id="recommend-warp" v-if="game_other_list.list.length">
        <h2>玩{{name}}的人也在玩</h2>
        <div class="swiper-container recommend-swiper-container" id="recommend-container">
            <div class="swiper-wrapper">
                <div v-for="val in game_other_list.list" class="swiper-slide">
                    <div  @click="zoneList(val.gid)" class="game-item">
                        <img :src="imageView(val.icon_url)" alt="">
                        <div class="name">{{val.name}}</div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import store from '../../store/dispatch/game-area'
    import { jumpLink , filterImageWidth , swiperNav, imageView , linkToZone } from '../../api/computed.js'
    export default{
        props:['zone'],
        computed:{
            game_other_list(){
                return this.zone.game.game_other_list
            },
            name(){
                return this.zone.game.profile.name;
            }
        },
        methods: {
            appNav(uri){
                jumpLink(uri)
            },
            imageView(val){
                return imageView(val,72,72)
            },
            zoneList(gid){
                if(gid) linkToZone(gid)
            }
        },
        mounted(){
            setTimeout(function(){
             swiperNav('#recommend-container','auto')
            },600)
        }
    }
</script>
<style lang="less" scoped>
   @import url('../../../assets/less/varsbank.less');
   #recommend-warp{
    background: @color-Cw;
      h2{
        text-align:center;
        height: 44px;
        line-height:44px;
        margin:0;
        font-size: @size-T4;
        color: @color-Cfg;
      }
      #recommend-container{
        padding:16pt*@pt;
        border-top:1px solid #e8ecee; 
        .swiper-wrapper{
            .swiper-slide{
                width: 25%;
                .game-item{
                    text-align: center;
                    img{
                        width: 56px;
                        height: 56px;
                        display: block;
                        margin: 0 auto;
                    }
                    .name{
                        margin-top: 3px;
                        font-size: @size-T2;
                    }
                }
            }
        }
      }
   }
</style>
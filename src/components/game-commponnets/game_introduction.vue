<template>
    <div class="intro-container" v-if="summary">
        <div class="intro-content">

            <div class="head-item">
                <h2>游戏简介</h2>
            </div>
            <div class="game-item">
                <!-- 视频照片截图 -->
                <shot-list :zone="zone"></shot-list>
                <div class="game-content">
                    <!-- 标签 -->
                    <div class="tag-item" v-if="tag.length">
                       <ul>
                            <template v-for="(val,index) in tag">
                                <li class="p-list">
                                    <a href="" class="link-tag" :style="{ 'background': val.color }"><span>{{val.title}}</span></a>
                                </li>
                            </template>
                       </ul>
                    </div>
                    <!-- 游戏描述 -->
                    <div class="desc-item" v-if="dection">
                        <section>
                            <p v-show="decs_shot === 2">{{dection}}</p>
                            <p v-show="decs_shot === 1">{{dectionTxt}}</p>  
                            <a href="#" class="desc-push" @click="decShot(2)" v-show="decs_shot === 1">展开</a>
                            <a href="#" class="desc-pull" @click="decShot(1)" v-show="decs_shot === 2">收起</a>
                       </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import store from '../../store/dispatch/game-area'
    import { swiperNav , photoViewList , chartStr } from '../../api/computed.js'
    import shotGlist from "./shot_list.vue";
    export default {
        name: 'game_introduction',
        props:['zone'],
        data(){
            return {
                decs_shot: 1
            }
        },
        computed: {
            summary(){
                const summary = this.zone.game.summary
                if(_.isEmpty(summary)){
                    return null
                }else{
                    return this.zone.game.summary
                }
            },
            tag(){
                return this.summary.tag.list
            },
            dection(){
                let dectionTxt = this.summary.description
                return dectionTxt
            },
            dectionTxt(){
                let dectionTxt = chartStr(this.summary.description,150) //控制显示字数 汉字占位2个字节
                return dectionTxt
            }
        },
        components: {
          'shot-list':shotGlist
        },
        methods: {
            decShot(val){
                this.decs_shot = val?val:1
            }
        },
        compiled(){

        }
    }
</script> 
<style lang="less" scoped>
  @import url('../../../assets/less/varsbank.less');
    .intro-container{
        background: @color-Cw;
        margin-bottom: 8pt*@pt;
        .head-item{
            h2{
                text-align: center;
                margin: 0;
                padding: 0;
                font-size: @size-T4;
                color: @color-Cfg;
                line-height: 44px;
                height: 44px;
            }
        }
        .game-item{
            .game-content{
                padding: 0 16pt*@pt;
                .tag-item{
                    margin-bottom: 12pt*@pt;
                    ul{
                        .flexbox();
                        li{
                            .link-tag{
                                padding: 2pt*@pt 7pt*@pt;
                                margin: 0 2pt*@pt;
                                border-radius: 2pt*@pt;
                                color: @color-Cw;
                                background: @color-Cinew;
                            }
                        }
                    }
                }
                .desc-item{
                    padding-bottom: 12px;
                    section{
                        position: relative;
                        p{
                            display: inline;
                            color: @color-Csub;
                            font-size: 12pt*@pt;
                        }
                        a.desc-pull,a.desc-push{
                            display: inline;
                            font-size: 12pt*@pt;
                            color: @color-Cinew;
                            padding: 8px 8px 8px 0;
                        }
                    }
                }
            }
        }
        
    }
</style>
<template>
    <div id="activity-list" v-if="activityList.length">
        <h2>游戏活动</h2>
        <ul>
            <li v-for="item in activityList.slice(0,3)" class="item-link">
                <a @click="toTopic(item.detail_href)"  class="item-href">
                    <p class="item-content">{{item.activity_title}}</p>
                    <div class="icon-r"></div>
                </a>
            </li>
            <li class="more" v-if="activityList.length >= 3" >
                <a href="" @click="toCircle">全部活动</a>
            </li>
        </ul>
    </div>
</template>


<script>
    import store from '../../store/dispatch/game-area'
    import { jumpLink } from '../../api/computed.js'
    export default {
        name: 'activity_list',
        props:['zone'],
        computed: {
            activityList(){
                return this.zone.game.game_activity.list
            }
        },
        components: {
          
        },
        methods: {
          redirect(pageName){
            myApp.redictNewPage(pageName, true, true)
          },
          //跳转游戏圈
          toCircle(){
              let uri = this.zone.game.circle.uri;
              jumpLink(uri);
          },
          toTopic(val){
              jumpLink(val);
          }
        }
    }
</script>
<style lang="less" scoped>
   @import url('../../../assets/less/varsbank.less');
    #activity-list{
        background: @color-Cw;
        margin-bottom: 8pt*@pt;
        h2{
            text-align:center;
            margin: 0;
            height: 44px;
            line-height:44px;
            font-size: @size-T5;
        }
        ul{
            li{
                height:44pt*@pt;
                border-top:1px solid #e8ecee;
                .item-href{
                    padding:0 16pt*@pt;
                    align-items:center;
                    display: flex; justify-content:space-between;
                    height:44pt*@pt;
                    .item-content{ 
                        color:#263A43;
                        font-size:14pt*@pt;
                    }
                    .icon-r{ .icon-forward(#dee2e4); width:8pt*@pt; height:14pt*@pt;}
                     &.active-state{
                        background: @color-Cbg2;
                    } 
                }
                &.more{
                    background:@color-Cmore;
                    a{
                        display: block;
                        text-align: center;
                        color:#1ed282;
                        font-size:13pt*@pt;
                        height:44pt*@pt;
                        line-height: 44pt*@pt;
                        &.active-state{
                            background: @color-Cbg2;
                        }
                    }
                }
            }
        }
    }  
</style>
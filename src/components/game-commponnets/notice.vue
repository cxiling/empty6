<template>
    <a @click="toListPage" id="notice" class="notice item-link" v-if="notice_list.length > 0">
        <div class="notice-icon">
            <img :src="img_path + 'notice.png'" alt="">
        </div>
        <div class="notice-wrapper">
            <div class="scroll-container">
                <ul class="scroll-list">                   
                    <li v-for="notice in notice_list" class="child-item">
                        <div>{{notice.title}}</div>
                    </li>
                    <li v-if="notice_list.length > 1" class="child-item">
                        <div>{{notice_list[0].title}}</div>
                    </li>
                </ul>
            </div>
            <div class="icon-arrow"></div>
        </div>
    </a>
</template>

<script>
    import store from '../../store/dispatch/game-area'
    import {  stopDoubleClick } from '../../api/computed.js'
    export default {
        name: 'notice',
        data(){
            return {
                img_path:'assets/img/',        
            }
        },
        props:['zone'],
        computed: {
            notice_list(){           
                return this.zone.game.game_notice.list;
            },

        },
        components: {
          
        },
        methods: {
            toListPage(){
                if(stopDoubleClick(this, 500)){
                    myApp.redictNewPage('index-game-notice-page', false, false);
                }
            },
          
        },
        filters:{

        },
        events: {
          
        },
        updated(){
            var vue_this = this;
            var obj = {
                parseId:'.scroll-container',
                scrollId:'.scroll-list',
                childId:'.child-item',
                path:vue_this.notice_list,
                time:500,
                num:1
            }
            if(this.notice_list.length > 1){
                myApp.recordLottery(obj)
            }
        }
    }
</script>

<style lang="less">
    @import url('../../../assets/less/varsbank.less');

    #notice{
        margin-top: 1px;
        margin-bottom: 8pt*@pt;
        background: @color-Cw;
        height: 40pt*@pt;
        padding: 0 16pt*@pt 0 0;
        .flexbox();

        .notice-icon{
            width: 56pt*@pt;
            .flexbox();
            .align-items(center);
            .justify-content(center);
            img{
                display: block;
                width:32px;
                height: 11px;
            }
        }
        .notice-wrapper{
            position:relative;
            flex:1;
            -webkit-flex:1;
            padding-left: 10pt*@pt;
            overflow: hidden;
            .flexbox();
            .justify-content(space-between);
            .align-items(center);
            .scroll-container{
                flex:1;
                position: relative;
                height: 40pt*@pt;
                  ul{
                    position: absolute;
                    top: 0;
                    li{
                        height: 40pt*@pt;
                        line-height: 40pt*@pt;
                    }
                }
            }
            .icon-arrow{ .icon-forward(#dee2e4); width:6pt*@pt; height:10pt*@pt;}
        }
        .notice-wrapper:before{
            content: "";
            display: inline-block;
            position: absolute;
            left: 0;
            top: 12px;
            bottom: 12px;
            width: 1px;
            height: auto;
            background-color: #f4f6f7;
        }
        &.active-state{
            background: @color-Cbg2;
        }
    }
</style>

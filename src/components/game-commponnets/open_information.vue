<template>

    <div id="open-information" v-if="open_service_list && open_service_list.length > 0">
        
        <!-- <div class="accordion-item  accordion-item-expanded"> -->
        <div class="open-info-container" :class="{ 'accordion-item': show_accordion }">
            <a href="#" class="item-link">
                <div class="info top">                  
                    <div class="info-title">开服信息</div>                  
                    <div v-if="first_info.time_out" class="info-after time-out">
                        <div class="information">{{first_info.open_time}}  {{first_info.open_zone}}</div>
                    </div>                                
                    <div v-else class="info-after">
                        <div class="information">{{first_info.open_time}}  {{first_info.open_zone}}</div>
                    </div>
                    <div v-if="show_accordion" class="icon-arrow"></div>                  
                </div>
            </a>

            <!-- 开服信息不止一条 -->
            <div class="accordion-item-content" v-if="show_accordion">                                 
                
                <template v-for="open_info in open_service_list_2">
                    <div class="info">
                        <div class="info-title"></div>
                        <div v-if="open_info.time_out" class="info-after time-out">
                            <div class="information">{{open_info.open_time}}  {{open_info.open_zone}}</div>
                        </div>
                        <div v-else class="info-after">
                            <div class="information">{{open_info.open_time}}  {{open_info.open_zone}}</div>
                        </div>
                    </div>
                </template>

                <!-- <div class="info">
                    <div class="info-title"></div>
                    <div class="info-after"><div>2016-06-15  12:00  幻术园</div></div>
                </div> -->
                                   
            </div>
        </div>

    </div>
</template>

<script>
    import store from '../../store/dispatch/game-area'
    import { setFormatTime } from '../../api/computed.js';
    export default {
        name: 'open_information',
        props:['zone'],
        computed: {
            //是否显示手风琴(开服信息多于1条)
            show_accordion(){
                return this.open_service_list.length > 1 ;
            },
            //开服信息列表
            open_service_list(){
                let list =  this.zone.game.game_open_service.list;
                let time_now = this.zone.game.time_now;//服务器当前时间
                let open_list = [];
                $$.each(list, function(index, item){                 
                    let open_time_stamp = item.open_time;

                    let time_out = time_now > open_time_stamp ;
                    let open_time = setFormatTime(open_time_stamp,'yyyy-MM-dd  hh:mm');
                    let open_zone = item.open_zone;

                    open_list.push({
                        time_out : time_out,//是否已经开服
                        open_time : open_time,//开服时间
                        open_zone : open_zone//开服区名
                    });
                })

                return open_list;
            },
            first_info(){
                return this.open_service_list[0];
            },
            open_service_list_2(){

                let list = this.open_service_list.concat();
                list.splice(0,1);
                return list;
            },

        },
        components: {
          
        },
        methods: {
                  
        },
        filters:{

        },
        events: {
          
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less');

    #open-information{
        margin:  0 0 8pt*@pt 0 ;
        background: @color-Cw;
        // height: 48pt*@pt;
        padding: 0 16pt*@pt;

        .open-info-container{

            .item-link{}
            
            .info{
                height: 32pt*@pt;
                .flexbox();
                
                .info-title{
                    min-width:58px;
                    padding-right: 16pt*@pt;
                    color: @color-Cfg;
                    font-size: 14pt*@pt;
                    .flexbox();
                }
                .info-after{
                    position: relative;
                    flex:1;
                    -webkit-flex:1;
                    color: @color-Cfg;
                    font-size: 12pt*@pt;
                    overflow: hidden;
                    .flexbox();
                    .align-items(flex-start);
                    .information{
                        // padding:0 16pt*@pt;
                        margin:0 16pt*@pt;
                        white-space:nowrap;
                        overflow:hidden;
                        // text-overflow: ellipsis;
                    }
                }
                .info-after:before{
                    margin-top:2pt;
                    content:'';
                    display:block;
                    width: 8pt*@pt;
                    min-width: 8pt*@pt;
                    height: 8pt*@pt;
                    border-radius: 50%;
                    background-color: @color-Clgs;
                    // margin-right: 16pt*@pt;
                }
                .info-after.time-out:before{
                    background-color: #dee2e4;
                }
            }
            //开服信息第一栏
            .info.top{      
                position:relative;          
                height: 48pt*@pt;

                .info-title{
                    .align-items(center);
                }
                .info-after{
                    .align-items(center);
                    &:before{
                        margin-top:0;
                    }
                }

                //下箭头
                .icon-arrow{
                    .icon-forward(@color-Clgs); 
                    .flex-shrink(0);
                    margin:12pt 4pt 0 0;
                    width:9pt*@pt; 
                    height:15pt*@pt;
                    -moz-transform:rotate(90deg); 
                    -webkit-transform:rotate(90deg);
                    transform:rotate(90deg);
                }

            }
            //上箭头
            &.accordion-item-expanded .info.top .icon-arrow{
                -moz-transform:rotate(270deg); 
                -webkit-transform:rotate(270deg);
                transform:rotate(270deg);
            }

        }

    }
</style>

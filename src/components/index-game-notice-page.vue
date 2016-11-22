<template>
    <div class="page-content">
        <div class="notice-list-container">
            <ul>
                <template v-for="notice in notice_list">
                    <li @click="toNoticeDetail(notice.url)" class="notice-info">
                        <a href="" class="item-link">
                            <div class="info">
                                <div v-if="notice.is_new" class="new-tag">new</div>
                                <div class="title">{{notice.title}}</div>
                            </div>
                            <div class="time">{{notice.create_time}}</div>
                        </a>
                    </li>
                </template>

                <!-- <li class="notice-info">
                    <div class="info">
                        <div class="new-tag">new</div>
                        <div class="title">关于有效成员数定义与公会后台优化</div>
                    </div>
                    <div class="time">2016.05.28</div>
                </li> -->
                
            </ul>
        </div>
        <div class="total">共 {{total}} 条公告</div>
    </div>
</template>

<script>
    import store from '../store/dispatch/game-area'
    import { setFormatTime , jumpLink } from '../api/computed.js';
    export default {
        name: 'notice-list-page',
        // replace: true,
        data(){
            return {
                img_path:'assets/img/',        
            }
        },
        computed: {
            notice_list(){
                let list = store.state.zone.game.game_notice.list;

                let time_now = store.state.zone.game.time_now;//服务器当前时间
                let notice_list = [];
                let week2 = 14*24*3600;

                $$.each(list, function(index, item){                 
                    let notice_create_time = item.create_time;

                    let is_new = time_now - notice_create_time < week2;
                    let create_time = setFormatTime(notice_create_time,'yyyy.MM.dd');
                    let title = item.title ? item.title : '';
                    let url = item.url ? item.url : '';

                    notice_list.push({
                        is_new : is_new,//是否2周内发布
                        create_time : create_time,//发布（创建）时间
                        title : title,//公告标题
                        url: url,//公告地址
                    });

                })

                return notice_list;
            },
            total(){
                return store.state.zone.game.game_notice.list.length;
            },

        },
        components: {
          
        },
        methods: {
            toNoticeDetail(url){
                jumpLink(url)
            },
          
        },
        filters:{

        },
        events: {
          
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../assets/less/varsbank.less');

    #index-game-notice-page{      
        background: @color-Cbg2;
     
        .notice-list-container{
            margin: 8px 0;
            // padding-left:16px;
            background: @color-Cw;
        }
        
        .notice-info{
            // padding-left:16px;
            // padding:12px 16px 12px 0;
            border-bottom: 1px solid #e8ecee;
            
            &:nth-last-child(1){
                border:none;
            }
            .info{
                .flexbox();
                .align-items(center);
                .new-tag{
                    height:14px;
                    line-height: 14px;
                    border:1px solid #FF6084;
                    border-radius: 3px;
                    padding:0 4px;
                    margin-right: 8px;
                    font-size: 10px;
                    font-weight: 600;
                    color:#ff6084;
                }
                .title{
                    font-size:15px;
                    color:#263A43;
                }

            }
            .time{
                margin-top: 3px;
                font-size:12px;
                color:#93999E;
            }
            a.item-link{
                display: block;
                padding: 16px;
                &.active-state{
                    background: @color-Cbg2;
                }
            }
           
        }

        .total{
            margin:20px 0;
            text-align: center;
            font-size:12px;
            color:#93999E;
        }

    }
</style>

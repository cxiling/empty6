<template>
    <div class="toolbar gamedown-toolbar" id="order-toolbar">
        <div class="toolbar-inner">
            <div class="down-container">
                <div class="download-game">
                    <a href="" class="link-load" @click="download" :class="status.css">
                        <span class="proccess-show" >
                           {{status.text}}
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import { linkToZone , jumpLink } from '../../api/computed.js'
    export default {
        props: ['order'],
        computed: {
            status(){
                //按钮文案
                const status = this.order.profile
                let buttonStatus = {
                    text: '立即预约',
                    css: 'status-unorder',
                    status:status.status_order,
                    order:status.is_order,
                    times:status.order_times,
                    url:status.activity_url
                };
                 //新增优先预约状态判断
                if(status.is_order){
                    buttonStatus.text = '已预约'
                    buttonStatus.css = 'status-order'                  
                }else{
                    buttonStatus.text = status.order_times > 0 ? '立即预约 ('+status.order_times+'人已预约)'
                        : '立即预约'
                    buttonStatus.css = 'status-unorder'
                }
                return buttonStatus
              },
        },
        methods: {
          download(){
            jumpLink(this.status.url)
          }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
   @import url('../../../assets/less/varsbank.less');
   #order-toolbar{
     position: relative;
     height: 40px;
     .down-container{
        padding: 0 16px;
        .link-load{
            height: 40px;
            line-height: 40px;
        }
     }
   }
</style>

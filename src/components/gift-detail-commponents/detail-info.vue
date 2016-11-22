<template>

    <div class="detail-info" id="detail-info">
        <div class="list-block desc-block">
            <div class="guild-item">
                <div class="guild-item-title">
                    <p>使用有效期</p>
                </div>
                <div class="guild-item-content">
                    <p>{{validity}}</p>
                </div>
            </div>
            <div class="guild-item">
                <div class="guild-item-title">
                    <p>商品内容</p>
                </div>
                <div class="guild-item-content">
                    <p>{{list.desc}}</p>
                </div>
            </div>
            <div class="guild-item">
                <div class="guild-item-title">
                    <p>使用方法</p>
                </div>
                <div class="guild-item-content">
                    <p>{{list.usage_method}}</p>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script>
    import store from '../../store/index';
    import { getDate } from '../../api/computed.js';
    export default {
        data() {
            return {
                img_path:'assets/img/'
            }
        },

        props:['list'],

        components: {

        },
        methods: {

        },
        computed: {
            //start_time,end_time
            start_time(){
                return getDate(this.list.start_time);
            },
            end_time(){
                return getDate(this.list.end_time);
            },
            validity(){
                if(this.list.start_time&&this.list.end_time){
                    return this.start_time+"~"+this.end_time;
                }
                else{
                    return '长期有效';
                }
            }

        },
        mounted() {
            // setTimeout(()=>{
            //     console.log('list-time',this.list.start_time, this.list.end_time)
            //     console.log('formatTime',setFormatTime(this.list.start_time,'yyyy.MM.dd'), setFormatTime(this.list.end_time,'yyyy.MM.dd'))
            //     console.log(this.start_time, this.end_time)
            // },1000)

        }
    }
</script>

<style lang="less" scoped>
    
    @import url('../../../assets/less/varsbank.less');
    #detail-info{
        .content-block-title{
            padding: 0;
            height: 24px;
            line-height: 24px;
            font-size: @size-T2;
            margin: 0 16px;
            color: @color-Cgreyl;
        }
        .list-block.desc-block{
            .item-content{
                background: @color-Cw;
                padding: 12px 16px;
                .item-title{
                    font-size: @size-T3;
                }
            }
        }
    }

</style>
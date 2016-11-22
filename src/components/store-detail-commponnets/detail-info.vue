<template>

    <div class="detail-info" id="detail-info">
        <div class="list-block desc-block">
            <div class="content-block-item">
                <div class="content-block-title">使用有效期</div>
                <div class="item-content">         
                    <div class="card-content" v-if="val.end_time">
                        {{ val.start_time | format-time('yyyy.MM.dd') }} ~
                        {{ val.end_time | format-time('yyyy.MM.dd') }} 
                    </div>
                    <div class="card-content" v-else>
                        长期有效
                    </div>
                </div>
            </div>
            <div class="content-block-item">
                <div class="content-block-title">商品内容</div>
                <div class="item-content">         
                    <div class="card-content">{{val.desc}} </div>
                </div>
            </div>
            <div class="content-block-item">
                <div class="content-block-title">使用方法</div>
                <div class="item-content">         
                    <div class="card-content">
                        {{val.usage_method}} 
                    </div>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script>
    import store from '../../store/index';

    export default {
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props:['val'],
        components: {

        },
        methods: {

        },
        computed: {

        },
        mounted() {

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
                .card-content{
                    font-size: @size-T3;
                }
            }
        }
    }

</style>
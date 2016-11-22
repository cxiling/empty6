<template>
   <div class="store-sticky" id="store-sticky" @click="lineTop">
        <a href="" class="item-link floating-button button">
           <span>顶部</span>
       </a>
   </div>
</template>

<script>
    import store from '../../store/dispatch/guild-shop'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            forum() {
                return store.state.data.forum
            }
        },
        methods: {
            lineTop(){
                $$('.page-content').scrollTop(0,300,function(){
                    console.log('get')
                });
            }
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #store-sticky{
        position: absolute;
        display: none;
        right: 20px;
        bottom: 20px*3;
        z-index: 9999;
        width: 44px;
        height: 44px;
        .item-link{
            text-align: center;
            display: inline-block;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: @color-Cgreen;
            line-height: 44px;
            border: none;
            span{
                font-size: @size-T2;
                display: inline-block;
                color: @color-Cw;
                padding: 9px 0 0 0;
                .icon-upforward(@color-Cw);
                background-repeat: no-repeat;
                background-position: center 6px;
            }
        }
        
    }
</style>
<template>
   <div class="store-head" id="store-head">
       <div class="head-container">
            <div class="head-decs">
               <p class="head-name">我的可用贡献: </p>
            </div>
            <div class="head-content">
                <div class="head-num">
                    <span>{{ user_info.consume }}</span>
                </div>
                <div class="head-help">
                    <a href="" class="link-help" @click="contributionRule">如何赚贡献</a>
                </div>
           </div>
       </div>
   </div>
</template>

<script>
    import store_star from '../../store/dispatch/guild-star'
    import { ruleCurrenId } from '../../store/actions/guild-star';
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props: ['user_info'],
        computed: {
            
        },
        methods: {
            contributionRule(){
                const obj = 11271
                ruleCurrenId(store_star,obj,function(){
                    myApp.redictNewPage('index-common-rules-page', false, false)
                })
            }
        },
        mounted () {

        },
        updated(){

        }
    }
</script>
<style lang="less">
    @import url('../../../assets/less/varsbank.less'); 
    #store-head{
        .head-container{
            background-image: linear-gradient(-168deg, #F6B43D 0%, #F6653E 50%, #F7AD46 100%);
            box-shadow: inset 0 0 0 0 #ECECEC;
            background: url('http://obsiq8rn7.bkt.clouddn.com/guildStore_bg.png') no-repeat;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 16px 16px;
            color: @color-Cw;
            margin-top: -1px;
            .head-decs{
                .head-name{
                    font-size: @size-T2;
                    // color: @color-Cgreyl;
                }
            }
            .head-content{
                .flexbox();
                .justify-content(space-between);
                .align-items(center);
                .head-num{
                    font-size: @size-T8;
                    // color: @color-Cgreen; 
                }
                .head-help{
                    .link-help{
                        // color: @color-Cgreyl;
                        font-size: @size-T2;
                        display: inline-block;
                        vertical-align: middle;
                        padding: 5px 18px 5px 5px;
                        .icon-tips(@color-Cw);
                        // background: url('../@{image-url}ic_howto.png') no-repeat;
                        background-repeat: no-repeat;
                        background-position: right 50%;
                        background-size: 16px 16px;
                        &.active-state{
                            opacity: 0.8;
                        }
                    }
                }
            }
            
        }
    }   
</style>
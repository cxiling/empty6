<template>
    <div class="gift-active-package item-block item-link">
        
        <!-- <div class=""> -->
                    
            <div class="item-inner" @click="toActivity">
                <div class="item-fetch-row">
                    <div class="item-media">
                        <div class="item-icon item-face">
                            <img :data-src="icon" class="lazy lazy-fadeIn">
                        </div>
                    </div>
                    <div class="item-desction">
                        <div class="item-title">
                            <div class="gift-active-package-head">
                                <span class="gift-active-package-stage" :class="stage.color" v-text="stage.text"></span>
                                <span class="gift-active-package-tit" v-text="activity.title"></span>
                            </div>
                        </div>
                        <div class="item-addition">
                            <span v-text="date"></span>
                        </div>
                    </div>
                    <div class="item-button">                    
                        <div class="icon-r"></div>
                    </div>
                </div>
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
    import store from '../../store/index';
    import { jumpLink , setFormatTime , imageView }  from "../../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props: ['activity'],
        computed: {
            stage(){
                switch(this.activity.stage){
                    case 1:
                        return {
                            text:'预热',
                            color:'text-yellow'
                        }
                    case 2:
                        return {
                            text:'进行',
                            color:'text-green'
                        }
                    case 3:
                        return {
                            text:'结束',
                            color:'text-grey'
                        }
                    default:
                        return{
                            text:'进行',
                            color:'text-green'
                        }
                }
            },
            date(){
                let vue_this = this
                let end = setFormatTime(vue_this.activity.end_time,'yyyy.MM.dd')
                let start = setFormatTime(vue_this.activity.start_time,'yyyy.MM.dd')
                return start + '~' + end
            },
            icon(){
                return imageView(this.activity.icon,96,96)
            }
        },
        methods: {
            toActivity(){
                let uri = this.activity.url;
                console.log(uri)
                jumpLink(uri);
            }
            
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    .gift-active-package{
       /* height: 72px;
        padding-left: 16px;

        .item-block{
            border-bottom: solid 1px @color-Cgrey;  
            padding: 12px 16px 12px 0;          
        }

        .item-media{
            padding: 0;
            img{
                border-radius: 4px;
            }
        }

        .item-after{
            height: 44px;
            .flexbox();
            .align-items(center);
        }

        .item-inner{
            padding: 0;
            margin-left: 16px;
            border-bottom: none;
            &:after{                
                content: none;
            }
        }

        .item-title-row{
            height: 44px;
            .flexbox();
            .align-items(center);
        }*/

        &-head{
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            .flexbox();
            .align-items(center);
        }

        &-tit{
            
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
            .d_t_content_main();
            line-height: 20px;
        }
        &-date{
            margin-top: 2px;
            .d_t_content_sub();
        }

        .icon-r{
            .icon-forward(@color-Ca1);
            width:8px;
            height:14px;
        }

        &-stage{
            margin-right: 6px;
            padding: 2px 5px 0 5px;
            font-size: 10px;
            border: solid 1px;
            border-radius: 2px;
            line-height: 14px;
        }

    }

    .text-yellow{
        color: @color-Cyellow;
        border-color: @color-Cyellow;
    }

    .text-green{
        color: @color-Cgreen;
        border-color: @color-Cgreen;
    }

    .text-grey{
        color: @color-Cgreyl;
        border-color: @color-Cgreyl;
    }

    .list-block.media-list.common-list .item-content .gift-active-package.item-block .item-inner .item-icon.item-face{
        width: 48px;
        height: 48px;
    }

    .list-block.media-list .gift-active-package .item-media{
        padding-top: 2px;
        padding-bottom: 2px;
    }

    .list-block.media-list .gift-active-package .item-title{
        font-weight: normal;
    }

    .list-block.media-list .item-inner{
        padding-top: 16px;
        padding-bottom: 15px;
    }

    /*.list-block.media-list.common-list .item-content .item-block.gift-active-package{
        padding:6px 0 6px 16px;
    }*/
    
</style>
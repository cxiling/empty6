<template>
   <div class="gift-guild-package item-link item-block" @click="toGuild(guild.guild_id)">
        <div class="item-inner">
            <div class="item-fetch-row">
                <div class="item-media">
                    <div class="item-icon item-face">
                        <img :data-src="guild.icon" width="56" height="56" class="lazy lazy-fadeIn">
                    </div>
                </div>
            <div class="item-desction">
                <!-- <div class="item-title"> -->
                    <div class="gift-guild-package-tit">
                        <div class="gift-guild-package-name">{{guild.name}}</div>
                        <div class="gift-guild-package-lv">LV{{guild.level}}</div>
                    </div>
                <!-- </div> -->
                <div class="gift-guild-package-des">{{guild.description}}</div>
                <div class="gift-guild-package-des">ID:{{id}}</div>
            </div>

            <div class="item-button">
                <button class="btn-green-frame btn-normal">加入</button>
            </div>

        </div>
        </div>
    </div>
</template>

<script>
    import store from '../../store/index'
    import { imageView }  from "../../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props: ['guild'],
        computed: {
            forum() {
                return store.state.data.forum
            },
            id() {
                let guild = this.guild
                return guild.short_id ? guild.short_id : guild.guild_id
            },
            icon() {
                return imageView(this.guild.icon,112,112)
            }
        },
        methods: {
            toGuild(val){
                myWebview.jumpGuild(val)
            }
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    .gift-guild-package{
       /* height: 80px;
        padding: 12px 16px;
        position: relative;
        overflow: hidden;*/
        /*&:after{
            position: absolute;
            left: 16px;
            bottom: 0;
            height: 1px;
            width: 100%;
            content: ' ';
            background-color: @color-Cgrey;
        }*/

        /*.item-media{
            padding: 0;
            img{
                border-radius: 4px;
            }
        }

        &.item-link .item-inner{
            border-bottom: none;
            padding:0;
            margin-left: 16px;
            .flexbox();
            .align-items(center);
            &:after{
                // content: none;
            }

            .item-title-row{
                background-image: none;
                padding-right: 0;
            }
        }

        .item-after{
            max-height: 80px;
            .flexbox();
            .align-items(center);
        }

        .item-title-row{
            width: 100%;
            .flexbox();
            .justify-content(space-between);

            .item-title{
                font-weight: normal;
            }*/
        // }
        .btn-normal{
            line-height: 21px;
        }

        & &-tit{
            // margin-right: 20px;
            .flexbox();
            .justify-content(flex-start);
            .d_t_content_main();
            .align-items(center);
            // font-weight: bold;
        }

        & &-name{
            .one-line();
        }

        & &-des{
            .one-line();
            .d_t_content_sub();
        }

        &-lv{
            border: solid 1px @d_yellow_sub;
            padding: 1px 4px;
            font-size: 10px;
            color: @d_yellow_sub;
            border-radius: 3px;
            margin-left: 5px;
            line-height: 12px;
            // margin-bottom: 4px;
        }
    }
    .one-line(){        
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .list-block.media-list .item-fetch-row .item-media{
        padding-top: 0;
        padding-bottom: 0;
    }
    .list-block.media-list .item-inner{
        padding-top: 5px;
        padding-bottom: 6px;
    }
    .list-block.media-list .item-fetch-row{
        height: 69px;
    }
    .list-block.media-list .gift-guild-package .item-title{
        font-weight: normal;
    }

    
</style>
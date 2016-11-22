<template>

    <div class="list-block media-list common-list" id="apply-head">
        <ul>
            <li class="item-content">
                <div class="item-list">
                   <a href="#" class="item-link item-block" @click="linkToZone(order.profile.gid)">
                        <div class="item-inner">
                            <div class="item-fetch-row">
                                <div class="item-media">
                                    <div class="item-icon item-face">
                                        <img :data-src="imageView(order.profile.icon)" class="lazy lazy-fadeIn">
                                    </div>
                                </div>
                                <div class="item-desction">
                                    <div class="item-name">{{ order.profile.game_name }}</div>
                                    <div class="item-desc">{{ order.profile.description }}</div>
                                    <div class="item-tags">
                                        <template v-for="(val,index) in order.profile.tag" v-if="order.profile.tag.length">
                                            <div class="p-list">
                                                <a href="" class="link-tag" :style="{ 'background': val.color }">
                                                    <span>{{val.title}}</span>
                                                </a>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="item-link">
                                    <a href="#" class="icon-arrow"></a>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </li>
        </ul>
    </div>

</template>

<script>
    import store from '../../store/dispatch/game-order'
    import { jumpLink , swiperNav, imageView , linkToZone } from '../../api/computed.js'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                gift_list:[]
            }
        },
        props:['order'],
        computed: {

        },
        methods: {
            imageView(val){
                return imageView(val,112,112)
            },
            linkToZone(gid){
                if(gid) linkToZone(gid)
            }
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #apply-head{
        margin-bottom: 6px;
        .item-content{
            .item-desction{
                .item-name{
                    font-size: @size-T3;
                }
                .item-desc{
                    font-size: @size-T2;
                    color:@color-Cgreyl;
                    height: 18px;
                    .tag-overflow();
                }
                .item-tags{
                    .flexbox();
                    .p-list{
                        margin-right: 6px;
                        .link-tag{
                            display: block;
                            height: 18px;
                            line-height: 18px;
                            padding: 0 5px;
                            border-radius: 3px;
                            span{
                                display: block;
                                font-size: @size-T1;
                                color: @color-Cw;
                            }
                        }
                    }
                }
            }
            .item-link{
                .icon-arrow{
                    display: block;
                    width: 8px;
                    height: 13px;
                    .icon-forward(@color-Cgrey);
                }
            }
        }
        .item-inner{
            border:none;
        }
    }
</style>
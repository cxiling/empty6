<template>

    <div class="detail-head" id="detail-head">
        <div class="list-block media-list common-list store-search-list">
            <ul>
                <li class="item-content" @click="zoneList">
                    <div class="item-list">
                        <a href="#" class="item-link item-block">
                            <div class="item-inner">
                              <div class="item-fetch-row">
                                <div class="item-media">
                                    <div class="item-icon item-face">
                                        <img :src="icon" >
                                    </div>
                                </div>
                                <div class="item-desction">
                                    <div class="item-title">
                                        <!-- <div href="" class="link-tag"> 
                                            <span :class="filterTag">
                                                {{ val.type | format-type(val.source) }}
                                            </span>
                                        </div> -->
                                        <div class="item-name item-detail">
                                            <span class="gift-type" :class="filterTag">
                                                {{ val.type | format-type(val.source) }}
                                            </span>
                                            <span class="gift-name">{{ val.gift_name }}</span> 
                                        </div>
                                    </div>
                                    <div class="item-addition">
                                        <span>消耗{{ val.price }}{{ val.currency | format-currency }}</span>
                                    </div>
                                    <div class="item-process" v-if="val.status !== 3">
                                        <div class="item-processing">
                                            <span data-progress="10" class="progressbar color-green">
                                                <span :style="{ 'left': remained +'%' }"></span>
                                            </span>
                                        </div>
                                        <div class="item-precessend">
                                            <span>{{remained_txt}}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="item-button">
                                    <a href="" class="link-fetch button" 
                                     :class="filterFetchTag"
                                    @click.stop.prevent="linkFetch(val,user_info)">
                                        <template v-if="val.status == 1">
                                            {{ val.user_status | format-user-status }}
                                        </template>
                                        <template v-else> 
                                            {{ val.status | format-status}}
                                        </template>
                                    </a>
                                </div>
                              </div>
                            </div>
                        </a>
                        
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import Vue from 'vue'
    import store from '../../store/dispatch/guild-shop.js'
    import { formatPercent , modalData ,filterCurrery , linkToZone,filterTag , filterFetchTag , imageView} from "../../api/computed.js";
    import { guildFetch , guildDetail , currentGuildId } from '../../store/actions/guild-shop.js'
    import store_zone from '../store-commponents/store-zone.vue'
    export default {
        data() {
            return {
                img_path:'assets/img/'
            }
        },

        props:['val','user_info'],

        components: {

        },
        methods: {
            linkFetch(val,user_info){
                const fetchStore = new Vue(store_zone)
                fetchStore.linkFetch(val,user_info)
            },
            zoneList(){
                const gid = this.val.gid
                if(gid) linkToZone(gid)
            }
        },
        computed: {
            icon(){
                return imageView(this.val.icon,112,112)
            },
            filterFetchTag(){
                return filterFetchTag(this.val.status,this.val.user_status)
            },
            filterTag(){
                const type = this.val.type
                const source = this.val.source
                return filterTag(type,source)
            },
            remained(){
                const remained = this.val.remained
                const total = this.val.total
                const present = formatPercent(remained,total)
                return present
            },
            remained_txt(){
                const remained = this.val.remained
                const total = this.val.total
                const present = formatPercent(remained,total)
                return present > 10 ? ('剩余 '+ present) : (present > 0 ? '仅剩 '+ present : '仅剩 '+ 0)
                // return  present
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    
    @import url('../../../assets/less/varsbank.less');
    
</style>
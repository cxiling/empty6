<template>
    <div id="store-record-list" >
        <div class="list-block media-list common-list store-record-list">
            <div class="content-block-title">领取记录({{record_list.total}})</div>
            <ul v-if="record_list.total && record_list.list.length">
                <li class="item-content" v-for="(val,index) in record_list.list">
                    <div class="item-list" >
                        <div href="#" class="item-link item-block" >
                            <div class="item-inner">
                              <div class="item-fetch-row">
                                <div class="item-media">
                                    <div class="item-icon item-face">
                                        <img :src="val.user.icon" >
                                    </div>
                                </div>
                                <div class="item-desction">
                                    <div class="item-title">
                                        <div class="item-name">{{ val.user.name }}</div>
                                        <div class="link-tag link-card" 
                                        v-if="val.user.guild_identity < 3"
                                        :class="filterIdentey(val.user.guild_identity)" >
                                            {{ val.user.guild_identity | format-identity }}
                                        </div>
                                    </div>
                                   <div class="item-level">
                                        <div class="item-icon">
                                            <img 
                                            :src="'http://obsiq8rn7.bkt.clouddn.com/member_small_stare_'+val.user.member_level+'.png?imageView2/1/'" alt="">
                                        </div>
                                        <!-- val.user.guild_title -->
                                        <div class="item-tag" v-if="val.user.guild_title"> 
                                            <span>{{val.user.guild_title}}</span>
                                        </div>
                                   </div>
                                </div>
                                <div class="item-button">
                                    <span>{{ val.receive_time | format-time('yyyy.MM.dd hh:mm') }}</span>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <no-data :msg="'暂无领取记录'" v-if="!record_list.list.length"></no-data>
    </div>
</template>

<script>

    import store from '../../store/dispatch/guild-shop.js'
    import no_data  from "../common-commponents/no-data.vue"; // 暂无数据
    import { filterIdentey } from "../../api/computed.js";
    export default {
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props:['record_list'],
        components: {
            'no-data':no_data
        },
        methods: {
            filterIdentey(type){
                return filterIdentey(type)
            }
        },
        computed: {

        },
        mounted() {

        }
    }
</script>

<style lang="less">

    @import url('../../../assets/less/varsbank.less');
    #store-record-list{
        // #no-container{
        //     margin-top: 20%;
        // }
    }
    
</style>
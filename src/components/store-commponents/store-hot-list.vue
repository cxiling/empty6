<template>
   <div class="store-hot-list">
       <div class="list-block media-list common-list store-list">
          <ul>
            <li class="item-content" v-for="(val,index) in gift_list" >
                <a  class="item-link item-block" @click="linkZone(val.profile.gid)">
                    <div class="item-media">
                        <div class="item-icon">
                            <img :data-src="imageView(val.profile.icon)" class="lazy lazy-fadeIn">
                        </div>
                        <div class="item-subname">
                            <span>{{val.profile.game_name}}</span> 
                        </div>
                    </div>
                </a>
                <template v-for="(val2,index2) in val.list.slice(0,2)">
                     <store-hot :val="val2" :user_info="user_info"></store-hot>
                </template>
                <div class="item-link item-more" @click="linkMore(val)" 
                    v-if="val.list.length >= 2 && val.profile.gift_total > 2">
                    <span>查看更多({{val.profile.gift_total}})</span>
                </div>
            </li>
          </ul>
        </div>
   </div>
</template>

<script>
    import store from '../../store/dispatch/guild-shop'
    import { linkToZone , imageView} from '../../api/computed.js'
    import { currentGuildGid } from '../../store/actions/guild-shop.js'
    import store_hot from './store-hot.vue'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props:['gift_list','user_info'],
        computed: {
            gift_hot_list(){
                const vue_this = this
                const gift_list = this.gift_list 
                // $$.each(gift_list,function(index,item){
                //     item.profile.icon = vue_this.imageView(item.profile.icon)
                // })
                return this.gift_list
            }
        },
        methods: {
            imageView(val){
                return imageView(val,72,72)
            },
            linkMore(val){
                const obj = {
                    gid:val.profile.gid,
                    game_name:val.profile.game_name
                }
                currentGuildGid(store,obj,function(){
                    myApp.redictNewPage('index-store-list-page', false, false)
                })
            },
            linkZone(gid){
                if(gid) linkToZone(gid)
            }
        },
        mounted () {

        },
        components: {
            'store-hot': store_hot,
        },
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #store-hot-list{
        
    }
</style>
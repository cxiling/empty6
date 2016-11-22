<template>
   <div class="store-zone-list">
        <div class="list-block media-list common-list store-search-list"  v-if="guild_list.length">
            <ul>
                <li class="item-content">
                    <div class="item-list">
                        <template  v-for="(val,index) in guild_list">
                            <store-zone :val="val" :user_info="user_info"></store-zone>
                        </template>
                    </div>
                </li>
            </ul>
        </div>
   </div>

</template>

<script>
    import store from '../../store/dispatch/guild-shop.js'
    import store_zone from './store-zone.vue'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                gift_list:[]
            }
        },
        props:['guild_list','user_info'],
        computed: {

        },
        methods: {
        
        },
        mounted () {

        },
        components: {
            'store-zone': store_zone,
        },
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
</style>
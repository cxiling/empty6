<template>
    <div class="list-block store-detail" id="model-Copy" v-if="giftList.length">
        <ul>
            <li class="item-content">
                <div class="item-inner">
                     <div class="item-exchange-row">
                        <div class="item-coupon" v-for="(val,index) in giftList" >
                            <p class="item-code"> {{val.name}} : {{val.content}} </p>
                            <a href="" class="link-copy button" @click="giftCode(val.content)">复制</a>
                        </div>
                        <p class="copy-tip" v-for="(val,index) in giftList.slice(0,1)" > {{ val.name }}已保存至“我的宝箱”，请尽快使用，否则将进入淘号</p>
                    </div>
                </div>
            </li>
        </ul>
       
    </div>
    

</template>

<script>

    import store from '../../store/dispatch/guild-shop.js'
    import { filterRecord , showToast } from "../../api/computed.js";
    import { guildFetch , guildDetail , currentGuildId } from '../../store/actions/guild-shop.js'

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
            giftCode(val){
                const params = { 
                    message: '复制成功',
                    hold:3000
                }
                console.log(val)
                myWebview.copyContent(val)
                showToast(params.message)
            }
        },
        computed: {
            giftList(){
                let giftList = []
                if(this.val.hasOwnProperty('record')){
                    if(this.val.record.hasOwnProperty('gift_list')){
                        const gift_list = this.val.record.gift_list
                        const type = this.val.record.type
                        giftList = filterRecord(gift_list,type)
                    }
                }
                return giftList
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less" scoped>
    
    @import url('../../../assets/less/varsbank.less');
    #model-Copy{
        &.store-detail{
            background: @color-Cw;
            .item-inner{
                padding: 7px 15px 0;
            }
        }
    }
</style>
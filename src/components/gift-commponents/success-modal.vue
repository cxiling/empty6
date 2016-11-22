<template>
    <div class="">
        <div class="gift-modal-text" v-text="tit"></div>
        <!-- <div class="copy-container">
            <span class="copy-container-content">兑换码: {{res.account}}</span>
            <button class="btn-green btn-big" @click="giftCode(res.account)">复制</button>
        </div> -->
        <div class="list-block" id="model-Copy" v-if="gift_list.length">
            <ul>
                <li class="item-content">
                    <div class="item-inner">
                         <div class="item-exchange-row">
                            <div class="item-coupon" v-for="(val,index) in gift_list" >
                                <p class="item-code"> {{val.name}} : {{val.content}} </p>
                                <a href="" class="link-copy button" @click="giftCode(val.content)">复制</a>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- <a class="copy-container-link rule">查看使用方法</a> -->

        <!-- <div class="copy-container-link rule" @click="butionRule">
            <a href="" class="link-more">查看使用方法</a>
        </div> -->
    </div>
	
</template>

<script>
	import store from '../../store/dispatch/guild-shop'
    import store_star from '../../store/dispatch/guild-star'
	import { stopDoubleClick , filterRecord , showToast } from '../../api/computed.js';
    import { ruleCurrenId } from '../../store/actions/guild-star';
	export default {
        data() {
            return {
            	img_path:'assets/img/',
            	gift_list:[]
            }
        },
        props:['tao'],
        computed: {
            award(){
                return store.state.data.gift_center.fetch_info
            },
            gift_list(){

                const award = store.state.data.gift_center.fetch_info
                const list = award.gift_list
                let filter_list = []
                let name = {
                    1:['兑换码'],// 兑换码
                    2:['账号','密码'],
                    255:[]// 卡密
                }
                //遍历gift_list
                $$.each(name[award.exchange_type],function(index, item) {
                    let obj = {}
                    obj['name'] = item
                    obj['content'] = list[index]
                    filter_list.push(obj)  
                });
                return list.length ? filter_list : []  //加多判断
            },

            // 区分title文本内容
            tit(){
                let vue_this = this

                // tt && 淘号
                if(vue_this.tao){
                   return '淘到的号不保证一定能兑换，请尽快使用'
                }
                // tt && 兑换码 && 领取
                if(vue_this.award.exchange_type == 1 && !vue_this.tao){
                    return '兑换码已保存至“我的宝箱”，请尽快使用，否则将进入淘号'
                }
                // tt && 卡密 && 领取
                if(vue_this.award.exchange_type == 2 && !vue_this.tao){
                    return '卡密已保存至“我的宝箱”，请尽快使用，否则将进入淘号'
                }
                return '已保存至“我的宝箱”，请尽快使用'
            },
        },
        methods: {
        	butionRule(){
                const obj = 11280
                ruleCurrenId(store_star,obj,function(){
                    myApp.redictNewPage('index-common-rules-page', false, false)
                })
            },

            giftCode(val){
                let vue_this = this
                myWebview.copyContent(val)
                if(stopDoubleClick(vue_this)){
                    showToast('已复制')
                }
            }
        },
        mounted() {
        }
    }
</script>


<style lang="less">

</style>
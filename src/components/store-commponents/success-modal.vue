<template>
	<div class="success-modal" v-if="record">
        <div class="model-title" >
            {{ record.type | format-type }}已保存至“我的宝箱”,请尽快使用
        </div>
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
        <!-- <div class="model-link" @click="butionRule">
            <a href="" class="link-more">查看使用方法</a>
        </div> -->
	</div>
	
</template>

<script>
	import store from '../../store/dispatch/guild-shop'
    import store_star from '../../store/dispatch/guild-star'
	import { stopDoubleClick , filterRecord ,showToast } from '../../api/computed.js';
    import { ruleCurrenId } from '../../store/actions/guild-star';
	export default {
        data() {
            return {
            	img_path:'assets/img/',
            	gift_list:[]
            }
        },
        computed: {
            record(){
                return store.state.data.guild_shop.shop_info.record
            },
        	gift_list(){
        		const record = store.state.data.guild_shop.shop_info.record
                const gift_list = record.gift_list
                const type = record.type
                const filter_list = filterRecord(gift_list,type)
                return filter_list
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
                const params = { 
                    message: '复制成功',
                    hold:3000
                }
                console.log(val)
                myWebview.copyContent(val)
                showToast(params.message)
            }
        },
        mounted() {
        	
        }
    }
</script>


<style lang="less">

</style>
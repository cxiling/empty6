<template>
	<div class="fail-modal">
        <div class="model-title">
            <div v-if="!fail_info.remained">
                商品已售罄或下架
            </div>
            <div v-else>
                 您的可用{{ fail_info.currency | format-currency }}不足
            </div>
        </div>
        <div class="model-link" @click="butionRule" v-if="fail_info.remained">
            <a href="" class="link-more" 
            @click="butionRule(fail_info.pageId)">
            如何获得{{ fail_info.currency | format-currency }}</a>
        </div>
	</div>
	
</template>

<script>
	import store from '../../store/dispatch/guild-shop'
    import store_star from '../../store/dispatch/guild-star'
	import { stopDoubleClick , filterRecord } from '../../api/computed.js';
    import { ruleCurrenId } from '../../store/actions/guild-star';
	export default {
        data() {
            return {
            	img_path:'assets/img/',
            }
        },
        computed: {
            fail_info(){
                const fail = store.state.data.current.fail_info
                return fail
            }
        },
        methods: {
        	butionRule(pageId){
                const obj = this.fail_info.pageId
                ruleCurrenId(store_star,obj,function(){
                    myApp.redictNewPage('index-common-rules-page', false, false)
                })
            }
        },
        mounted() {
        	console.log(this.fail_info)
        }
    }
</script>


<style lang="less">

</style>
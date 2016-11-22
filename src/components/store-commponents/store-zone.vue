<template>
   <a href="#" class="item-link item-block" 
        @click="storeList(val)" >
        <div class="item-inner">
          <div class="item-fetch-row">
            <div class="item-media">
                <div class="item-icon item-face">
                    <img :data-src="icon" class="lazy lazy-fadeIn">
                </div>
            </div>
            <div class="item-desction">
                <div class="item-title">
                    <div href="" class="link-tag"> 
                        <span :class="filterTag">
                            {{ val.type | format-type(val.source) }}
                        </span>
                    </div>
                    <div class="item-name">{{ val.gift_name }}</div>
                </div>
                <div class="item-addition">
                    <span>消耗{{ val.price }}{{ val.currency | format-currency }}</span>
                </div>
                <div class="item-process">
                    <div class="item-processing">
                        <span data-progress="10" class="progressbar color-green">
                            <span :style="{ 'left': remained +'%' }"></span>
                        </span>
                    </div>
                    <div class="item-precessend">
                        <span>{{ remained_txt }}%</span>
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

</template>

<script>
    import Vue from 'vue'
    import store from '../../store/dispatch/guild-shop.js'
    import suc_modal from './success-modal.vue'
    import fail_modal from './fail-modal.vue'
    import { formatPercent , modalData ,filterCurrery , showToast , linkToZone , imageView , filterTag ,filterFetchTag } from "../../api/computed.js";
    import { guildFetch , guildDetail , currentGuildIndex , guildDetailCurrent , currentFailParmter } from '../../store/actions/guild-shop.js'
    export default{
        data() {
            return {
                img_path:'assets/img/',
                gift_list:[],
                info:{
                    user_status:1
                }
            }
        },
        props:['val','user_info'],
        computed: {
            filterFetchTag(){
                return filterFetchTag(this.val.status,this.val.user_status)
            },
            filterTag(){
                const type = this.val.type
                const source = this.val.source
                return filterTag(type,source)
            },
            icon(){
                return imageView(this.val.icon,72,72)
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
        methods: {
            storeList(val){
                //参数传输
                guildDetailCurrent(store,val,function(){
                    myApp.redictNewPage('index-store-detail-page', false, true)
                })
            },
            openGame(package_name,gid){
                if(myWebview.isInAppFunc()){
                    myWebview.startGameByPackage(package_name)
                }else{
                    linkToZone(gid)
                }
            },
            linkFetch(val,user_info){
                const vue_this = this
                const keywords = val.keywords
                const gid = val.gid
                const user_status = val.user_status
                const status = val.status
                const need_approve = val.need_approve
                const currency = val.currency
                const price = val.price
                const gift_id = val.gift_id
                const remained = val.remained
                const consume = user_info.consume
                const currency_txt = filterCurrery(currency)
                const package_name = val.package_name
                const params = { 
                    message: '已提交申请,会长将在48小时内处理哦',
                    hold:3000
                }
                const failParms = {
                    message: '提交申请失败,请稍后重试',
                    hold:3000
                }
                //需要会长审批
                const test = need_approve ? '领取该礼包将消耗'+price+'(当前可用'+consume+'贡献)确定继续领取?'
                    :'领取该礼包将消耗 '+price+' 贡献'
                const test_desction = need_approve ? '该礼包需要会长审批,若会长拒绝你的申请,会返回对应的贡献值。' 
                    : '当前个人贡献: '+consume
                const click_txt = need_approve ? '申请领取' : '确认领取'
                const parameter = {
                    title:'确认领取',
                    text:test,
                    text_desc:test_desction,
                    closed_txt:'再考虑一下',
                    click_txt:click_txt,
                }
                const sucParameter = {
                    title:'领取成功',
                    text:'',
                    text_desc:'',
                    closed_txt:'关闭',
                    click_txt:'打开游戏',
                }
                const sucBoxParameter = {
                    title:'领取成功',
                    text:'',
                    text_desc:'',
                    closed_txt:'我知道了',
                    click_txt:'去看看',
                }
                 const failParameter = {
                    title:'领取失败',
                    text:'',
                    text_desc:'',
                    click_txt:'我知道了',
                }
                const obj = {
                    gift_id:gift_id,
                    price:price,
                    price:price,
                    currency:currency,
                    keywords:keywords
                }
                //挂载成功组件
                guildDetailCurrent(store,val,function(){
                    modalData(parameter,function(){

                        //挂载失败组件数据
                        //贡献值不足 或者库存不足
                        if(consume < price || !remained){
                            const parameter = {
                                pageId:11271,
                                price:price,
                                currency:currency,
                                remained:remained,
                            }
                            currentFailParmter(store,parameter,function(){
                                //异步挂载
                                const p1 = new Promise(function(resolve, reject) {
                                    setTimeout(function(){
                                        modalData(failParameter,function(){
                                            myApp.closeModal()
                                        })
                                        resolve() 
                                    },500)
                                })
                                p1.then(function(){
                                    const failModal = new Vue(fail_modal)
                                    failModal.$mount('#mount-modal'); //挂载失败的弹框
                                })
                            })
                            return 
                        }
                        vue_this.info.user_status = 0
                        //可领取
                        guildFetch(store,obj,function(data){
                            let user_statue
                            let record
                            let sucParame
                            if(data.hasOwnProperty('user_status')){
                                user_statue = data.user_status
                            }
                            if(data.hasOwnProperty('record') && data.record){
                                record = data.record
                            }
                            sucParame = record ? sucParameter : sucBoxParameter
                            //异步挂载
                            const p2 = new Promise(function(resolve, reject) {
                                setTimeout(function(){
                                    if(user_statue == 3){ 
                                        //myApp.addSnackbar(params)
                                        showToast(params.message)
                                    }
                                    else if(user_statue == 4 || user_statue == 2){ 
                                        modalData(sucParame,function(){
                                            if(record) { 
                                                vue_this.openGame(package_name,gid) 
                                            }else{
                                                myApp.jumpBox() //跳转我的宝箱
                                            }
                                        })
                                        resolve()
                                    }
                                    else{
                                        //myApp.addSnackbar(failParms)
                                        showToast(failParms.message)
                                    }
                                },500)
                            })
                            p2.then(function(){
                                //挂载成功组件数据
                                const sucModal =  new Vue(suc_modal) 
                                sucModal.$mount('#mount-modal'); //挂载成功的弹框
                            })
                        })
                    })
                })
            }
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
</style>
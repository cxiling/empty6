<template>
   <div class="gift-tt-package item-block item-link" :class="{'detail':detail}" @click="toDetail" v-if="gift">
        <div class="item-inner">
            <div class="item-fetch-row">
                <div class="item-media">
                    <div class="item-icon item-face">
                        <img :src="icon" v-if="detail">
                        <img :data-src="icon" class="lazy lazy-fadeIn" v-else>
                    </div>
                </div>
                <!-- 公会礼包:会长 -->
                <template v-if="is_president && gift_kind == 2">
                    <!-- <div class="item-title-row"> -->
                    <div class="item-desction">
                        <!-- <div class="item-title"> -->
                            <div :class="{'item-name':!detail,'detail-item-name':detail}">{{gift.gift_name}}</div>
                        <!-- </div> -->
                        <div class="item-addition" v-if="is_president"><span>单价 {{gift.price}} 公会贡献</span></div>
                        <div class="item-process">
                            <div class="item-processing">
                                <span class="progressbar color-green">
                                    <span :style="{ 'left': remained.val +'%' }"></span>
                                </span>
                            </div>
                            <div class="item-precessend"><span> {{remained.txt+' '+remained.val}}%</span></div>
                        </div>
                    </div>

                    <div class="item-button">

                        <div v-if="remained.val">
                            <button v-if="!receive_flag" class="btn-green-frame btn-normal" @click.stop.prevent="onApply">申请</button>
                            <button v-if="receive_flag" class="btn-receiving btn-normal">申请中</button>
                            <!-- <button v-if="gift.have" class="btn-green-disabled btn-normal">已申请</button> -->
                        </div>
                        <div v-else>
                            <button class="btn-green-disabled btn-normal" disabled="true">已售罄</button>
                        </div> 
                    </div>
                    <!-- </div> -->
                </template>

                <!-- 公会礼包:成员，TT礼包：成员/会长 -->
                <template v-else>
                    <div class="item-desction">

                        <!-- <div class="item-title"> -->
                            <div :class="{'item-name':!detail,'detail-item-name':detail}">{{gift.gift_name}}</div>
                        <!-- </div> -->

                        <!-- 可领取 -->
                        <div v-if="!tao">
                            <div class="item-addition" v-if="gift_kind == 1">
                                <span>消耗 {{gift.price}} 红钻</span>
                            </div>
                            <div class="item-process">
                                <div class="item-processing">
                                    <span class="progressbar color-green">
                                        <span :style="{ 'left': remained.val +'%' }"></span>
                                    </span>
                                </div>
                                <div class="item-precessend">
                                    <span>{{remained.txt+' '+remained.val}}%</span>
                                </div>
                            </div>
                        </div>

                        <!-- 可淘号 -->
                        <div v-else>
                            <div class="item-addition">
                                <span>已淘 {{gift.sa}} 次
                                </span>
                            </div>
                        </div>
                    </div>

                        <div class="item-button">

                            <!-- 可领取 -->
                            <div v-if="!tao">      
                                <div v-if="remained.val">
                                    <button v-if="!receive_flag" class="btn-green-frame btn-normal" @click.stop.prevent="onReceive">领取</button>
                                    <button v-if="receive_flag" class="btn-receiving btn-normal">领取中…</button>
                                    <!-- <button v-if="!receive" class="btn-green-disabled btn-normal">已领取</button> -->
                                </div>  
                                <div v-else>
                                    <button class="btn-green-disabled btn-normal" disabled="true">已售罄</button>
                                </div>                        
                            </div>

                            <!-- 可淘号 -->
                            <div v-else>                            
                                <button v-if="!receive_flag" class="btn-yellow-frame btn-normal" @click.stop.prevent="onReceive">淘号</button>
                                <button v-else class="btn-getting-number btn-normal">淘号中…</button>
                            </div>

                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '../../store/dispatch/gift-center';
    import guild_store from '../../store/dispatch/guild-shop';
    import success_modal  from "./success-modal.vue"; // 礼包
    import { centerFetchTTGift , centerNotify , centerGiftGuildList , centerGiftDetail } from '../../store/actions/gift-center.js'
    import { currentGuildGiftId } from '../../store/actions/guild-shop.js'
    import { ruleCurrenId } from '../../store/actions/guild-star'
    import { stopDoubleClick , linkToZone , jumpLink , formatPercent , modalData , linkToMission , showToast , imageView }  from "../../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
                receive_flag:false
            }
        },
        props: ['gift','kind','position','detail'],
        computed: {
            //可领取，剩余百分比
            remained() {
                let gift = this.gift
                let val = formatPercent(gift.remained,gift.total)
                return {
                    val:val,
                    txt:val === 100 ? '剩' : '仅剩'
                }
            },
            is_president(){
                let vue_this = this
                // return vue_this.user.guild_identity === '会长'
                return store.state.data.user.purchase_rights == 1
            },
            typeStr(){
                return this.gift.type == 1 ? '礼包':'激活码'
            },
            gift_kind() {
                return this.kind // 礼包来源：1 TT礼包，2 公会礼包
            },
            gift_type() {
                return this.gift.type // 礼包类型: 1为激活码，2为游戏礼包
            },
            tao() {
                return this.gift.tao == 1 // 是否淘号：true淘号, false领取
            },
            received() {
                // return !this.gift.receive 
                let vue_this = this
                let fI = store.state.data.gift_center.fetch_info
                return fI.gift_id == vue_this.gift.gift_id && fI.kind == vue_this.kind && vue_this.detail
            },
            pur() {
                // return this.gift.purchase_right
            },
            user() {
                return store.state.data.user
            },
            icon() {
                return imageView(this.gift.gift_icon,112,112)
            }

        },
        methods: {
             openGame(package_name,gid){
                if(myWebview.isInAppFunc()){
                    myWebview.startGameByPackage(package_name)
                }else{
                    linkToZone(gid)
                }
            },
            /*TT领取 || 公会领取*/
            onReceive(){
                let vue_this = this
                if(vue_this.gift_kind == 1){
                    vue_this.onTTReceive()
                }else{
                    vue_this.onGuildReceive()
                }
                $$('.modal').on('close',()=>{vue_this.receive_flag = false})
            },

            /*tt
                领取/淘号 vue_this.gift.tao false/true
                激活码/礼包 vue_this.gift_kind 1/2
            */
            onTTReceive(){
                let vue_this = this
                if(vue_this.tao) {
                    vue_this.receive_flag = true
                    vue_this.ttFetch()  // 发送领取/淘号请求
                }
                else{
                    modalData({
                        title:'确认领取',
                        text:'领取该'+vue_this.typeStr+'需要消耗 '+vue_this.gift.price+' 红钻，确定继续领取吗？',
                        closed_txt:'取消',
                        click_txt:'确定'
                    }, ()=>{
                        // 当前用户红钻数量低于礼包价格
                        if(vue_this.user.diamond < vue_this.gift.price){
                            let text = ''
                            vue_this.diamondDefi()
                        }else{
                            if(stopDoubleClick(vue_this)){
                                vue_this.receive_flag = true
                                vue_this.ttFetch()  // 发送领取/淘号请求
                            }
                        }
                    })
                }
            },
            
            /*领取公会礼包*/
            onGuildReceive(){
                let vue_this = this

                // 未加入公会
                if(!vue_this.user.guild_id){                    
                    modalData({
                        title:' ',
                        text:'加入公会才能领取该礼包哦，赶紧去看看哪些公会有这个礼包出售吧~',
                        closed_txt:'算了',
                        click_txt:'去看看'
                    },()=>{
                        // 根据礼包查公会
                        centerGiftGuildList(store,{gift_id:vue_this.gift.gift_id},function(){
                            myApp.redictNewPage('index-gift-guild-page',false,false)
                        })
                    })
                    return
                }
                console.log(vue_this.gift.gift_id)
                // 所在公会有礼包
                if(vue_this.gift.have){                    
                    modalData({
                        title:' ',
                        text:'<p>太棒啦！你的公会里有该礼包哦~</p><p>快去公会商店里领取把！</p>',
                        click_txt:'去看看',
                        closed_txt:'取消'
                    },()=>{
                        // 跳转公会商店商品详情
                        currentGuildGiftId(guild_store,{gift_id:vue_this.gift.guild_gift_id},function(){
                            myApp.redictNewPage('index-store-detail-page',false,true)
                        })
                    })
                    return
                }

                // 所在公会没有礼包
                modalData({
                    title:' ',
                    text:'你的公会里还没有该礼包~快去通知会长来申请吧！',
                    click_txt:'通知会长',
                    closed_txt:'取消'
                },()=>{        
                    if(stopDoubleClick(vue_this)){  
                    let obj = {
                        gift_name:vue_this.gift.gift_name,
                        gift_id:vue_this.gift.gift_id
                    }                      
                        centerNotify(store,obj,()=>{
                            showToast('已通知会长')
                        })  // 通知会长
                    }           
                })
            },

            // 发送领取/淘号请求
            ttFetch() {
                /* 请求，领取礼包/激活码，
                   变更红钻总额
                   礼包领取状态*/                   
                let vue_this = this
                let obj = {
                    tao:vue_this.gift.tao, //是否淘号
                    gift_id:vue_this.gift.gift_id
                }
                
                // tt礼包/激活码
                centerFetchTTGift(store,obj,(res)=>{     
                    if(res.record.gift_list && res.record.gift_list.length){
                        vue_this.receiveSuccess(res.content)
                    }                    
                    else{
                        vue_this.fetchFail()
                    }
                })
                setTimeout(()=>{
                    vue_this.receive_flag = false
                },1500)
            },

            /*会员红钻不足*/
            diamondDefi(){
                var vue_this = this
                modalData({
                    title:'领取失败',
                    text:'你的红钻不足，领取失败，赶紧去做任务领红钻吧~',
                    closed_txt:'我知道了',
                    click_txt:'去做任务'
                }, ()=> { linkToMission() })
            },

            /*************
                领取/淘号成功
                礼包 res{
                        password:密码
                        exchange:账号
                    }
                激活码 res{
                        account:兑换码
                    }
            *************/
            receiveSuccess(res){
                var vue_this = this
                let _title = vue_this.tao ? '淘号成功' : '领取成功'

                const proSuc = new Promise((resolve, reject)=> {
                    setTimeout(()=>{
                        modalData({
                            title: _title,
                            text:'',
                            closed_txt:'关闭',
                            click_txt:'打开游戏'
                        },()=>{
                            let gid = vue_this.gift.gid
                            let package_name = vue_this.gift.package_name
                            vue_this.receive_flag = false
                            myApp.closeModal()
                            // if(myWebview.checkGameInstalled(gid)){
                            //     myWebview.gameStartById(gid)
                            // }else{
                            //     linkToZone(gid)
                            // }
                            vue_this.openGame(package_name,gid)
                        })
                        resolve()
                    },500)
                })

                proSuc.then(()=>{
                    //挂载成功组件数据
                    $$('.modal').on('close',()=>{vue_this.receive_flag = false})

                    $$('.modal-inner').append('<div id="mount-modal"></div>')
                    $$('.modal').css('marginTop','-110px')
                    const sucModal = new Vue(success_modal)
                    sucModal.tao = vue_this.tao //传props:tao
                    sucModal.$mount('#mount-modal') //挂载成功的弹框
                })
            },

            /*会员领取礼包失败*/
            fetchFail(){
                let vue_this = this
                let _title = ''
                let _txt = ''

                vue_this.receive_flag = false

                if(vue_this.tao){
                    _title = '淘号失败'
                    _txt = '已经没有可用的序列号了'
                }else{
                    _title = '领取失败'
                    _txt = '很遗憾，' + vue_this.typeStr + '在你领取的瞬间被抢光啦，赶紧去淘号试试运气吧！'
                }
                myApp.modal({
                    title: _title,
                    text: _txt,
                    buttons:[
                        {
                            text:'我知道了',
                            close:true,
                            onClick: function() {
                                vue_this.receive_flag = false
                            }
                        }
                    ]
                })
            },

            onApply(){
                let vue_this = this
                let query = {
                    gift_id: vue_this.gift.gift_id,
                    gift_name: vue_this.gift.gift_name,
                    price: vue_this.gift.price,
                    remained: vue_this.gift.remained
                }
                // 跳转到申请公会礼包页面 保留本页面state
                myApp.redictNewPage('index-gift-apply-page', false, false,true,true,query)
            },

            toDetail(){
                let vue_this = this
                if(!vue_this.detail){
                    let obj={
                        position:vue_this.position,
                        kind:vue_this.kind,
                        gift_id:vue_this.gift.gift_id
                    }
                    centerGiftDetail(store,obj,function(){                    
                        // 跳转到礼包详情页
                        myApp.redictNewPage('index-gift-detail-page', false, false)
                    })
                }
            }
        },
        mounted () {}
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    .list-block.media-list .item-fetch-row .item-media{
        padding-top: 0;
        padding-bottom: 0;
    }
    .list-block.media-list .item-inner{
        padding-top: 5px;
        padding-bottom: 6px;
    }
    .list-block.media-list .item-fetch-row{
        height: 69px;
        // padding-top: 5px;
        // padding-bottom: 5px;
    }
    .detail-head .list-block.media-list.common-list .item-content li:last-child .item-inner{
        border-bottom: none;
    }
    .item-addition,.item-process{
        line-height: 17px;
    }
    .list-block.media-list.common-list .item-content .item-block .item-fetch-row .item-desction .item-title{
        margin-bottom: 0;
    }

    //领取中
    .btn-receiving{
        border:1px solid #1ed282;
        background-color: #fff;
        border-radius: 2px;
        font-size: 12px;
        color: #1ed282;
        opacity: 0.5;
    }
    .btn-normal{
        padding: 0;
    }
    .btn-green-disabled{
        .btn-green-disabled();
    }

    /*.list-block.media-list.common-list .item-content .item-block .item-fetch-row .item-desction .item-name{
        max-width: 100%;
        font-size: 14px;
    }*/

    .list-block .item-name{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
         max-width: 100%;
        font-size: 14px;
    }
    .detail-item-name{        
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        max-width: 100%;
        font-size: 14px;
        -webkit-box-orient: vertical;
    }
    .list-block.media-list .detail{
         .item-fetch-row{
            height: 89px;
        }
    }

</style>
<template>

    <div class="detail-head" id="detail-head">
                        <gift-list
                                :list="gift"
                                :kind="kind"
                                :detail="true"></gift-list>
        <div v-if="hasCode" class="list-block media-list common-list store-search-list">
            <ul>
                <li class="item-content">
                    <div class="item-list">
                        <div href="#" class="copy-root" v-if="gift_list.length&&list.type!=3&&list.type!=6">
                            <div class="copy-container" v-for="item in gift_detail_list"><div class="copy-container-content">{{item}}</div> <button class="btn-green-guild btn-big">复制</button></div>
                            <p class="copy-tip">兑换码已保存至“我的宝箱”，请尽快使用，否则将进入淘号</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    import store from '../../store/index';
    import { formatPercent } from '../../api/computed.js';
    import { stopDoubleClick , linkToZone , modalData , showToast }  from "../../api/computed.js";
    import { centerFetchTTGift , centerNotify , centerGiftGidList , centerGiftDetail } from '../../store/actions/gift-center.js';
    import gift_list  from "../gift-commponents/gift-list.vue"; // 礼包

    export default {
        data() {
            return {
                img_path:'assets/img/',
                isLast:true,
                isReceiving:false,
                receive_flag:false
            }
        },

        props:['list','gift_list','fetch_info','user'],

        components: {
            'gift-list': gift_list
        },
        methods: {
        },
        computed: {
            cost_price(){
                if(this.kind==1){
                    return this.list.price+'红钻';
                }
                else{
                    return this.list.price+'贡献值';
                }
            },
            percent(){
                return formatPercent(this.list.remained,this.list.total);
            },
            percent_bar(){
                return parseFloat(this.percent)-100;
            },
            kind(){
                return store.state.data.gift_center.gift_detail.kind;
            },
            gift() {
                let vue_this = this
                let res = []
                if(vue_this.kind==1){
                    res.push(vue_this.list);
                }
                else{
                    res.push(vue_this.list);  
                }

                return res
            },
            hasCode(){
                if(store.state.data.gift_center.fetch_info.gift_list.length==0){
                   return false; 
                }
                else{
                   return true;
                }
            },
            fetch_info(){
                return store.state.data.gift_center.fetch_info
            },
            gift_detail_list(){
                let detail_list=[];
                let exchange_type = this.fetch_info.exchange_type          
                if( exchange_type == 1){
                    detail_list[0]='兑换码：'+this.fetch_info.gift_list[0];
                }
                else if( exchange_type == 2){
                    detail_list[0]='账号：'+this.fetch_info.gift_list[0];
                    detail_list[1]='密码：'+this.fetch_info.gift_list[1];
                }           
                return detail_list;
            }
        },
        mounted() {
            $$("#progress-bar").css("-webkit-transform","translate3d(30%, 0px, 0px)").css("transform","translate3d("+this.percent_bar+"%, 0, 0)").css("-webkit-transform","translate3d("+this.percent_bar+"%, 0, 0)");
            
            if(this.fetch_info.kind==this.fetch_info.gift_id)
            {
                this.isLast=true;
            }    
            else{
                this.isLast=false;
            }
        },
        updated() {
            // let that=this;
            //     if(that.gift_list.length==2){
            //     that.gift_detail_list[0]='账号：'+that.gift_list[0];
            //     that.gift_detail_list[1]='密码：'+that.gift_list[1];
            //     }
            //     else{
            //         that.gift_detail_list[0]='兑换码：'+that.gift_list[0];
            //     }
            // return this.gift_detail_list; 

        }
    }
</script>

<style lang="less" scoped>
    
    @import url('../../../assets/less/varsbank.less');
    .store-search-list{
        .copy-root{
            overflow:hidden;
            .copy-tip{
                margin:12px 16px;
                font-size:12px;
                color: #9E9E9E;
            }
        }
        .btn-received{ border:none; background: #E2E2E2; text-align:center; border-radius: 2px; font-size: 12px; color: #9e9e9e; width: 56px; height: 24px; line-height: 24px; display:inline-block;}

        //领取中
        .btn-receiving{ border:1px solid #1ed282; background: none; text-align:center; border-radius: 2px; font-size: 12px; color: #1ed282; width: 56px; height: 24px; line-height: 26px; display:inline-block;}
        .copy-container span{}
        .copy-container p{
            display:inline-block;
            width:174px;
            padding:8px 0;
        }
    }
</style>
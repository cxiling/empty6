<template>
    <div id="benefits-list" v-if="isBefint">
        <h2>福利活动</h2>
        <ul>
            <li @click="to_lottery" v-if="rechargeLotto">
                <div class="item-content">
                    <div class="header lottery-info">
                        <i class="icon-lottery"></i>
                    </div>
                    <div class="benefits-info">
                        <h3>充值抽奖100%中奖！</h3>
                        <p>累计充满{{rechargeLotto.charge}}元即可抽奖{{rechargeLotto.time}}次</p>
                    </div>
                </div>
                <div class="icon-r">
                    
                </div>
            </li>
            <li v-if="firstRecharge">
                <div class="item-content" @click="purchase">
                    <div class="header first-info">
                        <i class="icon-first"></i>
                    </div>
                    <div class="benefits-info">
                        <h3>{{firstRecharge.charge}}元首充号</h3>
                        <p>红钻价格：<span>{{firstRecharge.diamond}}</span> | 请在{{firstRecharge.time_end | format-time}}前兑换</p>
                    </div>
                </div>
                <div class="icon-r">
                    
                </div>
            </li>
            <li @click="new_gift" v-if="newerGift">
                <div class="item-content">
                    <div class="header gift-info">
                        <i class="icon-gift"></i>
                    </div>
                    <div class="benefits-info">
                        <h3>{{newerGift.title}}</h3>
                        <p>{{newerGift.desc}}</p>
                    </div>
                </div>
                <div class="icon-r">
                    
                </div>
            </li>                        

        </ul>
    </div>
</template>


<script>
    import store from '../../store/dispatch/game-area'
    import { updateUserDiamond , fetchGameGifts } from '../../store/actions/game-area'
    import { jumpLink , showToast }  from "../../api/computed.js";
    export default {
        name: 'benefits_list',
        // replace: false,
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props:['zone'],
        computed: {
            rechargeLotto(){
                const rechargeLotto = this.zone.game.lotto_profile
                if(_.isEmpty(rechargeLotto)){
                    return null
                }else{
                    return this.zone.game.lotto_profile
                }
            },
            firstRecharge(){
                const firstRecharge = this.zone.game.game_first_charge
                if(_.isEmpty(firstRecharge)){
                    return null
                }else{
                    return this.zone.game.game_first_charge
                }
            },
            newerGift(){
                const newerGift = this.zone.game.giftpkg_profile
                if(_.isEmpty(newerGift)){
                    return null
                }else{
                    return this.zone.game.giftpkg_profile
                }
            },
            isBefint(){
                return this.rechargeLotto || this.firstRecharge || this.newerGift
            }
        },
        components: {
          
        },
        methods: {
          to_lottery(){
                let url;
                let gid = this.zone.status.current_game.gid;
                if (window.location.host.search('app.52tt.com') >= 0){
                    url = "http://app.52tt.com/project/recharge_lotto/index.html?gid="
                } else {
                    url = "http://192.168.9.230/project/recharge_lotto/index.html?gid="
                } 
                let link = url + gid;
                jumpLink(link);
            },
            new_gift(){
                if(!this.newerGift.has_fetched){  
                    fetchGameGifts(store);
                }
                else{
                    showToast("你已领取！");       
                }
            },
            purchase(){
                // this.$dispatch('update-diamond')
                updateUserDiamond(store)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less');
    #benefits-list{
        background: @color-Cw;
        margin-bottom: 8pt*@pt;
        h2{
            text-align:center;
            height: 44px;
            line-height:44px;
            margin:0;
            font-size: @size-T4;
            color: @color-Cfg;
        }
        ul{
            li{
                align-items:center;
                display: flex; 
                justify-content:space-between;
                padding:0 16pt*@pt;
                height:72pt*@pt;
                border-top:1px solid #e8ecee;
                .item-content{ 
                    display: flex; 
                    align-items:center;
                    .header{
                        width:40pt*@pt;
                        height:40pt*@pt;
                        margin-right:10pt*@pt;
                        border-radius: 50%;
                        .flexbox();
                        .align-items(center);
                        .justify-content(center);
                    }
                    .lottery-info{
                        background: @color-Ciyellow;
                        .icon-lottery{
                            display: block;
                            width:24px;
                            height:24px;
                            .icon-game-lottery(@color-Cw);
                            // background: url('@{image-url}icon_game_lottery.png') no-repeat;
                            background-size: 100% 100%;
                        } 
                    }
                    .first-info{
                        background: @color-Cired;
                         .icon-first{
                            display: block;
                            width:24px;
                            height:24px;
                            .icon-game-first(@color-Cw);
                            // background: url('@{image-url}icon_game_first_number.png') no-repeat;
                            background-size: 100% 100%;
                        } 
                    }
                    .gift-info{
                       background: @color-Cinew;
                        .icon-gift{
                            display: block;
                            width:24px;
                            height:24px;
                            .icon-game-gift(@color-Cw);
                            // background: url('@{image-url}icon_game_gift.png') no-repeat;
                            background-size: 100% 100%;
                        } 
                    }
                    .benefits-info{
                        h3{
                            margin:0 0 2pt*@pt 0;
                            color:#263A43;
                            font-size:15pt*@pt;
                            font-weight: normal;
                        }
                        p{
                            color:#93999E;
                            span{
                                color:#ff6084;
                            }
                        }
                    }
                }
                .icon-r{ 
                    .icon-forward(#dee2e4); 
                    width:8pt*@pt; 
                    height:14pt*@pt;
                }
                &.active-state{
                    background: @color-Cbg2;
                }
            }
        }
    }
</style>


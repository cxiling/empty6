<template>
    <form class="index-gift-apply-page" @submit="onSubmit($event)">
        <h2 class="index-gift-apply-page-h">申请购买</h2>
        <p class="index-gift-apply-page-tit" v-text="query.gift_name"></p>
        <p class="index-gift-apply-page-grey">单价 {{query.price}} 公会贡献</p>
        <div class="list-block">            
            <div class="item-input">
                <span v-text="'购买个数'" class="index-gift-apply-page-placeholder" :class="{show:!ipt,hide:ipt}" @click="handlePlaceholder"></span>
                <input v-model="num" @input="onInput" type="text" id="ipt" @blur="blur">
            </div>
        </div>
        <p class="index-gift-apply-page-grey">共需 <span class="index-gift-apply-page-red">{{total}}</span> 公会贡献，剩余贡献: {{consume}}</p>
        <button type="submit" class="index-gift-apply-page-btn btn-green btn-small" :disabled="!num || num == 0">申请购买</button>
    </form>
</template>

<script>
    import store from '../store/dispatch/gift-center';
    import { centerPurchase } from '../store/actions/gift-center.js'
    import { showToast , formatParmters , modalData , jumpLink}  from "../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/',
                disabled:true,
                num:null,
                ipt:false,
                cb:null,
                query:{}
            }
        },
        computed: {
            // query(){
                /*简单粗暴获取上个页面传来的query
                    query = {
                        gift_id: , 
                        gift_name: ,
                        price: 该礼包单价
                    }
                */
                /*if($$('#index-gift-apply-page')&&
                        $$('#index-gift-apply-page')[0]&&
                        $$('#index-gift-apply-page')[0].f7PageData)

                return $$('#index-gift-apply-page')[0].f7PageData.query*/
                
                // 找不到query就返回null
                // return null
            // },
            consume() {
                return store.state.data.user.guild_consume
            },
            total() {
                let vue_this = this
                return vue_this.num * vue_this.query.price
            }
        },
        methods: {       
            onSubmit(e){
                e.preventDefault();
                let vue_this = this;
                // let pur = true;
                let obj = {
                    gift_id:vue_this.query.gift_id,
                    number:vue_this.num
                }

                // 申请失败 礼包不足 弹框
                if(vue_this.query.remained < vue_this.num){       
                    // pur = false;
                    modalData({
                        title:'申请失败',
                        text:'礼包数量不足或已下架，请尝试调整购买数量或购买其它礼包',
                        closed_txt:'我知道了'
                    })
                    return;
                }

                // 申请失败 贡献不足 弹框
                if(vue_this.total > vue_this.consume){      
                    // pur = false;
                    modalData({
                        title:'申请失败',
                        text:'公会贡献不足，请调整购买数量重新申请购买',
                        closed_txt:'我知道了'
                    })
                    return
                }
                    
                // 申请接口
                centerPurchase(store,obj,function(res) {
                    // 申请成功弹框
                    let succeed = {
                            title:'申请成功',
                            text:vue_this.num + ' 个 ' + vue_this.query.gift_name + ' 已经放进你的公会仓库啦~',
                            closed_txt:'我知道了',
                            click_txt:'去上架'
                        }
                    if(res == "OK"){                            
                        //返回上一页
                        mainView.router.back()
                        let cb =  myApp.onPageAfterBack("index-gift-apply-page", function(page){
                            // if(pur){                           

                                modalData(succeed,function(){
                                    //跳转到仓库
                                    jumpLink('tt://repository_manage/1')
                                })
                            // }
                        })  
                        setTimeout(()=>{
                            cb.remove()
                        },500)              
                    }
                })

            },
            handlePlaceholder(){
                let vue_this = this
                vue_this.ipt = true
                $$('#ipt').focus()
            },
            onInput(e){
                e.preventDefault();
                let vue_this = this;  
                let remained = vue_this.query.remained
                let n = e.target.value.replace(/[^0-9]/g,'')
                if(n > 9999){
                    n = 9999
                }
                vue_this.num = n
                
            },
            blur(){
                let vue_this = this
                if(vue_this.num === '' || vue_this.num === null){
                    vue_this.ipt = false
                }
            }
        },
        mounted () {            
            let vue_this = this
            myApp.onPageBeforeAnimation('index-gift-apply-page', function (page) {
                vue_this.query = page.query
            })
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../assets/less/varsbank.less'); 

.index-gift-apply-page{
    background-color: #fff;
    height: 100%;
    padding: 16px;
    text-align: center;
    &-h{
        font-size: 18px;
        font-weight: normal;
        color: #303030;
        margin-bottom: 4px;
    }
    &-tit{
        .d_t_content_main();
    }
    &-grey{
        .d_t_content_sub();
        margin-top: 4px;
    }
    .item-input{
        position: relative;
        height: 50px;
    }

    input{
        position: absolute;
        top: 0;
        z-index: 2;
        text-align: center;
        background-color: @color-Cbg;
    }

    &-placeholder{
        .d_t_textfield_preset();
    }


    &-red{
        color:@color-Cred;
    }

    &-btn{
        display: block;
        width: 100%;
        margin-top: 19px;
        height: 44px;
        &:disabled{
            opacity: 0.5;
        }
    }
    .list-block{
        margin-top: 30px;
        margin-bottom: 15px;
    }
    .btn-green{ 
        border:none; 
        background: #1ED282; 
        border-radius: 2px; 
        color:#fff;
        font-size: 14px; 
        color: #FFFFFF;
    }
    .show{        
        width: 100%;
        z-index: 3;
        text-align: center;
        position: absolute;
        line-height: 43px;
        top: 0;
        left: 0;
        .d_t_textfield_preset();
    }
    .hide{
        z-index: 1;
    }

}

</style>
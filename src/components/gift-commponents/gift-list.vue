<template>
    <div class="gift-list">

            <div class="list-block media-list common-list" v-if="list.length !== 0">
                <!-- 礼包列表 -->                
                <ul class="item-content">
                    <li v-for="(item,index) in list">
                        <!-- <div class=""> -->
                            
                            <!-- <div class="item-list"> -->
                                    <!-- gift:单个礼包信息
                                         kind:礼包来源：1 TT礼包， 2 公会礼包
                                        position:详情页入口位置(首页 'home'，搜索页 'search', 游戏找礼包 'game')
                                        detail:( 当前页面是详情页 true ) -->
                                    <gift-tt-package
                                                :gift="item" 
                                                :kind="kind"
                                                :position="position || 'home'"
                                                :detail = "detail || false"></gift-tt-package>
                            <!-- </div> -->
                        <!-- </div> -->
                    </li>
                </ul>
            </div>

        <template v-else>
            <div class="gift-list-empty" v-text="empty || '暂无相关礼包'"></div>
        </template>

    </div>
</template>

<script>
    import gift_tt_package  from "./gift-tt-package.vue"; // 礼包
    import { showToast , formatParmters , jumpLink}  from "../../api/computed.js";

    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props: ['list','empty','kind','position','detail','user'],
        computed: {
        },
        methods: {
        },
        components: {
            "gift-tt-package" : gift_tt_package
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
@import url('../../../assets/less/varsbank.less'); 

.gift-list{
    .list-block{
        margin: 0;
    }
    
    &-empty{
        text-align: center;
        color: @color-Cgreyl;
        margin-top: 50%;
    }
    .list-block.media-list.common-list .item-content{
        margin-bottom: 0;
    }

    
    //已领取
    .btn-green-disabled{
        .btn-green-disabled()
    }

    .list-block ul.item-content{
        border-bottom: none;
        border-top: none;
    }

}
    
</style>
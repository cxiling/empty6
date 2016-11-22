<template>
   <div class="store-search" id="store-search" @click="linkSearch">
        <form 
            class="searchbar">
            <div class="searchbar-input">
                <input type="search" placeholder="输入商品关键字搜索" readonly="true">
                <a href="#" class="searchbar-clear"></a>
             </div>
            <div class="searchbar-button">
                <a href="#" class="searchbar-submit button">搜索</a>
            </div>
        </form>
   </div>
</template>

<script>
    import store from '../../store/dispatch/guild-shop'
    import { stopDoubleClick } from '../../api/computed.js'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            forum() {
                return store.state.data.forum
            }
        },
        methods: {
            linkSearch(){
                if(!stopDoubleClick(this,300)) return false
                myApp.redictNewPage('index-store-search-page', false, false)
            }
        },
        mounted () {
            
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #store-search{
        // padding: 10px 16px;
        .searchbar{
            height: 32px;
            padding: 0;
            background: @color-Cbg;
            border-radius: 4px;
            .searchbar-input{
                .flexbox();
                .justify-content(center);
                input[type="search"]{
                    width: auto;
                    font-size: @size-T2_2;
                    background-color: @color-Cbg;
                    margin-left: 28px*2;
                } 
            }
            .searchbar-button{
                display: none;
            }
            //公会商店搜索框
            &.active-shop{
                border-radius: 0;
                background: @color-Cw;
                .searchbar-input{
                    .flexbox();
                    .justify-content(flex-start);
                    flex:1;
                    input[type="search"]{
                        background-color: @color-Cw;
                        margin-left: 16px;
                    }
                }
                .searchbar-button{
                    display: block;
                    margin-right: 16px;
                }
                .searchbar-submit{
                    margin-right: 0 !important;
                    display: block;
                    .btn-serach();
                }
            }
            &:after{
                background: none;
            }
        }
    }
</style>
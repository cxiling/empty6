<template>
   <div class="search-page">
        <form class="searchbar searchbar-form">
            <div class="searchbar-input">
                <input type="search" :placeholder="placeholder" >
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
        //传递需要显示的内置搜索关键词
        props: ['placeholder'],
        
        computed: {

        },
        methods: {

        },
        mounted () {
         
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    .search-page{
        width: 100%;
        .searchbar{
            border-radius: 0;
            background: @color-Cw;
            .justify-content(space-between);
            .searchbar-input{
                .flexbox();
                .align-items(center);
                .justify-content(space-between);
                width: 80%;
                flex: auto;
                input[type="search"]{
                    background-color: @color-Cw;
                    // margin-left: 16px;
                }
                .searchbar-clear{
                    display: block;
                    margin: 6px;
                    width: 16px;
                    height: 16px;
                    background-size: 100% 100%;
                }
            }
            .searchbar-button{
                .searchbar-submit{
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
<template>

    <div class="no-container" id="no-guild-container">
        <div class="not-start" id="no-content">
            <p class="words" v-if="msg.tip">{{msg.tip}}</p>
            <p class="words" v-else>暂无数据</p>
            <a href="#" class="btn-green-frame btn-nodata-link" 
            @click="linkPage(msg.info.pageName)" v-if="msg.info.title">
            {{ msg.info.title }}</a>
        </div>
    </div>

</template>

<script>
    // import store from '../../store/index';

    export default {
        data() {
            return {
                img_path:'assets/img/'
            }
        },

        props:['msg'],
        
        methods: {
            linkPage(page){
                myApp.redictNewPage(page, true, false) //只带上头部navbar
            }
        },
        computed: {

        },
        mounted() {

        }
    }
</script>

<style lang="less">
    
    @import url('../../../assets/less/varsbank.less');
    #no-guild-container{
        position: relative;
        // height: 100%;
        width: 100%;
         #no-content{
            position: absolute;
            top: 120px;
            bottom: 0;
            margin: 0 auto;
            left: 0;
            right: 0;
            text-align: center;
            p{
                color: @d_gray_2;
                padding-bottom: 10px;
            }
            .btn-nodata-link{
                display: inline-table;
                padding: 8px 15px;
            }
        }
    }
    
</style>
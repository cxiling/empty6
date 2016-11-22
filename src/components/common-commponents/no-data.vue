<template>

    <div class="no-container" id="no-container">
        <div class="not-start" id="no-content">
            <p class="words" v-if="msg">{{msg}}</p>
            <p class="words" v-else>暂无数据</p>
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

        },
        computed: {

        },
        mounted() {

        }
    }
</script>

<style lang="less">
    
    @import url('../../../assets/less/varsbank.less');
    #no-container{
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
            }
        }
    }
    
</style>
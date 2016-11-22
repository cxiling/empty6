<template>
   <div class="buttons-row">
       <a @click="toggleTab(1)" class="button tab-link" :class="{active:active == 1}"> TT礼包</a>
        <a @click="toggleTab(2)" class="button tab-link" :class="{active:active == 2}"> 公会礼包</a>
   </div>
</template>

<script>
    import { showToast , formatParmters , jumpLink}  from "../../api/computed.js";

    export default{
        data() {
            return {

            }
        },
        props: ['toggleTab','active'],
        computed: {
        },
        methods: {
            
        },
        components: {
        },
        mounted () {
        }
    }
</script>
<style lang="less" scoped>
@import url('../../../assets/less/varsbank.less'); 

.buttons-row{
    background:@color-Cw;
    position: relative;
    border-bottom: @d_gray_6;
    &:after{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: auto;
        top: auto;
        height: 1px;
        width: 100%;
        background-color: @d_gray_6;
        display: block;
        z-index: 15;
       /* -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
        transform: scaleY(0.5);*/
    }
    .button{
        border:none;
        color:@color-Cb2;
        font-size:@size-T2_2;
        font-weight: bold;
        height: 44px;
        line-height: 44px;
        z-index: 16;
        &.active{
        color: @color-Cgreen;
        border-bottom: 2px solid @color-Cgreen;
      }
        &:first-child{
            border-radius: 0;    
        }
        &:last-child{
            border-radius: 0;    
        }
    }
}
    
</style>
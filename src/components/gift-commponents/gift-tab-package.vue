<template>
    <div class="buttons-row buttons-tab" id="button-container">
        <div class="buttons-content">
            <a @click="ttTab" href="#tab1" class="tab-link button" :class="addClass(1)">TT礼包</a>
            <a @click="guildTab" href="#tab2" class="tab-link button" :class="addClass(2)">公会礼包</a>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import store from '../../store/dispatch/gift-center';
    import { showToast , formatParmters , jumpLink}  from "../../api/computed.js";
    import gift_center_head from './gift-center-head.vue'
    export default{
        data() {
            return {
              gift_center:{}
            }
        },
        props:['info'],
        computed: {
             current_tab(){
                return store.state.data.gift_center.center_current.home.kind
            },
        },
        methods: {
            ttTab(){
                const vue_this = this
                vue_this.info.ttTab()
            },
            guildTab(){
                const vue_this = this
                vue_this.info.guildTab()
            },
            addClass(val){
              const vue_this = this
              const type = vue_this.current_tab
              return val === type  ? {'active':true} :{'':true}
            }
        },
        components: {

        },
        mounted () {
          const vue_this = this
        }
    }
</script>
<style lang="less" scoped>
@import url('../../../assets/less/varsbank.less'); 

#button-container{
  &.buttons-tab{
    background:@color-Cw;
    position: relative;
    border-bottom: @d_gray_6;
    height: 44px;
    // &:after{
    //     content: '';
    //     position: absolute;
    //     left: 0;
    //     bottom: 0;
    //     right: auto;
    //     top: auto;
    //     height: 1px;
    //     width: 100%;
    //     background-color: @d_gray_6;
    //     display: block;
    //     z-index: 15;
    //    /* -webkit-transform-origin: 50% 100%;
    //     transform-origin: 50% 100%;
    //     transform: scaleY(0.5);*/
    // }
    &:nth-child(1){
        display: none;
    }
    .buttons-content{
        .flexbox();
        width: 100%;
    }
     .button{
          border:none;
          box-sizing: border-box;
          height:44px;
          line-height: 46px;
          vertical-align: center;
          color:@color-Cb2;
          font-size:@size-T2_2;
          font-weight: 800;
          &.active{
              color:@color-Cgreen;
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
}

    
</style>
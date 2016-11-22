<template>
  <div class="page-content" v-if="rule_title">
      <div id="rules-container">
          <div class="header"> 
              <div class="name-box"> <!--v-if--> 
                  <h1 class="rules-name" id="rules-name" v-html="rule_title"></h1><!--v-if--> 
                  <p class="rules-subname" id="rules-subname" ></p> 
              </div> 
          </div>
          <div id="rules-content">
            <div v-html="rule_content"></div> 
          </div>
          <div class="rules-footer"> 
              <img alt="" src="http://app.52tt.com/marketing/classs/assets/img/logo-bottom.png"> 
              <span>最终解释权归TT所有</span> 
          </div>
      </div>
  </div>
</template>

<script>
    import store from '../store/dispatch/guild-star';
    import { stopDoubleClick , formatParmters } from '../api/computed.js';
    import { ruleInit } from '../store/actions/guild-star';
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            rule_content() {
                return store.state.data.guild_star.rule.bodyText
            },
            rule_title(){
              return store.state.data.guild_star.rule.pageTitle
            }
        },
        methods: {
            
        },
        mounted () {

            const vue_this = this //7147
            const page_id = store.state.data.current.page_id?store.state.data.current.page_id:formatParmters().pageId
            const obj ={
              pageId:page_id
            }
            ruleInit(store,obj,function(){
                $$('title').text(vue_this.rule_title) 
            })

        }
    }
</script>
<style lang="less">
    @import url('../../assets/less/varsbank.less');  
      #index-common-rules-page{
        .page-content{
          padding-bottom: 0;
        }
        /*CMS规则页*/
        #rules-container{
          position:relative;
          background-color:#fff;
          max-width:100%;
          font-size:12px;
          a{
            display:block;
            box-sizing: border-box;
          }
          p{
            img{
              width: 100%;
              height:auto;
            }
          }
          img{
            max-width: 100%;
            height:auto;
            display: block;
          }

          .header{
            height:100px;
            .flexbox();
            .justify-content(space-between);
            .align-items(center);
            text-align: center;
            background-image: url("http://activity.52tt.com/media/1330/rules_bg.jpg");
            background-repeat: repeat;
            background-size: auto 100%;
          }

          .name-box{
            margin:auto;
            width: 80%;
            text-align: center;
          }

          h1.rules-name{
            color:#FFAF18;
            font-weight:500;
          }
          .rules-subname{
            color:#fff;
          }

          .rules-container{
            padding: 0 16px 16px;
            line-height: 20px;
            text-align: left;

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
              color: #5e5e5e;
              margin: 9px 0;
              border: 1px solid #ddd;
              text-align: center;
              tr{
                border-top:1px solid #ddd;
                &:nth-child(1){
                  border:none;
                }
                &:nth-child(odd){
                  background-color: #f9f9f9;
                }
              }
              td{
                word-break: keep-all;
                white-space:nowrap;
                padding:5px;
                vertical-align: middle;
                border-left:1px solid #eee;
                &:nth-child(1){
                  border:none;
                }
              }
              .text-bold{
                font-weight:bold;
              }
              img{
                margin: auto;
                width: 27.5px;
                display: block;
              }
            }
          }

          .rules-title{
            color: #0bb75b;
            margin: 48px 0 6px;
            font-size: 14px;
          }
          .tips{
            color: #0bb75b;
          }

          .text-btn{
            font-size: 16px;
            background-color: #1ed282;
            color: #fff;
            border-radius: 5px;
            display: block;
            text-align: center;
            padding: 8px 0;
            &.active-state{
              .transition(300ms);
              opacity: 0.8;
            }
          }
          .tt-btn{
            color: #0bb75b;
          }
          .rules-footer{
            // border-top: 1px solid #ececec;
            display: block;
            margin-top: 24px;
            text-align: center;
            // background-color: #fafafa;
            img{
              display: block;
              margin: 20px auto 12px;
              height: 23px;
            }
            span{
              display: block;
              padding-bottom: 20px;
              font-size: 11px;
              color: #acacac;
            }
          }

        }
        #rules-content{
          padding: 12px;
        }
    }
  
</style>
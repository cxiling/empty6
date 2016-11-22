<template>
   <div class="index-guild-devote-page">
        <div class="page-content pull-to-refresh-content infinite-scroll" :style="store_height()">
            <div class="pull-to-refresh-layer">
              <div class="preloader"></div>
              <div class="pull-to-refresh-arrow"></div>
            </div>
            
            <ul class="devote-page-list tab active">
                <li v-for="item in list" @click="toMemberCard(item.guild_id,item.uid,item.acount)">
                    <img class="header" :src="urlHead+item.uid" />
                    <div class="devote-content-detail" >
                        <p class="title">
                            <span :class="{guild_identity_limit:guild_identity==1}" class="title-content">{{item.name}}</span>
                            
                            <template v-if="guild_identity==1">
                                <img  :src="'http://obsiq8rn7.bkt.clouddn.com/member_small_stare_'+item.member_level+'.png?imageView2/1/'" />
                                <span  class="other-tag" v-if="item.guild_title">{{item.guild_title}}</span>
                            </template>                       
                        </p>
                        <p class="detail">
                            <span v-if="guild_identity==1">消费额：{{item.buy}}</span>
                            <template v-if="guild_identity!=1">
                                <img  :src="'http://obsiq8rn7.bkt.clouddn.com/member_small_stare_'+item.member_level+'.png?imageView2/1/'" />
                                <span  class="other-tag" v-if="item.guild_title">{{item.guild_title}}</span>
                            </template>  
                         </p>   
                    </div>
                    <button v-if="item.guild_identity==1" class="devote-position" 
                    :class="filterIdentey(item.guild_identity)">{{item.guild_identity | format-identity}}</button>
                </li>
            </ul>
        </div>
        <div class="guild-item-title toolbar"><p>最近30天({{thirty_days_ago}}-{{today_time}})贡献加成成员名单</p></div>
   </div>
</template>

<script>
    import store from '../store/dispatch/guild-star';
    import { stopDoubleClick,thirtyDaysAgo,showToast,jumpLink,filterIdentey } from '../api/computed.js';
    import { additional_list } from '../store/actions/guild-star';
    export default{
        data() {
            return {
                img_path:'assets/img/',
                thirtyDaysAgo:'',
                thirtyDaystoday:'',
                obj:{},
                urlHead:'http://api.52tt.com/face?uid='
            }
        },
        computed: {
            list() {
                return store.state.data.guild_star.additional.list
            },
            server_time(){
                return store.state.data.guild_star.additional.server_time
            },
            thirty_days_ago(){
                let server_time=store.state.data.guild_star.additional.server_time;
                return thirtyDaysAgo(server_time);
            },
            today_time(){
                let server_time=store.state.data.guild_star.additional.server_time;
                return thirtyDaysAgo(server_time,true);
            },
            guild_id(){
                return store.state.data.user.guild_id;
            },
            guild_identity(){
                return store.state.data.user.guild_identity;
            }
        },
        methods: {
            filterIdentey(type){
                return filterIdentey(type)
            },
            store_height(){
                const cheight = $$('body').height()+44
                return {'height':cheight+'px'}
            },
            toMemberCard(guild,uid,acount){
                if(this.guild_identity!=1){
                    return;
                }
                if(store.state.data.user.guild_id!==guild){
                    showToast("该成员已退出公会");
                }
                else{
                    jumpLink("tt://member_card_name/"+guild+"/"+uid+"/"+acount);
                }
            }
        },
        mounted () {
            
            let ptrContent = $$('.pull-to-refresh-content');
            let loadFlag = false

            // additional_list(store,{},function(){
            //     console.log('loading');  
            // })
            setTimeout(function(){
                myApp.pullToRefreshTrigger(ptrContent)
            },300)
            
            myApp.initPullToRefresh(ptrContent);
            myApp.attachInfiniteScroll(ptrContent);

            ptrContent.on('refresh',function(e){
                additional_list(store,{},function(){
                    console.log('loaded');  
                },true)
            })
            //监听页面上拉刷新
            ptrContent.on('infinite', function () {
                 //加载中，避免重复触发
                if(loadFlag) return;
                loadFlag = true;
                additional_list(store,{},function(){
                    console.log('loaded');  
                })
                console.log('loading');  
            })
            
        }
    }
</script>
<style lang="less" scoped>
    .index-guild-devote-page{
        .page-content{
            padding-top: 33px;
            // margin-bottom: -44px;
        }
        .devote-page-list{
            background:#fff;
            padding-left:16px;
            margin-bottom:45px;
            // margin-top:24px;
            li{
                padding:12px 16px 12px 0;
                border-bottom:1px solid #F0F0F0;
                display:flex;
                display: -webkit-box;
                display: -ms-flexbox;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                align-items:center;
                justify-content:space-between;
                -ms-flex-pack: justify;
                -webkit-justify-content: space-between;
                align-items:center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                -webkit-align-items: center;
                    img.header{
                        border-radius: 4px;
                        width:44px;
                        height:44px;
                        margin-right:12px;
                    }
                    .devote-content-detail{
                        flex:1;
                        -webkit-box-flex:1;
                        .title{
                            font-size: 14px;
                            color: #303030;
                            letter-spacing: 0px;
                            display: -webkit-box;
                            display: -ms-flexbox;
                            display: -webkit-flex;
                            display: flex;
                            -webkit-box-align: center;
                            -ms-flex-align: center;
                            -webkit-align-items: center;
                            align-items: center;
                             max-width:180px;
                            
                        }
                        .title-content{ overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
                        .guild_identity_limit{ max-width:80px; margin-right:4px;}
                        img{ margin-right:0px; width:28px; height:14px;}
                        .other-tag{ padding:0 2px; margin:0 0 0 4px; height:16px;width:auto; font-size:12px; display:inline-block;background: #8DB5EF;border-radius: 2px; color:#fff; text-align:center; }    
                        .detail{
                            font-size: 12px;
                            color: #9E9E9E;
                            display: -webkit-box;
                            display: -ms-flexbox;
                            display: -webkit-flex;
                            display: flex;
                            -webkit-box-align: center;
                            -ms-flex-align: center;
                            -webkit-align-items: center;
                            align-items: center;
                        }
                    }
                    .devote-position{ border: 1px solid #9771FF;height:17px; line-height:15px; border-radius: 2px; color:#9771FF; background:none;}
                &:last-child{border-bottom:none;}
            }
        }
        .guild-item-title{
            position:absolute;
            left:0;
            top:0;
            z-index:100;
            height: 30px;
            line-height: 30px;
        }
    }
</style>
<template>
    <div id="guild-list" v-if="game_hotguild_list.length">
        <h2>已入驻公会</h2>
        <ul>
            <li class="ripple" @click="toGuild(val.id)" v-for="(val,index) in game_hotguild_list.slice(0,3)">
                <a href="" class="item-link">
                    <div class="item-content">
                        <div class="header">
                            <img :src="val.icon_url">
                        </div>
                        <div class="benefits-info">
                            <div class="item-info">
                                 <h3>{{val.name}}</h3>
                                 <span>LV{{val.level}}</span>
                            </div>
                            <div class="item-desc">
                                <p>{{val.descption}}</p>
                                <p v-if="val.short_id">ID {{val.short_id}}</p>
                                <p v-else>ID {{val.id}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="item-button">
                       <div class="item-btn">
                            <div href="" class="link-btn active" v-if="val.id === guild_id">
                                <span>进入</span>
                            </div>
                            <div href="" class="link-btn" v-else>
                                <span>加入</span>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
            <li class="more" v-if="game_hotguild_list.length >= 3" @click="toGuildList">
                <a href="">查看全部</a>
            </li>
        </ul>
    </div>
</template>


<script>
    import store from '../../store/dispatch/game-area'

    export default {
        name: 'guild_list',
        replace: false,
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props:['zone'],
        computed: {
            game_hotguild_list(){
                return this.zone.game.game_hotguild_list.list
            },
            guild_id(){
                return this.zone.game.profile.guild_id;
            },
            gid(){
                return this.zone.game.status.gid;
            },
            name(){
                return this.zone.game.profile.name;
            }
        },
        components: {
          
        },
        methods: {
            toGuild(val){
                myWebview.jumpGuild(val)
            },
            toGuildList(){
                myWebview.jumpGuildList(this.name,this.gid)
            }
        }
    }
</script>

<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less');
    #guild-list{
        margin-bottom: 6pt;
        background: @color-Cw;
        h2{
            text-align:center;
            height: 44px;
            line-height:44px;
            margin:0;
            font-size: @size-T4;
            color: @color-Cfg;
        }
        ul{
            li{
                a.item-link{
                    .flexbox();
                    .align-items(center);
                    .justify-content(space-between);
                    padding:0 16pt*@pt;
                    height:80px;
                    border-top:1px solid #e8ecee;
                    &.active-state{
                        background: @color-Cbg2;
                        .link-btn{
                            color:@color-Cup;
                            border:1px solid @color-Cup;
                            .transition(300ms);
                            &.active{
                                color:@color-Cyellow2;
                                border:1px solid @color-Cyellow2;
                                .transition(300ms);
                            }
                        }
                    }
                }
                .item-content{ 
                    width: 85%;
                    overflow: hidden;
                    .flexbox();
                    .align-items(center);
                    .header{
                        width:56px;
                        height:56px;
                        margin-right:16px;
                        img{
                            display: block;
                            width: 100%;
                            border-radius: 5px;
                        }
                    }
                    .benefits-info{
                        flex:1;
                        overflow: hidden;
                        margin-right: 16px;
                        .item-info{
                            .flexbox();
                            .align-items(center);
                           h3{
                                padding: 0;
                                margin: 0;
                                color:#263A43;
                                font-size: @size-T4;
                                font-weight: normal;
                            } 
                            span{
                                display: block;
                                margin: 0;
                                height: 14px;
                                line-height: auto;
                                padding: 0 6px;
                                margin-left: 5px;
                                border:1px solid @color-Ciyellow;
                                color: @color-Ciyellow;
                                font-size: @size-T1;
                                border-radius: 3px;
                            }
                        }
                        .item-desc{
                             p{
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                color:#93999E;
                                span{
                                    color:#ff6084;
                                }
                            }
                        }
                       
                    }
                }
                .item-button{
                    .flexbox();
                    .align-items(center);
                    // width: 80px;
                    .item-btn{
                        .link-btn{
                            // padding: 8pt*@pt 20pt*@pt;
                            display: block;
                            text-align: center;
                            height: 24px;
                            width: 56px;
                            line-height: 24px;
                            border: 1px solid @color-Cinew;
                            border-radius: 3pt*@pt;
                            color: @color-Cinew;
                            &.active-state{
                                color:@color-Cup;
                                border:1px solid @color-Cup;
                                .transition(300ms);
                            }
                            &.active{
                                color:@color-Ciyellow;
                                border: 1px solid @color-Ciyellow;
                                &.active-state{
                                    color:@color-Cyellow2;
                                    border:1px solid @color-Cyellow2;
                                    .transition(300ms);
                                }
                            }
                        }
                    }
                }
            }
            li.more{
                .flexbox();
                .align-items(center);
                .justify-content(center);
                height: 40pt*@pt;
                background:@color-Cmore;
                a{
                    display: block;
                    color:#1ed282;
                    font-size:13pt*@pt;
                }
                 &.active-state{
                    background:@color-Cbg2;
                }
            }
        }
    }
</style>


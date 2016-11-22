<template>
    <div id="head" class="head">
        <div class="icon-wrapper">
             <img :src="icon" alt="">
        </div>
        
        <div class="after">
            <div class="game-info">
                <div class="name">{{name}}</div>
                <div class="info">
                    <div class="item">
                        <span class="num">{{focus | format-number(4,'万') }} </span><span class="it">玩伴</span></div>
                    <div class="item">
                        <span class="num">{{topic_total | format-number(4,'万') }}个 </span><span class="it">话题</span>
                    </div>
                </div>
                <div v-if="have_package_url && install_times > 0" class="install-number">
                    <span  class="num">{{install_times | format-number(4,'万') }}人 </span><span class="it">安装</span>
                </div>
                <div v-else class="install-number">
                    <span class="num">&nbsp;</span>
                </div>

            </div>

            <a @click="toCircle" class="circle-button">
                <div class="text">进入游戏圈</div>
            </a>
        </div>
    
    </div>
</template>

<script>
    import store from '../../store/dispatch/game-area'

    export default {
        name: 'head',
        data(){
            return {
                img_path:'assets/img/',        
            }
        },
        props:['zone'],
        computed: {
            //游戏名称
            name(){
                return this.zone.game.profile.name;
            },
            //游戏图标
            icon(){
                return this.zone.game.profile.icon;
            },
            //关注人数（玩伴）
            focus(){
                return this.zone.game.profile.focus;
            },
            //话题数
            topic_total(){
                return this.zone.game.profile.topic_total;
            },
            //安装次数（=下载次数）
            install_times(){
                return this.zone.game.profile.download_total;
            },
            //下载链接(默认显示下载数量5000+，(新游戏)无下载链接时不显示下载数量)
            have_package_url(){
                return this.zone.game.status.packageUrl ? true : false;
            },

        },
        components: {
            
        },
        methods: {
            //跳转游戏圈
            toCircle(){
                let uri = this.zone.game.circle.uri;
                myWebview.appNav(uri);
            }
        }
            
    }
</script>

<style lang="less" scoped>
  @import url('../../../assets/less/varsbank.less');

  #head{
    background: @color-Cw;
    height: 80pt*@pt;
    padding: 0 16pt*@pt;
    margin-bottom: 8pt*@pt;
    .flexbox();
    
    .icon-wrapper{
        .flexbox();
        .align-items(center);
        img{
            border-radius: 4px;
            -webkit-border-radius:4px;
            width: 56pt*@pt;
            height:56pt*@pt;
        }
        
    }
    .after{
        display:block;
        flex:1;
        -webkit-flex:1;
        .flexbox();
        .justify-content(space-between);
        .align-items(center);

        .game-info{
            padding-left: 16pt*@pt;
            .name{
                padding-bottom: 2pt*@pt;
                color:@color-Cfg;
                font-size: 15pt*@pt;
            }
            .num{
                color:@color-Cinew;//数字颜色            
            }
            .it{
                color:@color-Csub;//文字颜色
            }          
            .info{
                padding-bottom: 2pt*@pt;
                font-size: 12pt*@pt;
                .flexbox();

                .item{
                    &:nth-child(1){
                        padding-right: 7px;
                    }
                    &:nth-child(2){
                        position: relative;
                        padding-left: 7px;
                    }
                    &:nth-child(2):before{
                        content: "";
                        display: inline-block;
                        position: absolute;
                        left: 0;
                        top: 2px;
                        bottom: 2px;
                        width: 1px;
                        height: auto;
                        background-color: @color-Csub;
                    }

                }
            }
            .install-number{
                font-size: 12pt*@pt;
            }

        }

        .circle-button{
            box-sizing: border-box;
            height: 24pt*@pt;
            width:  74pt*@pt;
            border: 1px solid @color-Cupload;
            border-radius: 2px;
            -webkit-border-radius: 2px;
            color: @color-Cupload;
            font-size: 12pt*@pt;
            .flexbox(); 
            .align-items(center);
            .justify-content(center);
            .text{
                margin:auto;
                display: block;
            }
            &.active-state{
                color:@color-Cup;
                border:1px solid @color-Cup;
                .transition(300ms);
            }
        }
    }
  }
</style>
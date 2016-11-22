<template>
    <div class="toolbar gamedown-toolbar" id="gamedown-toolbar">
        <div class="toolbar-inner">
            <div class="down-container">
                <div class="download-game">
                    <a href="" class="link-load" @click="download(item.status_order)" :class="status.css">
                        <span class="proccess-show" v-if="status.types == 'long'">
                            {{status.text}}
                            ({{status.size}})
                        </span>
                        <span class="proccess-show" v-else>
                            {{status.text}}
                        </span>
                        <span class="proccess-down" :style="{'width':status.progress+'%'}"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../../store/dispatch/game-area'
    import { updateCurrentGameState , setUserFollowState , setUserFollowStateOnly , updateUserDiamond , deleteGuildRecruit , updateGuildRecruit } from '../../store/actions/game-area'
    export default {
        computed: {
            status(){
                //按钮文案
                const status = this.item
                const types = this.type ? this.type : 'long'
                let buttonStatus = {
                    text: '立即安装',
                    css: 'status-installed',
                    progress: status.download_progress,
                    size:status.package_size,
                    types:this.type,
                    url:status.activity_url
                };

                if (status.packageUrl){
                    //已经安装
                    if(status.installed == 'true'){
                        if(types == 'long'){
                            buttonStatus.text = '打开游戏'
                            buttonStatus.css = 'status-installed'
                        }else {
                            buttonStatus.text = '打开'
                            buttonStatus.css = 'status-installed'
                        }
                    }
                    else if(status.downloading == 'true'){ //正在下载

                        if(types == 'long'){
                            buttonStatus.text = status.download_progress + '%, 暂停下载'
                            buttonStatus.css = 'status-loading'
                        }else {
                            buttonStatus.text = '暂停'
                            buttonStatus.css = 'status-loading'
                        }

                    }else {
                        if(status.repeat_download == 'true'){ //可以重试
                            if(types == 'long'){
                                buttonStatus.text = '继续下载'
                                buttonStatus.css = 'status-loading'
                            }else {
                                buttonStatus.text = '继续'
                                buttonStatus.css = 'status-loading'
                            }
                        }else if(status.download_total > 0){ //有人安装,我也可以安装
                            if(types == 'long'){
                                //buttonStatus.text = status.download_total + '人已安装，我也安装'
                                buttonStatus.text = '立即安装'
                                buttonStatus.css = 'status-download'
                            }else {
                                buttonStatus.text = '安装'
                                buttonStatus.css = 'status-download'
                            }
                        }else{ //无人安装,我来安装
                            if(types == 'long'){
                                buttonStatus.text = '立即安装'
                                buttonStatus.css = 'status-download'
                            }else {
                                buttonStatus.text = '安装'
                                buttonStatus.css = 'status-download'
                            }
                        }
                    }
                }else{ 
                    //没有安装包
                    //可以关注就关注
                    buttonStatus.types = 'sort'
                    if(status.h5_game){
                        if(types == 'long'){
                            buttonStatus.text = '打开游戏'
                            buttonStatus.css = 'status-installed'
                        }else {
                            buttonStatus.text = '打开'
                            buttonStatus.css = 'status-installed'
                        }
                    }
                    else if (status.follow == 0){
                        if(types == 'long'){
                            buttonStatus.text = status.focus + '人已关注，我也关注'
                            buttonStatus.css = 'status-unfocus'
                        }else {
                            buttonStatus.text = '关注'
                            buttonStatus.css = 'status-unfocus'
                        }
                    }else{
                        if(types == 'long'){
                            buttonStatus.text = status.focus + '人已关注'
                            buttonStatus.css = 'status-focused'
                        }else {
                            buttonStatus.text = '已关注'
                            buttonStatus.css = 'status-focused'
                        }
                    }
                }
                //新增优先预约状态判断
                if(status.status_order){
                    buttonStatus.types = 'sort'
                    if(status.is_order){
                        buttonStatus.text = '已预约'
                        buttonStatus.css = 'status-order'                    
                    }else{
                        buttonStatus.text = status.order_times > 0 ? '立即预约 ('+status.order_times+'人已预约)'
                            : '立即预约'
                        buttonStatus.css = 'status-unorder'
                    }
                }
                return buttonStatus
            }
        },
        components: {
          
        },
        methods: {
            download(val){
                console.log('download-button event');
                //更新状态
                let changeStatus = this
                //获取当前状态
                const status = this.item
                const networkStatus = myWebview.checkNetworkStatus()
                const isInApp = myWebview.isInAppFunc()

                //定义监听upload更新
                const InterTime = function (){
                    if(changeStatus.status.progress >= 100){
                        window.clearInterval(InterInit)
                    }else{
                        //changeStatus.$dispatch('update-game-status')
                        updateCurrentGameState(store)
                    }
                }
                const InterInit = window.setInterval(InterTime,100)
                //传递在webview 恢复后调用的方法名
                //myWebview.callbackFunction("myWebview.webviewCallbackWhenRecover",[]);
                if(isInApp) {
                    if (status.packageUrl){
                        //已经安装
                        if(status.installed === 'true'){
                            myWebview.gameStartById(status.gid);
                        }
                        else if(status.downloading == 'true'){ //正在下载
                            myWebview.CancelDownloadGame(status.gid);
                        }else {
                            //传递在网络变化后调用的方法名
                            //myWebview.NetworkStatusChanged("myWebview.webviewCallbackWhenNetworkChange",[]);
                            if (networkStatus == 'MOBILE'){
                                myApp.modal({
                                    title: "温馨提示",
                                    text: "你可能不在wifi环境中，确定下载吗？",
                                    buttons: [
                                        {
                                            text: '取消',
                                            onClick: function () {
                                                window.clearInterval(InterInit)
                                            }
                                        },
                                        {
                                            text: '确定',
                                            color: 'green',
                                            onClick: function () {

                                                if(status.downloaded == 'true'){
                                                    myWebview.installGame(status.gid);
                                                }else {
                                                    myWebview.showToast("开始下载，可在【我】->【我的下载】中查看")
                                                    myWebview.downloadGame(status.gid)
                                                    //changeStatus.$dispatch('update-follow-status-only')
                                                    setUserFollowStateOnly(store)
                                                }
                                                window.setInterval(InterTime,300)        
                                            }
                                        }
                                    ]
                                });
                            }else if(networkStatus == 'UNAVAILABLE'){
                                myApp.networkErrorProcess()
                            }else{
                                //changeStatus.$dispatch('update-follow-status-only')
                                setUserFollowStateOnly(store)
                                if(status.downloaded == 'true'){
                                    myWebview.installGame(status.gid);
                                }else {
                                    myWebview.showToast("开始下载，可在【我】->【我的下载】中查看")
                                    myWebview.downloadGame(status.gid)
                                }

                            }
                        }
                    }
                    else{ //没有安装包
                        //是h5游戏
                        if(status.h5_game){
                            myWebview.appNavExternal(status.h5_game)
                        }//否则可以关注就关注
                        else if (status.follow == 0){
                            //changeStatus.$dispatch('update-follow-status')
                            setUserFollowStateOnly(store)
                        }
                    }

                } else {
                    window.clearInterval(InterInit)
                    myApp.downloadTT()
                }
                if(val){
                    //myApp.redictNewPage('index-game-apply-page', false, false)
                    if(status.url) jumpLink(status.url)
                }
            },
            trigger(){
                $$('.lottery-click').on('click',function(){
                    console.log('event trigger click ');
                    $$('#down-game').trigger('click');
                })
            }
        },
        compiled(){

        }
    }
</script>
<style lang="less">
   @import url('../../../assets/less/varsbank.less');
   .gamedown-toolbar{
        position: absolute;
        height: 100/2pt*@pt;
        .toolbar-inner{
            padding: 0;
            .down-container{
                width: 100%;
                .download-game{
                    a.link-load{
                        display: block;
                        height: 100/2pt*@pt;
                        line-height: 100/2pt*@pt;
                        text-align: center;
                        background: @color-Cupload;
                        .proccess-show{
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                            z-index: 11;
                            color: @color-Cw;
                            font-size: 14pt*@pt;
                        }
                        &.status-unorder{
                            background: @color-Cyellow;
                        }
                        &.status-order{
                            background:@color-Cgrey;
                            span{
                                color: @color-Cgreyl;
                            }
                        }
                        &.active-state{
                            opacity: 0.8;
                        }
                        .proccess-down{
                            .transition(300ms);
                            position: absolute;
                            height: 100/2pt*@pt;
                            z-index: 10;
                            display: block;
                            top: 0;
                            left: 0;
                            background:#a5a5a5;
                        }
                    }
                }
            }
        }
    }
</style>

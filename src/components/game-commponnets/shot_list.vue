<template>
    <div class="audio-contanet">
        <div class="swiper-container swiper-solt" id="swiper-container2">
            <ul class="swiper-wrapper">
                <template v-for="(val,index) in videoshot">
                    <li class="p-list swiper-slide" @click="linkVideo(val.url)" :style="filterImageWidth(val.type)">
                        <a href="#" class="link-href link-video" >
                            <img :style="filterImageWidth(val.type)" 
                            :data-src="filterImageType(val.snapshot,val.type)" class="lazy lazy-fadeIn" >
                        </a>
                    </li>
                </template>
                <template v-for="(val,index) in screenshot">
                    <li class="p-list swiper-slide" @click="linkPt(index)" :style="filterImageWidth(val.type)">
                        <a href="#" class="link-href" >
                            <img :style="filterImageWidth(val.type)"
                            :data-src="filterImageType(val.url,val.type)" class="lazy lazy-fadeIn" >
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>


<script>
    import store from '../../store/dispatch/game-area'
    import { swiperNav , photoViewList , filterWidth , showToast , filterImageWidth , filterImageType } from "../../api/computed.js";
    export default {
        name: 'shot_list',
        props:['zone'],
        computed: {
            summary(){
                return this.zone.game.summary
            },
            screenshot(){
                let screenshot = this.zone.game.summary.screenshot.list
                //筛选数组
                screenshot = photoViewList(screenshot)
                return screenshot
            },
            videoshot(){
                let video = this.zone.game.summary.video.list
                //筛选数组
                video = photoViewList(video)
                return video
            },
            shotList(){
                let path = []
                //遍历过滤
                this.screenshot.forEach(function(item,index){
                    path.push(item.url)
                })
                return path
            },
            videoList(){
                let path = []
                //遍历过滤
                this.videoshot.forEach(function(item,index){
                    path.push(item.url)
                })
                return path
            },
            tag(){
                return this.summary.tag
            }
        },
        components: {
          
        },
        methods: {
            linkPt(val){
                myApp.photoBrowserPage(val,this.shotList,1)
            },
            linkVideo(val){
                //showToast(val)
                if (myWebview.isInAppFunc()){
                    if (myApp.device.ios){
                        global.videoUrl = val
                        myApp.redictNewPage('video-play-page', false, false);
                    } else {
                        myWebview.videoPlayer(val);
                    }
                } else {
                    global.videoUrl = val
                    myApp.redictNewPage('video-play-page', false, false);
                    //myApp.downloadTT(true,'提示','想观看更多视频,立即下载TT吧!');
                }
            },
            swiperNac(){
                swiperNav('.swiper-solt','auto')
            },
            filterImageWidth(type){
                return filterImageWidth(type,220,152)
            },
            filterImageType(value,type){
                return filterImageType(value,type,220,152)
            }
        },
        mounted(){
            const vue_this = this
            setTimeout(function(){
                vue_this.screenshot.length && vue_this.swiperNac()
            },800)
        }
    }
</script>
<style lang="less" scoped>
      @import url('../../../assets/less/varsbank.less');
     .audio-contanet{
           margin-bottom: 10pt*@pt;
           ul{
            .flexbox();
            .align-items(center);
            li.p-list{
                min-height: 110pt*@pt;
                margin-right: 8px;
                &:last-child{
                    margin-right: 12pt;
                }
                &:first-child{
                    margin-left: 12pt;
                }
                a.link-href{
                    position: relative;
                    display: block;
                    background: @color-Cbg;
                    img{
                        background: @color-Cbg;
                        width: 100%;
                        display: block;
                    }
                    &.link-video:before{
                        content: "";
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: auto;
                        width: 30pt*@pt;
                        height: 30pt*@pt;
                        background: url('../@{image-url}icon_play.png');
                        background-size: 100% 100%;
                    }
                }
            }
           }
        }
</style>
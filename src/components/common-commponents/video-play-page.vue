<template>
    
    <div class="page-content">
        <div class="video-wrap">
            <video id="video-play" class="cf-video" controls>
                <source :src="sign_video" type="video/mp4">
                    <p class="vjs-no-js">
                        请升级您的浏览器以支持播放视频~
                    </p>
            </video>
        </div>
    </div>

</template>

<script>
    import store from '../../store/dispatch/game-area'
    import { photoViewList } from '../../api/computed.js' 
    export default {
        name: 'video-play-page',
        replace: true,
        data() {
            return {
                window_width: $$(window).width(),
                window_height: $$(window).height(),
            }
        },
        computed: {
            videoshot(){
                let video = store.state.zone.game.summary.video.list
                //筛选数组
                video = photoViewList(video)
                return video
            },
            sign_video() {
                let sign_video = global.videoUrl ? global.videoUrl : this.videoshot[0].url;
                return sign_video
            },
            video_width() {
                // return this.window_width;
                return this.window_width > this.window_height ? this.window_width : this.window_height;
            },
            video_height() {
                // return 'auto';
                return this.window_width > this.window_height ? this.window_height : this.window_width;
            }
        },
        methods: {
        },
    }
</script>

<style lang="less">
    @import url('../../../assets/less/varsbank.less');

    #video-play-page {
        
        .video-wrap {
            height: 100%;
            position: relative;
            background-color: #000;
            .flexbox();
            .align-items(center);
            .justify-content(center);
        }
        
        video, .cf-video {
            width: 100%;

            &.rotate-video {
                -webkit-transform-origin: left top;
                transform-origin: left top;
                .transform(rotate(90deg)); 
                position: relative;
                left: 100%;
            }
        }
    }
</style>
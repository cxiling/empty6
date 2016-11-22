<template>
    <div class="toolbar gamedown-toolbar" id="gamedown-toolbar" v-if="val.gid">
        <div class="toolbar-inner">
            <div class="down-container">
                <div class="download-game">
                    <a href="" class="link-load" @click="download(val)">
                        <span class="proccess-show" >
                           打开游戏
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

    import { linkToZone } from '../../api/computed.js'
    export default {
        props: ['val'],
        computed: {
            
        },
        methods: {
          download(val){
            const gid = val.gid ? val.gid : 0
            const package_name = val.package_name ? val.package_name : 0
            if(myWebview.isInAppFunc()){
                myWebview.startGameByPackage(package_name)
            }else{
                linkToZone(gid)
            }
          }
        },
        mounted(){

        }
    }
</script>
<style lang="less">
   @import url('../../../assets/less/varsbank.less');
   .gamedown-toolbar{

    }
</style>

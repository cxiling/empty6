<template>
   <div class="detail-game-button" @click="toZone()"><button class="btn-green-guild btn-large">打开游戏</button></div>
</template>

<script>
    import store from '../../store/index'
    import { linkToZone } from '../../api/computed.js';
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },

        props:['list'],

        computed: {
            forum() {
                return store.state.data.forum
            }
        },
        methods: {
            toZone(){
                const gid = this.list.gid
                const package_name = this.list.package_name 
                if(myWebview.isInAppFunc()){
                    myWebview.startGameByPackage(package_name)
                }else{
                    linkToZone(gid)
                }
                // let gid=this.list.gid;
                // linkToZone(gid);
            }
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    
</style>
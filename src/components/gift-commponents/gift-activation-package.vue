<template>
   <div class="gift-activation-package">gift-activation-package</div>
</template>

<script>
    import store from '../../store/index'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        computed: {
            forum() {
                return store.state.data.forum
            }
        },
        methods: {
            
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    
</style>
<template>
    <div class="index-gift-activation-page">
        <gift-activation-package></gift-activation-package>
    </div>
</template>

<script>
    import store from '../store/index'
    import gift_activation_package  from "./gift-commponents/gift-activation-package.vue"; // 激活礼包
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
        components: {
            "gift-activation-package" : gift_activation_package
        },
        mounted () {

        }
    }
</script>
<style lang="less" scoped>
    
</style>
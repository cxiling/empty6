<template>

    <div id="error-page" class="page-content">
        <div class="wrapper-block">
            <div class="content-block">
                <p>网络异常，请检查你的网络连接</p>
                <a @click="recovery" href="#" class="button reload-button">重新加载</a>
            </div>
        </div>
    </div>

</template>

<script>
    import store from '../store/index'
    export default {
        name: 'network-error',
        methods: {
            recovery(){
                mainView.router.back({
                    pageName: 'index',
                    animatePages: false
                })
                store.actions.initGoddessPost()
            }
        }
    }
</script>

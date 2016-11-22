<template>
   <div class="index-debug-api-page page-content">
          <div class="content-block-title">接口列表</div>
          <div class="list-block inset">
              <ul>
                  <li><a @click="commission_info" href="#" class="list-button item-link">佣金概览</a></li>
                  <li><a @click="drawing_record" href="#" class="list-button item-link">请求提现记录</a></li>
                  <li><a @click="gains_detail" href="#" class="list-button item-link">请求收益明细</a></li>
                  <li><a @click="update_profile" href="#" class="list-button item-link">更新个人信息</a></li>
                  <li><a @click="with_draw_cash" href="#" class="list-button item-link">提现</a></li>
              </ul>
          </div>
          <div class="content-block-title">佣金概览</div>
          <div>{{currentStore.gains | json}}</div>
          <div class="content-block-title">请求提现记录</div>
          <div>{{currentStore.gains.game_commission.drawing_record | json}}</div>
          <div class="content-block-title">请求收益明细</div>
          <div>{{currentStore.gains.game_commission.gains_detail | json}}</div>
          <div class="content-block-title">更新个人信息</div>
          <div>{{currentStore.user | json}}</div>
          <div class="content-block-title">提现</div>
          <div class="subnavbar sliding" style="transform: translate3d(0px, 0px, 0px);">
            <div class="buttons-row"><a href="#tab1" class="button tab-link">Tab 1</a><a href="#tab2" class="button tab-link">Tab 2</a><a href="#tab3" class="button tab-link active">Tab 3</a></div>
            </div>
          <div data-page="tabs-swipeable" class="page with-subnavbar page-on-center">
<div class="tabs-swipeable-wrap swiper-container swiper-container-horizontal swiper-container-android">
<div class="tabs swiper-wrapper" style="transition-duration: 0ms; transform: translate3d(-824px, 0px, 0px);">
<div id="tab1" class="page-content tab swiper-slide" style="width: 412px;">
<div class="content-block">
<p>This is tab 1 content</p>
<p class="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum mi quis felis scelerisque faucibus. Aliquam ut commodo justo. Mauris vitae pharetra arcu. Sed tincidunt dui et nibh auctor pretium. Nam accumsan fermentum sem. Suspendisse potenti. Nulla sed orci malesuada, pellentesque elit vitae, cursus lorem. Praesent et vehicula sapien, ut rhoncus quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vitae mi nec lorem aliquet venenatis quis nec nibh. Aenean sit amet leo ligula. Fusce in massa et nisl dictum ultricies et vitae dui. Sed sagittis quis diam sed lobortis. Donec in massa pharetra, tristique purus vitae, consequat mauris. Aliquam tellus ante, pharetra in mattis ut, dictum quis erat.</p>
<p>Ut ac lobortis lacus, non pellentesque arcu. Quisque sodales sapien malesuada, condimentum nunc at, viverra lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus eu pulvinar turpis, id tristique quam. Aenean venenatis molestie diam, sit amet condimentum nisl pretium id. Donec diam tortor, mollis in vehicula id, vehicula consectetur nulla. Quisque posuere rutrum mauris, eu rutrum turpis blandit at. Proin volutpat tortor sit amet metus porttitor accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut dapibus posuere dictum.</p>
</div>
</div>
<div id="tab2" class="page-content tab swiper-slide swiper-slide-prev" style="width: 412px;">
<div class="content-block">
<p>This is tab 2 content</p>
<p class="">Ut ac lobortis lacus, non pellentesque arcu. Quisque sodales sapien malesuada, condimentum nunc at, viverra lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus eu pulvinar turpis, id tristique quam. Aenean venenatis molestie diam, sit amet condimentum nisl pretium id. Donec diam tortor, mollis in vehicula id, vehicula consectetur nulla. Quisque posuere rutrum mauris, eu rutrum turpis blandit at. Proin volutpat tortor sit amet metus porttitor accumsan. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut dapibus posuere dictum.</p>
<p>Fusce luctus turpis nunc, id porta orci blandit eget. Aenean sodales quam nec diam varius, in ornare ipsum condimentum. Aenean eleifend, nulla sit amet volutpat adipiscing, ligula nulla pharetra risus, vitae consequat leo tortor eu nunc. Vivamus at fringilla metus. Duis neque lectus, sagittis in volutpat a, pretium vel turpis. Nam accumsan auctor libero, quis sodales felis faucibus quis. Etiam vestibulum sed nisl vel aliquet. Aliquam pellentesque leo a lacus ultricies scelerisque. Vestibulum vestibulum fermentum tincidunt. Proin eleifend metus non quam pretium, eu vehicula ipsum egestas. Nam eget nibh enim. Etiam sem leo, pellentesque a elit vel, egestas rhoncus enim. Morbi ultricies adipiscing tortor, vitae condimentum lacus hendrerit nec. Phasellus laoreet leo quis purus elementum, ut fringilla justo eleifend. Nunc ultricies a sapien vitae auctor. Aliquam id erat elementum, laoreet est et, dapibus ligula.</p>
</div>
</div>
<div id="tab3" class="page-content tab swiper-slide swiper-slide-active active" style="width: 412px;">
<div class="content-block">
<p>This is tab 3 content</p>
<p>Nulla gravida libero eget lobortis iaculis. In sed elit eu nibh adipiscing faucibus. Sed ac accumsan lacus. In ut diam quis turpis fringilla volutpat. In ultrices dignissim consequat. Cras pretium tortor et lorem condimentum posuere. Nulla facilisi. Suspendisse pretium egestas lacus ac laoreet. Mauris rhoncus quis ipsum quis tristique. Vivamus ultricies urna quis nunc egestas, in euismod turpis fringilla. Nam tellus massa, vehicula eu sapien non, dapibus tempor lorem. Fusce placerat orci arcu, eu dignissim enim porttitor vel. Nullam porttitor vel dolor sed feugiat. Suspendisse potenti. Maecenas ac mattis odio. Sed vel ultricies lacus, sed posuere libero.</p>
<p>Nulla gravida libero eget lobortis iaculis. In sed elit eu nibh adipiscing faucibus. Sed ac accumsan lacus. In ut diam quis turpis fringilla volutpat. In ultrices dignissim consequat. Cras pretium tortor et lorem condimentum posuere. Nulla facilisi. Suspendisse pretium egestas lacus ac laoreet. Mauris rhoncus quis ipsum quis tristique. Vivamus ultricies urna quis nunc egestas, in euismod turpis fringilla. Nam tellus massa, vehicula eu sapien non, dapibus tempor lorem. Fusce placerat orci arcu, eu dignissim enim porttitor vel. Nullam porttitor vel dolor sed feugiat. Suspendisse potenti. Maecenas ac mattis odio. Sed vel ultricies lacus, sed posuere libero.</p>
</div>
</div>
</div>
</div>
</div>

   </div>
</template>

<script>
    import guild_store from '../store/dispatch/guild-shop';
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
        updated () {
           
        },
        mounted(){

        }
    }
</script>
<style lang="less">
    .navbar-through {
        .page-content{
        padding-top: 0;
      }
    }
    .index-debug-api-page{
      height: 100%;
      overflow: auto;
      .button{
        background: green;
      }
    }
</style>
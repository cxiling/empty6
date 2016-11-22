<template>
   <div class="store-head-info navbar" id="store-head-info"> 
      <!-- v-if="normal_total.length" -->
       <div id="hide-content">
           <div class="head-content">
               <store-head :user_info="user_info"></store-head>
           </div>
           <!-- <div class="search-content">
               <store-search></store-search>
           </div> -->
       </div>
       <div class="sch-content" id="sort-content">
           <store-sort-list></store-sort-list>
       </div>
   </div>
</template>

<script>
    import store from '../../store/dispatch/guild-shop'
    import store_head  from "./store-head.vue"; // 公会搜索框
    import store_search  from "./store-search.vue"; // 公会搜索框
    import store_sort_list  from "./store-sort-list.vue"; // 公会商店分类
    import { filterOrderSortList } from '../../api/computed.js'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props: ['time'],
        computed: {
            user_info(){
              return store.state.data.user
            },
            normal_total(){
              return store.state.data.guild_shop.gift_total
            },
            gift_total(){
              const gift_total = store.state.data.guild_shop.gift_total
              const gift_filter_total = filterOrderSortList(gift_total)
              return gift_filter_total
            }
        },
        methods: {
            
        },
        components: {
            'store-head':store_head,
            'store-search': store_search,
            'store-sort-list': store_sort_list
        },
        mounted(){
          
        },
        updated(){
        }

    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #store-head-info{
        height: auto;
        background: @color-Cbg;
        &:after{
          background: @color-Cbg;
        }
        .head-content{
          // margin-bottom: 4px;
        }
        .search-content{
          padding: 12px 14px 4px;
          background: @color-Cw;
        }
        .sch-content{
          background: @color-Cw;
          // margin-bottom: 4px;
        }
    }   
</style>
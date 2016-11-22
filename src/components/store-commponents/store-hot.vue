 <template >
    <a href="#" class="item-link item-block" @click="storeList(val)">
        <div class="item-inner">
          <div class="item-fetch-row">
            <div class="item-desction">
                <div class="item-title">
                    <div href="" class="link-tag"> 
                        <span :class="filterTag">
                            {{ val.type | format-type(val.source) }}
                        </span>
                    </div>
                    <div class="item-name">
                        {{ val.gift_name }}
                    </div>
                </div>
                <div class="item-addition">
                    <span>消耗{{ val.price }}{{ val.currency | format-currency }}</span>
                </div>
                <div class="item-process">
                    <div class="item-processing">
                        <span data-progress="remained" class="progressbar color-green">
                            <span :style="{ 'left': remained +'%' }"></span>
                        </span>
                    </div>
                    <div class="item-precessend">
                        <span>{{ remained_txt }}%</span>
                    </div>
                </div>
            </div>
            <div class="item-button">
                <a href="" class="link-fetch button" 
                :class="filterFetchTag"
                @click.stop.prevent="linkFetch(val,user_info)">
                    <template v-if="val.status == 1">
                        {{ val.user_status | format-user-status }}
                    </template>
                    <template v-else> 
                        {{ val.status | format-status}}
                    </template>
                </a>
            </div>
          </div>
        </div>
    </a>
</template>

<script>
    import Vue from 'vue';
    import store from '../../store/dispatch/guild-shop'
    import { filterType ,filterCurrency , formatPercent , filterStatus , filterTag , filterFetchTag} from '../../api/computed.js'
    import { currentGuildGid } from '../../store/actions/guild-shop.js'
    import store_zone from './store-zone.vue'
    export default{
        data() {
            return {
                img_path:'assets/img/'
            }
        },
        props:['val','user_info'],
        computed: {
            filterFetchTag(){
                return filterFetchTag(this.val.status,this.val.user_status)
            },
            filterTag(){
                const type = this.val.type
                const source = this.val.source
                return filterTag(type,source)
            },
            remained(){
                const remained = this.val.remained
                const total = this.val.total
                const present = formatPercent(remained,total)
                return present
            },
            remained_txt(){
                const remained = this.val.remained
                const total = this.val.total
                const present = formatPercent(remained,total)
                return present > 10 ? ('剩余 '+ present) : (present > 0 ? '仅剩 '+ present : '仅剩 '+ 0)
                // return  present
            }
        },
        methods: {
            currery(val){
                return filterCurrency(val)
            },
            linkFetch(val){
                const store_zone_commont = new Vue(store_zone)
                const user_info = this.user_info
                store_zone_commont.linkFetch(val,user_info)
            },
            storeList(val){
                //参数传输
                const store_zone_commont = new Vue(store_zone)
                store_zone_commont.storeList(val)
            }
        },
        mounted () {
            //showToast(JSON.stringify(this.gift_hot_list))
        }
    }
</script>
<style lang="less" scoped>
    @import url('../../../assets/less/varsbank.less'); 
    #store-hot-list{
        
    }
</style>
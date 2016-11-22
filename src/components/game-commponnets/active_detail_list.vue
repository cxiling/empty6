<template>
    <ul v-if="items" class="activity-list">
        <li v-for="( item,index ) in items" class="activity-item">
            <h2 class="item-title">活动{{index + 1}}: {{item.activity_title}}</h2>
            <div 
                v-if="item.banner" 
                :style="{backgroundImage: 'url(' + item.banner + '?imageView2/0/w/640/h/160/format/jpg' + ')'}" 
                class="item-banner">
            </div>
            <p class="item-time">
                活动时间：{{item.time_begin | format-time('yyyy-MM-dd')}} ~ {{item.time_end | format-time('yyyy-MM-dd')}}
            </p>
            <p class="item-intro" v-html="item.offer_desc"></p>
            <p class="item-notes">{{item.offer_notes}}</p>
            <a @click="appNav(item.detail_href)" href="#" class="item-detail-link">查看详情>></a>
        </li>
    </ul>
</template>

<script>
    import store from '../../store/dispatch/game-area'
    import { jumpLink , filterImageWidth } from '../../api/computed.js'
    export default{
        name:'active-detail-list',
        props:['items'],
        computed:{
            currentGame(){
                //当前游戏
                const gid = store.state.active.status.current_game.gid
                return _.find(store.state.active.data.game, function(item){
                    return item.profile.gid == gid
                })
            },

        },
        methods: {
            appNav(uri){
                jumpLink(uri)
            }
        }
    }
</script>

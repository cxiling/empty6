import {
    USER_PROFILE_UPDATE,
    GUILD_CENTER_STAR_RULES,
    GUILD_CENTER_STAR_UPDATE,
    GUILD_CHANGE_CURRENT_PAGEID
} from '../mutation-types'

export const guildStarMutations = {
    //公会星级页面
    [GUILD_CENTER_STAR_UPDATE](state,data){
        if(data.hasOwnProperty('contribute')){
            state.data.guild_star.home.contribute.now_number = data.contribute.now_number ? data.contribute.now_number : state.data.guild_star.home.contribute.now_number;
            state.data.guild_star.home.contribute.additional = data.contribute.additional ? data.contribute.additional : state.data.guild_star.home.contribute.additional;
            state.data.guild_star.home.contribute.now_rate = data.contribute.now_rate ? data.contribute.now_rate : state.data.guild_star.home.contribute.now_rate;
            state.data.guild_star.home.contribute.now_start = data.contribute.now_start ? data.contribute.now_start : state.data.guild_star.home.contribute.now_start;
            state.data.guild_star.home.contribute.next_level_number = data.contribute.next_level_number ? data.contribute.next_level_number : state.data.guild_star.home.contribute.next_level_number;
            state.data.guild_star.home.contribute.next_level_rate = data.contribute.next_level_rate ? data.contribute.next_level_rate : state.data.guild_star.home.contribute.next_level_rate;
            state.data.guild_star.home.contribute.today = data.contribute.today ? data.contribute.today : state.data.guild_star.home.contribute.today;
            state.data.guild_star.home.contribute.month_before = data.contribute.month_before ? data.contribute.month_before : state.data.guild_star.home.contribute.month_before;
            state.data.guild_star.home.contribute.description = data.contribute.description ? data.contribute.description : state.data.guild_star.home.contribute.description;
        }
        if(data.hasOwnProperty('sign_number')){
            state.data.guild_star.home.sign_number.yesterday = data.sign_number.yesterday ? data.sign_number.yesterday : state.data.guild_star.home.sign_number.yesterday;
            state.data.guild_star.home.sign_number.today = data.sign_number.today ? data.sign_number.today : state.data.guild_star.home.sign_number.today;
        }
        if(data.hasOwnProperty('contribute_number')){
            state.data.guild_star.home.contribute_number.yesterday = data.contribute_number.yesterday ? data.contribute_number.yesterday : state.data.guild_star.home.contribute_number.yesterday;
            state.data.guild_star.home.contribute_number.today = data.contribute_number.today ? data.contribute_number.today : state.data.guild_star.home.contribute_number.today;
        }
        if(data.hasOwnProperty('enrollment_number')){
            state.data.guild_star.home.enrollment_number.yesterday = data.enrollment_number.yesterday ? data.enrollment_number.yesterday : state.data.guild_star.home.enrollment_number.yesterday;
            state.data.guild_star.home.enrollment_number.today = data.enrollment_number.today ? data.enrollment_number.today : state.data.guild_star.home.enrollment_number.today;
        }
        state.data.guild_star.home.level = data.level ? data.level : state.data.guild_star.home.level;
        state.data.guild_star.home.server_time = data.server_time ? data.server_time : state.data.guild_star.home.server_time;
        state.data.guild_star.rule.pageTitle = data.pageTitle ? data.pageTitle : state.data.guild_star.rule.pageTitle;
        state.data.guild_star.rule.bodyText = data.bodyText ? data.bodyText : state.data.guild_star.rule.bodyText;
        
        // if(data.hasOwnProperty('list')){
        //     state.data.guild_star.additional.list = data.list ? data.list : state.data.guild_star.additional.list;
        // }
         //贡献加成列表
        if(data.hasOwnProperty('list') && data.list.length){
            $$.each(data.list, function(index, item){
                if(!item) return false
                const findLastIndex = _.findLastIndex(state.data.guild_star.additional.list,function(obj){ //查找遍历活动的数据
                    return item.uid === obj.uid
                })
                if(findLastIndex !== -1){ //查找不到就更新数据
                    state.data.guild_star.additional.list.splice(findLastIndex,1,item)
                }else{ //存在就添加数据
                    state.data.guild_star.additional.list.push(item)
                }
            })
        }
        state.data.guild_star.additional.total = data.total ? data.total : state.data.guild_star.additional.total;
        state.data.guild_star.additional.server_time = data.server_time ? data.server_time : state.data.guild_star.additional.server_time;
    },

    //当前规则页
    [GUILD_CENTER_STAR_RULES](state,data){
        if(data.hasOwnProperty('pageTitle')){
            state.data.guild_star.rule.pageTitle = data.pageTitle
        }
        if(data.hasOwnProperty('bodyText')){
            state.data.guild_star.rule.bodyText = data.bodyText
        }
    },

    //当前pageid 
    [GUILD_CHANGE_CURRENT_PAGEID](state,data){
        state.data.current.page_id = data
    }

}

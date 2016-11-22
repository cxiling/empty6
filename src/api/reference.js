/*延时调用请求
//delayBounce(1000, function(){
    //执行请求,并清除队列,失败回滚
    voteRequest()
})()
 */
let delayBounceContainer
let delayBounce = function(idle, action){
    return function(){
        let ctx = this, args = arguments
        clearTimeout(delayBounceContainer)
        delayBounceContainer = setTimeout(function(){
            action.apply(ctx, args)
        }, idle)
    }
}

export const delayBounceAction = function(idle, action){
    function delayBounces(){
        let ctx = this, args = arguments
        clearTimeout(delayBounceContainer)
        delayBounceContainer = setTimeout(function(){
            action.apply(ctx, args)
        }, idle)
    }
    return delayBounces()
}

/*
    time, 时间为分钟计算 1 为一分钟
    obj 
    const limitHttp = delayTroateAction(1,obj)
    清空本地浏览器缓存
*/
let localShttp = localStorage.removeItem('httpList')
export const delayTroateAction = function(time,parmeter){

    if(!parmeter) parmeter = {}

    const minutes = time*60*1000*10
    const now = new Date().getTime();
    const httpList = localStorage.getItem('httpList')?JSON.parse(localStorage.getItem('httpList')) : []
    const findlastFn = findLast()
    let flag = true

    function findLast(){
        const findLastIndex = _.findLastIndex(httpList,function(obj){
            const key = Object.keys(parmeter)
            return _.isMatch(obj,parmeter)
        })
        if(findLastIndex !== -1){
            if(now - httpList[findLastIndex].server_time > minutes){
                httpList.slice(findLastIndex,1,parmeter)
                localStorage.setItem('httpList',JSON.stringify(httpList))
                return true
            }else{
                return false
            }
        }else{
            parmeter.server_time = now
            httpList.push(parmeter)
            localStorage.setItem('httpList',JSON.stringify(httpList))
            return true
        }
        
    }
    return findlastFn
}
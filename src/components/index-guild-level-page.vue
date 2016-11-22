<template>
   <div class="index-guild-level-page auto">
       <!-- <div class="toast-full show fadein"></div> -->
        
        <div class="level-top"> 
            
            <div class="circleProgress_wrapper">  
                <div class="wrapper_right">  
                    <div class="rightcircle">
                        <div class="circleProgress_r-parent"></div>
                        <div class="circleProgress_r">
                            
                        </div>  
                        <div class="circleProgress_r-sub"></div>
                    </div> 
                    <!-- <div class="circleProgress2 rightcircle2"></div> -->
                </div>  
                <div class="wrapper_left">  
                    <div class="leftcircle">
                        <div class="circleProgress_l-parent"></div>
                        <div class="circleProgress_l">
                            
                        </div> 
                        <div class="circleProgress_l-sub"></div>
                    </div>
                    <!-- <div class="circleProgress2 leftcircle2"></div> -->
                </div>
                <div class="brank-tag">
                    <h2>Lv.{{current_level}}</h2>
                    <p>公会总贡献值：{{total_contribute}}</p>
                    <p class="date-area">({{tiem_area}})</p>
                </div>
                <div class="start-node">
                    <div class="top"></div><div class="content"><span>{{current_level}}</span></div><div class="bottom"></div>
                </div>
                <div class="end-node">
                    <div class="top"></div>
                    <div class="content"><span>{{next_level}}</span></div>
                    <div class="bottom"></div>
                </div>
               <!--  <img class="level-logo" :src="'file:///android_asset/img/logo_tt.png'" /> -->
               <img class="level-logo" id="level-logo" :src="guildStarIcons" v-if="current_level > 0" /> 
                <div class="cover_left"></div>
                <div class="cover_right"></div>
            </div>
            <div class="circleProgress_attr">
                <p @click="toContirbute(1)" class="circleProgress_attr-l"><span class="yellow"></span><span class="contribute-tag">公会贡献值</span> </p>
                <p @click="toContirbute(2)" class="circleProgress_attr-r"><span class="orange"></span><span class="contribute-tag">额外贡献加成</span> </p>
            </div>
            <div class="level-status" @click="toDevote">
                <img class="status-icon" :src="img_path+'icon_bonus.svg'" />
                <p v-if="now_rate" class="status-text">获取<span>{{now_rate}}%</span>加成，已额外获得<span>{{data.contribute.additional}}</span>公会贡献</p>
                <p v-if="!now_rate" class="status-text-none">暂无获得额外加成贡献</p>
            </div>
        </div>
        <div class="level-bottom">
            <div class="info-head">
                <p class="info-head-add">今日新增贡献</p>
                <p class="info-head-num">{{today}}<span :class="{'falling' : isFall,'rising' : isRise}"></span></p>
                <p class="info-head-tag">前30天日均新增贡献:{{average_contribute}}</p>
            </div>
            <div class="info-detail">
                <div class="info-detail-l">
                    <p class="info-detail-today">今日入会人数</p>
                    <p class="info-detail-num">{{data.enrollment_number.today}}</p>
                    <p class="info-detail-yesterday">昨日：{{data.enrollment_number.yesterday}}人</p>
                </div>
                <div class="info-detail-c">
                    <p class="info-detail-today">今日签到人数</p>
                    <p class="info-detail-num">{{data.sign_number.today}}</p>
                    <p class="info-detail-yesterday">昨日：{{data.sign_number.yesterday}}人</p>
                </div>
                <div class="info-detail-r">
                    <p class="info-detail-today">今日捐献人数</p>
                    <p class="info-detail-num">{{data.contribute_number.today}}</p>
                    <p class="info-detail-yesterday">昨日：{{data.contribute_number.yesterday}}人</p>
                </div>
            </div>
        </div>
   </div>
   
</template>

<script>
    import store from '../store/dispatch/guild-star';
    import guild_store from '../store/dispatch/guild-shop';
    import { stopDoubleClick, thirtyDaysAgo, filterCenterGiftTotal , modalData , showToast , setBasePhoto} from '../api/computed.js';
    import { starInit,ruleCurrenId } from '../store/actions/guild-star';
    import { getShareData } from '../api/js_api.js';
    export default{
        data() {
            return {
                img_path:'assets/img/',
                // current:0.60,
                // currentExa:0.05,
                isRise:true,
                isFall:true,
                add_l:0,
                add_r:0,
                rotate_l:0,
                rotate_r:0,
                ago_time:'',
                old_guild_id:0
            }
        },
        computed: {
            data() {
                return store.state.data.guild_star.home;
            },
            contribute(){
                return this.data.contribute;  
            },
            today(){    //今日贡献
                return this.contribute.today;
            },
            month_before(){   //30天前当日贡献
                return this.contribute.month_before;
            },
            now_rate(){
                return this.data.contribute.now_rate;  
            },
            current_level(){ //当前等级数
                return store.state.data.guild_star.home.level
            },
            next_level(){  //下一等级数
                if(this.current_level<10){
                //this.next_level=this.current_level+1;
                    return this.current_level+1
                }
                else{
                    return this.current_level
                }
            },
            now_number(){
                return store.state.data.guild_star.home.contribute.now_number;
            },
            current(){
                let brank_val=this.contribute.next_level_number-this.contribute.now_start;
                let brank_current=this.contribute.now_number-this.contribute.now_start;
                let current=(brank_current/brank_val).toFixed(3);
                return current;
            },
            currentExa(){
                let brank_val=this.contribute.next_level_number-this.contribute.now_start;
                let brank_additional=this.contribute.additional;
                let currentExa=(brank_additional/brank_val).toFixed(3);
                return currentExa;
            },
            thirty_days_ago(){
                let server_time=store.state.data.guild_star.home.server_time;
                return thirtyDaysAgo(server_time);
            },
            local_pic(){
                return getShareData();
            },
            show_data(){
                const shareData = guild_store.state.data.share_data
                return shareData
            },
            user_info(){
                const user = guild_store.state.data.user
                return user
            },
            guild_id(){
                return store.state.data.user.guild_id;
            },
            guildStarIcons(){
                const guildStarIconsList = this.show_data.guildStarIcons
                const level = this.current_level
                const httpUrl = 'http://obsiq8rn7.bkt.clouddn.com/icon_guildnamecard_lv'+level+'_big.png?imageView2/1/w/356/h/316'
                //本地数据可以用使用icon 不可用使用httpurl
                const icon = guildStarIconsList.length 
                    ? filterCenterGiftTotal(guildStarIconsList,'level',level,'icon') : httpUrl
                const httpUrlPath = icon ? setBasePhoto(icon) : httpUrl
                return icon ? setBasePhoto(icon) : httpUrl
                //return httpUrl
                //showToast(icon)
            },
            total_contribute(){
                let total_contribute=this.data.contribute.additional+this.data.contribute.now_number;
                return total_contribute;
            },
            thirty_days_ago(){
                let server_time=store.state.data.guild_star.home.server_time;
                return thirtyDaysAgo(server_time);
            },
            today_time(){
                let server_time=store.state.data.guild_star.home.server_time;
                return thirtyDaysAgo(server_time,true);
            },
            yesterday_time(){
                let server_time=store.state.data.guild_star.home.server_time-24*60*60;//获取昨天的日期
                return thirtyDaysAgo(server_time,true);
            },
            average_contribute(){
                let average_contribute=Math.round(this.now_number/30);
                return average_contribute;
            },
            guild_identity(){
                return store.state.data.user.guild_identity;
            },
            tiem_area(){
                if(store.state.data.guild_star.home.contribute.description){
                    return store.state.data.guild_star.home.contribute.description;
                }
                else{
                    return this.thirty_days_ago+'-'+this.yesterday_time;
                }
            }
        },
        methods: {
            lazyImg(){                
                // 延迟图片加载
                setTimeout(function(){
                    myApp.initImagesLazyLoad('#index-guild-devote-page');
                },310)
            },
            toDevote(){
                if(!stopDoubleClick(this,300)|| !this.now_rate) return false
                myApp.redictNewPage('index-guild-devote-page')
                this.lazyImg()
            },
            starUpgrade(){
                myApp.toast(1,"<div>234</div>").show(true)
            },
            contributionRule(){
                const obj= 11656; 
                ruleCurrenId(store,obj,function(){
                    myApp.redictNewPage('index-common-rules-page',false,false)
                })
            },
            toContirbute(val){
                if(val==1){
                    modalData({
                        title:'公会贡献值说明',
                        text:'公会贡献值是指公会30天内公会成员签到和捐献所带来的贡献值总和~',
                        closed_txt:'我知道了'
                    })
                }else{
                    modalData({
                        title:'额外加成贡献值说明',
                        text:'额外加成贡献值是系统每天根据公会30天内成员在TT下载游戏充值以及在TT直播消费的金额之和核算加成的贡献值~',
                        closed_txt:'我知道了'
                    })
                }
            }
        },
        mounted () {
           let that=this;
           this.old_guild_id=this.guild_id;
           starInit(store,{},function(){
                console.log('loading');  
            })
           myApp.jumpRule=function(){
             that.contributionRule();
           }
           //myApp.jumpRule();
        },
        updated(){
            // starInit(store,{},function(){
            //     console.log('loading2');  
            // })
            // $$("#level-logo").attr('src', guildStarIcons);
            // showToast(JSON.stringify(this.guildStarIcons))
            let that=this;
            if(this.today-this.month_before>0){
                this.isRise=true;
                this.isFall=false;
            }
            else if(this.today-this.month_before<0){
                this.isRise=false;
                this.isFall=true;
            }
            else{
                this.isRise=false;
                this.isFall=false;
            }
           let total_rotate=parseFloat(that.current)+parseFloat(that.currentExa);
           if(that.current<=0.5){
                that.rotate_l=that.current*270-90;
                that.rotate_r=-135;     
            }else{
                that.rotate_l=45;
                that.rotate_r=270*(that.current-0.5)-135;
            }
            if(total_rotate<=0.5){
                that.add_l=total_rotate*270-90;
                that.add_r=-135;     
            }else{
                that.add_l=45;
                that.add_r=270*(total_rotate-0.5)-135;
            }
             $$('.circleProgress_l').css({"-webkit-transform": "rotate(" + that.add_l +"deg)"});
             $$('.circleProgress_l-sub').css({"-webkit-transform": "rotate(" + that.rotate_l +"deg)"});
             $$('.circleProgress_r').css({"-webkit-transform": "rotate(" + that.add_r + "deg)"});
             $$('.circleProgress_r-sub').css({"-webkit-transform": "rotate(" + that.rotate_r + "deg)"});
        }
    }
</script>
<style lang="less">
   @import url('../../assets/less/varsbank.less');  
    #index-guild-level-page{
        overflow:auto;
        height:100%;
        background:#1A1D2A;
        .index-guild-level-page{
        .level-top{
            padding-top:10px;
            background: #222533;
            
            .circleProgress_wrapper{   
                  width: 220px;   
                  height: 220px;   
                  margin: 0 auto 56px;   
                  position: relative;    
                  .wrapper_left{   
                    width: 110px;   
                    height: 220px;   
                    position: absolute;   
                    top:0;  
                    left:0; 
                    overflow: hidden;   
                  }   
                  .wrapper_right{   
                    width: 110px;   
                    height: 220px;   
                    position: absolute;   
                    top:0;   
                    right:0;
                    overflow: hidden;   
                  }  
                  .rightcircle{   
                    position:absolute;
                    border:6px solid transparent; 
                    right:0;   
                    width: 208px;   
                    height: 208px; 
                    border-radius: 50%;   
                    .circleProgress_r-parent{   
                        width: 208px;   
                        height: 208px;   
                        margin-left:-6px;
                        margin-top:-6px;
                        border-bottom:6px solid #4B4F5E; 
                        border-left:6px solid #4B4F5E; 
                        border-top:6px solid transparent; 
                        border-right:6px solid transparent;   
                        border-radius: 50%; 
                        -webkit-transform: rotate(225deg); 
                    }
                    .circleProgress_r{   
                        width: 208px;   
                        height: 208px;   
                        margin-left:-6px;
                        margin-top:-220px;
                        border-top:6px solid #EE6729; 
                        border-right:6px solid #EE6729; 
                        border-bottom:6px solid transparent; 
                        border-left:6px solid transparent;   
                        border-radius: 50%; 
                        -webkit-transform: rotate(-135deg); 
                        
                    } 
                    .circleProgress_r-sub{
                        width: 208px;   
                        height: 208px;   
                        margin-left:-6px;
                        margin-top:-220px;
                        border-top:6px solid #F3BB2D; 
                        border-right:6px solid #F3BB2D; 
                        border-bottom:6px solid transparent; 
                        border-left:6px solid transparent;   
                        border-radius: 50%; 
                        -webkit-transform: rotate(-135deg); 
                    }
                  }   
                  .leftcircle{   
                    position:absolute;
                    border:6px solid transparent;   
                    left:0px;   
                    width: 208px;   
                    height: 208px; 
                    border-radius: 50%;   
                    .circleProgress_l-parent{   
                        width: 208px;   
                        height: 208px;   
                        margin-left:-6px;
                        margin-top:-6px;
                        border-bottom:6px solid #4B4F5E; 
                        border-left:6px solid #4B4F5E; 
                        border-top:6px solid transparent; 
                        border-right:6px solid transparent;   
                        border-radius: 50%; 
                        -webkit-transform: rotate(45deg); 
                    }  
                    .circleProgress_l{   
                        width: 208px;   
                        height: 208px;   
                        margin-left:-6px;
                        margin-top:-220px;
                        border-bottom:6px solid #EE6729; 
                        border-left:6px solid #EE6729; 
                        border-top:6px solid transparent; 
                        border-right:6px solid transparent;   
                        border-radius: 50%; 
                        -webkit-transform: rotate(-90deg); 
                        
                    }  
                    .circleProgress_l-sub{
                        width: 208px;   
                        height: 208px;   
                        margin-left:-6px;
                        margin-top:-220px;
                        border-bottom:6px solid #F3BB2D; 
                        border-left:6px solid #F3BB2D; 
                        border-top:6px solid transparent; 
                        border-right:6px solid transparent;   
                        border-radius: 50%; 
                        -webkit-transform: rotate(-90deg); 
                    }
                  } 
                  .brank-tag{
                    position:absolute;
                    width:100%;
                    height:31px;
                    bottom:0;
                    background:#222533;
                    text-align:center;
                    .date-area{
                        font-size:11px;
                        color: rgba(131,136,157,0.50);
                    }
                    h2{
                      font-size: 28px;
                      color: #FFC530;
                      margin:0;
                    }
                    p{
                      font-size: 13px;
                      color: #83889D;
                    }
                  }
                  .start-node{
                    width:22px;
                    position:absolute;
                    top:180px;
                    left:32px;
                    overflow:hidden;
                    .top{
                        width: 0;
                        border-bottom: 8px solid #FFC530;
                        border-left: 11px solid transparent;
                        border-right: 11px solid transparent;
                    }
                    .content{
                        width:22px;
                        height:11px;
                        background:#FFC530;
                        color: #232633;
                        text-align:center;
                        line-height:11px;
                        position:relative;
                        span{
                            position:absolute;
                            margin:auto;
                            left:0;
                            right:0;
                            top:0;
                            bottom:0;
                            font-size: 12px;
                        }
                    }
                    .bottom{
                        width: 0;
                        border-top: 8px solid #FFC530;
                        border-left: 11px solid transparent;
                        border-right: 11px solid transparent;
                    }
                  }
                  .end-node{
                    width:22px;
                    position:absolute;
                    top:180px;
                    right:32px;
                    overflow:hidden;
                    .top{
                        width: 0;
                        border-bottom: 8px solid #4B4F5E;
                        border-left: 11px solid transparent;
                        border-right: 11px solid transparent;
                    }
                    .content{
                        width:22px;
                        height:11px;
                        background:#4B4F5E;
                        color: #232633;
                        text-align:center;
                        line-height:11px;
                        position:relative;
                        span{
                            position:absolute;
                            margin:auto;
                            left:0;
                            right:0;
                            top:0;
                            bottom:0;
                            font-size: 12px;
                        }
                    }
                    .bottom{
                        width: 0;
                        border-top: 8px solid #4B4F5E;
                        border-left: 11px solid transparent;
                        border-right: 11px solid transparent;
                    }
                  }
                  .level-logo{
                    position:absolute;
                    margin:auto;
                    left:0;
                    right:0;
                    top:35px;
                    width:178px;
                    height:158px;
                  }
                  .cover_left{
                    background:#222533;
                    width:20px;
                    height:2px;
                    position:absolute;
                    bottom:36px;
                    left:28px;
                    transform:rotate(143deg);
                    -ms-transform:rotate(143deg);     /* IE 9 */
                    -moz-transform:rotate(143deg);    /* Firefox */
                    -webkit-transform:rotate(143deg); /* Safari 和 Chrome */
                    -o-transform:rotate(143deg); 
                  }
                  .cover_right{
                    background:#222533;
                    width:20px;
                    height:2px;
                    position:absolute;
                    bottom:36px;
                    right:28px;
                    transform:rotate(37deg);
                    -ms-transform:rotate(37deg);     /* IE 9 */
                    -moz-transform:rotate(37deg);    /* Firefox */
                    -webkit-transform:rotate(37deg); /* Safari 和 Chrome */
                    -o-transform:rotate(37deg); 
                  }
            }   
            .circleProgress_attr{
                font-size: 12px;
                color: #83889D;
                letter-spacing: 0px;
                display:flex;
                display: -webkit-box;
                display: -ms-flexbox;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content:space-between;
                -webkit-justify-content: space-between;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items:center;
                width:240px;
                margin:0 auto;
                padding-bottom:15px;
                .circleProgress_attr-l{
                        display: flex;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display:-webkit-flex;
                        -webkit-box-pack: justify;
                        -ms-flex-pack: justify;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        -webkit-align-items: center;
                        align-items: center;
                    span.yellow{
                        width:16px;
                        height:11px;
                        background: #FFC530;
                        display:inline-block;
                        margin-right:6px;
                            
                    }
                    .contribute-tag{
                        background:url('data:image/svg+xml;utf8,<svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator:Sketch 40.3(33839) - http://www.bohemiancoding.com/sketch --><title>icon_question@3x</title><desc>Created with Sketch.</desc><defs></defs><g id="标注" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="公会星级" transform="translate(-141.000000, -355.000000)" fill="#83889D"><g id="Group-6" transform="translate(55.000000, 352.000000)"><g id="Group-7" transform="translate(86.000000, 3.000000)"><path d="M11,6 C11,3.23857625 8.76142375,1 6,1 C3.23857625,1 1,3.23857625 1,6 C1,8.76142375 3.23857625,11 6,11 C8.76142375,11 11,8.76142375 11,6 Z M0,6 C0,2.6862915 2.6862915,0 6,0 C9.3137085,0 12,2.6862915 12,6 C12,9.3137085 9.3137085,12 6,12 C2.6862915,12 0,9.3137085 0,6 Z" id="Oval"></path><path d="M6.0778032,3 C5.4187643,3 4.90617849,3.201373 4.54004577,3.60411899 C4.17391304,3.98855835 4,4.50114416 4,5.14187643 L4.72311213,5.14187643 C4.72311213,4.69336384 4.82379863,4.34553776 5.02517162,4.08924485 C5.24485126,3.78718535 5.58352403,3.64073227 6.04118993,3.64073227 C6.42562929,3.64073227 6.72768879,3.74141876 6.9382151,3.9610984 C7.1395881,4.1624714 7.24942792,4.44622426 7.24942792,4.81235698 C7.24942792,5.06864989 7.15789474,5.30663616 6.97482838,5.53546911 C6.91990847,5.60869565 6.81006865,5.71853547 6.66361556,5.86498856 C6.16933638,6.30434783 5.86727689,6.65217391 5.73913043,6.92677346 C5.62929062,7.15560641 5.57437071,7.42105263 5.57437071,7.72311213 L5.57437071,7.93363844 L6.30663616,7.93363844 L6.30663616,7.72311213 C6.30663616,7.47597254 6.36155606,7.25629291 6.4805492,7.05491991 C6.57208238,6.89016018 6.70938215,6.72540046 6.91075515,6.55148741 C7.31350114,6.19450801 7.56064073,5.95652174 7.65217391,5.84668192 C7.88100686,5.54462243 8,5.18764302 8,4.77574371 C8,4.22654462 7.82608696,3.79633867 7.48741419,3.48512586 C7.13043478,3.15560641 6.66361556,3 6.0778032,3 L6.0778032,3 Z M5.94050343,8.57437071 C5.78489703,8.57437071 5.65675057,8.6201373 5.54691076,8.72997712 C5.43707094,8.83066362 5.39130435,8.95881007 5.39130435,9.11441648 C5.39130435,9.27002288 5.43707094,9.39816934 5.54691076,9.50800915 C5.65675057,9.60869565 5.78489703,9.66361556 5.94050343,9.66361556 C6.09610984,9.66361556 6.22425629,9.60869565 6.33409611,9.50800915 C6.44393593,9.40732265 6.49885584,9.2791762 6.49885584,9.11441648 C6.49885584,8.95881007 6.44393593,8.83066362 6.34324943,8.72997712 C6.23340961,8.6201373 6.09610984,8.57437071 5.94050343,8.57437071 L5.94050343,8.57437071 Z" id="？"></path></g></g></g></g></svg>') center right no-repeat;
                        padding-right:16px;
                    }
                }
                .circleProgress_attr-r{
                        display: flex;
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display:-webkit-flex;
                        -webkit-box-pack: justify;
                        -ms-flex-pack: justify;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        -webkit-align-items: center;
                        align-items: center;
                    span.orange{
                        width:16px;
                        height:11px;
                        background: #EE6729;
                        display:inline-block;
                        margin-right:6px;
                    }
                    .contribute-tag{
                        background:url('data:image/svg+xml;utf8,<svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator:Sketch 40.3(33839) - http://www.bohemiancoding.com/sketch --><title>icon_question@3x</title><desc>Created with Sketch.</desc><defs></defs><g id="标注" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="公会星级" transform="translate(-141.000000, -355.000000)" fill="#83889D"><g id="Group-6" transform="translate(55.000000, 352.000000)"><g id="Group-7" transform="translate(86.000000, 3.000000)"><path d="M11,6 C11,3.23857625 8.76142375,1 6,1 C3.23857625,1 1,3.23857625 1,6 C1,8.76142375 3.23857625,11 6,11 C8.76142375,11 11,8.76142375 11,6 Z M0,6 C0,2.6862915 2.6862915,0 6,0 C9.3137085,0 12,2.6862915 12,6 C12,9.3137085 9.3137085,12 6,12 C2.6862915,12 0,9.3137085 0,6 Z" id="Oval"></path><path d="M6.0778032,3 C5.4187643,3 4.90617849,3.201373 4.54004577,3.60411899 C4.17391304,3.98855835 4,4.50114416 4,5.14187643 L4.72311213,5.14187643 C4.72311213,4.69336384 4.82379863,4.34553776 5.02517162,4.08924485 C5.24485126,3.78718535 5.58352403,3.64073227 6.04118993,3.64073227 C6.42562929,3.64073227 6.72768879,3.74141876 6.9382151,3.9610984 C7.1395881,4.1624714 7.24942792,4.44622426 7.24942792,4.81235698 C7.24942792,5.06864989 7.15789474,5.30663616 6.97482838,5.53546911 C6.91990847,5.60869565 6.81006865,5.71853547 6.66361556,5.86498856 C6.16933638,6.30434783 5.86727689,6.65217391 5.73913043,6.92677346 C5.62929062,7.15560641 5.57437071,7.42105263 5.57437071,7.72311213 L5.57437071,7.93363844 L6.30663616,7.93363844 L6.30663616,7.72311213 C6.30663616,7.47597254 6.36155606,7.25629291 6.4805492,7.05491991 C6.57208238,6.89016018 6.70938215,6.72540046 6.91075515,6.55148741 C7.31350114,6.19450801 7.56064073,5.95652174 7.65217391,5.84668192 C7.88100686,5.54462243 8,5.18764302 8,4.77574371 C8,4.22654462 7.82608696,3.79633867 7.48741419,3.48512586 C7.13043478,3.15560641 6.66361556,3 6.0778032,3 L6.0778032,3 Z M5.94050343,8.57437071 C5.78489703,8.57437071 5.65675057,8.6201373 5.54691076,8.72997712 C5.43707094,8.83066362 5.39130435,8.95881007 5.39130435,9.11441648 C5.39130435,9.27002288 5.43707094,9.39816934 5.54691076,9.50800915 C5.65675057,9.60869565 5.78489703,9.66361556 5.94050343,9.66361556 C6.09610984,9.66361556 6.22425629,9.60869565 6.33409611,9.50800915 C6.44393593,9.40732265 6.49885584,9.2791762 6.49885584,9.11441648 C6.49885584,8.95881007 6.44393593,8.83066362 6.34324943,8.72997712 C6.23340961,8.6201373 6.09610984,8.57437071 5.94050343,8.57437071 L5.94050343,8.57437071 Z" id="？"></path></g></g></g></g></svg>') center right no-repeat;
                        padding-right:16px;
                    }
                }
            }
            .level-status{
                .flexbox();
                
                height:26px;
                margin-left:18px;
                padding:11px 14px 11px 0;
                border-top:1px solid #2E3243;
                font-size: 12px;
                color: #83889D;
                letter-spacing: 0px;
                line-height: 12px;
                img.status-icon{ margin-right:10px;}
                p.status-text{ line-height:26px; height:26px; background-size:14px auto;flex:1;-moz-box-flex: 1;-webkit-box-flex: 1; -o-box-flex: 1; -ms-flex: 1; background:url('data:image/svg+xml;utf8,<svg width="10" height="16" viewBox="0 0 10 16" xmlns="http://www.w3.org/2000/svg"><title>Rectangle 26</title><g fill="none" fill-rule="evenodd"><path d="M0 0h10v16H0z"/><path d="M3 3l4.64 4.64a.503.503 0 0 1 0 .72L3 13" stroke="#83889D" stroke-width="2" stroke-linecap="round"/></g></svg>') center right no-repeat;
                }
                p.status-text-none{ line-height:26px; height:26px; background-size:14px auto;flex:1;-moz-box-flex: 1;-webkit-box-flex: 1; -o-box-flex: 1; -ms-flex: 1; }
            }
        }
        .level-bottom{
            background:#1A1D2A;
            .info-head{
                text-align:center;
                padding:8% 0 10px;
                .info-head-add{ font-size: 12px; color: #83889D; letter-spacing:0px;}
                .info-head-num{ font-size: 36px; color: #FFFFFF; letter-spacing:0px; line-height: 44px;position:relative;
                    .falling{ width:12px; height:14px; position:absolute; margin:auto; left:125px; right:0; top:8px; background:url('data:image/svg+xml;utf8,<svg width="12px" height="14px" viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator:Sketch 40(33762) - http://www.bohemiancoding.com/sketch --><title>icon_falling@3x</title><desc>Created with Sketch.</desc><defs></defs><g id="标注" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="公会星际" transform="translate(-227.000000, -445.000000)" fill="#FF6084"><g id="新增贡献" transform="translate(0.000000, 358.000000)"><g id="数值样式-copy-2" transform="translate(85.000000, 70.000000)"><polygon id="Shape" transform="translate(148.000000, 24.000000) scale(1, -1) rotate(-90.000000) translate(-148.000000, -24.000000) " points="149 22 149 18 155 24 149 30 149 26 141 26 141 22"></polygon></g></g></g></g></svg>') no-repeat;}
                    .rising{ width:12px; height:14px; position:absolute; margin:auto; left:125px; right:0; top:8px; background:url('data:image/svg+xml;utf8,<svg width="12px" height="14px" viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><!-- Generator:Sketch 40(33762) - http://www.bohemiancoding.com/sketch --><title>icon_rising@3x</title><desc>Created with Sketch.</desc><defs></defs><g id="标注" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="公会星级" transform="translate(-227.000000, -445.000000)" fill="#1ED282"><g id="新增贡献" transform="translate(0.000000, 358.000000)"><g id="数值样式-copy-2" transform="translate(85.000000, 70.000000)"><polygon id="Shape" transform="translate(148.000000, 24.000000) rotate(-90.000000) translate(-148.000000, -24.000000) " points="149 22 149 18 155 24 149 30 149 26 141 26 141 22"></polygon></g></g></g></g></svg>') no-repeat;}
                }
                .info-head-tag{ font-size: 12px; color: #83889D; letter-spacing:0px;}
            }
            .info-detail{
                 display:flex;
                 display: -webkit-box;
                 display: -ms-flexbox;
                 display: -webkit-flex;
                 -webkit-box-pack: justify;
                 -webkit-box-align: center;
                 -ms-flex-align: center;
                 justify-content:center;
                 -ms-flex-pack: justify;
                 -webkit-justify-content: center;
                 padding:30px 0 40px;
                .info-detail-l{
                    width:33%;
                    text-align:center;
                }   
                .info-detail-c{ 
                    width:34%;
                    text-align:center;
                    border-left:1px solid #2E313C;
                    border-right:1px solid #2E313C;
                }
                .info-detail-r{
                    width:33%;
                    text-align:center;
                }
                .info-detail-today{
                    font-size: 12px;
                    color: #83889D;
                    letter-spacing: 0px;
                }
                .info-detail-num{
                    font-size: 24px;
                    color: #FFFFFF;
                    letter-spacing: 0px;

                }
                .info-detail-yesterday{
                    font-size: 12px;
                    color: #83889D;
                    letter-spacing: 0px;
                }
            }
        }

        }

        
    }
</style>
/*
福田e家
ftej '账号#密码'
偶尔会报错  多定时两次就好了
*/

const $ = new Env("福田e家");
//let envSplitor = ['\n','@','#']
const fs = require('fs')
let httpResult, httpReq, httpResp
const ckFile1 = 'ftej.txt'
const ckName = 'ftej'
let userCookie = []
try {
    userCookie = userCookie.concat(fs.readFileSync(`./${ckFile1}`,'utf-8').split('\n')||[])
    console.log(`ck文件[ ${ckFile1} ]加载成功`)
    this.mxr = true
} catch (e) {
    console.log(`未发现本地文件 调用青龙环境变量`)
    this.mxr = false
}
let mxr=this.mxr
if (this.mxr == false){
    try {
        userCookie = userCookie.concat((($.isNode() ? process.env[ckName] : $.getdata(ckName))||'')?.split('\n')||[])
        console.log(`环境变量[ ${ckName} ]加载成功`)
    } catch (e) {
        //console.log(e)
    }
}

let userList = []
let userIdx = 0
let userCount = 0
let time = Math.round( Date.now())

///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx

        this.valid = false

        try {
            this.ck = str.split('#')
            this.user = phoneNum(`${this.ck[0]}`)
            this.ckValid = true
        } catch (e) {

        }
    }


    async cashck() {
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/homeManager/getLoginMember`;
            let body =`{"password":"${this.ck[1]}","version_name":"","version_auth":"","device_id":"","device_model":"","ip":"","name":"${this.ck[0]}","version_code":"180","deviceSystemVersion":"","device_type":"0"}`;
//console.log(body)
            let h = {
                "Host": "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
            }
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            // console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.user} 登录成功    `)
                this.token = result.data.token
                this.memberComplexCode = result.data.memberComplexCode
                this.uid = result.data.uid
                this.memberID = result.data.memberID
                if(result.data.signIn== "未签到"){
                    await this.sign()
                }
                //  await $.wait(3000);
                await this.getTaskList()//每日关注
                // await $.wait(3000);
                await this.grxx()
            }else{
                console.log(`账号 ${this.user} 登录失败 `)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }
    //任务列表
    async getTaskList() {
        let tim = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/homeManager/api/Member/getTaskList`;
            let body = `{"memberId":"${this.memberID}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${tim-20220000},"businessId":1}`;


            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            //console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            // console.log(result)
            if (result.code == 200) {
                if (result.data[4].completeNum == 0) {
                    await this.sign()//签到
                }else if (result.data[4].completeNum ==1 ){
                    console.log(`账号 ${this.user} ${result.data[4].ruleName} 已完成 `)
                }
                if (result.data[5].completeNum == 0) {
                    await this.fx()//分享
                }else if (result.data[5].completeNum ==1 ){
                    console.log(`账号 ${this.user} ${result.data[6].ruleName} 已完成 `)
                }
                if (result.data[6].completeNum == 0) {
                    await this.topicList()//发帖
                }else if (result.data[6].completeNum ==1 ){
                    console.log(`账号 ${this.user} ${result.data[6].ruleName} 已完成 `)
                }
                if (result.data[8].completeNum == 0) {
                    await this.follow2nd()//关注
                }else if (result.data[8].completeNum ==1 ){
                    console.log(`账号 ${this.user} ${result.data[8].ruleName} 已完成 `)
                }
                if (result.data[7].completeNum == 0) {
                    await this.comment2nd()//评论
                }else if (result.data[7].completeNum ==1 ){
                    console.log(`账号 ${this.user} ${result.data[7].ruleName} 已完成 `)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }
    async sign() {
        let time1 = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/homeManager/api/bonus/signActivity2nd`;
            let body = `{"memberId":"${this.memberComplexCode}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time1-20220000},"businessId":1}`;
            let h = {
                "Host": "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
                "token": ``,
            }
            //console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            //console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.user} 签到成功获得积分 ${result.data.data.integral} `)
            } else if (result.code == 500) {
                console.log(`账号 ${this.user} 今日已经签到`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }

    //关注列表
    async postList() {
        let time2 = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/nowPostList`;
            let body = ` {"memberId":"${this.memberID}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time2-20220000},"businessId":1,"pageNumber":1,"pageSize":30,"follow":"1"}`;
            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            //console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            //  console.log(result)
            if (result.code == 200) {
                for (let i=1;i<result.data.length;i++){
                    let dd=randomArr(result.data)
                    this.b=dd.memberId
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }
    //评论
    async comment2nd() {
        await this.postList()
        let time3 = Math.round( Date.now())
        await this.wyy()
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/comment2nd`;
            let body = `  {"memberId":"${this.memberComplexCode}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time3-20220000},"businessId":1,"commentContent":"${this.content}","commentId":"","postId":"${this.b}","type":"1"}`

            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            //console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            //console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.user} 评论成功 `)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }

    //每日关注
    async follow2nd() {
        await this.postList()
        let time4 = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/follow2nd`;
            let body = `{"memberId":"${this.memberComplexCode}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time4-20220000},"businessId":1,"behavior":"1","memberIdeds":"${this.b}","navyId":"null"}`;
            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            // console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            //    console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.user} 关注成功 `)
                //await $.wait(3000);
                await this.follow2n()
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }
    //取消关注
    async follow2n() {
        let time5 = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/follow2nd`;
            let body = `{"memberId":"${this.memberComplexCode}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time5-20220000},"businessId":1,"behavior":"2","memberIdeds":"${this.b}","navyId":"null"}`;
            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            //console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            // console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.user} 取消关注 `)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }

    //发帖区
    async topicList() {
        await this.postList()
        let time6 = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/topicList`;
            let body = ` {"memberId":"${this.memberID}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time6-20220000},"businessId":1}`;

            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            //console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            // console.log(result)
            if (result.code == 200) {
                for (let i=1;i<result.data.top.length;i++){
                    let ddd=randomArr(result.data.top)
                    this.a=ddd.topicId
//console.log(`获取到话题列表[${this.a}] `)
                }
                await this.ft()
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }

    async ft() {
        let time7 = Math.round( Date.now())
        await this.wyy()
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/addJson2nd`;
            let body = `{"memberId":"${this.memberComplexCode}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time7-20220000},"businessId":1,"content":"${this.content}","postType":1,"topicIdList":[${this.a}],"uploadFlag":3,"title":"","urlList":[]}`

            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            // console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            // console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.user} 发帖成功 `)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }

    //个人信息
    async grxx() {
        let time9 = Math.round( Date.now())
        try {
            let url = `https://czyl.foton.com.cn/ehomes-new/homeManager/api/Member/findMemberPointsInfo`;
            let body = `{"memberId":"${this.memberID}","userId":"${this.uid}","userType":"61","uid":"${this.uid}","mobile":"${this.ck[0]}","tel":"${this.ck[0]}","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${time9-20220000},"businessId":1}`;

            let h = {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                "token": "",
                "host": "czyl.foton.com.cn"
            }
            // console.log(body)
            let urlObject = popu(url, h, body)
            await httpRequest('post', urlObject)
            let result = httpResult;
            // console.log(result)
            if (result.code == 200) {
                console.log(`账号 ${this.ck[0]} 总积分 ${result.data.pointValue} `)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(1);
        }
    }

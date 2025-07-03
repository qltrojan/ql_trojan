"""
export txq="备注#Authorization"
"""
#import notify
import requests,json,re,os,sys,time,random,datetime,threading,execjs,hashlib,base64,urllib3
retrycount = 3
environ = "txq"
name = "꧁༺ 汤汤༒星球 ༻꧂"
session = requests.session()
#---------------------主代码区块---------------------

def run(arg1):
    global id, messages
    header = {
        "Host": "vip.by-health.com",
        "Content-Type": "application/json;charset=utf-8",
        "sec-ch-ua-mobile": "?1",
        "Accept": "*/*",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/134.0.6998.136 Mobile Safari/537.36 XWEB/1340129 MMWEBSDK/20250201 MMWEBID/6533 MicroMessenger/8.0.60.2860(0x28003C51) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx9bb6d5ac457bd69d",
        "Authorization": arg1,
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
        "sec-ch-ua-platform": "Android",
        "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Android WebView";v="134"',
        "x-requested-with": "com.tencent.mm",
        "priority": "priority",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
    }
    for retry in range(int(retrycount)):
        try:
            url = 'https://vip.by-health.com/vip-api/sign/daily/create'
            data = json.dumps({"activityId": 7})
            response = session.post(url=url, headers=header, data=data).json()
            if response["success"]:
                if "已完成" in response['data']['rspMsg']:
                    print(f"☁️签到：{response['data']['rspMsg']}")
                elif "success" in response['data']['rspMsg']:
                    print(f"☁️签到：{response['data']['dailyPointReward']} 金币")
            break
        except Exception as e:
            if retry >= int(retrycount)-1:
                print(f"⭕模块：{e}")

def main():
    global id, messages
    messages = []
    response = requests.get("https://mkjt.jdmk.xyz/mkjt.txt")
    response.encoding = 'utf-8'
    txt = response.text
    print(txt)
    if os.environ.get(environ):
        ck = os.environ.get(environ)
    else:
        ck = ""
        if ck == "":
            print("⭕请设置变量")
            sys.exit()
    ck_run = ck.split('\n')
    ck_run = [item for item in ck_run if item]
    print(f"{' ' * 7}{name}\n\n")
    print(f"-------- ☁️ 开 始  执 行 ☁️ --------")
    for i, ck_run_n in enumerate(ck_run):
        try:
            mark,arg1 = ck_run_n.split('#',2)
            print(f"\n\n☁️账号 [{i + 1}/{len(ck_run)}]")
            id = mark[:3] + "*****" + mark[-3:]
            print(f"☁️当前账号：{id}")
            run(arg1)
            time.sleep(random.randint(1, 2))
        except Exception as e:
            print(e)
    print(f"\n\n-------- ☁️ 执 行  结 束 ☁️ --------\n\n")
    if messages:
        output = '\n'.join(num for num in messages)
        notify.send(name, output)

if __name__ == '__main__':
    main()
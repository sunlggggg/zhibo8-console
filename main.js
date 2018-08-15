var request = require('request');
var syncrequest = require('sync-request');
var readlineSync = require('readline-sync');
var rp = require('request-promise');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function readSyncByfs(tips) {
    let response;

    tips = tips || '> ';
    process.stdout.write(tips);
    process.stdin.pause();
    response = fs.readSync(process.stdin.fd, 1000, 0, 'utf8');
    process.stdin.end();
    return response[0].trim();
}

function showInfo(strJosn) {
    jObject = JSON.parse(strJosn)
    try{
        for(var i = 0 ; i < 2 ; i++ ) {
            console.log(jObject[i].live_text + "\t" + jObject[i].live_time + "\t <=" + jObject[i]. user_chn)
            console.log(jObject[i].period_score)
        }
    }catch(e){
        if(ISDUG){
            console.log(e)
        }
    }
}

main = async () => {
    var ISDUG  
    //'https://dingshi4pc.qiumibao.com/livetext/data/cache/livetext/130522/0/lit_page_2/'
    ISDUG = readlineSync.question('是否进入debug模式 y/n')
    if (ISDUG === 'n') {
        ISDUG = false 
    }else {
        ISDUG = true
    }
    url = readlineSync.question('请输入主url ');
    console.log(url)
    while(true){
        // var favFood = readlineSync.question('What is your favorite food? ', {
        //   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
        // });
        var i = readlineSync.question('请输入大概的文件id（0-1000）');
        i = parseInt(i) ; 
        urlNow = url+i+".htm"
        var res = syncrequest('GET', urlNow);
        if (res.statusCode == 404 ){
            console.log("太大了...")
            continue;
        }
        console.log(JSON.parse(res.getBody())[0].live_time);
        flag = readlineSync.question('是否适当空大文件id y/n');
        if(flag === 'n'){
                while(true){
                    urlNow = url + i + ".htm"
                    if(ISDUG){
                        console.log(i)
                        console.log(urlNow)
                    }
                    var res = syncrequest('GET', urlNow);
                    if (res.statusCode == 200 ){
                        showInfo(res.getBody())
                        i+=2
                    }
                    await sleep(2000)
                }
            }
        }
}
main()
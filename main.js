var request = require('request');
var syncrequest = require('sync-request');
var readlineSync = require('readline-sync');
var rp = require('request-promise');


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
timefalg = {
    bigger :"bigger",
    litter: "litter"
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

main = async ()=>{
    //'https://dingshi4pc.qiumibao.com/livetext/data/cache/livetext/130522/0/lit_page_2/'
    url = readlineSync.question('请输入主url ');
    console.log(url)
    while(true){
        // var favFood = readlineSync.question('What is your favorite food? ', {
        //   hideEchoBack: true // The typed text on screen is hidden by `*` (default).
        // });
        i = readlineSync.question('请输入大概的文件id（0-1000）');
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
                    console.log(urlNow)
                    request(urlNow, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(JSON.parse(body))
                        }
                    })
                    await sleep(2000)
                    i+=2
                }
            }
        }
}
main()
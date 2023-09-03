let wgtVer = null;

// 获取本地应用资源版本号
export function plusReady() {
    if (!plus.runtime.appid) {
        console.warn('缺少appid')
        return;
    }

    plus.runtime.getProperty(plus.runtime.appid, function (inf) {
        wgtVer = inf.version;
        console.log("当前应用版本：" + wgtVer);
        checkUpdate();
    });
}

// if(window.plus){
//     plusReady();
// }else{
//     document.addEventListener('plusready',plusReady,false);
// }

// 检测更新
var checkUrl="http://demo.dcloud.net.cn/test/update/check.php";
function checkUpdate(){
    plus.nativeUI.showWaiting("检测更新...");

    uni.request({
        url: checkUrl, //仅为示例，并非真实接口地址。
        success: (res) => {
            console.log(res.data);
            // this.text = 'request success';
            plus.nativeUI.closeWaiting();
            console.log("检测更新成功：", res);
            // var newVer=xhr.responseText;
            // if(wgtVer&&newVer&&(wgtVer!=newVer)){
                downWgt();  // 下载升级包
            // }else{
            //     plus.nativeUI.alert("无新版本可更新！");
            // }
        },
        fail: () => {
            console.log("检测更新失败！");
            plus.nativeUI.alert("检测更新失败！");
        }
    });
}


// 下载wgt文件
// var wgtUrl="http://127.0.0.1:8080/__UNI__9754902.wgt";
var wgtUrl="http://10.0.2.2:8080/__UNI__9754902.wgt";
function downWgt(){
    plus.nativeUI.showWaiting("下载wgt文件...");
    plus.downloader.createDownload( wgtUrl, {filename:"_doc/update/"}, function(d,status){
        if ( status == 200 ) {
            console.log("下载wgt成功："+d.filename);
            installWgt(d.filename as string); // 安装wgt包
        } else {
            console.log("下载wgt失败！");
            plus.nativeUI.alert("下载wgt失败！");
        }
        plus.nativeUI.closeWaiting();
    }).start();
}


// 更新应用资源
function installWgt(path: string){
    plus.nativeUI.showWaiting("安装wgt文件...");
    plus.runtime.install(path,{},function(){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件成功！");
        plus.nativeUI.alert("应用资源更新完成！",function(){
            plus.runtime.restart();
        });
    },function(e){
        plus.nativeUI.closeWaiting();
        console.log("安装wgt文件失败["+e.code+"]："+e.message);
        plus.nativeUI.alert("安装wgt文件失败["+e.code+"]："+e.message);
    });
}

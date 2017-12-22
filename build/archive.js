#!/usr/bin/env node --harmony

// 打包出 apk、ipa 文件，并自动上传到 Fir.im

var appConfig = require('../src/config/app-config.build.json');
var mchConfig = require('../src/config/mch-config.build.json');
var pkgInfo = require('../package.json');
var config = {
  'autoPublish': true,
  'version': appConfig.version,
  'build': appConfig.build,
  'appName': mchConfig.appName,
  'appBundleId': mchConfig.appId,
  'packageName': mchConfig.packageName,
  'firmApiToken': '684dcab8a5b83cd416032f28ebe642eb',
  'appIconPath': './ios/TheRNAPP/Images.xcassets/AppIcon.appiconset/icon.png'
};

var fs = require('fs');
require('shelljs/global');
const notifier = require('node-notifier');


var iosTarget = './dist/'+ config.appBundleId +'-'+ config.version +'-'+ config.build +'-ios.ipa';
var androidTarget = './dist/'+ config.appBundleId +'-'+ config.version +'-'+ config.build +'-android.apk';

function archive() {
  return new Promise((resolve, reject)=>{

    exec([
      /* Build Android */
      'npm run build-android',
      'cd ./android/',
      './gradlew assembleRelease',
      'cd ..',
      `rm -f ${androidTarget}`,
      `cp -f ./android/app/build/outputs/apk/app-release.apk ${androidTarget}`,
      /* Build iOS */
      'npm run build-ios',
      'cd ./ios/',
      `rm -f build/TheRNAPP.ipa`,
      `xcodebuild -scheme "TheRNAPP" -configuration Release clean archive -archivePath "build/${config.appBundleId}.xcarchive"`,
      `xcodebuild -exportArchive -archivePath "build/${config.appBundleId}.xcarchive" -exportPath "build/" -exportOptionsPlist AdHocExportOptions.plist -allowProvisioningUpdates`,
      // `xcodebuild -exportArchive -archivePath "build/${config.appBundleId}.xcarchive" -exportPath "build/" -exportOptionsPlist AppStoreExportOptions.plist -allowProvisioningUpdates`,
      'cd ..',
      `rm -f ${iosTarget}`,
      `cp ./ios/build/TheRNAPP.ipa ${iosTarget}`,
    ].join(' && '), function(code, stdout, stderr) {
      if ( code ) {
        console.error(stderr);
        reject();
      }
      else resolve();

    });
  });
}


// /自动上传Demo版本到Firm
function auth(type){
  return new Promise((resolve, reject)=> {
    exec([
      'curl -X "POST" "http://api.fir.im/apps"',
      '-H "Content-Type: application/json"',
      '-d "{\\"type\\":\\"'+ type +'\\", \\"bundle_id\\":\\"'+ config.appBundleId +'\\", \\"api_token\\":\\"'+ config.firmApiToken +'\\"}"',
    ].join(' '), function(code, stdout, stderr) {
      if ( code != '0' ) fail();
      else {
        var res;
        try {
          res = JSON.parse(stdout);
        } catch(e) {
          console.error('\n');
          console.error('Firm Key Result Parse Error.');
          console.error('\n');
          console.error(stdout.split('\n')[3]);
          console.error('\n');
          console.error(stderr);
          console.error('\n');
        }
        if ( res  ) resolve( res );
        else reject();
      }
    });
  })
}


function upload( platform, type, cert, succ, fail ){
  var cmd = [
    'curl   -F "key='+ cert.key +'"',
    '-F "token='+ cert.token +'"',
    '-F "file=@'+
      (type == 'icon' ? config.appIconPath : (platform == 'ios' ? iosTarget : androidTarget))
    +'"',
    type == 'icon' ? '' : ('-F "x:name='+ config.appName +'"'),
    type == 'icon' ? '' : ('-F "x:version='+ config.version +'"'),
    type == 'icon' ? '' : ('-F "x:build='+ config.build +'"'),
    type == 'icon' ? '' : (platform == 'ios' ? '-F "x:release_type=Adhoc"' : ''),
    type == 'icon' ? '' : ('-F "x:changelog=自动发布"'),
    cert.upload_url
  ].join(' ');
  console.error('\n');
  console.error(cmd);
  console.error('\n');
  exec(cmd, function(code, stdout, stderr) {
    if ( code != '0' ) fail();
    else {
      var res;
      try {
        res = JSON.parse(stdout);
      } catch(e) {
        console.error('\n');
        console.error('Firm Key Result Parse Error:');
        console.error('\n');
        console.error(stdout);
        console.error('------------\n');
        console.error(stdout.split('\n')[3]);
        console.error('\n');
        console.error(stderr);
        console.error('\n');
      }
      console.log('\n');
      if ( res  ) succ( res );
      else fail();
    }
  });
}
function firmAutoPublish( platform ) {
  return new Promise((resolve, reject)=>{
    auth( platform ).then(function(res){
      Promise.all([
        upload(platform, 'icon', res.cert.icon, function(){
          console.log('Firm '+ platform +' icon 上传成功');
        }, function(){
          console.log('\n');
          console.log('Firm '+ platform +' icon 上传失败');
        }),
        upload(platform, 'binary', res.cert.binary, function(){
          console.log('Firm '+ platform +' App 上传成功');
        }, function(){
          console.log('\n');
          console.log('Firm '+ platform +' App 上传失败');
        })
      ]).then(resolve, reject);
    }, function(){
      console.log('\n');
      console.log('Firm API 验证失败');
      reject();
    });
  })
}

archive().then(()=>{
  exec('open ./dist');
  notifier.notify({
    'title': 'Archive Succeed',
    'message': `${config.appName} ${config.version}`
  });
  Promise.all([
    firmAutoPublish('ios'),
    firmAutoPublish('android'),
  ]).then(()=>{
    notifier.notify({
      'title': 'Upload Succeed',
      'message': `${config.appName} ${config.version}`
    });
  }, ()=>{
    notifier.notify({
      'title': 'Upload Failed',
      'message': `${config.appName} ${config.version}`
    });
  })
}, ()=>{
  notifier.notify({
    'title': 'Archive Failed',
    'message': `${config.appName} ${config.version}`
  });
});

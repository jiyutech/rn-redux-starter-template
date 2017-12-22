#!/usr/bin/env node --harmony
const _ = require('lodash');
const fs = require('fs');
const shell = require('shelljs');


// TODO validation run in project root directory

let appConfig = require('./config.json');

// Build appConfig
// TODO validate 'version'
appConfig.build = parseInt((Date.now())/1000/60/2); // update in every 2 minutes.

const appConfigFields = [ 'version', 'build', 'version', 'appName', 'appId', 'packageName', '_iOSTeamId', '_iOSSupportDevices' ];

// TODO validate fields (app + mch) packageName should be a valid name in package.json
// TODO validate appConfig._iOSTeamId, _iOSSupportDevices
appConfig._iOSSupportDevices = appConfig._iOSSupportDevices.map(_=>_.toUpperCase())

// ### 修改APP配置
// 1. 修改 `src/config/index.js` 中的`mchInfo`配置
{
  // Build: src/config/app-config.build.json
  fs.writeFileSync('./src/config/app-config.build.json', JSON.stringify( _.pick(appConfig, appConfigFields), null, 2));
}
// 2. 修改 `package.json` 中的配置，`name` 设为 `appConfig.packageName`
{
  let packageJSON = require('../package.json');
  packageJSON.name = appConfig.packageName;
  packageJSON.version = appConfig.version;
  fs.writeFileSync('./package.json', JSON.stringify( packageJSON, null, 2));
}
// 3. 修改 `app.json` 中的配置， `name` 设为 `appConfig.appId`，`displayName` 设为 `appConfig.appName`
{
  let appJSON = require('../app.json');
  appJSON.name = appConfig.appId;
  appJSON.displayName = appConfig.appName
  fs.writeFileSync('./app.json', JSON.stringify( appJSON, null, 2));
}
// 5. 【iOS】修改 `ios/TheRNAPP.xcodeproj/project.pbxproj` 中的配置， 查找并替换 `PRODUCT_BUNDLE_IDENTIFIER = com.efolix.MCRetailRNDemo;` 为 `PRODUCT_BUNDLE_IDENTIFIER = {{appConfig.appId}};`，注意有2处要改。查找并替换 ` = TheRNAPP;` 为 ` = {{appConfig.packageName}};`，注意有4处要改。查找并替换 `DevelopmentTeam = 3T834TV9MU;` 为 `DevelopmentTeam = {{appConfig._iOSTeamId}};`，注意有2处要改。
// 5. 【iOS】修改 `ios/TheRNAPP.xcodeproj/project.pbxproj` 中的配置， 修改 `TARGETED_DEVICE_FAMILY = "1,2";`，若仅适配iPhone则设置为 "1"，若适配iPhone+iPad则设置为 "1,2"。
//
{
  let path = './ios/TheRNAPP.xcodeproj/project.pbxproj';
  let fileText = fs.readFileSync(path, { encoding: 'utf8' });
  fileText = fileText.replace(/PRODUCT_BUNDLE_IDENTIFIER\s*?\=\s*?[^;]*?;/g, `PRODUCT_BUNDLE_IDENTIFIER = ${appConfig.appId};`)
  fileText = fileText.replace(/DevelopmentTeam\s*?\=\s*?[^;]*?;/g, `DevelopmentTeam = ${appConfig._iOSTeamId};`)
  fileText = fileText.replace(/DevelopmentTeam\s*?\=\s*?[^;]*?;/g, `DevelopmentTeam = ${appConfig._iOSTeamId};`)
  let targetDeviceFamily = [];
  if ( appConfig._iOSSupportDevices.includes('IPHONE') ) targetDeviceFamily.push(1)
  if ( appConfig._iOSSupportDevices.includes('IPAD') ) targetDeviceFamily.push(2)
  fileText = fileText.replace(/TARGETED_DEVICE_FAMILY\s*?\=\s*?[^;]*?;/g, `TARGETED_DEVICE_FAMILY = "${targetDeviceFamily.join(',')}";`)
  fs.writeFileSync(path, fileText);
}
// 6. 【iOS】修改 `ios/TheRNAPP/Info.plist` 中的配置， `CFBundleDisplayName` 设为 `appConfig.appName`，`CFBundleShortVersionString` 设为 `appConfig.version`，`CFBundleVersion` 设为 `appConfig.build`。
{
  let path = './ios/TheRNAPP/Info.plist';
  let fileText = fs.readFileSync(path, { encoding: 'utf8' });
  fileText = fileText.replace(/(\<key\>CFBundleDisplayName\<\/key\>[\s\S]*?\<string\>).*?(\<\/string\>)/g, `$1${appConfig.appName}$2`)
  fileText = fileText.replace(/(\<key\>CFBundleShortVersionString\<\/key\>[\s\S]*?\<string\>).*?(\<\/string\>)/g, `$1${appConfig.version}$2`)
  fileText = fileText.replace(/(\<key\>CFBundleVersion\<\/key\>[\s\S]*?\<string\>).*?(\<\/string\>)/g, `$1${appConfig.build}$2`)
  fs.writeFileSync(path, fileText);
}
// 7. 【iOS】修改 `./ios/AdHocExportOptions.plist` 中的配置，`teamID` 设为 `appConfig._iOSTeamId`。
{
  let path = './ios/AdHocExportOptions.plist';
  let fileText = fs.readFileSync(path, { encoding: 'utf8' });
  fileText = fileText.replace(/(\<key\>teamID\<\/key\>[\s\S]*?\<string\>).*?(\<\/string\>)/g, `$1${appConfig._iOSTeamId}$2`)
  fs.writeFileSync(path, fileText);
}
// 8. 【iOS】修改 `./ios/AdHocExportOptions.plist` 中的配置，`teamID` 设为 `appConfig._iOSTeamId`。
{
  let path = './ios/AppStoreExportOptions.plist';
  let fileText = fs.readFileSync(path, { encoding: 'utf8' });
  fileText = fileText.replace(/(\<key\>teamID\<\/key\>[\s\S]*?\<string\>).*?(\<\/string\>)/g, `$1${appConfig._iOSTeamId}$2`)
  fs.writeFileSync(path, fileText);
}

// 9. 【Android】修改 `android/app/build.gradle` 中的配置，`applicationId` 设为 `appConfig.appId`，`versionName` 设为 `appConfig.version`，`versionCode` 设为 `appConfig.build`。(注意事项 `android/app/build.gradle` 中的 `targetSdkVersion` 需设置为 `23`)
{
  let path = './android/app/build.gradle';
  let fileText = fs.readFileSync(path, { encoding: 'utf8' });
  fileText = fileText.replace(/(defaultConfig[^{]*?\{[\s\S]*?applicationId[^"]*?\")[^"]*?(\")/g, `$1${appConfig.appId}$2`)
  fileText = fileText.replace(/(defaultConfig[^{]*?\{[\s\S]*?targetSdkVersion\s*?)\d+/g, `$1${23}`)
  fileText = fileText.replace(/(defaultConfig[^{]*?\{[\s\S]*?versionCode\s*?)\d+/g, `$1${appConfig.build}`)
  fileText = fileText.replace(/(defaultConfig[^{]*?\{[\s\S]*?versionName[^"]*?\")[^"]*?(\")/g, `$1${appConfig.version}$2`)
  fs.writeFileSync(path, fileText);
}
// 10. 【Android】修改 `android/app/src/main/res/values/strings.xml` 中的配置，`app_name` 的设为 `appConfig.appName`。
{
  let path = './android/app/src/main/res/values/strings.xml';
  let fileText = fs.readFileSync(path, { encoding: 'utf8' });
  fileText = fileText.replace(/(\<string\s+name\=\"app_name\"\>).+?(\<\/string\>)/g, `$1${appConfig.appName}$2`)
  fs.writeFileSync(path, fileText);
}


// ### 更换 App icon 与 Splash
{
  let sourceDirPath = `./build/app-assets`;
  // 2. 【iOS】完整替换 `./ios/TheRNAPP/Images.xcassets` 下面的两个目录中的内容 `AppIcon.appiconset`、`LaunchImage.launchimage`。
  {
    if (shell.exec(`rm -rf ./ios/TheRNAPP/Images.xcassets/AppIcon.appiconset`).code !== 0) {
      shell.echo('iOS APP icon clean failed.\n');
      shell.exit(1);
    }
    if (shell.exec(`rm -rf ./ios/TheRNAPP/Images.xcassets/LaunchImage.launchimage`).code !== 0) {
      shell.echo('iOS APP icon clean failed.\n');
      shell.exit(1);
    }
    if (shell.exec(`cp -rf ${sourceDirPath}/ios/Assets.xcassets/* ./ios/TheRNAPP/Images.xcassets/`).code !== 0) {
      shell.echo('iOS APP icon & splash build failed.\n');
      shell.exit(1);
    }
  }
  // 3. 【Android】替换 `./android/app/src/main/res` 目录下的所有 `launch_screen.png` 和 `ic_launcher.png`。
  {
    if (shell.exec(`rm -rf ./android/app/src/main/res/*/ic_launcher.png`).code !== 0) {
      shell.echo('Android APP icon clean failed.\n');
      shell.exit(1);
    }
    if (shell.exec(`rm -rf ./android/app/src/main/res/*/launch_screen.png`).code !== 0) {
      shell.echo('Android splash clean failed.\n');
      shell.exit(1);
    }
    if (shell.exec(`cp -rf ${sourceDirPath}/android/res/* ./android/app/src/main/res/`).code !== 0) {
      shell.echo('Android APP icon & splash build failed.\n');
      shell.exit(1);
    }
  }
}

shell.echo(`\n===================`);
shell.echo(`\n\n[CONFIG BUILD SUCCESSFUL]`);
shell.echo(`\n\nversion ${appConfig.version} (build ${appConfig.build})`);
shell.echo(`\n\n===================`);

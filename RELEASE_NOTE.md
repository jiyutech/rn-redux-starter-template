## 准备

### 确认物料

1. 我们的 《客户信息表》
1. 我们的 「极光推送账号」
1. 该客户的 mchInfo JSON配置（见《客户信息表》）
1. 该客户的 iOS、Android 的 APP icon 和 Splash 图片（见钉钉流程）
1. 该客户的 iOS 开发者账号（见钉钉流程）


## 增加商户/修改商户信息/切换商户 - 程序配置

1. 修改 `build/mch-options-config.json` 可实现添加商户，或修改商户配置。其中 `_iOSTeamId` 配置可以在苹果开发者后台创建AppId时获取到。`_iOSSupportDevices` 配置默认只支持 iPhone （`["iPhone"]`）。 （商户配置信息见《客户信息表》）
1. 修改 `build/config` 下的 companyId 实现切换商户。
1. App icon 与 Splash 与 商户登录页面LOGO图，放置于 `build/mch-assets/${mchappConfig.companyId}/` 目录下，格式参考 `_sample`。（若需要）
1. 运行 `npm run build-config` 使配置生效。

### 增加商户 - iOS 证书配置，以及极光推送设置

1. 前置物料：Apple 开发者账号、certSigningRequest文件。
1. 使iOS用开发者账号登入 `developer.apple.com/account`。
1. 创建 APP ID，Name为 `mchConfig.packageName`，BundleId为 `mchConfig.appId`，注意打钩 `Push Notifications`。（若BundleId重名，可在最后增加一个 `a` ，并更新配置中的appId，以及在钉钉流程中通知项目组成员）
1. 创建并下载 Distribution 证书，包含2种：`App Store Production` 和 `AdHoc`，创建好后下载并双击执行即可。（第一次配置时网站会提醒你先创建一个基础证书，创建好后下载并双击执行即可。在创建好它之后记得回来创建 Distribution 证书）
1. 创建并下载 Push Notifications 证书，Production 类型，创建好后下载并双击执行即可。
1. 确保已将上述证书导入电脑（双击）。
1. 在Mac钥匙串中，找到推送证书（可搜索`push`），右键导出p12格式的证书文件（不用设置密码），登录极光推送账号并导入p12证书。



## 打包发布

### 确认程序正确运行

1. 方式1：在命令行中分别运行 `npm run ios`、`npm run android`，确认APP正常运行。
1. 方式2：在命令行中运行 `npm run build`，将APP发布至Fir.im，然后使用iPhone和Android真机测试程序。
1. 登录用户名随意，密码为 `EA8F18C004A25300EDC39A491692C22119BC015BD4F84AF985E9AEEC1852A0-{{mchConfig.companyId}}`。

### iOS 打包准备

1. 前置物料：Apple 开发者账号
1. 在Xcode中打开设置，添加账号、Download Mamual Profiles、Manage Certifications > Add > Distribution
1. 选中正确的开发团队，Try Fix Signing Certificate。
1. 使用开发者账号登入 `itunesconnect.apple.com` ，添加人员，并创建APP。（信息见《客户信息表》，人员有：夏越 xiayue159@163.com，李斌龙 alexius.lee@qq.com，Lucy xp@efolix.com ，角色可选择 `APP管理`）


### iOS 打包

1. 运行 `npm run build-ios` 构建代码。
1. 打开Xcode，在顶部菜单中找到并运行 `Product > Archive > Upload to App Store`。


### Android 打包准备

1. 加密证书

### Android 打包

1. 运行 `npm run build` 构建代码，APK打包至 `./dist`。



## 配置版本更新

1. 修改 `build/config` 下的 version 字段。
1. 运行 `npm run build-config`。


---------------

## 附：

### 手工修改APP配置

1. 修改 `src/config/index.js` 中的`mchInfo`配置
1. 修改 `package.json` 中的配置，`name` 设为 `mchConfig.packageName`
1. 修改 `app.json` 中的配置， `name` 设为 `mchConfig.appId`，`displayName` 设为 `mchConfig.appName`
1. 【iOS】修改 `ios/TheRNAPP.xcodeproj/project.pbxproj` 中的配置， 查找并替换 `PRODUCT_BUNDLE_IDENTIFIER = com.efolix.MCRetailRNDemo;` 为 `PRODUCT_BUNDLE_IDENTIFIER = {{mchConfig.appId}};`，注意有2处要改。查找并替换 ` = TheRNAPP;` 为 ` = {{mchConfig.packageName}};`，注意有4处要改。查找并替换 `DevelopmentTeam = 3T834TV9MU;` 为 `DevelopmentTeam = {{mchConfig._iOSTeamId}};`，注意有2处要改。修改 `TARGETED_DEVICE_FAMILY = "1,2";`，若仅适配iPhone则设置为 "1"，若适配iPhone+iPad则设置为 "1,2"。
1. 【iOS】修改 `ios/TheRNAPP/Info.plist` 中的配置， `CFBundleDisplayName` 设为 `mchConfig.appName`，`CFBundleShortVersionString` 设为 `appConfig.version`，`CFBundleVersion` 设为 `appConfig.build`。
1. 【iOS】修改 `ios/AdHocExportOptions.plist` 中的配置，`teamID` 设为 `mchConfig._iOSTeamId`。
1. 【iOS】修改 `ios/AppStoreExportOptions.plist` 中的配置，`teamID` 设为 `mchConfig._iOSTeamId`。
1. 【Android】修改 `android/app/build.gradle` 中的配置，`applicationId` 设为 `mchConfig.appId`，`versionName` 设为 `appConfig.version`，`versionCode` 设为 `appConfig.build`。(注意事项 `android/app/build.gradle` 中的 `targetSdkVersion` 需设置为 `23`)
1. 【Android】修改 `android/app/src/main/res/values/strings.xml` 中的配置，`app_name` 的设为 `mchConfig.appName`。

### 手工修改极光推送配置

1. 【Android】修改 `android/app/build.gradle` 中的配置，`JPUSH_APPKEY` 设为 `mchConfig.jiguangPushAppKey`。
1. 【iOS】修改 `ios/TheRNAPP/AppDelegate.m` 中的配置，`[JPUSHService setupWithOption:launchOptions appKey:@"xxxx"` 的值设为 `mchConfig.jiguangPushAppKey`。



### 手工更换 App icon 与 Splash 与 商户登录页面LOGO图

1. 替换 `src/assets/mchImg/login.png`。
1. 【iOS】完整替换 `ios/TheRNAPP/Images.xcassets` 下面的两个目录中的内容 `AppIcon.appiconset`、`LaunchImage.launchimage`。
1. 【Android】替换 `android/app/src/main/res` 目录下的所有 `launch_screen.png` 和 `ic_launcher.png`。

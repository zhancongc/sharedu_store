//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取手机顶部状态栏高度
    wx.getSystemInfo({
      success: res => {
        this.globalData.navHeight = res.statusBarHeight;
      },
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    // 状态栏高度
    navHeight: 20,
    // 商户端服务器url
    domainUrl: "https://store.sharedu.co/",
    // 请求凭证
    authorization: 'Basic c3RvcmU6c3RvcmU=',
    // 请求凭证
    accessToken: '',
    // 用户信息
    userInfo: null,
    // 是否认证
    isIdentificated: false,
    // 店铺id
    storeId: 0,
    // 添加课程信息，临时存放
    addLessonIntro: []
  }
})
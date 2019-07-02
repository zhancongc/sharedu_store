//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: 'sharedu'
    },
    tabBarActive: 0,
    tabBarUrls: ["/pages/index/index", "/pages/lesson/lesson", "/pages/bills/bills", "/pages/me/me"]
  },
  onTabBarChange(event) {
    var that = this;
    if(event.detail !== that.data.tabBarActive) {
      wx.navigateTo({
        url: that.data.tabBarUrls[event.detail],
      })
    }
  },
  onLoad: function () {
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
  }
})

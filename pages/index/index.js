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
    tabBarUrls: ["/pages/index/index", "/pages/lesson/lesson", "/pages/bills/bills", "/pages/me/me"],
    isIdentificated: false,
    statistics: [
    {
      item: '今日入账',
      amount: '0' 
    },{
      item: '今日订单',
      amount: '0'
    },{
      item: '今日课程',
      amount: '0'
    },{
      item: '今日好评',
      amount: '0'
    }, {
      item: '今日中差评',
      amount: '0'
    }],
  },
  onTabBarChange(event) {
    var that = this;
    if(event.detail !== that.data.tabBarActive) {
      wx.redirectTo({
        url: that.data.tabBarUrls[event.detail],
      })
    }
  },
  toComment: function () {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },
  toIdentification: function () {
    wx.navigateTo({
      url: '/pages/identification/identification',
    })
  },
  onLoad: function () {
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
  },
  onShow: function() {
    var that = this;
    that.setData({
      isIdentificated: app.globalData.isIdentificated
    })
  },
  getTodayStatistic: function () {
    var that = this;
    wx.request({
      method: 'get',
      url: app.globalData.domainUrl + 'edu/statistic/today',
      header: {
        'Authorization': 'Basic c3RvcmU6c3RvcmU=',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: function () {},
      fail: function () {},
      complete: function () {}
    })
  }
})



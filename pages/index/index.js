//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '享淘课'
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
      item: '今日评价',
      amount: '0'
    }],
    storePhotoes: [],
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
  onLoad() { 
    wx.showLoading({
      title: '加载中',
    })
  },
  onReady() { },
  onShow() {
    var that = this;
    this.getStoreData()
    wx.hideLoading()
  },
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
    })
  },
  getStoreData() {
    var that = this;
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/store/own',
      header: {
        'Authorization': "bearer " + app.globalData.accessToken,
        'Content-Type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          let response = res.data
          var storeData = response.data
          if (storeData.length > 0) {
            that.setData({ isIdentificated: true, storePhotoes: storeData[0].storePictures })
            app.globalData.isIdentificated = true
          }
        }
      },
      fail() { },
      complete() { }
    })
  },
  getTodayStatistic: function () {
    var that = this
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/statistic/today',
      header: {
        'Authorization': 'Bearer ' + app.globalData.accessToken,
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        storeId: app.globalData.storeId
      },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            // wx.showToast({ icon: 'none', title: '网络请求成功', })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '网络请求失败',
          })
        }
      },
      fail(res) { },
      complete(res) { }
    })
  },
  toAddGift() {
    wx.navigateTo({
      url: '/pages/addGift/addGift',
    })
  }
})



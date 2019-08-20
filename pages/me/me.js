// pages/me/me.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '我的店铺'
    },
    tabBarActive: 3,
    tabBarUrls: ["/pages/index/index", "/pages/lesson/lesson", "/pages/bills/bills", "/pages/me/me"],
    isIdentificated: false
  },
  onTabBarChange(event) {
    var that = this;
    if (event.detail !== that.data.tabBarActive) {
      wx.redirectTo({
        url: that.data.tabBarUrls[event.detail],
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({
      isIdentificated: app.globalData.isIdentificated
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  toAccount : function () {
    wx.navigateTo({
      url: '/pages/account/account',
    })
  },
  toWallet: function() {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
    })
  },
  toStoreDetail: function() {
    wx.navigateTo({
      url: '/pages/storeDetail/storeDetail',
    })
  },
  toAboutUs: function () {
    wx.navigateTo({
      url: '/pages/aboutUs/aboutUs',
    })
  },
  toHelp: function(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  toFeedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  toIdentification: function () {
    wx.navigateTo({
      url: '/pages/identification/identification',
    })
  }
})


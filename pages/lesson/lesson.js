// pages/lesson/lesson.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '课程管理'
    },
    tabBarActive: 1,
    tabBarUrls: ["/pages/index/index", "/pages/lesson/lesson", "/pages/bills/bills", "/pages/me/me"],
    lessonType: 1
  },
  onTabBarChange(event) {
    var that = this;
    if (event.detail !== that.data.tabBarActive) {
      wx.redirectTo({
        url: that.data.tabBarUrls[event.detail],
      })
    }
  },
  switchTabs: function (e) {
    var that = this;
    that.setData({
      billType: e.currentTarget.dataset.index,
    })
    that.setTabsColor(e.currentTarget.dataset.index);
  },
  setTabsColor: function (index) {
    var that = this;
    if (index == 1) {
      that.setData({
        tabColor1: '#ff6600',
        tabColor2: '#888',
      })
      return;
    }
    if (index == 2) {
      that.setData({
        tabColor1: '#888',
        tabColor2: '#ff6600'
      })
      return;
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

  }
})
// pages/bills/bills.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '订单管理'
    },
    tabBarActive: 2,
    tabBarUrls: ["/pages/index/index", "/pages/lesson/lesson", "/pages/bills/bills", "/pages/me/me"],
    isIdentificated: false,
    currentTab: 0,
    tabName: [{ index: 0, name: '待接单' }, { index: 1, name: '已完成' }, {index: 2, name: '全部'}],
    tabColor: ['#ff6600', '#888', '#888'],
    uncompleteBills: [{
      billStatus: '待接单',
      billLessonPicture: '/images/English.jpg',
      billLessonName: '考研英语一基础强化训练',
      billAmount: 388,
      canReceiveOrder: true
    }],
    completeBills: [],
    allBills: [{
      billStatus: '待接单',
      billLessonPicture: '/images/English.jpg',
      billLessonName: '考研英语一阅读专项训练',
      billAmount: 1188,
      canReceiveOrder: true
    }],
  },
  switchTabs: function(e) {
    console.log(e.currentTarget.dataset.index);
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.index,
    })
    that.setTabsColor(e.currentTarget.dataset.index);
  },
  setTabsColor: function (index) {
    var that = this;
    if (index == 0) {
      that.setData({
        tabColor: ['#ff6600', '#888', '#888'],
      })
      return;
    }
    if (index == 1) {
      that.setData({
        tabColor: ['#888', '#ff6600', '#888'],
      })
      return;
    }
    if (index == 2) {
      that.setData({
        tabColor: ['#888', '#888', '#ff6600'],
      })
      return;
    }
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
  toIdentification: function () {
    wx.navigateTo({
      url: '/pages/identification/identification',
    })
  }
})
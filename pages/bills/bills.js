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
    billType: 1,
    allBills: [{
      storeName: '尚德教育',
      billStatus: '待接单',
      billLessonPicture: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJY3iauTMvLDsyB0cxoTfcGU1u1c7uwUz0JC3TjqmV9zhxjzRDPf1FtypEjjCeUolOLUdUGB2JtvXA/132',
      billLessonName: '考研英语一阅读专项训练',
      billAmount: 1188,
      canReceiveOrder: true
    }],
    uncompleteBills: [],
    completeBills: []
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
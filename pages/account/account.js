// pages/account/account.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '账号设置'
    },
    modifyType: 1,
    oldPassword: '',
    newPassword: '',
    retypePassword: '',
    verificationCode: ''
  },

  backHandler: function () {
    wx.navigateBack()
  },
  onOldPasswordChange(event) {
    this.setData({ oldPassword: event.detail })
  },
  onNewPasswordChange(event) {
    this.setData({ newPassword: event.detail })
  },
  onRetypePasswordChange(event) {
    this.setData({ retypePassword: event.detail })
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

  },
  changePassword() {
    var that = this;
    that.setData({
      modifyType: 1
    })
  },
  changePasswordCommit(){
    var that = this;
    wx.request({
      method: 'put',
      url: app.globalData.domainUrl + 'admin/user/edit',
      header: {
        'Authorization': 'Bearer 65b2e95e-b4e7-463a-99da-752355a0f2e7',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        "username": "15821381315", "password": "123456", "newpassword1": "123456", "newpassword2": "123456", "avatar": null, "phone": "15821381315"
      },
      success() {},
      fail() {},
      complete() {}
    })
  }
})
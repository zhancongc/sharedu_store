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
    phone: '',
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
    this.setData({
      phone: wx.getStorageSync('phone')
    })
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
        'Authorization': 'Bearer ' + app.globalData.accessToken,
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        "username": that.data.phone,
        "password": that.data.oldPassword,
        "newpassword1": that.data.newPassword,
        "newpassword2": that.data.retypePassword,
        "avatar": null,
        "phone": that.data.phone
      },
      success(res) {
        console.log(res)
        if (res.statusCode==200){
          if (res.data.data){
            wx.showToast({
              icon: 'none',
              title: '修改成功',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: res.data.msg,
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '网络请求失败',
          })
        }
      },
      fail() {},
      complete() {
        wx.navigateBack()
      }
    })
  }
})
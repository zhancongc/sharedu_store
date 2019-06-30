// pages/register/register.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      backWord: "登录",
      pageTitle: "账号注册"
    },
    phone: '',
    password: '',
    verificationCode: '',
    agreement: false
  },
  backHandler: function () {
    wx.redirectTo({
      url: '/pages/login/login',
    })
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
  onChangePhone(event) {
    // event.detail 为当前输入的值
    var that = this;
    that.data.phone = event.detail;
  },
  onChangePassword(event) {
    var that = this;
    that.data.password = event.detail;
  },
  onChangeVerificationCode(event) {
    var that = this;
    that.data.verificationCode = event.detail;
  },
  onChangeAgreement(event) {
    var that = this;
    that.setData({
      agreement: event.detail
    });
  },
  userRegister: function() {
    // 用户注册
    var that = this;
    console.log(that.data.phone, that.data.password, that.data.varificationCode);
    if (that.data.phone === '123' && that.data.varificationCode === '123') {
      wx.showToast({title: '注册成功',})
      wx.navigateTo({ url: '/pages/index/index', });
      // wx.redirectTo({url: '/pages/index/index',})
    }
  }
})
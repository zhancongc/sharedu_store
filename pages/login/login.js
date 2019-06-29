// pages/login/login.js
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      backWord: '注册',
      pageTitle: '密码登陆'
    },
    loginViaPassword: true,
    phone: '',
    password: '',
    verificationCode: ''
  },
  backWordHandler: function () {
    wx.redirectTo({
      url: '/pages/register/register',
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
  switchToVerificationCodeLogin : function () {
    // 切换到验证码登录
    this.setData({
      loginViaPassword: false
    })
  },
  switchToPasswordLogin: function () {
    // 切换到密码登录
    this.setData({
      loginViaPassword: true
    })
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
  userLogin:function () {
    // 用户登录
    var that = this;
    var passkey;
    console.log(that.data.loginViaPassword)
    if(that.data.loginViaPassword) {
      passkey = that.data.password
    } else {
      passkey = that.data.verificationCode
    }
    console.log(that.data.phone, passkey);
    if(that.data.phone === '123' && passkey === '123') {
      wx.showToast({
        title: '正在登录',
      })
      wx.navigateTo({url: '/pages/index/index',})
      // wx.redirectTo({url: '/pages/index/index',})
    } else if (that.data.phone === '' && passkey === '') {
      wx.showToast({ title: '账号或密码为空',})
    } 
    else {
      wx.showToast({title: '账号或密码错误',})
    }
  }
})
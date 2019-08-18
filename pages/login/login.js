// pages/login/login.js
const fs = wx.getFileSystemManager()
const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      backWord: '注册',
      pageTitle: '登录'
    },
    loginViaPassword: true,
    phone: '',
    password: '',
    verificationCode: '',
    imageCode: '',
    imageCodeUrl: '',
    randomStr: '',
  },
  backWordHandler: function () {
    wx.redirectTo({
      url: '/pages/register/register',
    })
  },
  /*校验手机号码格式 */
  isPhoneNumber: function (str) {
    var reg = /^(1[345789]\d{9})$/;
    return reg.test(str);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getImageCode()
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
    that.setData({ phone: event.detail.trim() })
  },
  onChangePassword(event) {
    var that = this;
    that.setData({ password: event.detail.trim() })
  },
  onChangeImageCode(event) {
    var that = this;
    console.log(event.detail)
    that.setData({ imageCode: event.detail.trim() })
  },
  onChangeVerificationCode(event) {
    var that = this;
    that.setData({ verificationCode: event.detail.trim() })
  },
  loginConfirm:function () {
    var that = this;
    if(that.data.loginViaPassword) {
      var loginForm = {
        phone: that.data.phone,
        password: that.data.password,
        imageCode: that.data.imageCode,
        randomStr: that.data.randomStr
      }
      if (loginForm.phone !== '' && loginForm.password!=='' && loginForm.imageCode!=='' && loginForm.randomStr!==''){
        that.passwordLogin(loginForm)
      }
    } else {
      var loginForm = {
        phone: that.data.phone,
        verificationCode: that.data.verificationCode
      }
      if (loginForm.phone !== '' && loginForm.verificationCode!=='') {
        that.verificationCodeLogin(loginForm)
      }
    }
  },
  getImageCode: function () {
    var that = this;
    var timestamp = (new Date()).getTime().toString()
    var randomCode = (Math.trunc(Math.random() * 10000000)).toString()
    that.setData({})
    console.log("OK")
    wx.downloadFile({
      method: 'get',
      url: app.globalData.domainUrl + 'code?randomStr=' + that.data.randomStr,
      header: {
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            randomStr: randomCode + timestamp,
            imageCodeUrl: res.tempFilePath
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  },
  passwordLogin: function (loginForm) {
    var that = this;
    var data = {
      username: that.data.phone,
      password: that.data.password,
      randomStr: that.data.randomStr,
      code: that.data.imageCode,
      grant_type: 'password',
      scope: 'server'
      };
    console.log(data);
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'auth/oauth/token',
      header: { 
        'Authorization': 'Basic c3RvcmU6c3RvcmU==',
        'Content-Type': 'application/json'
      },
      data: { 
        username: that.data.phone,
        password: that.data.password,
        randomStr: that.data.randomStr,
        code: that.data.imageCode,
        grant_type: 'password',
        scope: 'server'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code==0) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: function() {},
      complete: function(){}
    })
  },
  getVerificationCode: function (event) {
    // 获取验证码
    var that = this;
    console.log(event)
    if (!that.isPhoneNumber(that.data.phone)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的手机号码',
      })
      return;
    }
    wx.request({
      url: app.globalData.domainUrl + '/admin/mobile/' + this.data.phone,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) {
        if (res.code === 0) {
          that.setData({
            verificationCodeHint: '已发送'
          })
        }
      }
    })
  },
  verificationCodeLogin: function(loginForm) {
    var that = this;
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'auth/mobile/token/sms',
      header: {
        'Authorization': 'Basic c3RvcmU6c3RvcmU==',
        'Content-Type': 'application/json'
      },
      data: {
        username: 'SMS@'+that.data.phone,
        verificationCode: that.data.verificationCode,
        grant_type: 'mobile',
      },
      success: function (res) {
        if (res.code == 200) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  }
})
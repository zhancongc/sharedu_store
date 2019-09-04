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
    phone: '15821381315',
    password: '123456',
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
    var that = this;
    that.loginDataAutoFilled()
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
  loginConfirm () {
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
  getImageCode() {
    console.log('get image code')
    var that = this;
    var timestamp = (new Date()).getTime().toString();
    var randomCode = (Math.trunc(Math.random() * 10000000)).toString();
    var randomStr = randomCode + timestamp;
    wx.downloadFile({
      method: 'get',
      url: app.globalData.domainUrl + 'code?randomStr=' + randomStr,
      header: {
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            randomStr: randomStr,
            imageCodeUrl: res.tempFilePath
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  },
  passwordLogin(loginForm) {
    var that = this;
    var data = {
      username: that.data.phone,
        password: that.data.password,
          randomStr: that.data.randomStr,
            code: that.data.imageCode,
              grant_type: 'password',
                scope: 'server'
    }
    console.log(data);
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'auth/oauth/token?randomStr=' + that.data.randomStr + '&code='+ that.data.imageCode,
      header: { 
        'Authorization': 'Basic c3RvcmU6c3RvcmU=',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        username: that.data.phone,
        password: that.data.password,
        grant_type: 'password',
        scope: 'server'
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200){
          if (res.errMsg === "request:ok") {
            if (res.data.store_id) {
              app.globalData.isIdentificated = true
              app.globalData.storeId = res.data.store_id
            }
            app.globalData.accessToken = res.data.access_token
            that.loginDataRemember()
            wx.showToast({
              icon: 'none',
              title: '登录成功',
            })
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '登陆失败',
          })
          that.getImageCode()
        }
      },
      fail: function() {},
      complete: function(){}
    })
  },
  getVerificationCode(event) {
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
      url: app.globalData.domainUrl + 'admin/mobile/' + this.data.phone,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        if (res.data.code === 0) {
          that.setData({
            verificationCodeHint: '已发送'
          })
          if (res.data.data === false) {
            wx.showToast({
              icon: 'none',
              title: '验证码已发送',
            })
          }
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  verificationCodeLogin(loginForm) {
    var that = this;
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'auth/mobile/token/sms',
      header: {
        'Authorization': 'Basic c3RvcmU6c3RvcmU==',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        mobile: 'SMS@'+that.data.phone,
        code: that.data.verificationCode,
        grant_type: 'mobile',
      },
      success: function (res) {
        if (res.code == 200) {
          if (res.data.store_id) {
            app.globalData.isIdentificated = true
            app.globalData.storeId = res.data.store_id
          }
          that.loginDataRemember()
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: function () { },
      complete: function () { }
    })
  },
  loginDataRemember() {
    var that = this;
    wx.setStorage({ key: 'phone', data: that.data.phone })
    wx.setStorage({ key: 'password', data: that.data.password })
  },
  loginDataAutoFilled() {
    var that = this;
    that.setData({
      phone: wx.getStorageSync('phone'),
      password: wx.getStorageSync('password')
    })
  }
})
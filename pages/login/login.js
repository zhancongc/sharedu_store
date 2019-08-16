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
      pageTitle: '登录'
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
    wx.request({
      url: app.globalData.domainUrl + ''
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
  loginConfirm:function () {
    var that = this;
    var passkey;
    if(that.data.loginViaPassword) {
      passkey = that.data.password
    } else {
      passkey = that.data.verificationCode
    }
    if(that.data.phone && passkey) {
      wx.showToast({
        title: '正在登录',
      })
      that.userLogin()
    } else {
      wx.showToast({title: '账号或密码错误',})
    }
  },
  userLogin: function (account, pass) {
    var that = this;
    out = that.crypto('password', '123456')
    console.log(out)
    /*wx.request({
      method: 'post',
      url: app.globalData.domainUrl + '',
      header: { 
        'Authorization': 'Basic cGlnOnBpZw==',
        'Content-Type': 'application/json'
      },
      data: { 
        username: that.data.phone,
        password: 'rKu1/348LvKp0rsVC06eCA==',
        randomStr: '95691565501687323',
        code: '1234',
        grant_type: 'password',
        scope: 'server'
      },
      success: function (res) {
        if (res.code==0) {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: function() {},
      complete: function(){}
    })*/
  },
  getImageCode=function(){
    var timestamp = (new Date()).getTime().toString()
    var randomCode = (Math.trunc(Math.random() * 10000000)).toString()
    wx.request({
      method: 'get',
      url: 'https://store.sharedu.co/code?randomStr=' + randomCode + timestamp,
      success: function(res){
        console.log(res)
        const fs = wx.getFileSystemManager()
        fs.writeFileSync(`${wx.env.USER_DATA_PATH}/imageCode.png`, res.data, 'binary')
      },
      fail: function() {},
      complete: function() {}
    })
  }
})
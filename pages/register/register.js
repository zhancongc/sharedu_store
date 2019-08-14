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
    verificationCodeHint: '验证码',
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
    that.data.phone = event.detail.trim();
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
  getVerificationCode: function () {
    // 获取验证码
    var that = this;
    wx.request({
      url: app.globalData.domainUrl + '/admin/mobile/' + this.data.phone,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {},
      fail: function (res) {},
      complete: function(res) {
        if (res.code===0) {
          that.setData({
            verificationCodeHint: '已发送'
          })
        }
      }
    })
  },
  userRegister: function () {
    var that = this;
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + '/admin/user/storeRegistry',
      header: {'Content-Type': 'application/json'},
      data: { 
        phone: that.data.phone,
        verificationCode: that.data.varificationCode,
        password: that.data.password
      },
      success: function () {
        wx.redirectTo({
          url: '/pages/index/index',
        })
      },
      fail: function () {},
      complete: function() {}
    })
  },
  registerConfirm: function() {
    // 用户注册
    var that = this;
    console.log(that.data.phone, that.data.password, that.data.varificationCode);
    if (!that.isPhoneNumber(that.data.phone)){
      wx.showToast({
        title: '请输入正确格式的手机号码',
      })
      return;
    } 
    if (!that.isVerificationCode(that.data.varificationCode)) {
      wx.showToast({
        title: '请输入正确格式的手机号码',
      })
      return;
    }
    if (!that.data.varificationCode) {
      wx.showToast({
        title: '请填写密码',
      })
      return;
    }
    that.userRegister()
  },
  /*校验是否全由8位数字组成 */
  isVerificationCode: function(str) {
    var reg = /^[0-9]{4}$/;   /*定义验证表达式*/
    return reg.test(str);     /*进行验证*/
  },
  /*校验手机号码格式 */
  isPhoneNumber: function(str) {
    var reg = /^(1[345789]\d{9})$/;
    return reg.test(str);
  }
})
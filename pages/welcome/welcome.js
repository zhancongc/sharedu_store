// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intro: [
      {
        timestamp: '',
        type: 'image',
        url: 'https://image.sharedu.co/20190928/785f5c74a6254cbaa8f7125b8c4887c1.jpg'
      },
      {
        timestamp: '',
        type: 'text',
        content: ''
      },
      {
        timestamp: '',
        type: 'vedio',
        url: '/images/logo.png'
      },
    ],
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
  toLogin: function() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  toRegister: function () {
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  toIdentification:function() {
    wx.navigateTo({
      url: '/pages/identification/identification',
    })
  },
  toIndex: function() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  toIntro() {
    wx.navigateTo({
      url: '/pages/lessonIntro/lessonIntro',
    })
  },
  bindGetUserInfo(event){
    console.log(event);
  }
})
// pages/addLesson/addLesson.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: "添加课程"
    },
    // 添加图片
    currentTab: '',
    addPhotoCSS: ['photo-preview', 'photo-upload'],
    addPhotoCSSIndex: 1,
    uploadPhotoes: [],
    // 添加课程
    lessonName: '',
    lessonType: '',
    lessonTimes: '',
    lessonPrice: '',
    lessonIntro: '',
    lessonArea: {
      lessonMainArea: {},
      lessonDetailType: {}
    }
  },
  backHandler: function () {
    wx.navigateBack()
  },
  addLessonPhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        if (tempFilePaths) {
          that.setData({
            addPhotoCSSIndex: 0,
            uploadPhotoes: tempFilePaths
          })
        } else {
          that.setData({
            addPhotoCSSIndex: 1,
            uploadPhotoes: []
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  addLessonCommit: function () {
    var that = this;
    if (that.data.storeName && that.data.cityName && that.data.detailAddress && that.data.uploadPhotoes && that.data.liencePhoto) {
      app.globalData.isIdentificated = true;
      wx.navigateTo({
        url: '/pages/index/index',
      })
    } else {
      wx.showToast({
        title: '有些数据未填',
        duration: 1500,
        icon: "none"
      })
    }
  },
  addLessonIntro: function () {
    wx.navigateTo({
      url: '/pages/lessonIntro/lessonIntro',
    })
  },
})
// pages/lessonIntro/lessonIntro.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '添加课程介绍'
    },
    actionSheetShow: false,
    actions: [
      {
        name: '文字'
      },
      {
        name: '图片',
      }
    ],
    /*intro: [
      {
        type: 'image',
        url: '/images/logo.png'
      },
      {
        type: 'text',
        content: ''
      },
      {
        type: 'vedio',
        url: '/images/logo.png'
      },
    ],*/
    intro: [],
  },
  backHandler: function () {
    wx.navigateBack()
  },
  showActionSheet: function () {
    this.setData({ actionSheetShow: true })
  },
  closeActionSheet(event) {
    console.log(event.detail)
    this.setData({ actionSheetShow: false });
  },
  selectActionSheet(event) {
    var that = this;
    var tempIntro = that.data.intro;
    console.log(event.detail);
    if (event.detail.name == '文字') {
      tempIntro.push({
        type: 'text',
        content: ''
      })
      that.setData({ intro: tempIntro })
      that.setData({ actionSheetShow: false });
    }
    if (event.detail.name == '图片') {
      var tempIntro = that.data.intro;
      wx.chooseImage({
        count: 1,
        sizeType: ['compress'],
        sourceType: ['album', 'camera'],
        success: function(res) {
          var tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            tempIntro.push({
              type: 'image',
              url: res.tempFilePaths[0]
            })
          } else {    //图片大于5M，弹出一个提示框
            wx.showToast({
              title: '上传图片不能大于5M!',  //标题
              icon: 'none'       //图标 none不使用图标，详情看官方文档
            })
          }
        },
      })
      that.setData({ actionSheetShow: false });
    }
    if (event.detail.name == '视频') {
      tempIntro.push({
        type: 'vedio',
        url: ''
      })
      that.setData({ intro: tempIntro })
      that.setData({ actionSheetShow: false });
    }
  },
  cancelActionSheet(event) {
    console.log(event.detail);
    this.setData({ actionSheetShow: false });
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

  }
})
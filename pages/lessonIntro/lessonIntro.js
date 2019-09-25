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
        timestamp: '',
        type: 'image',
        url: '/images/logo.png'
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
    console.log(event.detail);
    var that = this;
    var tempIntro = that.data.intro;
    if (event.detail.name == '文字') {
      var timestamp = (new Date()).getTime();
      tempIntro.push({
        timestamp: timestamp,
        type: 'text',
        content: ''
      })
      that.setData({ intro: tempIntro });
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
            var timestamp = (new Date()).getTime();
            tempIntro.push({
              timestamp: timestamp,
              type: 'image',
              url: res.tempFilePaths[0]
            })
            that.setData({ intro: tempIntro })
            that.uploadIntroFile(timestamp, tempIntro.url)
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
      var timestamp = (new Date()).getTime();
      tempIntro.push({
        timestamp: timestamp,
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
  /*getIntroText(event) {
    console.log(event);
    var tempIntro = this.data.intro;
    for(var i in tempIntro){
      if (tempIntro[i].timestamp === event.target.dataset.timestamp) {
        var content = event.detail.value;
        tempIntro[i].content = content;
      }
    }
    this.setData({
      intro: tempIntro
    })
  },*/
  getIntroText(event){
    var tempIntro = this.data.intro
    for(var index in tempIntro){
      if (tempIntro[index].timestamp === event.target.dataset.timestamp) {
        var content = event.detail.value
        tempIntro[index].content = content
      }
    }
    this.setData({ intro : tempIntro })
  },
  uploadIntroFile(timestamp, fileName) {
    var that = this;
    let tempIntro = that.data.intro;
    wx.showLoading({ title: '上传中', })
    wx.uploadFile({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/oss/upload',
      name: 'file',
      filePath: fileName,
      header: {
        'Authorization': 'Bearer ' + app.globalData.accessToken,
      },
      success(res) {
        console.log(res)
        var response = JSON.parse(res.data)
        if (response.msg == 'success') {
          console.log(response.data)
          for (var item in tempIntro){
            if (tempIntro[item]['timestamp'] == timestamp){
              tempIntro[item].url = response.data
            }
          }
          that.setData({
            intro: tempIntro
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '上传图片失败',
          })
        }
      },
      fail() {
        wx.showToast({
          icon: 'none',
          title: '网络请求失败，请重试',
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  lessonIntroCommit: function() {
    app.globalData.addLessonIntro = this.data.intro;
    wx.navigateBack();
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      intro: app.globalData.addLessonIntro
    })
    app.globalData.addLessonIntro = '';
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
    this.setData({intro: []})
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
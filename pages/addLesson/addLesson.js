// pages/addLesson/addLesson.js
const app = getApp()
const lessons = {
  "中小学文化课": ["语数外", "理化生", "政历地"],
  "早教课": ["学前智力开发", "艺术启蒙"],
  "健身户外": ["攀岩", "冲浪", "潜水",],
  "琴棋书画": ["乐器", "棋类", "书法", "绘画"],
  "体操舞蹈": ["体操", "舞蹈"],
  "软件编程": ["青少年编程", "其它计算机技术"],
  "其它类": ["其它"]
};

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
    lessonIntroState: '',
    lessonPicker: false,
    allLesson: '',
    columns: [
      {
        values: Object.keys(lessons),
        className: 'column1'
      },
      {
        values: lessons['中小学文化课'],
        className: 'column2',
        defaultIndex: 1
      }
    ]
  },
  backHandler: function () {
    wx.navigateBack()
  },
  onChangeLessonName(event) {
    console.log(event.detail)
    this.setData({lessonName: event.detail})
  },
  onChangeLessonTimes(event) {
    console.log(event.detail)
    this.setData({lessonTimes: event.detail})
  },
  onChangeLessonPrice(event) {
    console.log(event.detail)
    this.setData({ lessonPrice: event.detail })
  },
  onHidePicker: function () {
    this.setData({lessonPicker: false})
  },
  onCancelPicker(event) {
    console.log(event.detail);
    this.setData({lessonPicker: false});
  },
  onChangePicker(event) {
    console.log(event.detail);
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, lessons[value[0]]);
    var tempType = event.detail.value;
    this.setData({lessonType: tempType[1]});
  },
  onConfirmPicker(event) {
    console.log(event.detail);
    var tempType = event.detail.value;
    this.setData({ lessonType: tempType[1], lessonPicker: false });
  },
  addLessonPhoto: function() {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
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
    var that = this;
    wx.request({
      method: 'get',
      url: app.globalData.domainUrl +'edu/courseCategory/findPage?pageSize=100',
      header: {
        'Authorization': 'Basic c3RvcmU6c3RvcmU==',
        'Content-Type': 'application/json'
      },
      success(res){
        console.log(res);
        that.setData({
          allLesson: res.data
        })
      },
      fail() {},
      complete() {}
    })
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
    var that = this;
    if (app.globalData.addLessonIntro.length !== 0) {
      that.setData({
        lessonIntro: app.globalData.addLessonIntro,
        lessonIntroState: '已填写'
      })
    }
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
  uploadFile (filename) {
    wx.uploadFile({
      url: app.globalData.domainUrl + 'edu/oss/upload',
      filePath: filename,
      //name: 'file',
      success(res) {
        console.log(res)
        //do something
      }
    })
  },
  sendLessonInfo() {
    var that = this;
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/course/insert',
      header: {
        'Authorization': 'Basic c3RvcmU6c3RvcmU=',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        title: that.data.lessonName,
        classHours: that.data.lessonTimes,
        course: that.data.lessonType,
        experiencePrice: that.data.lessonPrice,
        storeId: app.globalData.storeId,
      }
    })
  },
  addLessonCommit() {
    var that = this;
    if (that.data.uploadPhotoes && that.data.lessonName && that.data.lessonType && that.data.lessonTimes && that.data.lessonPrice && that.data.lessonIntro.length > 0) {
      // 上传课程图片
      for (var fp in that.data.uploadPhotoes) {
        that.uploadFile(that.data.uploadPhotoes[fp])
      }
      // 上传
      for (var index in that.data.lessonIntro) {
        if (that.data.lessonIntro[index].type == 'images'){
          that.uploadFile(that.data.lessonIntro[index])
        }
      }
      app.globalData.isIdentificated = true;
      wx.navigateBack();
    } else {
      wx.showToast({
        title: '有些数据未填',
        duration: 1500,
        icon: "none"
      })
    }
  },
  toLessonIntro() {
    wx.navigateTo({
      url: '/pages/lessonIntro/lessonIntro',
    })
  },
  chooseLessonType() {
    this.setData({lessonPicker: true})
  }
})
// pages/addLesson/addLesson.js
import { lessons } from "../../utils/lesson.js"
const app = getApp()
const lessonsDict = { '中小学文化课': 1566295084992, '早教课': 1566295117317, '健身户外': 1566295178029, '体操舞蹈': 1566295209138, '软件编程': 1566295222585, '其它类': 1566295231348, '琴棋书画': 1566295415912, '语数外': 1566295561211, '理化生': 1566295570038, '政史地': 1566295576189, '学前智力开发': 1566295653403, '艺术启蒙': 1566295667369, '攀岩': 1566295689776, '冲浪': 1566295696729, '潜水': 1566295702471, '体操': 1566295784564, '舞蹈': 1566295793301, '青少年编程': 1566296043838, '其它计算机技术': 1566296075689, '乐器': 1566295739380, '棋类': 1566295744702, '书法': 1566295754157, '绘画': 1566295765198, '其它': 1566296081426 }

Page({
  /**
   * Page initial data
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: "编辑课程"
    },
    // 添加图片
    currentTab: '',
    addPhotoCSS: ['photo-preview', 'photo-upload'],
    addPhotoCSSIndex: 1,
    lessonId: 0,
    // 课程图片
    lessonImage: [],
    // 添加课程
    lessonName: '', // 课程名称
    lessonType: '', // 课程类型
    lessonTimes: '', // 课时数
    lessonPrice: '', // 课程价格
    lessonIntroState: '', // 课程介绍填写状态
    lessonPicker: false, // 课程类别选择器显示状态
    lessons: '',  // 课程类别大全
    itemsList: [],
    pictureUrlList: [],
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
  backHandler() {
    wx.navigateBack()
  },
  onChangeLessonName(event) {
    this.setData({ lessonName: event.detail })
  },
  onChangeLessonTimes(event) {
    this.setData({ lessonTimes: event.detail })
  },
  onChangeLessonPrice(event) {
    this.setData({ lessonPrice: event.detail })
  },
  onHidePicker: function () {
    this.setData({ lessonPicker: false })
  },
  onCancelPicker(event) {
    this.setData({ lessonPicker: false });
  },
  onChangePicker(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1, lessons[value[0]]);
    var tempType = event.detail.value;
    this.setData({ lessonType: tempType[1] });
  },
  onConfirmPicker(event) {
    var tempType = event.detail.value;
    this.setData({ lessonType: tempType[1], lessonPicker: false });
  },
  addLessonPhoto: function () {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths) {
          that.setData({
            addPhotoCSSIndex: 0,
            lessonImage: tempFilePaths
          })
          that.uploadLessonImage()
        } else {
          that.setData({
            addPhotoCSSIndex: 1,
            lessonImage: []
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { }
    })
  },
  getLessonsType(data) {
    var tempLessons
    for (var index in data) {
      var tempList = []
      for (var subindex in data[index].childCategoryList) {
        tempList.push(data[index].childCategoryList[subindex])
      }
      tempLessons[data[index].name] = tempList
    }
    return tempLessons
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    var lesson = JSON.parse(options.lesson)
    for (var index in lessonsDict ) {
      if (lessonsDict[index] == lesson.lessonTypeId) {
        that.setData({ lessonType: index})
      }
    }
    var lessonIntroState
    if (lesson.itemsList.length > 0) {
      lessonIntroState = "已填写"
      var tempItem = []
      for (var index in lesson.itemsList) {
        tempItem.push(JSON.parse(lesson.itemsList[index]))
      }
      app.globalData.addLessonIntro = tempItem
    }
    if (lesson.lessonPictureUrlList) {
      that.setData({ addPhotoCSSIndex: 0, lessonImage: lesson.lessonPictureUrlList})
    }
    that.setData({
      lessonId: lesson.lessonId,
      lessonName: lesson.lessonName,
      lessonTimes: lesson.lessonTimes,
      lessonPrice: lesson.lessonPrice,
      itemsList: lesson.itemsList,
      lessonIntroState: lessonIntroState
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
    if (app.globalData.addLessonIntro.length > 0) {
      let itemsList = []
      for (let index in app.globalData.addLessonIntro) {
        let introItem = JSON.stringify(app.globalData.addLessonIntro[index])
        itemsList.push(introItem)
      }
      that.setData({
        itemsList: itemsList,
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
    app.globalData.addLessonIntro = ''
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
  uploadLessonImage() {
    var that = this
    var tempLessonImage = []
    wx.showLoading({ title: '上传中', })
    for (var index in that.data.lessonImage) {
      wx.uploadFile({
        method: 'post',
        url: app.globalData.domainUrl + 'edu/oss/upload',
        name: 'file',
        filePath: that.data.lessonImage[index],
        header: {
          'Authorization': 'Bearer ' + app.globalData.accessToken,
        },
        success(res) {
          console.log(res)
          var response = JSON.parse(res.data)
          if (response.msg == 'success') {
            console.log(response.data)
            tempLessonImage.push(response.data)
            console.log(tempLessonImage)
            that.setData({
              pictureUrlList: tempLessonImage
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
    }
  },
  sendLessonInfo() {
    var that = this
    var data = {
      id : that.data.lessonId,
      title: that.data.lessonName,
      classHours: that.data.lessonTimes,
      course: that.data.lessonType,
      experiencePrice: that.data.lessonPrice,
      storeId: app.globalData.storeId,
      courseCategoryId: lessonsDict[that.data.lessonType],
      itemsList: that.data.itemsList,
      pictureUrlList: that.data.pictureUrlList
    }
    console.log(data)
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/course/updateById',
      header: {
        'Authorization': 'Bearer ' + app.globalData.accessToken,
        'Content-Type': 'application/json'
      },
      data: data,
      success(res) {
        if (res.statusCode == 200) {
          console.log(res)
          let response = res.data
          console.log(response)
          if (response.code == 0) {
            wx.navigateBack();
          }
        }
      },
      fail(res) { },
      complete(res) {
        wx.hideLoading()
      }
    })
  },
  addLessonCommit() {
    var that = this;
    if (that.data.lessonId > 0 && that.data.lessonImage && that.data.lessonName && that.data.lessonType && that.data.lessonTimes && that.data.lessonPrice && that.data.itemsList.length > 0) {
      wx.showLoading({
        title: '上传中',
      })
      app.globalData.addLessonIntro = ''
      that.sendLessonInfo()
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
    this.setData({ lessonPicker: true })
  }
})

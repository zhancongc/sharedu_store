// pages/lesson/lesson.js
const app = getApp()
/*Array.prototype.remove = function (from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};*/
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '课程管理'
    },
    tabBarActive: 1,
    tabBarUrls: ["/pages/index/index", "/pages/lesson/lesson", "/pages/bills/bills", "/pages/me/me"], 
    isIdentificated: false,
    currentTab: 0,
    tabName: [{index: 0, name: '上架课程'}, {index: 1, name: '下架课程'}],
    tabColor: ['#ff6600', '#888'],
    /*forSaleLesson: [{
      id: 123456,
      lessonName: '考研英语',
      lessonPrice: '799',
      lessonTimes: 10,
      lessonPicture: 'http://image.sharedu.co/20190825/3f0ec731bd50480592f0e3594385977d.jpg',
    }],*/
    forSaleLesson: [],
    outOfSaleLesson: []
  },
  onTabBarChange(event) {
    var that = this;
    if (event.detail !== that.data.tabBarActive) {
      wx.redirectTo({
        url: that.data.tabBarUrls[event.detail],
      })
    }
  },
  switchTabs: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.index,
    })
    that.setTabsColor(e.currentTarget.dataset.index);
    if (that.data.currentTab === 0 ){
      that.getOnlineLessons()
    } else {
      that.getOfflineLessons()
    }
  },
  setTabsColor: function (index) {
    var that = this;
    if (index == 0) {
      that.setData({
        tabColor: ['#ff6600', '#888']
      })
      return;
    }
    if (index == 1) {
      that.setData({
        tabColor: ['#888', '#ff6600']
      })
      return;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ isIdentificated: app.globalData.isIdentificated })
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
    that.getOnlineLessons()
    that.getOfflineLessons()
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
  toAddLesson : function() {
    wx.navigateTo({
      url: '/pages/addLesson/addLesson',
    })
  },
  toIdentification: function () {
    wx.navigateTo({
      url: '/pages/identification/identification',
    })
  },
  toLessonEdit (event) {
    var that = this;
    var lessonId = event.currentTarget.dataset.lessonid
    var tempIndex = that.getLessonIndex(that.data.outOfSaleLesson, lessonId)
    console.log("lessonId", lessonId, tempIndex)
    if (tempIndex < 0) {
      var tempIndex2 = that.getLessonIndex(that.data.forSaleLesson, lessonId)
      console.log("forSale", tempIndex2)
      var lesson = that.data.forSaleLesson[tempIndex2]
    } else {
      var lesson = that.data.outOfSaleLesson[tempIndex]
    }
    console.log(lesson)
    wx.navigateTo({
      url: '/pages/lessonEdit/lessonEdit?lesson='+JSON.stringify(lesson),
    })
  },
  getLessonIndex(lesson, lessonId) {
    for (var index in lesson) {
      if (lesson[index].lessonId === lessonId) {
        return index
      }
    }
    return -1
  },
  outOfSale (event) {
    var that = this;
    console.log(event);
    let lessonId = event.currentTarget.dataset.lessonid
    var data = { id: lessonId }
    wx.request({
      method: 'post',
      url: 'https://store.sharedu.co/edu/course/offline?id='+ lessonId,
      header: { 'Authorization': 'Bearer ' + app.globalData.accessToken },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            var tempForSaleLesson = that.data.forSaleLesson
            for (var index in tempForSaleLesson) {
              if (tempForSaleLesson[index].lessonId == lessonId) {
                tempForSaleLesson.splice(index, 1)
              }
            }
            console.log(tempForSaleLesson)
            that.setData({ forSaleLesson: tempForSaleLesson })
          }
        }
      }
    })
  },
  forSale (event) {
    var that = this;
    let lessonId = event.currentTarget.dataset.lessonid
    wx.request({
      method: 'post',
      url: 'https://store.sharedu.co/edu/course/online?id='+lessonId,
      header: { 'Authorization': 'Bearer ' + app.globalData.accessToken },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data.code == 0) {
            let tempOutOfSaleLesson = that.data.outOfSaleLesson
            for (var index in tempOutOfSaleLesson) {
              if (tempOutOfSaleLesson[index].lessonId == lessonId) {
                tempOutOfSaleLesson.splice(index, 1)
              }
            }
            console.log(tempOutOfSaleLesson)
            that.setData({ outOfSaleLesson: tempOutOfSaleLesson})        
          }
        }
      }
    })
  },
  getOnlineLessons() {
    var that = this
    wx.request({ 
      method: 'get',
      url: 'https://store.sharedu.co/edu/course/findOwnOnlinePage',
      header: { 'Authorization': 'Bearer ' + app.globalData.accessToken },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data) {
            var onlineLesson = res.data.data
            if (onlineLesson !== null && onlineLesson.length > 0) {
              let tempOnlineLesson = []
              for (let index in onlineLesson) {
                let tempLesson = {}
                console.log(onlineLesson[index])
                tempLesson.lessonId = onlineLesson[index].id
                tempLesson.lessonName = onlineLesson[index].title
                tempLesson.lessonPrice = onlineLesson[index].experiencePrice
                tempLesson.lessonTimes = onlineLesson[index].classHours
                tempLesson.lessonTypeId = onlineLesson[index].courseCategoryId
                if (onlineLesson[index].pictureUrlList.length > 0){
                  tempLesson.lessonPicture = onlineLesson[index].pictureUrlList[0]
                  tempLesson.lessonPictureUrlList = onlineLesson[index].pictureUrlList
                }
                tempLesson.itemsList = onlineLesson[index].itemsList
                tempOnlineLesson.push(tempLesson)
              }
              console.log(tempOnlineLesson)
              that.setData({
                forSaleLesson: tempOnlineLesson
              })
            }
          }
        }
      },
      fail(res) {},
      complete(res) {}
    })
  },
  getOfflineLessons() {
    var that = this
    wx.request({
      method: 'get',
      url: 'https://store.sharedu.co/edu/course/findOwnOfflinePage',
      header: { 'Authorization': 'Bearer ' + app.globalData.accessToken },
      success(res) {
        console.log(res)
        if (res.statusCode == 200) {
          if (res.data) {
            let offlineLesson = res.data.data
            if (offlineLesson !== null && offlineLesson.length > 0) {
              let tempOfflineLesson = []
              for (let index in offlineLesson) {
                let tempLesson = {}
                tempLesson.lessonId = offlineLesson[index].id
                tempLesson.lessonName = offlineLesson[index].title
                tempLesson.lessonPrice = offlineLesson[index].experiencePrice
                tempLesson.lessonTimes = offlineLesson[index].classHours
                tempLesson.lessonTypeId = offlineLesson[index].courseCategoryId
                if (offlineLesson[index].pictureUrlList.length > 0) {
                  tempLesson.lessonPicture = offlineLesson[index].pictureUrlList[0]
                  tempLesson.lessonPictureUrlList = offlineLesson[index].pictureUrlList
                }
                tempLesson.itemsList = offlineLesson[index].itemsList
                tempOfflineLesson.push(tempLesson)
              }
              console.log(tempOfflineLesson)
              that.setData({
                outOfSaleLesson: tempOfflineLesson
              })
            }
          }
        }
      },
      fail(res) { },
      complete(res) { }
    })
  },
})
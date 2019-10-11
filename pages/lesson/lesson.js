// pages/lesson/lesson.js
const app = getApp()
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
            let onlineLesson = res.data.data
            console.log(onlineLesson)
            if (onlineLesson !== null && onlineLesson.length > 0) {
              let tempOnlineLesson = []
              for (let index in onlineLesson) {
                let tempLesson = {}
                tempLesson.lessonId = onlineLesson[index].id
                tempLesson.lessonName = onlineLesson[index].title
                tempLesson.lessonPrice = onlineLesson[index].experiencePrice
                tempLesson.lessonTimes = onlineLesson[index].classHours
                tempLesson.lessonPicture = onlineLesson[index].pictureUrlList[0]
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
                tempLesson.lessonPicture = offlineLesson[index].pictureUrlList[0]
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
const app = getApp()

Page({
  /**
   * Page initial data
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: "添加赠品"
    },
    // 添加图片
    currentTab: '',
    addPhotoCSS: ['photo-preview', 'photo-upload'],
    addPhotoCSSIndex: 1,
    giftImages: [],
    giftName: '',
    giftPrice: '',
    giftNumber: '',
    expressFee: '',
    giftIntro: '',
    pictureUrlList: [],
  },
  backHandler() {
    wx.navigateBack()
  },
  onChangeGiftName(event) {
    this.setData({ giftName: event.detail })
  },
  onChangeGiftPrice(event) {
    this.setData({ giftPrice: event.detail })
  },
  onChangeGiftNumber(event) {
    this.setData({ giftNumber: event.detail })
  },
  onChangeExpressFee(event) {
    this.setData({ expressFee: event.detail })
  },
  onChangeGiftIntro(event) {
    console.log(event)
    this.setData({ giftIntro: event.detail })
  },
  addGiftImages () {
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
            giftImages: tempFilePaths
          })
          that.uploadGiftImages()
        } else {
          that.setData({
            addPhotoCSSIndex: 1,
            giftImages: []
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
  uploadGiftImages() {
    var that = this
    var tempGiftImages = []
    wx.showLoading({ title: '上传中', })
    for (var index in that.data.giftImages) {
      wx.uploadFile({
        method: 'post',
        url: app.globalData.domainUrl + 'edu/oss/upload',
        name: 'file',
        filePath: that.data.giftImages[index],
        header: {
          'Authorization': 'Bearer ' + app.globalData.accessToken,
        },
        success(res) {
          console.log(res)
          var response = JSON.parse(res.data)
          if (response.msg == 'success') {
            console.log(response.data)
            tempGiftImages.push(response.data)
            console.log(tempGiftImages)
            that.setData({
              pictureUrlList: tempGiftImages
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
  sendGiftInfo() {
    var that = this
    var data = {
      storeId: app.globalData.storeId,
      name: that.data.giftName,
      price: that.data.giftPrice,
      stock: that.data.giftNumber,
      fee: that.data.expressFee,
      description: that.data.giftIntro,
      urlList: that.data.pictureUrlList
    }
    console.log(data)
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/freeGift/insert',
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
  addGiftCommit() {
    var that = this;
    if (that.data.giftImages && that.data.giftName && that.data.giftPrice && that.data.giftNumber && that.data.giftIntro) {
      wx.showLoading({
        title: '上传中',
      })
      that.sendGiftInfo()
    } else {
      wx.showToast({
        title: '有些数据未填',
        duration: 1500,
        icon: "none"
      })
    }
  }
})

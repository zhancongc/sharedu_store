// pages/identification/identification.js
const app = getApp()

Page({

  /**
   * Page initial data
   */
  data: {
    navbarData: {
      navHeight: app.globalData.navHeight,
      pageTitle: '门店入驻'
    },
    clientHeight: "",
    currentTab: '',
    addPhotoCSS: ['photo-preview', 'photo-upload'],
    addPhotoCSSIndex: 1,
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    storeName: "",
    cityName: "",
    cityPicker: false,
    detailAddress: "",
    location: 'dddd',
    areaList: {
      province_list: {
        110000: '北京市',
        120000: '天津市'
      },
      city_list: {
        110100: '北京市',
        110200: '县',
        120100: '天津市',
        120200: '县'
      },
      county_list: {
        110101: '东城区',
        110102: '西城区',
        110105: '朝阳区',
        110106: '丰台区',
        120101: '和平区',
        120102: '河东区',
        120103: '河西区',
        120104: '南开区',
        120105: '河北区',
      }
    }
  },
  backHandler: function () {
    console.log("返回主页");
    wx.navigateBack();
  },
  swiperchange: function (e) {
    var that = this
    console.log(e.detail.current)
    that.setData({
      'currentTab': e.detail.current
    })
  },
  onTapCityName: function() {
    var that = this;
    that.setData({
      cityPicker : true
    })
  },
  onCancelCityName :function () {
    var that = this;
    that.setData({
      cityPicker: false
    })
  },
  onConfirmCityName: function (event) {
    var that = this;
    var cityData = event.detail.values;
    that.setData({
      cityPicker: false,
      cityName: cityData[0].name + " " + cityData[1].name + " " + cityData[2].name
    })
  },
  //获取位置
  getLocation(e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        console.log(res.address)
        console.log(res.latitude)
        console.log(res.longitude)
        console.log(res.name)
        var location = res.address
        that.setData({
          detailAddress: location
        })
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
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
  addStorePhoto: function() {
    wx.chooseImage({
      count: 4,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
      },
      fail: function(res){},
      complete: function(res){}
    })
  }
})
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
    cityPicker: false,
    storeName: "",
    cityName: "",
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
  onChangeStoreName: function() {},
  onChangeDetailAddress: function() {}
})
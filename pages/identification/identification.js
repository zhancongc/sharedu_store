// pages/identification/identification.jse
import { chinaAreaList } from "../../utils/area.js"
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
    currentTab: '',
    addPhotoCSS: ['photo-preview', 'photo-upload'],
    addPhotoCSSIndex: 1,
    // 商户图片
    storePhotoes: [],
    storePhotoesUpload: [],
    storeName: "",
    cityName: "",
    cityPicker: false,
    detailAddress: "",
    location: 'dddd',
    // 商户执照图片
    liencePhoto: '',
    liencePhotoUpload: '',
    areaList: null,
  },
  backHandler: function () {
    wx.navigateBack();
  },
  swiperchange: function (e) {
    var that = this
    console.log(e.detail.current)
    that.setData({
      'currentTab': e.detail.current
    })
  },
  onChangeStoreName: function (event) {
    this.setData({
      storeName: event.detail
    })
  },
  onChangeDetailAddress (event) {
    this.setData({
      detailAddress: event.detail
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
    var that = this;
    that.setData({
      areaList: chinaAreaList
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
  addStorePhoto() {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        if (tempFilePaths) {
          that.setData({
            addPhotoCSSIndex: 0,
            storePhotoes: tempFilePaths,
          })
          that.uploadStorePhoto()
        } else {
          that.setData({
            addPhotoCSSIndex: 1,
            storePhotoes: []
          })
        }
      },
      fail(res) { },
      complete(res) { }
    })
  },
  addStoreLiencePhoto () {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        if (tempFilePaths) {
          that.setData({
            liencePhoto: tempFilePaths[0]
          })
          that.uploadLiencePhoto()
        }
      },
    })
  },
  uploadStorePhoto() {
    var that = this;
    let tempStorePhotoes = []
    for (var pic in that.data.storePhotoes) {
      wx.showLoading({ title: '上传中', })
      wx.uploadFile({
        method: 'post',
        url: app.globalData.domainUrl + 'edu/oss/upload',
        name: 'file',
        filePath: that.data.storePhotoes[pic],
        header: {
          'Authorization': 'Bearer ' + app.globalData.accessToken,
        },
        success(res) {
          console.log(res)
          var response = JSON.parse(res.data)
          if (response.msg == 'success') {
            console.log(response.data)
            tempStorePhotoes.push(response.data)
            that.setData({
              storePhotoesUpload: tempStorePhotoes
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
  uploadLiencePhoto() {
    var that = this;
    wx.showLoading({ title: '上传中', })
    wx.uploadFile({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/oss/upload',
      name: 'file',
      filePath: that.data.liencePhoto,
      header: {
        'Authorization': 'Bearer ' + app.globalData.accessToken,
      },
      success(res) {
        console.log(res)
        var response = JSON.parse(res.data)
        if (response.msg == 'success') {
          console.log(response.data)
          that.setData({
            liencePhotoUpload: response.data
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
  identificationCommit() {
    var that = this;
    console.log('点击提交')
    wx.showLoading({
      title: '提交中...',
    })
    if (that.data.storeName && that.data.cityName && that.data.detailAddress && that.data.storePhotoes.length>0 && that.data.liencePhoto) {
      console.log('开始认证')
      that.sendStoreRegisterData()
      wx.hideLoading()
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '有些数据未填',
        duration: 1500,
        icon: "none"
      })
    }
  },
  sendStoreRegisterData () {
    var that = this;
    var phone = wx.getStorageSync('phone')
    var data = {
      businessLicenseUrl: that.data.liencePhotoUpload,
      contact: phone,
      name: phone,
      particularAddress: that.data.detailAddress,
      phone: phone,
      primaryAddress: that.data.cityName,
      storePictures: that.data.storePhotoesUpload
    }
    console.log('门店入驻')
    console.log(data);
    wx.request({
      method: 'post',
      url: app.globalData.domainUrl + 'edu/store/insert',
      header: {
        'Authorization': 'Bearer ' + app.globalData.accessToken,
        'Content-Type': 'application/json'
      },
      data: {
        businessLicenseUrl: that.data.liencePhotoUpload,
        contact: phone,
        name: phone,
        particularAddress: that.data.detailAddress,
        phone: phone,
        primaryAddress: that.data.cityName,
        storePictures: that.data.storePhotoesUpload
      },
      success (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            app.globalData.isIdentificated = true
            wx.redirectTo({
              url: '/pages/index/index',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '入驻失败',
            })
          }
        } else {
          wx.showToast({
            icon: 'none',
            title: '入驻失败',
          })
        }
      },
      fail () { },
      complete () { }
    })
  }
})
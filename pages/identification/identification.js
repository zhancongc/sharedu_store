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
    uploadPhotoes: [],

    storeName: "",
    cityName: "",
    cityPicker: false,
    detailAddress: "",
    location: 'dddd',

    liencePhoto: '',
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
    console.log(chinaAreaList);
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
  uploadFile(filename) {
    console.log(filename)
    return new Promise((resolve, reject)=> {
      wx.uploadFile({
        method: 'post',
        url: app.globalData.domainUrl + 'edu/oss/upload',
        name: 'file',
        filePath: filename,
        header: {
          'Authorization': 'Bearer ' + app.globalData.accessToken,
        },
        success(res) {
          console.log(res)
          var response = JSON.parse(res.data)
          if (response.msg == 'success') {
            resolve(response.data)
          } else {
            wx.showToast({
              icon: 'none',
              title: '上传图片失败',
            })
            reject('')
          }
        },
        fail() {
          wx.showToast({
            icon: 'none',
            title: '网络请求失败，请重试',
          })
          reject('')
        }
      })
    })
  },
  addStorePhoto() {
    var that = this;
    wx.chooseImage({
      count: 5,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePaths = res.tempFilePaths;
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
      fail(res) {},
      complete (res){}
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
        }
      },
    })
  },
  identificationCommit() {
    var that = this;
    console.log('点击提交')
    wx.showLoading({
      title: '提交中...',
    })
    if (that.data.storeName && that.data.cityName && that.data.detailAddress && that.data.uploadPhotoes.length>0 && that.data.liencePhoto) {
      var tempUploadPhotoes = []
      for (var index in that.data.uploadPhotoes) {
        console.log('开始上传图片')
        var backUrl = that.uploadFile(that.data.uploadPhotoes[index])
        console.log('上传图片完毕', backUrl)
        if (!backUrl){
          return
        }
        tempUploadPhotoes.push(backUrl)
      }
      console.log('开始上传证书', tempUploadPhotoes)
      var liencePhoto = that.uploadFile(that.data.liencePhoto)
      if (! liencePhoto){
        return 
      }
      that.setData({
        liencePhoto: liencePhoto,
        uploadPhotoes: tempUploadPhotoes
      })
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
      businessLicenseUrl: that.data.liencePhoto,
      contact: phone,
      name: phone,
      particularAddress: that.data.detailAddress,
      phone: phone,
      primaryAddress: that.data.cityName,
      storePictures: that.data.uploadPhotoes
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
        businessLicenseUrl: that.data.liencePhoto,
        contact: phone,
        name: phone,
        particularAddress: that.data.detailAddress,
        phone: phone,
        primaryAddress: that.data.cityName,
        storePictures: that.data.uploadPhotoes
      },
      success (res) {
        console.log(res)
        if (res.statusCode === 200) {
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
      },
      fail () { },
      complete () { }
    })
  }
})
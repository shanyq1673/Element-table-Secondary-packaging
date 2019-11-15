module.exports = {
  "version": "1.0.0",
  "name": "", //模板名称
  "description": "", //描述
  "type": "clue", //模板类型
  "tags": "", //模板标签
  "url": "/static/template/1/", //模板路径
  "configs": {
    template_name: '',
    template_tags: [],
    "background": "background_color",
    "background_url": [], //背景图片
    "background_color": "#FFF9F9", //背景颜色
    "button_color": "#FF0000", //按钮颜色
    "button_txt": "免费报名参团", //按钮文字
    "banner": 1, //banner是否展示车型图
    "banner_url": [], //banner图地址
    "show_phone": 1, //手机号
    "show_name": 1, //姓名
    "show_city": 1, //所在城市
    "show_brand_model": 1, //品牌车型
    "show_address": 1, //地址
    "show_is_substitute": 1, //置换购车
    "show_is_loan": 1, //贷款购车
    "show_check_code": 0, //验证码
    "message": "请填写标准信息，以免无法收到门票，赠票有限，赠完为止！", //提示文字
    "title": 1, //活动标题 0 活动名称 1 品牌团购 2 领票参展
    "logo": 1, //显示logo
    "bottom": 1, //底部链接
    "bottom_ICP": 1, //ICP
    "introduce": 1, //活动介绍
    "introduce_address": "指定品牌当地正规经销商", //活动地址
    "introduce_msg": "提前一天短信通知", //活动信息
    "process": 1, //活动流程
    "process_url": [], //活动流程图
    "sign_up_num": 1, //报名人数
    "registration_num": 200, //起始数量
    "click_add": 2, //单次点击累计数量
    "guarantee": 1, //活动保障
    "guarantee_url": [], //活动保障图片
    "light": 1, //活动亮点
    "light_url": [], //活动亮点图片
    "superiority": 1, //活动优势
    "superiority_msg": [ //活动优势信息
      {
        initVal: '众多品牌参团，车型更齐全'
      },
      {
        initVal: '经销商支持参团，省去中间利润'
      },
      {
        initVal: '购车一站式，省时又省力'
      },
      {
        initVal: '促销特价车型，优享购车礼包'
      }
    ],
    "countdown": 1, //活动倒计时
    "sign_up": 1, //活动报名
    "recommend": 1, //推荐车型
    "order": 1, //订车礼包
    "order_url": [], //订车礼包图片
    "ex_light": 1, //车展亮点
    "ex_light_url": [], //车展亮点图片
    "ex_addr": 1, //车展位置
    "ex_addr_url": [], //车展位置图片
    "ex_brand": 1, //参展品牌开关
    "ex_brand_txt": "", //参展品牌
    "ex_past": 1, //往期回顾
    "ex_past_url": [], //往期回顾图片
    "info": 1, //完善信息页
    "info_gender": 1, // 性别
    "info_style": 1, //具体车款
    "info_paytype": 1, //付款方式
    "info_buytime": 1, //购车时间
    "info_platno": 1 //车牌号码
  },
  "datas": {
    "phone": "",
    "name": "",
    "channel_id": "",
    "province": "",
    "province_name": "",
    "city": "",
    "city_name": "",
    "brand": "",
    "brand_name": "",
    "model": "",
    "model_name": "",
    "is_substitute": "",
    "is_loan": "",
    "referer": "",
    "is_check": "",
    "exinfo": {}
  }
}

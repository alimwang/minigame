/*jshint esversion: 6 */
window.fx = (function (exports) {
    'use strict';

    class Sequence {
        constructor(actions, isRepeat) {
            this.actions = actions;
            this.isRepeat = isRepeat;
            this.pActionIdx = 0;
        }
        get actions() { return this._actions; }
        set actions(v) { this._actions = v; }
        get isRepeat() { return this._isRepeat; }
        set isRepeat(v) { this._isRepeat = v; }
        get pActionIdx() { return this._pActionIdx; }
        set pActionIdx(v) { this._pActionIdx = v; }
        run() {
            if (!this.actions || (0 === this.actions.length))
                return;
            //播放一轮完毕后是否循环播放
            if (this.pActionIdx >= this.actions.length) {
                if (this.isRepeat) {
                    this.pActionIdx = 0;
                }
                else {
                    this._curTween = null;
                    return;
                }
            }
            let action = this.actions[this.pActionIdx];
            if (action
                && action.t
                && action.target
                && action.props
                && action.duration) {
                if ("to" === action.t) {
                    this._curTween = Laya.Tween.to(action.target, action.props, action.duration, action.ease, Laya.Handler.create(this, function (...args) {
                        let [action] = args;
                        this.runNext(action);
                    }, [action]));
                }
                else {
                    this._curTween = Laya.Tween.from(action.target, action.props, action.duration, action.ease, Laya.Handler.create(this, function (...args) {
                        let [action] = args;
                        this.runNext(action);
                    }, [action]));
                }
            }
        }
        runNext(action) {
            if (action && action.complete) {
                action.complete.call(action.complete, action.completeCaller, action.completeArgs);
            }
            this.pActionIdx = this.pActionIdx + 1;
            this.run();
        }
        getCurTween() {
            return this._curTween;
        }
    }
    ;

    /*
    * Created on Mon Nov 19 2018 by alimwang
    * desc: 初始化为undefined才有原型字段
    * Copyright (c) 2018 Chengdu Waterbear Co.,LTD.
    */
    (function (SDKEntity) {
        let PlatformType;
        (function (PlatformType) {
            PlatformType[PlatformType["PC"] = 'pc'] = "PC";
            PlatformType[PlatformType["WEIXIN"] = 'wx'] = "WEIXIN";
            PlatformType[PlatformType["BAIDU"] = 'swan'] = "BAIDU";
            PlatformType[PlatformType["VIVO"] = 'vivo'] = "VIVO";
            PlatformType[PlatformType["TT"] = 'toutiao'] = "TT";
            PlatformType[PlatformType["MEIZU"] = 'meizu'] = "MEIZU";
            PlatformType[PlatformType["OPPO"] = 'oppo'] = "OPPO";
            PlatformType[PlatformType["XIAOMI"] = 'xiaomi'] = "XIAOMI";
            PlatformType[PlatformType["TAPTAP"] = 'taptap'] = "TAPTAP";
            PlatformType[PlatformType["QQ"] = 'qq'] = "QQ";
            PlatformType[PlatformType["QTT"] = 'qtt'] = "QTT";
        })(PlatformType = SDKEntity.PlatformType || (SDKEntity.PlatformType = {}));
        ;
        class ShareInfoCfgEntity {
            constructor() {
                this.image = undefined;
                this.title = undefined;
            }
        }
        SDKEntity.ShareInfoCfgEntity = ShareInfoCfgEntity;
        /**
         * 服务器静态配置结构
         */
        class ServerJsonCfg {
        }
        SDKEntity.ServerJsonCfg = ServerJsonCfg;
        /**
         * 开放数据域类型枚举
         */
        let OpenContextType;
        (function (OpenContextType) {
            OpenContextType["UNKNOWN"] = "unknown";
            OpenContextType["CHANGE_SCENE"] = "changescene";
            OpenContextType["LOADRES"] = "loadres";
            OpenContextType["SETRANK"] = "setrank";
            OpenContextType["CHANGE_PAGE"] = "changepage";
            OpenContextType["UNDISPLAY"] = "undisplay";
            OpenContextType["TOUCH_EVENT"] = "touch_event";
            OpenContextType["PASS_EVENT"] = "pass_event";
        })(OpenContextType = SDKEntity.OpenContextType || (SDKEntity.OpenContextType = {}));
        /**
         * 开放数据域消息结构
         */
        class OpenContextMsg {
        }
        SDKEntity.OpenContextMsg = OpenContextMsg;
        let DataStubType;
        (function (DataStubType) {
            DataStubType[DataStubType["SHARE_SUCCESS"] = 0] = "SHARE_SUCCESS";
        })(DataStubType = SDKEntity.DataStubType || (SDKEntity.DataStubType = {}));
        //领取状态
        let GET_STATE;
        (function (GET_STATE) {
            GET_STATE[GET_STATE["UNACTIVATE"] = 0] = "UNACTIVATE";
            GET_STATE[GET_STATE["ACTIVATE"] = 1] = "ACTIVATE";
            GET_STATE[GET_STATE["GET"] = 2] = "GET";
        })(GET_STATE = SDKEntity.GET_STATE || (SDKEntity.GET_STATE = {}));
        ;
        let Gender;
        (function (Gender) {
            Gender[Gender["Male"] = 0] = "Male";
            Gender[Gender["Female"] = 1] = "Female";
        })(Gender = SDKEntity.Gender || (SDKEntity.Gender = {}));
        class UserInfoEntity {
            constructor() {
                this.openId = undefined;
                this.userId = undefined;
                this.name = undefined;
                this.headUrl = undefined;
                this.sex = undefined;
                this.city = undefined;
                this.province = undefined;
                this.country = undefined;
                this.language = undefined;
                this.platform = undefined;
            }
        }
        SDKEntity.UserInfoEntity = UserInfoEntity;
        class UserConfigEntity {
        }
        SDKEntity.UserConfigEntity = UserConfigEntity;
        class ShareQueryParam {
            constructor() {
                this.shareUserId = undefined;
                this.shareType = undefined;
            }
        }
        SDKEntity.ShareQueryParam = ShareQueryParam;
        class ShareInfoEntity {
            constructor() {
                this.name = undefined;
                this.headUrl = undefined;
                this.userId = undefined;
                this.state = undefined; // 邀请好友. 奖励是否领取
            }
        }
        SDKEntity.ShareInfoEntity = ShareInfoEntity;
        class ShareStatisticEntity {
            constructor() {
                this.count = undefined; // 分享成功次数
                this.helpOtherCnt = undefined; // 帮助别人分享(点击分享链接)成功次数
            }
        }
        SDKEntity.ShareStatisticEntity = ShareStatisticEntity;
        class MailEntity {
            constructor() {
                this.id = undefined; // 邮件id 必填
                this.content = undefined; // 邮件内容 必填
                this.rewards = undefined; // 奖励
                this.createdAt = undefined; // 创建时间
            }
        }
        SDKEntity.MailEntity = MailEntity;
        //========================================
        class CommonRst {
            constructor() {
                this.msg = '';
            }
        }
        SDKEntity.CommonRst = CommonRst;
        class CommonRsp {
            constructor() {
                this.result = true;
            }
        }
        SDKEntity.CommonRsp = CommonRsp;
        //========================================
        class DataStubRst {
        }
        SDKEntity.DataStubRst = DataStubRst;
        //========================================
        class LoginEntityRst {
        }
        SDKEntity.LoginEntityRst = LoginEntityRst;
        class LoginEntityRsp {
        }
        SDKEntity.LoginEntityRsp = LoginEntityRsp;
        //========================================
        class ShareInfoRst {
        }
        SDKEntity.ShareInfoRst = ShareInfoRst;
        class ShareInfoRsp {
        }
        SDKEntity.ShareInfoRsp = ShareInfoRsp;
        class ShareClearRst {
        }
        SDKEntity.ShareClearRst = ShareClearRst;
        class ShareQueryRst {
        }
        SDKEntity.ShareQueryRst = ShareQueryRst;
        class ShareQueryRsp {
        }
        SDKEntity.ShareQueryRsp = ShareQueryRsp;
        class GiftStateUpdateRst {
        }
        SDKEntity.GiftStateUpdateRst = GiftStateUpdateRst;
        //========================================
        class MailSendRst {
        }
        SDKEntity.MailSendRst = MailSendRst;
        class MailInfoRsp {
        }
        SDKEntity.MailInfoRsp = MailInfoRsp;
        class MailOpenRst {
        }
        SDKEntity.MailOpenRst = MailOpenRst;
        class MailOpenRsp {
        }
        SDKEntity.MailOpenRsp = MailOpenRsp;
        //========================================
        class CustomServiceCheckRst {
        }
        SDKEntity.CustomServiceCheckRst = CustomServiceCheckRst;
        class CustomServiceMsgRst {
        }
        SDKEntity.CustomServiceMsgRst = CustomServiceMsgRst;
        class CustomServiceSendMsgRst {
        }
        SDKEntity.CustomServiceSendMsgRst = CustomServiceSendMsgRst;
        class CustomServiceQueryRst {
        }
        SDKEntity.CustomServiceQueryRst = CustomServiceQueryRst;
        class CustomServiceQueryRsp {
        }
        SDKEntity.CustomServiceQueryRsp = CustomServiceQueryRsp;
        //======================================== // 世界排行榜
        class RankScoreRst {
        }
        SDKEntity.RankScoreRst = RankScoreRst;
        class RankInfoRst {
        }
        SDKEntity.RankInfoRst = RankInfoRst;
        class RankInfoRsp {
        }
        SDKEntity.RankInfoRsp = RankInfoRsp;
        //======================================== // ip 查询
        class IpQueryRst {
        }
        SDKEntity.IpQueryRst = IpQueryRst;
        class IpQueryRsp {
        }
        SDKEntity.IpQueryRsp = IpQueryRsp;
        //========================================
    })(exports.SDKEntity || (exports.SDKEntity = {}));

    /*
     * Created on Tue Nov 20 2018 by alimwang
     *
     * Copyright (c) 2018 Chengdu Waterbear Co.,LTD.
     */
    var PlatformType = exports.SDKEntity.PlatformType;
    class SdkGameCfg {
    }
    class SystemInfo {
    }
    ;
    class MenuInfo {
    }
    class SdkEvent {
    }
    // 登录事件
    SdkEvent.E_SDK_LOGIN = "$SDK_LOGIN";
    // 排行榜设置数据
    SdkEvent.E_RANK_PAGE = '$SET_RANK_PAGE';
    SdkEvent.E_RANK_HIDE = '$SET_RANK_HIDE';
    SdkEvent.E_RANK_TOUCH_EVENT = '$E_RANK_TOUCH_EVENT';
    SdkEvent.E_PASS_DATA_EVENT = 'E_PASS_DATA_EVENT';
    class SdkUIEvent {
    }
    // SDK初始化完成
    SdkUIEvent.E_SDK_INIT_OK = "$SDK_INIT_OK";
    // 配置更新
    SdkUIEvent.E_SERVER_CFG_UPDATE = "$SERVER_CFG_UPDATE";
    // 获取分享信息
    SdkUIEvent.E_GET_SHARE_INFO = "$GET_SHARE_INFO";
    // 获取分享配置
    SdkUIEvent.E_GET_SHARE_CONFIG = "$GET_SHARE_CONFIG";
    // 分享结果
    SdkUIEvent.E_SHARE_RESULT = "$SHARE_RESULT";
    // 分享来源玩家信息
    SdkUIEvent.E_SHARE_QUERY_INFO = "$SHARE_QUERY_INFO";
    // 获取用户信息
    SdkUIEvent.E_USER_INFO = "$USER_INFO";
    // 反馈按钮点击
    SdkUIEvent.E_FEEDBACK_CLICK = "$FEEDBACK_CLICK";
    // 广告视频
    SdkUIEvent.E_AD_VIDEO = "$AD_VIDEO";
    //banner广告
    SdkUIEvent.E_AD_BANNER = "$AD_BANNER";
    // 收藏栏奖励
    SdkUIEvent.E_FAVORITE_REWARD = '$FAVORITE_REWARD';
    // 录制视频
    SdkUIEvent.E_RECORD_VIDEO_START = '$RECORD_VIDEO_START';
    SdkUIEvent.E_RECORD_VIDEO_END = '$RECORD_VIDEO_END';
    // 服务器JSON配置
    SdkUIEvent.E_SERVER_JSON_CONFIG = '$SERVER_JSON_CFG';
    // 通过sdk方式获取奖励(视频,分享,插屏)
    SdkUIEvent.E_REWARD_GAIN = "$REWARD_GAIN";
    (function (SdkCode) {
        SdkCode[SdkCode["WX_LOGIN_SUCCESS"] = 0] = "WX_LOGIN_SUCCESS";
        SdkCode[SdkCode["WX_LOGIN_FAILED"] = 1] = "WX_LOGIN_FAILED";
        SdkCode[SdkCode["WX_AUTH_SUCCESS"] = 2] = "WX_AUTH_SUCCESS";
        SdkCode[SdkCode["WX_AUTH_FAILED"] = 3] = "WX_AUTH_FAILED";
        SdkCode[SdkCode["SERVER_LOGIN_SUCCESS"] = 4] = "SERVER_LOGIN_SUCCESS";
        SdkCode[SdkCode["SERVER_LOGIN_FAILED"] = 5] = "SERVER_LOGIN_FAILED";
        SdkCode[SdkCode["SERVER_LOGIN_ERROR"] = 6] = "SERVER_LOGIN_ERROR";
        SdkCode[SdkCode["SHARE_SUCCESS"] = 7] = "SHARE_SUCCESS";
        SdkCode[SdkCode["SHARE_FAILED"] = 8] = "SHARE_FAILED";
        SdkCode[SdkCode["SHARE_INFO_SUCCESS"] = 9] = "SHARE_INFO_SUCCESS";
        SdkCode[SdkCode["AD_VIDEO_SUCCESS"] = 10] = "AD_VIDEO_SUCCESS";
        SdkCode[SdkCode["AD_VIDEO_UNCOMPLETE"] = 11] = "AD_VIDEO_UNCOMPLETE";
        SdkCode[SdkCode["AD_VIDEO_LOAD_FAIL"] = 12] = "AD_VIDEO_LOAD_FAIL";
        SdkCode[SdkCode["AD_VIDEO_LOAD_SUCCESS"] = 13] = "AD_VIDEO_LOAD_SUCCESS";
        SdkCode[SdkCode["REWARD_GAIN_SUCCESS"] = 14] = "REWARD_GAIN_SUCCESS";
        SdkCode[SdkCode["REWARD_GAIN_FAIL"] = 15] = "REWARD_GAIN_FAIL";
        SdkCode[SdkCode["AD_BANNER_RESIZE"] = 16] = "AD_BANNER_RESIZE";
        SdkCode[SdkCode["OPEN_CUSTOMER_SUCCESS"] = 17] = "OPEN_CUSTOMER_SUCCESS";
        SdkCode[SdkCode["OPEN_CUSTOMER_FAILED"] = 18] = "OPEN_CUSTOMER_FAILED";
        SdkCode[SdkCode["OPEN_CUSTOMER_COMPLETE"] = 19] = "OPEN_CUSTOMER_COMPLETE";
        SdkCode[SdkCode["SEND_CUSTOMER_SUCCESS"] = 20] = "SEND_CUSTOMER_SUCCESS";
        SdkCode[SdkCode["SEND_CUSTOMER_FAILED"] = 21] = "SEND_CUSTOMER_FAILED";
    })(exports.SdkCode || (exports.SdkCode = {}));
    (function (WSErrorCode) {
        WSErrorCode[WSErrorCode["EC_NET_UNKNOWN_ERR"] = 3000] = "EC_NET_UNKNOWN_ERR";
        WSErrorCode[WSErrorCode["EC_NET_TIMEOUT"] = 3001] = "EC_NET_TIMEOUT";
        WSErrorCode[WSErrorCode["EC_NET_RECONNECT"] = 3002] = "EC_NET_RECONNECT";
        WSErrorCode[WSErrorCode["EC_NET_CLOSED"] = 3003] = "EC_NET_CLOSED";
        WSErrorCode[WSErrorCode["EC_NET_SEND_ERR"] = 3004] = "EC_NET_SEND_ERR";
        WSErrorCode[WSErrorCode["EC_NET_RECEIV_ERR"] = 3005] = "EC_NET_RECEIV_ERR";
    })(exports.WSErrorCode || (exports.WSErrorCode = {}));
    (function (SdkErrorCode) {
        SdkErrorCode[SdkErrorCode["SUCCESS"] = 0] = "SUCCESS";
        SdkErrorCode[SdkErrorCode["EC_CUSTOM_SERVICE_ERR"] = 1] = "EC_CUSTOM_SERVICE_ERR";
        SdkErrorCode[SdkErrorCode["EC_PROFILE_AUTH_ERR"] = 2] = "EC_PROFILE_AUTH_ERR";
        SdkErrorCode[SdkErrorCode["EC_QUERY_PARAM_EXCEPTION"] = 3] = "EC_QUERY_PARAM_EXCEPTION";
        SdkErrorCode[SdkErrorCode["EC_VERIFY_CODE_ERR"] = 4] = "EC_VERIFY_CODE_ERR";
        SdkErrorCode[SdkErrorCode["EC_CREATE_USER_ERR"] = 5] = "EC_CREATE_USER_ERR";
        SdkErrorCode[SdkErrorCode["EC_SESSION_ERR"] = 6] = "EC_SESSION_ERR";
        SdkErrorCode[SdkErrorCode["EC_SHAREINFO_CLEAR_ERR"] = 7] = "EC_SHAREINFO_CLEAR_ERR";
        SdkErrorCode[SdkErrorCode["EC_SHAREQUERY_ERR"] = 8] = "EC_SHAREQUERY_ERR";
        SdkErrorCode[SdkErrorCode["EC_SHARECONFIG_ERR"] = 9] = "EC_SHARECONFIG_ERR";
        SdkErrorCode[SdkErrorCode["EC_GIFT_STATE_ERR"] = 10] = "EC_GIFT_STATE_ERR";
        SdkErrorCode[SdkErrorCode["EC_MAIL_INFO_ERR"] = 11] = "EC_MAIL_INFO_ERR";
        SdkErrorCode[SdkErrorCode["EC_MAIL_SEND_ERR"] = 12] = "EC_MAIL_SEND_ERR";
        SdkErrorCode[SdkErrorCode["EC_MAIL_OPEN_ERR"] = 13] = "EC_MAIL_OPEN_ERR";
        SdkErrorCode[SdkErrorCode["EC_FAVORITE_REWARD_ERR"] = 14] = "EC_FAVORITE_REWARD_ERR";
        SdkErrorCode[SdkErrorCode["EC_RANK_SCORE_ERR"] = 15] = "EC_RANK_SCORE_ERR";
        SdkErrorCode[SdkErrorCode["EC_RANK_INFO_ERR"] = 16] = "EC_RANK_INFO_ERR";
        SdkErrorCode[SdkErrorCode["EC_IP_QUERY_ERR"] = 17] = "EC_IP_QUERY_ERR";
    })(exports.SdkErrorCode || (exports.SdkErrorCode = {}));
    (function (GetRewardSDKWay) {
        GetRewardSDKWay["NORMAL"] = "normal";
        GetRewardSDKWay["AUTO"] = "auto";
        GetRewardSDKWay["SHARE"] = "share";
        GetRewardSDKWay["VIDEO"] = "video";
        GetRewardSDKWay["INSERT"] = "insert";
    })(exports.GetRewardSDKWay || (exports.GetRewardSDKWay = {}));
    (function (VideoState) {
        VideoState[VideoState["UNLOAD"] = 0] = "UNLOAD";
        VideoState[VideoState["ENABLED"] = 1] = "ENABLED";
        VideoState[VideoState["UNENABLED"] = 2] = "UNENABLED";
    })(exports.VideoState || (exports.VideoState = {}));
    (function (AdState) {
        AdState[AdState["LOADING"] = 1] = "LOADING";
        AdState[AdState["LOAD"] = 2] = "LOAD";
        AdState[AdState["LOAD_FAIL"] = 3] = "LOAD_FAIL";
        AdState[AdState["DELETING"] = 4] = "DELETING";
    })(exports.AdState || (exports.AdState = {}));
    (function (BlackAndWhite) {
        BlackAndWhite["Black"] = "black";
        BlackAndWhite["White"] = "white";
    })(exports.BlackAndWhite || (exports.BlackAndWhite = {}));
    //微信化接口参数, 主要是分享和广告(插屏,视频,banner)
    class RewardGainWayParams {
        constructor(o) {
            this.source = o.source || "未知";
            o.bindCtrlGId && (this.bindCtrlGId = o.bindCtrlGId);
            o.id && (this.id = o.id);
            o.queryParam && (this.queryParam = o.queryParam);
            o.title && (this.title = o.title);
            o.imgUrl && (this.imgUrl = o.imgUrl);
            o.type && (this.type = o.type);
        }
    }
    ;
    const SdkMsgUrlDefine = {
        LOGIN: '/login',
        LOGINNOAUTU: '/login/noauth',
        CUSTOMSERVICE_CHECK: '/customservice/msg',
        CUSTOMSERVICE_MSG: '/customservice/msg',
        CUSTOMSERVICE_QUERY: '/customservice/query',
        DATASTUB: '/datastub',
        PROFILE: '/profile',
        SHAREINFO: '/share/info',
        SHAREQUERY: '/share/query',
        SHARECLEAR: '/share/clear',
        GIFTSTATE: '/giftstate',
        FAVORITEREWARD: '/favoriteReward',
        MAILINFO: '/mail/info',
        MAILSEND: '/gm/sendmail',
        MAILOPEN: '/mail/open',
        RANKSCORE: '/rank/score',
        RANKINFO: '/rank/info',
        IPQUERY: '/ip/query',
    };
    class BaseMsg {
        static init(url, method, encrypt) {
            let module = this;
            url = url || '';
            module.prototype.url = url;
            method = method || 'POST';
            module.prototype.method = method;
            module.prototype.encrypt = true;
            if (encrypt != undefined) {
                module.prototype.encrypt = encrypt;
            }
            // 注册
            if (!url) {
                throw Error('url is unexpected !!!');
            }
            let key = this.getKey(method, url);
            if (BaseMsg.MSG_DEFINES[key]) {
                throw Error('duplicate msg register !!!');
            }
            BaseMsg.MSG_DEFINES[key] = module;
        }
        ;
        static getKey(method, url) {
            return method + ':' + url;
        }
        static getDefinedMsg(method, url) {
            let key = this.getKey(method, url);
            let module = this.MSG_DEFINES[key];
            if (module) {
                return new module();
            }
        }
    }
    BaseMsg.MSG_DEFINES = {};
    // 数据打点
    class DataStubMsg extends BaseMsg {
    }
    DataStubMsg.sInit = (() => {
        DataStubMsg.init(SdkMsgUrlDefine.DATASTUB);
    })();
    // 登录
    class LoginMsg extends BaseMsg {
    }
    LoginMsg.sInit = (() => {
        LoginMsg.init(SdkMsgUrlDefine.LOGIN);
    })();
    // 调试登录
    class LoginMsgNoAuth extends BaseMsg {
    }
    LoginMsgNoAuth.sInit = (() => {
        LoginMsgNoAuth.init(SdkMsgUrlDefine.LOGINNOAUTU);
    })();
    // 发送用户信息
    class AuthProfileMsg extends BaseMsg {
    }
    AuthProfileMsg.sInit = (() => {
        AuthProfileMsg.init(SdkMsgUrlDefine.PROFILE);
    })();
    // 获取分享信息
    class ShareInfo extends BaseMsg {
    }
    ShareInfo.sInit = (() => {
        ShareInfo.init(SdkMsgUrlDefine.SHAREINFO, 'GET');
    })();
    // 分享参数
    class ShareQuery extends BaseMsg {
    }
    ShareQuery.sInit = (() => {
        ShareQuery.init(SdkMsgUrlDefine.SHAREQUERY);
    })();
    // 清除分享信息
    class ShareClearMsg extends BaseMsg {
    }
    ShareClearMsg.sInit = (() => {
        ShareClearMsg.init(SdkMsgUrlDefine.SHARECLEAR);
    })();
    // 分享奖励领取状态更新
    class GiftStateMsg extends BaseMsg {
    }
    GiftStateMsg.sInit = (() => {
        GiftStateMsg.init(SdkMsgUrlDefine.GIFTSTATE);
    })();
    // 收藏进入游戏的每日奖励
    class FavoriteRewardMsg extends BaseMsg {
    }
    FavoriteRewardMsg.sInit = (() => {
        FavoriteRewardMsg.init(SdkMsgUrlDefine.FAVORITEREWARD);
    })();
    // 邮件
    class MailSendMsg extends BaseMsg {
    }
    MailSendMsg.sInit = (() => {
        MailSendMsg.init(SdkMsgUrlDefine.MAILSEND);
    })();
    class MailInfoMsg extends BaseMsg {
    }
    MailInfoMsg.sInit = (() => {
        MailInfoMsg.init(SdkMsgUrlDefine.MAILINFO, 'GET');
    })();
    class MailOpenMsg extends BaseMsg {
    }
    MailOpenMsg.sInit = (() => {
        MailOpenMsg.init(SdkMsgUrlDefine.MAILOPEN);
    })();
    // 客服会话腾讯服务器验证
    class CustomServiceCheckMsg extends BaseMsg {
    }
    CustomServiceCheckMsg.sInit = (() => {
        CustomServiceCheckMsg.init(SdkMsgUrlDefine.CUSTOMSERVICE_CHECK, 'GET', false);
    })();
    // 客服会话收到腾讯服务器发来的消息
    class CustomServiceMsg extends BaseMsg {
    }
    CustomServiceMsg.sInit = (() => {
        CustomServiceMsg.init(SdkMsgUrlDefine.CUSTOMSERVICE_MSG, 'POST', false);
    })();
    // 客服消息查询
    class CustomServiceQueryMsg extends BaseMsg {
    }
    CustomServiceQueryMsg.sInit = (() => {
        CustomServiceQueryMsg.init(SdkMsgUrlDefine.CUSTOMSERVICE_QUERY, 'GET');
    })();
    // 世界排行榜
    class RankScoreMsg extends BaseMsg {
    }
    RankScoreMsg.sInit = (() => {
        RankScoreMsg.init(SdkMsgUrlDefine.RANKSCORE, 'POST');
    })();
    class RankInfoMsg extends BaseMsg {
    }
    RankInfoMsg.sInit = (() => {
        RankInfoMsg.init(SdkMsgUrlDefine.RANKINFO, 'GET');
    })();
    // IP查询
    class IpQueryMsg extends BaseMsg {
    }
    IpQueryMsg.sInit = (() => {
        IpQueryMsg.init(SdkMsgUrlDefine.IPQUERY, 'GET');
    })();

    /*
     * Created on Thu Feb 21 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    const FX_VERSION = '1.0.005';
    var Vector2 = Laya.Vector2;
    var Vector3 = Laya.Vector3;
    var Color = Laya.Color;
    var Dialog = Laya.Dialog;
    var EventDispatcher = Laya.EventDispatcher;
    const RES3D_GROUP_NAME = '3DRES_GROUP';
    class BaseEvent {
    }
    // APP事件
    BaseEvent.E_APP_ON_PAUSE = "$ONPAUSE";
    BaseEvent.E_APP_ON_RESUME = "$ONRESUME";
    // 面板开关事件
    BaseEvent.E_PANEL_OPENCLOSE = "$PANEL_OPENCLOSE";
    // 声音播放完成
    BaseEvent.E_SOUND_PLAY_OK = "$SOUND_PLAY_OK";
    // 界面适配
    BaseEvent.E_UI_ADAPTED = "UI_ADAPTED";
    // 属性变更
    BaseEvent.E_PROP_CHANGED = '$USER_PROP_CHANGED';
    (function (BaseCode) {
        BaseCode[BaseCode["PANEL_OPEN"] = 0] = "PANEL_OPEN";
        BaseCode[BaseCode["PANEL_CLOSE"] = 1] = "PANEL_CLOSE";
        BaseCode[BaseCode["VIEW_OPEN"] = 2] = "VIEW_OPEN";
        BaseCode[BaseCode["VIEW_CLOSE"] = 3] = "VIEW_CLOSE";
        BaseCode[BaseCode["SCENE_CHANGE"] = 4] = "SCENE_CHANGE";
        BaseCode[BaseCode["SOUND_MUSIC_PLAY_OK"] = 5] = "SOUND_MUSIC_PLAY_OK";
        BaseCode[BaseCode["SOUND_FX_PLAY_OK"] = 6] = "SOUND_FX_PLAY_OK";
        BaseCode[BaseCode["HTTP_INTERFACE_UNDEFINED"] = 7] = "HTTP_INTERFACE_UNDEFINED";
    })(exports.BaseCode || (exports.BaseCode = {}));
    /**
     * 面
     */
    class Plane2d {
        constructor(lb, rb, lt, rt) {
            this.lb = lb;
            this.rb = rb;
            this.lt = lt;
            this.rt = rt;
        }
    }
    class Plane3d {
        constructor(lb, rb, lt, rt) {
            this.lb = lb;
            this.rb = rb;
            this.lt = lt;
            this.rt = rt;
        }
        containPoint(pos) {
            let nvert = 4;
            let vertx = [this.lb.x, this.rb.x, this.rt.x, this.lt.x];
            let vertz = [this.lb.z, this.rb.z, this.rt.z, this.lt.z];
            let i, j, c = false;
            for (i = 0, j = nvert - 1; i < nvert; j = i++) {
                if (((vertz[i] > pos.z) != (vertz[j] > pos.z)) &&
                    (pos.x < (vertx[j] - vertx[i]) * (pos.z - vertz[i]) / (vertz[j] - vertz[i]) + vertx[i]))
                    c = !c;
            }
            return c;
        }
    }

    /*
    * Created on Mon May 20 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class EventCenter extends EventDispatcher {
        constructor() {
            super();
            this.m_listenerMap = {};
        }
        static getInstance() {
            return EventCenter.instance;
        }
        find(type, listener, listeners) {
            for (let i = 0; i < listeners.length; i++) {
                let _listener = listeners[i];
                if (type == _listener.type && listener == _listener.cb) {
                    return i;
                }
            }
            return -1;
        }
        findAll(type, listeners) {
            let indices = [];
            for (let i = 0; i < listeners.length; i++) {
                let _listener = listeners[i];
                if (type == _listener.type) {
                    indices.push(i);
                }
            }
            return indices;
        }
        on(type, caller, listener, args) {
            let result = super.on(type, caller, listener, args);
            if (!caller.$_GID) {
                caller.$_GID = Laya.Utils.getGID();
            }
            let listeners = this.m_listenerMap[caller.$_GID];
            if (listeners) {
                if (this.find(type, listener, listeners) == -1) {
                    listeners.push({ type: type, cb: listener });
                }
                else {
                    console.log(false, `${type} listener already added!!!`);
                }
            }
            else {
                listeners = new Array();
                listeners.push({ type: type, cb: listener });
                this.m_listenerMap[caller.$_GID] = listeners;
            }
            return result;
        }
        once(type, caller, listener, args) {
            let result = super.once(type, caller, listener, args);
            if (!caller.$_GID) {
                caller.$_GID = Laya.Utils.getGID();
            }
            let listeners = this.m_listenerMap[caller.$_GID];
            if (listeners) {
                if (this.find(type, listener, listeners) == -1) {
                    listeners.push({ type: type, cb: listener });
                }
                else {
                    console.log(false, `${type} listener already added!!!`);
                }
            }
            else {
                listeners = new Array();
                listeners.push({ type: type, cb: listener });
                this.m_listenerMap[caller.$_GID] = listeners;
            }
            return result;
        }
        off(type, caller, listener, onceOnly) {
            if (caller.$_GID) {
                let listeners = this.m_listenerMap[caller.$_GID];
                if (listeners) {
                    let index = this.find(type, listener, listeners);
                    if (index != -1) {
                        listeners.splice(index, 1);
                    }
                }
            }
            return super.off(type, caller, listener, onceOnly);
        }
        offAllCaller(caller) {
            let key = caller.$_GID;
            if (key) {
                let listeners = this.m_listenerMap[key];
                if (listeners) {
                    for (let _listener of listeners) {
                        super.off(_listener.type, caller, _listener.cb);
                    }
                    delete this.m_listenerMap[key];
                }
            }
            return super.offAllCaller(caller);
        }
        offAll(type) {
            if (type) {
                for (let $_GID in this.m_listenerMap) {
                    let listeners = this.m_listenerMap[$_GID];
                    let indices = this.findAll(type, listeners);
                    for (let index of indices) {
                        listeners.splice(index, 1);
                    }
                }
            }
            else {
                this.m_listenerMap = {};
            }
            return super.offAll(type);
        }
        event(type, data) {
            let processed = super.event(type, data);
            // if (!processed) {
            //     console.log(`事件 ${type} 未处理!`);
            // }
            return processed;
        }
    }
    //事件id
    EventCenter.instance = new EventCenter();

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    const SENSITIVE_COLOR = { x: 0.3, y: 0.59, z: 0.11 };
    class Utils {
        /**
          * 调试！输出文字到界面上
          */
        static enableLog() {
            Laya.Log.enable();
            let _log = console.log;
            console.log = function (value) {
                Laya.Log.print(value);
                _log(value);
            };
        }
        static profile(key) {
            if (!key) {
                throw Error('profile key is unexpected !!!');
            }
            this.profileMap[key] = Laya.Browser.now();
        }
        static profileEnd(key, threshold = 0) {
            if (!key) {
                throw Error('profile key is unexpected !!!');
            }
            if (this.profileMap[key]) {
                let delta = Laya.Browser.now() - this.profileMap[key];
                delete this.profileMap[key];
                if (delta > threshold) {
                    console.log('%c################ %s: %sms', 'color:#00aa00', key, delta);
                }
                return delta;
            }
            return 0;
        }
        /**
          * 添加到全局变量
          */
        static setGlobal(key, value) {
            if (typeof GameGlobal == 'undefined') {
                GameGlobal = {};
            }
            if (key && value) {
                // console.log(`setGlobal key:${key} value:${value}`);
                GameGlobal[key] = value;
            }
        }
        static getGlobal(key) {
            return GameGlobal[key];
        }
        /**
          * 判断对象是否为空
          * @param object
          */
        static isEmpty(object) {
            for (const key in object) {
                return false;
            }
            return true;
        }
        static getGID() {
            return Laya.Utils.getGID();
        }
        //判断是否在微信平台
        static isOnWeiXin() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            return (Laya.Browser.onWeiXin || Laya.Browser.onMiniGame) && !Sdk.isOnOppo();
        }
        //判断是否在小游戏端
        static isOnMiniGame() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            return (Laya.Browser.onWeiXin || Laya.Browser.onMiniGame || Laya.Browser.onKGMiniGame || Laya.Browser.onBDMiniGame || Laya.Browser.onMQQBrowser) && !Sdk.isOnOppo();
        }
        static isOnPC() {
            let Browser = Laya.Browser;
            let win = Browser._window || /*__JS__ */ window;
            let u = Browser.userAgent || win.navigator.userAgent;
            return u.indexOf('Windows') != -1;
        }
        /**
          * 是否是全面屏 包括 安卓跟苹果
          * @return
          */
        static isQMP() {
            let isBoo = false;
            let temp = 0;
            if (Laya.stage.scaleMode == Laya.Stage.SCREEN_HORIZONTAL) {
                temp = Laya.Browser.height % 9; //横屏
            }
            else {
                temp = Laya.Browser.width % 9; //竖屏
            }
            //安卓全面屏判断
            if (Laya.Browser.onAndroid && temp == 0) {
                temp = 0;
                if (Laya.stage.scaleMode == Laya.Stage.SCREEN_HORIZONTAL) {
                    //横屏
                    temp = Laya.Browser.width;
                }
                else {
                    //竖屏
                    temp = Laya.Browser.height;
                    console.log('isQMP :', temp);
                }
                if ([2280, 2160, 2244, 3120, 2248, 2340, 2310, 1520, 2240].indexOf(temp) != -1) {
                    isBoo = true;
                    console.log('isQMP :', isBoo);
                }
            }
            console.log('isQMP userAgent:', Laya.Browser.window.navigator.userAgent, Laya.Browser.clientWidth, Laya.Browser.clientHeight);
            let onIPhoneX = /iPhone/gi.test(Laya.Browser.window.navigator.userAgent) && (Math.min(Laya.Browser.clientHeight, Laya.Browser.clientWidth) == 375 && Math.max(Laya.Browser.clientHeight, Laya.Browser.clientWidth) == 812);
            let onIPhoneXR = (Math.min(Laya.Browser.clientHeight, Laya.Browser.clientWidth) == 414 && Math.max(Laya.Browser.clientHeight, Laya.Browser.clientWidth) == 896);
            //苹果手机
            let MiniAdpter = Laya.MiniAdpter;
            let BMiniAdapter = Laya.BMiniAdapter;
            if (((Laya.Browser.onMiniGame && !Laya.Browser.onAndroid && MiniAdpter.systemInfo.model.indexOf("iPhone X") != -1)) || ((Laya.Browser.onBDMiniGame && !Laya.Browser.onAndroid && BMiniAdapter.systemInfo.model.indexOf("iPhone X") != -1)) || onIPhoneX || onIPhoneXR) {
                isBoo = true;
            }
            console.log('isQMP =: ', isBoo);
            return isBoo;
        }
        static isNotchScreenDevice() {
            if (this.sNotchScreen !== undefined) {
                return this.sNotchScreen;
            }
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let sysInfo = Sdk.getInstance().getSystemInfo(); //系统信息
            if (sysInfo && sysInfo.model) {
                for (let config of this.NotchScreenCfg) {
                    if (sysInfo.model.indexOf(config.model) != -1) {
                        this.sNotchScreen = config;
                        break;
                    }
                }
                if (!this.sNotchScreen) {
                    let menuButtonInfo = Sdk.getInstance().getMenuButtonBoundingClientRect();
                    if (menuButtonInfo && menuButtonInfo.top > 20) {
                        this.sNotchScreen = { model: sysInfo.model, notchTop: menuButtonInfo.top, notchBottom: 20 };
                    }
                    else {
                        this.sNotchScreen = null;
                    }
                }
            }
            console.log('isNotchScreenDevice: ', JSON.stringify(this.sNotchScreen));
            return this.sNotchScreen;
        }
        /**
         * 数组洗牌
         * @param arr
         */
        static randomArray(arr) {
            if (!arr || arr.length == 0)
                return;
            let i = arr.length;
            while (i) {
                let j = Math.floor(Math.random() * i--);
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }
            return arr;
        }
        /**
         * 数组中随机抽取
         * @param arr
         */
        static randomInArray(arr) {
            if (!arr)
                return null;
            let index = Math.floor(Math.random() * arr.length);
            return arr[index];
        }
        static showTips(msg, seconds = 2, pos, color = "#ffffff") {
            let label = new Laya.Label();
            label.fontSize = 30;
            label.color = color;
            label.centerX = 0;
            label.centerY = 0;
            label.bold = true;
            label.stroke = 5;
            label.strokeColor = "#000000";
            label.text = msg;
            let width = label.width + 50;
            let height = label.height + 30;
            let box = new Laya.Box();
            box.zOrder = 10000;
            box.width = width;
            box.height = height;
            if (pos) {
                box.x = pos.x;
                box.y = pos.y;
            }
            else {
                box.x = (Laya.stage.width - box.width) >> 1;
                box.y = 300;
            }
            Laya.stage.addChild(box);
            let bg = new Laya.Image('res/img_tips.png'); // 兼容框架，不引入 Res
            bg.sizeGrid = "25,27,30,26";
            bg.width = width;
            bg.height = height;
            bg.alpha = 0.5;
            box.addChild(bg);
            box.addChild(label);
            Laya.Tween.from(box, { y: 400, alpha: 0 }, 200, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(box, { y: 200, alpha: 0 }, 200, null, Laya.Handler.create(this, () => {
                    box.destroy();
                }), seconds * 1000, true, true);
            }));
        }
        static adaptNode(node, targetWidth, targetHeight, exceed = true, useScale) {
            let width = node.width;
            let height = node.height;
            if (useScale) {
                let scaleWidth = targetWidth / width;
                let scaleHeight = targetHeight / height;
                let scale = exceed ? Math.max(scaleWidth, scaleHeight) : Math.min(scaleWidth, scaleHeight);
                node.scaleX = node.scaleY = scale;
            }
            else {
                let ratio = width / height;
                let newWidth = ratio * targetHeight;
                let newHeight = targetWidth / ratio;
                if (exceed) {
                    if (newWidth * targetHeight > targetWidth * newHeight) {
                        width = newWidth;
                        height = targetHeight;
                    }
                    else {
                        width = targetWidth;
                        height = newHeight;
                    }
                }
                else {
                    if (newWidth * targetHeight < targetWidth * newHeight) {
                        width = newWidth;
                        height = targetHeight;
                    }
                    else {
                        width = targetWidth;
                        height = newHeight;
                    }
                }
                node.width = width;
                node.height = height;
            }
        }
        static getClassName(cls) {
            return cls.__proto__.constructor.name;
        }
        static checkClick(delta = 300) {
            let now = Laya.Browser.now();
            if (now - this.lastClickTime <= delta) {
                this.lastClickTime = now;
                return true;
            }
            this.lastClickTime = now;
            return false;
        }
        static getHexColorString(r, g, b) {
            if (r * g * b > 1) {
                let c = r << 16 + g << 8 + b;
                return Laya.Utils.toHexColor(c);
            }
            else {
                let c = r * 255 << 16 + g * 255 << 8 + b * 255;
                return Laya.Utils.toHexColor(c);
            }
        }
        static colorHexTo3I(color) {
            if (color.charAt(0) != '#')
                return new Laya.Vector3();
            color = color.substr(1);
            let c = parseInt(color, 16);
            return new Laya.Vector3((0xFF0000 & c) >> 16, (0xFF00 & c) >> 8, (0xFF & c));
        }
        static colorHexTo3F(color) {
            if (color.charAt(0) != '#')
                return new Laya.Vector3();
            color = color.substr(1);
            let c = parseInt(color, 16);
            return new Laya.Vector3(((0xFF0000 & c) >> 16) / 255, ((0xFF00 & c) >> 8) / 255, (0xFF & c) / 255);
        }
        static colorHexTo4I(color) {
            if (color.charAt(0) != '#')
                return new Laya.Vector4();
            color = color.substr(1);
            let c = parseInt(color, 16);
            return new Laya.Vector4((0xFF0000 & c) >> 16, (0xFF00 & c) >> 8, (0xFF & c), 255);
        }
        static colorHexTo4F(color) {
            if (color.charAt(0) != '#')
                return new Laya.Vector4();
            color = color.substr(1);
            let c = parseInt(color, 16);
            return new Laya.Vector4(((0xFF0000 & c) >> 16) / 255, ((0xFF00 & c) >> 8) / 255, (0xFF & c) / 255, 1);
        }
        static getRandomColor4F() {
            let r = this.getNumberRandom(0, 1);
            let g = this.getNumberRandom(0, 1);
            let b = this.getNumberRandom(0, 1);
            return new Laya.Vector4(r, g, b, 1);
        }
        static getRandomColor3F() {
            let r = this.getNumberRandom(0, 1);
            let g = this.getNumberRandom(0, 1);
            let b = this.getNumberRandom(0, 1);
            return new Laya.Vector3(r, g, b);
        }
        static color3Fto3I(color) {
            return new Laya.Vector3(color.x * 255, color.y * 255, color.z * 255);
        }
        static color3Ito3F(color) {
            return new Laya.Vector3(color.x / 255, color.y / 255, color.z / 255);
        }
        static color3Fto4F(color) {
            return new Laya.Vector4(color.x, color.y, color.z, 1);
        }
        static color4Fto3F(color) {
            return new Laya.Vector3(color.x, color.y, color.z);
        }
        static color3Ito4F(color) {
            return new Laya.Vector4(color.x / 255, color.y / 255, color.z / 255, 1);
        }
        static getColorLumin3F(color) {
            return Laya.Vector3.dot(color, SENSITIVE_COLOR);
        }
        static getColorLumin3I(color) {
            let c = this.color3Ito3F(color);
            return this.getColorLumin3F(c);
        }
        static setColorLumin3F(color, lumin) {
            let l = this.getColorLumin3F(color);
            Laya.Vector3.scale(color, lumin / l, color);
            Laya.Vector3.Clamp(color, Laya.Vector3.ZERO, Laya.Vector3.ONE, color);
            return color;
        }
        static getColorLumin4F(color) {
            return Laya.Vector3.dot(color, SENSITIVE_COLOR);
        }
        static setColorLumin4F(color, lumin) {
            let c = this.color4Fto3F(color);
            c = this.setColorLumin3F(c, lumin);
            color.setValue(c.x, c.y, c.z, color.w);
            return color;
        }
        static getRandomColorString() {
            let r = this.getIntRandom(0, 255);
            let g = this.getIntRandom(0, 255);
            let b = this.getIntRandom(0, 255);
            return this.getHexColorString(r, g, b);
        }
        static copyArray(source) {
            if (!source) {
                return source;
            }
            let dstArray = new Array();
            return Laya.Utils.copyArray(dstArray, source);
        }
        /**
         * 深度克隆数组
         * @param source
         */
        static cloneArray(source) {
            if (!source) {
                return source;
            }
            let dstArray = new Array();
            for (let index = 0; index < source.length; index++) {
                let item = source[index];
                if (item instanceof Array) {
                    dstArray[index] = this.cloneArray(item);
                }
                else if (item instanceof Object) {
                    dstArray[index] = this.cloneDeep(item);
                }
                else {
                    dstArray[index] = item;
                }
            }
            return dstArray;
        }
        /**
          * 浅拷贝对象，谨慎使用!!
          * @param obj
          */
        static clone(obj) {
            let shadow = {};
            let names = Object.getOwnPropertyNames(obj);
            for (let prop of names) {
                shadow[prop] = obj[prop];
            }
            return shadow;
        }
        /**
          * 深拷贝对象，谨慎使用!!
          * @param obj
          */
        static cloneDeep(obj) {
            if (!obj) {
                return;
            }
            let shadow = {};
            let names = Object.getOwnPropertyNames(obj);
            for (let prop of names) {
                let value = obj[prop];
                if (value instanceof Array) {
                    shadow[prop] = this.copyArray(value);
                }
                else if (value instanceof Object) {
                    shadow[prop] = this.cloneDeep(value);
                }
                else {
                    shadow[prop] = value;
                }
            }
            return shadow;
        }
        static getFileExt(path) {
            return Laya.Utils.getFileExtension(path);
        }
        static getGlobalBounds(node, targetNode) {
            let bound = node.getBounds();
            bound = bound.clone();
            let pt = new Laya.Point(bound.x, bound.y);
            let parent = node.parent;
            pt = parent.localToGlobal(pt);
            if (targetNode) {
                pt = targetNode.globalToLocal(pt);
                bound.setTo(pt.x, pt.y, bound.width, bound.height);
            }
            else {
                bound.setTo(pt.x, pt.y, bound.width, bound.height);
            }
            return bound;
        }
        //随机[min , max]（整数）
        static getIntRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
        static getNumberRandom(min, max) {
            return Math.random() * (max - min) + min;
        }
        static getNumberRandomEx(min, max) {
            return Math.randomEx() * (max - min) + min;
        }
        /**
         * 获取随机正负
         */
        static getSignRandom() {
            return this.getIntRandom(0, 1) == 0 ? -1 : 1;
        }
        /**
          * 格式化数字
          * number       需要格式化的数字
          * decimalNum   需要保留小数点后的位数，可以不传，默认是小数点后不保留
          */
        static formatNumber(number, decimalNum = 0) {
            if (number && !isNaN(number)) {
                //设置数值需要保留的小数位数
                let str = number.toFixed(decimalNum);
                //将整数部分每隔千位分割
                str = str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('');
                return str;
            }
            number = 0;
            return number.toFixed(decimalNum);
        }
        //判断为2的次方
        static checkPowerOf2(num) {
            num = (num - 1) & num;
            if (num == 0)
                return true;
            return false;
        }
        //计算一个数的2的次方 指数n //返回值-1 不是2的次方数
        static getIndex2N(num) {
            if (num == 1)
                return 0;
            if (this.checkPowerOf2(num)) {
                let n = 1;
                while (num) {
                    if (num == 1 || num == 2)
                        return n;
                    if (num % 2 == 0) {
                        num = num >> 1;
                        n += 1;
                    }
                }
            }
            return -1;
        }
        //计算一个数的次幂a^n
        static getIndexN(a, n) {
            let ret = a;
            for (let i = 0; i < n; ++i) {
                ret *= a;
            }
            return ret;
        }
        /**
          * 调试显示一个矩形框
          * @param sp 一个精灵
          * @param on 开/关
          */
        static showBorder(sp, on = true, color, parent) {
            let node = sp;
            if (!on) {
                if (node.__border) {
                    Laya.timer.clearAll(node);
                    node.__border.removeSelf();
                    node.__border = null;
                }
                return;
            }
            if (node.__border) {
                return;
            }
            let __border = new Laya.Sprite();
            node.__border = __border;
            Laya.stage.addChild(__border);
            Laya.timer.loop(50, node, function () {
                let bound = Utils.getGlobalBounds(sp, parent);
                __border.graphics.clear();
                color = color || "#ff0000";
                __border.graphics.drawRect(bound.x, bound.y, bound.width, bound.height, null, color, 2);
            });
            sp.once(Laya.Event.REMOVED, this, function () {
                this.showBorder(sp, false);
            });
        }
        /**
         * 调试显示包围盒
         * @param sp
         * @param delta 偏移
         */
        static showBounds(sp) {
            if (sp.getChildByName('linebound')) {
                return;
            }
            let size = this.get3dLocalModelSize(sp);
            let linearModel = new Laya.PixelLineSprite3D(50);
            linearModel.name = 'linebound';
            let box = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(size.x, size.y, size.z));
            this.linearModel(box, linearModel, Laya.Color.GREEN);
            // 定位到中心点
            let center = this.get3dModelCenter(sp, true);
            let anchor = this.get3dModelAnchor(sp, true);
            Laya.Vector3.subtract(center, anchor, center);
            linearModel.transform.translate(center);
            sp.addChild(linearModel);
        }
        /**
         * 获取模型中心点
         * @param sp
         * @param isLocal
         */
        static get3dModelCenter(sp, isLocal = false) {
            let bounds = this.get3dModelBounds(sp, isLocal);
            let center = new Laya.Vector3();
            Laya.Vector3.add(bounds.getMin(), bounds.getExtent(), center);
            return center;
        }
        /**
         * 获取模型锚点
         * @param sp
         * @param isLocal
         */
        static get3dModelAnchor(sp, isLocal = false) {
            let anchor = new Laya.Vector3();
            let tempMatrix = this.tempMatrix;
            sp.transform.localMatrix.invert(tempMatrix);
            Laya.Vector3.transformV3ToV3(sp.transform.localPosition, tempMatrix, anchor);
            if (!isLocal) {
                Laya.Vector3.transformV3ToV3(anchor, sp.transform.worldMatrix, anchor);
            }
            return anchor;
        }
        static linearModel(sprite3D, lineSprite3D, color) {
            let vertex1 = new Laya.Vector3();
            let vertex2 = new Laya.Vector3();
            let vertex3 = new Laya.Vector3();
            let lineCount = 0;
            if (sprite3D instanceof Laya.MeshSprite3D) {
                let meshSprite3D = sprite3D;
                let mesh = meshSprite3D.meshFilter.sharedMesh;
                let vbBuffer = mesh._vertexBuffer;
                let vbBufferData = vbBuffer.getFloat32Data();
                let ibBufferData = mesh._indexBuffer.getData();
                let vertexStrideCount = vbBuffer.vertexDeclaration.vertexStride / 4;
                let loopCount = 0;
                let index = 0;
                for (let i = 0; i < ibBufferData.length; i += 3) {
                    loopCount = 0;
                    index = 0;
                    vertex1.x = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    vertex1.y = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    vertex1.z = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    loopCount++;
                    index = 0;
                    vertex2.x = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    vertex2.y = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    vertex2.z = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    loopCount++;
                    index = 0;
                    vertex3.x = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    vertex3.y = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    vertex3.z = vbBufferData[ibBufferData[i + loopCount] * vertexStrideCount + index++];
                    loopCount++;
                    Laya.Vector3.transformCoordinate(vertex1, meshSprite3D.transform.worldMatrix, vertex1);
                    Laya.Vector3.transformCoordinate(vertex2, meshSprite3D.transform.worldMatrix, vertex2);
                    Laya.Vector3.transformCoordinate(vertex3, meshSprite3D.transform.worldMatrix, vertex3);
                    lineSprite3D.addLine(vertex1, vertex2, color, color);
                    lineSprite3D.addLine(vertex2, vertex3, color, color);
                    lineSprite3D.addLine(vertex3, vertex1, color, color);
                }
            }
        }
        static showPosition(args) {
            let sp;
            let pos;
            if (args instanceof Laya.Point) {
                sp = Laya.stage;
                pos = args;
            }
            else {
                pos = new Laya.Point(sp.x, sp.y);
                pos = sp.fromParentPoint(pos);
            }
            if (sp['__reddot']) {
                return;
            }
            let redDot = new Laya.Sprite();
            redDot.scale(1 / sp.scaleX, 1 / sp.scaleY);
            redDot.x = pos.x;
            redDot.y = pos.y;
            sp.addChild(redDot);
            redDot.graphics.clear();
            redDot.graphics.drawCircle(0, 0, 5, "#ff0000", "#ff0000", 2);
            sp['__reddot'] = redDot;
            sp.once(Laya.Event.REMOVED, this, function () {
                sp['__reddot'] = undefined;
                redDot.removeSelf();
            });
        }
        /**
          * 路径信息解析
          * @return dir: 路径带 '/'
          * @return dirname: 路径带不 '/'
          * @return file: 文件名带扩展名
          * @return filename: 文件名不带扩展名
          * @return ext: 扩展名带 '.'
          * @return extname: 扩展名不带 '.'
          * @return full: 转化后的全路径
          */
        static pathInfo(path) {
            let dir = "", dirname = "", file = "", filename = "", ext = "", extname = "", full = path;
            if (path) {
                full = path.replace("\\", "/");
                let strArray = path.match(/((^.+)\/)((\w+)(\.(\w+)))/i);
                if (strArray && strArray.length > 1) {
                    dir = strArray[1];
                    dirname = strArray[2];
                    file = strArray[3];
                    filename = strArray[4];
                    ext = strArray[5];
                    extname = strArray[6];
                }
                else {
                    filename = path;
                }
            }
            return { dir: dir, dirname: dirname, file: file, filename: filename, ext: ext, extname: extname, full: full };
        }
        static createAnim(animUrl, res, handler) {
            let anim = new Laya.Animation();
            let animLoaded = function () {
                if (!anim.destroyed && handler) {
                    handler.runWith(anim);
                }
            };
            let animResLoaded = function () {
                anim.loadAnimation(animUrl, Laya.Handler.create(this, animLoaded));
            };
            if (res) {
                Laya.loader.load(res, Laya.Handler.create(this, animResLoaded));
            }
            else {
                animResLoaded();
            }
            return anim;
        }
        static playAnim(anim, handler, start, loop, name) {
            anim.play(start, loop, name);
            if (handler) {
                if (loop) {
                    anim.on(Laya.Event.COMPLETE, handler.caller, function () {
                        handler.run();
                    });
                }
                else {
                    anim.once(Laya.Event.COMPLETE, handler.caller, function () {
                        handler.run();
                    });
                }
            }
        }
        static getAnimSize(anim, handler) {
            if (anim.isPlaying) {
                let bound = anim.getSelfBounds();
                handler.runWith(bound);
            }
            else {
                anim.play();
                let func = function () {
                    anim.gotoAndStop(0);
                    let bound = anim.getSelfBounds();
                    handler.runWith(bound);
                };
                anim.once(Laya.Event.REMOVED, this, () => {
                    Laya.timer.clear(this, func);
                });
                Laya.timer.frameOnce(1, this, func);
            }
        }
        /**
         * 创建粒子
         * @param url
         */
        static createParticle(url, play = true) {
            let setting = Laya.loader.getRes(url);
            let part;
            if (setting) {
                part = new Laya.Particle2D(setting);
            }
            else {
                part = new Laya.Particle2D(null);
                part.load(url);
            }
            part.autoPlay = play;
            return part;
        }
        static getLength(obj) {
            let keys = Object.keys(obj);
            return keys.length;
        }
        static randomByRate(percent) {
            let r = Math.random();
            if (percent > 1) {
                percent *= 0.01;
            }
            return r > (1 - percent);
        }
        /**
          * 混合类
          * @param derivedCtor
          * @param baseCtors
          */
        static applyMixins(derivedCtor, baseCtors, derivedSuper) {
            if (!derivedCtor.prototype) {
                return;
            }
            baseCtors.forEach(baseCtor => {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                    if (name != 'constructor') {
                        derivedCtor.prototype[name] = baseCtor.prototype[name];
                        derivedCtor._super = derivedSuper;
                    }
                });
            });
        }
        /**
         * 获取基类模块
         * @param instance
         */
        static super(instance) {
            let module = this.getModule(instance);
            return module._super || module.__super || module.__proto__;
        }
        /**
         * 获取模块
         * @param instance
         */
        static getModule(instance) {
            return instance.__proto__.constructor;
        }
        /**
          * 获得一个数字0的个数
          * @param num 数字数量
          */
        static getNumberZeroAmount(num) {
            if ((null == num) || (isNaN(num))) { //非数字
                console.log("非法参数");
                return [0, 0];
            }
            let base = 1000, res = 0;
            while (true) {
                let tmp = num / base;
                if (tmp < 1) {
                    break;
                }
                else {
                    num = tmp;
                    res += 1;
                }
            }
            if (0 !== res)
                num = Number(num.toFixed(2));
            else
                num = Math.floor(num);
            return [num, res * 3];
        }
        /**
          * 获得一个字符串0的个数
          * @param num 数字数量
          */
        static getStringZeroAmount(stringNum) {
            if ((null == stringNum) || (typeof (stringNum) != "string")) { //非字符串
                console.log("非法参数");
                return [0, 0];
            }
            //查找小数点.的位置
            let decPos = stringNum.indexOf(".");
            stringNum = stringNum.slice(0, decPos);
            let keepNum = 0, zeroNum = 0;
            let strLength = stringNum.length;
            zeroNum = Math.floor(strLength / 3);
            keepNum = strLength % 3;
            if (keepNum == 0) {
                keepNum = 3;
                zeroNum -= 1;
            }
            //截取数字
            let num = Number(stringNum.slice(keepNum, keepNum + 2));
            num = (Number(stringNum.slice(keepNum + 2, keepNum + 3)) >= 5) ? num + 1 : num;
            return [Number(stringNum.slice(0, keepNum) + "." + num), zeroNum * 3];
        }
        static formatNumberWithUnits(num) {
            let [baseNum, units] = Utils.getFormatNumberWithUnitsInfo(num);
            return baseNum + units;
        }
        static getFormatNumberWithUnitsInfo(num, unitsCfg) {
            let [baseNum, zeroNum] = [null, null];
            if (typeof (num) == "number") {
                [baseNum, zeroNum] = Utils.getNumberZeroAmount(num);
            }
            else if (typeof (num) == "string") {
                [baseNum, zeroNum] = Utils.getStringZeroAmount(num);
            }
            let key = "" + zeroNum, units = null;
            (null != unitsCfg) ? (units = unitsCfg[key]) : (units = Utils.numberUnit[key]);
            (null == units) && (units = "");
            return [baseNum, units];
        }
        /**
          * 根据权重数组进行抽取1个
          * @param weightArr 权重数组
          * @param weightIdx 权重所在数组的idx,默认为0
          */
        static draw(weightArr, weightIdx = 0) {
            if (null == weightArr) {
                console.log("带权数组为空!!!");
                return;
            }
            let sumProb = 0, probs = [];
            for (let i = 0; i < weightArr.length; ++i) {
                let weight = weightArr[i][weightIdx];
                if (null != weight) {
                    sumProb += weight;
                    probs.push({ prob: sumProb, arr: weightArr[i], });
                }
            }
            let value = null, idx = 0;
            let random = Utils.getIntRandom(1, sumProb);
            for (let i = 0; i < probs.length; ++i) {
                if (random <= probs[i].prob) {
                    value = probs[i].arr;
                    idx = i;
                    break;
                }
            }
            return [idx, value];
        }
        /**
          * 在带权数组中抽取若干个
          * @param drawNum 抽取个数
          * @param weightArr 带权数组
          * @param weightIdx 权重在数组中的索引值,默认为0
          */
        static drawSome(drawNum, weightArr, weightIdx = 0) {
            if (null == weightArr) {
                console.log("带权数组为空!!!");
                return;
            }
            let elements = [];
            let cloneArr = weightArr.slice();
            for (let i = 0; i < drawNum; ++i) {
                let [idx, value] = Utils.draw(cloneArr, weightIdx);
                cloneArr.splice(idx, 1);
                elements.push([idx, value]);
            }
            return elements;
        }
        /**
          * 获取ui内嵌的动画
          * @param ui
          * @param aniName
          */
        static getUIFrameAnimation(ui, aniName) {
            return ui[aniName];
        }
        static getAnimationActionName(anim) {
            let animAny = anim;
            return animAny['_actionName'];
        }
        static getAnimationUrl(anim) {
            let animAny = anim;
            return animAny['_url'];
        }
        //根据时间戳  返回时分秒
        static timestampToTime(timestamp, style) {
            if (!style) {
                style = {
                    separator: ["h ", "m ", "s"],
                    isAlign: false,
                };
            }
            else {
                !style.separator && (style.separator = ["h ", "m ", "s"]);
            }
            let date = timestamp / 1000;
            let h = Math.floor(date / 3600);
            let hh = "";
            if (h >= 0) {
                if (h < 10 && style.isAlign) {
                    hh = "0" + h + style.separator[0];
                }
                else {
                    hh = h + style.separator[0];
                }
            }
            let m = Math.floor((date % 3600) / 60);
            let mm = "";
            if (m >= 0) {
                if (m < 10 && style.isAlign) {
                    mm = "0" + m + style.separator[1];
                }
                else {
                    mm = m + style.separator[1];
                }
            }
            let s = Math.floor(date % 60);
            let ss = "";
            if (s >= 0) {
                if (s < 10 && style.isAlign) {
                    ss = "0" + s + style.separator[2];
                }
                else {
                    ss = s + style.separator[2];
                }
            }
            return hh + mm + ss;
        }
        //根据时间戳 返回分秒
        static timestampToMS(timestamp, style) {
            if (!style) {
                style = {
                    separator: ["m ", "s"],
                    isAlign: false,
                };
            }
            else {
                !style.separator && (style.separator = ["m ", "s"]);
            }
            let date = timestamp / 1000;
            let m = Math.floor((date % 3600) / 60);
            let mm = "";
            if (m >= 0) {
                if (m < 10 && style.isAlign) {
                    mm = "0" + m + style.separator[0];
                }
                else {
                    mm = m + style.separator[0];
                }
            }
            let s = Math.floor(date % 60);
            let ss = "";
            if (s >= 0) {
                if (s < 10 && style.isAlign) {
                    ss = "0" + s;
                }
                else {
                    ss = s + "";
                }
                if (style.separator[1])
                    ss += style.separator[1];
            }
            return mm + ss;
        }
        //根据时间戳 返回分秒
        static timestampToHM(timestamp, style) {
            if (!style) {
                style = {
                    separator: ["h ", "m"],
                    isAlign: false,
                };
            }
            else {
                !style.separator && (style.separator = ["h ", "m"]);
            }
            let date = timestamp / 1000;
            let h = Math.floor(date / 3600);
            let hh = "";
            if (h >= 0) {
                if (h < 10 && style.isAlign) {
                    hh = "0" + h + style.separator[0];
                }
                else {
                    hh = h + style.separator[0];
                }
            }
            let m = Math.floor((date % 3600) / 60);
            let mm = "";
            if (m >= 0) {
                if (m < 10 && style.isAlign) {
                    mm = "0" + m + style.separator[1];
                }
                else {
                    mm = m + style.separator[1];
                }
            }
            return hh + mm;
        }
        /**
         * 倒计时
         * @param ms 毫秒
         * @param caller
         * @param listener
         */
        static countdown(ms, caller, listener) {
            const clear = function () {
                caller.clearTimer(caller, tick);
            };
            const tick = function () {
                ms = Math.max(ms - 1000, 0);
                listener.call(caller, ms);
                if (ms <= 0) {
                    clear();
                    caller.off(Laya.Event.REMOVED, this, clear);
                }
            };
            caller.once(Laya.Event.REMOVED, this, clear);
            caller.timerLoop(1000, caller, tick);
        }
        /**
          *今天是今年第几天
          */
        static getDayInYear() {
            return Math.ceil((Number(Utils.getDate()) - Number(new Date(Utils.getDate().getFullYear().toString()))) / (24 * 60 * 60 * 1000));
        }
        static initRelativeDate(date) {
            Utils.relativeDate = date;
            Utils.localLaunchDate = new Date();
        }
        static getDate() {
            return Utils.relativeDate || new Date();
        }
        static getTime() {
            if (!Utils.relativeDate) {
                return new Date().getTime();
            }
            else {
                let localPassTime = new Date().getTime() - Utils.localLaunchDate.getTime();
                return Utils.relativeDate.getTime() + localPassTime;
            }
        }
        static isToday(date) {
            let d;
            if (typeof date == 'string') {
                d = new Date(date);
            }
            else {
                d = date;
            }
            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return d >= today;
        }
        /**
          * 将目标对象的原型作为字段，拷贝源对象到目标
          * @param dst
          * @param src
          * @param propsFromDst 原型字段来自哪个对象
          */
        static assign(dst, src, propsFromDst = true) {
            let props = propsFromDst ? Object.keys(dst) : Object.keys(src);
            if (src instanceof Array) {
                props.pop();
            }
            return this.assignFrom(dst, src, props);
        }
        static assignFrom(dst, src, props) {
            let keys = [];
            for (let key of props) {
                if (src[key] != undefined && src[key] != dst[key]) {
                    dst[key] = src[key];
                    keys.push(key);
                }
            }
            return keys;
        }
        static stringformat(str, args) {
            let replaceAll = function (s, k, v) {
                return s.replace(new RegExp("\\{" + k + "\\}", "gm"), v);
            };
            //参数是0时有问题
            // if (!args) return;
            let tmpArgs = args;
            if (typeof (tmpArgs) !== "object") {
                tmpArgs = {};
                for (let key in arguments) {
                    if ("0" === key)
                        continue;
                    tmpArgs[Number(key) - 1] = arguments[key];
                }
            }
            for (let key in tmpArgs) {
                let value = tmpArgs[key];
                str = replaceAll(str, key, value);
            }
            return str;
        }
        /**
         *
         * @param arr 数组
         * @param compFunc 比较函数, 满足返回：0，左边：-1， 右边：1
         */
        static binarySearch(arr, compFunc, step = 1) {
            let low = 0; //数组最小索引值
            let high = arr.length - 1; //数组最大索引值
            while (low <= high) {
                let mid = Math.floor((low + high) / 2);
                let next = Math.min(mid + step, high);
                // console.log('binarySearch mid:%d next:%d low:%d high:%d', mid, next, low, high);
                let ret = compFunc(arr[mid], arr[next], mid);
                if (ret == 0) {
                    return mid;
                }
                else if (ret > 0) {
                    low = mid;
                }
                else {
                    high = mid;
                }
            }
            return -1;
        }
        /**
         * 获取长高宽 x,y,z 世界坐标系
         * @param model
         */
        static get3dModelSize(model) {
            let bounds = this.get3dModelBounds(model);
            let max = bounds.getMax();
            let min = bounds.getMin();
            let size = new Laya.Vector3();
            Laya.Vector3.subtract(max, min, size);
            return size;
        }
        /**
         * 局部坐标
         * @param model
         */
        static get3dLocalModelSize(model) {
            let bounds = this.get3dModelBounds(model, true);
            let max = bounds.getMax();
            let min = bounds.getMin();
            let size = new Laya.Vector3();
            Laya.Vector3.subtract(max, min, size);
            return size;
        }
        static get3dModelBounds(model, isLocal, include, exclude) {
            let bound;
            let min = new Laya.Vector3(Infinity, Infinity, Infinity);
            let max = new Laya.Vector3(-Infinity, -Infinity, -Infinity);
            if (model instanceof Laya.MeshSprite3D) {
                if (isLocal) {
                    bound = model.meshFilter.sharedMesh.bounds.clone();
                }
                else {
                    bound = model.meshRenderer.bounds.clone();
                }
            }
            else if (model instanceof Laya.SkinnedMeshSprite3D) {
                if (isLocal) {
                    bound = model.meshFilter.sharedMesh.bounds.clone();
                }
                else {
                    bound = model.skinnedMeshRenderer.bounds.clone();
                }
            }
            else {
                bound = new Laya.Bounds(min, max);
            }
            //
            if (model.numChildren > 0) {
                let children = model.getChildren();
                let _proc3dModel = (child) => {
                    let childBound = this.get3dModelBounds(child, isLocal, include, exclude);
                    if (isLocal) {
                        childBound._tranform(child.transform.localMatrix, childBound);
                    }
                    Laya.Vector3.min(bound.getMin(), childBound.getMin(), min);
                    Laya.Vector3.max(bound.getMax(), childBound.getMax(), max);
                    bound.setMin(min);
                    bound.setMax(max);
                };
                for (const child of children) {
                    if (include) {
                        if (include.indexOf(child.name) != -1) {
                            _proc3dModel(child);
                        }
                    }
                    else if (!exclude || exclude.indexOf(child.name) == -1) {
                        _proc3dModel(child);
                    }
                }
            }
            return bound;
        }
        /**
         * 创建LH模型文件
         * @param lh
         */
        static create3dModel(lh, handler, autoDestroy = true) {
            if (autoDestroy) {
                Laya.loader.setGroup(lh, RES3D_GROUP_NAME);
            }
            let res = Laya.loader.getRes(lh);
            if (res) {
                Laya.timer.callLater(this, () => {
                    Laya.Sprite3D.load(lh, handler);
                });
            }
            else {
                Laya.Sprite3D.load(lh, handler);
            }
        }
        /**
         * 3d空间到2d空间
         */
        static convert3dto2d(node, camera) {
            let t = new Laya.Vector3();
            camera.viewport.project(node.transform.position, camera.projectionViewMatrix, t);
            let out = new Laya.Vector2(t.x / Laya.stage.clientScaleX, t.y / Laya.stage.clientScaleY);
            return out;
        }
        /**
         * 3d空间到2d空间矩形
         * @param node
         */
        static convert3dtoRect(node, camera) {
            let min = new Laya.Vector3();
            let max = new Laya.Vector3();
            let bound = Utils.get3dModelBounds(node);
            camera.viewport.project(bound.getMin(), camera.projectionViewMatrix, min);
            camera.viewport.project(bound.getMax(), camera.projectionViewMatrix, max);
            let minx = Math.min(min.x, max.x);
            let miny = Math.min(min.y, max.y);
            let maxx = Math.max(min.x, max.x);
            let maxy = Math.max(min.y, max.y);
            return new Laya.Rectangle(minx / Laya.stage.clientScaleX, miny / Laya.stage.clientScaleY, maxx - minx, maxy - miny);
        }
        /**
         * 转换2d坐标到3d空间
         * @param pos0
         * @param pos1
         * @param camera
         * @returns 返回方向向量
         */
        static convert2dTo3dN(pos0, pos1, camera) {
            pos0 = pos0.clone();
            pos1 = pos1.clone();
            pos0.z = pos1.z = 0;
            let tempMatrix = this.tempMatrix;
            camera.projectionViewMatrix.invert(tempMatrix);
            camera.viewport.unprojectFromMat(pos0, tempMatrix, pos0);
            camera.viewport.unprojectFromMat(pos1, tempMatrix, pos1);
            pos0.y = pos1.y = 0;
            Laya.Vector3.subtract(pos1, pos0, pos0);
            Laya.Vector3.normalize(pos0, pos0);
            return pos0;
        }
        /**
         * 返回摄像机近裁剪面上点的世界坐标
         * @param pos
         * @param camera
         */
        static convert2dTo3dP(pos, camera) {
            pos = pos.clone();
            pos.z = 0;
            let tempMatrix = this.tempMatrix;
            camera.projectionViewMatrix.invert(tempMatrix);
            camera.viewport.unprojectFromMat(pos, tempMatrix, pos);
            pos.y = 0;
            return pos;
        }
        /**
         * 返回屏幕上的点出发的射线碰撞到的点的世界坐标
         * @param pos
         * @param camera
         * @param collideMask 地面碰撞类型
         */
        static convert2dTo3dRay(pos, camera, collideMask) {
            pos = pos.clone();
            pos.z = 0;
            let ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());
            camera.viewportPointToRay(pos, ray);
            let scene = camera.scene;
            let result = new Laya.HitResult();
            // 第一个碰撞到的物体
            scene.physicsSimulation.rayCast(ray, result, undefined, undefined, collideMask);
            if (result.succeeded) {
                pos.from(result.point);
            }
            else {
                let tempMatrix = this.tempMatrix;
                camera.projectionViewMatrix.invert(tempMatrix);
                camera.viewport.unprojectFromMat(pos, tempMatrix, pos);
                pos.y = 0;
            }
            return pos;
        }
        /**
         * 将一个节点添加到另一个节点
         * @param node
         * @param to
         */
        static add3dModelTo(node, to, pos, rotate, scale) {
            pos = pos || node.transform.position.clone();
            scale = scale || node.transform.getWorldLossyScale().clone();
            rotate = rotate || node.transform.rotation.clone();
            to.addChild(node);
            node.transform.rotation = rotate;
            node.transform.position = pos;
            node.transform.setWorldLossyScale(scale);
        }
        /**
         * 重置锚点
         * @param node
         * @param ax
         * @param ay
         */
        static resetAnchor(node, ax, ay) {
            if (ax < 0 || ax > 1 || ay < 0 || ay > 1) {
                return;
            }
            let _ax = node.anchorX, _ay = node.anchorY;
            let deltaX, deltaY;
            if (ax == _ax && ay == _ay) {
                deltaX = _ax * node.width;
                deltaY = _ay * node.height;
                node.pivot(deltaX, deltaY);
                return;
            }
            if ((!_ax && node.pivotX) && (!_ay && node.pivotY)) {
                _ax = node.pivotX / node.width;
                _ay = node.pivotY / node.height;
            }
            _ax = _ax || 0;
            _ay = _ay || 0;
            deltaX = (ax - _ax) * node.width;
            deltaY = (ay - _ay) * node.height;
            node.anchorX = ax;
            node.anchorY = ay;
            node.pivot(deltaX, deltaY);
            node.x += deltaX;
            node.y += deltaY;
        }
        /**
         * 任意点贝塞尔曲线
         * @param t 时间delta 范围 0~1
         * @param cps 控制点
         */
        static calcBezierPointEx(t, cps) {
            t = Math.clamp(t, 0, 1);
            const factorial = function (num) {
                if (num <= 1) {
                    return 1;
                }
                else {
                    return num * factorial(num - 1);
                }
            };
            let result = new Laya.Vector3();
            let n = cps.length - 1;
            cps.forEach((item, index) => {
                if (!index) {
                    result.x += item.x * Math.pow((1 - t), n - index) * Math.pow(t, index);
                    result.y += item.y * Math.pow((1 - t), n - index) * Math.pow(t, index);
                    result.z += item.z * Math.pow((1 - t), n - index) * Math.pow(t, index);
                }
                else {
                    result.x += factorial(n) / factorial(index) / factorial(n - index) * item.x * Math.pow((1 - t), n - index) * Math.pow(t, index);
                    result.y += factorial(n) / factorial(index) / factorial(n - index) * item.y * Math.pow((1 - t), n - index) * Math.pow(t, index);
                    result.z += factorial(n) / factorial(index) / factorial(n - index) * item.z * Math.pow((1 - t), n - index) * Math.pow(t, index);
                }
            });
            return result;
        }
        /**
         * 获取贝塞尔曲线上的线段信息
         * @param cps
         * @param t0
         * @param delta
         */
        static getBezierInfo(cps, t0, delta) {
            let t1 = delta || (t0 + 0.1);
            let info = { v: null, n: null, nL: null, nR: null, up: null };
            let pos0 = this.calcBezierPointEx(t0, cps);
            let pos1 = this.calcBezierPointEx(t1, cps);
            let t = new Laya.Vector3();
            Laya.Vector3.subtract(pos1, pos0, t);
            if (delta != undefined) {
                info.v = t.clone();
                info.end = pos1;
            }
            let n = new Laya.Vector3();
            Laya.Vector3.normalize(t, n);
            let nL = new Laya.Vector3();
            Laya.Vector3.cross(Laya.Vector3.Up, n, nL);
            Laya.Vector3.normalize(nL, nL);
            Laya.Vector3.cross(n, nL, t);
            Laya.Vector3.normalize(t, t);
            let up = t.clone();
            Laya.Vector3.cross(up, n, nL);
            Laya.Vector3.normalize(nL, nL);
            let nR = new Laya.Vector3();
            Laya.Vector3.cross(n, up, nR);
            Laya.Vector3.normalize(nR, nR);
            info.n = n;
            info.nL = nL;
            info.nR = nR;
            info.up = up;
            info.start = pos0;
            return info;
        }
        /**
        * 任意点贝塞尔曲线
        * @param t 时间delta
        * @param cps 控制点
        */
        static calcBezierPointEx_2D(t, cps) {
            t = Math.clamp(t, 0, 1);
            const factorial = function (num) {
                if (num <= 1) {
                    return 1;
                }
                else {
                    return num * factorial(num - 1);
                }
            };
            let result = new Laya.Point();
            let n = cps.length - 1;
            cps.forEach((item, index) => {
                if (!index) {
                    result.x += item.x * Math.pow((1 - t), n - index) * Math.pow(t, index);
                    result.y += item.y * Math.pow((1 - t), n - index) * Math.pow(t, index);
                }
                else {
                    result.x += factorial(n) / factorial(index) / factorial(n - index) * item.x * Math.pow((1 - t), n - index) * Math.pow(t, index);
                    result.y += factorial(n) / factorial(index) / factorial(n - index) * item.y * Math.pow((1 - t), n - index) * Math.pow(t, index);
                }
            });
            return result;
        }
        /**
         * 保存生成图片  Laya1.x版本 canvas模式下可用
         * @param node
         * @param x
         * @param y
         * @param witdh
         * @param height
         */
        static generatePicture(node, x, y, witdh, height) {
            // 此功能仅在不使用子域的情况下有效！！！！
            x = x || 0;
            y = y || 0;
            witdh = witdh || node.width;
            height = height || node.height;
            let htmlCanvas = node.drawToCanvas(witdh, height, x, y);
            let base64 = htmlCanvas.toBase64('image/png', 0.9);
            base64 = base64.substring(base64.indexOf('base64') + 7);
            let dir = Laya.MiniFileMgr.fileNativeDir;
            let filePath = `${dir}/tmp_qrcode.png`;
            let fs = Laya.MiniFileMgr['fs'];
            fs.writeFile({
                filePath: filePath,
                data: base64,
                encoding: 'base64',
                success: res => {
                    wx.saveImageToPhotosAlbum({
                        filePath: filePath,
                        success: (res) => {
                            Utils.showTips("成功");
                        },
                        fail: res => {
                            Utils.showTips("失败");
                        }
                    });
                },
                fail: res => {
                    Utils.showTips("保存失败");
                }
            });
        }
        static renderToTexture(node, width, height, offsetX = 0, offsetY = 0, debug) {
            width = width || node.width;
            height = height || node.height;
            Laya.stage.addChild(node);
            let rt = node.drawToTexture(width, height, offsetX, offsetY);
            Laya.stage.removeChild(node);
            if (debug) {
                let img_rt = new Laya.Image();
                img_rt.x = 200;
                img_rt.texture = rt;
                Laya.stage.addChild(img_rt);
            }
            Laya.CallLater.I.callLater(this, () => {
                rt.bitmap.lock = false;
                rt.destroy();
            });
            return rt;
        }
        /**
         *
         * @param sp 要截取的精灵
         * @param cb 截屏成功回调 附带截屏临时路径
         */
        static mixturePicture(sp, cb) {
            if (!window["wx"])
                return;
            let witdh = sp.width;
            let height = sp.height;
            let htmlCanvas = sp.drawToCanvas(witdh, height, 0, 0);
            let base64 = htmlCanvas.toBase64("image/png", 0.9);
            base64 = base64.substring(base64.indexOf('base64') + 7);
            let dir = Laya.MiniFileMgr.fileNativeDir;
            let filePath = `${dir}/tmp_qrcode.png`;
            let fs = Laya.MiniFileMgr['fs'];
            fs.writeFile({
                filePath: filePath,
                data: base64,
                encoding: 'base64',
                success: res => {
                    console.log(filePath);
                    cb(filePath);
                },
                fail: res => {
                }
            });
        }
        //计算两时间戳的相差天数
        static deltaDays(firt_time, end_time) {
            return Math.floor((end_time - firt_time + 1000000) / (60 * 60 * 24 * 1000));
        }
        /**
         * 近似相等
         * @param a
         * @param b
         */
        static equal(a, b, epsilon = 1e-6) {
            return Math.abs(a - b) < epsilon;
        }
        /**
         * 字符串转Boolean
         */
        static str2Boolean(str) {
            if ("string" !== typeof (str))
                return false;
            let tmp = str.toLowerCase();
            if ("false" === tmp || "" === tmp) {
                return false;
            }
            else {
                return true;
            }
        }
        /**
         * 获取每帧间隔 秒
         * @param fixThrehold 超出阈值后是否修正
         */
        static getFrameDelta(fixThrehold = Infinity) {
            let delta = Laya.timer.delta * 0.001;
            return delta > fixThrehold ? 0 : delta;
        }
        /**
         *
         * @param json 预制json  需要预加载配置文件
         * @param createNum 创建个数
         */
        static createPrefabs(json, createNum = 1) {
            let ret = [];
            if (!Laya.loader.getRes(json)) {
                throw `需要先加载${json}才可以创建`;
            }
            else {
                for (let i = 0; i < createNum; ++i) {
                    ret.push(this.createPrefab(json));
                }
            }
            return ret;
        }
        static createPrefab(json) {
            let pre = new Laya.Prefab;
            pre.json = Laya.loader.getRes(json);
            return pre.create();
        }
        /**
         * 获取枚举从0开始的字符串数组
         * @param e
         */
        static getEnumArray(e) {
            let index = 0;
            let arr = [];
            while (e[index]) {
                arr.push(e[index]);
                index++;
            }
            return arr;
        }
        static getEnumKeyMap(e) {
            let arr = this.getEnumArray(e);
            let enumMap = {};
            for (const key of arr) {
                if (e[key] != undefined) {
                    enumMap[key] = key;
                }
            }
            return enumMap;
        }
        static getCurDayaStartTime() {
            return new Date(new Date().toLocaleDateString()).getTime(); // 当天0点
        }
        static getCurEndStartTime() {
            return new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
        }
        static MeterToKilometer(num) {
            if (num < 10000) {
                return num + "m";
            }
            else {
                let ret = num / 1000;
                return ret.toFixed(1) + "km";
            }
        }
        /**
         * 获取圆圈上指定角度点
         * @param center
         * @param radius
         * @param angle
         */
        static getCirclePoint(center, radius, angle) {
            let radian = Math.rad(angle);
            let x = center.x + Math.sin(radian) * radius;
            let y = center.y - Math.cos(radian) * radius; //  注意此处是“-”号，因为我们要得到的Y是相对于（0,0）而言的。
            return new Laya.Vector2(x, y);
        }
        /**
         * 比较版本 0:版本相等; 1:当前版本大于比较版本; 2:
         * @param curVersion 当前版本号
         * @param compareVersion 比较版本号
         */
        static compareVersion(curVersion, compareVersion) {
            let v1 = curVersion; //当前版本号 this.systemInfo.SDKVersion
            let v2 = compareVersion; //比较版本号
            let v1Arr = v1.split('.');
            let v2Arr = v2.split('.');
            const len = Math.max(v1Arr.length, v2Arr.length);
            while (v1Arr.length < len) {
                v1Arr.push('0');
            }
            while (v2Arr.length < len) {
                v2Arr.push('0');
            }
            for (let i = 0; i < len; i++) {
                const num1 = parseInt(v1Arr[i]);
                const num2 = parseInt(v2Arr[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
        /**
         * 是否兼容目标版本
         * @param curVersion 当前版本号
         * @param targetVersion 目标版本号
         */
        static compatibleVersion(curVersion, targetVersion) {
            if (Utils.compareVersion(curVersion, targetVersion) >= 0) {
                return true;
            }
            return false;
        }
        /**
         * 将对象的属性全部包装成 get 和 set 接口
         * @param obj
         * @param setcb 当设置值时回调
         */
        static warpObjectGetterSetter(obj, setcb) {
            let self = obj;
            if (self.__getter_setter_warpped) {
                return;
            }
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    let data = self[key];
                    delete self[key];
                    if (data instanceof Array) {
                        Object.defineProperty(obj, key, {
                            get: function () { return Utils.copyArray(self['_' + key]); },
                            set: function (v) {
                                let value = self['_' + key];
                                if (!v || (v == value && v.length === value.length))
                                    return;
                                self['_' + key] = Utils.copyArray(v);
                                if (setcb) {
                                    setcb.call(self, key);
                                }
                            },
                            enumerable: false,
                            configurable: false,
                        });
                    }
                    else {
                        Object.defineProperty(obj, key, {
                            get: function () { return self['_' + key]; },
                            set: function (v) {
                                if (v === self['_' + key])
                                    return;
                                self['_' + key] = v;
                                if (setcb) {
                                    setcb.call(self, key);
                                }
                            },
                            enumerable: false,
                            configurable: false,
                        });
                    }
                    self['_' + key] = data;
                }
            }
            Object.defineProperty(obj, '__getter_setter_warpped', {
                value: true,
                enumerable: false,
                configurable: false,
            });
        }
        /**
         * 获得一个UI组件所属的根节点模块名字
         */
        static getUIComponetRoot(uicomponent) {
            if (!uicomponent.scene)
                return;
            let moduleUrlName = uicomponent.scene.getModuleUrlName();
            if (moduleUrlName)
                return moduleUrlName;
            let rootView = uicomponent.scene;
            while (true) {
                if (!rootView.parent)
                    break;
                rootView = rootView.parent;
                if (rootView.getModuleUrlName) {
                    moduleUrlName = rootView.getModuleUrlName();
                    if (moduleUrlName)
                        break;
                }
            }
            return moduleUrlName;
        }
        /**
         * 获取动作对象当前正在播放的动作名
         * @param node
         */
        static getAnimatorCurPlayStateName(node) {
            let anim = node.getComponent(Laya.Animator);
            if (anim && anim.getControllerLayer()) {
                let layer = anim.getControllerLayer();
                return layer._currentPlayState.name;
            }
        }
        /**
         * 播放3d动画
         * @param node
         * @param name 动作名
         */
        static playAnimator3d(node, name, speed = 1, isLooping = true) {
            let anim = node.getComponent(Laya.Animator);
            if (anim) {
                let cl = anim.getControllerLayer();
                let state = cl.getAnimatorState(name);
                state.clip.islooping = isLooping;
                state.speed = speed;
                anim.play(name);
            }
        }
        /**
         * 异步处理函数
         * @param node
         * @param handler
         * @param delta
         */
        static asyncProcess(node, handler, delta = 30) {
            const clearFunc = () => {
                Laya.timer.clear(this, loopFunc);
                node.off(Laya.Event.REMOVED, this, clearFunc);
            };
            const loopFunc = () => {
                let ms = Laya.stage.getTimeFromFrameStart();
                if (ms > delta) {
                    return;
                }
                let isOver = handler.run();
                if (isOver) {
                    clearFunc();
                    return;
                }
            };
            Laya.timer.frameLoop(1, this, loopFunc);
            node.once(Laya.Event.REMOVED, this, clearFunc);
        }
        /**
         * 判断向量在朝向向量的：左:true 右:false
         * @param v
         * @param forward
         */
        static vOnLeftRight(v, forward) {
            let temp = new Laya.Vector3();
            temp.from(forward);
            temp.y = 0;
            Laya.Vector3.cross(Laya.Vector3.Up, temp, temp);
            return this.vOnForwardBehind(v, temp);
        }
        /**
         * 判断向量在朝向向量的：前:true 后:false
         */
        static vOnForwardBehind(v, forward) {
            v = v.clone();
            forward = forward.clone();
            forward.y = v.y = 0;
            let value = Laya.Vector3.dot(v, forward);
            return value >= 0 ? true : false;
        }
        /**
         * 获取点乘弧度值
         * @param v1
         * @param v2
         */
        static getDotRadian(v1, v2) {
            let radian = Math.acos(Math.clamp(Laya.Vector3.dot(v1, v2), -1, 1));
            return radian;
        }
        /**
         * 将子节点名字绑定到指定节点的成员变量
         * @param node
         */
        static bindVarByName(node, child) {
            let children = child ? child.getChildren() : node.getChildren();
            let anyNode = node;
            for (const child of children) {
                let name = child.name;
                if (name) {
                    if (anyNode[name]) {
                        throw Error('bindVarByName failed, already exist !!!');
                    }
                    else {
                        anyNode[name] = child;
                    }
                }
                if (child.numChildren > 0) {
                    this.bindVarByName(node, child);
                }
            }
        }
    }
    Utils.NotchScreenCfg = [
        { model: "iPhone X", notchTop: 44, notchBottom: 30 },
        { model: "PAAM00", notchTop: 80, notchBottom: 10 },
        { model: "PAAT00", notchTop: 80, notchBottom: 10 },
        { model: "PACM00", notchTop: 80, notchBottom: 10 },
        { model: "PACT00", notchTop: 80, notchBottom: 10 },
        { model: "CPH1831", notchTop: 80, notchBottom: 10 },
        { model: "CPH1833", notchTop: 80, notchBottom: 10 },
        { model: "PBCM10", notchTop: 80, notchBottom: 10 },
        { model: "V1732A", notchTop: 36, notchBottom: 10 },
    ];
    /**
     * 打印时间消耗
     * @param key
     */
    Utils.profileMap = {};
    Utils.lastClickTime = 0;
    Utils.numberUnit = {
        "3": "K",
        "6": "M",
        "9": "B",
        "12": "T",
        "15": "aa",
        "18": "bb",
        "21": "cc",
        "24": "dd",
        "27": "ee",
        "30": "ff",
        "33": "gg",
        "36": "hh",
        "39": "ii",
        "42": "jj",
        "45": "kk",
        "48": "ll",
        "51": "mm",
        "54": "nn",
        "57": "oo",
        "60": "pp",
        "63": "qq",
        "66": "rr",
        "69": "ss",
        "72": "tt",
        "75": "uu",
        "78": "vv",
        "81": "ww",
        "84": "xx",
        "87": "yy",
        "90": "zz",
        "93": "Aa",
        "96": "Bb",
        "99": "Cc",
        "102": "Dd",
        "105": "Ee",
        "108": "Ff",
        "111": "Gg",
        "114": "Hh",
        "117": "Ii",
        "120": "Jj",
        "123": "Kk",
        "126": "Ll",
        "129": "Mm",
        "132": "Nn",
        "135": "Oo",
        "138": "Pp",
        "141": "Qq",
        "144": "Rr",
        "147": "Ss",
        "150": "Tt",
        "153": "Uu",
        "156": "Vv",
        "159": "Ww",
        "162": "Xx",
        "165": "Yy",
        "168": "Zz",
        "171": "AA",
        "174": "BB",
        "177": "CC",
        "180": "DD",
        "183": "EE",
        "186": "FF",
        "189": "GG",
        "192": "HH",
        "195": "II",
        "198": "JJ",
        "201": "KK",
        "204": "LL",
        "207": "MM",
        "210": "NN",
        "213": "OO",
        "216": "PP",
        "219": "QQ",
        "222": "RR",
        "225": "SS",
        "228": "TT",
        "231": "UU",
        "234": "VV",
        "237": "WW",
        "240": "XX",
        "243": "YY",
        "246": "ZZ",
    };
    /**
      * 初始化相对参考时间,比如同步服务器时间
      */
    Utils.relativeDate = undefined;
    Utils.localLaunchDate = undefined;
    Utils.tempMatrix = new Laya.Matrix4x4();
    ;

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class BaseEventDispatcher extends Laya.EventDispatcher {
        constructor() {
            super();
        }
        static superFunc(self, name) {
            if (self instanceof BaseEventDispatcher) {
                return Laya.EventDispatcher.prototype[name].bind(self);
            }
            else {
                let callerSuper = Utils.super(self);
                return callerSuper.prototype[name].bind(self);
            }
        }
        hasListener(type) {
            if (type.charAt(0) == '$') {
                return EventCenter.getInstance().hasListener(type);
            }
            else {
                return BaseEventDispatcher.superFunc(this, 'hasListener')(type);
            }
        }
        event(type, data) {
            if (type.charAt(0) == '$') {
                return EventCenter.getInstance().event(type, data);
            }
            else {
                return BaseEventDispatcher.superFunc(this, 'event')(type, data);
            }
        }
        on(type, caller, listener, args) {
            if (type.charAt(0) == '$') {
                return EventCenter.getInstance().on(type, caller, listener, args);
            }
            else {
                return BaseEventDispatcher.superFunc(this, 'on')(type, caller, listener, args);
            }
        }
        once(type, caller, listener, args) {
            if (type.charAt(0) == '$') {
                return EventCenter.getInstance().once(type, caller, listener, args);
            }
            else {
                return BaseEventDispatcher.superFunc(this, 'once')(type, caller, listener, args);
            }
        }
        off(type, caller, listener, onceOnly) {
            if (type.charAt(0) == '$') {
                return EventCenter.getInstance().off(type, caller, listener, onceOnly);
            }
            else {
                return BaseEventDispatcher.superFunc(this, 'off')(type, caller, listener, onceOnly);
            }
        }
        offAllCaller(caller) {
            EventCenter.getInstance().offAllCaller(caller);
            return BaseEventDispatcher.superFunc(this, 'offAllCaller')(caller);
        }
        offAll(type) {
            if (type) {
                if (type.charAt(0) == '$') {
                    return EventCenter.getInstance().offAll(type);
                }
                else {
                    return BaseEventDispatcher.superFunc(this, 'offAll')(type);
                }
            }
            return this.offAllCaller(this);
        }
    }

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class BaseLogic extends BaseEventDispatcher {
        constructor() {
            super();
            this._initialized = false;
        }
        init(...args) {
            if (this._initialized == false) {
                this.onInitOnce.apply(this, args);
            }
            this.onInit(...args);
            this._initialized = true;
        }
        ;
        get initialized() {
            return this._initialized;
        }
        onInit(...args) { }
        ;
        onInitOnce(...args) { }
        ;
    }

    /*
    * Created on Fri Mar 15 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class Http extends Laya.EventDispatcher {
        constructor() {
            super();
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, this.completeHandler);
            xhr.once(Laya.Event.ERROR, this, this.errorHandler);
            xhr.on(Laya.Event.PROGRESS, this, this.processHandler);
            this.xhr = xhr;
            this.encrypt = true;
        }
        send(url, data, cb, thisObj, method = "POST", encrypt = true) {
            this.encrypt = encrypt;
            const pako = window['pako'];
            let _url = new Laya.URL(url);
            if (_url.url) {
                this.once("HTTPRSP", thisObj, cb);
                // 获取cookie
                let cookie = Laya.LocalStorage.getItem("SESSIONID");
                let header = ["Content-Type", "application/x-www-form-urlencoded"];
                if (cookie) {
                    header.push('Cookie');
                    header.push(cookie);
                }
                let datastr = JSON.stringify(data);
                console.log(">>>>>>>>>>>>>>>>>>> url:" + _url.url + " data:" + datastr);
                if (method.toUpperCase() == "GET") {
                    let params;
                    for (let key in data) {
                        let info = data[key];
                        if (typeof (info) == "object") {
                            info = JSON.stringify(info);
                        }
                        if (params == undefined) {
                            params = key + '=' + encodeURIComponent(info);
                        }
                        else {
                            params = params + '&' + key + '=' + encodeURIComponent(info);
                        }
                    }
                    this.xhr.send(_url.url + '?' + params, null, method, 'json', header);
                }
                else {
                    header[1] = "application/json";
                    if (encrypt) {
                        datastr = pako.deflate(encodeURIComponent(datastr), { to: 'string' });
                    }
                    else {
                        datastr = encodeURIComponent(datastr);
                    }
                    datastr = JSON.stringify({
                        data: datastr
                    });
                    this.xhr.send(_url.url, datastr, method, 'json', header);
                }
            }
        }
        registerErrHandler(cb, thisObj) {
            this.once("HTTPERR", thisObj, cb);
        }
        processHandler(data) {
        }
        errorHandler(data) {
            console.log("<<<<<<<<<<<<<<<<<<< error:" + JSON.stringify(data));
            this.event("HTTPERR", data);
        }
        completeHandler(pkg) {
            const pako = window['pako'];
            let data = pkg.data;
            if (data) {
                if (this.encrypt) {
                    data = pako.inflate(data, { to: 'string' });
                }
                data = decodeURIComponent(data);
                console.log("<<<<<<<<<<<<<<<<<<< ok:" + data);
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                    this.event("HTTPERR", { code: exports.BaseCode.HTTP_INTERFACE_UNDEFINED });
                    return;
                }
                let xmlhttp = this.xhr.http;
                let headers = xmlhttp.getAllResponseHeaders();
                if (headers && headers.search("Set-Cookie") != -1) {
                    let start = headers.search("Set-Cookie:") + 11;
                    let end = headers.indexOf("\n", start);
                    if (end == -1) {
                        end = headers.length;
                    }
                    let coookie = headers.substring(start, end);
                    Laya.LocalStorage.setItem("SESSIONID", coookie);
                }
                this.event("HTTPRSP", data);
            }
            else {
                console.log("<<<<<<<<<<<<<<<<<<< ok: null");
            }
        }
    }

    /*
     * Created on Wed Mar 27 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class UserInfoEntity extends exports.SDKEntity.UserInfoEntity {
        constructor(warp = true) {
            super();
            this.firstloginTimestamp = undefined; //首次登陆游戏的时间戳
            this.logindays = undefined; //登陆天数
            if (warp) {
                Utils.warpObjectGetterSetter(this, this.dirty);
            }
        }
        dirty(prop) {
            let self = this;
            UserLogic.getInstance().save(prop, self[prop]);
        }
    }
    class UserLogic extends BaseLogic {
        constructor() {
            super();
            this.readySaveProps = [];
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new UserLogic();
            }
            return this.instance;
        }
        onInit(DataModule) {
            let loadData = (o) => {
                for (const key in o) {
                    if (o.hasOwnProperty(key)) {
                        let data = this.unserialize(key);
                        data && (o[key] = data);
                    }
                }
            };
            if (DataModule) {
                //初始化游戏自定义玩家数据
                let mine = new DataModule();
                loadData(mine);
                //userlogic数据拷贝至mine
                for (const key in this.mine) {
                    if (this.mine.hasOwnProperty(key)) {
                        if (this.mine[key]) {
                            mine[key] = this.mine[key];
                        }
                    }
                }
                this.mine = mine;
            }
            else {
                //初始化userlogic
                this.mine = new UserInfoEntity();
                loadData(this.mine);
                //首次登陆判断
                if (undefined === this.mine.firstloginTimestamp) {
                    if (!this.mine.firstloginTimestamp) {
                        this.mine.firstloginTimestamp = Utils.getTime();
                        this.firstLogin = true;
                    }
                }
                //新的一天
                if (undefined === this.mine.logindays) {
                    this.mine.logindays = 1;
                    this.newDay = true;
                }
                else {
                    let curLogindays = Utils.deltaDays(this.mine.firstloginTimestamp, Utils.getTime()) + 1;
                    if (curLogindays > this.mine.logindays) {
                        this.mine.logindays = curLogindays;
                        this.newDay = true;
                    }
                }
            }
        }
        getMine() {
            return this.mine;
        }
        getUserInfo() {
            return this.mine;
        }
        update(pkg) {
            if (this.mine) {
                Utils.assign(this.mine, pkg, false);
            }
            else {
                this.mine = pkg;
            }
        }
        save(prop, value) {
            if (prop) {
                this.event(BaseEvent.E_PROP_CHANGED, [prop, value]);
            }
            this.readySaveProps.push(prop);
            if (this.readySaveProps.length == 1) {
                Laya.CallLater.I.callLater(this, () => {
                    this.saveToLocal(this.readySaveProps);
                    this.readySaveProps.clear();
                });
            }
        }
        saveToLocal(props) {
            this._save(props);
        }
        saveToServer() {
        }
        _save(props) {
            if (!this.mine) {
                return;
            }
            let mine = this.mine;
            if (props) {
                for (const prop of props) {
                    let _prop = '_' + prop;
                    if (mine.hasOwnProperty(_prop)) {
                        const data = mine[_prop];
                        this.serialize(_prop, data);
                    }
                }
            }
            else {
                for (const key in mine) {
                    if (mine.hasOwnProperty(key)) {
                        const data = mine[key];
                        this.serialize(key, data);
                    }
                }
            }
        }
        serialize(key, data) {
            if (data instanceof Array) {
                Laya.LocalStorage.setItem(key, JSON.stringify(data));
            }
            else if (data instanceof Object) {
                Laya.LocalStorage.setJSON(key, data);
            }
            else {
                Laya.LocalStorage.setItem(key, data);
            }
        }
        unserialize(key) {
            let data = Laya.LocalStorage.getItem(key);
            if (data) {
                try {
                    data = JSON.parse(data);
                }
                catch (error) {
                    console.log('unserialize error: ', key, data);
                }
            }
            return data;
        }
        isNewDay() {
            return this.newDay;
        }
        isFirstLogin() {
            return this.firstLogin;
        }
    }

    /*
    * Created on Fri Mar 15 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class SdkMsgEvent {
    }
    // 登录服务器事件
    SdkMsgEvent.E_SERVER_LOGIN = "SERVER_LOGIN";
    SdkMsgEvent.E_SERVER_RELOGIN = "SERVER_RELOGIN";
    // 分享信息
    SdkMsgEvent.E_SHARE_INFO = "SHARE_INFO";
    // 分享配置信息
    SdkMsgEvent.E_SHARE_CONFIG = "SHARE_CONFIG";
    // 分享来源玩家信息
    SdkMsgEvent.E_SHARE_QUERY_USERINFO = "SHARE_QUERY_USERINFO";
    // 授权返回
    SdkMsgEvent.E_PROFILE_RESULT = 'PROFILE_RESULT';
    // 收藏栏进入游戏
    SdkMsgEvent.E_FAVORITE_REWARD_RESULT = 'FAVORITE_REWARD_RESULT';
    // 邮件
    SdkMsgEvent.E_MAIL_RESULT = '$MAIL_RESULT';
    SdkMsgEvent.E_MAIL_OPENED = '$MAIL_OPENED';
    //世界排行榜
    SdkMsgEvent.E_RANK_RESULT = `$RANK_RESULT`;
    //获取IP地址
    SdkMsgEvent.E_IP_RESULT = '$IP_RESULT';
    class SdkMsg extends BaseLogic {
        constructor() {
            super();
            this.isReLogin = false;
            this.errCount = 0;
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            this.GameCfg = Sdk.GameCfg;
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new SdkMsg();
            }
            return this.instance;
        }
        send(msg, cb, errcb, server_url) {
            server_url = server_url || this.GameCfg.server_url;
            if (!server_url) {
                console.log("send message skipped with server url is unknown !!!");
                return;
            }
            if (!msg.data) {
                console.log("send message without data !!!" + typeof msg);
                return;
            }
            let http = new Http();
            let url = server_url + msg.url;
            http.registerErrHandler(this.errorRsp.bind(this, errcb), this);
            http.send(url, msg.data, this.response.bind(this, cb, errcb), this, msg.method, msg.encrypt);
        }
        response(cb, errcb, pkg) {
            if (pkg.code != exports.SdkErrorCode.SUCCESS) {
                if (errcb)
                    errcb.call(this, pkg);
                return;
            }
            if (cb) {
                cb.call(this, pkg.data);
            }
        }
        errorRsp(errcb, pkg) {
            if (typeof pkg == 'string' && pkg.indexOf('401') != -1) {
                // 授权失败, 重新登录
                if (!this.isReLogin) {
                    this.isReLogin = true;
                    this.event(SdkMsgEvent.E_SERVER_RELOGIN);
                }
                return;
            }
            if (errcb) {
                errcb.call(this, pkg);
            }
            else {
                if (typeof pkg == 'object' && pkg.code == exports.BaseCode.HTTP_INTERFACE_UNDEFINED) {
                    console.log('接口未定义！');
                    return;
                }
                if (Utils.isOnMiniGame()) {
                    this.errCount++;
                    if (this.errCount > 3) {
                        this.errCount = 0;
                        this.event(SdkMsgEvent.E_SERVER_LOGIN, { code: exports.SdkCode.SERVER_LOGIN_ERROR });
                    }
                }
            }
        }
        login(code, queryParam) {
            let msg = new LoginMsg();
            let rst = new exports.SDKEntity.LoginEntityRst();
            rst.code = code;
            rst.appId = this.GameCfg.appId;
            rst.version = this.GameCfg.version;
            rst.shareQuery = queryParam;
            rst.userInfo = new exports.SDKEntity.UserInfoEntity();
            rst.userInfo.platform = this.GameCfg.platform;
            msg.data = rst;
            this.send(msg, this.loginRsp, this.loginErr);
        }
        loginNoAuth() {
            let msg = new LoginMsgNoAuth();
            let rst = new exports.SDKEntity.LoginEntityRst();
            rst.userInfo = new exports.SDKEntity.UserInfoEntity();
            rst.version = this.GameCfg.version;
            rst.userInfo.platform = exports.SDKEntity.PlatformType.PC;
            // rst.shareQuery = new SDKEntity.ShareQueryParam();
            // rst.shareQuery.shareType = 0;
            // rst.shareQuery.shareUserId = 1;
            rst.code = this.GameCfg.user_unique_id;
            let mine = UserLogic.getInstance().getMine();
            rst.userInfo.headUrl = mine.headUrl;
            rst.userInfo.name = mine.name;
            msg.data = rst;
            this.send(msg, this.loginRsp, this.loginErr);
        }
        loginRsp(pkg) {
            console.log("服务器登录成功!");
            this.isReLogin = false;
            if (pkg.lastTime) {
                pkg.lastTime = new Date(pkg.lastTime);
            }
            pkg.serverTime = new Date(pkg.serverTime);
            this.event(SdkMsgEvent.E_SERVER_LOGIN, { code: exports.SdkCode.SERVER_LOGIN_SUCCESS, pkg: pkg });
        }
        loginErr(e) {
            this.isReLogin = false;
            if (e.msg) {
                Utils.showTips(e.msg);
            }
            else {
                Utils.showTips("连接服务器失败 !");
            }
            this.event(SdkMsgEvent.E_SERVER_LOGIN, { code: exports.SdkCode.SERVER_LOGIN_FAILED });
        }
        postProfile(userInfo) {
            let msg = new AuthProfileMsg();
            msg.data = userInfo;
            this.send(msg, this.postProfileRsp);
        }
        postProfileRsp() {
            this.event(SdkMsgEvent.E_PROFILE_RESULT);
        }
        getShareInfo(types) {
            let msg = new ShareInfo();
            let data = new exports.SDKEntity.ShareInfoRst();
            data.shareTypes = types;
            msg.data = data;
            this.send(msg, this.getShareInfoRsp);
        }
        getShareInfoRsp(pkg) {
            this.event(SdkMsgEvent.E_SHARE_INFO, pkg);
        }
        postShareQuery(queryParam) {
            let msg = new ShareQuery();
            let data = new exports.SDKEntity.ShareQueryRst();
            data.param = queryParam;
            msg.data = data;
            this.send(msg, this.postShareQueryRsp);
        }
        postShareQueryRsp(pkg) {
            if (pkg.fromUserInfo) {
                this.event(SdkMsgEvent.E_SHARE_QUERY_USERINFO, pkg.fromUserInfo);
            }
        }
        /**
         * 分享领取状态更新
         * @param userId  好友的 ID
         * @param state
         */
        postGiftState(userId, shareType, state) {
            let msg = new GiftStateMsg();
            let data = new exports.SDKEntity.GiftStateUpdateRst();
            data.state = state;
            data.userId = userId;
            data.type = shareType;
            msg.data = data;
            this.send(msg);
        }
        clearShareInfo(pkg) {
            let msg = new ShareClearMsg();
            let data = new exports.SDKEntity.ShareClearRst();
            data.param = pkg;
            msg.data = data;
            this.send(msg);
        }
        // 收藏栏启动小游戏
        postFavoriteReward() {
            let msg = new FavoriteRewardMsg();
            let rst = new exports.SDKEntity.CommonRst();
            msg.data = rst;
            this.send(msg, this.postFavoriteRewardRsp);
        }
        postFavoriteRewardRsp(pkg) {
            this.event(SdkMsgEvent.E_FAVORITE_REWARD_RESULT);
        }
        // 数据打点
        dataStub(type, args) {
            let msg = new DataStubMsg();
            let rst = new exports.SDKEntity.DataStubRst();
            rst.type = type;
            rst.args = args;
            msg.data = rst;
            this.send(msg);
        }
        //======================================================邮件
        getMailInfo() {
            let msg = new MailInfoMsg();
            msg.data = new exports.SDKEntity.CommonRst();
            this.send(msg, this.getMailInfoRsp);
        }
        getMailInfoRsp(pkg) {
            this.event(SdkMsgEvent.E_MAIL_RESULT, pkg);
        }
        openMail(ids) {
            let msg = new MailOpenMsg();
            let rst = new exports.SDKEntity.MailOpenRst();
            rst.ids = ids;
            msg.data = rst;
            this.send(msg, this.openMailRsp);
        }
        openMailRsp(pkg) {
            this.event(SdkMsgEvent.E_MAIL_OPENED, pkg);
        }
        sendMail(userName, password, userId, mail) {
            let msg = new MailSendMsg();
            let rst = new exports.SDKEntity.MailSendRst();
            rst.mail = mail;
            rst.userName = userName;
            rst.password = password;
            rst.userId = userId;
            msg.data = rst;
            this.send(msg);
        }
        //======================================================世界排行榜
        /**
         * 上报排行榜分数
         * @param score 消除关卡_猜词关卡
         */
        reportedRankScore(score) {
            let msg = new RankScoreMsg();
            let rst = new exports.SDKEntity.RankScoreRst();
            rst.score = score;
            msg.data = rst;
            this.send(msg);
        }
        getRankInfo() {
            let msg = new RankInfoMsg();
            let rst = new exports.SDKEntity.RankInfoRst();
            rst.count = 50;
            rst.page = 0;
            msg.data = rst;
            this.send(msg, this.getRankInfoRsp);
        }
        getRankInfoRsp(pkg) {
            this.event(SdkMsgEvent.E_RANK_RESULT, pkg);
        }
        getIpQueryInfo() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            let url = GameCfg.server_url_common;
            if (url) {
                let msg = new IpQueryMsg();
                msg.data = new exports.SDKEntity.IpQueryRst();
                this.send(msg, this.getIpQueryInfoRsp, this.getIpQueryInfoRspFail, url);
            }
        }
        getIpQueryInfoRsp(pkg) {
            this.event(SdkMsgEvent.E_IP_RESULT, pkg);
        }
        getIpQueryInfoRspFail(pkg) {
            console.log(JSON.stringify(pkg));
        }
    }

    class RewardStrategy {
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
        }
        getStrategy() {
            return exports.GetRewardSDKWay.SHARE;
        }
        runStrategy() {
            console.log(`获取奖励源[${this.curParams.source}]-获取奖励方式[${exports.GetRewardSDKWay.SHARE}]`);
            EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                way: this.getStrategy(),
                gid: this.curParams.bindCtrlGId,
            });
        }
    }
    ;

    class Login {
        constructor() {
        }
        initMiniAdapter() {
        }
        ;
        engineInitialized() { }
        ;
        login() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            let mine = UserLogic.getInstance().getMine();
            mine.openId = GameCfg.user_unique_id;
            mine.name = "test_user";
            mine.headUrl = "";
            if (this.isLoginServer()) {
                SdkMsg.getInstance().loginNoAuth();
            }
            else {
                EventCenter.getInstance().event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS });
            }
            Sdk.getInstance().judgeBAndW({ sceneId: "PC" });
        }
        request(url, data, handler, method) {
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (pkg) {
                if (handler)
                    handler.runWith(pkg);
            });
            xhr.send(url, null, method, 'json', ["Content-Type", "application/x-www-form-urlencoded"]);
        }
        onResume() { }
        ;
        getQuery() { return undefined; }
        ;
        setKeepScreenOn(opt) { }
        ;
        onShow(cb) { }
        ;
        onHide(cb) { }
        ;
        isAuth() { return true; }
        ;
        auth(btn) { }
        ;
        destroyUserInfoButton() { }
        ;
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        ;
        checkUpdate() { }
        ;
        loadSubpackage(opt) { return undefined; }
        ;
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
        }
        getSystemInfo() {
            return {
                SDKVersion: "0.0.0"
            };
        }
        getMenuButtonBoundingClientRect() {
            return null;
        }
        exit() { }
        ;
        getLaunchOptionsSync() { return undefined; }
        ;
        navigateToMiniProgram(opt) { }
        ;
        getOpenDataContext() { }
        ;
        createFeedbackButton(opt) { }
        ;
        openCustomerServiceConversation() { }
        ;
        createGameClubButton(opt) { }
        ;
        onAudioInterruption(begincb, endcb) { }
        ;
        vibrateShort() { }
        ;
        getShareInstance() { return undefined; }
        ;
        getAdvInstance() { return undefined; }
        ;
        getStatInstance() { return undefined; }
        ;
        getRewardStrInstance() { return new RewardStrategy(); }
        ;
        getNetworkType() { return "wifi"; }
        isConnectNetwork() { return true; }
        judgeBAndW(params) { return exports.BlackAndWhite.White; }
        getCode() { return undefined; }
        ;
    }

    class WXShare {
        // private shareType: number;
        constructor() {
        }
        init(shareData) {
        }
        recordVideo({ duration: number }) { }
        ;
        stopRecord() { }
        ;
        shareVideo(url) { }
        ;
        canRecord() { return false; }
        ;
        setShare(title, imgUrl, query) {
            wx.showShareMenu({
                withShareTicket: true,
            });
            query = query || "";
            if (wx.aldOnShareAppMessage) {
                wx.aldOnShareAppMessage(function () {
                    return {
                        title: title,
                        imageUrl: imgUrl,
                        query: query
                    };
                }.bind(this));
            }
            else {
                wx.onShareAppMessage(function () {
                    return {
                        title: title,
                        imageUrl: imgUrl,
                        query: query
                    };
                }.bind(this));
            }
        }
        share(args1, args2, args3) {
            let title = null, imgUrl = null, queryParam = null, source = null;
            if (args1 instanceof RewardGainWayParams) {
                title = args1.title;
                imgUrl = args1.imgUrl;
                queryParam = args1.queryParam;
                source = args1.source;
            }
            else {
                title = args1;
                imgUrl = args2;
                queryParam = args3;
                source = "未知";
            }
            let query = ``;
            if (queryParam) {
                EventCenter.getInstance().once(BaseEvent.E_APP_ON_RESUME, this, function (res) {
                    Utils.showTips("感谢分享!!!");
                });
                for (let key in queryParam) {
                    let info = queryParam[key];
                    if (info != undefined) {
                        if (typeof (info) == "object") {
                            info = JSON.stringify(info);
                        }
                        if (query == undefined) {
                            query = key + '=' + info;
                        }
                        else {
                            query = query + '&' + key + '=' + info;
                        }
                    }
                }
            }
            console.log("wx share queryParam:" + JSON.stringify(queryParam), query);
            if (wx.aldShareAppMessage) {
                let o = {
                    title: title,
                    imageUrl: imgUrl,
                    query: query,
                    ald_desc: source,
                };
                wx.aldShareAppMessage(o);
                console.log("aldShareAppMessage: ", JSON.stringify(o));
            }
            else {
                wx.shareAppMessage({
                    title: title,
                    imageUrl: imgUrl,
                    query: query,
                });
            }
        }
    }
    WXShare.aldShareEnable = false;
    ;
    Laya.ClassUtils.regClass("WXShare", WXShare);

    class WXAdv {
        constructor() {
            //初始化banner
            this.banners = [];
            this.videos = [];
            this.curIsAutoPlayVideo = false;
            this.interstitial = [];
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        loadVideo(videoId, isPlay = false) {
            this.curIsAutoPlayVideo = isPlay;
            let isRegOnClose = (this.videos.length === 0); //是否注册监听函数
            let video = this.getVideoById(videoId);
            if (!video) {
                video = { id: videoId, inst: null, state: exports.AdState.LOADING };
                this.videos.push(video);
            }
            if (!video.inst) {
                video.inst = wx.createRewardedVideoAd({ adUnitId: video.id });
                video.inst.load();
                if (isRegOnClose) {
                    video.inst.onLoad(() => {
                        console.log('激励视频广告加载成功');
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        video.state = exports.AdState.LOAD;
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_SUCCESS });
                        if (this.curIsAutoPlayVideo)
                            this.showVideo(video.id);
                    });
                    video.inst.onError((err) => {
                        console.log('激励视频广告加载失败');
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        video.state = exports.AdState.LOAD_FAIL;
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                    });
                    video.inst.onClose((res) => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if ((res && res.isEnded) || (res === undefined)) {
                            // 正常播放结束，可以下发游戏奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                        }
                        this.curIsAutoPlayVideo = false;
                    });
                }
            }
            else {
                if (exports.AdState.LOAD_FAIL === video.state) {
                    video.inst.load()
                        .catch((err) => {
                        video.state = exports.AdState.LOAD_FAIL;
                        console.log('激励视频广告显示失败');
                    });
                }
            }
        }
        showVideo(videoId) {
            let video = this.getVideoById(videoId);
            if (!video || !video.inst)
                return;
            video.inst.show()
                .then(() => {
                '激励视频广告显示';
            })
                .catch(() => {
                video.inst.load()
                    .then(() => video.inst.show())
                    .catch((err) => {
                    video.state = exports.AdState.LOAD_FAIL;
                    console.log('激励视频广告显示失败');
                });
            });
        }
        preloadVideo(videoId) {
            this.loadVideo(videoId);
        }
        getVideoState(videoId) {
            let video = this.getVideoById(videoId);
            if (!video)
                return exports.VideoState.UNLOAD;
            if (exports.AdState.LOAD === video.state)
                return exports.VideoState.ENABLED;
            else
                return exports.VideoState.UNENABLED;
        }
        playVideo(videoId) {
            console.log("video Id", videoId);
            let video = this.getVideoById(videoId);
            if (!video) {
                Laya.MouseManager.enabled = false;
                this.loadVideo(videoId, true);
            }
            else {
                if (exports.AdState.LOAD === video.state) {
                    Laya.MouseManager.enabled = false;
                    this.showVideo(videoId);
                }
                else if (exports.AdState.LOAD_FAIL === video.state) {
                    Utils.showTips("暂无视频!!!");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                }
            }
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                (!customParams) && (customParams = { forever: false, widthScaleRate: 1 });
                (!customParams.widthScaleRate) && (customParams.widthScaleRate = 1);
                customParams.forever = Boolean(customParams.forever);
                banner = { id: bannerId, state: exports.AdState.LOADING, inst: null, showCnt: 0, createStamp: Utils.getTime(), customParams: customParams };
                this.banners.push(banner);
            }
            else {
                if (!customParams) {
                    customParams = banner.customParams;
                }
            }
            if (!banner.inst) {
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                let phone = Sdk.getInstance().getSystemInfo();
                let bannerWidth = phone.screenWidth * customParams.widthScaleRate;
                banner.inst = wx.createBannerAd({
                    adUnitId: bannerId,
                    style: {
                        left: 0,
                        top: 0,
                        width: bannerWidth,
                    },
                });
                banner.inst.onResize((res) => {
                    banner.inst.style.left = (phone.screenWidth - banner.inst.style.realWidth) / 2;
                    banner.inst.style.top = phone.screenHeight - banner.inst.style.realHeight;
                    //ios全面屏上移banner
                    if (-1 !== phone.system.indexOf("iOS")
                        && Utils.isQMP()) {
                        banner.inst.style.top -= 24;
                    }
                });
                banner.inst.onLoad(() => {
                    console.log('bannerid${bannerIds[i]} 广告加载成功');
                    banner.state = exports.AdState.LOAD;
                    if (banner.customParams.forever)
                        banner.inst.show();
                });
                banner.inst.onError((err) => {
                    console.log('bannerid${bannerIds[i]} 广告加载失败');
                    banner.state = exports.AdState.LOAD_FAIL;
                });
            }
            else {
                if (exports.AdState.DELETING === banner.state
                    || exports.AdState.LOAD_FAIL === banner.state) {
                    banner.inst.destroy();
                    banner.inst = null;
                    banner.showCnt = 0;
                    banner.state = exports.AdState.LOADING;
                    this.preloadBanner(bannerId);
                }
            }
        }
        showBanner(bannerId, customParams) {
            console.log("banner Id", bannerId);
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                this.preloadBanner(bannerId, customParams);
            }
            else {
                if (banner.customParams.forever)
                    return;
                if (exports.AdState.LOAD === banner.state) {
                    banner.showCnt++;
                    banner.inst.show();
                }
                else {
                    if (exports.AdState.LOAD_FAIL === banner.state)
                        Laya.timer.once(10000, this, function () {
                            this.preloadBanner(bannerId);
                        });
                    else if (exports.AdState.LOADING === banner.state) {
                        if (customParams && customParams.isPostLoadedShow) {
                            Laya.timer.once(1000, this, function () {
                                this.showBanner(bannerId, customParams);
                            });
                        }
                    }
                }
            }
        }
        hideBanner(bannerId) {
            let banner = this.getBannerById(bannerId);
            if (!banner)
                return;
            if (banner.customParams.forever)
                return;
            if (banner.inst)
                banner.inst.hide();
            //删除banner
            if (banner.showCnt > 0) {
                banner.state = exports.AdState.DELETING;
                this.preloadBanner(bannerId);
            }
        }
        getBannerById(bannerId) {
            return this.banners.filter((v, idx, arr) => { return (v.id === bannerId); }, this)[0];
        }
        showInterstitial(id) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let curVersion = Sdk.getInstance().getSystemInfo().SDKVersion;
            if (!Utils.compatibleVersion(curVersion, "2.6.0")) {
                return;
            }
            let interstitial = this.getInterstitial(id);
            if (!interstitial) {
                let inst = wx.createInterstitialAd({
                    adUnitId: id,
                });
                this.interstitial.push({ id: id, inst: inst });
                inst.onLoad(() => {
                    console.log('interstitial 广告加载成功');
                });
                inst.onError((err) => {
                    console.log('interstitial 广告加载失败');
                });
                inst.onClose(res => {
                    console.log('插屏 广告关闭');
                });
            }
            else {
                interstitial.inst.show();
            }
        }
        getInterstitial(id) {
            let interstitials = this.interstitial.filter((v, idx, arr) => { return v.id === id; }, this);
            return interstitials[0];
        }
        preloadInterstitial(id) { }
        init(customParams) { }
        preloadNativeAd(nativeAds) { }
        showNativeAd(parent, pos) { }
        destoryNativeAd() { }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }
    WXAdv.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    class BIStat {
        constructor() { }
        sendEvent(eventName, param) {
            if ("面板" === eventName) {
            }
            else if ("分享" === eventName) {
                let id = param.id;
                // $plat.leuok.sharedOut({type:id});
            }
            else if ("视频" === eventName) {
                // 7,曝光 比如复活时看到观看视频按钮
                // 0,主动触发打开视频窗口
                // 1,看到视频窗口后主动关闭
                // 2,点击播放视频
                // 3,视频中途关闭视频
                // 4,观看结束
                // 5,获得奖励
                // 6,没有可观看的广告
                // if ()
                //$plat.leuok.adVideo({type:, subType:,});
            }
            else if ("导出" === eventName) {
            }
            else if ("导出面板" === eventName) {
            }
            else if ("登陆" === eventName) {
                let name = UserLogic.getInstance().getMine().name;
                // wx.leuok.adLogin({roleName:name});
            }
            else if ("漏斗" === eventName) {
                let id = Number(param["id"]);
                // wx.leuok.appOnce({actionNumber:id});
            }
        }
        stageOnStart(o) {
            this.stageStartTime = Utils.getTime();
            // wx.leuok.battle({
            //     // 日志类型( 1战斗开始 2战斗成功结束 3战斗失败结束)
            //     logType: 1,
            //     battleType: 1,
            //     battleId: Number(o.stageId),
            // });
        }
        stageOnRunning(o) {
        }
        stageOnEnd(o) {
            let consumeTime = Utils.getTime() - this.stageStartTime;
            // if (o.event==="fail") {
            //     wx.leuok.battle({
            //         logType: 3, // 日志类型( 1战斗开始 2战斗成功结束 3战斗失败结束)
            //         battleType: 1,
            //         battleId: Number(o.stageId),
            //         time:consumeTime,
            //     });
            // } else {
            //     wx.leuok.battle({
            //         logType: 2, // 日志类型( 1战斗开始 2战斗成功结束 3战斗失败结束)
            //         battleType: 1,
            //         battleId: Number(o.stageId),
            //         time:consumeTime,
            //     });
            // }
        }
        unlockItem(o) {
        }
    }

    class WXStat {
        constructor() { }
        sendEvent(eventName, param) {
            if (wx.aldSendEvent)
                wx.aldSendEvent(eventName, param);
        }
        stageOnStart(o) {
            if (wx.aldStage)
                wx.aldStage.onStart(o);
        }
        stageOnRunning(o) {
            if (wx.aldStage)
                wx.aldStage.onRunning(o);
        }
        stageOnEnd(o) {
            if (wx.aldStage)
                wx.aldStage.onEnd(o);
        }
        unlockItem(o) {
        }
    }

    class WXRewardStrategy {
        constructor() {
            /**
             * 分享判定
             * 是否正在分享,因为微信取消了分享回调,故检测分享触发+回到前台认为一次分享完成
             */
            this.shareCount = 0; // 分享次数(首次必失败)
            this.shareStartTime = undefined; //分享开始时间
        }
        static get rewardStrategyCnt() {
            if (undefined === this._rewardStrategyCnt) {
                if (UserLogic.getInstance().isNewDay
                    && UserLogic.getInstance().isNewDay()) {
                    this.rewardStrategyCnt = 1;
                }
                else {
                    let rewardStrategyCnt = Laya.LocalStorage.getItem("rewardStrategyCnt");
                    if (rewardStrategyCnt == null || rewardStrategyCnt === "") {
                        this.rewardStrategyCnt = 1;
                    }
                    else {
                        this._rewardStrategyCnt = Number(rewardStrategyCnt);
                    }
                }
            }
            return this._rewardStrategyCnt;
        }
        static set rewardStrategyCnt(v) {
            if (this._rewardStrategyCnt === v)
                return;
            this._rewardStrategyCnt = v;
            Laya.LocalStorage.setItem("rewardStrategyCnt", this._rewardStrategyCnt.toString());
        }
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
            //每激活一次奖励策略，奖励计数累加一次
            WXRewardStrategy.rewardStrategyCnt++;
        }
        getStrategy() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (Sdk.getInstance().isAudit()) {
                console.log("###审核版本直接返回视频!!!");
                return exports.GetRewardSDKWay.VIDEO;
            }
            if (exports.GetRewardSDKWay.AUTO === this.curStrategy) {
                if (exports.VideoState.ENABLED === Sdk.getInstance().isHasVideo(this.curParams.id)) {
                    let baseShareCnt = Sdk.getInstance().getServerJsonCfgShareParams().OlderShareCtnBase;
                    if (UserLogic.getInstance().isFirstLogin
                        && UserLogic.getInstance().isFirstLogin()) {
                        baseShareCnt = Sdk.getInstance().getServerJsonCfgShareParams().FreshShareCntBase;
                    }
                    if (!baseShareCnt) {
                        baseShareCnt = 0;
                    }
                    let curAutoStrategy = null;
                    if (WXRewardStrategy.rewardStrategyCnt <= baseShareCnt) {
                        curAutoStrategy = exports.GetRewardSDKWay.SHARE;
                    }
                    else {
                        let shareSpace = Sdk.getInstance().getServerJsonCfgShareParams().ShareSpace;
                        if (!shareSpace) {
                            shareSpace = 0;
                        }
                        if (shareSpace > 0 && 0 === (WXRewardStrategy.rewardStrategyCnt - baseShareCnt) % (shareSpace + 1)) {
                            curAutoStrategy = exports.GetRewardSDKWay.SHARE;
                        }
                        else {
                            curAutoStrategy = exports.GetRewardSDKWay.VIDEO;
                        }
                    }
                    return curAutoStrategy;
                }
                else {
                    return exports.GetRewardSDKWay.SHARE;
                }
            }
            else {
                if (exports.GetRewardSDKWay.SHARE === this.curStrategy)
                    return this.curStrategy;
                else
                    return exports.GetRewardSDKWay.VIDEO;
            }
        }
        runStrategy() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let curStrategy = this.getStrategy();
            if (exports.GetRewardSDKWay.SHARE === curStrategy) {
                Sdk.getInstance().sendEvent("分享", { "开始": this.curParams.source });
                this.share(this.curParams);
            }
            else if (exports.GetRewardSDKWay.VIDEO === curStrategy) {
                Sdk.getInstance().sendEvent("视频", { "开始": this.curParams.source });
                this.playVideo(this.curParams);
            }
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let videoState = Sdk.getInstance().isHasVideo(this.curParams.id);
            if (exports.VideoState.UNENABLED === videoState) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦, 分享也可获得奖励哟!");
                Laya.MouseManager.enabled = false;
                Laya.timer.once(1000, this, function () {
                    Laya.MouseManager.enabled = true;
                    this.share(params);
                });
                // Sdk.getInstance().showModal("今天已经没有视频啦,分享同样可以获得奖励哟!", "提示", 
                //     "分享获得", Laya.Handler.create(this, function() {
                //         this.share(params);
                //     }), "明天再来", Laya.Handler.create(this, function() {
                //         EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {code:SdkCode.REWARD_GAIN_FAIL, gid:params.bindCtrlGId});
                //     }));
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                        //统计视频出处
                        Sdk.getInstance().sendEvent("视频", { "完成": params.source });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Sdk.getInstance().showModal("看完视频才会有奖励哟！！！", "提示", "继续观看", Laya.Handler.create(this, function () {
                            this.playVideo(params);
                        }), "一会再来", Laya.Handler.create(this, function () {
                            EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                        }));
                        //统计视频未完成
                        Sdk.getInstance().sendEvent("视频", { "未完成": params.source });
                    }
                });
                Sdk.getInstance().playVideo(params.id);
            }
        }
        share(params) {
            this.shareStartTime = Utils.getTime();
            //监听切入前台,因为微信取消分享回调,暂时用方案：分享触发+回到前台为分享完成
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            EventCenter.getInstance().once(BaseEvent.E_APP_ON_RESUME, this, function (res) {
                let diffTime = Math.floor((Utils.getTime() - this.shareStartTime) / 1000);
                if (diffTime > 3) {
                    this.shareCount += 1;
                    let shareResult = false;
                    if (this.shareCount > 1) {
                        shareResult = true;
                    }
                    else {
                        let failProb = Sdk.getInstance().getServerJsonCfgShareParams().shareFailProb;
                        if (!failProb) {
                            failProb = 0;
                        }
                        if (Utils.getIntRandom(0, 100) >= failProb) {
                            shareResult = true;
                        }
                    }
                    if (shareResult) {
                        this.shareCount = 0;
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.SHARE,
                            gid: params.bindCtrlGId
                        });
                        //统计分享完成
                        Sdk.getInstance().sendEvent("分享", { "完成": params.source });
                    }
                    else {
                        // Utils.showTips("不要频繁骚扰同一个群!");
                        // Laya.MouseManager.enabled = false;
                        // Laya.timer.once(1000, this, function() {
                        //     Laya.MouseManager.enabled = true;
                        //     this.share(params);
                        // });
                        this.continueShare(params, "不要频繁骚扰同一个群!");
                    }
                }
                else {
                    this.continueShare(params, "分享失败!");
                    // Utils.showTips("分享失败!");
                    // Laya.MouseManager.enabled = false;
                    // Laya.timer.once(1000, this, function() {
                    //     Laya.MouseManager.enabled = true;
                    //     this.share(params);
                    // });
                    //统计分享未完成
                    Sdk.getInstance().sendEvent("分享", { "未完成": params.source });
                }
                this.shareStartTime = undefined;
            });
            Sdk.getInstance().share(params);
        }
        continueShare(params, str) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            Sdk.getInstance().showModal(str, "提示", "继续分享", Laya.Handler.create(this, function () {
                this.share(params);
            }), "一会再来", Laya.Handler.create(this, function () {
                this.shareCount = 0;
                EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
            }));
        }
    }
    WXRewardStrategy._rewardStrategyCnt = undefined; //奖励策略计数
    ;

    // 微信数据解析
    function pf_wxInfo_to_playerInfo(wxInfo, userInfo) {
        if (wxInfo.nickName != undefined)
            userInfo.name = wxInfo.nickName;
        if (wxInfo.avatarUrl != undefined)
            userInfo.headUrl = wxInfo.avatarUrl;
        if (wxInfo.gender != undefined)
            userInfo.sex = wxInfo.gender;
        if (wxInfo.city != undefined)
            userInfo.city = wxInfo.city;
        if (wxInfo.province != undefined)
            userInfo.province = wxInfo.province;
        if (wxInfo.country != undefined)
            userInfo.country = wxInfo.country;
        if (wxInfo.language != undefined)
            userInfo.language = wxInfo.language;
    }
    class WXLogin extends BaseEventDispatcher {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
            super();
        }
        initMiniAdapter() { }
        ;
        engineInitialized() { }
        ;
        // 登录微信
        login() {
            wx.login({
                success: this.wxloginSucc.bind(this),
                fail: this.wxloginFail.bind(this)
            });
            wx.getSetting({
                success: this.onSettings.bind(this)
            });
            //监听网络状态
            this.networkstate = "none";
            wx.getNetworkType({ success: (res) => {
                    console.log('>>>>>>>>>>>>>>>>> getNetworkType: ', res.networkType);
                    this.networkstate = res.networkType;
                } });
            wx.onNetworkStatusChange((res) => {
                console.log('>>>>>>>>>>>>>>>>> onNetworkStatusChange: ', res.isConnected, res.networkType);
                this.networkstate = res.networkType;
            });
        }
        request(url, data, handler, method) {
            console.log('>>>>>>>>>>>>>>>>> request: ', url, data);
            wx.request({
                url: url,
                data: data,
                method: method,
                dataType: 'json',
                success: res => {
                    console.log('<<<<<<<<<<<<<<<<< request: ', res);
                    if (handler) {
                        handler.runWith(res.data);
                    }
                },
                fail: err => {
                    console.log('<<<<<<<<<<<<<<<<< request error: ', err);
                    Utils.showTips('获取服务器JSON配置失败！');
                }
            });
        }
        getShareInstance() {
            return new WXShare();
        }
        getAdvInstance() {
            return new WXAdv();
        }
        getStatInstance() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            if ("bi" === GameCfg.stat)
                return new BIStat();
            else
                return new WXStat();
        }
        getRewardStrInstance() {
            return new WXRewardStrategy();
        }
        onSettings(res) {
            let settings = res.authSetting;
            this.isUserInfoAuth = !!settings["scope.userInfo"];
            if (this.isUserInfoAuth) {
                wx.getUserInfo({
                    success: this.userInfoSucc.bind(this)
                });
            }
            if (this.code) {
                this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "微信登录成功" });
            }
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return this.query;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 微信授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
                this.query = res.query;
                SdkMsg.getInstance().postShareQuery(res.query);
            }
        }
        wxloginSucc(res) {
            console.log("微信登录成功！");
            let tryCount = 10;
            const checkNeedFix = () => {
                if (!this.menuInfo || this.menuInfo.top > 0 || tryCount <= 0) {
                    this.code = res.code;
                    // 登录服务器
                    if (this.isLoginServer()) {
                        SdkMsg.getInstance().login(this.code, launchParams.query);
                    }
                    if (this.isUserInfoAuth !== undefined) {
                        this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "微信登录成功" });
                    }
                    return false;
                }
                tryCount--;
                return true;
            };
            const fixInfo = () => {
                // 修正系统信息和胶囊信息
                this.getSystemInfo(true);
                this.getMenuButtonBoundingClientRect(true);
                if (!checkNeedFix()) {
                    // 获取成功
                    Utils.sNotchScreen = undefined; // 重置适配信息
                    Laya.timer.clear(this, fixInfo);
                }
            };
            let launchParams = wx.getLaunchOptionsSync();
            this.query = launchParams.query;
            if (checkNeedFix()) {
                Laya.timer.loop(100, this, fixInfo);
            }
        }
        wxloginFail() {
            console.log("微信登录失败！");
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_FAILED, msg: "微信登录失败" });
        }
        userInfoSucc(info) {
            let userInfo;
            if (info.userInfo) {
                console.log("获取用户信息成功！" + JSON.stringify(info));
                this.isUserInfoAuth = true;
                this.encryptedData = info.encryptedData;
                this.iv = info.iv;
                this.destroyUserInfoButton();
                // 解析并更新
                userInfo = new exports.SDKEntity.UserInfoEntity();
                pf_wxInfo_to_playerInfo(info.userInfo, userInfo);
                UserLogic.getInstance().update(userInfo);
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_SUCCESS, msg: "授权成功" });
            }
            else {
                console.log("获取用户信息失败！");
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_FAILED, msg: "用户拒绝授权" });
            }
            // 发送到服务器
            if (this.profileToServer) {
                SdkMsg.getInstance().postProfile(userInfo);
            }
        }
        createUserInfoButton() {
            let btn = this.profileBtn;
            let leftTop = btn.localToGlobal(new Laya.Point(0, 0));
            let rightBottom = btn.localToGlobal(new Laya.Point(btn.width, btn.height));
            let points = [];
            Laya.stage.transform.transformPoint(leftTop);
            Laya.stage.transform.transformPoint(rightBottom);
            let width = rightBottom.x - leftTop.x;
            let height = rightBottom.y - leftTop.y;
            let button = wx.createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                    left: leftTop.x,
                    top: leftTop.y,
                    width: width,
                    height: height,
                },
                withCredentials: true,
                lang: 'zh_CN',
            });
            button.show();
            button.onTap(this.userInfoSucc.bind(this));
            this.profileBtn = button;
            btn.once(Laya.Event.REMOVED, this, this.destroyUserInfoButton);
        }
        destroyUserInfoButton() {
            if (this.profileBtn)
                this.profileBtn.destroy();
            this.profileBtn = null;
        }
        setKeepScreenOn(opt) {
            // 设置屏幕常亮
            wx.setKeepScreenOn(opt);
        }
        onShow(cb) {
            wx.onShow(cb);
        }
        onHide(cb) {
            wx.onHide(cb);
        }
        checkUpdate() {
            if (typeof wx.getUpdateManager === 'function') { // 请在使用前先判断是否支持
                const updateManager = wx.getUpdateManager();
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    console.log(res.hasUpdate);
                });
                updateManager.onUpdateReady(() => {
                    this.showModal('有新版本啦！，赶快开启新的历程吧~', '更新提示', '开启', Laya.Handler.create(this, () => {
                        updateManager.applyUpdate();
                    }));
                });
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log('新的版本下载失败');
                });
            }
        }
        loadSubpackage(opt) {
            if (!wx.loadSubpackage) {
                this.showModal('请升级微信到最新版本！', '提示', '确定', Laya.Handler.create(this, () => {
                    this.exit();
                }), '');
                return;
            }
            return wx.loadSubpackage(opt);
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
            wx.showModal({
                title: title,
                content: content,
                showCancel: cancelTxt != "" && cancelTxt != undefined,
                cancelText: cancelTxt,
                confirmText: okTxt,
                success: (res) => {
                    if (res.confirm) {
                        if (okHandler) {
                            okHandler.run();
                        }
                    }
                    else {
                        if (cancelTxt) {
                            if (cancelHandler) {
                                cancelHandler.run();
                            }
                        }
                    }
                }
            });
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            this.systemInfo = wx.getSystemInfoSync();
            console.log("getSystemInfoSync: " + JSON.stringify(this.systemInfo));
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            if (!force && this.menuInfo) {
                return this.menuInfo;
            }
            if (Utils.compareVersion(this.systemInfo.SDKVersion, "2.1.0") >= 0) {
                this.menuInfo = wx.getMenuButtonBoundingClientRect();
                console.log("getMenuButtonBoundingClientRect: " + JSON.stringify(this.menuInfo));
            }
            return this.menuInfo;
        }
        exit() {
            wx.exitMiniProgram({});
        }
        getLaunchOptionsSync() {
            return wx.getLaunchOptionsSync();
        }
        navigateToMiniProgram(opt) {
            wx.navigateToMiniProgram(opt);
        }
        getOpenDataContext() {
            return wx.getOpenDataContext();
        }
        createFeedbackButton(opt) {
            return wx.createFeedbackButton(opt);
        }
        openCustomerServiceConversation(obj) {
            wx.openCustomerServiceConversation(obj);
        }
        createGameClubButton(opt) {
            wx.createGameClubButton(opt);
        }
        onAudioInterruption(begincb, endcb) {
            wx.onAudioInterruptionBegin(begincb);
            wx.onAudioInterruptionEnd(endcb);
        }
        vibrateShort() {
            wx.vibrateShort({});
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        // "1、用户首次进入游戏判定场景值，1095、1037、1058进入的为白名单，以外的永久黑名单。
        // 2、白名单用户下次进入的场景值若是1037、1044、1007、1104、1008、1001、1038、1090、1103、1089、1095则继续保持白名单，反之永黑。"
        judgeBAndW(params) {
            let sceneId = params.sceneId;
            if (!sceneId) {
                return exports.BlackAndWhite.Black;
            }
            let property = Laya.LocalStorage.getItem("BAndW");
            if ("white" === property
                || "black" === property) {
                if ("white" === property) {
                    if (1037 !== sceneId
                        && 1044 !== sceneId
                        && 1007 !== sceneId
                        && 1104 !== sceneId
                        && 1008 !== sceneId
                        && 1001 !== sceneId
                        && 1038 !== sceneId
                        && 1090 !== sceneId
                        && 1103 !== sceneId
                        && 1089 !== sceneId
                        && 1095 !== sceneId) {
                        property = "black";
                        Laya.LocalStorage.setItem("BAndW", property);
                    }
                }
            }
            else {
                //第一次进入
                if (1095 === sceneId
                    || 1037 === sceneId
                    || 1058 === sceneId) {
                    property = "white";
                }
                else {
                    property = "black";
                }
                Laya.LocalStorage.setItem("BAndW", property);
            }
            return (property === exports.BlackAndWhite.White) ? exports.BlackAndWhite.White : exports.BlackAndWhite.Black;
        }
        getCode() {
            if (this.code) {
                return this.code;
            }
            return undefined;
        }
    }

    /*
    * Created on Fri Mar 01 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class AudioContextPool {
        constructor() {
            this.audioContexts = [];
            this.curAudioIndex = 0;
            this.refCount = 0;
        }
    }
    class SoundManager {
        constructor() {
            this.musicVolume = 1;
            this.init();
            // 注册监听
            EventCenter.getInstance().on(BaseEvent.E_APP_ON_PAUSE, this, this.deactive);
            EventCenter.getInstance().on(BaseEvent.E_APP_ON_RESUME, this, this.active);
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (Sdk) {
                Sdk.getInstance().onAudioInterruption(this.deactive.bind(this), this.active.bind(this));
            }
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new SoundManager();
            }
            return this.instance;
        }
        init(saveLocal = true) {
            this.soundFxEnable = true;
            this.musicEnable = true;
            this.playing = false;
            if (saveLocal) {
                let sound = Laya.LocalStorage.getItem("soundFxEnable");
                let music = Laya.LocalStorage.getItem("musicEnable");
                if (sound == 'false') {
                    this.soundFxEnable = false;
                }
                if (music == 'false') {
                    this.musicEnable = false;
                }
            }
            this.saveLocal = saveLocal;
            if (Laya.Browser.onMiniGame) {
                this.defaultPool = new AudioContextPool();
                for (var index = 0; index < 10; index++) {
                    this.defaultPool.audioContexts.push(wx.createInnerAudioContext());
                }
                this.bindContexts = {};
            }
        }
        canSaveLoacl(saveLocal) {
            this.saveLocal = saveLocal;
        }
        createAudioContxtPool(cnt) {
            if (Laya.Browser.onMiniGame) {
                if (cnt <= 0) {
                    return;
                }
                cnt = Math.min(cnt, this.defaultPool.audioContexts.length);
                let pool = new AudioContextPool();
                for (var index = 0; index < cnt; index++) {
                    pool.audioContexts.push(this.defaultPool.audioContexts.pop());
                }
                return pool;
            }
        }
        bindSoundCtx(url, pool) {
            if (Laya.Browser.onMiniGame) {
                let _pool = this.bindContexts[url];
                if (_pool) {
                    this.unbindSoundCtx(url);
                }
                pool.refCount++;
                this.bindContexts[url] = pool;
            }
        }
        unbindSoundCtx(url) {
            if (Laya.Browser.onMiniGame) {
                let pool = this.bindContexts[url];
                if (pool) {
                    pool.refCount--;
                    if (pool.refCount == 0) {
                        for (let ctx of pool.audioContexts) {
                            this.defaultPool.audioContexts.push(ctx);
                        }
                    }
                    delete this.bindContexts[url];
                }
            }
        }
        unbindAll() {
            if (Laya.Browser.onMiniGame) {
                for (let url in this.bindContexts) {
                    this.unbindSoundCtx(url);
                }
            }
        }
        playSound(url, loops = 1, delay = 0, volume = 1) {
            if (this.soundFxEnable && url) {
                if (delay > 0) {
                    Laya.timer.once(delay, this, this._playSound, [url, loops, volume]);
                }
                else {
                    this._playSound(url, loops, volume);
                }
            }
        }
        _playSound(url, loops, volume) {
            if (Laya.Browser.onMiniGame) {
                let pool = this.bindContexts[url];
                if (!pool) {
                    pool = this.defaultPool;
                }
                let curAudioIndex = pool.curAudioIndex;
                pool.curAudioIndex++;
                let audioContexts = pool.audioContexts;
                curAudioIndex = curAudioIndex % audioContexts.length;
                let audio = audioContexts[curAudioIndex];
                Laya.MiniFileMgr.readFile(url, undefined, Laya.Handler.create(this, function () {
                    audio.src = url;
                    if (volume < 1) {
                        audio.volume = volume;
                    }
                    audio.play();
                    // console.log(`playSound ${url} index:${curAudioIndex} refCount:${pool.refCount}`);
                }));
            }
            else {
                if (volume < 1) {
                    Laya.SoundManager.setSoundVolume(volume, url);
                }
                Laya.SoundManager.playSound(url, loops, Laya.Handler.create(this, this.onSoundFxComplete, [url]));
            }
        }
        stopSoundFx(url) {
            Laya.timer.clearAll(this);
            if (url) {
                Laya.SoundManager.stopSound(url);
            }
            else {
                Laya.SoundManager.stopAllSound();
            }
            if (Laya.Browser.onMiniGame) {
                if (url) {
                    this.unbindSoundCtx(url);
                    for (let ctx of this.defaultPool.audioContexts) {
                        if (ctx.src == url) {
                            ctx.stop();
                            break;
                        }
                    }
                }
                else {
                    this.unbindAll();
                    for (let ctx of this.defaultPool.audioContexts) {
                        ctx.stop();
                    }
                    this.defaultPool.curAudioIndex = 0;
                }
            }
        }
        toggleSoundFx() {
            this.soundFxEnable = !this.soundFxEnable;
            if (!this.soundFxEnable) {
                this.stopSoundFx();
            }
            if (this.saveLocal) {
                Laya.LocalStorage.setItem("soundFxEnable", String(this.soundFxEnable));
            }
            return this.soundFxEnable;
        }
        getToggleSoundFxStatus() {
            return this.soundFxEnable;
        }
        /**
         *
         * @param url
         * @param loopCnt 循环次数，默认无限循环
         * @param volume
         */
        playMusic(url, loopCnt = 0, volume) {
            if (this.musicEnable && url) {
                this.musicLoop = loopCnt;
                this.resumeMusic();
                if (volume) {
                    this.setMusicVolume(volume);
                    this.musicVolume = volume;
                }
                if (this.musicUrl != url) {
                    if (this.playing) {
                        this.stopMusic();
                    }
                    Laya.loader.clearRes(this.musicUrl);
                    Laya.loader.load(url, Laya.Handler.create(this, this.onMusicLoaded));
                }
                this.musicUrl = url;
                this.playing = true;
            }
        }
        onMusicLoaded() {
            if (this.playing) {
                console.log('SoundManager playMusic...');
                Laya.SoundManager.playMusic(this.musicUrl, this.musicLoop, Laya.Handler.create(this, this.onMusicComplete));
            }
        }
        stopMusic() {
            console.log('SoundManager stopMusic...');
            Laya.SoundManager.stopMusic();
            this.playing = false;
        }
        pauseMusic() {
            console.log('SoundManager pauseMusic...');
            if (!this.pause) {
                Laya.SoundManager.musicMuted = true;
                this.pause = true;
            }
        }
        resumeMusic() {
            console.log('SoundManager resumeMusic...');
            if (this.pause) {
                Laya.SoundManager.musicMuted = false;
                this.pause = false;
            }
        }
        toggleMusic() {
            this.musicEnable = !this.musicEnable;
            if (!this.musicEnable) {
                this.stopMusic();
            }
            else {
                this.playMusic(this.musicUrl, this.musicLoop);
            }
            if (this.saveLocal) {
                Laya.LocalStorage.setItem("musicEnable", String(this.musicEnable));
            }
            return this.musicEnable;
        }
        getToggleMusicStatus() {
            return this.musicEnable;
        }
        toggleAll() {
            this.toggleMusic();
            this.toggleSoundFx();
            return this.musicEnable && this.soundFxEnable;
        }
        isPlayingMusic() {
            return this.playing;
        }
        //设置背景音乐音量大小
        setMusicVolume(volume = 1) {
            if (volume < 0 || volume > 1)
                return;
            console.log('SoundManager setMusicVolume:', volume);
            this.musicVolume = volume;
            Laya.SoundManager.setMusicVolume(volume);
        }
        setSoundFxVolume(volume = 1, url) {
            if (volume < 0 || volume > 1)
                return;
            Laya.SoundManager.setSoundVolume(volume, url);
        }
        onSoundFxComplete(url) {
            EventCenter.getInstance().event(BaseEvent.E_SOUND_PLAY_OK, { code: exports.BaseCode.SOUND_FX_PLAY_OK });
        }
        onMusicComplete() {
            EventCenter.getInstance().event(BaseEvent.E_SOUND_PLAY_OK, { code: exports.BaseCode.SOUND_MUSIC_PLAY_OK });
        }
        active() {
            console.log('SoundManager active...');
            if (this.musicEnable && !this.pause) {
                Laya.SoundManager.musicMuted = false;
            }
        }
        deactive() {
            console.log('SoundManager deactive...');
            if (this.musicEnable && !this.pause) {
                Laya.SoundManager.musicMuted = true;
            }
        }
    }

    class OppoRewardStrategy {
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
        }
        getStrategy() {
            return exports.GetRewardSDKWay.VIDEO;
        }
        runStrategy() {
            this.playVideo(this.curParams);
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (exports.VideoState.UNENABLED === Sdk.getInstance().isHasVideo(this.curParams.id)) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦,明天再看吧!");
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Utils.showTips("看完视频才会有奖励哟！！！");
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                });
                Laya.MouseManager.enabled = false;
                Sdk.getInstance().playVideo(params.id);
            }
        }
    }
    ;

    class adList {
    }
    class OppoAdv {
        constructor() {
            //初始化banner
            this.banners = [];
            this.videos = [];
            this.interstitial = [];
            this.nativeAd = new Array();
            this.curNativeAdIndex = 0;
            this.nativeAdParentInfo = { parent: null, pos: null };
            this.imgPath = undefined;
            qg.initAdService({
                appId: "30220380",
                isDebug: false,
                success: function (res) {
                    console.log("success");
                },
                fail: function (res) {
                    console.log("fail:" + res.code + res.msg);
                },
                complete: function (res) {
                    console.log("complete");
                }
            });
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        loadVideo(videoId, isPlay = false) {
            let video = this.getVideoById(videoId);
            if (!video) {
                video = { id: videoId, inst: null, state: exports.VideoState.UNLOAD };
                this.videos.push(video);
            }
            if (!video.inst) {
                video.inst = qg.createRewardedVideoAd({ posId: "139155" });
                video.inst.load();
                video.inst.onLoad(() => {
                    console.log('激励视频广告加载成功');
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    video.state = exports.VideoState.ENABLED;
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_SUCCESS });
                });
                video.inst.onError((err) => {
                    console.log('激励视频广告加载失败', JSON.stringify(err));
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    video.state = exports.VideoState.UNENABLED;
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                });
                video.inst.onClose((res) => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if ((res && res.isEnded) || (res === undefined)) {
                        // 正常播放结束，可以下发游戏奖励
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                    }
                    Laya.timer.once(1000, this, function () {
                        video.inst.load();
                    });
                });
            }
            else {
                video.inst.load();
            }
        }
        showVideo(videoId) {
            let video = this.getVideoById(videoId);
            if (!video || !video.inst)
                return;
            video.inst.show();
        }
        preloadVideo(videoId) {
            let videoState = this.getVideoState(videoId);
            if (exports.VideoState.UNLOAD === videoState)
                this.loadVideo(videoId);
        }
        getVideoState(videoId) {
            let video = this.getVideoById(videoId);
            if (!video)
                return exports.VideoState.UNLOAD;
            return video.state;
        }
        playVideo(videoId) {
            let videoState = this.getVideoState(videoId);
            if (exports.VideoState.UNLOAD === videoState) {
                Laya.MouseManager.enabled = false;
                this.loadVideo(videoId, true);
            }
            else {
                if (exports.VideoState.ENABLED === videoState) {
                    Laya.MouseManager.enabled = false;
                    this.showVideo(videoId);
                }
                else if (exports.VideoState.UNENABLED === videoState) {
                    Utils.showTips("暂无视频!!!");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                }
            }
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                (!customParams) && (customParams = { forever: false, widthScaleRate: 1 });
                (!customParams.widthScaleRate) && (customParams.widthScaleRate = 1);
                customParams.forever = Boolean(customParams.forever);
                banner = { id: bannerId, state: exports.AdState.LOADING, inst: null, showCnt: 0, createStamp: Utils.getTime(), customParams: customParams };
                this.banners.push(banner);
            }
            else {
                if (!customParams) {
                    customParams = banner.customParams;
                }
            }
            if (!banner.inst) {
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                let phone = Sdk.getInstance().getSystemInfo();
                let bannerWidth = phone.screenWidth * customParams.widthScaleRate;
                banner.inst = qg.createBannerAd({
                    posId: "139154"
                });
                banner.inst.onResize((res) => {
                    banner.inst.style.left = (phone.screenWidth - banner.inst.style.realWidth) / 2;
                    banner.inst.style.top = phone.screenHeight - banner.inst.style.realHeight;
                });
                banner.inst.show();
                banner.inst.onShow(() => {
                    console.log('bannerid${bannerIds[i]} 广告加载成功');
                    banner.state = exports.AdState.LOAD;
                });
                banner.inst.onError((err) => {
                    console.log('bannerid${bannerIds[i]} 广告加载失败', JSON.stringify(err));
                    banner.state = exports.AdState.LOAD_FAIL;
                });
            }
            else {
                if (exports.AdState.DELETING === banner.state
                    || exports.AdState.LOAD_FAIL === banner.state) {
                    banner.inst.destroy();
                    banner.inst = null;
                    banner.showCnt = 0;
                    banner.state = exports.AdState.LOADING;
                    this.preloadBanner(bannerId);
                }
            }
        }
        showBanner(bannerId, customParams) {
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                this.preloadBanner(bannerId, customParams);
            }
            else {
                if (banner.customParams.forever)
                    return;
                if (exports.AdState.LOAD === banner.state) {
                    banner.showCnt++;
                    banner.inst.show();
                }
                else {
                    if (exports.AdState.LOAD_FAIL === banner.state)
                        this.preloadBanner(bannerId);
                }
            }
        }
        hideBanner(bannerId) {
            let banner = this.getBannerById(bannerId);
            banner && (banner.inst.hide());
            //删除banner
            // if (banner.showCnt>0) {
            // 	banner.state = AdState.DELETING;
            // 	this.preloadBanner(bannerId);
            // 	// Laya.timer.once(100, this, function() {
            // 	// });
            // }
        }
        getBannerById(bannerId) {
            return this.banners.filter((v, idx, arr) => { return (v.id === bannerId); }, this)[0];
        }
        showInterstitial(id) {
            let interstitial = this.getInterstitial(id);
            if (!interstitial) {
                let inst = qg.createInsertAd({
                    posId: "139153"
                });
                this.interstitial.push({ id: id, inst: inst });
                inst.onLoad(() => {
                    console.log('interstitial 广告加载成功');
                });
                inst.onError((err) => {
                    console.log('interstitial 广告加载失败');
                });
            }
            else {
                interstitial.inst.show();
            }
        }
        getInterstitial(id) {
            let interstitials = this.interstitial.filter((v, idx, arr) => { return v.id === id; }, this);
            return interstitials[0];
        }
        preloadInterstitial(id) {
        }
        init(customParams) {
        }
        //原生广告
        createNativeAd(adList, parent, pos) {
            console.log("adList:", adList);
            let nativeAdImg = new Laya.Image();
            nativeAdImg.skin = adList.imgUrlList[0];
            nativeAdImg.anchorX = nativeAdImg.anchorY = 0.5;
            nativeAdImg.size(640, 320);
            nativeAdImg.pos(pos.x, pos.y);
            parent.addChild(nativeAdImg);
            let nativeAdBtn = new Laya.Image();
            nativeAdBtn.source = Laya.loader.getRes(this.imgPath.bgPath);
            nativeAdBtn.anchorX = nativeAdBtn.anchorY = 0.5;
            nativeAdBtn.size(200, 80);
            nativeAdBtn.centerX = 0;
            nativeAdBtn.bottom = -100;
            nativeAdImg.addChild(nativeAdBtn);
            let nativeAdBtnLabel = new Laya.Label();
            nativeAdBtnLabel.text = "点击查看";
            nativeAdBtnLabel.fontSize = 40;
            nativeAdBtnLabel.color = "#ffffff";
            nativeAdBtnLabel.anchorX = nativeAdBtnLabel.anchorY = 0.5;
            nativeAdBtnLabel.centerX = 0;
            nativeAdBtnLabel.centerY = -5;
            nativeAdBtn.addChild(nativeAdBtnLabel);
            let nativeAdTitle = new Laya.Label();
            nativeAdTitle.text = adList.title;
            nativeAdTitle.name = "nativeAdTitle";
            nativeAdTitle.fontSize = 40;
            nativeAdTitle.bold = true;
            nativeAdTitle.color = "#ffffff";
            nativeAdTitle.centerX = 0;
            nativeAdTitle.top = 20;
            nativeAdImg.addChild(nativeAdTitle);
            let nativeAdLabel = new Laya.Label();
            nativeAdLabel.text = adList.desc;
            nativeAdLabel.name = "nativeAdLabel";
            nativeAdLabel.fontSize = 40;
            nativeAdLabel.bold = true;
            nativeAdLabel.color = "#ffffff";
            nativeAdLabel.centerX = 0;
            nativeAdLabel.top = 60;
            nativeAdImg.addChild(nativeAdLabel);
            //上报广告曝光。
            if (this.nativeAd[this.curNativeAdIndex].inst) {
                this.nativeAd[this.curNativeAdIndex].inst.reportAdShow({
                    adId: this.nativeAd[this.curNativeAdIndex].adList.adId
                });
            }
            nativeAdImg.once(Laya.Event.CLICK, this, function (nativeAdImg) {
                //上报点击
                nativeAdImg.removeSelf();
                nativeAdImg.destroy();
                if (this.nativeAd[this.curNativeAdIndex].inst) {
                    this.nativeAd[this.curNativeAdIndex].inst.reportAdClick({
                        adId: this.nativeAd[this.curNativeAdIndex].adList.adId
                    });
                }
            }, [nativeAdImg]);
            nativeAdBtn.once(Laya.Event.CLICK, this, function (nativeAdImg) {
                //上报点击
                nativeAdImg.removeSelf();
                nativeAdImg.destroy();
                if (this.nativeAd[this.curNativeAdIndex].inst) {
                    this.nativeAd[this.curNativeAdIndex].inst.reportAdClick({
                        adId: this.nativeAd[this.curNativeAdIndex].adList.adId
                    });
                }
            }, [nativeAdImg]);
        }
        preloadNativeAd(nativeAds, imgPath) {
            if (this.nativeAd.length == 0) {
                for (let index = 0; index < nativeAds.length; index++) {
                    this.nativeAd.push({ id: nativeAds[index], isLoad: false, inst: null, adList: null });
                }
            }
            this.imgPath = imgPath;
            this.loadNativeAd();
        }
        loadNativeAd() {
            var nativeAd = qg.createNativeAd({
                posId: this.nativeAd[this.curNativeAdIndex].id
            });
            this.nativeAd[this.curNativeAdIndex].inst = nativeAd;
            let func_1 = function (adList) {
                this.nativeAd[this.curNativeAdIndex].adList = adList;
                this.nativeAd[this.curNativeAdIndex].isLoad = true;
                if (this.nativeAdParentInfo.parent) {
                    this.createNativeAd(this.nativeAd[this.curNativeAdIndex].adList, this.nativeAdParentInfo.parent, this.nativeAdParentInfo.pos);
                }
            };
            var onLoadFunc = func_1.bind(this);
            nativeAd.onLoad(function (res) {
                console.log("原生广告加载成功：", JSON.stringify(res.adList));
                onLoadFunc(res.adList[0]);
            });
            var loadNativeAd = this.loadNativeAd.bind(this);
            let func_2 = function () {
                this.nativeAd[this.curNativeAdIndex].inst.offLoad();
                this.nativeAd[this.curNativeAdIndex].inst.offError();
                this.nativeAd[this.curNativeAdIndex].inst.destroy();
                this.nativeAd[this.curNativeAdIndex].inst = null;
                this.curNativeAdIndex += 1;
                if (this.curNativeAdIndex > 1) {
                    this.curNativeAdIndex = 0;
                }
                else {
                    loadNativeAd();
                }
            };
            var onErrorFunc = func_2.bind(this);
            nativeAd.onError(function (res) {
                console.log("原生广告加载失败：", JSON.stringify(res));
                onErrorFunc();
            });
            nativeAd.load();
        }
        showNativeAd(parent, pos) {
            this.nativeAdParentInfo.parent = parent;
            this.nativeAdParentInfo.pos = pos;
            if (this.nativeAd[this.curNativeAdIndex].isLoad) {
                this.createNativeAd(this.nativeAd[this.curNativeAdIndex].adList, parent, pos);
            }
            else {
                this.loadNativeAd();
            }
        }
        destoryNativeAd() {
            if (this.nativeAd[this.curNativeAdIndex].inst) {
                this.nativeAd[this.curNativeAdIndex].inst.offLoad();
                this.nativeAd[this.curNativeAdIndex].inst.offError();
                this.nativeAd[this.curNativeAdIndex].inst.destroy();
                this.nativeAd[this.curNativeAdIndex].inst = null;
                this.nativeAd[this.curNativeAdIndex].isLoad = false;
                this.curNativeAdIndex += 1;
                if (this.curNativeAdIndex > 1) {
                    this.curNativeAdIndex = 0;
                }
            }
            this.nativeAdParentInfo.parent = this.nativeAdParentInfo.pos = null;
            this.loadNativeAd();
        }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }
    OppoAdv.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    // oppo数据解析
    function pf_oppoInfo_to_playerInfo(oppoInfo, userInfo) {
        if (oppoInfo.openid != undefined)
            userInfo.openId = oppoInfo.openid;
        if (oppoInfo.uid != undefined)
            userInfo.userId = oppoInfo.uid;
        if (oppoInfo.nickname != undefined)
            userInfo.name = oppoInfo.nickname;
        if (oppoInfo.avatar != undefined)
            userInfo.headUrl = oppoInfo.avatar;
        return userInfo;
    }
    class OppoLogin extends BaseEventDispatcher {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
            super();
        }
        initMiniAdapter() {
            qg.setLoadingProgress({
                progress: 0
            });
            let innerAudioContext = qg.createInnerAudioContext();
            SoundManager.prototype.toggleMusic = function () {
                this.musicEnable = !this.musicEnable;
                if (!this.musicEnable) {
                    innerAudioContext.pause();
                }
                else {
                    innerAudioContext.play();
                }
                return this.musicEnable;
            };
            SoundManager.prototype.toggleSoundFx = function () {
                this.soundFxEnable = !this.soundFxEnable;
                return this.soundFxEnable;
            };
            SoundManager.prototype.playMusic = function (url, loops = 0, volume) {
                if (!this.musicEnable) {
                    return;
                }
                innerAudioContext.loop = true;
                innerAudioContext.src = url;
                innerAudioContext.volume = volume || 1;
                innerAudioContext.play();
            };
            SoundManager.prototype.stopMusic = function () {
                innerAudioContext.stop();
            };
            SoundManager.prototype.playSound = function (url, loops = 1, delay = 0, volume = 1) {
                if (!this.soundFxEnable) {
                    return;
                }
                let soundAudioContext = qg.createInnerAudioContext();
                soundAudioContext.loop = false;
                soundAudioContext.src = url;
                soundAudioContext.volume = volume || 1;
                try {
                    soundAudioContext.play();
                }
                catch (error) {
                    console.log(error);
                }
            };
        }
        engineInitialized() {
            let prototype = Laya.LocalStorage.prototype.constructor;
            prototype.getJSON = function (key) {
                let value = this._baseClass.getJSON(key);
                if (typeof value == 'string') {
                    value = JSON.parse(value);
                }
                return value;
            };
            prototype.setJSON = function (key, value) {
                if (typeof value == 'object') {
                    value = JSON.stringify(value);
                }
                this._baseClass.setJSON(key, value);
            };
        }
        ;
        // OPPO
        login() {
            //监听网络状态
            this.networkstate = "none";
            qg.getNetworkType({ success: (res) => {
                    console.log('>>>>>>>>>>>>>>>>> getNetworkType: ', res.networkType);
                    this.networkstate = res.networkType;
                } });
            qg.onNetworkStatusChange((res) => {
                console.log('>>>>>>>>>>>>>>>>> onNetworkStatusChange: ', res.isConnected, res.networkType);
                this.networkstate = res.networkType;
            });
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            Sdk.getInstance().getServerJsonCfg();
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "OPPO登录成功！" });
        }
        request(url, data, handler, method) {
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (pkg) {
                if (handler)
                    handler.runWith(pkg);
            });
            xhr.send(url, null, method, 'json', ["Content-Type", "application/x-www-form-urlencoded"]);
        }
        getShareInstance() {
            return null;
        }
        getAdvInstance() {
            return new OppoAdv();
        }
        getStatInstance() {
            return null;
        }
        getRewardStrInstance() {
            return new OppoRewardStrategy();
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return undefined;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 微信授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            // if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
            // 	this.query = res.query;
            // 	SdkMsg.getInstance().postShareQuery(res.query);
            // }
        }
        createUserInfoButton() {
        }
        destroyUserInfoButton() {
        }
        setKeepScreenOn(opt) {
            // 设置屏幕常亮
            qg.setKeepScreenOn(opt);
        }
        onShow(cb) {
            qg.onShow(cb);
        }
        onHide(cb) {
            qg.onHide(cb);
        }
        checkUpdate() {
        }
        loadSubpackage(opt) {
            if (!qg.loadSubpackage) {
                this.exit();
                return;
            }
            return qg.loadSubpackage(opt);
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            this.systemInfo = qg.getSystemInfoSync();
            console.log("getSystemInfoSync: " + JSON.stringify(this.systemInfo));
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            if (!force && this.menuInfo) {
                return this.menuInfo;
            }
            return this.menuInfo;
        }
        exit() {
            qg.exitApplication({});
        }
        getLaunchOptionsSync() {
            return qg.getLaunchOptionsSync();
        }
        navigateToMiniProgram(opt) {
            let data = { pkgName: opt.appId };
            qg.navigateToMiniGame(data);
        }
        getOpenDataContext() {
        }
        createFeedbackButton(opt) {
        }
        openCustomerServiceConversation(obj) {
        }
        createGameClubButton(opt) {
        }
        onAudioInterruption(begincb, endcb) {
            qg.onAudioInterruptionBegin(begincb);
            qg.onAudioInterruptionEnd(endcb);
        }
        vibrateShort() {
            qg.vibrateShort({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        judgeBAndW(params) { return exports.BlackAndWhite.White; }
        getCode() { return undefined; }
        ;
    }

    class BDAdv {
        constructor() {
            //初始化banner
            this.banners = [];
            this.videos = [];
            this.curIsAutoPlayVideo = false;
            this.interstitial = [];
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        loadVideo(videoId, isPlay = false) {
            this.curIsAutoPlayVideo = isPlay;
            let isRegOnClose = (this.videos.length === 0); //是否注册监听函数
            let video = this.getVideoById(videoId);
            if (!video) {
                video = { id: videoId, inst: null, state: exports.AdState.LOADING };
                this.videos.push(video);
            }
            if (!video.inst) {
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                let GameCfg = Sdk.GameCfg;
                video.inst = swan.createRewardedVideoAd({ adUnitId: videoId, appSid: GameCfg.appSid });
                if (isRegOnClose) {
                    video.inst.onLoad(() => {
                        console.log('激励视频广告加载成功');
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        video.state = exports.AdState.LOAD;
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_SUCCESS });
                        if (this.curIsAutoPlayVideo)
                            this.showVideo(video.id);
                    });
                    video.inst.onError((err) => {
                        console.log('激励视频广告加载失败');
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        video.state = exports.AdState.LOAD_FAIL;
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                    });
                    video.inst.onClose((res) => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if ((res && res.isEnded) || (res === undefined)) {
                            // 正常播放结束，可以下发游戏奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                        }
                        this.curIsAutoPlayVideo = false;
                        if (this.banners.length === 1) {
                            this.banners[0].inst.show();
                        }
                    });
                }
                else {
                    if (exports.AdState.LOAD_FAIL === video.state) {
                        video.inst.load()
                            .catch((err) => {
                            video.state = exports.AdState.LOAD_FAIL;
                            console.log('激励视频广告显示失败');
                        });
                    }
                }
            }
        }
        showVideo(videoId) {
            let video = this.getVideoById(videoId);
            if (!video || !video.inst)
                return;
            for (let i = 0; i < this.banners.length; ++i) {
                this.banners[i].inst.hide();
            }
            video.inst.show()
                .then(() => {
                '激励视频广告显示';
            })
                .catch(() => {
                video.inst.load()
                    .then(() => video.inst.show())
                    .catch((err) => {
                    video.state = exports.AdState.LOAD_FAIL;
                    console.log('激励视频广告显示失败');
                });
            });
        }
        preloadVideo(videoId) {
            this.loadVideo(videoId);
        }
        getVideoState(videoId) {
            let video = this.getVideoById(videoId);
            if (!video)
                return exports.VideoState.UNLOAD;
            if (exports.AdState.LOAD === video.state)
                return exports.VideoState.ENABLED;
            else
                return exports.VideoState.UNENABLED;
        }
        playVideo(videoId) {
            console.log("video Id", videoId);
            let video = this.getVideoById(videoId);
            if (!video) {
                Laya.MouseManager.enabled = false;
                this.loadVideo(videoId, true);
            }
            else {
                if (exports.AdState.LOAD === video.state) {
                    Laya.MouseManager.enabled = false;
                    this.showVideo(videoId);
                }
                else if (exports.AdState.LOAD_FAIL === video.state) {
                    Utils.showTips("暂无视频!!!");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                }
            }
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                (!customParams) && (customParams = { forever: false, widthScaleRate: 1 });
                (!customParams.widthScaleRate) && (customParams.widthScaleRate = 1);
                customParams.forever = Boolean(customParams.forever);
                banner = { id: bannerId, state: exports.AdState.LOADING, inst: null, showCnt: 0, createStamp: Utils.getTime(), customParams: customParams };
                this.banners.push(banner);
            }
            else {
                if (!customParams) {
                    customParams = banner.customParams;
                }
            }
            if (!banner.inst) {
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                let GameCfg = Sdk.GameCfg;
                let phone = Sdk.getInstance().getSystemInfo();
                let bannerWidth = phone.screenWidth * customParams.widthScaleRate;
                banner.inst = swan.createBannerAd({
                    adUnitId: bannerId,
                    appSid: GameCfg.appSid,
                    style: {
                        left: 0,
                        top: 0,
                        width: bannerWidth,
                    },
                });
                var w = phone.screenWidth / 2;
                var h = phone.screenHeight;
                banner.inst.onResize((res) => {
                    banner.inst.style.left = w - res.width / 2 + 0.1;
                    banner.inst.style.top = h - res.height + 0.1;
                    if (-1 !== phone.system.indexOf("iOS")) {
                        if (Utils.isQMP()) {
                            banner.inst.style.top += 6;
                        }
                    }
                });
                banner.inst.onLoad(() => {
                    banner.inst.style.left = w - banner.inst.style.width / 2 + 0.1;
                    banner.inst.style.top = h - banner.inst.style.height + 0.1;
                    if (-1 !== phone.system.indexOf("iOS")) {
                        if (Utils.isQMP()) {
                            banner.inst.style.top += 6;
                        }
                    }
                    console.log('bannerid${bannerIds[i]} 广告加载成功');
                    banner.state = exports.AdState.LOAD;
                    if (banner.customParams.forever)
                        banner.inst.show();
                });
                banner.inst.onError((err) => {
                    console.log('bannerid${bannerIds[i]} 广告加载失败', JSON.stringify(err));
                    banner.state = exports.AdState.LOAD_FAIL;
                });
            }
            else {
                if (exports.AdState.DELETING === banner.state
                    || exports.AdState.LOAD_FAIL === banner.state) {
                    banner.inst.destroy();
                    banner.inst = null;
                    banner.showCnt = 0;
                    banner.state = exports.AdState.LOADING;
                    this.preloadBanner(bannerId);
                }
            }
        }
        showBanner(bannerId, customParams) {
            console.log("banner Id", bannerId);
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                this.preloadBanner(bannerId, customParams);
            }
            else {
                if (banner.customParams.forever)
                    return;
                if (exports.AdState.LOAD === banner.state) {
                    banner.showCnt++;
                    banner.inst.show();
                }
                else {
                    if (exports.AdState.LOAD_FAIL === banner.state)
                        this.preloadBanner(bannerId);
                    else if (exports.AdState.LOADING === banner.state) {
                        if (customParams && customParams.isPostLoadedShow) {
                            Laya.timer.once(1000, this, function () {
                                this.showBanner(bannerId, customParams);
                            });
                        }
                    }
                }
            }
        }
        hideBanner(bannerId) {
            let banner = this.getBannerById(bannerId);
            if (!banner)
                return;
            if (banner.customParams.forever)
                return;
            if (banner.inst)
                banner.inst.hide();
            //删除banner
            if (banner.showCnt > 0) {
                banner.state = exports.AdState.DELETING;
                this.preloadBanner(bannerId);
            }
        }
        getBannerById(bannerId) {
            return this.banners.filter((v, idx, arr) => { return (v.id === bannerId); }, this)[0];
        }
        showInterstitial(id) {
            return;
            // let curVersion = getInstance().getSystemInfo().SDKVersion;
            // if (!getInstance().compatibleVersion(curVersion, "2.6.0")) {
            // 	return;
            // }
            // let interstitial = this.getInterstitial(id);
            // if (!interstitial) {
            // 	let inst = swan.createInterstitialAd({
            // 		adUnitId:id,
            // 	});
            // 	this.interstitial.push({id:id, inst:inst});
            // 	inst.onLoad(()=>{
            // 		console.log('interstitial 广告加载成功');
            // 	});
            // 	inst.onError((err)=>{
            // 		console.log('interstitial 广告加载失败');
            // 	});
            // 	inst.onClose(res => {
            // 		console.log('插屏 广告关闭')
            // 	})
            // } else {
            // 	interstitial.inst.show();
            // }
        }
        getInterstitial(id) {
            // let interstitials = this.interstitial.filter((v, idx, arr)=>{return v.id===id}, this);
            // return interstitials[0];
            return;
        }
        preloadInterstitial(id) {
        }
        init(customParams) {
        }
        preloadNativeAd(nativeAds) { }
        showNativeAd(parent, pos) { }
        destoryNativeAd() { }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }
    BDAdv.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    class BaiduRewardStrategy {
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
        }
        getStrategy() {
            return exports.GetRewardSDKWay.VIDEO;
        }
        runStrategy() {
            this.playVideo(this.curParams);
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (exports.VideoState.UNENABLED === Sdk.getInstance().isHasVideo(this.curParams.id)) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦,明天再看吧!");
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Utils.showTips("看完视频才会有奖励哟！！！");
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                });
                Laya.MouseManager.enabled = false;
                Sdk.getInstance().playVideo(params.id);
            }
        }
    }
    ;

    // 百度数据解析
    function pf_wxInfo_to_playerInfo$1(wxInfo, userInfo) {
        if (wxInfo.nickName != undefined)
            userInfo.name = wxInfo.nickName;
        if (wxInfo.avatarUrl != undefined)
            userInfo.headUrl = wxInfo.avatarUrl;
        if (wxInfo.gender != undefined)
            userInfo.sex = wxInfo.gender;
        if (wxInfo.city != undefined)
            userInfo.city = wxInfo.city;
        if (wxInfo.province != undefined)
            userInfo.province = wxInfo.province;
        if (wxInfo.country != undefined)
            userInfo.country = wxInfo.country;
        if (wxInfo.language != undefined)
            userInfo.language = wxInfo.language;
    }
    class BDLogin extends BaseEventDispatcher {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
            super();
        }
        initMiniAdapter() {
            let innerAudioContext = swan.createInnerAudioContext();
            SoundManager.prototype.toggleMusic = function () {
                this.musicEnable = !this.musicEnable;
                if (!this.musicEnable && this.playing) {
                    innerAudioContext.stop();
                }
                return this.musicEnable;
            };
            SoundManager.prototype.toggleSoundFx = function () {
                this.soundFxEnable = !this.soundFxEnable;
                return this.soundFxEnable;
            };
            SoundManager.prototype.playMusic = function (url, loops = 0, volume) {
                if (!this.musicEnable) {
                    return;
                }
                this.playing = true;
                innerAudioContext.loop = true;
                innerAudioContext.src = url;
                innerAudioContext.volume = volume || 1;
                innerAudioContext.play();
            };
            SoundManager.prototype.stopMusic = function () {
                if (this.playing) {
                    innerAudioContext.stop();
                    this.playing = false;
                }
            };
            SoundManager.prototype.playSound = function (url, loops = 1, delay = 0, volume = 1) {
                if (!this.soundFxEnable) {
                    return;
                }
                let soundAudioContext = swan.createInnerAudioContext();
                soundAudioContext.loop = false;
                soundAudioContext.src = url;
                soundAudioContext.volume = volume || 1;
                try {
                    soundAudioContext.play();
                }
                catch (error) {
                    console.log(error);
                }
            };
        }
        ;
        engineInitialized() { }
        ;
        // 登录百度
        login() {
            swan.login({
                success: this.wxloginSucc.bind(this),
                fail: this.wxloginFail.bind(this)
            });
            swan.getSetting({
                success: this.onSettings.bind(this)
            });
            //监听网络状态
            this.networkstate = "none";
            swan.getNetworkType({ success: (res) => {
                    console.log('>>>>>>>>>>>>>>>>> getNetworkType: ', res.networkType);
                    this.networkstate = res.networkType;
                } });
            swan.onNetworkStatusChange((res) => {
                console.log('>>>>>>>>>>>>>>>>> onNetworkStatusChange: ', res.isConnected, res.networkType);
                this.networkstate = res.networkType;
            });
        }
        request(url, data, handler, method) {
            console.log('>>>>>>>>>>>>>>>>> request: ', url, data);
            swan.request({
                url: url,
                data: data,
                method: method,
                dataType: 'json',
                success: res => {
                    console.log('<<<<<<<<<<<<<<<<< request: ', res);
                    if (handler) {
                        handler.runWith(res.data);
                    }
                },
                fail: err => {
                    console.log('<<<<<<<<<<<<<<<<< request error: ', err);
                    Utils.showTips('获取服务器JSON配置失败！');
                }
            });
        }
        getShareInstance() {
            return new WXShare();
        }
        getAdvInstance() {
            return new BDAdv();
        }
        getStatInstance() {
            return undefined;
        }
        getRewardStrInstance() {
            return new BaiduRewardStrategy();
        }
        onSettings(res) {
            let settings = res.authSetting;
            this.isUserInfoAuth = !!settings["scope.userInfo"];
            if (this.isUserInfoAuth) {
                swan.getUserInfo({
                    success: this.userInfoSucc.bind(this)
                });
            }
            if (this.code) {
                this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "百度登录成功" });
            }
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return this.query;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 百度授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
                this.query = res.query;
                SdkMsg.getInstance().postShareQuery(res.query);
            }
        }
        wxloginSucc(res) {
            console.log("百度登录成功！");
            let tryCount = 10;
            const checkNeedFix = () => {
                if (!this.menuInfo || this.menuInfo.top > 0 || tryCount <= 0) {
                    this.code = res.code;
                    // 登录服务器
                    if (this.isLoginServer()) {
                        let launchParams = swan.getLaunchOptionsSync();
                        this.query = launchParams.query;
                        SdkMsg.getInstance().login(this.code, launchParams.query);
                    }
                    if (this.isUserInfoAuth !== undefined) {
                        this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "百度登录成功" });
                    }
                    return false;
                }
                tryCount--;
                return true;
            };
            const fixInfo = () => {
                // 修正系统信息和胶囊信息
                this.getSystemInfo(true);
                this.getMenuButtonBoundingClientRect(true);
                if (!checkNeedFix()) {
                    // 获取成功
                    Utils.sNotchScreen = undefined; // 重置适配信息
                    Laya.timer.clear(this, fixInfo);
                }
            };
            if (checkNeedFix()) {
                Laya.timer.loop(100, this, fixInfo);
            }
        }
        wxloginFail() {
            console.log("百度登录失败！");
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_FAILED, msg: "百度登录失败" });
        }
        userInfoSucc(info) {
            let userInfo;
            if (info.userInfo) {
                console.log("获取用户信息成功！" + JSON.stringify(info));
                this.isUserInfoAuth = true;
                this.encryptedData = info.encryptedData;
                this.iv = info.iv;
                this.destroyUserInfoButton();
                // 解析并更新
                userInfo = new exports.SDKEntity.UserInfoEntity();
                pf_wxInfo_to_playerInfo$1(info.userInfo, userInfo);
                UserLogic.getInstance().update(userInfo);
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_SUCCESS, msg: "授权成功" });
            }
            else {
                console.log("获取用户信息失败！");
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_FAILED, msg: "用户拒绝授权" });
            }
            // 发送到服务器
            if (this.profileToServer) {
                SdkMsg.getInstance().postProfile(userInfo);
            }
        }
        createUserInfoButton() {
            let btn = this.profileBtn;
            let leftTop = btn.localToGlobal(new Laya.Point(0, 0));
            let rightBottom = btn.localToGlobal(new Laya.Point(btn.width, btn.height));
            let points = [];
            Laya.stage.transform.transformPoint(leftTop);
            Laya.stage.transform.transformPoint(rightBottom);
            let width = rightBottom.x - leftTop.x;
            let height = rightBottom.y - leftTop.y;
            let button = swan.createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                    left: leftTop.x,
                    top: leftTop.y,
                    width: width,
                    height: height,
                },
                withCredentials: true,
                lang: 'zh_CN',
            });
            button.show();
            button.onTap(this.userInfoSucc.bind(this));
            this.profileBtn = button;
            btn.once(Laya.Event.REMOVED, this, this.destroyUserInfoButton);
        }
        destroyUserInfoButton() {
            if (this.profileBtn)
                this.profileBtn.destroy();
            this.profileBtn = null;
        }
        setKeepScreenOn(opt) {
            // 设置屏幕常亮
            swan.setKeepScreenOn(opt);
        }
        onShow(cb) {
            swan.onShow(cb);
        }
        onHide(cb) {
            swan.onHide(cb);
        }
        checkUpdate() {
            if (typeof swan.getUpdateManager === 'function') { // 请在使用前先判断是否支持
                const updateManager = swan.getUpdateManager();
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    console.log(res.hasUpdate);
                });
                updateManager.onUpdateReady(() => {
                    this.showModal('有新版本啦！，赶快开启新的历程吧~', '更新提示', '开启', Laya.Handler.create(this, () => {
                        updateManager.applyUpdate();
                    }));
                });
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log('新的版本下载失败');
                });
            }
        }
        loadSubpackage(opt) {
            if (!swan.loadSubpackage) {
                this.showModal('请升级百度到最新版本！', '提示', '确定', Laya.Handler.create(this, () => {
                    this.exit();
                }), '');
                return;
            }
            return swan.loadSubpackage(opt);
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
            swan.showModal({
                title: title,
                content: content,
                showCancel: cancelTxt != "" && cancelTxt != undefined,
                cancelText: cancelTxt,
                confirmText: okTxt,
                success: (res) => {
                    if (res.confirm) {
                        if (okHandler) {
                            okHandler.run();
                        }
                    }
                    else {
                        if (cancelTxt) {
                            if (cancelHandler) {
                                cancelHandler.run();
                            }
                        }
                    }
                }
            });
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            this.systemInfo = swan.getSystemInfoSync();
            console.log("getSystemInfoSync: " + JSON.stringify(this.systemInfo));
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            if (!force && this.menuInfo) {
                return this.menuInfo;
            }
            if (Utils.compareVersion(this.systemInfo.SDKVersion, "2.1.0") >= 0) {
                this.menuInfo = swan.getMenuButtonBoundingClientRect();
                console.log("getMenuButtonBoundingClientRect: " + JSON.stringify(this.menuInfo));
            }
            return this.menuInfo;
        }
        exit() {
        }
        getLaunchOptionsSync() {
            return swan.getLaunchOptionsSync();
        }
        navigateToMiniProgram(opt) {
            swan.navigateToMiniProgram(opt);
        }
        getOpenDataContext() {
            return swan.getOpenDataContext();
        }
        createFeedbackButton(opt) {
            return undefined;
        }
        openCustomerServiceConversation(obj) {
            swan.openCustomerServiceConversation(obj);
        }
        createGameClubButton(opt) {
        }
        onAudioInterruption(begincb, endcb) {
            swan.onAudioInterruptionBegin(begincb);
            swan.onAudioInterruptionEnd(endcb);
        }
        vibrateShort() {
            swan.vibrateShort({});
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        // "1、用户首次进入游戏判定场景值，1095、1037、1058进入的为白名单，以外的永久黑名单。
        // 2、白名单用户下次进入的场景值若是1037、1044、1007、1104、1008、1001、1038、1090、1103、1089、1095则继续保持白名单，反之永黑。"
        judgeBAndW(params) {
            let sceneId = params.sceneId;
            if (!sceneId) {
                return exports.BlackAndWhite.Black;
            }
            let property = Laya.LocalStorage.getItem("BAndW");
            if ("white" === property
                || "black" === property) {
                if ("white" === property) {
                    if (1037 !== sceneId
                        && 1044 !== sceneId
                        && 1007 !== sceneId
                        && 1104 !== sceneId
                        && 1008 !== sceneId
                        && 1001 !== sceneId
                        && 1038 !== sceneId
                        && 1090 !== sceneId
                        && 1103 !== sceneId
                        && 1089 !== sceneId
                        && 1095 !== sceneId) {
                        property = "black";
                        Laya.LocalStorage.setItem("BAndW", property);
                    }
                }
            }
            else {
                //第一次进入
                if (1095 === sceneId
                    || 1037 === sceneId
                    || 1058 === sceneId) {
                    property = "white";
                }
                else {
                    property = "black";
                }
                Laya.LocalStorage.setItem("BAndW", property);
            }
            return (property === exports.BlackAndWhite.White) ? exports.BlackAndWhite.White : exports.BlackAndWhite.Black;
        }
        getCode() { return undefined; }
        ;
    }

    class VivoRewardStrategy {
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
        }
        getStrategy() {
            return exports.GetRewardSDKWay.VIDEO;
        }
        runStrategy() {
            this.playVideo(this.curParams);
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (exports.VideoState.UNENABLED === Sdk.getInstance().isHasVideo(this.curParams.id)) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦,明天再看吧!");
                EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Utils.showTips("看完视频才会有奖励哟！！！");
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                    else if (exports.SdkCode.AD_VIDEO_LOAD_FAIL === event.code) {
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                });
                Laya.MouseManager.enabled = false;
                Sdk.getInstance().playVideo(params.id);
            }
        }
    }
    ;

    class adList$1 {
    }
    class VivoAd {
        constructor() {
            this.timeout = true;
            //初始化banner
            this.banners = undefined;
            this.videos = [];
            this.curIsAutoPlayVideo = false;
            this.interstitial = undefined;
            this.nativeAd = new Array();
            this.curNativeAdIndex = 0;
            this.nativeAdParentInfo = { parent: null, pos: null };
            this.imgPath = { closePath: "", bgPath: "" };
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        loadVideo(videoId, isPlay = false) {
            this.curIsAutoPlayVideo = isPlay;
            let isRegOnClose = (this.videos.length === 0); //是否注册监听函数
            let video = this.getVideoById(videoId);
            if (!video) {
                video = { id: videoId, inst: null, state: exports.AdState.LOADING };
                this.videos.push(video);
            }
            if (!video.inst && qg.createRewardedVideoAd) {
                video.inst = qg.createRewardedVideoAd({ posId: videoId });
                video.inst.onLoad(() => {
                    console.log('激励视频广告加载成功');
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    video.state = exports.AdState.LOAD;
                    // EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, {code:SdkCode.AD_VIDEO_LOAD_SUCCESS});
                    if (this.curIsAutoPlayVideo)
                        this.showVideo(video.id);
                });
                video.inst.onError((err) => {
                    console.log('激励视频广告加载失败', JSON.stringify(err));
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    video.state = exports.AdState.LOAD;
                    Utils.showTips("视频广告观看太频繁，请稍后再试~");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                });
                video.inst.onClose((res) => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if ((res && res.isEnded) || (res === undefined)) {
                        // 正常播放结束，可以下发游戏奖励
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                    }
                    this.curIsAutoPlayVideo = false;
                });
            }
            else {
                video.inst.load()
                    .catch((err) => {
                    video.state = exports.AdState.LOAD;
                    console.log('激励视频广告显示失败', JSON.stringify(err));
                    Utils.showTips("视频广告观看太频繁，请稍后再试~");
                });
            }
        }
        showVideo(videoId) {
            let video = this.getVideoById(videoId);
            if (!video || !video.inst)
                return;
            video.inst.show()
                .then(() => {
                '激励视频广告显示';
            })
                .catch(() => {
                video.inst.load()
                    .then(() => video.inst.show())
                    .catch((err) => {
                    video.state = exports.AdState.LOAD;
                    Utils.showTips("视频广告观看太频繁，请稍后再试~");
                    console.log('激励视频广告显示失败', JSON.stringify(err));
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                });
            });
        }
        preloadVideo(videoId) {
            this.loadVideo(videoId);
        }
        getVideoState(videoId) {
            let video = this.getVideoById(videoId);
            if (!video)
                return exports.VideoState.UNLOAD;
            if (exports.AdState.LOAD === video.state)
                return exports.VideoState.ENABLED;
            else
                return exports.VideoState.UNENABLED;
        }
        playVideo(videoId) {
            console.log("video Id", videoId);
            let video = this.getVideoById(videoId);
            if (!video) {
                Laya.MouseManager.enabled = false;
                this.loadVideo(videoId, true);
            }
            else {
                if (exports.AdState.LOAD === video.state) {
                    Laya.MouseManager.enabled = false;
                    this.showVideo(videoId);
                }
                else if (exports.AdState.LOAD_FAIL === video.state) {
                    Utils.showTips("暂无视频!!!");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                }
            }
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
        }
        getBannerById(bannerId) {
        }
        showBanner(bannerId) {
            if (this.bannerAd) {
                this.bannerAd.destroy();
            }
            this.bannerAd = qg.createBannerAd({
                posId: bannerId,
                style: {}
            });
            let adshow = this.bannerAd.show();
            // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adshow && adshow.then(() => {
                console.log("banner广告展示成功");
            }).catch((err) => {
                switch (err.code) {
                    case 30003:
                        console.log("新用户7天内不能曝光Banner，请将手机时间调整为7天后，退出游戏重新进入");
                        break;
                    case 30009:
                        console.log("10秒内调用广告次数超过1次，10秒后再调用");
                        if (this.timeout == false)
                            break;
                        this.timeout = false;
                        setTimeout(() => {
                            this.showBanner(bannerId);
                            this.timeout = true;
                        }, 10000);
                        break;
                    case 30002:
                        console.log("加载广告失败，重新加载广告");
                        setTimeout(() => {
                            this.retryShowbanner(bannerId);
                        }, 10000);
                        break;
                    default:
                        // 参考 https://minigame.vivo.com.cn/documents/#/lesson/open-ability/ad?id=广告错误码信息 对错误码做分类处理
                        console.log("banner广告展示失败");
                        console.log(JSON.stringify(err));
                        break;
                }
            });
        }
        retryShowbanner(bannerId) {
            this.bannerAd = qg.createBannerAd({
                posId: bannerId,
                style: {}
            });
            let adShowRetry = this.bannerAd.show();
            adShowRetry && adShowRetry.catch((error) => {
                console.log("banner广告展示失败-重试");
                console.log(JSON.stringify(error));
            });
        }
        hideBanner() {
            if (!this.bannerAd) {
                return;
            }
            var adhide = this.bannerAd.hide();
            // 调用then和catch之前需要对hide的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adhide && adhide.then(() => {
                console.log("banner广告隐藏成功");
            }).catch(err => {
                console.log("banner广告隐藏失败", err);
            });
        }
        showInterstitial(id) {
            let inst = qg.createInterstitialAd({
                posId: id
            });
            this.interstitial = { id: id, inst: inst };
            inst.onLoad(() => {
                console.log('interstitial 广告加载成功');
            });
            inst.onError((err) => {
                console.log('interstitial 广告加载失败', JSON.stringify(err));
            });
            let adShow = inst.show();
            adShow && adShow.catch((error) => {
                console.log("插屏广告展示失败-重试");
                console.log(JSON.stringify(error));
            });
        }
        getInterstitial(id) {
        }
        preloadInterstitial(id) {
        }
        init(customParams) {
        }
        //原生广告
        createNativeAd(adList, parent, pos) {
            console.log("adList:", adList);
            let nativeAdImg = new Laya.Image();
            nativeAdImg.skin = adList.imgUrlList[Utils.getIntRandom(0, adList.imgUrlList.length - 1)];
            nativeAdImg.anchorX = nativeAdImg.anchorY = 0.5;
            nativeAdImg.size(Laya.stage.width, Laya.stage.width / 2);
            nativeAdImg.pos(pos.x, pos.y);
            nativeAdImg.zOrder = 10;
            parent.addChild(nativeAdImg);
            let closeBtn = new Laya.Image();
            closeBtn.source = Laya.loader.getRes(this.imgPath.closePath);
            closeBtn.anchorX = closeBtn.anchorY = 0.5;
            closeBtn.right = closeBtn.top = 5;
            closeBtn.size(50, 50);
            closeBtn.alpha = 0.75;
            nativeAdImg.addChild(closeBtn);
            closeBtn.once(Laya.Event.CLICK, this, function (nativeAdImg) {
                nativeAdImg.removeSelf();
                nativeAdImg.destroy();
            }, [nativeAdImg]);
            let iconImg = new Laya.Image();
            iconImg.skin = adList.icon;
            iconImg.anchorX = iconImg.anchorY = 0.5;
            iconImg.left = iconImg.top = 0;
            iconImg.size(100, 100);
            nativeAdImg.addChild(iconImg);
            let titleBg = new Laya.Image();
            titleBg.source = Laya.loader.getRes(this.imgPath.bgPath);
            titleBg.anchorX = iconImg.anchorY = 0.5;
            titleBg.centerX = 0;
            titleBg.bottom = -100;
            titleBg.size(Laya.stage.width, 100);
            titleBg.sizeGrid = "20,20,20,20";
            nativeAdImg.addChild(titleBg);
            let nativeAdTitle = new Laya.Label();
            nativeAdTitle.text = adList.title;
            nativeAdTitle.name = "nativeAdTitle";
            nativeAdTitle.fontSize = 40;
            nativeAdTitle.bold = true;
            nativeAdTitle.color = "#000000";
            nativeAdTitle.centerX = 0;
            nativeAdTitle.top = 10;
            titleBg.addChild(nativeAdTitle);
            let nativeAdLabel = new Laya.Label();
            nativeAdLabel.text = adList.desc;
            nativeAdLabel.name = "nativeAdLabel";
            nativeAdLabel.fontSize = 35;
            nativeAdLabel.color = "#000000";
            nativeAdLabel.centerX = 0;
            nativeAdLabel.bottom = 10;
            titleBg.addChild(nativeAdLabel);
            //上报广告曝光。
            if (this.nativeAd[this.curNativeAdIndex].inst) {
                this.nativeAd[this.curNativeAdIndex].inst.reportAdShow({
                    adId: this.nativeAd[this.curNativeAdIndex].adList.adId
                });
            }
            nativeAdImg.once(Laya.Event.CLICK, this, function (nativeAdImg) {
                //上报点击
                nativeAdImg.removeSelf();
                nativeAdImg.destroy();
                if (this.nativeAd[this.curNativeAdIndex].inst) {
                    this.nativeAd[this.curNativeAdIndex].inst.reportAdClick({
                        adId: this.nativeAd[this.curNativeAdIndex].adList.adId
                    });
                }
            }, [nativeAdImg]);
        }
        preloadNativeAd(nativeAds, imgPath) {
            if (this.nativeAd.length == 0) {
                for (let index = 0; index < nativeAds.length; index++) {
                    this.nativeAd.push({ id: nativeAds[index], isLoad: false, inst: null, adList: null });
                }
            }
            this.imgPath = imgPath;
            this.loadNativeAd();
        }
        loadNativeAd() {
            var nativeAd = qg.createNativeAd({
                posId: this.nativeAd[this.curNativeAdIndex].id
            });
            this.nativeAd[this.curNativeAdIndex].inst = nativeAd;
            let func_1 = function (adList) {
                this.nativeAd[this.curNativeAdIndex].adList = adList;
                this.nativeAd[this.curNativeAdIndex].isLoad = true;
                this.nativeAd[this.curNativeAdIndex].inst = nativeAd;
                if (this.nativeAdParentInfo.parent) {
                    this.createNativeAd(this.nativeAd[this.curNativeAdIndex].adList, this.nativeAdParentInfo.parent, this.nativeAdParentInfo.pos);
                }
            };
            var onLoadFunc = func_1.bind(this);
            nativeAd.onLoad(function (res) {
                console.log("原生广告加载成功：", JSON.stringify(res.adList));
                onLoadFunc(res.adList[0]);
            });
            var loadNativeAd = this.loadNativeAd.bind(this);
            let func_2 = function () {
                this.nativeAd[this.curNativeAdIndex].inst.offLoad();
                this.nativeAd[this.curNativeAdIndex].inst = null;
                this.curNativeAdIndex += 1;
                if (this.curNativeAdIndex > 1) {
                    this.curNativeAdIndex = 0;
                }
                else {
                    loadNativeAd();
                }
            };
            var onErrorFunc = func_2.bind(this);
            let adLoad = nativeAd.load();
            adLoad && adLoad.then(() => {
                console.log("加载成功！");
                return;
            }).catch(err => {
                onErrorFunc();
            });
        }
        showNativeAd(parent, pos) {
            this.nativeAdParentInfo.parent = parent;
            this.nativeAdParentInfo.pos = pos;
            if (this.nativeAd[this.curNativeAdIndex]) {
                if (this.nativeAd[this.curNativeAdIndex].isLoad) {
                    this.createNativeAd(this.nativeAd[this.curNativeAdIndex].adList, parent, pos);
                }
                else {
                    this.loadNativeAd();
                }
            }
        }
        destoryNativeAd() {
            if (this.nativeAd[this.curNativeAdIndex].inst) {
                this.nativeAd[this.curNativeAdIndex].inst.offLoad();
                this.nativeAd[this.curNativeAdIndex].inst = null;
                this.nativeAd[this.curNativeAdIndex].isLoad = false;
                this.curNativeAdIndex += 1;
                if (this.curNativeAdIndex > 1) {
                    this.curNativeAdIndex = 0;
                }
            }
            this.nativeAdParentInfo.parent = this.nativeAdParentInfo.pos = null;
            this.loadNativeAd();
        }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }
    VivoAd.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    class VivoSystemInfo extends SystemInfo {
    }
    ;
    // vivo数据解析
    function pf_vivoInfo_to_playerInfo(vivoInfo, userInfo) {
        if (vivoInfo.openid != undefined)
            userInfo.openId = vivoInfo.openid;
        if (vivoInfo.uid != undefined)
            userInfo.userId = vivoInfo.uid;
        if (vivoInfo.nickname != undefined)
            userInfo.name = vivoInfo.nickname;
        if (vivoInfo.avatar != undefined)
            userInfo.headUrl = vivoInfo.avatar;
        return userInfo;
    }
    class VivoLogin {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
        }
        initMiniAdapter() {
            var innerAudioContext = qg.createInnerAudioContext();
            SoundManager.prototype.toggleMusic = function () {
                this.musicEnable = !this.musicEnable;
                console.log("1111111111111111", this.musicEnable);
                if (!this.musicEnable && this.playing) {
                    innerAudioContext.stop();
                }
                return this.musicEnable;
            };
            // SoundManager.prototype.toggleSoundFx = function () {
            // 	this.soundFxEnable = !this.soundFxEnable;
            // 	return this.soundFxEnable;
            // }
            SoundManager.prototype.playMusic = function (url, loops = 0, volume) {
                if (!this.musicEnable) {
                    return;
                }
                this.playing = true;
                innerAudioContext.loop = true;
                innerAudioContext.src = url;
                innerAudioContext.volume = volume || 1;
                innerAudioContext.play();
            };
            SoundManager.prototype.stopMusic = function () {
                if (this.playing) {
                    innerAudioContext.stop();
                    this.playing = false;
                }
            };
            // SoundManager.prototype.playSound = function (url: string, loops: number = 1, delay: number = 0, volume: number = 1) {
            // 	if (!this.soundFxEnable) {
            // 		return;
            // 	}
            // 	let soundAudioContext = qg.createInnerAudioContext();
            // 	soundAudioContext.loop = false;
            // 	soundAudioContext.src = url;
            // 	soundAudioContext.volume = volume || 1;
            // 	try {
            // 		soundAudioContext.play();
            // 	} catch (error) {
            // 		console.log(error);
            // 	}
            // };
        }
        engineInitialized() {
        }
        ;
        // vivo
        login() {
            //监听网络状态
            this.networkstate = "none";
            qg.getNetworkType({ success: (res) => {
                    console.log('>>>>>>>>>>>>>>>>> getNetworkType: ', res.networkType);
                    this.networkstate = res.networkType;
                } });
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            Sdk.getInstance().event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "vivo登录成功！" });
        }
        request(url, data, handler, method) {
            console.log('>>>>>>>>>>>>>>>>> request: ', url, data);
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (pkg) {
                if (handler)
                    handler.runWith(pkg);
            });
            xhr.send(url, null, method, 'json', ["Content-Type", "application/x-www-form-urlencoded"]);
        }
        getShareInstance() {
            return null;
        }
        getAdvInstance() {
            return new VivoAd();
        }
        getStatInstance() {
            return null;
        }
        getRewardStrInstance() {
            return new VivoRewardStrategy();
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return undefined;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 微信授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            // if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
            // 	this.query = res.query;
            // 	SdkMsg.getInstance().postShareQuery(res.query);
            // }
        }
        createUserInfoButton() {
        }
        destroyUserInfoButton() {
        }
        setKeepScreenOn(opt) {
            // 设置屏幕常亮
            qg.setKeepScreenOn(opt);
        }
        onShow(cb) {
            qg.onShow(cb);
        }
        onHide(cb) {
            qg.onHide(cb);
        }
        checkUpdate() {
        }
        loadSubpackage(opt) {
            if (!qg.loadSubpackage) {
                this.exit();
                return;
            }
            return qg.loadSubpackage(opt);
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
            qg.showDialog({
                title: title,
                message: content,
                buttons: [
                    {
                        text: okTxt,
                        color: '#000000'
                    },
                    {
                        text: cancelTxt,
                        color: '#000000'
                    }
                ],
                success: function (data) {
                    console.log('handling callback');
                    if (okHandler) {
                        okHandler.run();
                    }
                },
                cancel: function () {
                    console.log('handling cancel');
                    if (cancelHandler) {
                        cancelHandler.run();
                    }
                },
                fail: function (data, code) {
                    console.log(`handling fail, code = ${code}`);
                    if (cancelHandler) {
                        cancelHandler.run();
                    }
                }
            });
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            this.systemInfo = qg.getSystemInfoSync();
            let height = qg.getNotchHeightSync();
            if (height) {
                this.systemInfo.statusBarHeight = height.height || 0;
            }
            console.log("getSystemInfoSync: " + JSON.stringify(this.systemInfo));
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            if (!force && this.menuInfo) {
                return this.menuInfo;
            }
            return this.menuInfo;
        }
        exit() {
            qg.exitApplication({});
        }
        getLaunchOptionsSync() {
            return undefined;
        }
        navigateToMiniProgram(opt) {
        }
        getOpenDataContext() {
        }
        createFeedbackButton(opt) {
        }
        openCustomerServiceConversation(obj) {
        }
        createGameClubButton(opt) {
        }
        onAudioInterruption(begincb, endcb) {
            qg.onAudioInterruptionBegin(begincb);
            qg.onAudioInterruptionEnd(endcb);
        }
        vibrateShort() {
            qg.vibrateShort({
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { }
            });
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        getShareEnabled() {
            let shareEnabled = false;
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (!Sdk.getInstance().isAudit()) {
                shareEnabled = Sdk.getInstance().getServerJsonCfgShareEnable();
            }
            return shareEnabled;
        }
        judgeBAndW(params) { return exports.BlackAndWhite.White; }
        getCode() { return undefined; }
        ;
    }

    class JSBridge {
        constructor() {
            this.platformClass = window['PlatformClass'];
            if (this.platformClass) {
                this.bridge = this.platformClass.createClass("demo.JSBridge");
                this.haveBridge() && (window["JSBridge"] = JSBridge);
            }
            else {
                console.warn("[JSBridge]>>>>>>>>>>>>>>>>>>>>>>>>>>>>>no PlatformClass!!!");
            }
        }
        static get Instance() {
            if (!JSBridge.instance) {
                JSBridge.instance = new JSBridge();
            }
            return JSBridge.instance;
        }
        haveBridge() {
            let flag = false;
            if (this.bridge) {
                flag = true;
            }
            else {
                console.warn("[JSBridge]>>>>>>>>>>>>>>>>>>>>>>>>>>>>>no JSBridge!!!");
            }
            return flag;
        }
        setOnShowCallBack(cb) {
            this.onShowCallBack = cb;
        }
        setOnHideCallBack(cb) {
            this.onHideCallBack = cb;
        }
        //=================================================banner========================================================
        initBanner(bannerId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("initBanner", bannerId);
        }
        loadingBanner(bannerId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("loadingBanner", bannerId);
        }
        showBanner(bannerId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("showBanner", bannerId);
        }
        closeBanner(bannerId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("closeBanner", bannerId);
        }
        //===============================================FullScreenVideo（插屏）======================================================
        initFullScreenVideo(fsvId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("initFullScreenVideo", fsvId);
        }
        loadingFullScreenVideo(fsvId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("loadingFullScreenVideo", fsvId);
        }
        showFullScreenVideo(fsvId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("showFullScreenVideo", fsvId);
        }
        //=================================================视频===================================================================
        initRewardVideo(rvId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("initRewardVideo", rvId);
        }
        loadingRewardVideo(rvId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("loadingRewardVideo", rvId);
        }
        showRewardVideo(rvId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("showRewardVideo", rvId);
        }
        //===============================================友盟统计=============================================================================
        startLeve(levId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("startLeve", levId);
        }
        finishLevel(levId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("finishLevel", levId);
        }
        failLevel(levId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("failLevel", levId);
        }
        skinUnlock(skinId) {
            if (!this.haveBridge())
                return;
            this.bridge.call("skinUnlock", skinId);
        }
        customEvent(event) {
            if (!this.haveBridge())
                return;
            this.bridge.call("customEvent", event);
        }
        //==================================================================硬件================================================================
        vibrateShort() {
            if (!this.haveBridge())
                return;
            this.bridge.call("vibrateShort");
        }
        //======================================================================================================================================
        //=======================================================Android to JS==================================================================
        //======================================================================================================================================
        static onShow() {
            let func = JSBridge.Instance.onShowCallBack;
            if (func) {
                func();
            }
            else {
                console.warn("[JSBridge]>>>>>>>>>>>>>>>>>>>>>>>>>>>>>no onShowCallBack!!!");
            }
        }
        static onHide() {
            let func = JSBridge.Instance.onHideCallBack;
            if (func) {
                func();
            }
            else {
                console.warn("[JSBridge]>>>>>>>>>>>>>>>>>>>>>>>>>>>>>no onHideCallBack!!!");
            }
        }
        static watchRewardVideoSuccess() {
            console.log("[JSBridge]>>>>>>>>>>>>>>>>>>>>>>>>>>>>>watchRewardVideoSuccess!!!");
            EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_SUCCESS });
        }
    }

    class TapTapAd {
        constructor() {
            this.bridge = JSBridge.Instance;
        }
        init(customParams) {
            if (customParams) {
                this.bridge.initBanner(customParams.bannerId);
                this.bridge.initFullScreenVideo(customParams.fullScreenVideoId);
                this.bridge.initRewardVideo(customParams.rewardVideoId);
            }
            else {
                console.warn("[TapTapAd]>>>>>>>>>>>>>>>>>>>>>>>>>no Params!!!");
            }
        }
        preloadVideo(videoId) {
            this.bridge.loadingRewardVideo(videoId);
        }
        playVideo(videoId) {
            this.bridge.showRewardVideo(videoId);
            EventCenter.getInstance().once(SdkUIEvent.E_REWARD_GAIN, this, (msg) => {
                if (msg.code == exports.SdkCode.REWARD_GAIN_SUCCESS) {
                    this.preloadVideo(videoId);
                }
            });
        }
        getVideoState(videoId) {
            return null;
        }
        preloadBanner(bannerId, customParams) {
            this.bridge.loadingBanner(bannerId);
        }
        showBanner(bannerId, customParams) {
            this.bridge.showBanner(bannerId);
        }
        hideBanner(bannerId) {
            this.bridge.closeBanner(bannerId);
        }
        getBannerById(bannerId) {
            return null;
        }
        preloadInterstitial(id) {
            this.bridge.loadingFullScreenVideo(id);
        }
        showInterstitial(id) {
            this.bridge.showFullScreenVideo(id);
        }
        preloadNativeAd(nativeAds) { }
        showNativeAd(parent, pos) { }
        destoryNativeAd() { }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }

    var DataStatDef;
    (function (DataStatDef) {
        DataStatDef["GUIDE_STEP_CN"] = "\u65B0\u624B\u5F15\u5BFC\u5B8C\u6210\u6B65\u9AA4";
        DataStatDef["GUIDE_STEP_1"] = "guide_step_1";
        DataStatDef["GUIDE_STEP_2"] = "guide_step_2";
        DataStatDef["GUIDE_STEP_3"] = "guide_step_3";
        DataStatDef["GUIDE_STEP_4"] = "guide_step_4";
        DataStatDef["GUIDE_STEP_5"] = "guide_step_5";
        DataStatDef["GUIDE_STEP_6"] = "guide_step_6";
        DataStatDef["GUIDE_STEP_7"] = "guide_step_7";
    })(DataStatDef || (DataStatDef = {}));
    class TapTapStat {
        constructor() {
            this.bridge = JSBridge.Instance;
        }
        sendEvent(eventName, param) {
            if (eventName == DataStatDef.GUIDE_STEP_CN) {
                if (!param || typeof (param.step) != "number")
                    return;
                switch (param.step) {
                    case 1:
                        eventName = DataStatDef.GUIDE_STEP_1;
                        break;
                    case 2:
                        eventName = DataStatDef.GUIDE_STEP_2;
                        break;
                    case 3:
                        eventName = DataStatDef.GUIDE_STEP_3;
                        break;
                    case 4:
                        eventName = DataStatDef.GUIDE_STEP_4;
                        break;
                    case 5:
                        eventName = DataStatDef.GUIDE_STEP_5;
                        break;
                    case 6:
                        eventName = DataStatDef.GUIDE_STEP_6;
                        break;
                    case 7:
                        eventName = DataStatDef.GUIDE_STEP_7;
                        break;
                }
            }
            this.bridge.customEvent(eventName);
        }
        stageOnStart(o) {
            this.bridge.startLeve(`[id:${o.stageId}]>>>[name:${o.stageName}]`);
        }
        stageOnRunning(o) {
        }
        stageOnEnd(o) {
            if (o.event && typeof (o.event) == "string" && o.event == "success") {
                this.bridge.finishLevel(`[id:${o.stageId}]>>>[name:${o.stageName}]`);
            }
            else {
                this.bridge.failLevel(`[id:${o.stageId}]>>>[name:${o.stageName}]`);
            }
        }
        unlockItem(o) {
            if (o) {
                this.bridge.skinUnlock(o.id);
            }
        }
    }

    class TapTapLogin {
        constructor() {
            this.bridge = JSBridge.Instance;
        }
        /**
         * 初始化适配器
         */
        initMiniAdapter() { }
        ;
        /**
         * 引擎初始化完成
         */
        engineInitialized() { }
        ;
        /**
         * 登录
         */
        login() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            let mine = UserLogic.getInstance().getMine();
            mine.openId = GameCfg.user_unique_id;
            mine.name = "taptap_user";
            mine.headUrl = "";
            if (this.isLoginServer()) {
                SdkMsg.getInstance().loginNoAuth();
            }
            else {
                EventCenter.getInstance().event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS });
            }
        }
        /**
         * 网络请求
         * @param url
         * @param data
         * @param handler
         * @param method
         */
        request(url, data, handler, method) {
            let xhr = new Laya.HttpRequest();
            xhr.http.timeout = 10000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, this, function (pkg) {
                if (handler)
                    handler.runWith(pkg);
            });
            xhr.send(url, null, method, 'json', ["Content-Type", "application/x-www-form-urlencoded"]);
        }
        /**
         *
         */
        onResume() { }
        ;
        /**
         * 获取分享数据
         */
        getQuery() { return undefined; }
        ;
        /**
         * 设置游戏常亮
         * @param opt
         */
        setKeepScreenOn(opt) { }
        ;
        /**
         * 切到前台回调
         * @param cb
         */
        onShow(cb) {
            this.bridge.setOnHideCallBack(cb);
        }
        ;
        /**
         * 切到后台回调
         * @param cb
         */
        onHide(cb) {
            this.bridge.setOnHideCallBack(cb);
        }
        ;
        /**
         * 是否授权
         */
        isAuth() { return true; }
        ;
        /**
         * 授权
         * @param btn
         */
        auth(btn) { }
        ;
        /**
         * 销毁用户授权按钮
         */
        destroyUserInfoButton() { }
        ;
        /**
         * 是否登录服务器
         */
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        ;
        /**
         * 检查更新
         */
        checkUpdate() { }
        ;
        /**
         * 加载子包
         * @param opt
         */
        loadSubpackage(opt) { return undefined; }
        ;
        /**
         * 显示模态弹窗
         * @param content
         * @param title
         * @param okTxt
         * @param okHandler
         * @param cancelTxt
         * @param cancelHandler
         */
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) { }
        /**
         * 获取系统信息
         */
        getSystemInfo() {
            return {};
        }
        /**
        * 获得胶囊信息
        */
        getMenuButtonBoundingClientRect() {
            return null;
        }
        /**
         * 退出
         */
        exit() { }
        ;
        /**
         * 获取序启动参数
         */
        getLaunchOptionsSync() { return undefined; }
        ;
        /**
         * 导航到其他小游戏
         * @param opt
         */
        navigateToMiniProgram(opt) { }
        ;
        /**
         * 获取开放数据域
         */
        getOpenDataContext() { }
        ;
        /**
         * 创建反馈按钮
         * @param opt
         */
        createFeedbackButton(opt) { }
        ;
        /**
         * 打开客服会话
         */
        openCustomerServiceConversation() { }
        ;
        /**
         * 创建游戏圈按钮
         * @param opt
         */
        createGameClubButton(opt) { }
        ;
        /**
         * 当音频中断
         * @param begincb
         * @param endcb
         */
        onAudioInterruption(begincb, endcb) { }
        ;
        /**
         * 震动
         */
        vibrateShort() {
            this.bridge.vibrateShort();
        }
        ;
        /**
         * 获取分享实例
         */
        getShareInstance() { return undefined; }
        ;
        /**
         * 获取广告实例
         */
        getAdvInstance() {
            return new TapTapAd();
        }
        ;
        /**
         * 获取数据统计实例
         */
        getStatInstance() {
            return new TapTapStat();
        }
        ;
        /**
         * 获取当前奖励策略
         */
        getRewardStrInstance() { return undefined; }
        ;
        /**
         * 返回网络连接类型
         */
        getNetworkType() { return "unknown"; }
        /**
         * 判断网络连接
         */
        isConnectNetwork() { return false; }
        /**
         * 判断黑白名单
         * @param params
         */
        judgeBAndW(params) { return exports.BlackAndWhite.Black; }
        getCode() { return undefined; }
        ;
    }

    class QQShare {
        // private shareType: number;
        constructor() {
        }
        init(shareData) {
        }
        recordVideo({ duration: number }) { }
        ;
        stopRecord() { }
        ;
        shareVideo(url) { }
        ;
        canRecord() { return false; }
        ;
        setShare(title, imgUrl, query) {
            qq.showShareMenu({
                withShareTicket: true,
            });
            query = query || "";
            qq.onShareAppMessage(function () {
                return {
                    title: title,
                    imageUrl: imgUrl,
                    query: query
                };
            }.bind(this));
        }
        share(args1, args2, args3) {
            let title = null, imgUrl = null, queryParam = null, source = null;
            if (args1 instanceof RewardGainWayParams) {
                title = args1.title;
                imgUrl = args1.imgUrl;
                queryParam = args1.queryParam;
                source = args1.source;
            }
            else {
                title = args1;
                imgUrl = args2;
                queryParam = args3;
                source = "未知";
            }
            let query = ``;
            if (queryParam) {
                EventCenter.getInstance().once(BaseEvent.E_APP_ON_RESUME, this, function (res) {
                    Utils.showTips("感谢分享!!!");
                });
                for (let key in queryParam) {
                    let info = queryParam[key];
                    if (info != undefined) {
                        if (typeof (info) == "object") {
                            info = JSON.stringify(info);
                        }
                        if (query == undefined) {
                            query = key + '=' + info;
                        }
                        else {
                            query = query + '&' + key + '=' + info;
                        }
                    }
                }
            }
            console.log("wx share queryParam:" + JSON.stringify(queryParam), query);
            qq.shareAppMessage({
                title: title,
                imageUrl: imgUrl,
                query: query,
                shareAppType: "qqFastShareList",
                success: function () {
                    console.log("快速分享成功~~~");
                    EventCenter.getInstance().event(SdkUIEvent.E_SHARE_RESULT, { code: exports.SdkCode.SHARE_SUCCESS });
                },
                fail: function () {
                    console.log("快速分享失败~~~");
                    EventCenter.getInstance().event(SdkUIEvent.E_SHARE_RESULT, { code: exports.SdkCode.SHARE_FAILED });
                }
            });
        }
    }
    QQShare.aldShareEnable = false;
    ;
    Laya.ClassUtils.regClass("QQShare", QQShare);

    class QQAdv {
        constructor() {
            //初始化banner
            this.banners = [];
            this.videos = [];
            this.curIsAutoPlayVideo = false;
            this.interstitial = [];
            this.AppBox = undefined;
            this.AppBoxData = undefined;
            this.closeIndex = 0;
            this.AppBoxMask = undefined;
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        loadVideo(videoId, isPlay = false) {
            this.curIsAutoPlayVideo = isPlay;
            let isRegOnClose = (this.videos.length === 0); //是否注册监听函数
            let video = this.getVideoById(videoId);
            if (!video) {
                video = { id: videoId, inst: null, state: exports.AdState.LOADING };
                this.videos.push(video);
            }
            if (!video.inst) {
                video.inst = qq.createRewardedVideoAd({ adUnitId: video.id });
                video.inst.load();
                if (isRegOnClose) {
                    video.inst.onLoad(() => {
                        console.log('激励视频广告加载成功');
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        video.state = exports.AdState.LOAD;
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_SUCCESS });
                        if (this.curIsAutoPlayVideo)
                            this.showVideo(video.id);
                    });
                    video.inst.onError((err) => {
                        console.log('激励视频广告加载失败');
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        video.state = exports.AdState.LOAD_FAIL;
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                    });
                    video.inst.onClose((res) => {
                        // 用户点击了【关闭广告】按钮
                        // 小于 2.1.0 的基础库版本，res 是一个 undefined
                        if ((res && res.isEnded) || (res === undefined)) {
                            // 正常播放结束，可以下发游戏奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                        }
                        else {
                            // 播放中途退出，不下发游戏奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                        }
                        this.curIsAutoPlayVideo = false;
                    });
                }
                else {
                    if (exports.AdState.LOAD_FAIL === video.state) {
                        video.inst.load();
                    }
                }
            }
        }
        showVideo(videoId) {
            let video = this.getVideoById(videoId);
            if (!video || !video.inst)
                return;
            video.inst.show()
                .then(() => {
                '激励视频广告显示';
            })
                .catch(() => {
                video.inst.load()
                    .then(() => video.inst.show())
                    .catch((err) => {
                    video.state = exports.AdState.LOAD_FAIL;
                    console.log('激励视频广告显示失败');
                });
            });
        }
        preloadVideo(videoId) {
            this.loadVideo(videoId);
        }
        getVideoState(videoId) {
            let video = this.getVideoById(videoId);
            if (!video)
                return exports.VideoState.UNLOAD;
            if (exports.AdState.LOAD === video.state)
                return exports.VideoState.ENABLED;
            else
                return exports.VideoState.UNENABLED;
        }
        playVideo(videoId) {
            console.log("video Id", videoId);
            let video = this.getVideoById(videoId);
            if (!video) {
                Laya.MouseManager.enabled = false;
                this.loadVideo(videoId, true);
            }
            else {
                if (exports.AdState.LOAD === video.state) {
                    Laya.MouseManager.enabled = false;
                    this.showVideo(videoId);
                }
                else if (exports.AdState.LOAD_FAIL === video.state) {
                    Utils.showTips("暂无视频!!!");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                }
            }
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                (!customParams) && (customParams = { forever: false, widthScaleRate: 1 });
                (!customParams.widthScaleRate) && (customParams.widthScaleRate = 1);
                customParams.forever = Boolean(customParams.forever);
                banner = { id: bannerId, state: exports.AdState.LOADING, inst: null, showCnt: 0, createStamp: Utils.getTime(), customParams: customParams };
                this.banners.push(banner);
            }
            else {
                if (!customParams) {
                    customParams = banner.customParams;
                }
            }
            if (!banner.inst) {
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                let phone = Sdk.getInstance().getSystemInfo();
                let bannerWidth = phone.screenWidth * customParams.widthScaleRate;
                banner.inst = qq.createBannerAd({
                    adUnitId: bannerId,
                    style: {
                        left: 0,
                        top: phone.screenHeight - 100,
                        width: bannerWidth,
                    },
                });
                banner.inst.onResize((res) => {
                    banner.inst.style.left = (phone.screenWidth - res.width) / 2;
                    banner.inst.style.top = phone.screenHeight - res.height;
                    //ios全面屏上移banner
                    if (-1 !== phone.system.indexOf("iOS")
                        && Utils.isQMP()) {
                        banner.inst.style.top -= 24;
                    }
                });
                banner.inst.onLoad(() => {
                    //ios全面屏上移banner
                    if (-1 !== phone.system.indexOf("iOS")) {
                        banner.inst.style.left = (phone.screenWidth - banner.inst.style.realWidth) / 2;
                        banner.inst.style.top = phone.screenHeight - banner.inst.style.realHeight;
                        if (Utils.isQMP()) {
                            banner.inst.style.top -= 24;
                        }
                    }
                    console.log('bannerid${bannerIds[i]} 广告加载成功');
                    banner.state = exports.AdState.LOAD;
                    if (banner.customParams.forever)
                        banner.inst.show();
                });
                banner.inst.onError((err) => {
                    console.log('bannerid${bannerIds[i]} 广告加载失败', JSON.stringify(err));
                    banner.state = exports.AdState.LOAD_FAIL;
                });
            }
            else {
                if (exports.AdState.DELETING === banner.state
                    || exports.AdState.LOAD_FAIL === banner.state) {
                    banner.inst.destroy();
                    banner.inst = null;
                    banner.showCnt = 0;
                    banner.state = exports.AdState.LOADING;
                    this.preloadBanner(bannerId);
                }
            }
        }
        showBanner(bannerId, customParams) {
            console.log("banner Id", bannerId);
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                this.preloadBanner(bannerId, customParams);
            }
            else {
                if (banner.customParams.forever)
                    return;
                if (exports.AdState.LOAD === banner.state) {
                    banner.showCnt++;
                    banner.inst.show();
                }
                else {
                    if (exports.AdState.LOAD_FAIL === banner.state)
                        Laya.timer.once(10000, this, function () {
                            this.preloadBanner(bannerId);
                        });
                    else if (exports.AdState.LOADING === banner.state) {
                        if (customParams && customParams.isPostLoadedShow) {
                            Laya.timer.once(1000, this, function () {
                                this.showBanner(bannerId, customParams);
                            });
                        }
                    }
                }
            }
        }
        hideBanner(bannerId) {
            let banner = this.getBannerById(bannerId);
            if (!banner)
                return;
            if (banner.customParams.forever)
                return;
            if (banner.inst)
                banner.inst.hide();
            //删除banner
            if (banner.showCnt > 0) {
                banner.state = exports.AdState.DELETING;
                this.preloadBanner(bannerId);
            }
        }
        getBannerById(bannerId) {
            return this.banners.filter((v, idx, arr) => { return (v.id === bannerId); }, this)[0];
        }
        showInterstitial(id) {
        }
        getInterstitial(id) {
            return null;
        }
        preloadInterstitial(id) { }
        init(customParams) { }
        preloadNativeAd(nativeAds) { }
        showNativeAd(parent, pos) { }
        destoryNativeAd() { }
        preloadAppbox(appBoxId) {
            if (!this.AppBox) {
                this.AppBox = qq.createAppBox({ adUnitId: appBoxId });
            }
            else {
                return;
            }
            this.AppBoxData = this.AppBox.load();
            var loadFunc = function () {
                this.closeIndex += 1;
                if (this.closeIndex >= 2) {
                    this.closeIndex = 0;
                    this.AppBoxData = this.AppBox.load();
                }
            };
            loadFunc = loadFunc.bind(this);
            this.AppBox.onClose(function () {
                loadFunc();
            });
        }
        showAppBox() {
            this.AppBox.show();
        }
        hideAppBox() {
            this.AppBox.hide();
        }
        destoryAppBox() {
            this.AppBox.destroy();
        }
        getAppBoxData() {
            return this.AppBoxData;
        }
    }
    QQAdv.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    class QQStat {
        constructor() { }
        sendEvent(eventName, param) {
            if (qq.aldSendEvent)
                qq.aldSendEvent(eventName, param);
        }
        stageOnStart(o) {
            if (qq.aldStage)
                qq.aldStage.onStart(o);
        }
        stageOnRunning(o) {
            if (qq.aldStage)
                qq.aldStage.onRunning(o);
        }
        stageOnEnd(o) {
            if (qq.aldStage)
                qq.aldStage.onEnd(o);
        }
        unlockItem(o) {
        }
    }

    class QQRewardStrategy {
        static get rewardStrategyCnt() {
            if (undefined === this._rewardStrategyCnt) {
                if (UserLogic.getInstance().isNewDay
                    && UserLogic.getInstance().isNewDay()) {
                    this.rewardStrategyCnt = 1;
                }
                else {
                    let rewardStrategyCnt = Laya.LocalStorage.getItem("rewardStrategyCnt");
                    if (rewardStrategyCnt == null || rewardStrategyCnt === "") {
                        this.rewardStrategyCnt = 1;
                    }
                    else {
                        this._rewardStrategyCnt = Number(rewardStrategyCnt);
                    }
                }
            }
            return this._rewardStrategyCnt;
        }
        static set rewardStrategyCnt(v) {
            if (this._rewardStrategyCnt === v)
                return;
            this._rewardStrategyCnt = v;
            Laya.LocalStorage.setItem("rewardStrategyCnt", this._rewardStrategyCnt.toString());
        }
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
            //每激活一次奖励策略，奖励计数累加一次
            if (s && params && params.source)
                QQRewardStrategy.rewardStrategyCnt++;
        }
        getStrategy() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (Sdk.getInstance().isAudit()) {
                console.log("###审核版本直接返回视频!!!");
                return exports.GetRewardSDKWay.VIDEO;
            }
            if (exports.GetRewardSDKWay.AUTO === this.curStrategy) {
                if (exports.VideoState.ENABLED === Sdk.getInstance().isHasVideo()) {
                    let baseShareCnt = Sdk.getInstance().getServerJsonCfgShareParams().OlderShareCtnBase;
                    if (UserLogic.getInstance().isFirstLogin
                        && UserLogic.getInstance().isFirstLogin()) {
                        baseShareCnt = Sdk.getInstance().getServerJsonCfgShareParams().FreshShareCntBase;
                    }
                    if (!baseShareCnt) {
                        baseShareCnt = 0;
                    }
                    let curAutoStrategy = null;
                    if (QQRewardStrategy.rewardStrategyCnt <= baseShareCnt) {
                        curAutoStrategy = exports.GetRewardSDKWay.SHARE;
                    }
                    else {
                        let shareSpace = Sdk.getInstance().getServerJsonCfgShareParams().ShareSpace;
                        if (!shareSpace) {
                            shareSpace = 0;
                        }
                        if (shareSpace > 0 && 0 === (QQRewardStrategy.rewardStrategyCnt - baseShareCnt) % (shareSpace + 1)) {
                            curAutoStrategy = exports.GetRewardSDKWay.SHARE;
                        }
                        else {
                            curAutoStrategy = exports.GetRewardSDKWay.VIDEO;
                        }
                    }
                    return curAutoStrategy;
                }
                else {
                    return exports.GetRewardSDKWay.SHARE;
                }
            }
            else {
                if (exports.GetRewardSDKWay.SHARE === this.curStrategy)
                    return this.curStrategy;
                else
                    return exports.GetRewardSDKWay.VIDEO;
            }
        }
        runStrategy() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let curStrategy = this.getStrategy();
            if (exports.GetRewardSDKWay.SHARE === curStrategy) {
                Sdk.getInstance().sendEvent("分享", { "开始": this.curParams.source });
                this.share(this.curParams);
            }
            else if (exports.GetRewardSDKWay.VIDEO === curStrategy) {
                Sdk.getInstance().sendEvent("视频", { "开始": this.curParams.source });
                this.playVideo(this.curParams);
            }
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let videoState = Sdk.getInstance().isHasVideo();
            if (exports.VideoState.UNENABLED === videoState) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦, 分享也可获得奖励哟!");
                Laya.MouseManager.enabled = false;
                Laya.timer.once(1000, this, function () {
                    Laya.MouseManager.enabled = true;
                    this.share(params);
                });
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                        //统计视频出处
                        Sdk.getInstance().sendEvent("视频", { "完成": params.source });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Sdk.getInstance().showModal("看完视频才会有奖励哟！！！", "提示", "继续观看", Laya.Handler.create(this, function () {
                            this.playVideo(params);
                        }), "一会再来", Laya.Handler.create(this, function () {
                            EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                        }));
                        //统计视频未完成
                        Sdk.getInstance().sendEvent("视频", { "未完成": params.source });
                    }
                });
                Sdk.getInstance().playVideo();
            }
        }
        /**
         * 分享判定
         * 是否正在分享,因为微信取消了分享回调,故检测分享触发+回到前台认为一次分享完成
         */
        share(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            EventCenter.getInstance().once(SdkUIEvent.E_SHARE_RESULT, this, function (event) {
                if (exports.SdkCode.SHARE_SUCCESS === event.code) { //完成分享
                    EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                        code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                        way: exports.GetRewardSDKWay.SHARE,
                        gid: params.bindCtrlGId
                    });
                    //统计分享完成
                    Sdk.getInstance().sendEvent("分享", { "完成": params.source });
                }
                else if (exports.SdkCode.SHARE_FAILED === event.code) {
                    //统计分享未完成
                    Sdk.getInstance().sendEvent("分享", { "未完成": params.source });
                    EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                }
            });
            Sdk.getInstance().share(params);
        }
    }
    QQRewardStrategy._rewardStrategyCnt = undefined; //奖励策略计数
    ;

    /*
    * Created on Fri Mar 15 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    // 微信数据解析
    function pf_wxInfo_to_playerInfo$2(wxInfo, userInfo) {
        if (wxInfo.nickName != undefined)
            userInfo.name = wxInfo.nickName;
        if (wxInfo.avatarUrl != undefined)
            userInfo.headUrl = wxInfo.avatarUrl;
        if (wxInfo.gender != undefined)
            userInfo.sex = wxInfo.gender;
        if (wxInfo.city != undefined)
            userInfo.city = wxInfo.city;
        if (wxInfo.province != undefined)
            userInfo.province = wxInfo.province;
        if (wxInfo.country != undefined)
            userInfo.country = wxInfo.country;
        if (wxInfo.language != undefined)
            userInfo.language = wxInfo.language;
    }
    class QQLogin extends BaseEventDispatcher {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
            super();
        }
        initMiniAdapter() { }
        ;
        engineInitialized() { }
        ;
        // 登录微信
        login() {
            qq.login({
                success: this.wxloginSucc.bind(this),
                fail: this.wxloginFail.bind(this)
            });
            qq.getSetting({
                success: this.onSettings.bind(this)
            });
            //监听网络状态
            this.networkstate = "none";
            qq.getNetworkType({ success: (res) => {
                    console.log('>>>>>>>>>>>>>>>>> getNetworkType: ', res.networkType);
                    this.networkstate = res.networkType;
                } });
            qq.onNetworkStatusChange((res) => {
                console.log('>>>>>>>>>>>>>>>>> onNetworkStatusChange: ', res.isConnected, res.networkType);
                this.networkstate = res.networkType;
            });
        }
        request(url, data, handler, method) {
            console.log('>>>>>>>>>>>>>>>>> request: ', url, data);
            qq.request({
                url: url,
                data: data,
                method: method,
                dataType: 'json',
                success: res => {
                    console.log('<<<<<<<<<<<<<<<<< request: ', res);
                    if (handler) {
                        handler.runWith(res.data);
                    }
                },
                fail: err => {
                    console.log('<<<<<<<<<<<<<<<<< request error: ', err);
                    Utils.showTips('获取服务器JSON配置失败！');
                }
            });
        }
        getShareInstance() {
            return new QQShare();
        }
        getAdvInstance() {
            return new QQAdv();
        }
        getStatInstance() {
            return new QQStat();
        }
        getRewardStrInstance() {
            return new QQRewardStrategy();
        }
        onSettings(res) {
            let settings = res.authSetting;
            this.isUserInfoAuth = !!settings["scope.userInfo"];
            if (this.isUserInfoAuth) {
                qq.getUserInfo({
                    success: this.userInfoSucc.bind(this)
                });
            }
            if (this.code) {
                this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "微信登录成功" });
            }
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return this.query;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 微信授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
                this.query = res.query;
                SdkMsg.getInstance().postShareQuery(res.query);
            }
        }
        wxloginSucc(res) {
            console.log("微信登录成功！");
            let tryCount = 10;
            const checkNeedFix = () => {
                if (!this.menuInfo || this.menuInfo.top > 0 || tryCount <= 0) {
                    this.code = res.code;
                    // 登录服务器
                    if (this.isLoginServer()) {
                        SdkMsg.getInstance().login(this.code, launchParams.query);
                    }
                    if (this.isUserInfoAuth !== undefined) {
                        this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "微信登录成功" });
                    }
                    return false;
                }
                tryCount--;
                return true;
            };
            const fixInfo = () => {
                // 修正系统信息和胶囊信息
                this.getSystemInfo(true);
                this.getMenuButtonBoundingClientRect(true);
                if (!checkNeedFix()) {
                    // 获取成功
                    Utils.sNotchScreen = undefined; // 重置适配信息
                    Laya.timer.clear(this, fixInfo);
                }
            };
            let launchParams = qq.getLaunchOptionsSync();
            this.query = launchParams.query;
            if (checkNeedFix()) {
                Laya.timer.loop(100, this, fixInfo);
            }
        }
        wxloginFail() {
            console.log("微信登录失败！");
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_FAILED, msg: "微信登录失败" });
        }
        userInfoSucc(info) {
            let userInfo;
            if (info.userInfo) {
                console.log("获取用户信息成功！" + JSON.stringify(info));
                this.isUserInfoAuth = true;
                this.encryptedData = info.encryptedData;
                this.iv = info.iv;
                this.destroyUserInfoButton();
                // 解析并更新
                userInfo = new exports.SDKEntity.UserInfoEntity();
                pf_wxInfo_to_playerInfo$2(info.userInfo, userInfo);
                UserLogic.getInstance().update(userInfo);
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_SUCCESS, msg: "授权成功" });
            }
            else {
                console.log("获取用户信息失败！");
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_FAILED, msg: "用户拒绝授权" });
            }
            // 发送到服务器
            if (this.profileToServer) {
                SdkMsg.getInstance().postProfile(userInfo);
            }
        }
        createUserInfoButton() {
            let btn = this.profileBtn;
            let leftTop = btn.localToGlobal(new Laya.Point(0, 0));
            let rightBottom = btn.localToGlobal(new Laya.Point(btn.width, btn.height));
            let points = [];
            Laya.stage.transform.transformPoint(leftTop);
            Laya.stage.transform.transformPoint(rightBottom);
            let width = rightBottom.x - leftTop.x;
            let height = rightBottom.y - leftTop.y;
            let button = qq.createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                    left: leftTop.x,
                    top: leftTop.y,
                    width: width,
                    height: height,
                },
                withCredentials: true,
                lang: 'zh_CN',
            });
            button.show();
            button.onTap(this.userInfoSucc.bind(this));
            this.profileBtn = button;
            btn.once(Laya.Event.REMOVED, this, this.destroyUserInfoButton);
        }
        destroyUserInfoButton() {
            if (this.profileBtn)
                this.profileBtn.destroy();
            this.profileBtn = null;
        }
        setKeepScreenOn(opt) {
            // 设置屏幕常亮
            qq.setKeepScreenOn(opt);
        }
        onShow(cb) {
            qq.onShow(cb);
        }
        onHide(cb) {
            qq.onHide(cb);
        }
        checkUpdate() {
            if (typeof qq.getUpdateManager === 'function') { // 请在使用前先判断是否支持
                const updateManager = qq.getUpdateManager();
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    console.log(res.hasUpdate);
                });
                updateManager.onUpdateReady(() => {
                    this.showModal('有新版本啦！，赶快开启新的历程吧~', '更新提示', '开启', Laya.Handler.create(this, () => {
                        updateManager.applyUpdate();
                    }));
                });
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log('新的版本下载失败');
                });
            }
        }
        loadSubpackage(opt) {
            if (!qq.loadSubpackage) {
                this.showModal('请升级微信到最新版本！', '提示', '确定', Laya.Handler.create(this, () => {
                    this.exit();
                }), '');
                return;
            }
            opt["fail"] = function () {
                console.log("分包加载失败！");
            };
            return qq.loadSubpackage(opt);
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
            qq.showModal({
                title: title,
                content: content,
                showCancel: cancelTxt != "" && cancelTxt != undefined,
                cancelText: cancelTxt,
                confirmText: okTxt,
                success: (res) => {
                    if (res.confirm) {
                        if (okHandler) {
                            okHandler.run();
                        }
                    }
                    else {
                        if (cancelTxt) {
                            if (cancelHandler) {
                                cancelHandler.run();
                            }
                        }
                    }
                }
            });
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            this.systemInfo = qq.getSystemInfoSync();
            console.log("getSystemInfoSync: " + JSON.stringify(this.systemInfo));
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            if (!force && this.menuInfo) {
                return this.menuInfo;
            }
            // if (Utils.compareVersion(this.systemInfo.SDKVersion, "2.1.0") >= 0) {
            this.menuInfo = qq.getMenuButtonBoundingClientRect();
            console.log("getMenuButtonBoundingClientRect: " + JSON.stringify(this.menuInfo));
            // }
            return this.menuInfo;
        }
        exit() {
            qq.exitMiniProgram({});
        }
        getLaunchOptionsSync() {
            return qq.getLaunchOptionsSync();
        }
        navigateToMiniProgram(opt) {
            qq.navigateToMiniProgram(opt);
        }
        getOpenDataContext() {
            return qq.getOpenDataContext();
        }
        createFeedbackButton(opt) {
            return qq.createFeedbackButton(opt);
        }
        openCustomerServiceConversation(obj) {
            qq.openCustomerServiceConversation(obj);
        }
        createGameClubButton(opt) {
            qq.createGameClubButton(opt);
        }
        onAudioInterruption(begincb, endcb) {
            qq.onAudioInterruptionBegin(begincb);
            qq.onAudioInterruptionEnd(endcb);
        }
        vibrateShort() {
            qq.vibrateShort({});
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        // 1、用户首次进入游戏判定场景值，2054进入的为白名单，以外的永久黑名单。
        // 2、白名单用户下次进入的场景值若是
        // 1001、1007、1008、1023、1027、1037、1038、1044、2001、2054
        // 3001、3002、3003、3008、3009、3010
        //则继续保持白名单，反之永黑。
        judgeBAndW(params) {
            let property = undefined;
            let sceneId = params.sceneId;
            if (!sceneId) {
                property = "black";
            }
            else {
                property = Laya.LocalStorage.getItem("BAndW");
                //首次登陆判断逻辑
                if (("white" !== property)
                    && ("black" !== property)) {
                    let safeSceneId = Sdk.getInstance().getServerJsonCfgSafeSceneId();
                    if (!safeSceneId) {
                        safeSceneId = [2054];
                    }
                    if (-1 !== safeSceneId.indexOf(sceneId)) {
                        property = "white";
                    }
                    else {
                        property = "black";
                    }
                }
                //二次判断逻辑
                // if ("white"===property
                // 	||"black"===property) {
                // 	if ("white"===property) {
                // 		if (1001!==sceneId
                // 			&&1007!==sceneId
                // 			&&1008!==sceneId
                // 			&&1023!==sceneId
                // 			&&1027!==sceneId
                // 			&&1037!==sceneId
                // 			&&1038!==sceneId
                // 			&&1044!==sceneId
                // 			&&2001!==sceneId
                // 			&&2054!==sceneId
                // 			&&3001!==sceneId
                // 			&&3002!==sceneId
                // 			&&3003!==sceneId
                // 			&&3008!==sceneId
                // 			&&3009!==sceneId
                // 			&&3010!==sceneId) {
                // 			property = "black";
                // 		}
                // 	}
                // } else {
                // 	//第一次进入
                // 	if (2054===sceneId) {
                // 		property = "white";
                // 	} else {
                // 		property = "black";
                // 	}
                // }
            }
            Laya.LocalStorage.setItem("BAndW", property);
            return (property === exports.BlackAndWhite.White) ? exports.BlackAndWhite.White : exports.BlackAndWhite.Black;
        }
        getCode() { return undefined; }
        ;
    }

    class TTShare {
        constructor() {
            /**视频地址**/
            this._videoPath = "";
            this.isRecording = false;
        }
        init(shareData) {
        }
        setShare(title, imgUrl, query) {
            wx.showShareMenu({
                withShareTicket: true,
            });
            query = query || "";
            // let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            // let GameCfg = Sdk.GameCfg as SdkGameCfg;
            tt.onShareAppMessage(function () {
                return {
                    title: title,
                    imageUrl: imgUrl,
                    query: query,
                    templateId: "96ejicae6f35i24ojp",
                };
            }.bind(this));
        }
        share(args1, args2, args3) {
            let title = null, imgUrl = null, queryParam = null, source = null;
            if (args1 instanceof RewardGainWayParams) {
                title = args1.title;
                imgUrl = args1.imgUrl;
                queryParam = args1.queryParam;
                source = args1.source;
            }
            else {
                title = args1;
                imgUrl = args2;
                queryParam = args3;
                source = "未知";
            }
            let query = ``;
            if (queryParam) {
                EventCenter.getInstance().once(BaseEvent.E_APP_ON_RESUME, this, function (res) {
                    Utils.showTips("感谢分享!!!");
                });
                for (let key in queryParam) {
                    let info = queryParam[key];
                    if (info != undefined) {
                        if (typeof (info) == "object") {
                            info = JSON.stringify(info);
                        }
                        if (query == undefined) {
                            query = key + '=' + info;
                        }
                        else {
                            query = query + '&' + key + '=' + info;
                        }
                    }
                }
            }
            console.log("wx share queryParam:" + JSON.stringify(queryParam), query);
            // let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            // let GameCfg = Sdk.GameCfg as SdkGameCfg;
            tt.shareAppMessage({
                title: title,
                imageUrl: imgUrl,
                query: query,
                templateId: "96ejicae6f35i24ojp"
            });
        }
        canRecord() {
            return !!tt.getGameRecorderManager;
        }
        /**
         *
         * @param data{ duration:10(默认10秒,最大值120(2分钟))}
         * 开始录屏
         */
        recordVideo(data) {
            if (this.isRecording) {
                return;
            }
            this.isRecording = true;
            if (!this._recorder)
                this._recorder = tt.getGameRecorderManager();
            //设置录屏的时间长度
            this._recorder.start({
                duration: data.duration
            });
            //录屏开始
            this._recorder.onStart(function (res) {
                console.log("录屏开始 res:" + JSON.stringify(res));
                EventCenter.getInstance().event(SdkUIEvent.E_RECORD_VIDEO_START);
            });
            //录屏结束
            this._recorder.onStop((res) => {
                //监听录屏结束事件
                console.log("录屏结束 res.videoPath:" + res.videoPath);
                this._videoPath = res.videoPath;
                this.isRecording = false;
                EventCenter.getInstance().event(SdkUIEvent.E_RECORD_VIDEO_END, res.videoPath);
            });
            // 记录当前时刻前10秒，后10秒，支持多次调用
            this._recorder.recordClip({
                timeRange: [10, 10]
            });
            //监听录屏错误事件
            this._recorder.onError((errMsg) => {
                console.error("录屏错误 errMsg:" + errMsg);
                this.isRecording = false;
                EventCenter.getInstance().event(SdkUIEvent.E_RECORD_VIDEO_END, undefined);
            });
            //监听录屏中断开始
            this._recorder.onInterruptionBegin(() => {
                //录屏中断，需要调用暂停
                this.pause();
            });
            //监听录屏中断结束
            this._recorder.onInterruptionEnd(() => {
                //录屏结束，需要调用恢复
                this.resume();
            });
        }
        /**录屏结束**/
        stopRecord() {
            if (this._recorder && this.isRecording) {
                this._recorder.stop();
            }
        }
        /**录屏暂停**/
        pause() {
            if (this._recorder) {
                //录屏暂停
                this._recorder.onPause(function () {
                    //监听录屏暂停事件
                });
                this._recorder.pause();
            }
        }
        /**录屏恢复**/
        resume() {
            if (this._recorder) {
                //录屏恢复
                this._recorder.onResume(function () {
                    //监听录屏继续事件
                });
                this._recorder.resume();
            }
        }
        /**发布视频**/
        shareVideo(url) {
            url = url || this._videoPath;
            if (!url) {
                return;
            }
            tt.shareAppMessage({
                title: "快来陪我一起玩 “疯狂购物” 小游戏吧~",
                channel: "video",
                extra: {
                    videoPath: url,
                    videoTopics: ["快来陪我一起玩 “疯狂购物” 小游戏吧~", "快来陪我一起玩 “疯狂购物” 小游戏吧~"],
                },
                templateId: "96ejicae6f35i24ojp",
                success: () => {
                    //发布成功
                    Utils.showTips("发布视频成功!");
                    EventCenter.getInstance().event(SdkUIEvent.E_SHARE_RESULT, { code: exports.SdkCode.SHARE_SUCCESS });
                },
                fail: () => {
                    //发布视频失败
                    Utils.showTips("发布视频失败!");
                    EventCenter.getInstance().event(SdkUIEvent.E_SHARE_RESULT, { code: exports.SdkCode.SHARE_FAILED });
                },
            });
        }
    }
    TTShare.aldShareEnable = false;
    ;
    Laya.ClassUtils.regClass("TTShare", TTShare);

    class TTAdv {
        constructor() {
            //初始化banner
            this.banners = [];
            this.videos = [];
            this.interstitial = [];
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        loadVideo(videoId, isPlay = false) {
            let video = this.getVideoById(videoId);
            if (!video) {
                video = { id: videoId, inst: null, state: exports.VideoState.UNLOAD };
                this.videos.push(video);
            }
            if (!video.inst) {
                video.inst = tt.createRewardedVideoAd({ adUnitId: video.id });
                video.inst.onLoad(() => {
                    console.log('激励视频广告加载成功');
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    video.state = exports.VideoState.ENABLED;
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_SUCCESS });
                    if (isPlay)
                        this.showVideo(video.id);
                });
                video.inst.onError((err) => {
                    console.log('激励视频广告加载失败');
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    video.state = exports.VideoState.UNENABLED;
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                });
                video.inst.onClose((res) => {
                    // 用户点击了【关闭广告】按钮
                    // 小于 2.1.0 的基础库版本，res 是一个 undefined
                    if ((res && res.isEnded) || (res === undefined)) {
                        // 正常播放结束，可以下发游戏奖励
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                    }
                    else {
                        // 播放中途退出，不下发游戏奖励
                        (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                        EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                    }
                });
            }
            else {
                video.inst.load()
                    .catch((err) => {
                    video.state = exports.VideoState.UNENABLED;
                    console.log('激励视频广告显示失败');
                });
            }
        }
        showVideo(videoId) {
            let video = this.getVideoById(videoId);
            if (!video || !video.inst)
                return;
            video.inst.show()
                .then(() => {
                '激励视频广告显示';
            })
                .catch(() => {
                video.inst.load()
                    .then(() => video.inst.show())
                    .catch((err) => {
                    video.state = exports.VideoState.UNENABLED;
                    console.log('激励视频广告显示失败');
                });
            });
        }
        preloadVideo(videoId) {
            let videoState = this.getVideoState(videoId);
            if (exports.VideoState.UNLOAD === videoState)
                this.loadVideo(videoId);
        }
        getVideoState(videoId) {
            let video = this.getVideoById(videoId);
            if (!video)
                return exports.VideoState.UNLOAD;
            return video.state;
        }
        playVideo(videoId) {
            console.log("video Id", videoId);
            let videoState = this.getVideoState(videoId);
            if (exports.VideoState.UNLOAD === videoState) {
                Laya.MouseManager.enabled = false;
                this.loadVideo(videoId, true);
            }
            else {
                if (exports.VideoState.ENABLED === videoState) {
                    Laya.MouseManager.enabled = false;
                    this.showVideo(videoId);
                }
                else if (exports.VideoState.UNENABLED === videoState) {
                    Utils.showTips("暂无视频!!!");
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_LOAD_FAIL });
                }
            }
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                (!customParams) && (customParams = { forever: false, widthScaleRate: 1 });
                (!customParams.widthScaleRate) && (customParams.widthScaleRate = 1);
                customParams.forever = Boolean(customParams.forever);
                banner = { id: bannerId, state: exports.AdState.LOADING, inst: null, showCnt: 0, createStamp: Utils.getTime(), customParams: customParams };
                this.banners.push(banner);
            }
            else {
                if (!customParams) {
                    customParams = banner.customParams;
                }
            }
            if (!banner.inst) {
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                let phone = Sdk.getInstance().getSystemInfo();
                let bannerWidth = phone.screenWidth * customParams.widthScaleRate;
                banner.inst = tt.createBannerAd({
                    adUnitId: bannerId,
                    style: {
                        left: 0,
                        top: 0,
                        width: bannerWidth,
                    },
                });
                banner.inst.onResize((res) => {
                    banner.inst.style.left = (phone.screenWidth - res.width) / 2;
                    banner.inst.style.top = phone.screenHeight - res.height;
                    //ios全面屏上移banner
                    if (-1 !== phone.system.indexOf("iOS")
                        && Utils.isQMP()) {
                        banner.inst.style.top -= 24;
                    }
                });
                banner.inst.onLoad(() => {
                    console.log('bannerid${bannerIds[i]} 广告加载成功');
                    banner.state = exports.AdState.LOAD;
                    if (banner.customParams.forever)
                        banner.inst.show();
                });
                banner.inst.onError((err) => {
                    console.log('bannerid${bannerIds[i]} 广告加载失败');
                    banner.state = exports.AdState.LOAD_FAIL;
                });
            }
            else {
                if (exports.AdState.DELETING === banner.state
                    || exports.AdState.LOAD_FAIL === banner.state) {
                    banner.inst.destroy();
                    banner.inst = null;
                    banner.showCnt = 0;
                    banner.state = exports.AdState.LOADING;
                    this.preloadBanner(bannerId);
                }
            }
        }
        showBanner(bannerId, customParams) {
            console.log("banner Id", bannerId);
            let banner = this.getBannerById(bannerId);
            if (!banner) {
                this.preloadBanner(bannerId, customParams);
            }
            else {
                if (banner.customParams.forever)
                    return;
                if (exports.AdState.LOAD === banner.state) {
                    banner.showCnt++;
                    banner.inst.show();
                }
                else {
                    if (exports.AdState.LOAD_FAIL === banner.state)
                        this.preloadBanner(bannerId);
                    else if (exports.AdState.LOADING === banner.state) {
                        if (customParams && customParams.isPostLoadedShow) {
                            Laya.timer.once(1000, this, function () {
                                this.showBanner(bannerId, customParams);
                            });
                        }
                    }
                }
            }
        }
        hideBanner(bannerId) {
            let banner = this.getBannerById(bannerId);
            if (!banner)
                return;
            if (banner.customParams.forever)
                return;
            if (banner.inst)
                banner.inst.hide();
            //删除banner
            if (banner.showCnt > 0) {
                banner.state = exports.AdState.DELETING;
                this.preloadBanner(bannerId);
            }
        }
        getBannerById(bannerId) {
            return this.banners.filter((v, idx, arr) => { return (v.id === bannerId); }, this)[0];
        }
        showInterstitial(id) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let curVersion = Sdk.getInstance().getSystemInfo().SDKVersion;
            if (!Utils.compatibleVersion(curVersion, "2.6.0")) {
                return;
            }
            let interstitial = this.getInterstitial(id);
            if (!interstitial) {
                let inst = tt.createInterstitialAd({
                    adUnitId: id,
                });
                this.interstitial.push({ id: id, inst: inst });
                inst.onLoad(() => {
                    console.log('interstitial 广告加载成功');
                });
                inst.onError((err) => {
                    console.log('interstitial 广告加载失败');
                });
                inst.onClose(res => {
                    console.log('插屏 广告关闭');
                });
            }
            else {
                interstitial.inst.show();
            }
        }
        getInterstitial(id) {
            let interstitials = this.interstitial.filter((v, idx, arr) => { return v.id === id; }, this);
            return interstitials[0];
        }
        preloadInterstitial(id) {
        }
        init(customParams) {
        }
        preloadNativeAd(nativeAds) { }
        showNativeAd(parent, pos) { }
        destoryNativeAd() { }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }
    TTAdv.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    class TTRewardStrategy {
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
        }
        getStrategy() {
            return exports.GetRewardSDKWay.VIDEO;
        }
        runStrategy() {
            this.playVideo(this.curParams);
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (exports.VideoState.UNENABLED === Sdk.getInstance().isHasVideo(this.curParams.id)) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦,明天再看吧!");
                EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Utils.showTips("看完视频才会有奖励哟！！！");
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                    else if (exports.SdkCode.AD_VIDEO_LOAD_FAIL === event.code) {
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                });
                Laya.MouseManager.enabled = false;
                Sdk.getInstance().playVideo(params.id);
            }
        }
    }
    ;

    // 微信数据解析
    function pf_wxInfo_to_playerInfo$3(wxInfo, userInfo) {
        if (wxInfo.nickName != undefined)
            userInfo.name = wxInfo.nickName;
        if (wxInfo.avatarUrl != undefined)
            userInfo.headUrl = wxInfo.avatarUrl;
        if (wxInfo.gender != undefined)
            userInfo.sex = wxInfo.gender;
        if (wxInfo.city != undefined)
            userInfo.city = wxInfo.city;
        if (wxInfo.province != undefined)
            userInfo.province = wxInfo.province;
        if (wxInfo.country != undefined)
            userInfo.country = wxInfo.country;
        if (wxInfo.language != undefined)
            userInfo.language = wxInfo.language;
    }
    class TTLogin extends BaseEventDispatcher {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
            super();
        }
        initMiniAdapter() { }
        ;
        engineInitialized() { }
        ;
        // 登录微信
        login() {
            tt.login({
            // success: this.wxloginSucc.bind(this),
            // fail: this.wxloginFail.bind(this)
            });
            tt.getSetting({
                success: this.onSettings.bind(this)
            });
            //监听网络状态
            this.networkstate = "none";
            tt.getNetworkType({ success: (res) => {
                    console.log('>>>>>>>>>>>>>>>>> getNetworkType: ', res.networkType);
                    this.networkstate = res.networkType;
                } });
            tt.onNetworkStatusChange((res) => {
                console.log('>>>>>>>>>>>>>>>>> onNetworkStatusChange: ', res.isConnected, res.networkType);
                this.networkstate = res.networkType;
            });
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "OPPO登录成功！" });
        }
        request(url, data, handler, method) {
            console.log('>>>>>>>>>>>>>>>>> request: ', url, data);
            tt.request({
                url: url,
                data: data,
                method: method,
                dataType: 'json',
                success: res => {
                    console.log('<<<<<<<<<<<<<<<<< request: ', res);
                    if (handler) {
                        handler.runWith(res.data);
                    }
                },
                fail: err => {
                    console.log('<<<<<<<<<<<<<<<<< request error: ', err);
                    Utils.showTips('获取服务器JSON配置失败！');
                }
            });
        }
        getShareInstance() {
            return new TTShare();
        }
        getAdvInstance() {
            return new TTAdv();
        }
        getStatInstance() {
            return null;
        }
        getRewardStrInstance() {
            return new TTRewardStrategy();
        }
        onSettings(res) {
            let settings = res.authSetting;
            this.isUserInfoAuth = !!settings["scope.userInfo"];
            if (this.isUserInfoAuth) {
                tt.getUserInfo({
                    success: this.userInfoSucc.bind(this)
                });
            }
            if (this.code) {
                this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "微信登录成功" });
            }
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return this.query;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 微信授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
                this.query = res.query;
                SdkMsg.getInstance().postShareQuery(res.query);
            }
        }
        wxloginSucc(res) {
            console.log("微信登录成功！");
            let tryCount = 10;
            const checkNeedFix = () => {
                if (!this.menuInfo || this.menuInfo.top > 0 || tryCount <= 0) {
                    this.code = res.code;
                    // 登录服务器
                    if (this.isLoginServer()) {
                        SdkMsg.getInstance().login(this.code, launchParams.query);
                    }
                    if (this.isUserInfoAuth !== undefined) {
                        this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "微信登录成功" });
                    }
                    return false;
                }
                tryCount--;
                return true;
            };
            const fixInfo = () => {
                // 修正系统信息和胶囊信息
                this.getSystemInfo(true);
                this.getMenuButtonBoundingClientRect(true);
                if (!checkNeedFix()) {
                    // 获取成功
                    Utils.sNotchScreen = undefined; // 重置适配信息
                    Laya.timer.clear(this, fixInfo);
                }
            };
            let launchParams = tt.getLaunchOptionsSync();
            this.query = launchParams.query;
            if (checkNeedFix()) {
                Laya.timer.loop(100, this, fixInfo);
            }
        }
        wxloginFail() {
            console.log("微信登录失败！");
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_FAILED, msg: "微信登录失败" });
        }
        userInfoSucc(info) {
            let userInfo;
            if (info.userInfo) {
                console.log("获取用户信息成功！" + JSON.stringify(info));
                this.isUserInfoAuth = true;
                this.encryptedData = info.encryptedData;
                this.iv = info.iv;
                this.destroyUserInfoButton();
                // 解析并更新
                userInfo = new exports.SDKEntity.UserInfoEntity();
                pf_wxInfo_to_playerInfo$3(info.userInfo, userInfo);
                UserLogic.getInstance().update(userInfo);
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_SUCCESS, msg: "授权成功" });
            }
            else {
                console.log("获取用户信息失败！");
                this.event(SdkUIEvent.E_USER_INFO, { code: exports.SdkCode.WX_AUTH_FAILED, msg: "用户拒绝授权" });
            }
            // 发送到服务器
            if (this.profileToServer) {
                SdkMsg.getInstance().postProfile(userInfo);
            }
        }
        createUserInfoButton() {
            let btn = this.profileBtn;
            let leftTop = btn.localToGlobal(new Laya.Point(0, 0));
            let rightBottom = btn.localToGlobal(new Laya.Point(btn.width, btn.height));
            let points = [];
            Laya.stage.transform.transformPoint(leftTop);
            Laya.stage.transform.transformPoint(rightBottom);
            let width = rightBottom.x - leftTop.x;
            let height = rightBottom.y - leftTop.y;
            let button = tt.createUserInfoButton({
                type: 'text',
                text: '',
                style: {
                    left: leftTop.x,
                    top: leftTop.y,
                    width: width,
                    height: height,
                },
                withCredentials: true,
                lang: 'zh_CN',
            });
            button.show();
            button.onTap(this.userInfoSucc.bind(this));
            this.profileBtn = button;
            btn.once(Laya.Event.REMOVED, this, this.destroyUserInfoButton);
        }
        destroyUserInfoButton() {
            if (this.profileBtn)
                this.profileBtn.destroy();
            this.profileBtn = null;
        }
        setKeepScreenOn(opt) {
            // 设置屏幕常亮
            tt.setKeepScreenOn(opt);
        }
        onShow(cb) {
            tt.onShow(cb);
        }
        onHide(cb) {
            tt.onHide(cb);
        }
        checkUpdate() {
            if (typeof tt.getUpdateManager === 'function') { // 请在使用前先判断是否支持
                const updateManager = tt.getUpdateManager();
                updateManager.onCheckForUpdate(function (res) {
                    // 请求完新版本信息的回调
                    console.log(res.hasUpdate);
                });
                updateManager.onUpdateReady(() => {
                    this.showModal('有新版本啦！，赶快开启新的历程吧~', '更新提示', '开启', Laya.Handler.create(this, () => {
                        updateManager.applyUpdate();
                    }));
                });
                updateManager.onUpdateFailed(function () {
                    // 新的版本下载失败
                    console.log('新的版本下载失败');
                });
            }
        }
        loadSubpackage(opt) {
            if (!tt.loadSubpackage) {
                this.showModal('请升级微信到最新版本！', '提示', '确定', Laya.Handler.create(this, () => {
                    this.exit();
                }), '');
                return;
            }
            return tt.loadSubpackage(opt);
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
            tt.showModal({
                title: title,
                content: content,
                showCancel: cancelTxt != "" && cancelTxt != undefined,
                cancelText: cancelTxt,
                confirmText: okTxt,
                success: (res) => {
                    if (res.confirm) {
                        if (okHandler) {
                            okHandler.run();
                        }
                    }
                    else {
                        if (cancelTxt) {
                            if (cancelHandler) {
                                cancelHandler.run();
                            }
                        }
                    }
                }
            });
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            this.systemInfo = tt.getSystemInfoSync();
            console.log("getSystemInfoSync: " + JSON.stringify(this.systemInfo));
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            if (!force && this.menuInfo) {
                return this.menuInfo;
            }
            if (Utils.compareVersion(this.systemInfo.SDKVersion, "2.1.0") >= 0) {
                this.menuInfo = tt.getMenuButtonBoundingClientRect();
                console.log("getMenuButtonBoundingClientRect: " + JSON.stringify(this.menuInfo));
            }
            return this.menuInfo;
        }
        exit() {
            tt.exitMiniProgram({});
        }
        getLaunchOptionsSync() {
            return tt.getLaunchOptionsSync();
        }
        navigateToMiniProgram(opt) {
            tt.navigateToMiniProgram(opt);
        }
        getOpenDataContext() {
            return tt.getOpenDataContext();
        }
        createFeedbackButton(opt) {
            return tt.createFeedbackButton(opt);
        }
        openCustomerServiceConversation(obj) {
            tt.openCustomerServiceConversation(obj);
        }
        createGameClubButton(opt) {
            tt.createGameClubButton(opt);
        }
        onAudioInterruption(begincb, endcb) {
            tt.onAudioInterruptionBegin(begincb);
            tt.onAudioInterruptionEnd(endcb);
        }
        vibrateShort() {
            tt.vibrateShort({});
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        // "1、用户首次进入游戏判定场景值，1095、1037、1058进入的为白名单，以外的永久黑名单。
        // 2、白名单用户下次进入的场景值若是1037、1044、1007、1104、1008、1001、1038、1090、1103、1089、1095则继续保持白名单，反之永黑。"
        judgeBAndW(params) {
            let sceneId = params.sceneId;
            if (!sceneId) {
                return exports.BlackAndWhite.Black;
            }
            let property = Laya.LocalStorage.getItem("BAndW");
            if ("white" === property
                || "black" === property) {
                if ("white" === property) {
                    if (1037 !== sceneId
                        && 1044 !== sceneId
                        && 1007 !== sceneId
                        && 1104 !== sceneId
                        && 1008 !== sceneId
                        && 1001 !== sceneId
                        && 1038 !== sceneId
                        && 1090 !== sceneId
                        && 1103 !== sceneId
                        && 1089 !== sceneId
                        && 1095 !== sceneId) {
                        property = "black";
                        Laya.LocalStorage.setItem("BAndW", property);
                    }
                }
            }
            else {
                //第一次进入
                if (1095 === sceneId
                    || 1037 === sceneId
                    || 1058 === sceneId) {
                    property = "white";
                }
                else {
                    property = "black";
                }
                Laya.LocalStorage.setItem("BAndW", property);
            }
            return (property === exports.BlackAndWhite.White) ? exports.BlackAndWhite.White : exports.BlackAndWhite.Black;
        }
        getCode() { return undefined; }
        ;
    }

    class QTTAdv {
        constructor() {
            //初始化banner
            this.banners = [];
            this.videos = [];
            this.interstitial = [];
            this.nativeAd = undefined;
        }
        getVideoById(videoId) {
            return this.videos.filter((v, idx, arr) => { return videoId === v.id; })[0];
        }
        showVideo(videoId) {
        }
        preloadVideo(videoId) {
        }
        getVideoState(videoId) {
            return exports.VideoState.ENABLED;
        }
        playVideo(videoId) {
            var options = {};
            options.gametype = 1; //互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
            options.rewardtype = 1; //互动广告框，只有 1
            options.data = {};
            options.data.title = "刷新道具"; //互动抽中奖后的道具提示文字
            options.data.url = "//newidea4-gamecenter-frontend.1sapp.com/game/prod/fkxxl_img/1.png"; //互动抽中奖后的道具图标(可选)
            qttGame.showVideo((res) => {
                if (res == 1) {
                    //播放完成，发放奖励
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                }
                else if (res == 2) {
                    // 播放中途退出，不下发游戏奖励
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                }
                else {
                    //res = 0    填充不足
                    var options1 = {};
                    options1.gametype = 1; //互动游戏类型，1(砸金蛋)  2(laba)  3(大转盘)
                    options1.rewardtype = 1; //互动广告框，只有 1
                    options1.data = {};
                    options1.data.title = "获得奖励"; //互动抽中奖后的道具提示文字
                    options1.callback = (res) => {
                        //回调函数
                        if (res == 1) {
                            //播放完成，发放奖励
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                        }
                        else {
                            //res = 0    填充不足
                            (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                            EventCenter.getInstance().event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_UNCOMPLETE });
                        }
                    };
                    qttGame.showHDAD(options1);
                }
            }, options);
            if (!Laya.MouseManager.enabled) {
                Laya.timer.once(10000, this, function () {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                });
            }
        }
        preloadBanner(bannerId, customParams) {
        }
        showBanner(bannerId, customParams) {
            qttGame.showBanner();
        }
        hideBanner(bannerId) {
            qttGame.hideBanner();
        }
        getBannerById(bannerId) {
            return this.banners.filter((v, idx, arr) => { return (v.id === bannerId); }, this)[0];
        }
        showInterstitial(id) {
            var options = {};
            options["index"] = 1; //广告位置（1，2，3，4...）
            options["rewardtype"] = 1; //互动广告框，只有 1
            qttGame.showHDReward(options);
        }
        getInterstitial(id) {
            return null;
        }
        preloadInterstitial(id) {
        }
        init(customParams) {
        }
        preloadNativeAd(nativeAds) { }
        showNativeAd(parent, pos) { }
        destoryNativeAd() { }
        preloadAppbox(appBoxID) { }
        showAppBox() { }
        hideAppBox() { }
        destoryAppBox() { }
        getAppBoxData() { return null; }
    }
    QTTAdv.BannerRefreshTime = 40000; //banner刷新时间, 单位毫秒

    class QTTRewardStrategy {
        setCurStrategy(s, params) {
            this.curStrategy = s;
            this.curParams = params;
        }
        getStrategy() {
            return exports.GetRewardSDKWay.VIDEO;
        }
        runStrategy() {
            this.playVideo(this.curParams);
        }
        playVideo(params) {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            if (exports.VideoState.UNENABLED === Sdk.getInstance().isHasVideo(this.curParams.id)) { //没有视频,自动切换未分享获得奖励
                Utils.showTips("今天已经没有视频啦,明天再看吧!");
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    (!Laya.MouseManager.enabled) && (Laya.MouseManager.enabled = true);
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            gid: params.bindCtrlGId,
                        });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Utils.showTips("看完视频才会有奖励哟！！！");
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL, gid: params.bindCtrlGId });
                    }
                });
                Laya.MouseManager.enabled = false;
                Sdk.getInstance().playVideo(params.id);
            }
        }
    }
    ;

    // oppo数据解析
    function pf_oppoInfo_to_playerInfo$1(oppoInfo, userInfo) {
        if (oppoInfo.openid != undefined)
            userInfo.openId = oppoInfo.openid;
        if (oppoInfo.uid != undefined)
            userInfo.userId = oppoInfo.uid;
        if (oppoInfo.nickname != undefined)
            userInfo.name = oppoInfo.nickname;
        if (oppoInfo.avatar != undefined)
            userInfo.headUrl = oppoInfo.avatar;
        return userInfo;
    }
    class QTTLogin extends BaseEventDispatcher {
        // private customerAboutData = {startTime:0,endTime:0};
        constructor() {
            super();
        }
        initMiniAdapter() { }
        engineInitialized() { }
        ;
        login() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            Sdk.getInstance().adIds = { videoId: "111111", bannerId: "222222", interstitialId: "333333" };
            this.event(SdkEvent.E_SDK_LOGIN, { code: exports.SdkCode.WX_LOGIN_SUCCESS, msg: "QTT登录成功！" });
        }
        request(url, data, handler, method) {
            console.log('>>>>>>>>>>>>>>>>> request: ', url, data);
        }
        getShareInstance() {
            return null;
        }
        getAdvInstance() {
            return new QTTAdv();
        }
        getStatInstance() {
            return null;
        }
        getRewardStrInstance() {
            return new QTTRewardStrategy();
        }
        isAuth() {
            return this.isUserInfoAuth;
        }
        isLoginServer() {
            let Sdk = Laya.ClassUtils.getRegClass('Sdk');
            let GameCfg = Sdk.GameCfg;
            return GameCfg.server_url != "";
        }
        getQuery() {
            return undefined;
        }
        getEncryptedData() {
            return [this.encryptedData, this.iv];
        }
        // 微信授权
        auth(authBtn) {
            this.profileBtn = authBtn;
            this.profileToServer = this.isLoginServer();
            this.createUserInfoButton();
        }
        onResume(res) {
            // if (res.query && !Utils.isEmpty(res.query) && this.isLoginServer()) {
            // 	this.query = res.query;
            // 	SdkMsg.getInstance().postShareQuery(res.query);
            // }
        }
        createUserInfoButton() {
        }
        destroyUserInfoButton() {
        }
        setKeepScreenOn(opt) {
        }
        onShow(cb) {
        }
        onHide(cb) {
        }
        checkUpdate() {
        }
        loadSubpackage(opt) {
            return null;
        }
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
        }
        getSystemInfo(force) {
            if (!force && this.systemInfo) {
                return this.systemInfo;
            }
            return this.systemInfo;
        }
        getMenuButtonBoundingClientRect(force) {
            this.menuInfo = {
                width: 0,
                height: 0,
                top: 0,
                right: 0,
                bottom: Laya.stage.height,
                left: Laya.stage.width,
            };
            return this.menuInfo;
        }
        exit() {
        }
        getLaunchOptionsSync() {
            return null;
        }
        navigateToMiniProgram(opt) {
        }
        getOpenDataContext() {
        }
        createFeedbackButton(opt) {
        }
        openCustomerServiceConversation(obj) {
        }
        createGameClubButton(opt) {
        }
        onAudioInterruption(begincb, endcb) {
        }
        vibrateShort() {
        }
        ;
        getNetworkType() {
            return this.networkstate;
        }
        isConnectNetwork() {
            console.log("networkstate: ", this.networkstate);
            if ("none" === this.networkstate) {
                return false;
            }
            else {
                return true;
            }
        }
        judgeBAndW(params) { return exports.BlackAndWhite.White; }
        getCode() { return undefined; }
        ;
    }

    /*
     * Created on Thu Feb 14 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class BaseScene extends Laya.Scene {
        constructor() {
            super();
            this.once(Laya.Event.ADDED, this, this.addToStage);
            this.once(Laya.Event.REMOVED, this, this.removeFromStage);
            this.views = [];
        }
        get curView() {
            return this._curView;
        }
        set curView(view) {
            this._curView = view;
        }
        removeView(view) {
            if (view) {
                if (this._curView == view) {
                    if (this.views.length > 1) {
                        throw Error('please use SceneManager.popView instead !!!');
                    }
                    else {
                        this.views.clear();
                        this._curView = null;
                    }
                }
                else {
                    let index = this.views.indexOf(view);
                    if (index != -1) {
                        this.views.splice(index, 1);
                    }
                }
            }
        }
        pushView(view) {
            if (view) {
                let index = this.views.indexOf(view);
                if (index == -1) {
                    this.views.push(view);
                    this.addChild(view);
                    view.on(Laya.Event.REMOVED, this, this.removeView, [view]);
                }
            }
            if (this.views.length > 1) {
                let self = this;
                self.lastView = this.views[this.views.length - 2];
            }
            else {
                let self = this;
                self.lastView = null;
            }
        }
        popView() {
            let view = this.views.pop();
            if (view) {
                view.removeSelf();
            }
            if (this.views.length > 1) {
                let self = this;
                self.lastView = this.views[this.views.length - 2];
            }
            else {
                let self = this;
                self.lastView = null;
            }
        }
        static getRes() { return null; }
        ;
        enter(...args) {
            console.log(Utils.getClassName(this) + " enter!");
            this.onEnter(...args);
        }
        exit() {
            console.log(Utils.getClassName(this) + " exit!");
            this.onExit();
        }
        actived() {
            console.log(Utils.getClassName(this) + " actived!");
            this.onActive();
        }
        deactived() {
            console.log(Utils.getClassName(this) + " deactived!");
            this.onDeactive();
        }
        onAdd() { }
        ;
        onRemove() { }
        ;
        onEnter(...args) { }
        ;
        onExit() { }
        ;
        onActive() { }
        ;
        onDeactive() { }
        ;
        close(type) {
            this.closeType = type;
            super.close(type);
        }
        removeSelf() {
            if (!this.closeType) {
                throw Error("BaseScene can not removeSelf, use SceneManager.changeScene instead!");
            }
            return super.removeSelf();
        }
        addToStage() {
            this.size(Laya.stage.width, Laya.stage.height);
            this.onAdd();
        }
        removeFromStage() {
            this.offAll();
            this.timer.clearAll(this);
            this.onRemove();
        }
        loadScene(url) {
            this.url = url;
            this.frameOnce(1, this, super.loadScene, [url]);
        }
        getModuleRegName() {
            let module = Utils.getModule(this);
            let classMap = Laya.ClassUtils._classMap;
            for (const key in classMap) {
                if (classMap.hasOwnProperty(key) && classMap[key] == module) {
                    return key;
                }
            }
            return null;
        }
        getModuleUrlName() {
            let urlName = "";
            if (this.url) {
                let sPos = this.url.indexOf("/");
                if (-1 !== sPos) {
                    urlName = this.url.substring(sPos + 1);
                }
            }
            return urlName;
        }
    }
    // mix
    Utils.applyMixins(BaseScene, [BaseEventDispatcher], Laya.Scene);
    Laya.ClassUtils.regClass('Scene', BaseScene);

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class BaseView extends Laya.View {
        constructor(...args) {
            super();
            this['$_GID'] = Laya.Utils.getGID();
            this.isAdapt = false;
            this.once(Laya.Event.ADDED, this, this.addToStage);
            this.once(Laya.Event.REMOVED, this, this.removeFromStage);
            this.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.on(Laya.Event.CLICK, this, this.clicked);
        }
        getGID() {
            return this['$_GID'];
        }
        isAdapted() {
            return this.isAdapt;
        }
        static getRes() { return null; }
        ;
        enter(...args) {
            console.log(Utils.getClassName(this) + " enter!");
            this.onEnter(...args);
        }
        exit() {
            console.log(Utils.getClassName(this) + " exit!");
            this.onExit();
        }
        actived() {
            console.log(Utils.getClassName(this) + " actived!");
            this.onActive();
        }
        deactived() {
            console.log(Utils.getClassName(this) + " deactived!");
            this.onDeactive();
        }
        onAdd() { }
        ;
        onRemove() { }
        ;
        onEnter(...args) { }
        ;
        onExit() { }
        ;
        onActive() { }
        ;
        onDeactive() { }
        ;
        onMouseDown(e) { return this.mouseThrough; }
        ;
        onClicked(e) { return this.mouseThrough; }
        ;
        onLayout(notchInfo) { }
        ;
        getBgComp() {
            let img_bg = this.getChildByName("img_bg");
            return img_bg;
        }
        disableAdapt() {
            this.isAdapt = null;
        }
        mouseDown(e) {
            let propagate = this.onMouseDown(e);
            if (propagate === false) {
                e.stopPropagation();
            }
        }
        clicked(e) {
            let propagate = this.onClicked(e);
            if (propagate === false) {
                e.stopPropagation();
            }
        }
        // parent for E_UI_ADAPTED event callback 
        adaptScreen(parent) {
            if (this.isAdapt === null) {
                return;
            }
            if (this.isAdapt) {
                this.onLayout();
                return;
            }
            // 获取父类
            parent = parent || this.getBaseViewParent(this.parent);
            if (parent && parent.isAdapted() == false) {
                parent.once(BaseEvent.E_UI_ADAPTED, this, this.adaptScreen);
                return;
            }
            this.isAdapt = true;
            this.left = this.top = this.bottom = this.right = this.centerX = this.centerY = undefined;
            let width = Laya.stage.width;
            let height = Laya.stage.height;
            if (parent) {
                width = parent.width;
                height = parent.height;
            }
            let changed = false;
            let self = this;
            if (self._width != width || self._height != height) {
                this.size(0, 0); // 强制设置，使之更新
                this.width = width;
                this.height = height;
                changed = true;
            }
            let img_bg = this.getBgComp();
            let notchInfo = Utils.isNotchScreenDevice();
            if (img_bg) {
                img_bg.x = img_bg.y = img_bg.anchorX = img_bg.anchorY = 0;
                if (this.origSize) {
                    img_bg.size(this.origSize.width, this.origSize.height);
                }
                else {
                    this.origSize = new Laya.Size(img_bg.width, img_bg.height);
                }
                if (notchInfo) {
                    Utils.adaptNode(img_bg, Laya.stage.width, Laya.stage.height, true);
                }
                else {
                    Utils.adaptNode(img_bg, width, height, true);
                }
            }
            if (notchInfo) {
                let notchTop = notchInfo.notchTop;
                let posPropName, centerPropName, widePropName;
                let wide = 0;
                if (Laya.stage.screenMode == Laya.Stage.SCREEN_VERTICAL) {
                    posPropName = "y";
                    centerPropName = "centerY";
                    widePropName = "height";
                    wide = height;
                }
                else {
                    posPropName = "x";
                    centerPropName = "centerX";
                    widePropName = "width";
                    wide = width;
                }
                if (parent && parent.isAdapted()) {
                    if (img_bg) {
                        notchInfo.exceed = Math.abs(wide - img_bg[widePropName]) * 0.5;
                        img_bg.centerX = img_bg.centerY = 0;
                        img_bg.centerX = img_bg.centerY = undefined;
                        img_bg[posPropName] = (Laya.stage[widePropName] - img_bg[widePropName]) * 0.5 - notchTop;
                    }
                }
                else {
                    this[posPropName] += notchTop;
                    this[widePropName] -= notchTop + notchInfo.notchBottom;
                    if (img_bg) {
                        notchInfo.exceed = Math.abs(wide - img_bg[widePropName]) * 0.5;
                        img_bg.centerX = img_bg.centerY = 0;
                        img_bg.centerX = img_bg.centerY = undefined;
                        img_bg[posPropName] = (Laya.stage[widePropName] - img_bg[widePropName]) * 0.5 - notchTop;
                    }
                    changed = true;
                }
            }
            else {
                if (img_bg) {
                    img_bg.centerX = 0;
                    img_bg.centerY = 0;
                    img_bg.centerX = img_bg.centerY = undefined;
                }
            }
            this.event(BaseEvent.E_UI_ADAPTED, this);
            if (changed) {
                this.once(Laya.Event.RESIZE, this, this.onLayout, [notchInfo]);
            }
            else {
                this.onLayout(notchInfo);
            }
        }
        getBaseViewParent(parent) {
            if (parent instanceof BaseScene) {
                return null;
            }
            else if (parent instanceof BaseView) {
                return parent;
            }
            else {
                return this.getBaseViewParent(parent.parent);
            }
        }
        addToStage() {
            let img_bg = this.getBgComp();
            if (img_bg && img_bg instanceof Laya.Image) {
                img_bg.left = img_bg.right = img_bg.top = img_bg.bottom = img_bg.centerX = img_bg.centerY = undefined;
                if (!img_bg.source) {
                    img_bg.width = img_bg.height = undefined;
                    img_bg.once(Laya.Event.LOADED, this, this.adaptScreen);
                }
                else {
                    (!img_bg.width) && (img_bg.width = img_bg.source.width);
                    (!img_bg.height) && (img_bg.height = img_bg.source.height);
                    this.frameOnce(1, this, this.adaptScreen);
                }
            }
            else {
                this.frameOnce(1, this, this.adaptScreen);
            }
            this.onAdd();
        }
        removeFromStage() {
            this.offAll();
            this.timer.clearAll(this);
            this.onRemove();
        }
        removeSelf(destroy = true) {
            let SceneManager = Laya.ClassUtils.getClass('SceneManager');
            if (SceneManager.isInUIStack(this)) {
                throw Error('already in ui stack, please use SceneManager to remove self !!!');
            }
            if (destroy) {
                this.destroy();
            }
            else {
                super.removeSelf();
            }
            return this;
        }
        loadScene(url) {
            this.url = url;
            this.frameOnce(1, this, super.loadScene, [url]);
        }
        getModuleRegName() {
            let module = Utils.getModule(this);
            let classMap = Laya.ClassUtils._classMap;
            for (const key in classMap) {
                if (classMap.hasOwnProperty(key) && classMap[key] == module) {
                    return key;
                }
            }
            return null;
        }
        getModuleUrlName() {
            let urlName = "";
            if (this.url) {
                let sPos = this.url.indexOf("/");
                if (-1 !== sPos) {
                    urlName = this.url.substring(sPos + 1);
                }
            }
            return urlName;
        }
    }
    // mix
    Utils.applyMixins(BaseView, [BaseEventDispatcher], Laya.View);
    Laya.ClassUtils.regClass('View', BaseView);

    /*
     * Created on Thu Feb 21 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class TweenSequence {
        constructor(node, handler) {
            this.node = node;
            this.stop();
            this.node.once(Laya.Event.REMOVED, this, this.onRemove);
            this.handler = handler;
            this._handler = new Laya.Handler(this, this.onComplete);
            this.tweenCount = 0;
            this.needRecover = this.needRemove = false;
            this._delayTime = 0;
            this._recoverProps = {};
        }
        onRemove() {
            this._recover();
            this.clear();
        }
        _recover() {
            for (var key in this._recoverProps) {
                if (this._recoverProps.hasOwnProperty(key)) {
                    this.node[key] = this._recoverProps[key];
                }
            }
        }
        clear() {
            this.stop();
            this.node = null;
            this._handler = null;
            this.tweenCount = 0;
            this.needRecover = this.needRemove = false;
            this._delayTime = 0;
            this._recoverProps = {};
        }
        onComplete() {
            this.tweenCount--;
            if (this.tweenCount == 0) {
                if (this.needRecover) {
                    this._recover();
                }
                if (this.handler) {
                    this.handler.run();
                    this.handler = null;
                }
                if (this.needRemove) {
                    this.node.removeSelf();
                }
                else {
                    this.clear();
                }
            }
        }
        addRecover(key, value) {
            if (!this._recoverProps[key]) {
                this._recoverProps[key] = value;
            }
        }
        stop() {
            Laya.Tween.clearTween(this.node);
        }
        pause() {
        }
        resume(restart) {
        }
        /**
          * 延迟
          * @param time
          */
        delay(time) {
            this._delayTime += time;
            return this;
        }
        hide() {
            this.addRecover('visible', this.node.visible);
            Laya.timer.once(this._delayTime, this.node, function () {
                this.node.visible = false;
                this.onComplete();
            }.bind(this));
            this.tweenCount++;
            return this;
        }
        show() {
            this.addRecover('visible', this.node.visible);
            Laya.timer.once(this._delayTime, this.node, function () {
                this.node.visible = true;
                this.onComplete();
            }.bind(this));
            this.tweenCount++;
            return this;
        }
        /**
          * 还原属性
          */
        recover() {
            this.needRecover = true;
            return this;
        }
        /**
          * 删除节点
          */
        removeNode() {
            this.needRemove = true;
        }
        /** 从指定大小缩放到原始大小
          * 缩放
          * @param scale
          * @param time
          */
        scaleIn(scale, time) {
            let scaleX = this.node.scaleX;
            let scaleY = this.node.scaleY;
            this.addRecover('scaleX', scaleX);
            this.addRecover('scaleY', scaleY);
            Laya.Tween.from(this.node, { scaleX: scale, scaleY: scale }, time, null, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        /**
          * // 从原始大小缩放到指定大小
          * @param scale
          * @param time
          */
        scaleOut(scale, time) {
            let scaleX = this.node.scaleX;
            let scaleY = this.node.scaleY;
            this.addRecover('scaleX', scaleX);
            this.addRecover('scaleY', scaleY);
            Laya.Tween.to(this.node, { scaleX: scale, scaleY: scale }, time, null, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        /**
          *
          * @param dist 距离
          * @param time 毫秒
          * @param ease 缓动函数
          */
        up(dist, time, ease) {
            this.addRecover('y', this.node.y);
            Laya.Tween.to(this.node, { y: this.node.y - dist }, time, ease, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        down(dist, time, ease) {
            this.addRecover('y', this.node.y);
            Laya.Tween.to(this.node, { y: this.node.y + dist }, time, ease, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        /**
          * 淡入
          * @param time
          * @param ease
          */
        fadeIn(time, ease) {
            this.addRecover('alpha', this.node.alpha);
            this.node.alpha = 0;
            Laya.Tween.to(this.node, { alpha: 1 }, time, ease, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        /**
          * 淡出
          * @param time
          * @param ease
          */
        fadeOut(time, ease) {
            this.addRecover('alpha', this.node.alpha);
            Laya.Tween.to(this.node, { alpha: 0 }, time, ease, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        /**
          * 运动到指定位置
          * @param x
          * @param y
          * @param time
          * @param ease
          */
        pos(x, y, time, ease) {
            this.addRecover('x', this.node.x);
            this.addRecover('y', this.node.x);
            Laya.Tween.to(this.node, { x: x, y: y }, time, ease, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
        /**
          * 从当前点移动x,y距离
          * @param x 水平移动距离
          * @param y 垂直移动距离
          * @param time
          * @param ease
          */
        move(x, y, time, ease) {
            this.addRecover('x', this.node.x);
            this.addRecover('y', this.node.x);
            Laya.Tween.to(this.node, { x: this.node.x + x, y: this.node.y + y }, time, ease, this._handler, this._delayTime);
            this.tweenCount++;
            return this;
        }
    }

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class Effect {
        static toneLight(sprite, factor) {
            // //由 20 个项目（排列成 4 x 5 矩阵）组成的数组，红色
            // let whiteMat: Array<number> =
            // 	[
            // 		1, 0, 0, 0, factor, //R
            // 		0, 1, 0, 0, factor, //G
            // 		0, 0, 1, 0, factor, //B
            // 		0, 0, 0, 1, 0, //A
            // 	];
            // //创建一个颜色滤镜对象
            // let whiteFilter: Laya.ColorFilter = new Laya.ColorFilter(whiteMat);
            // sprite.filters = [whiteFilter];
            let filter = new Laya.ColorFilter();
            filter.adjustBrightness(factor);
            sprite.filters = [filter];
        }
        static mixColor(sprite, color3I) {
            if (color3I) {
                let c;
                if (typeof color3I == 'string') {
                    c = Utils.colorHexTo3F(color3I);
                }
                else {
                    c = color3I;
                }
                let whiteMat = [
                    c.x, 0, 0, 0, 0,
                    0, c.y, 0, 0, 0,
                    0, 0, c.z, 0, 0,
                    0, 0, 0, 1, 0,
                ];
                //创建一个颜色滤镜对象
                let filter = new Laya.ColorFilter(whiteMat);
                sprite.filters = [filter];
            }
            else {
                sprite.filters = undefined;
            }
        }
        static setColor(sprite, color3I) {
            if (color3I) {
                let c;
                if (typeof color3I == 'string') {
                    c = color3I;
                }
                else {
                    c = Utils.getHexColorString(color3I.x, color3I.y, color3I.z);
                }
                let filter = new Laya.ColorFilter();
                filter.setColor(c);
                sprite.filters = [filter];
            }
            else {
                sprite.filters = undefined;
            }
        }
        static setColorGrayRGB(sprite, color3I) {
            if (color3I) {
                let luminance = Utils.getColorLumin3I(color3I);
                let filter = new Laya.ColorFilter();
                filter.gray();
                filter.adjustBrightness(luminance);
                sprite.filters = [filter];
            }
            else {
                sprite.filters = undefined;
            }
        }
        // 发光滤镜
        static glow(sprite, color, factor = 0) {
            let glowFilter = new Laya.GlowFilter(color, 10, factor, factor);
            sprite.filters = [glowFilter];
        }
        /**
          * 呼吸发光特效
          * @param sprite
          * @param time
          * @param strength
          * @param color
          * @param loop
          */
        // public static breathGlowEff(node:Laya.Sprite, time:number, factor:number, color:string, loop:boolean=true) {
        // 	let effNode:any = node;
        // 	let offset;
        // 	if (effNode.__breathGlowEff) {
        // 		offset = effNode.__breathGlowEff.o;
        // 		Laya.Tween.clearTween(offset);
        // 		node.filters = undefined;
        // 	} else {
        // 		offset = {factor:factor};
        // 		effNode.__breathGlowEff = {o:offset}
        // 	}
        // 	offset.factor = factor;
        // 	let updatefunc = new Laya.Handler(this, function(){
        // 		Effect.glow(node, color, offset.factor);
        // 	});
        // 	let anifunc = function() {
        // 		Laya.Tween.from(offset, {factor:0, update:updatefunc}, time >> 1, null, Laya.Handler.create(this, function(){
        // 			Laya.Tween.to(offset, {factor:0, update:updatefunc}, time >> 1, null, Laya.Handler.create(this, function(){
        // 				offset.factor = factor;
        // 				if (loop) {
        // 					return anifunc();
        // 				}
        // 			}));
        // 		}));
        // 	};
        // 	node.once(Laya.Event.REMOVED, this, this.stopBreathGlowEff, [node]);
        // 	anifunc();
        // }
        // public static stopBreathGlowEff(sprite:Laya.Sprite) {
        // 	let effNode:any = sprite;
        // 	if (effNode.__breathGlowEff) {
        // 		let offset = effNode.__breathGlowEff.o;
        // 		Laya.Tween.clearTween(offset);
        // 		sprite.filters = undefined;
        // 		effNode.__breathGlowEff = null;
        // 	}
        // }
        /**
          *
          * @param sprite
          * @param time 毫秒，闪烁时长
          * @param loop
          * @param lumi 亮度
          */
        static splashEff(sprite, time, loop = false, lumi = 100) {
            let effNode = sprite;
            let luminance;
            if (effNode.__splashEff) {
                luminance = effNode.__splashEff.o;
                Laya.Tween.clearTween(luminance);
                sprite.filters = undefined;
            }
            else {
                luminance = { factor: lumi };
                effNode.__splashEff = { o: luminance };
            }
            luminance.factor = lumi;
            let updatefunc = new Laya.Handler(this, function () {
                Effect.toneLight(sprite, luminance.factor);
            });
            let anifunc = function () {
                Laya.Tween.from(luminance, { factor: 0, update: updatefunc }, time >> 1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(luminance, { factor: 0, update: updatefunc }, time >> 1, null, Laya.Handler.create(this, function () {
                        luminance.factor = lumi;
                        if (loop) {
                            return anifunc();
                        }
                    }));
                }));
            };
            sprite.once(Laya.Event.REMOVED, sprite, this.stopSplashEff);
            anifunc();
        }
        static stopSplashEff(sprite) {
            let effNode = sprite || this;
            if (effNode.__splashEff) {
                sprite = effNode;
                let luminance = effNode.__splashEff.o;
                Laya.Tween.clearTween(luminance);
                sprite.filters = undefined;
                effNode.__splashEff = null;
            }
        }
        /**
          * 震动
          * @param node 震动对象
          * @param time 震动时间 毫秒
          * @param strength 震动强度
          */
        static shake(node, time, strength) {
            let effNode = node;
            let opos;
            if (effNode.__shakeEff) {
                Laya.Tween.clear(effNode.__shakeEff.tween);
                opos = effNode.__shakeEff.o;
                node.x = effNode.__shakeEff.o.x;
                node.y = effNode.__shakeEff.o.y;
            }
            else {
                opos = new Laya.Point(node.x, node.y);
                effNode.__shakeEff = { o: opos };
            }
            effNode.__shakeEff.tween = Laya.Tween.to(node, {
                update: new Laya.Handler(this, function () {
                    let x = -strength + 2 * strength * Math.random();
                    let y = -strength + 2 * strength * Math.random();
                    node.x = opos.x + x;
                    node.y = opos.y + y;
                })
            }, time, null, Laya.Handler.create(this, function () {
                node.x = opos.x;
                node.y = opos.y;
                effNode.__shakeEff = null;
            }));
            node.once(Laya.Event.REMOVED, this, this.stopShake, [node]);
        }
        static stopShake(node) {
            let effNode = node;
            let opos;
            if (effNode.__shakeEff) {
                Laya.Tween.clear(effNode.__shakeEff.tween);
                opos = effNode.__shakeEff.o;
                node.x = effNode.__shakeEff.o.x;
                node.y = effNode.__shakeEff.o.y;
                effNode.__shakeEff = null;
            }
        }
        /**
          * 缩放效果
          * @param node
          * @param millSec
          * @param strength 呼吸强度，即缩放因子 >1
          */
        static breathEff(node, millSec, strength, loop = false) {
            let effNode = node;
            let oscale;
            if (effNode.__breathEff) {
                Laya.Tween.clear(effNode.__breathEff.tween);
                oscale = effNode.__breathEff.o;
                node.scaleX = effNode.__breathEff.o.x;
                node.scaleY = effNode.__breathEff.o.y;
            }
            else {
                oscale = new Laya.Point(node.scaleX, node.scaleY);
                effNode.__breathEff = { o: oscale };
            }
            let anifunc = function () {
                effNode.__breathEff.tween = Laya.Tween.to(node, { scaleX: strength * oscale.x, scaleY: strength * oscale.y }, millSec >> 1, null, Laya.Handler.create(this, function () {
                    effNode.__breathEff.tween = Laya.Tween.to(node, { scaleX: oscale.x, scaleY: oscale.y }, millSec >> 1, null, Laya.Handler.create(this, function () {
                        if (loop) {
                            anifunc();
                        }
                        else {
                            Effect.stopBreathEff(effNode);
                        }
                    }));
                }));
            };
            anifunc();
            node.once(Laya.Event.REMOVED, this, function () {
                this.stopBreathEff(effNode);
            });
        }
        static stopBreathEff(node) {
            let effNode = node;
            if (effNode.__breathEff) {
                Laya.Tween.clear(effNode.__breathEff.tween);
                node.scaleX = effNode.__breathEff.o.x;
                node.scaleY = effNode.__breathEff.o.y;
                effNode.__breathEff = null;
            }
        }
        /**
          * 圆形进度 cd
          * @param node
          * @param time 毫秒
          * @param handler
          * @param mask 是否启用 mask, 不启用则是黑色遮罩
          */
        static cd(node, time, handler, mask) {
            let effNode = node;
            let x = node.width >> 1;
            let y = node.height >> 1;
            let startAngle = -90;
            let endAngle = 270;
            if (effNode.__cdEff) {
                Laya.Tween.clear(effNode.__cdEff.tween);
                let sprite = effNode.__cdEff.o;
                sprite.graphics.drawPie(x, y, x, startAngle, endAngle, "#000000");
                effNode.__cdEff.angle = startAngle;
            }
            else {
                let sprite = new Laya.Sprite();
                sprite.setSelfBounds(new Laya.Rectangle(0, 0, node.width, node.height));
                sprite.alpha = 0.8;
                if (mask) {
                    node.mask = sprite;
                }
                else {
                    node.addChild(sprite);
                }
                sprite.graphics.drawPie(x, y, x, startAngle, endAngle, "#000000");
                effNode.__cdEff = { o: sprite, angle: startAngle };
            }
            effNode.__cdEff.tween = Laya.Tween.to(effNode.__cdEff, {
                angle: endAngle, update: new Laya.Handler(this, function () {
                    let sprite = effNode.__cdEff.o;
                    let angle = effNode.__cdEff.angle;
                    if (Utils.equal(angle, startAngle, 1) == false) {
                        startAngle = angle;
                        sprite.graphics.clear();
                        sprite.graphics.drawPie(x, y, x, angle, endAngle, "#000000");
                    }
                })
            }, time, null, Laya.Handler.create(this, function () {
                let sprite = effNode.__cdEff.o;
                sprite.destroy();
                if (mask) {
                    node.mask = null;
                }
                effNode.__cdEff = null;
                if (handler) {
                    handler.run();
                }
            }));
            node.once(Laya.Event.REMOVED, this, this.stopCDEff, [node]);
            return effNode.__cdEff.tween;
        }
        static getCDEffTween(node) {
            if (node.__cdEff) {
                return node.__cdEff.tween;
            }
        }
        static stopCDEff(effNode) {
            if (effNode.__cdEff) {
                Laya.Tween.clear(effNode.__cdEff.tween);
                let sprite = effNode.__cdEff.o;
                sprite.destroy();
                effNode.mask = null;
                effNode.__cdEff = null;
            }
        }
        //设置图片对比度
        // public static setImageContrast(image : Laya.Image , contrast) : void
        // {
        // 	if(image.filters) {
        // 		let colorFilter : Laya.ColorFilter = image.filters[0];
        // 		// colorFilter.adjustContrast(contrast);
        // 	} else {
        // 		let colorFilter = new Laya.ColorFilter();
        // 		// colorFilter.reset();
        // 		// colorFilter.adjustContrast(contrast);
        // 		image.filters = [colorFilter];
        // 	}
        // }
        /**
          * 屏幕闪烁
          * @param color #000000
          * @param time
          */
        static splashScreen(color, time, alpha = 1, handler) {
            let effNode = Laya.stage;
            let sprite;
            if (effNode.__splashScreenEff) {
                Laya.Tween.clear(effNode.__splashScreenEff.tween);
                sprite = effNode.__splashScreenEff.o;
            }
            else {
                sprite = new Laya.Sprite();
                sprite.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, color);
                Laya.stage.addChild(sprite);
                effNode.__splashScreenEff = { o: sprite };
            }
            sprite.alpha = 0;
            effNode.__splashScreenEff.tween = Laya.Tween.to(sprite, { alpha: alpha }, time >> 1, null, Laya.Handler.create(this, () => {
                if (handler) {
                    handler.run();
                }
                effNode.__splashScreenEff.tween = Laya.Tween.to(sprite, { alpha: 0 }, time >> 1, null, Laya.Handler.create(this, () => {
                    sprite.removeSelf();
                    effNode.__splashScreenEff = null;
                }));
            }));
        }
        /**
          * 屏幕着色
          * @param color 颜色
          * @param time
          * @param alpha
          */
        static shadeScreen(color, time, alpha = 1, handler) {
            let effNode = Laya.stage;
            let sprite;
            if (effNode.__splashScreenEff) {
                Laya.Tween.clear(effNode.__splashScreenEff.tween);
                sprite = effNode.__splashScreenEff.o;
            }
            else {
                sprite = new Laya.Sprite();
                sprite.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, color);
                Laya.stage.addChild(sprite);
                effNode.__splashScreenEff = { o: sprite };
            }
            sprite.alpha = 0;
            effNode.__splashScreenEff.tween = Laya.Tween.to(sprite, { alpha: alpha }, time >> 1, null, Laya.Handler.create(this, () => {
                sprite.destroy();
                effNode.__splashScreenEff = null;
                if (handler) {
                    handler.run();
                }
            }));
        }
        /**
         * 递归着色该UI组件及其子组件
         * @param c 组件
         * @param color 着目标色, eg:"#ffffffff"
         * @param jumpShade 筛选表，不着色控件名字
         */
        static shadeUIComponet(c, color, jumpShade) {
            color = color || "#ffffffff";
            let isJumpShade = false;
            if (c.name && jumpShade && (-1 !== jumpShade.indexOf(c.name))) {
                isJumpShade = true;
            }
            if (!isJumpShade && (c instanceof Laya.Image
                || c instanceof Laya.Sprite
                || c instanceof Laya.Label)) {
                let r = parseInt(color.substring(1, 3), 16) / 255;
                let g = parseInt(color.substring(3, 5), 16) / 255;
                let b = parseInt(color.substring(5, 7), 16) / 255;
                let a = parseInt(color.substring(7), 16) / 255;
                c.filters = [new Laya.ColorFilter([
                        r, 0, 0, 0, 0,
                        0, g, 0, 0, 0,
                        0, 0, b, 0, 0,
                        0, 0, 0, a, 0
                    ])];
            }
            for (let i = 0; i < c.numChildren; ++i) {
                Effect.shadeUIComponet(c.getChildAt(i), color, jumpShade);
            }
        }
        /**
          * 复活特效，闪烁隐身
          * @param node
          * @param time 时间
          */
        // public static reviveEff(sprite:Laya.Sprite, time:number) {
        // 	let effNode:any = sprite;
        // 	this.stopReviveEff(sprite);
        // 	effNode.__reviveEff = {func:()=>{
        // 		sprite.visible = !sprite.visible;
        // 	}};
        // 	Laya.scaleTimer.loop(150, sprite, effNode.__reviveEff.func);
        // 	Laya.scaleTimer.once(time, sprite, this.stopReviveEff);
        // 	sprite.once(Laya.Event.REMOVED, sprite, this.stopReviveEff);
        // }
        // private static stopReviveEff(sprite:Laya.Sprite) {
        // 	let effNode:any = sprite || this;
        // 	if (effNode.__reviveEff) {
        // 		sprite = effNode;
        // 		Laya.scaleTimer.clear(sprite, effNode.__reviveEff.func);
        // 		Laya.scaleTimer.clear(sprite, Effect.stopReviveEff);
        // 		sprite.off(Laya.Event.REMOVED, sprite, Effect.stopReviveEff);
        // 		sprite.visible = true;
        // 		effNode.__reviveEff = undefined;
        // 	}
        // }
        /**
          * 残影效果
          * @param node
          * @param totalFrame 总共多少帧
          * @param frameDelta 每帧间隔
          */
        static ghostEff(node, totalFrame, frameDelta) {
        }
        static moveToEff(src, targetArgs, duration, ease, complete, completeCaller) {
            if (!(src instanceof Laya.Image)) {
                return;
            }
            let props = null;
            let beginPos = src.localToGlobal(new Laya.Point(), false, Laya.stage);
            let endPos = targetArgs;
            if (targetArgs instanceof Laya.Sprite) {
                endPos = targetArgs.localToGlobal(new Laya.Point(), false, Laya.stage);
                props = { x: endPos.x, y: endPos.y, scaleX: targetArgs.scaleX, scaleY: targetArgs.scaleY };
            }
            else {
                props = { x: endPos.x, y: endPos.y };
            }
            ease = ease || Laya.Ease.quartInOut;
            let img_src = new Laya.Image(src.skin);
            img_src.pos(beginPos.x, beginPos.y);
            img_src.zOrder = 1000;
            Laya.stage.addChild(img_src);
            Laya.Tween.to(img_src, props, duration || 500, ease, Laya.Handler.create(this, function () {
                img_src.removeSelf();
                if (complete && completeCaller) {
                    complete.call(completeCaller);
                }
            }));
        }
        // public static moveToEff(node: Laya.Sprite, to, handler?: Laya.Handler) {
        // 	let tween = new Laya.Tween;
        // 	tween.to(node, { y: node.y + 20 }, 50, null, Laya.Handler.create(this, () => {
        // 		tween.to(node, { x: to.x, y: to.y }, 300, Laya.Ease.expoIn, handler);
        // 	}));
        // 	node.on(Laya.Event.REMOVED, null, function () {
        // 		tween.clear();
        // 	}, [tween])
        // }
        //Q弹效果
        static jellyQEff(node, handler, strength = 1) {
            var w = strength * 10 || 10;
            var oscale = { scx: node.scaleX, scy: node.scaleY };
            var effNode = node;
            if (effNode._jellyQEff) {
                if (!effNode._jellyQEff.complete)
                    return;
                effNode._jellyQEff.curTime = 0;
                effNode._jellyQEff.complete = false;
            }
            else {
                effNode._jellyQEff = { tween: null, curTime: 0, complete: false };
            }
            var updatefunc = new Laya.Handler(this, function () {
                let t = effNode._jellyQEff.curTime;
                let y = 0.1 * Math.exp(-0.04 * t) * Math.cos(Math.PI / w * t);
                effNode._jellyQEff.curTime += Math.PI / (w / 2);
                node.scaleX = oscale.scx + y;
                node.scaleY = oscale.scy + y;
            });
            Laya.Tween.to(effNode, { update: updatefunc }, 300, null, Laya.Handler.create(this, () => {
                node.scaleX = oscale.scx;
                node.scaleY = oscale.scy;
                effNode._jellyQEff.complete = true;
                if (handler)
                    handler.run();
            }, [effNode]));
        }
        //按钮缩放效果 
        static btnScaleEff(node, scale = { x: 0.88, y: 0.88 }) {
            let anyNode = node;
            if (anyNode.__btnScaleEff) {
                return;
            }
            var oscale = { scx: node.scaleX, scy: node.scaleY };
            anyNode.__btnScaleEff = oscale;
            node.on(Laya.Event.MOUSE_DOWN, this, (e) => {
                node.scale(oscale.scx * scale.x, oscale.scy * scale.y);
            });
            node.on(Laya.Event.MOUSE_OUT, this, (e) => {
                node.scale(oscale.scx, oscale.scy);
            });
            node.on(Laya.Event.MOUSE_UP, this, (e) => {
                node.scale(oscale.scx, oscale.scy);
            });
        }
        static jumpEff(node, height = 7, time = 1000, loop = true) {
            var opos = { ox: node.x, oy: node.y };
            var effnode = node;
            if (effnode._eff) {
                Laya.Tween.clear(effnode._eff.tween);
            }
            else {
                effnode._eff = {};
                effnode._eff.tween = new Laya.Tween;
            }
            let effFun = function () {
                effnode._eff.tween.to(node, { y: opos.oy + height }, 500, null, Laya.Handler.create(this, () => {
                    effnode._eff.tween.to(node, { y: opos.oy }, 500, null, Laya.Handler.create(this, () => {
                        if (loop) {
                            effFun();
                            node.y = opos.oy;
                        }
                    }));
                }));
            };
            effFun();
        }
        /**
         * 放大缩小动画
         * @param node
         * @param scale
         * @param millSec
         */
        static scaleEff(node, scale, millSec) {
            let oscale = { ox: node.scaleX, oy: node.scaleY };
            var effnode = node;
            if (effnode.__scaleEff) {
                Laya.Tween.clear(effnode.__scaleEff.tween);
                oscale.ox = effnode.__scaleEff.ox;
                oscale.oy = effnode.__scaleEff.oy;
                node.scaleX = oscale.ox;
                node.scaleY = oscale.oy;
            }
            else {
                effnode.__scaleEff = oscale;
            }
            effnode.__scaleEff.tween = Laya.Tween.to(node, { scaleX: oscale.ox + scale, scaleY: oscale.oy + scale }, millSec >> 1, null, Laya.Handler.create(this, () => {
                Laya.Tween.to(node, { scaleX: oscale.ox, scaleY: oscale.oy }, millSec >> 1, null, Laya.Handler.create(this, () => {
                    effnode.__scaleEff = null;
                }));
            }));
        }
        static jetEff(url, isDestroy = true, handler, alpha = 0, num = 8) {
            var ret = new Laya.Box;
            let frames = 40;
            var delta = Math.PI / (frames); //70帧
            var cosfun = function (a, w, effnode, delta) {
                let x = effnode._eff.curX;
                let y = a * Math.cos(w * x);
                effnode.x = x;
                effnode.y = y;
                effnode._eff.curX = x - delta;
            };
            for (let i = 0; i < num; ++i) {
                let img = new Laya.Image;
                img.skin = url;
                img.name = "img" + i;
                ret.addChild(img);
                let delayTime = i * 100; //延时描述ms
                var A = 150;
                if (i % 2 == 0) //sin
                 {
                    Laya.timer.once(delayTime, null, function (node) {
                        let enode = node;
                        ;
                        let f = Utils.getIntRandom(0, 2) * 0.1 * A;
                        enode._eff = { curX: 0, a: (A + (f * (Utils.getIntRandom(0, 1) == 0 ? -1 : 1))), x: 0, xdelta: Utils.getIntRandom(0, 3) };
                        var updatefun = new Laya.Handler(this, function (effnode) {
                            let a = effnode._eff.a;
                            let x = effnode._eff.curX;
                            let y = -a * Math.sin(x);
                            effnode.x = effnode._eff.x;
                            effnode.y = y;
                            effnode._eff.curX = x + delta;
                            effnode._eff.x += effnode._eff.xdelta;
                        }, [enode]);
                        Laya.Tween.to(node, { update: updatefun }, frames * 16.67);
                    }, [img]);
                }
                else //cos
                 {
                    Laya.timer.once(delayTime, null, function (node) {
                        let enode = node;
                        let f = Utils.getIntRandom(0, 2) * 0.01 * A;
                        enode._eff = { curX: 0, a: (A + (f * (Utils.getIntRandom(0, 1) == 0 ? -1 : 1))), x: 0, xdelta: Utils.getIntRandom(0, 3) };
                        var updatefun = new Laya.Handler(this, function (effnode) {
                            let a = effnode._eff.a;
                            let x = effnode._eff.curX;
                            let y = -a * Math.sin(-x);
                            effnode.x = effnode._eff.x;
                            effnode.y = y;
                            effnode._eff.curX = x - delta;
                            effnode._eff.x -= effnode._eff.xdelta;
                        }, [enode]);
                        Laya.Tween.to(node, { update: updatefun }, frames * 16.67);
                    }, [img]);
                }
            }
            Laya.timer.once(700 + frames * 16.67, null, function (box) {
                Laya.Tween.to(box, { alpha: alpha }, 300, null, Laya.Handler.create(null, function (box) {
                    if (isDestroy)
                        box.removeSelf();
                    if (handler)
                        handler.run();
                }, [box]));
            }, [ret]);
            return ret;
        }
        /**
         * 缩放后向上淡出
         * @param node
         * @param handler
         * @param scaleInScale 缩放进入
         * @param scaleInMillsec 缩放进入时间
         * @param stayMillsec 缩放完成后停留
         * @param upY
         * @param upScale 向上运动的缩放
         * @param upMillsec 向上运动时间
         * @param fadeDelay 延迟淡出的时间
         * @param fadeTime 淡出时间
         */
        static scale_up_fade(node, handler, scaleInScale = 2, scaleInMillsec = 200, stayMillsec = 300, upY = 50, upScale = 1, upMillsec = 500, fadeDelay = 0, fadeTime = 500) {
            scaleInScale *= node.scaleX;
            upScale *= node.scaleX;
            return new TweenSequence(node, handler).scaleIn(scaleInScale, scaleInMillsec).delay(stayMillsec).up(upY, upMillsec).scaleOut(upScale, upMillsec).delay(fadeDelay).fadeOut(fadeTime).delay(fadeTime).recover();
        }
        /**
          * 向上淡出
          * @param node
          * @param handler
          */
        static up_fade(node, handler, height = 50, duration = 500) {
            return new TweenSequence(node, handler).up(height, duration).fadeOut(duration).delay(duration).recover();
        }
        /**
         * 向某一方向淡出
         * @param node
         * @param dir
         * @param handler
         * @param duration
         */
        static move_fade(node, dir, handler, duration = 500) {
            return new TweenSequence(node, handler).move(dir.x, dir.y, duration).fadeOut(duration).delay(duration).recover();
        }
        /**
         * 淡入淡出，闪烁
         * @param node
         * @param time 毫秒
         * @param inAlpha
         * @param outAlpah
         * @param loop
         */
        static fade_InOut(node, time, inAlpha = 1, outAlpah = 0, loop) {
            let effNode = node;
            if (effNode.__fadeInOutEff) {
                Laya.Tween.clear(effNode.__fadeInOutEff.tween);
            }
            else {
                effNode.__fadeInOutEff = { alpha: node.alpha };
            }
            let anifunc = function () {
                effNode.__fadeInOutEff.tween = Laya.Tween.to(node, { alpha: outAlpah }, time >> 1, null, Laya.Handler.create(this, () => {
                    effNode.__fadeInOutEff.tween = Laya.Tween.to(node, { alpha: inAlpha }, time >> 1, null, Laya.Handler.create(this, () => {
                        if (loop) {
                            anifunc();
                        }
                        else {
                            this.stopFadeInOutEff(node);
                        }
                    }));
                }));
            };
            anifunc();
            node.once(Laya.Event.REMOVED, this, this.stopFadeInOutEff, [node]);
        }
        static stopFadeInOutEff(node) {
            let effNode = node;
            if (effNode.__fadeInOutEff) {
                node.alpha = effNode.__fadeInOutEff.alpha;
                Laya.Tween.clear(effNode.__fadeInOutEff.tween);
                effNode.__fadeInOutEff = null;
                node.off(Laya.Event.REMOVED, this, this.stopFadeInOutEff);
            }
        }
        /**
        *
        * @param sprite
        * @param time 毫秒，闪烁时长
        * @param times -1 循环
        * @param lumi 亮度
        */
        static splashColor(sprite, time, times = -1, color1 = "#000000", color2 = "#ffffff", complete) {
            let effNode = sprite;
            let timer;
            if (effNode.__splashColor) {
                timer = effNode.__splashColor.o;
                timer.clearAll(sprite);
                sprite.filters = undefined;
            }
            else {
                timer = new Laya.Timer;
                effNode.__splashColor = { o: timer, c: sprite.filters };
            }
            let anifunc = function () {
                timer.once(time >> 1, sprite, () => {
                    //Effect.setColor(sprite);
                    sprite.color = color2; //effNode.__splashColor.ocolor;
                    timer.once(time >> 1, sprite, () => {
                        //Effect.setColor(sprite,color);
                        sprite.color = color1;
                        if (times == -1) {
                            anifunc();
                        }
                        else {
                            times -= 1;
                            if (times <= 0) {
                                Effect.stopSplashColor(sprite);
                                if (complete)
                                    complete();
                            }
                            else {
                                anifunc();
                            }
                        }
                    });
                });
            };
            sprite.once(Laya.Event.REMOVED, sprite, this.stopSplashColor);
            //Effect.setColor(sprite,color);
            sprite.color = color1;
            anifunc();
        }
        static stopSplashColor(sprite) {
            let effNode = sprite || this;
            if (effNode.__splashColor) {
                //sprite = effNode;
                let timer = effNode.__splashColor.o;
                if (timer) {
                    timer.clearAll(sprite);
                }
                sprite.filters = effNode.__splashColor.c;
                effNode.__splashColor = null;
            }
        }
        /**获取物品特效 */
        static getPropEffect(propImgUrl, startPos, endPos, startSound, endSound, callbackFuc, ctrl, callbackFirst) {
            Laya.MouseManager.enabled = false;
            let goldNum = 15;
            let diff = [{ x: -300, y: -150 }, { x: 0, y: -150 }, { x: 300, y: -150 }];
            let ctrlScaleX, ctrlScaleY;
            if (ctrl) {
                ctrlScaleX = ctrl.scaleX;
                ctrlScaleY = ctrl.scaleY;
            }
            let imgArray = [];
            for (let i = 0; i < 3; i++) {
                for (let index = 0; index < goldNum; index++) {
                    let image = Laya.Pool.getItemByClass("goldImage", Laya.Image);
                    image.source = Laya.loader.getRes(propImgUrl);
                    image.anchorX = 0.5;
                    image.anchorY = 0.5;
                    // image.scale(0.75, 0.75);
                    image.scale(1.0, 1.0);
                    image.size(70, 70);
                    image.pos(startPos.x, startPos.y, true);
                    image.zOrder = 1000;
                    Laya.stage.addChild(image);
                    let diffPos = { x: diff[i].x + Utils.getIntRandom(-150, 150), y: diff[i].y + Utils.getIntRandom(-50, 50) };
                    let controlPos = new Laya.Point(startPos.x + diffPos.x, startPos.y + diffPos.y);
                    let data = { image: image, counts: 0, point: [startPos, controlPos, endPos], runSign: false };
                    imgArray.push(data);
                    Laya.timer.once(15 * index, this, function (index) {
                        imgArray[index].runSign = true;
                    }, [i * goldNum + index]);
                }
            }
            SoundManager.getInstance().playSound(startSound);
            ;
            var playSound = function () {
                SoundManager.getInstance().playSound(startSound);
            };
            Laya.timer.loop(50, Laya.stage, playSound);
            Laya.timer.once(200, Laya.stage, function () {
                Laya.timer.clear(Laya.stage, playSound);
            });
            let num = 0;
            var updataFuc = function (delta) {
                for (let index = 0; index < imgArray.length; index++) {
                    const element = imgArray[index];
                    if (element && element.runSign) {
                        let t = delta * element.counts;
                        let point = Effect.getBezierPoint(t, element.point[0], element.point[1], element.point[2]);
                        element.image.pos(point.x, point.y);
                        if (t >= 1) {
                            element.image.removeSelf();
                            Laya.Pool.recover("goldImage", element.image);
                            imgArray[index] = undefined;
                            //判断是否是最后一个
                            if (index == imgArray.length - 1) {
                                Laya.timer.clear(Laya.stage, updataFuc);
                                if (ctrl) {
                                    Laya.timer.once(150, this, function (callbackFuc) {
                                        if (ctrl) {
                                            Laya.Tween.clearAll(ctrl);
                                            Laya.Tween.to(ctrl, { scaleX: ctrlScaleX, scaleY: ctrlScaleY }, 100, null, Laya.Handler.create(this, function (callbackFuc) {
                                                if (callbackFuc) {
                                                    callbackFuc.run();
                                                }
                                                Laya.timer.once(100, this, function () {
                                                    Laya.MouseManager.enabled = true;
                                                });
                                            }, [callbackFuc]));
                                        }
                                    }, [callbackFuc]);
                                }
                                else {
                                    if (callbackFuc) {
                                        callbackFuc.run();
                                    }
                                    Laya.timer.once(100, this, function () {
                                        Laya.MouseManager.enabled = true;
                                    });
                                }
                            }
                            else if (index == 0) {
                                SoundManager.getInstance().playSound(endSound);
                                if (ctrl) {
                                    Effect.propQEffect(ctrl);
                                }
                                if (callbackFirst) {
                                    callbackFirst.run();
                                }
                            }
                        }
                        else {
                            imgArray[index].counts += 70;
                        }
                    }
                }
            };
            Laya.timer.frameLoop(1, Laya.stage, updataFuc, [0.0003]);
        }
        /**消耗特效 */
        static consumePropEffect(propImgUrl, startPos, propNum, complete) {
            let goldNum = 5; //Utils.getIntRandom(3, 4);
            let diff = [{ x: -80, y: -150 }, { x: 0, y: -150 }, { x: 80, y: -150 }];
            for (let i = 0; i < 3; i++) {
                for (let index = 0; index < goldNum; index++) {
                    Laya.timer.once(50 * index, this, function () {
                        let image = Laya.Pool.getItemByClass("goldImage", Laya.Image);
                        image.source = Laya.loader.getRes(propImgUrl);
                        image.anchorX = 0.5;
                        image.anchorY = 0.5;
                        image.size(35, 35);
                        image.pos(startPos.x, startPos.y, true);
                        image.zOrder = 1000;
                        Laya.stage.addChild(image);
                        Laya.Tween.to(image, { x: startPos.x + Utils.getIntRandom(-100, 100), y: startPos.y + Utils.getIntRandom(-100, 100) }, 400, null, Laya.Handler.create(this, function (image) {
                            image.removeSelf();
                            Laya.Pool.recover("goldImage", image);
                            if (complete)
                                complete.run();
                        }, [image]));
                    });
                }
            }
            let propNumLabel = new Laya.Label();
            propNumLabel.text = `-${propNum}`;
            propNumLabel.anchorX = propNumLabel.anchorY = 0.5;
            propNumLabel.fontSize = 45;
            propNumLabel.pos(startPos.x, startPos.y);
            propNumLabel.zOrder = 1001;
            propNumLabel.color = "#f8f3d3";
            propNumLabel.stroke = 3;
            propNumLabel.strokeColor = "#000000";
            Laya.stage.addChild(propNumLabel);
            Laya.Tween.to(propNumLabel, { x: startPos.x, y: startPos.y - 100 }, 500, null, Laya.Handler.create(this, function (propNumLabel) {
                propNumLabel.removeSelf();
                propNumLabel.destroy();
            }, [propNumLabel]));
        }
        /**道具Q弹效果 */
        static propQEffect(ctrl) {
            let sacleX = ctrl.scaleX, scaleY = ctrl.scaleY;
            let propTs = new Sequence([
                { t: "to", target: ctrl, props: { scaleX: sacleX * 1.25, scaleY: sacleX * 0.75 }, duration: 50, ease: null },
                { t: "to", target: ctrl, props: { scaleX: sacleX * 0.75, scaleY: sacleX * 1.25 }, duration: 50, ease: null },
            ], true);
            propTs.run();
        }
        static getBezierPoint(t, startPoint, controlPoint, endPoint) {
            var tem = 1 - t;
            var tx = tem * tem * startPoint.x + 2 * t * tem * controlPoint.x + t * t * endPoint.x;
            var ty = tem * tem * startPoint.y + 2 * t * tem * controlPoint.y + t * t * endPoint.y;
            return { x: tx, y: ty }; //返回坐标位置
        }
        /**
         * 外发光呼吸效果
         */
        static glowBreath(s, params) {
            if (!s.scene) {
                console.log("该控件无所属场景!!!");
                return;
            }
            //参数设置
            if (!params) {
                params = { color: "#fffffff", blur: 1 };
            }
            else {
                (!params.color) && (params.color = "#ffffff");
                (!params.blur) && (params.blur = 1);
                (!params.offX) && (params.offX = 0);
                (!params.offY) && (params.offY = 0);
            }
            //外发光呼吸
            let curBlur = 0, blurMax = params.blur, isStrengthen = true;
            s.scene.timer.loop(100, s.scene, () => {
                if (isStrengthen) {
                    curBlur++;
                    if (curBlur > blurMax) {
                        isStrengthen = false;
                        return;
                    }
                }
                else {
                    curBlur--;
                    if (curBlur < 0) {
                        isStrengthen = true;
                        return;
                    }
                }
                s.filters = [];
                s.filters = [new Laya.GlowFilter(params.color, curBlur, params.offX, params.offY)];
            });
        }
        /**
         * 抖动摄像机视口
         * @param camera
         */
        static shakeCamrea(camera, strength = 10) {
            if (!camera)
                return;
            let vp = camera.viewport;
            let tween = undefined;
            if (camera["__mViewportTween"] && camera["__mViewportTween"] instanceof Laya.Tween) {
                tween = camera["__mViewportTween"];
                tween.complete();
                tween.clear();
            }
            else {
                tween = new Laya.Tween();
                camera["__mViewportTween"] = tween;
            }
            let opos = new Laya.Point(vp.x, vp.y);
            tween.to(vp, {
                update: new Laya.Handler(this, () => {
                    let x = -strength + 2 * strength * Math.random();
                    let y = -strength + 2 * strength * Math.random();
                    vp.x = opos.x + x;
                    vp.y = opos.y + y;
                    camera.viewport = vp;
                })
            }, 200, null, Laya.Handler.create(this, () => {
                vp.x = opos.x;
                vp.y = opos.y;
                camera.viewport = vp;
            }));
            camera.once(Laya.Event.REMOVED, null, () => {
                tween.clear();
                delete camera["__mViewportTween"];
            });
        }
        static stopShakeCamrea(camera) {
            if (!camera)
                return;
            let tween = undefined;
            if (camera["__mViewportTween"] && camera["__mViewportTween"] instanceof Laya.Tween) {
                tween = camera["__mViewportTween"];
                tween.complete();
                tween.clear();
            }
        }
    }

    /*
     * Created on Thu Feb 21 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class SceneManager {
        static getSceneUrl(url) {
            let path = Utils.pathInfo(url);
            return 'scenes/' + path.filename + '.scene';
        }
        static destroy(scene) {
            if (scene) {
                scene.autoDestroyAtClosed = true;
                scene.close('closeByDestroy');
                if (scene instanceof BaseScene) {
                    Laya.Scene.gc();
                }
            }
        }
        static uiChanged(ui, open) {
            if (open) {
                let curUI = this.uiStack[this.uiStack.length - 1];
                if (curUI == ui) {
                    ui.actived();
                    let lastUI = this.uiStack[this.uiStack.length - 2];
                    if (lastUI) {
                        lastUI.deactived();
                    }
                }
                else {
                    ui.deactived();
                }
            }
            else if (ui) {
                let curUI = this.uiStack[this.uiStack.length - 1];
                if (curUI == ui) {
                    this.uiStack.pop();
                    ui.deactived();
                    let lastUI = this.uiStack[this.uiStack.length - 1];
                    if (lastUI) {
                        lastUI.actived();
                    }
                }
                else {
                    let index = this.uiStack.indexOf(ui);
                    if (index != -1) {
                        this.uiStack.splice(index, 1);
                        ui.deactived();
                    }
                }
            }
        }
        static processRes(resUrl) {
            // 解决使用同一个3d资源对象造成的bug
            Laya.loader.clearRes3d && Laya.loader.clearRes3d();
            let createRes = [];
            let loadRes = [];
            for (const url of resUrl) {
                if (['ls'].indexOf(Laya.Utils.getFileExtension(url)) != -1) {
                    Laya.loader.setGroup(url, RES3D_GROUP_NAME);
                    createRes.push(url);
                }
                else {
                    loadRes.push(url);
                }
            }
            return [createRes, loadRes];
        }
        static changeScene(url_module, args) {
            let self = SceneManager;
            let userArgs;
            if (args) {
                userArgs = args.userArgs;
                if (args.from != undefined) {
                    if (userArgs) {
                        userArgs.unshift(args.from);
                    }
                    else {
                        userArgs = [args.from];
                    }
                }
            }
            userArgs = userArgs || [];
            Laya.MouseManager.enabled = false;
            let listener = function (scene) {
                let effFunc = args && args.effectFunc;
                if (effFunc) {
                    scene.open(false);
                    effFunc.call(self, self.curScene, () => {
                        self.curScene.exit();
                    }, scene, () => {
                        Laya.MouseManager.enabled = true;
                        self.uiStack.push(scene);
                        scene.enter(userArgs);
                        self.uiChanged(self.curScene, false);
                        self.uiChanged(scene, true);
                        self.destroy(self.curScene);
                        self.curScene = scene;
                    });
                }
                else {
                    if (self.curScene) {
                        self.curScene.exit();
                    }
                    Laya.MouseManager.enabled = true;
                    scene.open(true);
                    self.uiStack.push(scene);
                    scene.enter(userArgs);
                    self.uiChanged(self.curScene, false);
                    self.uiChanged(scene, true);
                    self.destroy(self.curScene);
                    self.curScene = scene;
                }
                // let sceneModule = Utils.getModule(scene);
                // EventCenter.getInstance().event(BaseEvent.E_PANEL_OPENCLOSE, { code: BaseCode.SCENE_CHANGE, name: SceneManager.getModuleName(sceneModule) });
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                Sdk.getInstance().sendEvent("面板", { "打开": scene.getModuleUrlName() });
            };
            if (typeof url_module == 'string') {
                let sceneUrl = url_module;
                sceneUrl = this.getSceneUrl(sceneUrl);
                BaseScene.load(sceneUrl, Laya.Handler.create(self, listener));
            }
            else {
                let resUrl = url_module.getRes();
                let loadCnt = 1;
                let scene = new url_module(...userArgs);
                if (resUrl && resUrl.length > 0) {
                    let [createRes, loadRes] = this.processRes(resUrl);
                    if (createRes.length > 0) {
                        loadCnt++;
                        Laya.loader.create(createRes, Laya.Handler.create(self, () => {
                            loadCnt--;
                            if (loadCnt == 0) {
                                listener(scene);
                            }
                        }));
                    }
                    if (loadRes.length > 0) {
                        loadCnt++;
                        Laya.loader.load(loadRes, Laya.Handler.create(self, () => {
                            loadCnt--;
                            if (loadCnt == 0) {
                                listener(scene);
                            }
                        }));
                    }
                }
                scene.once('onViewCreated', self, () => {
                    loadCnt--;
                    if (loadCnt == 0) {
                        listener(scene);
                    }
                });
            }
        }
        static changeView(url_module, args) {
            let self = SceneManager;
            let userArgs;
            if (args) {
                userArgs = args.userArgs;
                if (args.from != undefined) {
                    if (userArgs) {
                        userArgs.unshift(args.from);
                    }
                    else {
                        userArgs = [args.from];
                    }
                }
            }
            userArgs = userArgs || [];
            Laya.MouseManager.enabled = false;
            let listener = function (view) {
                let effFunc = args && args.effectFunc;
                self.curScene.pushView(view);
                let curView = self.curScene.curView;
                if (effFunc) {
                    effFunc.call(self, curView, () => {
                        curView && curView.exit();
                    }, view, () => {
                        Laya.MouseManager.enabled = true;
                        self.uiStack.push(view);
                        view.enter(userArgs);
                        self.uiChanged(curView, false);
                        self.uiChanged(view, true);
                        self.destroy(curView);
                        self.curScene.curView = view;
                    });
                }
                else {
                    if (curView) {
                        curView.exit();
                    }
                    Laya.MouseManager.enabled = true;
                    self.uiStack.push(view);
                    view.enter(userArgs);
                    self.uiChanged(curView, false);
                    self.uiChanged(view, true);
                    self.destroy(curView);
                    self.curScene.curView = view;
                }
                let viewModule = Utils.getModule(view);
                EventCenter.getInstance().event(BaseEvent.E_PANEL_OPENCLOSE, { code: exports.BaseCode.VIEW_OPEN, name: SceneManager.getModuleName(viewModule), gid: view.getGID() });
            };
            if (typeof url_module == 'string') {
                let viewUrl = url_module;
                viewUrl = this.getSceneUrl(viewUrl);
                BaseView.load(viewUrl, Laya.Handler.create(self, listener));
            }
            else {
                let resUrl = url_module.getRes();
                let loadCnt = 1;
                let view = new url_module(...userArgs);
                if (resUrl && resUrl.length > 0) {
                    loadCnt++;
                    Laya.loader.load(resUrl, Laya.Handler.create(self, () => {
                        loadCnt--;
                        if (loadCnt == 0) {
                            listener(view);
                        }
                    }));
                }
                view.once('onViewCreated', self, () => {
                    loadCnt--;
                    if (loadCnt == 0) {
                        listener(view);
                    }
                });
            }
        }
        /**
         * 叠加一个 view 到当前场景
         * @param url_module
         * @param args
         */
        static pushView(url_module, args) {
            let self = SceneManager;
            let userArgs;
            if (args) {
                userArgs = args.userArgs;
                if (args.from != undefined) {
                    if (userArgs) {
                        userArgs.unshift(args.from);
                    }
                    else {
                        userArgs = [args.from];
                    }
                }
            }
            userArgs = userArgs || [];
            Laya.MouseManager.enabled = false;
            let listener = function (view) {
                let effFunc = args && args.effectFunc;
                self.curScene.pushView(view);
                let curView = self.curScene.curView;
                if (effFunc) {
                    effFunc.call(self, curView, () => {
                        curView && curView.exit();
                    }, view, () => {
                        Laya.MouseManager.enabled = true;
                        self.uiStack.push(view);
                        view.enter(userArgs);
                        self.uiChanged(view, true);
                        curView && (curView.visible = false);
                        self.curScene.curView = view;
                    });
                }
                else {
                    if (curView) {
                        curView.exit();
                        curView.visible = false;
                    }
                    Laya.MouseManager.enabled = true;
                    self.uiStack.push(view);
                    view.enter(userArgs);
                    self.uiChanged(view, true);
                    self.curScene.curView = view;
                }
                let viewModule = Utils.getModule(view);
                EventCenter.getInstance().event(BaseEvent.E_PANEL_OPENCLOSE, { code: exports.BaseCode.VIEW_OPEN, name: SceneManager.getModuleName(viewModule), gid: view.getGID() });
            };
            if (typeof url_module == 'string') {
                let viewUrl = url_module;
                viewUrl = this.getSceneUrl(viewUrl);
                BaseView.load(viewUrl, Laya.Handler.create(self, listener));
            }
            else {
                let resUrl = url_module.getRes();
                let loadCnt = 1;
                let view = new url_module(...userArgs);
                if (resUrl && resUrl.length > 0) {
                    loadCnt++;
                    Laya.loader.load(resUrl, Laya.Handler.create(self, () => {
                        loadCnt--;
                        if (loadCnt == 0) {
                            listener(view);
                        }
                    }));
                }
                view.once('onViewCreated', self, () => {
                    loadCnt--;
                    if (loadCnt == 0) {
                        listener(view);
                    }
                });
            }
        }
        static popView(args) {
            let effFunc = args && args.effectFunc;
            let userArgs;
            if (args) {
                userArgs = args.userArgs;
                if (args.from != undefined) {
                    if (userArgs) {
                        userArgs.unshift(args.from);
                    }
                    else {
                        userArgs = [args.from];
                    }
                }
            }
            userArgs = userArgs || [];
            let view = this.curScene.lastView;
            let curView = this.curScene.curView;
            let viewModule = Utils.getModule(curView);
            Laya.MouseManager.enabled = false;
            if (effFunc && view) {
                effFunc.call(this, curView, () => {
                    curView.exit();
                }, view, () => {
                    Laya.MouseManager.enabled = true;
                    view.enter(userArgs);
                    this.uiChanged(curView, false);
                    view.visible = true;
                    this.curScene.curView = view;
                    this.curScene.popView();
                    this.destroy(curView);
                });
            }
            else {
                if (curView) {
                    curView.exit();
                }
                Laya.MouseManager.enabled = true;
                if (view) {
                    view.enter(userArgs);
                    view.visible = true;
                }
                this.uiChanged(curView, false);
                this.curScene.curView = view;
                this.curScene.popView();
                this.destroy(curView);
            }
            EventCenter.getInstance().event(BaseEvent.E_PANEL_OPENCLOSE, { code: exports.BaseCode.VIEW_CLOSE, name: SceneManager.getModuleName(viewModule), gid: curView.getGID() });
        }
        static getModuleByName(name) {
            return Laya.ClassUtils.getRegClass(name);
        }
        static getModuleName(module) {
            let classMap = Laya.ClassUtils._classMap;
            for (const key in classMap) {
                if (classMap.hasOwnProperty(key) && classMap[key] == module) {
                    return key;
                }
            }
        }
        //打开面板
        static openPanel(url_module, args) {
            let self = SceneManager;
            let userArgs;
            if (args) {
                userArgs = args.userArgs;
                if (args.from != undefined) {
                    if (userArgs) {
                        userArgs.unshift(args.from);
                    }
                    else {
                        userArgs = [args.from];
                    }
                }
            }
            userArgs = userArgs || [];
            Laya.MouseManager.enabled = false;
            let listener = function (panel) {
                let effFunc = args && args.effectFunc;
                // 默认为模态
                if ((!args || args.isModel !== false) && panel.isModal == undefined) {
                    panel.isModal = true;
                }
                if (effFunc) {
                    self.uiStack.push(panel);
                    panel.open(false, userArgs);
                    self.uiChanged(panel, true);
                    effFunc.call(self, null, null, panel, () => {
                        Laya.MouseManager.enabled = true;
                    });
                }
                else {
                    let closeOther = args && args.closeOther;
                    if (closeOther == undefined) {
                        closeOther = true;
                    }
                    Laya.MouseManager.enabled = true;
                    self.uiStack.push(panel);
                    panel.open(closeOther, userArgs);
                    self.uiChanged(panel, true);
                }
                let panelModule = Utils.getModule(panel);
                EventCenter.getInstance().event(BaseEvent.E_PANEL_OPENCLOSE, { code: exports.BaseCode.PANEL_OPEN, name: SceneManager.getModuleName(panelModule), gid: panel.getGID() });
                let Sdk = Laya.ClassUtils.getRegClass('Sdk');
                Sdk.getInstance().sendEvent("面板", { "打开": panel.getModuleUrlName() });
            };
            if (typeof url_module == 'string') {
                let dialogUrl = url_module;
                dialogUrl = this.getSceneUrl(dialogUrl);
                Laya.Dialog.load(dialogUrl, Laya.Handler.create(this, listener));
            }
            else if (args && args.isInstance) {
                listener(url_module);
            }
            else {
                let resUrl = url_module.getRes();
                let dialog = new url_module(...userArgs);
                let loadCnt = 1;
                !dialog.url && (loadCnt = 0);
                if (resUrl && resUrl.length > 0) {
                    loadCnt++;
                    Laya.loader.load(resUrl, Laya.Handler.create(self, () => {
                        loadCnt--;
                        if (loadCnt == 0) {
                            listener(dialog);
                        }
                    }));
                }
                dialog.once('onViewCreated', self, () => {
                    loadCnt--;
                    if (loadCnt == 0) {
                        listener(dialog);
                    }
                });
            }
        }
        //关闭面板
        static closePanel(panel, args) {
            let self = SceneManager;
            let panelModule = Utils.getModule(panel);
            let effectFunc = args && args.effectFunc;
            let autoDestroyAtClosed = args && args.autoDestroy;
            if (autoDestroyAtClosed == undefined) {
                autoDestroyAtClosed = true;
            }
            if (effectFunc) {
                Laya.MouseManager.enabled = false;
                effectFunc.call(self, panel, () => {
                    Laya.MouseManager.enabled = true;
                    panel.autoDestroyAtClosed = autoDestroyAtClosed;
                    panel.isShowEffect = false;
                    panel.close('closePanel');
                    self.uiChanged(panel, false);
                });
            }
            else {
                panel.autoDestroyAtClosed = autoDestroyAtClosed;
                self.uiChanged(panel, false);
                panel.close('closePanel');
                if (panel.isShowEffect) {
                    panel.mouseEnabled = false;
                    panel.once(Laya.Event.REMOVED, this, () => {
                        panel.mouseEnabled = true;
                    });
                }
            }
            EventCenter.getInstance().event(BaseEvent.E_PANEL_OPENCLOSE, { code: exports.BaseCode.PANEL_CLOSE, name: SceneManager.getModuleName(panelModule), gid: panel.getGID() });
        }
        /**
         * 获取当前场景注册名字
         */
        static getCurSceneRgeName() {
            let m = Utils.getModule(this.curScene);
            if (m) {
                return this.getModuleName(m);
            }
        }
        /**
         * 获取当前 view 注册的名字
         */
        static getCurViewRgeName() {
            let m = Utils.getModule(this.curScene.curView);
            if (m) {
                return this.getModuleName(m);
            }
        }
        /**
         * 获取当前 dialog 注册的名字
         */
        static getCurDialogRegName() {
            let manager = Laya.Dialog.manager;
            let dialog = manager.getChildAt(manager.numChildren - 1);
            if (dialog) {
                return this.getModuleName(Utils.getModule(dialog));
            }
        }
        static getCurUIRegName(rIdx = 1) {
            let ui = this.uiStack[this.uiStack.length - rIdx];
            if (ui) {
                return this.getModuleName(Utils.getModule(ui));
            }
        }
        static isInUIStack(ui) {
            return this.uiStack.indexOf(ui) != -1;
        }
    }
    // 切换特效
    SceneManager.EFFECT_CHANGE_SCENE_FUNC = {
        FADE_OUT: undefined,
        FADE_OUT_BLACK: undefined,
        FADE_INOUT: undefined,
        FADE_IN_OUT: undefined,
        QSCALE_IN: undefined,
        QSCALE_OUT: undefined,
    };
    SceneManager.uiStack = [];
    // 特效实现
    SceneManager.EFFECT_CHANGE_SCENE_FUNC.FADE_OUT_BLACK = function (millSec, view, overFunc, nextView, overFuncNext) {
        nextView.visible = false;
        Effect.shadeScreen("#000000", millSec, 1, Laya.Handler.create(this, () => {
            nextView.visible = true;
            overFunc && overFunc();
            overFuncNext && overFuncNext();
        }));
    };
    SceneManager.EFFECT_CHANGE_SCENE_FUNC.FADE_OUT = function (millSec, view, overFunc, nextView, overFuncNext) {
        nextView.visible = true;
        Laya.Tween.to(view, { alpha: 0 }, millSec, null, Laya.Handler.create(this, () => {
            view.visible = false;
            overFunc && overFunc();
            overFuncNext && overFuncNext();
        }));
        view.alpha = 1;
        view.zOrder = 1;
    };
    SceneManager.EFFECT_CHANGE_SCENE_FUNC.FADE_INOUT = function (millSec, view, overFunc, nextView, overFuncNext) {
        view.alpha = 1;
        nextView.alpha = 0;
        Laya.Tween.to(view, { alpha: 0 }, millSec, null);
        Laya.Tween.to(nextView, { alpha: 1 }, millSec, null, Laya.Handler.create(this, () => {
            overFunc && overFunc();
            overFuncNext && overFuncNext();
        }));
    };
    SceneManager.EFFECT_CHANGE_SCENE_FUNC.FADE_IN_OUT = function (millSec, view, overFunc, nextView, overFuncNext) {
        view.alpha = 1;
        nextView.alpha = 0;
        Laya.Tween.to(view, { alpha: 0 }, millSec * 0.5, null, Laya.Handler.create(this, () => {
            Laya.Tween.to(nextView, { alpha: 1 }, millSec * 0.5, null, Laya.Handler.create(this, () => {
                overFunc && overFunc();
                overFuncNext && overFuncNext();
            }));
        }));
    };
    SceneManager.EFFECT_CHANGE_SCENE_FUNC.QSCALE_IN = function (view, overFunc, nextView, overFuncNext) {
        nextView.alpha = 0;
        Laya.timer.once(100, this, () => {
            nextView.anchorX = nextView.anchorY = 0.5;
            nextView.pos(Laya.stage.width / 2, Laya.stage.height / 2);
            Laya.Tween.from(nextView, { scaleX: 0, scaleY: 0 }, 300, Laya.Ease.backOut, Laya.Handler.create(this, () => {
                overFunc && overFunc();
                overFuncNext && overFuncNext();
            }));
            Laya.Tween.to(nextView, { alpha: 1 }, 400, null, null);
        });
    };
    SceneManager.EFFECT_CHANGE_SCENE_FUNC.QSCALE_OUT = function (view, overFunc, nextView, overFuncNext) {
        Laya.Tween.to(view, { scaleX: 0, scaleY: 0 }, 150, null, Laya.Handler.create(view, () => {
            overFunc && overFunc();
            overFuncNext && overFuncNext();
        }, [view]));
        let img = view.img_m;
        if (img) {
            img.visible = false;
        }
    };
    Laya.ClassUtils.regClass('SceneManager', SceneManager);

    /*
    * Created on Thu Feb 21 2019 by husong
    *
    *  配置tool/cfg中的工具使用
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class CfgMgr {
        constructor() {
            this.mData = {};
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new CfgMgr();
            }
            return this.instance;
        }
        load(completeFunc, path) {
            var checkType = function (value) {
                if ("string" != typeof (value)) {
                    return [false];
                }
                var n = Number(value);
                if (!isNaN(n)) { //数字
                    return [true, n];
                }
                else {
                    let tmp = value.toLowerCase();
                    if ((tmp == "true") || (tmp == "false")) {
                        return [true, (tmp == "true")];
                    }
                }
                return [false];
            };
            var prase = function (value) {
                let result = value;
                if ("string" != typeof (result)) {
                    return result;
                }
                if (-1 != result.indexOf(";")) { //字符串中存在分号
                    result = result.split(";");
                    //当最后一段为空字符串时，弹出
                    if (0 == result[result.length - 1].length) {
                        result.pop();
                    }
                    result.forEach((value, i) => {
                        if (-1 != value.indexOf(":")) {
                            result[i] = value.split(":");
                            result[i].forEach((v, j) => {
                                let [res, resV] = checkType(v);
                                if (res) {
                                    result[i][j] = resV;
                                }
                            });
                        }
                        else {
                            let [res, resV] = checkType(value);
                            if (res) {
                                result[i] = resV;
                            }
                        }
                    });
                }
                else if (-1 != result.indexOf(":")) { //字符串中不存在":"
                    result = result.split(":");
                    result.forEach((value, i) => {
                        let [res, resV] = checkType(value);
                        if (res) {
                            result[i] = resV;
                        }
                    });
                }
                else {
                    let [res, resV] = checkType(result);
                    if (res) {
                        result = resV;
                    }
                }
                return result;
            };
            if (path && path.length) {
                Laya.loader.load(path, Laya.Handler.create(this, (...paths) => {
                    let result = paths.pop();
                    if (!result) {
                        return;
                    }
                    path.forEach(pth => {
                        var json = Laya.loader.getRes(pth);
                        let cfgFileName = Utils.pathInfo(pth).filename;
                        if (!this.mData[cfgFileName]) {
                            //解析,存储配置文件
                            this.mData[cfgFileName] = {};
                            json.forEach(element => {
                                let elementID = String(element.id);
                                this.mData[cfgFileName][elementID] = element;
                                // 解析每个字段，看是否有分隔符";"or":"
                                let keys = Object.getOwnPropertyNames(element);
                                keys.forEach(k => {
                                    if (-1 === k.indexOf("_noparse")) {
                                        this.mData[cfgFileName][elementID][k] = prase(element[k]);
                                    }
                                    else {
                                        let ok = k.substr(0, k.length - 8);
                                        this.mData[cfgFileName][elementID][ok] = element[k];
                                    }
                                });
                            });
                        }
                    });
                    completeFunc.run();
                }));
            }
            else {
                // 清单文件读取所有json配置文件路径
                Laya.loader.load("json/list.txt", new Laya.Handler(this, function (...args) {
                    if (!args.pop()) {
                        completeFunc.run();
                        return;
                    }
                    var jsonPathArr = Laya.loader.getRes("json/list.txt").replace(/\r\n/g, "\n").split("\n");
                    jsonPathArr.pop();
                    //由于bat写入全路径，所以这需要整理。后期优化为写入相对路径，去掉该逻辑。
                    var trimPaths = [];
                    jsonPathArr.forEach(element => {
                        var path = element.substr(element.indexOf("json"));
                        if (-1 == element.indexOf(".txt")) {
                            trimPaths.push(path.replace("\\", "/"));
                        }
                    });
                    Laya.loader.load(trimPaths, new Laya.Handler(this, function (...paths) {
                        let result = paths.pop();
                        if (!result) {
                            return;
                        }
                        paths.forEach(path => {
                            var json = Laya.loader.getRes(path);
                            //取配置文件名
                            let cfgFileName = Utils.pathInfo(path).filename;
                            //解析,存储配置文件
                            this.mData[cfgFileName] = {};
                            var json = Laya.loader.getRes(path);
                            json.forEach(element => {
                                let elementID = String(element.id);
                                this.mData[cfgFileName][elementID] = element;
                                // 解析每个字段，看是否有分隔符";"or":"
                                var keys = Object.getOwnPropertyNames(element);
                                keys.forEach(k => {
                                    if (-1 === k.indexOf("_noparse")) {
                                        this.mData[cfgFileName][elementID][k] = prase(element[k]);
                                    }
                                    else {
                                        let ok = k.substr(0, k.length - 8);
                                        this.mData[cfgFileName][elementID][ok] = element[k];
                                    }
                                });
                            });
                        });
                        // 配置加载完毕
                        completeFunc.run();
                    }, trimPaths));
                }));
            }
        }
        //如果只传入fileName,则取到整个配置文件
        //如果传入fileName&&id, 则取到配置文件id对应行
        //如果传入fileName&&id&&key, 则渠道配置文件对应id对应key的字段
        get(filename, id, key) {
            if (null == this.mData[filename]) {
                return null;
            }
            if (null == id && null == key) {
                return this.mData[filename];
            }
            if (null == this.mData[filename][id]) {
                return null;
            }
            if (null == key) {
                return this.mData[filename][id];
            }
            return this.mData[filename][id][key];
        }
        getConstant(id) {
            return this.get("constant", id, "content");
        }
        getStr(id) {
            return this.get("lang_ch", id, "content");
        }
        isDebugMode() {
            let mode = this.getConstant("mode");
            if (null == mode)
                return false;
            if ("r" == mode)
                return false;
            return true;
        }
        getRecordNum(filename) {
            let ini = this.get(filename);
            let keys = Object.getOwnPropertyNames(ini);
            return keys.length;
        }
        // public var(v:string):any {
        //     if (!v) {
        //         return v;
        //     }
        //     let tmp = v.toLowerCase();
        //     if (tmp == "true" || tmp == "false") {
        //         return v == "true";
        //     }
        //     let i = Number(v);
        //     if(isNaN(i)) {
        //         return v;
        //     } else {
        //         return i;
        //     }
        // }
        /**
         * 单独加载json配置
         * @param filename
         */
        loadJson(filename, handler) {
            if (!filename) {
                return;
            }
            Laya.loader.load(filename, Laya.Handler.create(this, (cfg) => {
                this.mData[filename] = cfg;
                if (handler) {
                    handler.runWith(cfg);
                }
            }));
        }
    }

    /*
    * Created on Fri Mar 15 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class Sdk extends BaseLogic {
        constructor() {
            super();
            this.friendHead = null; //好友头像
            this.ipQueryRsp = undefined; //ip信息
            //========================================================================
            //								渠道
            //========================================================================
            this._channel = undefined; //量的来源,渠道
            this._adIds = undefined; //根据渠道确定的广告id
            this.fromSceneValues = new Array();
            //平台登陆实例初始化
            let platform = Utils.isOnPC() ? exports.SDKEntity.PlatformType.PC : Sdk.GameCfg.platform;
            let loginModule = Laya.ClassUtils.getRegClass(platform.toString());
            if (loginModule) {
                this.loginInst = new loginModule();
                console.log(`current platform: ${platform.toString()}`);
            }
            else {
                console.assert(false, 'unknown platform !!!');
            }
            // 分享实例
            this.shareInst = this.loginInst.getShareInstance();
            // 广告实例
            this.adInst = this.loginInst.getAdvInstance();
            //统计实例
            this.statInst = this.loginInst.getStatInstance();
        }
        // 静态初始化
        static sInit(GameCfg) {
            this.GameCfg = GameCfg;
            // 注册平台, 解决编译丢失的问题
            this.registerPlatform();
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new Sdk();
            }
            return this.instance;
        }
        static registerPlatform() {
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.PC.toString(), Login);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.WEIXIN.toString(), WXLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.OPPO.toString(), OppoLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.BAIDU.toString(), BDLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.VIVO.toString(), VivoLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.TAPTAP.toString(), TapTapLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.QQ.toString(), QQLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.TT.toString(), TTLogin);
            Laya.ClassUtils.regClass(exports.SDKEntity.PlatformType.QTT.toString(), QTTLogin);
        }
        static isOnVivo() {
            return this.GameCfg.platform == PlatformType.VIVO;
        }
        static isOnToutiao() {
            return this.GameCfg.platform == PlatformType.TT;
        }
        static isOnBaidu() {
            return this.GameCfg.platform == PlatformType.BAIDU;
        }
        static isOnOppo() {
            return this.GameCfg.platform == PlatformType.OPPO;
        }
        static isOnXiaoMi() {
            return this.GameCfg.platform == PlatformType.XIAOMI;
        }
        static isOnWeiXin() {
            return this.GameCfg.platform == PlatformType.WEIXIN;
        }
        static isOnTapTap() {
            return this.GameCfg.platform == PlatformType.TAPTAP;
        }
        initMiniAdapter() {
            this.loginInst.initMiniAdapter();
        }
        afterEngineInit(didEnterBackground, willEnterForeground) {
            if (!Utils.isOnPC()) {
                // 设置屏幕常亮
                this.loginInst.setKeepScreenOn({
                    keepScreenOn: true
                });
                //前后台切换
                this.loginInst.onShow(willEnterForeground);
                this.loginInst.onHide(didEnterBackground);
            }
            this.loginInst.engineInitialized();
        }
        onInitOnce() {
            // 注册SDK消息
            this.on(SdkEvent.E_SDK_LOGIN, this, this.loginSuccess);
            this.on(BaseEvent.E_APP_ON_RESUME, this, this.onResume);
            // 注册服务器消息
            SdkMsg.getInstance().on(SdkMsgEvent.E_SERVER_LOGIN, this, this.onMsgServerLogin);
            SdkMsg.getInstance().on(SdkMsgEvent.E_SERVER_RELOGIN, this, this.login);
            SdkMsg.getInstance().on(SdkMsgEvent.E_SHARE_INFO, this, this.onMsgShareInfo);
            SdkMsg.getInstance().on(SdkMsgEvent.E_SHARE_QUERY_USERINFO, this, this.onMsgShareQuery);
            SdkMsg.getInstance().on(SdkMsgEvent.E_PROFILE_RESULT, this, this.onMsgProfile);
            SdkMsg.getInstance().on(SdkMsgEvent.E_IP_RESULT, this, this.onMsgGetIP);
            this.login();
        }
        login() {
            UserLogic.getInstance().init(); // 初始化玩家数据
            this.loginInst.login();
            //
            SdkMsg.getInstance().getIpQueryInfo();
        }
        onResume(res) {
            if (Utils.isOnWeiXin()) {
                console.log("Sdk OnResume:" + JSON.stringify(res));
                if (res && res.scene) {
                    res.scene = Number(res.scene);
                }
                if (this.loginInst) {
                    this.loginInst.onResume(res);
                }
                let sceneId = -1;
                if (res && res.scene)
                    sceneId = res.scene;
                if ((-1 !== sceneId) && (this.fromSceneValues.indexOf(res.scene) === -1))
                    this.fromSceneValues.push(res.scene);
                // this.judgeBAndW({ sceneId: res.scene });
                this.curEnterSceneId = sceneId;
            }
        }
        /**
          * 授权并获取玩家信息
          * @param authBtn 游戏授权按钮
          * @param caller
          * @param listener
          */
        wxAuth(authBtn, caller, listener) {
            if (this.serverCfg && this.serverCfg.isAuthorized) {
                return false;
            }
            if (!this.loginInst.isAuth()) {
                if (authBtn) {
                    this.loginInst.auth(authBtn);
                }
                if (caller && listener) {
                    caller.on(SdkUIEvent.E_USER_INFO, caller, listener);
                }
                return true;
            }
            return false;
        }
        getLocalAuth() {
            if (!this.loginInst.isAuth()) {
                return true;
            }
            return false;
        }
        onMsgProfile() {
            if (this.serverCfg) {
                this.serverCfg.isAuthorized = true;
            }
        }
        wxDestroyAuthBtn() {
            if (this.serverCfg && this.serverCfg.isAuthorized)
                return;
            if (this.loginInst)
                this.loginInst.destroyUserInfoButton();
        }
        loginSuccess(e) {
            let code = e.code;
            if (code == exports.SdkCode.WX_LOGIN_SUCCESS) {
                if (!this.loginInst.isLoginServer()) {
                    this.complete();
                }
            }
            else {
                // 退出游戏
                Sdk.getInstance().showModal('平台登录失败~ 请稍后尝试重新打开游戏。', '糟糕', '退出', Laya.Handler.create(this, () => {
                    this.loginInst.exit();
                }), '');
            }
        }
        onMsgServerLogin(e) {
            let code = e.code;
            if (code == exports.SdkCode.SERVER_LOGIN_SUCCESS) {
                let pkg = e.pkg;
                this.serverCfg = pkg.userCfg;
                this.fromUserInfo = pkg.fromUserInfo;
                this.complete(pkg);
            }
            else if (code == exports.SdkCode.SERVER_LOGIN_ERROR) {
                Sdk.getInstance().showModal('出错了~ 请稍后尝试重新打开游戏。', '糟糕', '退出', Laya.Handler.create(this, () => {
                    this.loginInst.exit();
                }));
            }
            else {
                // 服务器登录失败
                if (Utils.isOnMiniGame()) {
                    Sdk.getInstance().showModal('服务器登录失败~ 请稍后尝试重新打开游戏。', '糟糕', '退出', Laya.Handler.create(this, () => {
                        this.loginInst.exit();
                    }), '');
                }
                else {
                    Utils.showTips('服务器登录失败！请稍后重试。');
                }
            }
        }
        complete(pkg) {
            this.getServerJsonCfg(); //从服务器上获取配置
            this.event(SdkUIEvent.E_SDK_INIT_OK, pkg); //loading完成进入主场景
            // 获取场景值
            if (Utils.isOnMiniGame() && this.loginInst) {
                let launchParams = this.loginInst.getLaunchOptionsSync();
                console.log('sdk Login success with ' + JSON.stringify(launchParams));
                let sceneId = -1;
                if (launchParams && launchParams.scene)
                    sceneId = launchParams.scene;
                if ((-1 !== sceneId) && (this.fromSceneValues.indexOf(launchParams.scene) === -1)) {
                    this.fromSceneValues.push(launchParams.scene);
                }
                // this.judgeBAndW({ sceneId: sceneId });
                this.curEnterSceneId = sceneId;
            }
        }
        getFavoriteReward(caller, listener, showTips = true) {
            let fromFavorite = this.fromSceneValues.indexOf(1089) != -1;
            if (fromFavorite) {
                // 从收藏启动
                if (this.isServerEnable()) {
                    if (this.serverCfg && !this.serverCfg.favoriteReward) {
                        SdkMsg.getInstance().postFavoriteReward();
                        SdkMsg.getInstance().once(SdkMsgEvent.E_FAVORITE_REWARD_RESULT, this, () => {
                            this.serverCfg.favoriteReward = true;
                            this.event(SdkUIEvent.E_FAVORITE_REWARD);
                        });
                        if (caller && listener) {
                            caller.once(SdkUIEvent.E_FAVORITE_REWARD, caller, listener);
                        }
                    }
                }
                else {
                    if (caller && listener) {
                        caller.once(SdkUIEvent.E_FAVORITE_REWARD, caller, listener);
                    }
                }
            }
            else {
                if (showTips)
                    Utils.showTips('请从我的小程序进入游戏后再来领取奖励吧~');
            }
        }
        setServerCfg(pkg) {
            this.serverCfg = pkg;
            // 派发配置
            this.event(SdkUIEvent.E_SERVER_CFG_UPDATE, this.serverCfg);
        }
        getServerCfg() {
            return this.serverCfg;
        }
        showGameAd() {
            let AdManager = Laya.ClassUtils.getRegClass("AdManager");
            if (!AdManager) {
                return;
            }
            if (this.adData) {
                AdManager.getInstance().init(this.adData);
            }
            else {
                this.adData = true;
            }
        }
        showImageAd(imgAdBtn) {
            let AdManager = Laya.ClassUtils.getRegClass("AdManager");
            if (!AdManager) {
                return;
            }
            if (this.adData) {
                AdManager.getInstance().init(this.adData, imgAdBtn);
            }
            else {
                this.adData = true;
                this.imgAdBtn = imgAdBtn;
            }
        }
        showRank() {
            let WXRank = Laya.ClassUtils.getRegClass("WXRank");
            SceneManager.openPanel(WXRank, SceneManager.EFFECT_CHANGE_SCENE_FUNC.QSCALE_IN);
        }
        //========================================================================
        //								分享
        //========================================================================
        /**
          * 右上角胶囊启用分享
          * @param title 标题
          * @param imgUrl 图片链接或者 canvas.toTempFilePathSync 返回值
          */
        enableShare(title, imgUrl) {
            if (!Utils.isOnMiniGame() || !this.shareInst) {
                return;
            }
            this.shareInst.setShare(title, imgUrl);
        }
        share(args1, args2, args3) {
            if (!this.shareInst) {
                return;
            }
            if (args1 instanceof RewardGainWayParams) {
                if (!args1.title && !args1.imgUrl) {
                    let shareCfg = this.getServerJsonCfgShareCfg();
                    if (shareCfg) {
                        let shareInfo = null;
                        if (args1.type) {
                            shareInfo = shareCfg[args1.type];
                        }
                        else {
                            shareInfo = Utils.randomInArray(shareCfg);
                        }
                        if (shareInfo) {
                            args1.title = shareInfo.title;
                            args1.imgUrl = shareInfo.image;
                        }
                    }
                    if (!args1.title && !args1.imgUrl) {
                        args1.title = Sdk.GameCfg.local_share_title;
                        args1.imgUrl = Sdk.GameCfg.local_share_image;
                    }
                }
                this.shareInst.share(args1);
            }
            else {
                let title = null, imgUrl = null, shareType = null, query = null;
                if (!args1) {
                    title = Sdk.GameCfg.local_share_title;
                    imgUrl = Sdk.GameCfg.local_share_image;
                }
                else {
                    if (args1 instanceof exports.SDKEntity.ShareQueryParam) {
                        if (args2 && args3) {
                            title = args2, imgUrl = args3;
                        }
                        else {
                            shareType = args1.shareType;
                        }
                        query = args1;
                    }
                    else if ("number" === typeof (args1)) {
                        shareType = args1;
                    }
                    else if ("string" === typeof (args1)) {
                        title = args1, imgUrl = args2;
                    }
                }
                if (!title && !imgUrl) {
                    let shareCfg = this.getServerJsonCfgShareCfg();
                    if (shareCfg) {
                        let shareInfo = null;
                        if (shareType) {
                            shareInfo = shareCfg[shareType];
                        }
                        else {
                            shareInfo = Utils.randomInArray(shareCfg);
                        }
                    }
                }
                this.shareInst.share(title, imgUrl, query);
            }
        }
        onMsgShareInfo(pkg) {
            this.shareData = pkg;
            this.event(SdkUIEvent.E_GET_SHARE_INFO, pkg);
        }
        onMsgShareQuery(fromUserInfo) {
            this.fromUserInfo = fromUserInfo;
            this.event(SdkUIEvent.E_SHARE_QUERY_INFO);
        }
        /**
         * 分享完成后获取 服务器分享信息
         * @param types
         * @param caller
         * @param listener
         */
        getShareInfo(types, caller, listener) {
            // 注册UI事件
            caller.once(SdkUIEvent.E_GET_SHARE_INFO, caller, listener);
            // 服务器获取
            SdkMsg.getInstance().getShareInfo(types);
        }
        /**
          * 获取是否通过某个玩家分享的链接进入游戏
          */
        getShareQueryInfo() {
            if (this.loginInst) {
                let query = this.loginInst.getQuery();
                let fromUserInfo = this.fromUserInfo;
                query = this.loginInst.getQuery();
                if (query && fromUserInfo) {
                    if (!fromUserInfo.name) {
                        fromUserInfo.name = CfgMgr.getInstance().getStr("unauthorized");
                    }
                    return { query: query, fromUserInfo: fromUserInfo };
                }
            }
        }
        getQueryInfo() {
            if (!this.loginInst) {
                return;
            }
            if (!this.loginInst.getQuery) {
                return;
            }
            return this.loginInst.getQuery();
        }
        //========================================================================
        //								广告
        //========================================================================
        preloadVideo(videoId) {
            if (!this.adInst)
                return;
            if (!videoId)
                videoId = Sdk.getInstance().getVideoId();
            if (!videoId)
                return;
            this.adInst.preloadVideo(videoId);
        }
        isHasVideo(videoId) {
            if (!this.adInst) {
                return exports.VideoState.UNENABLED;
            }
            if (!videoId)
                videoId = Sdk.getInstance().getVideoId();
            if (!videoId)
                return;
            let state = this.adInst.getVideoState(videoId);
            //如果分享禁用，则默认视频可用，
            //就算视频不可用也不根据状态来切换为分享按钮
            if (Sdk.getInstance().isAudit()) {
                state = exports.VideoState.ENABLED;
            }
            return state;
        }
        playVideo(videoId) {
            if (!this.adInst) {
                this.event(SdkUIEvent.E_AD_VIDEO, { code: exports.SdkCode.AD_VIDEO_SUCCESS });
                return;
            }
            if (!videoId)
                videoId = Sdk.getInstance().getVideoId();
            if (!videoId)
                return;
            this.adInst.playVideo(videoId);
        }
        preloadBanner(bannerId, customParams) {
            if (!this.adInst)
                return;
            if (!bannerId)
                bannerId = Sdk.getInstance().getBannerId();
            if (!bannerId) {
                return;
            }
            this.adInst.preloadBanner(bannerId, customParams);
        }
        showBanner(bannerId, customParams) {
            if (!this.adInst)
                return;
            if (!bannerId)
                bannerId = Sdk.getInstance().getBannerId();
            if (!bannerId) {
                return;
            }
            this.adInst.showBanner(bannerId, customParams);
        }
        hideBanner(bannerId) {
            if (!this.adInst)
                return;
            if (!bannerId)
                bannerId = Sdk.getInstance().getBannerId();
            if (!bannerId) {
                return;
            }
            this.adInst.hideBanner(bannerId);
        }
        getBanner(bannerId) {
            if (!this.adInst)
                return;
            if (!bannerId)
                bannerId = Sdk.getInstance().getBannerId();
            if (!bannerId) {
                return;
            }
            return this.adInst.getBannerById(bannerId);
        }
        preloadInterstitial(id) {
            if (!this.adInst)
                return;
            if (!id) {
                return;
            }
            this.adInst.preloadInterstitial(id);
        }
        showInterstitial(id) {
            if (!this.adInst)
                return;
            if (!id) {
                return;
            }
            this.adInst.showInterstitial(id);
        }
        preloadNativeAd(nativeAds, imgPath) {
            if (!this.adInst)
                return;
            this.adInst.preloadNativeAd(nativeAds, imgPath);
        }
        showNativeAd(parent, pos) {
            if (!this.adInst)
                return;
            this.adInst.showNativeAd(parent, pos);
        }
        destoryNativeAd() {
            if (!this.adInst)
                return;
            this.adInst.destoryNativeAd();
        }
        preloadAppbox(appBoxId) {
            if (!this.adInst)
                return;
            if (!appBoxId)
                appBoxId = Sdk.getInstance().getAppBoxId();
            if (!appBoxId)
                return;
            this.adInst.preloadAppbox(appBoxId);
        }
        showAppBox() {
            if (!this.adInst)
                return;
            if (!this.getAppBoxData())
                return;
            this.adInst.showAppBox();
        }
        hideAppBox() {
            if (!this.adInst)
                return;
            this.adInst.hideAppBox();
        }
        destoryAppBox() {
            if (!this.adInst)
                return;
            this.adInst.destoryAppBox();
        }
        getAppBoxData() {
            if (!this.adInst)
                return;
            return this.adInst.getAppBoxData() ? true : false;
        }
        //========================================================================
        //								奖励策略
        //========================================================================
        getRewardStrategyInst() {
            return this.loginInst.getRewardStrInstance();
            // return this.rewardStrInst.getStrategy();
        }
        // runRewardStrategy() {
        // 	// this.rewardStrInst.runStrategy();
        // }
        // setRewardStrategy(s:GetRewardSDKWay, params:RewardGainWayParams) {
        // 	// this.rewardStrInst.setCurStrategy(s, params);
        // }
        //========================================================================
        //								统计
        //========================================================================
        /**
         * 发送自定义事件
         * @param eventName
         * @param params
         */
        sendEvent(eventName, params) {
            console.log(`阿拉丁自定义事件[${eventName}]-[${JSON.stringify(params)}]`);
            if (!this.statInst)
                return;
            this.statInst.sendEvent(eventName, params);
        }
        /**
         * 关卡开始
         * @param o
         */
        stageOnStart(o) {
            if (!this.statInst)
                return;
            console.log(`阿拉丁关卡统计[关卡开始]-${JSON.stringify(o)}`);
            this.statInst.stageOnStart(o);
        }
        /**
         * 关卡运行中触发事件
         * @param o
         */
        stageOnRunning(o) {
            if (!this.statInst)
                return;
            this.statInst.stageOnRunning(o);
        }
        /**
         * 关卡结束
         * @param o
         */
        stageOnEnd(o) {
            if (!this.statInst)
                return;
            console.log(`阿拉丁关卡统计[关卡结算]-${JSON.stringify(o)}`);
            this.statInst.stageOnEnd(o);
        }
        /**
         * 解锁道具
         * @param o
         */
        unlockItem(o) {
            if (!this.statInst)
                return;
            this.statInst.unlockItem(o);
        }
        //========================================================================
        //								视频录制
        //========================================================================
        canRecord() {
            if (this.shareInst) {
                return this.shareInst.canRecord();
            }
            return false;
        }
        startRecord() {
            if (this.shareInst) {
                this.shareInst.recordVideo({ duration: 120 });
            }
        }
        stopRecord() {
            if (this.shareInst) {
                this.shareInst.stopRecord();
            }
        }
        shareVideo(url) {
            if (this.shareInst) {
                this.shareInst.shareVideo(url);
            }
        }
        /**
         * 小游戏跳转 appId: string, success?: Function, fail?: Function, path?: string
         * @param appId
         * @param success
         * @param fail
         */
        navigateApp(opt) {
            if (!Utils.isOnMiniGame()) {
                return;
            }
            this.loginInst.navigateToMiniProgram(opt);
        }
        //========================================================================
        //								反馈
        //========================================================================
        showFeedBack(fbBtn) {
            // if (this.feedBackBtn) {
            // 	this.feedBackBtn.show();
            // 	return;
            // }
            // let leftTop = fbBtn.localToGlobal(new Laya.Point(0, 0));
            // let rightBottom = fbBtn.localToGlobal(new Laya.Point(fbBtn.width, fbBtn.height));
            // let points = [];
            // Laya.stage._canvasTransform.transformPointArray([leftTop.x, leftTop.y, rightBottom.x, rightBottom.y], points);
            // leftTop.setTo(points[0], points[1]);
            // rightBottom.setTo(points[2], points[3]);
            // let width = rightBottom.x - leftTop.x;
            // let height = rightBottom.y - leftTop.y;
            // let button = this.loginInst.createFeedbackButton({
            // 	type: 'text',
            // 	text: '',
            // 	style: {
            // 		left: leftTop.x,
            // 		top: leftTop.y,
            // 		width: width,
            // 		height: height,
            // 		// backgroundColor: '#ff0000',
            // 	}
            // });
            // if (button) {
            // 	button.show();
            // 	button.onTap(() => {
            // 		this.hideFeedBack();
            // 		this.event(SdkUIEvent.E_FEEDBACK_CLICK);
            // 	});
            // 	this.feedBackBtn = button;
            // }
        }
        hideFeedBack() {
            if (this.feedBackBtn) {
                this.feedBackBtn.hide();
            }
        }
        //========================================================================
        //								数据域
        //========================================================================
        getOpenDataContext() {
            return this.loginInst.getOpenDataContext();
        }
        /**
         * 向开发数据域发送消息
         * @param data
         */
        postMessage(data) {
            let odc = this.getOpenDataContext();
            if (odc) {
                odc.postMessage(data);
            }
        }
        /**
          * 显示客服对话框
          */
        openCustomerServiceConversation(obj) {
            this.loginInst.openCustomerServiceConversation(obj || {});
        }
        /**
          * 获取隐私数据
          * 0: encryptedData 1: iv
          */
        getEncryptedDataIv() {
            if (Utils.isOnWeiXin() && this.loginInst) {
                let instance = this.loginInst;
                return instance.getEncryptedData();
            }
        }
        //========================================================================
        //								开关相关
        //========================================================================
        isAudit() {
            let audit = false; //审核状态
            let curServerVersion = this.getServerJsonCfgVersion();
            if (Utils.compareVersion(Sdk.GameCfg.version, curServerVersion) > 0)
                audit = true;
            return audit;
        }
        isHarvest() {
            if (this.isAudit()) {
                console.log("###=======================isHarvest:[审核状态]");
                return false;
            }
            if (!this.getServerJsonCfgHarvestEnable()) {
                console.log("###=======================isHarvest:[非收割状态]");
                return false;
            }
            let isHarvest = false;
            if (exports.BlackAndWhite.White === this.bAndWProperty) {
                isHarvest = true;
            }
            console.log(`###=======================isHarvest:是否为白名单[${isHarvest}]`);
            //ip判断
            console.log(`###=======================isHarvest:是否需要IP检测[${this.isCheckIPEnabled()}]`);
            if (isHarvest && this.isCheckIPEnabled()) {
                if (!this.ipQueryRsp) {
                    //没取到ip,重新连接服务器取ip
                    console.log(`###=======================isHarvest:未获取到IP信息,重连服务器获得`);
                    SdkMsg.getInstance().getIpQueryInfo();
                    isHarvest = false;
                }
                else {
                    let isSafe = () => {
                        let unsafeAreas = this.getServerJsonCfgUnsafeArea();
                        if (!unsafeAreas)
                            return false;
                        let isSafeIp = true; //是否安全ip
                        for (let i = 0; i < unsafeAreas.length; ++i) {
                            let unsafeArea = unsafeAreas[i];
                            if (!unsafeArea)
                                continue;
                            if (unsafeArea.judgeLev) {
                                //暂时未实现
                            }
                            else {
                                if (-1 !== unsafeArea.province.indexOf(this.ipQueryRsp.province)) {
                                    isSafeIp = false;
                                    break;
                                }
                            }
                        }
                        return isSafeIp;
                    };
                    isHarvest = isSafe();
                    console.log(`###=======================isHarvest:是否为安全IP[${isHarvest}]`);
                }
            }
            //染白开关判断逻辑
            if (!isHarvest) {
                let serverJsonCfg = Sdk.getInstance().getServerJsonCfg();
                if (serverJsonCfg) {
                    isHarvest = Boolean(serverJsonCfg.changeWhite);
                    console.log(`###=======================isHarvest:是否染白[${isHarvest}]`);
                }
            }
            console.log(`###=======================isHarvest:收割最终标记[${isHarvest}]`);
            return isHarvest;
        }
        judgeBAndW(params) {
            //场景值判断
            this.bAndWProperty = this.loginInst.judgeBAndW(params);
            console.log(`###黑白名单[${this.bAndWProperty}]-场景值[${params.sceneId}]`);
        }
        onMsgGetIP(pkg) {
            if (!pkg)
                return;
            this.ipQueryRsp = pkg;
        }
        getPromotionEnable() {
            if (this.isAudit())
                return false;
            let judgePromotion = () => {
                if (jsonCfg.promotionEnable) {
                    if (exports.BlackAndWhite.White === this.bAndWProperty) {
                        return true;
                    }
                    else {
                        return jsonCfg.promotionBlackEnable;
                    }
                }
                else {
                    return false;
                }
            };
            let jsonCfg = this.getServerJsonCfg();
            if (jsonCfg) {
                if (jsonCfg.promotion_harvestConnection) {
                    if (this.isHarvest()) {
                        return judgePromotion();
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return judgePromotion();
                }
            }
            else {
                return false;
            }
        }
        getShareEnable() {
            let shareEnabled = false;
            if (!Sdk.getInstance().isHarvest()) {
                shareEnabled = Sdk.getInstance().getServerJsonCfgShareEnable();
            }
            return shareEnabled;
        }
        //========================================================================
        //								服务器配置
        //========================================================================
        getServerJsonCfg() {
            if (!this.serverJsonCfg) {
                if ((Sdk.GameCfg.server_cfg_url !== "") && this.loginInst) {
                    this.loginInst.request(Sdk.GameCfg.server_cfg_url, null, Laya.Handler.create(this, (serverCfgPkg) => {
                        this.serverJsonCfg = serverCfgPkg;
                        // 广告预加载
                        if (Utils.isOnMiniGame()) {
                            Sdk.getInstance().preloadVideo();
                            Sdk.getInstance().preloadBanner();
                            Sdk.getInstance().preloadAppbox();
                        }
                        // 胶囊分享设置
                        if (this.serverJsonCfg.shareCfg
                            && (0 !== this.serverJsonCfg.shareCfg.length)) {
                            let shareInfo = Utils.randomInArray(this.serverJsonCfg.shareCfg);
                            this.enableShare(shareInfo.title, shareInfo.image);
                        }
                        //根据场景值判断黑白名单
                        this.judgeBAndW({ sceneId: this.curEnterSceneId });
                    }), 'GET');
                }
            }
            return this.serverJsonCfg;
        }
        getServerJsonCfgVersion() {
            let cfg = this.getServerJsonCfg();
            if (cfg) {
                return cfg.version;
            }
            else {
                return "0.0.0";
            }
        }
        getServerJsonCfgShareEnable() {
            let cfg = this.getServerJsonCfg();
            if (cfg) {
                return cfg.shareEnable;
            }
            else {
                return false;
            }
        }
        getServerJsonCfgNavigateEnable() {
            let cfg = this.getServerJsonCfg();
            if (cfg) {
                return cfg.navigateEnable;
            }
            else {
                return false;
            }
        }
        getServerJsonCfgHarvestEnable() {
            let cfg = this.getServerJsonCfg();
            if (cfg) {
                return Boolean(cfg.harvestEnable);
            }
            else {
                return false;
            }
        }
        getServerJsonCfgShareCfg() {
            let cfg = this.getServerJsonCfg();
            if (cfg) {
                return cfg.shareCfg;
            }
            else {
                return null;
            }
        }
        getServerJsonCfgNoticeHtmlText() {
            let cfg = this.getServerJsonCfg();
            if (cfg) {
                return cfg.noticeHtmlText;
            }
            else {
                return "";
            }
        }
        getServerJsonCfgShareParams() {
            let cfg = this.getServerJsonCfg();
            if (cfg && cfg.shareParams) {
                return cfg.shareParams;
            }
            else {
                return {
                    shareFailProb: 0,
                    FreshShareCntBase: 0,
                    OlderShareCtnBase: 0,
                    ShareSpace: 0,
                };
            }
        }
        getServerJsonCfgNavigateApplist() {
            let cfg = this.getServerJsonCfg();
            if (!cfg)
                return undefined;
            let enable = this.getServerJsonCfgNavigateEnable();
            if (!enable)
                return undefined;
            let list = cfg.navigateAppList;
            if (!list)
                return undefined;
            if (list instanceof Array) {
                return list;
            }
            else {
                return undefined;
            }
        }
        getServerJsonCfgSafeSceneId() {
            let cfg = this.getServerJsonCfg();
            if (!cfg)
                return undefined;
            let safeSceneId = cfg.safeSceneId;
            if (!safeSceneId)
                return undefined;
            if (safeSceneId instanceof Array) {
                return safeSceneId;
            }
            else {
                return undefined;
            }
        }
        getServerJsonCfgUnsafeArea() {
            let cfg = this.getServerJsonCfg();
            if (!cfg)
                return undefined;
            let unsafeArea = cfg.ipUnsafeArea;
            if (!unsafeArea)
                return undefined;
            if (unsafeArea instanceof Array) {
                return unsafeArea;
            }
            else {
                return undefined;
            }
        }
        isCheckIPEnabled() {
            let cfg = this.getServerJsonCfg();
            if (!cfg)
                return true;
            let enable = false;
            let unsafeArea = cfg.ipUnsafeArea;
            if (unsafeArea && (unsafeArea.length !== 0)) {
                enable = true;
            }
            return enable;
        }
        get channel() {
            if (undefined === this._channel) {
                let channel = Laya.LocalStorage.getItem("channel");
                if (channel == null || channel === "") {
                    let query = Sdk.getInstance().getQueryInfo();
                    if (query && query.ald_media_id && query.ald_link_key && query.ald_position_id) {
                        this.channel = `?ald_media_id=${query.ald_media_id}&ald_link_key=${query.ald_link_key}&ald_position_id=${query.ald_position_id}`;
                    }
                    else {
                        this.channel = "default";
                    }
                }
                else {
                    this._channel = channel;
                }
            }
            return this._channel;
        }
        set channel(v) {
            if (v === this._channel)
                return;
            this._channel = v;
            Laya.LocalStorage.setItem("channel", this._channel);
        }
        get adIds() {
            if (undefined === this._adIds) {
                let cfg = Sdk.getInstance().getServerJsonCfg();
                if (cfg && cfg.channel_AdIds) {
                    let idsCfg = cfg.channel_AdIds[this.channel];
                    if (!idsCfg && ("default" !== this.channel)) {
                        idsCfg = cfg.channel_AdIds["default"];
                    }
                    this.initAdIds(idsCfg);
                }
            }
            return this._adIds;
        }
        set adIds(value) {
            this.initAdIds(value);
        }
        getVideoId() {
            if (!this.adIds)
                return null;
            return this.adIds.videoId;
        }
        getBannerId() {
            if (!this.adIds)
                return null;
            return this.adIds.bannerId;
        }
        getAppBoxId() {
            if (!this.adIds)
                return null;
            return this.adIds.appBoxId;
        }
        getNativeAdId() {
            if (!this.adIds)
                return null;
            return this.adIds.nativeAdId;
        }
        initAdIds(o) {
            if (!o)
                return;
            (!this._adIds) && (this._adIds = {});
            (o.videoId) && (this._adIds.videoId = o.videoId);
            (o.bannerId) && (this._adIds.bannerId = o.bannerId);
            (o.interstitialId) && (this._adIds.interstitialId = o.interstitialId);
            (o.appBoxId) && (this._adIds.appBoxId = o.appBoxId);
            (o.nativeAdId) && (this._adIds.nativeAdId = o.nativeAdId);
        }
        //========================================================================
        //								杂项
        //========================================================================
        /**
          * 显示游戏圈按钮
          */
        showGameClubButton(height) {
            this.loginInst.createGameClubButton({
                type: "image",
                style: {
                    left: 8,
                    top: height * 0.05 + 24,
                    width: 30,
                    height: 30,
                },
                icon: "light",
            });
        }
        /**
         * 检查更新
         */
        checkUpdate() {
            this.loginInst.checkUpdate();
        }
        /**
         * 加载子包
         * @param opt
         */
        loadSubpackage(opt) {
            return this.loginInst.loadSubpackage(opt);
        }
        /**
         * 退出
         */
        exit() {
            this.loginInst.exit();
        }
        /**
          * 显示微信模态对话框
          * @param content 内容
          * @param title 标题，默认为 提示
          * @param okTxt 确定按钮文本
          * @param okHandler 确定回调
          * @param cancelTxt 取消按钮文本
          * @param cancelHandler 取消回调
          */
        showModal(content, title = "提示", okTxt = "确定", okHandler, cancelTxt = "取消", cancelHandler) {
            this.loginInst.showModal(content, title, okTxt, okHandler, cancelTxt, cancelHandler);
        }
        /**
         * 系统信息
         */
        getSystemInfo() {
            return this.loginInst.getSystemInfo();
        }
        /**
         * 胶囊信息
         */
        getMenuButtonBoundingClientRect() {
            return this.loginInst.getMenuButtonBoundingClientRect();
        }
        /**
          * 判断是否需要联网
          */
        isServerEnable() {
            return this.loginInst.isLoginServer();
        }
        onAudioInterruption(begincb, endcb) {
            this.loginInst.onAudioInterruption(begincb, endcb);
        }
        /**
          * 是否授权
          */
        isAuth() {
            return this.loginInst.isAuth();
        }
        /**
          * 震动
          */
        vibrate() {
            let userInfo = UserLogic.getInstance().getUserInfo();
            let enable = true;
            if (userInfo && userInfo.vibrateEnable === false) {
                enable = false;
            }
            if (this.loginInst && enable) {
                this.loginInst.vibrateShort();
            }
        }
        /**
         * 或是否链接网络
         */
        isConnectNetwork() {
            return this.loginInst.isConnectNetwork();
        }
        /**
         * 初始化广告实例
         */
        initAdv(customParams) {
            this.adInst && this.adInst.init(customParams);
        }
        /**
         * 返回渠道登陆官方返回的code值
         */
        getCode() {
            return this.loginInst.getCode();
        }
    }
    Laya.ClassUtils.regClass('Sdk', Sdk);

    /*
    * Created on Tue Feb 26 2019 by alimwang
    *
    * 扩展类
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class Size {
        constructor(width = 0, height = 0) {
            this.width = width;
            this.height = height;
        }
    }
    class BaseExtend {
        static init() {
            Math.clamp = function (value, min, max) {
                if (value > max) {
                    return max;
                }
                if (value < min) {
                    return min;
                }
                return value;
            };
            Math.rad = function (angle) {
                return angle * (Math.PI / 180);
            };
            Math.deg = function (radian) {
                return radian * (180 / Math.PI);
            };
            Math.sign = function (value) {
                return (+(value > 0) - +(value < 0)) || +value;
            };
            Math.lerp = function (left, right, factor) {
                factor = Math.clamp(factor, 0, 1);
                return Laya.MathUtil.lerp(left, right, factor);
            };
            Array.prototype.clear = function () {
                let self = this;
                self.length = 0;
            };
            // 重载 Node
            Laya.Node.prototype.seekChildByName = function (name) {
                if (!name) {
                    return;
                }
                let _children = this._children;
                for (const child of _children) {
                    if (child.name == name) {
                        return child;
                    }
                }
                for (const child of _children) {
                    let node = child.seekChildByName(name);
                    if (node) {
                        return node;
                    }
                }
            };
            Laya.Node.prototype.getAllComponents = function () {
                return this._components;
            };
            Laya.Node.prototype.destroyAllComponents = function () {
                let components = this.getAllComponents();
                for (let index = components.length - 1; index >= 0; index--) {
                    let comp = components[index];
                    comp.destroy();
                }
            };
            Laya.Node.prototype.getChildren = function () {
                return this._children;
            };
            // 扩展 Laya.Label 自适应文字
            Laya.Label.prototype.fitWidth = function (ellipsis = true) {
                let self = this;
                let text = self.text;
                let fontStyle = `${self.fontSize}px ${self.font}`;
                let measureWidth = Laya.Browser.measureText(text, fontStyle).width;
                if (isNaN(self.width) || measureWidth <= self.width) {
                    return;
                }
                let ellipsisStr = ellipsis ? "..." : "";
                while (measureWidth > self.width) {
                    text = text.substr(0, text.length - 1);
                    measureWidth = Laya.Browser.measureText(text + ellipsisStr, fontStyle).width;
                }
                self.text = text + ellipsisStr;
            };
            Laya.Box.prototype.reverse = function (horizontal) {
                let self = this;
                if (self.numChildren == 0) {
                    return;
                }
                let posPropName, widePropName, anchorPropName;
                if (horizontal) {
                    posPropName = "x";
                    anchorPropName = "anchorX";
                    widePropName = "width";
                }
                else {
                    posPropName = "y";
                    anchorPropName = "anchorY";
                    widePropName = "height";
                }
                for (let i = 0; i < self.numChildren; i++) {
                    let child = this._children[i];
                    if (child instanceof Laya.Component) {
                        child[anchorPropName] = 1 - (isNaN(child[anchorPropName]) ? 0 : child[anchorPropName]);
                    }
                    child[posPropName] = self[widePropName] - child[posPropName];
                }
            };
            Laya.Box.prototype.verticalLayout = function (gap, fromTop = true, alignH = 0) {
                if (this.numChildren == 0) {
                    return;
                }
                let self = this;
                self.top = self.left = self.right = self.bottom = undefined;
                let width = 0;
                let lastY = 0;
                let height = 0;
                let alignProps = ['centerX', 'left', 'right'];
                let alignProp = alignProps[alignH];
                this._children.forEach(element => {
                    let child = element;
                    let _gap = element.layoutGap || 0;
                    if (child instanceof Laya.UIComponent) {
                        child.top = child.bottom = child.centerY = undefined;
                        child[alignProp] = 0;
                        child.anchorY = 0;
                    }
                    child.y = lastY;
                    height = lastY + child.height;
                    lastY = height + gap + _gap;
                    width = Math.max(width, child.width);
                });
                self.size(width, height);
                if (!fromTop) {
                    self.reverse(false);
                }
            };
            Laya.Box.prototype.horizontalLayout = function (gap, fromLeft = true, alignV = 0) {
                if (this.numChildren == 0) {
                    return;
                }
                let self = this;
                self.top = self.left = self.right = self.bottom = undefined;
                let width = 0;
                let lastX = 0;
                let height = 0;
                let alignProps = ['centerY', 'top', 'bottom'];
                let alignProp = alignProps[alignV];
                this._children.forEach(element => {
                    let _gap = element.layoutGap || 0;
                    let child = element;
                    if (child instanceof Laya.UIComponent) {
                        child.left = child.right = child.centerX = undefined;
                        child[alignProp] = 0;
                        child.anchorX = 0;
                    }
                    child.x = lastX;
                    width = lastX + child.width;
                    lastX = width + gap + _gap;
                    height = Math.max(height, child.height);
                });
                self.size(width, height);
                if (!fromLeft) {
                    self.reverse(true);
                }
            };
            //
            Laya.Box.prototype.tileLayout = function (row, col, margin, childSize, fixedChildSize = false) {
                if (row < 1 || col < 1 || margin.width < 0 || margin.height < 0) {
                    console.log("Invalid parameter");
                    return false;
                }
                if (this.numChildren == 0) {
                    console.log("No Children");
                    return false;
                }
                if (this.numChildren > row * col) {
                    console.log("row or col Not enough");
                    return false;
                }
                let self = this;
                self.top = self.left = self.right = self.bottom = undefined;
                self.width = col * (childSize.width + 2 * margin.width);
                self.height = row * (childSize.height + 2 * margin.height);
                for (let i = 0; i < this._children.length; ++i) {
                    let child = this._children[i];
                    if (child instanceof Laya.UIComponent) {
                        child.left = child.right = child.top = child.bottom = undefined;
                        child.anchorX = child.anchorY = 0.5;
                    }
                    if (fixedChildSize) {
                        child.width = childSize.width;
                        child.height = childSize.height;
                    }
                    let itemCol = i % col;
                    let itemRow = Math.floor(i / col);
                    child.x = itemCol * (child.width + margin.width * 2) + margin.width + child.width / 2;
                    child.y = itemRow * (child.height + margin.height * 2) + margin.height + child.height / 2;
                }
                return true;
            };
            // 扩展长按事件
            Laya.Sprite.prototype.onPressed = function (caller, pressHandler, interuptHandler, interuptByMove = true, frequency) {
                let self = this;
                self.__pressed = false;
                function onPressed() {
                    self.__pressed = true;
                    if (frequency != undefined) {
                        if (frequency > 0) {
                            Laya.timer.loop(frequency, caller, pressHandler);
                        }
                        else {
                            Laya.timer.frameLoop(1, caller, pressHandler);
                        }
                    }
                    else {
                        pressHandler.call(caller);
                    }
                }
                function onMouseDown() {
                    Laya.timer.once(100, self, onPressed);
                }
                function interupt() {
                    Laya.timer.clear(self, onPressed);
                    Laya.timer.clear(caller, pressHandler);
                    if (self.__pressed && interuptHandler) {
                        interuptHandler.call(caller);
                    }
                }
                function onMouseUp() {
                    interupt();
                    Laya.timer.callLater(self, () => {
                        self.__pressed = false;
                    });
                }
                self.on(Laya.Event.MOUSE_DOWN, self, onMouseDown);
                if (interuptByMove) {
                    self.onMoved(self, interupt);
                }
                self.on(Laya.Event.MOUSE_UP, self, onMouseUp);
            };
            Laya.Sprite.prototype.isPressed = function () {
                return this.__pressed;
            };
            Laya.Sprite.prototype.onMoved = function (caller, handler, threshold = 0, ...args) {
                let self = this;
                let beginPos = new Laya.Point();
                let pressed = false;
                let touchId;
                function onMouseDown(e) {
                    if (pressed) {
                        return;
                    }
                    beginPos.x = e.stageX;
                    beginPos.y = e.stageY;
                    pressed = true;
                    touchId = e.touchId;
                }
                function onMouseMove(e) {
                    if (!pressed || touchId != e.touchId) {
                        return;
                    }
                    if (beginPos.distance(e.stageX, e.stageY) > threshold) {
                        handler.call(caller, e, beginPos, ...args);
                    }
                }
                function onMouseUp() {
                    pressed = false;
                    touchId = null;
                }
                self.on(Laya.Event.MOUSE_DOWN, self, onMouseDown);
                self.on(Laya.Event.MOUSE_MOVE, self, onMouseMove);
                self.on(Laya.Event.MOUSE_UP, self, onMouseUp);
                //
                self.offMoved = function () {
                    self.off(Laya.Event.MOUSE_DOWN, self, onMouseDown);
                    self.off(Laya.Event.MOUSE_MOVE, self, onMouseMove);
                    self.off(Laya.Event.MOUSE_UP, self, onMouseUp);
                };
            };
            Laya.Sprite.prototype.offMoved = function () { };
            // 扩展骨骼，使之可以挂载节点
            if (Laya.Bone) {
                Laya.Bone.prototype.mount = function (node, update) {
                    let self = this;
                    let sp = this._sprite;
                    if (update) {
                        this._update = self.update;
                        self.update = self.updateEx;
                        this._hUpdate = update;
                    }
                    if (sp) {
                        sp.addChild(node);
                        return true;
                    }
                    else {
                        this._sprite = node;
                        return false;
                    }
                };
                Laya.Bone.prototype.updateEx = function (pMatrix) {
                    this._update(pMatrix);
                    let handler = this._hUpdate;
                    handler.runWith(this);
                };
                Laya.Bone.prototype.unmount = function (node) {
                    if (this._sprite == node) {
                        this._sprite = null;
                    }
                    node.removeSelf();
                    let self = this;
                    if (this._hUpdate) {
                        if (!this._sprite || this._sprite.numChildren == 0) {
                            self.update = this._update;
                            this._hUpdate = null;
                            this._update = null;
                        }
                    }
                };
            }
            // 扩展事件，移除指定以外的事件
            Laya.EventDispatcher.prototype.offAllNot = function (types) {
                var events = this._$0__events;
                if (!events)
                    return this;
                if (types && types.length > 0) {
                    for (var name in events) {
                        if (types.indexOf(name) == -1) {
                            this._recoverHandlers(events[name]);
                            delete events[name];
                        }
                    }
                }
                return this;
            };
            Laya.EventDispatcher.prototype.priorityReverse = function (type, count = 1) {
                let events = this._$0__events;
                if (!events)
                    return;
                let arrEvents = events[type];
                if (arrEvents && arrEvents.length && arrEvents.length > 1 && count > 0) {
                    count = Math.min(count, Math.floor(arrEvents.length * 0.5));
                    let arrRear = arrEvents.splice(arrEvents.length - count, count);
                    for (const event of arrRear) {
                        arrEvents.unshift(event);
                    }
                }
            };
            // 是否扩展3d
            if (window["Laya3D"]) {
                this.init3D();
            }
            else {
                Laya.Size = Size;
            }
        }
        static init3D() {
            const cRand = new Laya.Rand(Laya.Browser.now());
            Math.randomEx = function () {
                return cRand.getFloat();
            };
            Laya.Vector3.ZERO = new Laya.Vector3(0, 0, 0);
            Laya.Vector3.ONE = new Laya.Vector3(1, 1, 1);
            Laya.Vector3.UnitX = new Laya.Vector3(1, 0, 0);
            Laya.Vector3.NegativeUnitX = new Laya.Vector3(-1, 0, 0);
            Laya.Vector3.Up = new Laya.Vector3(0, 1, 0);
            Laya.Vector3.Down = new Laya.Vector3(0, -1, 0);
            Laya.Vector3.UnitZ = new Laya.Vector3(0, 0, 1);
            Laya.Vector3.NegativeUnitZ = new Laya.Vector3(0, 0, -1);
            Laya.Vector3.prototype.from = function (source) {
                this.x = source.x;
                this.y = source.y;
                this.z = source.z;
            };
            // 清理3d资源
            let Loader = Laya.Loader;
            Laya.LoaderManager.prototype.takeRes = function (url) {
                let res = Loader.getRes(url);
                if (res) {
                    Loader.clearRes(url);
                }
                return res;
            };
            Laya.LoaderManager.prototype.clearRes3d = function () {
                if (!Loader.groupMap[RES3D_GROUP_NAME])
                    return;
                let arr = Loader.groupMap[RES3D_GROUP_NAME], i = 0, len = arr.length;
                for (i = 0; i < len; i++) {
                    let res = Loader.getRes(arr[i]);
                    Loader.clearRes(arr[i]);
                    if (res && !res.destroyed) {
                        res.destroy();
                    }
                }
                arr.length = 0;
            };
            Laya.LocalStorage.getStorageInfoSync = function () {
                let baseStorage = Laya.LocalStorage._baseClass;
                if (baseStorage.getStorageInfoSync) {
                    return baseStorage.getStorageInfoSync();
                }
                else {
                    return { keys: Object.keys(baseStorage.items) };
                }
            };
            // 基础材质
            Laya.Material.prototype.disableShaderDef = function (def) {
                this._disablePublicDefineDatas.add(def);
            };
            // 3D粒子
            Laya.ShuriKenParticle3D.prototype.play = function () {
                let self = this;
                if (this._children.length > 0) {
                    let child;
                    for (child of this._children) {
                        child.play();
                    }
                }
                this.__isPlaying = true;
                self.particleSystem.play();
            };
            Laya.ShuriKenParticle3D.prototype.isPlaying = function () {
                return this.__isPlaying;
            };
            Laya.ShuriKenParticle3D.prototype.stop = function () {
                let self = this;
                if (this._children.length > 0) {
                    let child;
                    for (child of this._children) {
                        child.stop();
                    }
                }
                this.__isPlaying = false;
                self.particleSystem.stop();
            };
            Laya.ShuriKenParticle3D.prototype.disableFog = function () {
                let self = this;
                if (this._children.length > 0) {
                    let child;
                    for (child of this._children) {
                        child.disableFog();
                    }
                }
                let material = self.particleRenderer.material;
                if (material)
                    material.disableShaderDef(Laya.Shader3D.getDefineByName('FOG'));
            };
            Laya.CompoundColliderShape.prototype.getChildShapes = function () {
                return this._childColliderShapes;
            };
        }
    }

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    // 兼容2d
    if (!window['Config3D']) {
        window['Config3D'] = class Config3D {
            constructor() { }
            ;
        };
    }
    class Config3DType extends Config3D {
    }
    ;
    class AppBase {
        constructor(gameCfg) {
            this.gameCfg = gameCfg;
            Sdk.getInstance().initMiniAdapter();
            if (window["Laya3D"]) {
                if (gameCfg.physic3dSetting)
                    Laya.Scene3D['physicsSettings'] = gameCfg.physic3dSetting;
                Laya3D.init(gameCfg.width, gameCfg.height, gameCfg.config3d);
            }
            else {
                //根据IDE设置初始化引擎
                Laya.init(gameCfg.width, gameCfg.height, Laya.WebGL);
            }
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            //设置适配模式
            Laya.stage.scaleMode = gameCfg.scaleMode;
            Laya.stage.alignH = gameCfg.alignH;
            Laya.stage.alignV = gameCfg.alignV;
            //默认竖屏模式 vertical，游戏继承类自行修改
            Laya.stage.screenMode = gameCfg.screenMode;
            //设置帧率, 不能设置为 FRAME_SLOW，否则 WebGL 模式下，屏幕会闪烁
            Laya.stage.frameRate = Laya.Stage.FRAME_FAST;
            //兼容微信不支持加载scene后缀场景
            Laya.URL.exportSceneToJson = gameCfg.exportSceneToJson;
            //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
            if (gameCfg.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (gameCfg.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (gameCfg.stat)
                Laya.Stat.show(0, 70);
            //错误提示
            Laya.alertGlobalError = true;
            // 初始化扩展
            BaseExtend.init();
            // 引擎初始化完成
            Sdk.getInstance().afterEngineInit(this.didEnterBackground.bind(this), this.willEnterForeground.bind(this));
            // 加载配置
            CfgMgr.getInstance().load(Laya.Handler.create(this, this.onLoaded));
        }
        //进入后台
        didEnterBackground() {
            EventCenter.getInstance().event(BaseEvent.E_APP_ON_PAUSE);
        }
        //进入前台
        willEnterForeground(res) {
            EventCenter.getInstance().event(BaseEvent.E_APP_ON_RESUME, res);
        }
        launch(firstSceneModule) {
            //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
            Laya.AtlasInfoManager.enable("fileconfig.json");
            //版本管理
            if (Utils.isOnMiniGame()) {
                Sdk.getInstance().checkUpdate();
            }
            //舞台变化
            this.onStageResize();
            Laya.stage.on(Laya.Event.RESIZE, this, this.onStageResize);
            //运行第一个场景
            if (firstSceneModule) {
                SceneManager.changeScene(firstSceneModule);
            }
            else if (this.gameCfg.startScene) {
                SceneManager.changeScene(this.gameCfg.startScene);
            }
            else {
                console.error('Launch Scene not found !!!');
            }
            return this;
        }
        onStageResize() {
            if (Utils.isOnPC()) {
                document.title = `${Laya.stage.width}x${Laya.stage.height}`;
            }
        }
        onLoaded() { }
    }

    /*
    * Created on Thu Feb 21 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class BaseDialog extends Laya.Dialog {
        constructor(...args) {
            super();
            this['$_GID'] = Laya.Utils.getGID();
            this.once(Laya.Event.ADDED, this, this.addToStage);
            this.once(Laya.Event.REMOVED, this, this.removeFromStage);
            this.on(Laya.Event.MOUSE_DOWN, this, this.mouseDown);
            this.on(Laya.Event.CLICK, this, this.clicked);
        }
        getGID() {
            return this['$_GID'];
        }
        static getRes() { return null; }
        ;
        actived() {
            console.log(Utils.getClassName(this) + " actived!");
            this.onActive();
        }
        deactived() {
            console.log(Utils.getClassName(this) + " deactived!");
            this.onDeactive();
        }
        onAdd() { }
        ;
        onRemove() { }
        ;
        onEnter(...args) { }
        ;
        onExit() { }
        ;
        onActive(...args) { }
        ;
        onDeactive() { }
        ;
        onMouseDown(e) { return this.mouseThrough; }
        ;
        onClicked(e) { return this.mouseThrough; }
        ;
        onOpened(args) {
            this.onEnter(...args);
        }
        open(closeOther = true, param = null) {
            super.open(closeOther, param);
            let img_bg = this.getBgComp();
            if (this.isShowEffect && img_bg) {
                this.callLater(() => {
                    let manager = Laya.Dialog.manager;
                    manager.size(Laya.stage.width, Laya.stage.height);
                    manager.addChildAt(img_bg, manager.getChildIndex(this));
                    this.adaptScreen(img_bg);
                    this.img_bg_comp = img_bg;
                });
            }
        }
        // 覆盖父类方法，兼容由DialogManager关闭
        close(reason) {
            if (reason == 'closeOnSide') {
                let autoDestroyAtClosed = this.autoDestroyAtClosed != undefined ? this.autoDestroyAtClosed : true;
                SceneManager.closePanel(this, { autoDestroy: autoDestroyAtClosed });
            }
            else {
                super.close(reason);
            }
        }
        onClosed() {
            let img_bg_comp = this.img_bg_comp;
            if (this.isShowEffect && img_bg_comp) {
                let manager = Laya.Dialog.manager;
                manager.size(0, 0);
                this.addChildAt(img_bg_comp, 0);
                this.adaptScreen(img_bg_comp);
                this.img_bg_comp = null;
            }
            this.onExit();
        }
        mouseDown(e) {
            let propagate = this.onMouseDown(e);
            if (propagate === false) {
                e.stopPropagation();
            }
        }
        clicked(e) {
            let propagate = this.onClicked(e);
            if (propagate === false) {
                e.stopPropagation();
            }
        }
        removeSelf() {
            if (this.closeType != 'closePanel') {
                throw new Error("BaseDialog can not removeSelf, use SceneManager.closePanel instead!");
            }
            return super.removeSelf();
        }
        getBgComp() {
            let img_bg = this.getChildByName("img_bg");
            return img_bg;
        }
        adaptScreen(img_bg) {
            img_bg = img_bg || this.getBgComp();
            if (img_bg) {
                img_bg.x = img_bg.y = img_bg.anchorX = img_bg.anchorY = 0;
                Utils.adaptNode(img_bg, Laya.stage.width, Laya.stage.height, true);
                img_bg.centerX = img_bg.centerY = 0;
                img_bg.centerX = img_bg.centerY = undefined;
            }
        }
        addToStage() {
            let img_bg = this.getBgComp();
            let needAdapt = false;
            if (img_bg && img_bg instanceof Laya.Image) {
                img_bg.left = img_bg.right = img_bg.top = img_bg.bottom = img_bg.centerX = img_bg.centerY = undefined;
                if (!img_bg.source) {
                    img_bg.width = img_bg.height = undefined;
                    img_bg.once(Laya.Event.LOADED, this, this.adaptScreen);
                }
                else {
                    (!img_bg.width) && (img_bg.width = img_bg.source.width);
                    (!img_bg.height) && (img_bg.height = img_bg.source.height);
                    needAdapt = true;
                }
            }
            this.onAdd();
            if (needAdapt) {
                this.adaptScreen();
            }
        }
        removeFromStage() {
            this.offAll();
            this.timer.clearAll(this);
            this.onRemove();
        }
        loadScene(url) {
            this.url = url;
            this.frameOnce(1, this, super.loadScene, [url]);
        }
        getModuleRegName() {
            let module = Utils.getModule(this);
            let classMap = Laya.ClassUtils._classMap;
            for (const key in classMap) {
                if (classMap.hasOwnProperty(key) && classMap[key] == module) {
                    return key;
                }
            }
            return null;
        }
        getModuleUrlName() {
            let urlName = "";
            if (this.url) {
                let sPos = this.url.indexOf("/");
                if (-1 !== sPos) {
                    urlName = this.url.substring(sPos + 1);
                }
            }
            return urlName;
        }
    }
    // mix
    Utils.applyMixins(BaseDialog, [BaseEventDispatcher], Laya.Dialog);
    Laya.ClassUtils.regClass('Dialog', BaseDialog);

    /*
    * Created on Wed Jul 24 2019 by alimwang
    *
    * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
    */
    class BaseModel {
        constructor(id, name) {
            this.id = id;
            if (null != name) {
                this.ini = CfgMgr.getInstance().get(name, id); // 初始化配置文件
                Utils.assign(this, Utils.cloneDeep(this.ini), false);
            }
        }
        clone() {
            let m = Utils.getModule(this);
            m = new m();
            Utils.assign(m, this, false);
            return m;
        }
        from(from) {
            if (this.ini) {
                Utils.assign(this, from);
            }
            else {
                Utils.assign(this, from, false);
            }
        }
        getAtt(key, isIniData = false) {
            if (isIniData) {
                return this.ini[key];
            }
            else {
                var v = this[key];
                if ((null == v) && (null != this.ini))
                    v = this.ini[key];
                return v;
            }
        }
        setAtt(key, value) {
            this[key] = value;
        }
    }
    ;
    Laya.ClassUtils.regClass("BaseModel", BaseModel);

    class BTreeNode {
        constructor(config) {
            if (config) {
                this.title = config.title;
            }
        }
        start(obj) {
        }
        end(obj) {
        }
        setControl(control) {
            this._control = control;
        }
        running(obj) {
            this._control.running(this);
        }
        success() {
            this._control.success();
        }
        fail() {
            return this._control.fail();
        }
    }

    var countUnnamed = 0;
    class BehaviorTree {
        constructor(config) {
            this._started = false;
            countUnnamed += 1;
            this.title = config.title || 'btree' + (countUnnamed);
            this._rootNode = config.tree;
            this._object = config.object;
        }
        setObject(obj) {
            this._object = obj;
        }
        step() {
            if (this._started) {
                console.log('the BehaviorTree "' + this.title + '" did call step but one Task did not finish on last call of step.');
            }
            this._started = true;
            var node = BehaviorTree.getNode(this._rootNode);
            this._actualNode = node;
            node.setControl(this);
            node.start(this._object);
            node.run(this._object);
        }
        run() {
        }
        running(node) {
            this._started = false;
        }
        success() {
            this._actualNode.end(this._object);
            this._started = false;
        }
        fail() {
            this._actualNode.end(this._object);
            this._started = false;
        }
        static register(name, node) {
            this._registeredNodes[name] = node;
        }
        static getNode(name) {
            var node = name instanceof BTreeNode ? name : this._registeredNodes[name];
            if (!node) {
                throw new Error('The node "' + name + '" could not be looked up. Maybe it was never registered?');
            }
            return node;
        }
    }
    BehaviorTree._registeredNodes = {};

    class BTDecorator extends BTreeNode {
        constructor(config) {
            super(config);
            if (config.node) {
                this.node = BehaviorTree.getNode(config.node);
            }
        }
        setNode(node) {
            this.node = BehaviorTree.getNode(node);
        }
        start() {
            this.node.setControl(this);
            this.node.start();
        }
        end() {
            this.node.end();
        }
        run(blackboard, ...args) {
            this.node.run(blackboard, ...args);
        }
    }

    class BranchNode extends BTreeNode {
        constructor(config) {
            super(config);
            this.children = config.nodes || [];
        }
        start() {
            this._actualTask = 0;
        }
        run(blackboard, ...args) {
            if (this.children.length == 0) { //没有子任务直接视为执行失败
                this._control.fail();
            }
            else {
                this.blackboard = blackboard;
                this.start();
                if (this._actualTask < this.children.length) {
                    this._run();
                }
            }
            this.end();
        }
        _run(obj) {
            var node = BehaviorTree.getNode(this.children[this._actualTask]);
            this._runningNode = node;
            node.setControl(this);
            node.start(this.blackboard);
            node.run(this.blackboard);
        }
        running(node) {
            this._nodeRunning = node;
            this._control.running(node);
        }
        success() {
            this._nodeRunning = null;
            this._runningNode.end(this.blackboard);
        }
        fail() {
            this._nodeRunning = null;
            this._runningNode.end(this.blackboard);
        }
    }

    class BTPriority extends BranchNode {
        success() {
            super.success();
            this._control.success();
        }
        fail() {
            super.fail();
            this._actualTask += 1;
            if (this._actualTask < this.children.length) {
                this._run(this.blackboard);
            }
            else {
                this._control.fail();
            }
        }
    }

    //fail next ,success return
    class BTSelector extends BranchNode {
        _run(obj) {
            if (this._nodeRunning) {
                this._nodeRunning.run(this.blackboard);
            }
            else {
                super._run();
            }
        }
        constructor(config) {
            super(config);
        }
        success() {
            super.success();
            this._control.success();
        }
        fail() {
            super.fail();
            this._actualTask += 1;
            if (this._actualTask < this.children.length) {
                this._run(this.blackboard);
            }
            else {
                this._control.fail();
            }
        }
    }

    //fail return ,success next
    class BTSequence extends BranchNode {
        _run(obj) {
            if (this._nodeRunning) {
                this._nodeRunning.run(this.blackboard);
            }
            else {
                super._run();
            }
        }
        constructor(config) {
            super(config);
        }
        success() {
            super.success();
            this._actualTask += 1;
            if (this._actualTask < this.children.length) {
                this._run(this.blackboard);
            }
            else {
                this._control.success();
            }
        }
        fail() {
            super.fail();
            this._control.fail();
        }
    }

    class PreCondition extends BranchNode {
        _run(obj) {
            if (this._nodeRunning) {
                this._nodeRunning.run(this.blackboard);
            }
            else {
                if (this.condition(this.blackboard)) {
                    super._run();
                }
                else {
                    this.fail();
                }
            }
        }
        condition(obj) { return false; }
        success() {
            super.success();
            this._actualTask += 1;
            if (this._actualTask < this.children.length) {
                this._run(this.blackboard);
            }
            else {
                this._control.success();
            }
        }
        fail() {
            super.fail();
            this._actualTask += 1;
            if (this._actualTask < this.children.length) {
                this._run(this.blackboard);
            }
            else {
                this._control.success();
            }
        }
    }

    /*
     * Created on Wed Aug 21 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class MeshLine extends Laya.MeshSprite3D {
        /**
         *
         * @param bezier
         * @param start
         * @param length
         * @param width
         * @param align 对齐方式 0: 居中，1：曲线右侧， 2：曲线左侧
         */
        constructor(bezier, start, length, width, align = 0, color) {
            super(null, 'MeshLine');
            // 右手坐标系建模
            this.uv = new Plane2d(new Vector2(0, 0), new Vector2(1, 0), new Vector2(0, 1), new Vector2(1, 1));
            this.verticles = new Array();
            this.bezier = bezier;
            this.width = width;
            this.length = length;
            this.start = start;
            this.end = start + length;
            this.align = align;
            this.color = color || Color.WHITE;
        }
        worldToLocal(v) {
            if (this.align == 0) {
                Vector3.scale(v, 0.5, v);
            }
            else if (this.align == 1) {
                v.from(Vector3.ZERO);
            }
            return v;
        }
        localToWorld(v) {
            if (this.align == 0) {
                Vector3.scale(v, -0.5, v);
            }
            else if (this.align == 1) {
                v.from(Vector3.ZERO);
            }
            else {
                Vector3.scale(v, -1, v);
            }
            return v;
        }
        /**
         * @param sliceCount 分割多少段
         * @param startLB 拼接时需要 左下
         * @param startRB 拼接时需要 右下
         */
        init(sliceCount, startLB, startRB) {
            let lastLB, rb, lt, rt;
            let v = new Vector3();
            if (startLB) {
                // 转到曲线上
                Vector3.subtract(startRB, startLB, v);
                v = this.worldToLocal(v);
                lastLB = new Vector3();
                Vector3.add(startLB, v, lastLB);
            }
            else {
                lastLB = this.bezier.getPoint(0);
            }
            let vertexCount = sliceCount * 4 - (sliceCount - 1) * 2;
            let indexCount = sliceCount * 6;
            // 创建 mesh, 顶点索引顺时针
            let vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,COLOR,UV");
            let vertexFloatStride = vertexDeclaration.vertexStride / 4; // 4 字节
            this.vertexFloatStride = vertexFloatStride;
            let verticles = new Float32Array(vertexCount * vertexFloatStride);
            let indices = new Uint16Array(indexCount);
            let n = new Vector3();
            let uv = new Vector2();
            let totalL = this.bezier.getLength();
            let lengthScalar = this.length / totalL;
            let delta = lengthScalar / sliceCount;
            let startScalar = this.start / totalL;
            // 更新处理
            for (let i = 0; i < sliceCount; i++) {
                let lb = lastLB.clone();
                let start = startScalar + (i + 1) * delta;
                lt = this.bezier.getPoint(start);
                lastLB.from(lt);
                Vector3.subtract(lt, lb, v);
                Vector3.normalize(v, n);
                Vector3.cross(n, Vector3.Up, n);
                Vector3.normalize(n, n);
                Vector3.scale(n, this.width, v);
                // 对齐修正
                n = this.localToWorld(v.clone());
                Vector3.add(lb, n, lb);
                Vector3.add(lt, n, lt);
                rt = new Vector3();
                Vector3.add(lt, v, rt);
                if (i > 0) {
                    Vector2.scale(this.uv.lt, i + 1, uv);
                    this.setVerticles(verticles, this.getVertexIdxBySliceIdx(i, 2), lt, uv, start);
                    Vector2.scale(this.uv.rt, i + 1, uv);
                    this.setVerticles(verticles, this.getVertexIdxBySliceIdx(i, 3), rt, uv, start);
                }
                else {
                    if (startRB) {
                        rb = startRB;
                    }
                    else {
                        rb = new Vector3();
                        Vector3.add(lb, v, rb);
                    }
                    this.setVerticles(verticles, this.getVertexIdxBySliceIdx(i, 0), lb, this.uv.lb, 0);
                    this.setVerticles(verticles, this.getVertexIdxBySliceIdx(i, 1), rb, this.uv.rb, 0);
                    this.setVerticles(verticles, this.getVertexIdxBySliceIdx(i, 2), lt, this.uv.lt, start);
                    this.setVerticles(verticles, this.getVertexIdxBySliceIdx(i, 3), rt, this.uv.rt, start);
                }
            }
            // 创建索引
            let indiceIndex = 0;
            for (let i = 0; i < sliceCount; i++) {
                // 顺时针
                indices[indiceIndex++] = (i + 1) * 2;
                indices[indiceIndex++] = i * 2 + 3;
                indices[indiceIndex++] = i * 2;
                indices[indiceIndex++] = i * 2;
                indices[indiceIndex++] = i * 2 + 3;
                indices[indiceIndex++] = i * 2 + 1;
            }
            let mesh = Laya.PrimitiveMesh._createMesh(vertexDeclaration, verticles, indices);
            this.meshFilter.sharedMesh = mesh;
            let material = new Laya.UnlitMaterial();
            material.enableVertexColor = true;
            this.meshRenderer.material = material;
        }
        getMaterial() {
            return this.meshRenderer.material;
        }
        /**
         * 设置顶点色
         * @param start
         * @param color
         */
        setVertexColor(start, color) {
            start = Math.clamp(start, this.start, this.end);
            let totalL = this.bezier.getLength();
            start /= totalL;
            let mesh = this.meshFilter.sharedMesh;
            let subMesh = mesh._getSubMesh(0);
            let verticles = subMesh._vertexBuffer.getData();
            let changed = false;
            // 获取 slice 索引
            let sliceIdx = this.getSliceIndex(start);
            for (let i = sliceIdx; i >= 0; i--) {
                // 是否已经着色
                let vIdx = this.getVerticleIdxBySliceIdx(i, 2);
                let vertex = this.verticles[vIdx];
                if (vertex._shade) {
                    break;
                }
                vertex._shade = true;
                for (let index = 0; index < 4; index++) {
                    let idx = this.getVertexIdxBySliceIdx(i, index);
                    verticles[idx + 6] = color.r;
                    verticles[idx + 7] = color.g;
                    verticles[idx + 8] = color.b;
                    verticles[idx + 9] = color.a;
                }
                changed = true;
            }
            if (changed) {
                subMesh._vertexBuffer.setData(verticles);
            }
        }
        onDestroy() {
            this.verticles.length = 0;
            this.verticles = null;
            this.bezier = null;
        }
        getSliceIndex(start) {
            // console.log('#####################')
            let index = Utils.binarySearch(this.verticles, function (a, b) {
                let code;
                if (start > a._start && start <= b._start) {
                    code = 0;
                }
                else if (start <= a._start) {
                    code = -1;
                }
                else {
                    code = 1;
                }
                // console.log('searching start:%f a:%f b:%f code:%d', start, a._start, b._start, code);
                return code;
            }, 2);
            if (index == -1) {
                console.error('getSliceIndex not found ??? !!!');
            }
            return Math.floor((index + 1) / 2) - 1;
        }
        getVertexIdxBySliceIdx(index, stride = 0) {
            return index * 2 * this.vertexFloatStride + stride * this.vertexFloatStride;
        }
        getVerticleIdxBySliceIdx(index, stride = 0) {
            return index * 2 + stride;
        }
        setVerticles(verticles, index, vertex, uv, start) {
            verticles[index++] = vertex.x;
            verticles[index++] = vertex.y;
            verticles[index++] = vertex.z;
            verticles[index++] = 0;
            verticles[index++] = 1;
            verticles[index++] = 0;
            let color = this.color;
            verticles[index++] = color.r;
            verticles[index++] = color.g;
            verticles[index++] = color.b;
            verticles[index++] = color.a;
            verticles[index++] = uv.x;
            verticles[index++] = uv.y;
            let anyVertex = vertex.clone();
            anyVertex._start = start;
            this.verticles.push(anyVertex);
        }
        getLeftBottomVert(verticles, index) {
            index = this.getVertexIdxBySliceIdx(index);
            let x = verticles[index];
            let y = verticles[index + 1];
            let z = verticles[index + 2];
            return new Vector3(x, y, z);
        }
        /**
         * 获取指定位置信息
         * @param start
         */
        getInfoByPos(start, delta) {
            let d = 0.1;
            if (delta != undefined && delta > 0) {
                d = delta;
            }
            start = Math.clamp(start, this.start, this.end);
            let totalL = this.bezier.getLength();
            let lb = this.bezier.getPoint(start / totalL);
            let lt = this.bezier.getPoint((start + d) / totalL);
            let v;
            let t = new Vector3();
            Vector3.subtract(lt, lb, t);
            if (delta != undefined) {
                v = t.clone();
            }
            let n = new Vector3();
            Vector3.normalize(t, n);
            let nL = new Vector3();
            Vector3.cross(Vector3.Up, n, nL);
            Vector3.normalize(nL, nL);
            Vector3.cross(n, nL, t);
            Vector3.normalize(t, t);
            let up = t.clone();
            Vector3.cross(up, n, nL);
            Vector3.normalize(nL, nL);
            let nR = new Vector3();
            Vector3.cross(n, up, nR);
            Vector3.normalize(nR, nR);
            let center = new Vector3();
            if (this.align == 1) {
                Vector3.scale(nR, this.width * 0.5, center);
            }
            else if (this.align == 2) {
                Vector3.scale(nL, this.width * 0.5, center);
            }
            Vector3.add(lb, center, center);
            return {
                center: center,
                n: n,
                v: v,
                nL: nL,
                nR: nR,
                up: up
            };
        }
        getTrailInfo() {
            let lb = this.verticles[this.verticles.length - 2];
            let rb = this.verticles[this.verticles.length - 1];
            return {
                lb: lb.clone(),
                rb: rb.clone()
            };
        }
        getLength() {
            return this.length;
        }
        getStart() {
            return this.start;
        }
        getEnd() {
            return this.end;
        }
        isEnd(pos) {
            return pos >= this.end;
        }
        isHalf(pos) {
            return pos >= (this.start + this.length * 0.5);
        }
    }

    /*
     * Created on Wed May 08 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class UniformBezierImpl {
        constructor(p0, p1, p2) {
            let ax = p0.x - 2 * p1.x + p2.x;
            let ay = p0.y - 2 * p1.y + p2.y;
            let az = p0.z - 2 * p1.z + p2.z;
            let bx = 2 * (p1.x - p0.x);
            let by = 2 * (p1.y - p0.y);
            let bz = 2 * (p1.z - p0.z);
            let A = 4 * (ax * ax + ay * ay + az * az);
            let B = 4 * (ax * bx + ay * by + az * bz);
            let C = bx * bx + by * by + bz * bz;
            let t0 = Math.sqrt(C);
            let t1 = 8 * Math.pow(A, 1.5);
            let m0 = (B * B - 4 * A * C) / t1;
            let m1 = 2 * Math.sqrt(A);
            let m2 = m1 / t1;
            let ttt = (B + m1 * t0);
            let m3 = m0 * Math.log(ttt <= 0 ? 0.0000001 : ttt) - B * m2 * t0;
            let f0 = A + B;
            let f1 = A + f0;
            let temp1 = C + f0;
            let f2 = Math.sqrt(temp1 < 0 ? 0 : temp1);
            temp1 = f1 + m1 * f2;
            let f3 = Math.log(temp1 <= 0 ? 0.0000001 : temp1);
            this.length = m3 - m0 * f3 + m2 * f1 * f2;
            this.A = A;
            this.B = B;
            this.C = C;
            this.m0 = m0;
            this.m1 = m1;
            this.m2 = m2;
            this.m3 = m3;
            this.p0 = p0;
            this.p1 = p1;
            this.p2 = p2;
        }
        getLength() {
            return this.length;
        }
        getPoint(t) {
            let ll = this.m3 - t * this.length;
            for (let i = 0; i < 7; ++i) {
                let f0 = this.A * t;
                let f1 = this.B + f0;
                let f2 = f1 + f0;
                let temp1 = this.C + t * f1;
                let f3 = Math.sqrt(temp1 < 0 ? 0 : temp1);
                temp1 = f2 + this.m1 * f3;
                let f4 = Math.log(temp1 <= 0 ? 0.0000001 : temp1);
                let f = (ll - this.m0 * f4) / f3 + this.m2 * f2;
                t -= f;
                if (Math.abs(f) < 0.01) {
                    break;
                }
            }
            let c = t * t;
            let b = t + t;
            let a = 1 - b + c;
            b -= c + c;
            return new Vector3(a * this.p0.x + b * this.p1.x + c * this.p2.x, a * this.p0.y + b * this.p1.y + c * this.p2.y, a * this.p0.z + b * this.p1.z + c * this.p2.z);
        }
    }
    class UniformBezier {
        constructor(cps) {
            if (cps.length < 3) {
                throw Error('UniformBezier point count must >= 3 !!!');
            }
            let index = 0;
            let p0 = cps[index++];
            let start = 0;
            let arrBezier = new Array();
            for (let i = 3; i < cps.length; ++i) {
                let p1 = new Vector3();
                Vector3.add(cps[index], cps[index + 1], p1);
                Vector3.scale(p1, 0.5, p1);
                let bezierImpl = new UniformBezierImpl(p0, cps[index], p1);
                arrBezier.push({ start: start, bezier: bezierImpl });
                start += bezierImpl.getLength();
                p0 = p1;
                index++;
            }
            let bezierImpl = new UniformBezierImpl(p0, cps[index], cps[index + 1]);
            arrBezier.push({ start: start, bezier: bezierImpl });
            start += bezierImpl.getLength();
            this.subBeziers = arrBezier;
            this.length = start;
        }
        getLength() {
            return this.length;
        }
        getPoint(t) {
            t = Math.clamp(t, 0, 1);
            t *= this.length;
            let it = this.subBeziers[Math.max(0, this.upperBound(t) - 1)];
            t = (t - it.start) / it.bezier.getLength();
            return it.bezier.getPoint(t);
        }
        upperBound(pos) {
            let index;
            for (index = 0; index < this.subBeziers.length; ++index) {
                if (this.subBeziers[index].start > pos) {
                    break;
                }
            }
            return index;
        }
    }

    /*
     * Created on Thu Feb 21 2019 by alimwang
     *
     * 下一帧自动释放对象管理类
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    class AutoReleaseManager {
        constructor() {
            this.releasePool = [];
            Laya.timer.frameLoop(1, this, this.update);
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new AutoReleaseManager();
            }
            return this.instance;
        }
        /**
         *
         * @param node
         * @param destroy
         * @param delay 毫秒
         * @param group 分类组
         */
        add(node, destroy = true, delay, group) {
            let dummy = { node: node, delay: delay, destroy: destroy, group: group };
            if (delay) {
                dummy.addtime = Laya.Browser.now();
            }
            this.releasePool.push(dummy);
        }
        update() {
            let now = Laya.Browser.now();
            for (let index = this.releasePool.length - 1; index >= 0; index--) {
                let dummy = this.releasePool[index];
                if (!dummy.delay) {
                    this.release(dummy, index);
                }
                else {
                    if (now - dummy.addtime >= dummy.delay) {
                        this.release(dummy, index);
                    }
                }
            }
        }
        release(dummy, index) {
            if (dummy.destroy) {
                if (!dummy.node.destroyed) {
                    dummy.node.destroy();
                }
            }
            else {
                dummy.node.removeSelf();
            }
            this.releasePool.splice(index, 1);
        }
        releaseByGroup(group) {
            if (!group) {
                return;
            }
            for (let index = this.releasePool.length - 1; index >= 0; index--) {
                let dummy = this.releasePool[index];
                if (dummy.group == group) {
                    this.release(dummy, index);
                }
            }
        }
    }

    /**
     *
     */
    class MD5 {
        constructor() {
            this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
            this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new MD5();
            }
            return this.instance;
        }
        /*
        * These are the privates you'll usually want to call
        * They take string arguments and return either hex or base-64 encoded strings
        */
        hex_md5(s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); } //这个函数就行了，
        b64_md5(s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); }
        any_md5(s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); }
        hex_hmac_md5(k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); }
        b64_hmac_md5(k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); }
        any_hmac_md5(k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); }
        /*
        * Perform a simple self-test to see if the VM is working
        */
        md5_vm_test() {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        }
        /*
        * Calculate the MD5 of a raw string
        */
        rstr_md5(s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        }
        /*
        * Calculate the HMAC-MD5, of a key and some data (raw strings)
        */
        rstr_hmac_md5(key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        }
        /*
        * Convert a raw string to a hex string
        */
        rstr2hex(input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        }
        /*
        * Convert a raw string to a base-64 string
        */
        rstr2b64(input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        }
        /*
        * Convert a raw string to an arbitrary string encoding
        */
        rstr2any(input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            /* Convert to an array of 16-bit big-endian values, forming the dividend */
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            /*
            * Repeatedly perform a long division. The binary array forms the dividend,
            * the length of the encoding is the divisor. Once computed, the quotient
            * forms the dividend for the next step. All remainders are stored for later
            * use.
            */
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            /* Convert the remainders to the output string */
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        }
        /*
        * Encode a string as utf-8.
        * For efficiency, this assumes the input is valid utf-16.
        */
        str2rstr_utf8(input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                /* Encode output as utf-8 */
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        }
        /*
        * Encode a string as utf-16
        */
        str2rstr_utf16le(input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        }
        str2rstr_utf16be(input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        }
        /*
        * Convert a raw string to an array of little-endian words
        * Characters >255 have their high-byte silently ignored.
        */
        rstr2binl(input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        }
        /*
        * Convert an array of little-endian words to a string
        */
        binl2rstr(input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        }
        /*
        * Calculate the MD5 of an array of little-endian words, and a bit length.
        */
        binl_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        }
        /*
        * These privates implement the four basic operations the algorithm uses.
        */
        md5_cmn(q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        }
        md5_ff(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        md5_gg(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        md5_hh(a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        md5_ii(a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        /*
        * Add integers, wrapping at 2^32. This uses 16-bit operations internally
        * to work around bugs in some JS interpreters.
        */
        safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        /*
        * Bitwise rotate a 32-bit number to the left.
        */
        bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }
    }

    /*
     * Created on Tue Jul 23 2019 by alimwang
     *
     * Copyright (c) 2019 Chengdu Waterbear Co.,LTD.
     */
    const RT_SEPERATOR = '<span';
    class HtmlText extends Laya.HTMLDivElement {
        constructor(richTxt) {
            super();
            this.name = 'HtmlText';
            this.style.align = "center";
            this.style.valign = "middle";
            this.style.wordWrap = false;
            if (richTxt) {
                richTxt = this.parse(richTxt);
                this.innerHTML = richTxt;
            }
        }
        parse(richTxt) {
            let arrSpan = richTxt.split(/(<span.+<\/span>)/g);
            if (arrSpan.length == 0) {
                arrSpan.push(richTxt);
            }
            richTxt = '';
            for (const txt of arrSpan) {
                if (this.isRichText(txt)) {
                    richTxt += txt;
                }
                else {
                    richTxt += this.defaultRichText(txt);
                }
            }
            return richTxt;
        }
        defaultRichText(txt) {
            return `<span style='color:#000000;bold:true;font:30px Arial'>${txt}</span>`;
        }
        isRichText(richTxt) {
            return richTxt.indexOf(RT_SEPERATOR) != -1;
        }
        setText(richTxt) {
            if (richTxt) {
                richTxt = this.parse(richTxt);
                this.innerHTML = richTxt;
            }
        }
    }

    class ModalDialogBox extends Dialog {
        constructor(title, content, style) {
            super();
            this.handler_close = Laya.Handler.create(this, function () {
                this.removeSelf();
            });
            //背景遮罩
            if (style.tex_bgMask) {
                this.img_bgmask = new Laya.Image();
                this.img_bgmask.name = "img_bg";
                this.addChild(this.img_bgmask);
                this.img_bgmask.left = 0;
                this.img_bgmask.right = 0;
                this.img_bgmask.top = 0;
                this.img_bgmask.bottom = 0;
                this.img_bgmask.skin = style.tex_bgMask;
                if (style.texSizegrid_bgMask)
                    this.img_bgmask.sizeGrid = style.texSizegrid_bgMask;
            }
            //弹出框背景
            this.img_bg = new Laya.Image();
            this.addChild(this.img_bg);
            if (!style.tex_bg) {
                console.log("模态弹出框背景纹理为空!!!");
                this.img_bg.width = 500;
                this.img_bg.height = 400;
            }
            else
                this.img_bg.skin = style.tex_bg;
            if (style.texSizegrid_bg)
                this.img_bg.sizeGrid = style.texSizegrid_bg;
            this.img_bg.centerX = 0;
            this.img_bg.centerY = 0;
            !style.texSize_bg && (style.texSize_bg = { width: 600, height: 400 });
            !style.texSize_bg.width && (style.texSize_bg.width = 600);
            !style.texSize_bg.height && (style.texSize_bg.height = 400);
            this.img_bg.size(style.texSize_bg.width, style.texSize_bg.height);
            //标题
            this.label_title = new Laya.Label();
            this.img_bg.addChild(this.label_title);
            // this.label_title.text = title;
            this.label_title.fontSize = 40;
            this.label_title.bold = true;
            this.label_title.color = "#ffffff";
            this.label_title.centerX = 0;
            this.label_title.top = 25;
            //内容
            this.label_content = new Laya.Label();
            this.img_bg.addChild(this.label_content);
            // this.label_content.text = content;
            this.label_content.fontSize = 36;
            this.label_content.bold = true;
            this.label_content.color = "#ffffff";
            this.label_content.centerX = 0;
            this.label_content.centerY = 0;
            (style.contentLeading) && (this.label_content.leading = style.contentLeading);
            //关闭按钮
            if (!style.tex_closeBtn) {
                console.log("模态弹出框关闭按钮纹理为空!!!");
            }
            else {
                this.btn_close = new Laya.Button();
                this.img_bg.addChild(this.btn_close);
                this.btn_close.skin = style.tex_closeBtn;
                this.btn_close.stateNum = 1;
                this.btn_close.anchorX = 1;
                this.btn_close.anchorY = 1;
                this.btn_close.top = 0; //-this.btn_close.width/2;
                this.btn_close.right = 0; //-this.btn_close.height/2;
                if (style.handler_closeBtn)
                    this.handler_closeBtn = style.handler_cancelBtn;
                else
                    this.handler_closeBtn = this.handler_close;
                this.btn_close.on(Laya.Event.CLICK, this, function () {
                    this.handler_closeBtn.run();
                });
            }
            //确定按钮
            if (!style.tex_sureBtn) {
                console.log("模态对话框确认按钮纹理缺失!!!");
            }
            else {
                //按钮
                this.btn_sure = new Laya.Button();
                this.img_bg.addChild(this.btn_sure);
                this.btn_sure.stateNum = 1;
                this.btn_sure.skin = style.tex_sureBtn;
                if (style.texSizegrid_sureBtn)
                    this.btn_sure.sizeGrid = style.texSizegrid_sureBtn;
                this.btn_sure.size(200, 120);
                this.handler_sureBtn = style.handler_sureBtn;
                this.btn_sure.on(Laya.Event.CLICK, this, function () {
                    if (this.handler_sureBtn)
                        this.handler_sureBtn.run();
                    this.handler_close.run();
                });
                //按钮文本
                if (style.font_sureBtn) {
                    let tex = Laya.loader.getRes(style.font_sureBtn);
                    if (tex) {
                        this.font_btn_sure = new Laya.Image();
                        this.btn_sure.addChild(this.font_btn_sure);
                        this.font_btn_sure.source = tex;
                    }
                    else {
                        this.font_btn_sure = new Laya.Label();
                        this.btn_sure.addChild(this.font_btn_sure);
                        this.font_btn_sure.text = style.font_sureBtn;
                        this.font_btn_sure.color = "#ffffff";
                        this.font_btn_sure.fontSize = 34;
                        this.font_btn_sure.bold = true;
                    }
                    !style.font_suereBtn_centeroffset && (style.font_suereBtn_centeroffset = new Laya.Point(0, 0));
                    this.font_btn_sure.centerX = style.font_suereBtn_centeroffset.x;
                    this.font_btn_sure.centerY = style.font_suereBtn_centeroffset.y;
                }
            }
            //取消按钮
            if (!style.tex_cancelBtn) {
                console.log("模态对话框取消按钮纹理缺失!!!");
            }
            else {
                this.btn_cancel = new Laya.Button();
                this.img_bg.addChild(this.btn_cancel);
                this.btn_cancel.stateNum = 1;
                this.btn_cancel.skin = style.tex_cancelBtn;
                if (style.texSizegrid_cancelBtn)
                    this.btn_cancel.sizeGrid = style.texSizegrid_cancelBtn;
                this.btn_cancel.size(200, 120);
                this.handler_cancelBtn = style.handler_cancelBtn;
                this.btn_cancel.on(Laya.Event.CLICK, this, function () {
                    if (this.handler_cancelBtn)
                        this.handler_cancelBtn.run();
                    this.handler_close.run();
                });
                //按钮文本
                if (style.font_cancelBtn) {
                    let tex = Laya.loader.getRes(style.font_cancelBtn);
                    if (tex) {
                        this.font_btn_cancel = new Laya.Image();
                        this.btn_cancel.addChild(this.font_btn_cancel);
                        this.font_btn_cancel.source = tex;
                    }
                    else {
                        this.font_btn_cancel = new Laya.Label();
                        this.btn_cancel.addChild(this.font_btn_cancel);
                        this.font_btn_cancel.text = style.font_cancelBtn;
                        this.font_btn_cancel.color = "#ffffff";
                        this.font_btn_cancel.fontSize = 34;
                        this.font_btn_cancel.bold = true;
                    }
                    !style.font_cancelBtn_centeroffset && (style.font_cancelBtn_centeroffset = new Laya.Point(0, 0));
                    this.font_btn_cancel.centerX = style.font_cancelBtn_centeroffset.x;
                    this.font_btn_cancel.centerY = style.font_cancelBtn_centeroffset.y;
                }
            }
            if (this.btn_sure && this.btn_cancel) {
                this.btn_sure.centerX = (this.img_bg.width / 2 - this.btn_sure.width) / 2 + this.btn_sure.width / 2;
                this.btn_sure.bottom = -this.btn_sure.height / 3;
                this.btn_cancel.centerX = -(this.img_bg.width / 2 - this.btn_cancel.width) / 2 - this.btn_cancel.width / 2;
                this.btn_cancel.bottom = -this.btn_cancel.height / 3;
            }
            else if (this.btn_sure && !this.btn_cancel) {
                // this.btn_cancel.visible = false;
                this.btn_sure.centerX = 0;
                this.btn_sure.bottom = 0;
            }
            else if (!this.btn_sure && this.btn_cancel) {
                // this.btn_sure.visible = false;
                this.btn_cancel.centerX = 0;
                this.btn_cancel.bottom = 0;
            }
        }
        get label_title() { return this._label_title; }
        set label_title(v) { this._label_title = v; }
        get label_content() { return this._label_content; }
        set label_content(v) { this._label_content = v; }
        get img_bgmask() { return this._img_bgmask; }
        set img_bgmask(v) { this._img_bgmask = v; }
        get img_bg() { return this._img_bg; }
        set img_bg(v) { this._img_bg = v; }
        get btn_close() { return this._btn_close; }
        set btn_close(v) { this._btn_close = v; }
        get btn_sure() { return this._btn_sure; }
        set btn_sure(v) { this._btn_sure = v; }
        get font_btn_sure() { return this._font_btn_sure; }
        set font_btn_sure(v) { this._font_btn_sure = v; }
        get btn_cancel() { return this._btn_cancel; }
        set btn_cancel(v) { this._btn_cancel = v; }
        get font_btn_cancel() { return this._font_btn_cancel; }
        set font_btn_cancel(v) { this._font_btn_cancel = v; }
    }
    ;

    class RewardGainWay {
        static get inst() {
            if (!this._inst) {
                this._inst = new RewardGainWay();
            }
            return this._inst;
        }
        gain(way) {
            way && way.gain();
        }
    }
    ;
    ;
    class ShareWay {
        constructor(o) {
            /**
             * 分享判定
             * 是否正在分享,因为微信取消了分享回调,故检测分享触发+回到前台认为一次分享完成
             */
            this.shareCount = 0; // 分享次数(首次必失败)
            this.shareStartTime = undefined; //分享开始时间
            this._shareParam = o;
        }
        gain() {
            if (!Utils.isOnMiniGame()) {
                EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                    code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                    way: exports.GetRewardSDKWay.SHARE,
                    rewardType: exports.GetRewardSDKWay.SHARE
                });
                return;
            }
            this.shareStartTime = Utils.getTime();
            this.shareCount += 1;
            //监听切入前台,因为微信取消分享回调,暂时用方案：分享触发+回到前台为分享完成
            EventCenter.getInstance().once(BaseEvent.E_APP_ON_RESUME, this, function (res) {
                let diffTime = Math.floor((Utils.getTime() - this.shareStartTime) / 1000);
                if (diffTime > 3) {
                    EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                        code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                        way: exports.GetRewardSDKWay.SHARE,
                        rewardType: exports.GetRewardSDKWay.SHARE
                    });
                }
                else {
                    this.continue("分享给新的朋友才能获得奖励！");
                }
                this.shareStartTime = undefined;
            });
            Sdk.getInstance().share(this._shareParam);
        }
        /**
         * 继续分享
         */
        continue(content) {
            Sdk.getInstance().showModal(content, "提示", "继续分享", Laya.Handler.create(this, function () {
                this.gain();
            }), "一会再来", Laya.Handler.create(this, function () {
                this.shareCount = 0;
                EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL });
            }));
        }
    }
    ;
    class VideoWay {
        constructor(o) {
            this._videoParam = o;
        }
        gain() {
            if (Utils.isOnPC()) {
                EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                    code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                    way: exports.GetRewardSDKWay.VIDEO,
                    rewardType: exports.GetRewardSDKWay.VIDEO
                });
                return;
            }
            let videoState = Sdk.getInstance().isHasVideo(this._videoParam.id);
            if (exports.VideoState.UNENABLED === videoState) { //没有视频,自动切换未分享获得奖励
                Sdk.getInstance().showModal("今天已经没有视频啦,分享同样可以获得奖励哟!", "提示", "分享获得", Laya.Handler.create(this, function () {
                    RewardGainWay.inst.gain(new ShareWay(this._videoParam));
                }), "明天再来", Laya.Handler.create(this, function () {
                    EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL });
                }));
            }
            else {
                EventCenter.getInstance().once(SdkUIEvent.E_AD_VIDEO, this, function (event) {
                    if (exports.SdkCode.AD_VIDEO_SUCCESS === event.code) { //完成视频
                        EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, {
                            code: exports.SdkCode.REWARD_GAIN_SUCCESS,
                            way: exports.GetRewardSDKWay.VIDEO,
                            rewardType: exports.GetRewardSDKWay.VIDEO
                        });
                    }
                    else if (exports.SdkCode.AD_VIDEO_UNCOMPLETE === event.code) { //未看完视频
                        Sdk.getInstance().showModal("看完视频才会有奖励哟！！！", "提示", "继续观看", Laya.Handler.create(this, function () {
                            this.gain();
                        }), "一会再来", Laya.Handler.create(this, function () {
                            EventCenter.getInstance().event(SdkUIEvent.E_REWARD_GAIN, { code: exports.SdkCode.REWARD_GAIN_FAIL });
                        }));
                    }
                });
                Sdk.getInstance().playVideo(this._videoParam.id);
            }
        }
    }
    class InsertWay {
        gain() {
            throw new Error("Method not implemented.");
        }
    }

    exports.AppBase = AppBase;
    exports.AudioContextPool = AudioContextPool;
    exports.AuthProfileMsg = AuthProfileMsg;
    exports.AutoReleaseManager = AutoReleaseManager;
    exports.BDAdv = BDAdv;
    exports.BDLogin = BDLogin;
    exports.BIStat = BIStat;
    exports.BTDecorator = BTDecorator;
    exports.BTPriority = BTPriority;
    exports.BTSelector = BTSelector;
    exports.BTSequence = BTSequence;
    exports.BTreeNode = BTreeNode;
    exports.BaiduRewardStrategy = BaiduRewardStrategy;
    exports.BaseDialog = BaseDialog;
    exports.BaseEvent = BaseEvent;
    exports.BaseEventDispatcher = BaseEventDispatcher;
    exports.BaseExtend = BaseExtend;
    exports.BaseLogic = BaseLogic;
    exports.BaseModel = BaseModel;
    exports.BaseMsg = BaseMsg;
    exports.BaseScene = BaseScene;
    exports.BaseView = BaseView;
    exports.BehaviorTree = BehaviorTree;
    exports.BranchNode = BranchNode;
    exports.CfgMgr = CfgMgr;
    exports.Color = Color;
    exports.Config3DType = Config3DType;
    exports.CustomServiceCheckMsg = CustomServiceCheckMsg;
    exports.CustomServiceMsg = CustomServiceMsg;
    exports.CustomServiceQueryMsg = CustomServiceQueryMsg;
    exports.DataStubMsg = DataStubMsg;
    exports.Dialog = Dialog;
    exports.Effect = Effect;
    exports.EventCenter = EventCenter;
    exports.EventDispatcher = EventDispatcher;
    exports.FavoriteRewardMsg = FavoriteRewardMsg;
    exports.GiftStateMsg = GiftStateMsg;
    exports.HtmlText = HtmlText;
    exports.Http = Http;
    exports.InsertWay = InsertWay;
    exports.IpQueryMsg = IpQueryMsg;
    exports.JSBridge = JSBridge;
    exports.Login = Login;
    exports.LoginMsg = LoginMsg;
    exports.LoginMsgNoAuth = LoginMsgNoAuth;
    exports.MD5 = MD5;
    exports.MailInfoMsg = MailInfoMsg;
    exports.MailOpenMsg = MailOpenMsg;
    exports.MailSendMsg = MailSendMsg;
    exports.MenuInfo = MenuInfo;
    exports.MeshLine = MeshLine;
    exports.ModalDialogBox = ModalDialogBox;
    exports.OppoAdv = OppoAdv;
    exports.OppoLogin = OppoLogin;
    exports.OppoRewardStrategy = OppoRewardStrategy;
    exports.Plane2d = Plane2d;
    exports.Plane3d = Plane3d;
    exports.PlatformType = PlatformType;
    exports.PreCondition = PreCondition;
    exports.QQAdv = QQAdv;
    exports.QQLogin = QQLogin;
    exports.QQRewardStrategy = QQRewardStrategy;
    exports.QQShare = QQShare;
    exports.QQStat = QQStat;
    exports.QTTAdv = QTTAdv;
    exports.QTTLogin = QTTLogin;
    exports.QTTRewardStrategy = QTTRewardStrategy;
    exports.RES3D_GROUP_NAME = RES3D_GROUP_NAME;
    exports.RankInfoMsg = RankInfoMsg;
    exports.RankScoreMsg = RankScoreMsg;
    exports.RewardGainWay = RewardGainWay;
    exports.RewardGainWayParams = RewardGainWayParams;
    exports.RewardStrategy = RewardStrategy;
    exports.SceneManager = SceneManager;
    exports.Sdk = Sdk;
    exports.SdkEvent = SdkEvent;
    exports.SdkGameCfg = SdkGameCfg;
    exports.SdkMsg = SdkMsg;
    exports.SdkMsgEvent = SdkMsgEvent;
    exports.SdkMsgUrlDefine = SdkMsgUrlDefine;
    exports.SdkUIEvent = SdkUIEvent;
    exports.Sequence = Sequence;
    exports.ShareClearMsg = ShareClearMsg;
    exports.ShareInfo = ShareInfo;
    exports.ShareQuery = ShareQuery;
    exports.ShareWay = ShareWay;
    exports.SoundManager = SoundManager;
    exports.SystemInfo = SystemInfo;
    exports.TTAdv = TTAdv;
    exports.TTLogin = TTLogin;
    exports.TTRewardStrategy = TTRewardStrategy;
    exports.TTShare = TTShare;
    exports.TapTapAd = TapTapAd;
    exports.TapTapLogin = TapTapLogin;
    exports.TapTapStat = TapTapStat;
    exports.TweenSequence = TweenSequence;
    exports.UniformBezier = UniformBezier;
    exports.UserInfoEntity = UserInfoEntity;
    exports.UserLogic = UserLogic;
    exports.Utils = Utils;
    exports.Vector2 = Vector2;
    exports.Vector3 = Vector3;
    exports.VideoWay = VideoWay;
    exports.VivoAd = VivoAd;
    exports.VivoLogin = VivoLogin;
    exports.VivoRewardStrategy = VivoRewardStrategy;
    exports.VivoSystemInfo = VivoSystemInfo;
    exports.WXAdv = WXAdv;
    exports.WXLogin = WXLogin;
    exports.WXRewardStrategy = WXRewardStrategy;
    exports.WXShare = WXShare;
    exports.WXStat = WXStat;

    return exports;

}({}));

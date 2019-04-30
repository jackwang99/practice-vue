import Api from '@/api/request'

const MenuMap = [
    null, //0
    [
        {title: '控制台', link: '/takeout/index'},
        {title: '订单管理', link: '/takeout/order'},
        {title: '商品管理', link: '/takeout/product'},
        {title: '评价管理', link: '/takeout/comment', small: true}
    ],
    [
        {title: '控制台t', link: '/groupBuy/index'},
        {title: '订单管理t', link: '/groupBuy/order'},
        {title: '商品管理t', link: '/groupBuy/product'},
    ],
    null, //3
    [
        {title: '控制台pt', link: '/collage/index'},
        {title: '订单管理pt', link: '/collage/order'},
        {title: '商品管理pt', link: '/collage/product'},
    ],
    [
        {title: '控制台kj', link: '/bargain/index'},
        {title: '订单管理kj', link: '/bargain/order'},
        {title: '商品管理kj', link: '/bargain/product'},
    ]
];

const state = {
    shopInfo: {},
    currentMenus: [],
    currentBusinessIndexUrl: '', //当前业务的首页地址
}

const getBusinessStatusStr = function(sts){
    let oriSts = '';
    switch(sts){
        case "1": 
            oriSts = "";
            break;
        case "2": 
            oriSts = "(冻结)";
            break;
        case "3": 
            oriSts = "(全局关店)";
            break;
        default: 
            oriSts = "(审核中)";
            break;
    }
    return oriSts;
}
const getters = {
    wStatusStr(state) {
        return getBusinessStatusStr(state.shopInfo.wStatus);
    },
    tStatusStr(state) {
        return getBusinessStatusStr(state.shopInfo.tStatus);
    },
    pStatusStr(state) {
        return getBusinessStatusStr(state.shopInfo.pStatus);
    },
    kStatusStr(state) {
        return getBusinessStatusStr(state.shopInfo.kStatus);
    }
}

const mutations = {
    queryPcShopInfo(state, shopInfo) {
        state.shopInfo = shopInfo;
        
        const isOpenW = shopInfo.isOpenW,
              isOpenT = shopInfo.isOpenT,
              isOpenP = shopInfo.isOpenP,
              isOpenK = shopInfo.isOpenK;
        let firstLoginType = isOpenW==1?1:(isOpenT==1?2:(isOpenP==1?4:(isOpenK==1?5:0)));
        let menuMap = shopInfo.lastLoginType ? MenuMap[shopInfo.lastLoginType] : MenuMap[firstLoginType];
        if(menuMap){
            state.currentMenus = menuMap;
            state.currentBusinessIndexUrl = menuMap[0].link;
        }else{
            console.log("未开通业务");
        }
    }
   
}

const actions = {
    //请求修改lastLoginType
    queryPcShopInfo(context) {
        Api.ajaxReadPost('/readShop/queryPcShopInfo', null, function(result){
            console.log('mock queryPcShopInfo: ', result);
            context.commit('queryPcShopInfo', result.result);
        });
    }

}

export default {
    state,
    getters,
    mutations,
    actions
};
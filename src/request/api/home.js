import reqService from "..";

//获取banners轮播图信息
export function getBannerImg() {
    return reqService({
        url: '/banner?type=2',
        method: 'get',
    })
}

//获取每日歌单
export function getMusicList() {
    return reqService({
        url: '/personalized?limit=20',
        method: 'get',
    })
}

//获取搜索结果 /search?keywords=海阔天空
export function getSearchReturn(data) {
    return reqService({
        url: `/cloudsearch?keywords=${data}`,
        method: 'get',
    })
}
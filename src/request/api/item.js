import reqService from "..";

//根据id获得具体音乐信息
export function getMusicItemList(id) {
    return reqService({
        url: `/playlist/detail?id=${id}`,
        method: 'get',
    })
}

//获取专辑所有歌曲
export function getMusicList(id) {
    return reqService({
        url: `/playlist/track/all?id=${id}&limit=20&offset=1`,
        method: 'get',
    })
}

//获取点击音乐的URL
export function getMusicUrl(id) {
    return reqService({
        url: `/song/url?id=${id}`,
        method: 'get',
    })
}

//获取音乐的lyric歌词
export function getMusicLyric(id) {
    return reqService({
        url: `/lyric?id=${id}`,
        method: 'get',
    })
}

//获取音乐mv
export function getMusicMV(id) {
    return reqService({
        url: `/mv/url?id=${id}&r=240`,
        method: 'get',
    })
}
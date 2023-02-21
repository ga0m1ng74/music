//vant 插件 引入及使用
import { Button, Swipe, SwipeItem, Popup, Icon } from 'vant'

let plugins = [Button, Swipe, SwipeItem, Popup, Icon];

export default function getVant(app) {
    plugins.forEach(item => {
        return app.use(item)
    })
}
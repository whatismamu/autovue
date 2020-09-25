import Cookies from 'js-cookie';
const myStorage = {
    removeItem: function(key) {
        if (window.sessionStorage) {
            window.sessionStorage.removeItem(key)
        } else {
            // 用户浏览器不支持localstorage，使用cookie代替
            Cookies.set(key, '')
        }
    },
    setItem: function (key, value) {
        if (window.sessionStorage) {
            window.sessionStorage.setItem(key, value)
        } else {
            // 用户浏览器不支持localstorage，使用cookie代替
            Cookies.set(key, value)
        }
    },
    getItem: function (key) {
        if (window.sessionStorage) {
            return window.sessionStorage.getItem(key)
        }
        return Cookies.get(key)
    }
}
export default myStorage;


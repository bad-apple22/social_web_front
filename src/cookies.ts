function getCookie(name: string): string | null {
    let all_cookie = document.cookie.split("; ");
    for (let i = 0; i < all_cookie.length; i++) {
        let arr = all_cookie[i].split("=");
        if (arr[0].trim() == name) {
            return arr[1].trim();
        }
    }
    return null;
}

function setCookie(name: string, value: string, expiresSecond: number) {
    let date = new Date();
    date.setTime(date.getTime() + (expiresSecond * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + "; " + expires;
}

//不设过期时间，关闭浏览器自动销毁
function setTempCookie(name: string, value: string) {
    document.cookie = name + "=" + value + ";";
}

export default {
    getCookie, setCookie, setTempCookie
}
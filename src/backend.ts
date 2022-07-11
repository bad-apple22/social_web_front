/*
负责与后端进行通讯，数据交换
 */
import cookies from "./cookies";

const protocol = "http"
const hostname = "localhost";
const port = 8080;
const url = protocol + "://" + hostname + ":" + port;

function getSession() {
    return cookies.getCookie("session");
}

async function request(path: string, params: any) : Promise<any> {
    console.log("request:", path, params);
    params.session = getSession();
    let res = await fetch(url + "/" + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // mode:'cors',
        body: JSON.stringify(params)
    });
    return await res.json();
}

export async function verifySession() {
    let session = getSession();
    if (session == null) return false;
    let res = await request("verify_session", session);
    return res.success;
}

export async function login(param: { username: string, password: string, remember: boolean }) {
    let res_data = await fetch(url + "/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(param)
    });
    let res = await res_data.json();
    console.log("res:",res);
    if (res.success) {
        if (param.remember)
            cookies.setCookie("session", res.session, 60 * 60 * 24 * 30);
        else
            cookies.setTempCookie("session", res.session);
        return true;
    }
    return false;
}


export async function queryVacation(param: {
    name?: string,
    type?: string,
    state?: string,
    applyTimeBegin?: number,
    applyTimeEnd?: number,
    pageSize: number,
    pageIndex: number,
}) {
    console.log("call queryQingxiaojiaRecord:", JSON.stringify(param));
    try {
        return request("queryVacation", param);
    } catch (e) {
        console.log("queryVacation:", e)
        return null;
    }
}

export async function addUser(param: {
    id: number,
    name: string,
    organization: string,
    username: string,
    phonenum: string,
    enabled: boolean,
}) {
    request("queryVacation", param);
}
/*
负责与后端进行通讯，数据交换
 */
import cookies from "./cookies";

const protocol = "http"
const hostname = "localhost";
const port = 3000;
const url = protocol + "://" + hostname + ":" + port+"/api";

// function getSession() {
//     return cookies.getCookie("session");
// }

async function request(path: string, params: any): Promise<any> {
    console.log("request:", path, params);
    // params.session = getSession();
    let res = await fetch(url + "/" + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        // mode: 'cors',
        body: JSON.stringify(params)
    });
    let data = await res.text();
    console.log("res data:" + data);
    return JSON.parse(data);
}

// export async function verifySession() {
//     let session = getSession();
//     if (session == null) return false;
//     let res = await request("verify_session", session);
//     return res.success;
// }

export async function login(param: { username: string, password: string }) {
    let req_param = new URLSearchParams();
    req_param.append("username", param.username);
    req_param.append("password", param.password);
    console.log("param:", req_param.toString());
    let res_data = await fetch(url + "/login", {
        method: 'POST',credentials: 'include',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: req_param.toString()
    });
    let res = await res_data.json();
    console.log("res:", res);
    if (res.success) {
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
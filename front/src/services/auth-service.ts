import { User } from "../models/user";
import { UserInfo } from "../models/user-payload";
import { fetchAndParse } from "../utils/utilFunctions";
import { baseUrl, headers } from "./config";


export function userLogin(body: UserInfo): Promise<any>{
    const url = baseUrl + '/api/login';
    return fetchAndParse<any>(url, {method: "POST",body: JSON.stringify(body), headers})
}

export function verifyToken(): Promise<any>{
    const url = baseUrl + '/api/verifyToken';
    return fetchAndParse<any>(url, {method: "POST", headers});
}

export function userRegister(body: User): Promise<any>{
    const url = baseUrl + '/api/register';
    return fetchAndParse<any>(url, {method: "POST",body: JSON.stringify(body), headers})
}

export function adminRegister(body: User): Promise<any>{
    const url = baseUrl + '/api/admin/register';
    return fetchAndParse<any>(url, {method: "POST",body: JSON.stringify(body), headers})
}

export function getCurrentUser(email: string): Promise<any>{
    const url = baseUrl + `/api/current-user/${email}`;
    return fetchAndParse<any>(url, {method: "POST", headers})
}



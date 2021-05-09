import { Book } from "../models/book";
import { BookPayload } from "../models/book-payload";
import { fetchAndParse } from "../utils/utilFunctions";
import { baseUrl ,headers } from "./config";

export function getAllBooks(): Promise<Book[]>{
    const url = baseUrl + '/api/books';
    return fetchAndParse<Book[]>(url,{method: "GET", headers});
}

export function getSingleBook(id: string): Promise<Book>{
    const url = baseUrl + `/api/books/${id}`;
    return fetchAndParse<Book>(url, {method: "GET", headers});
}

export function getBooksBySearch(param?: string): Promise<Book[]>{
    const url = baseUrl + `/api/search/${param}`;
    return fetchAndParse<Book[]>(url, {method: "GET", headers});
}

export function deleteBook(id: string): Promise<any>{
    console.log(id)
    const url = baseUrl + `/api/books/${id}`;
    return fetchAndParse(url, {method: "DELETE", headers});
}

export function postBook(body: BookPayload): Promise<any>{
    const url = baseUrl + '/api/books';
    return fetchAndParse<Book>(url, {method: "POST", body: JSON.stringify(body), headers});
}

export function putBook(body: BookPayload, id: string): Promise<any>{
    const url = baseUrl + `/api/books/${id}`;
    return fetchAndParse<Book>(url, {method: "PUT", body: JSON.stringify(body), headers})
}
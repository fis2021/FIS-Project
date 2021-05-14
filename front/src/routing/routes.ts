import { useHistory } from "react-router-dom";

export const urls = {
    startPage: (p: { route: string }) => `/app/start/${p.route}`,

    loginPage: () => "/app/start/login",
    registerPage: () => "/app/start/register",
    contentPage: () => "/app/content",
    adminPanel: () => "/admin",
    addBook: () => "/admin/add",
    addAdminAccount: () => "/admin/addAccount",
    editBook: (p: {id: string}) => `/admin/edit/${p.id}`,
    bookPage: (p: {id: string}) => `/app/content/${p.id}`,
    favoritesPage: () => '/app/favorites',
};

export const startUrl = urls.loginPage;

export function useRouting() {
    const history = useHistory();

    function routeTo(fn: () => string): void;
    function routeTo<T>(fn: (p: T) => string, params: T): void;
    function routeTo<T>(fn: (p?: T) => string, params?: T) {
        history.push(fn(params));
    }
    return {
        routeTo,
        history,
    };
}

export function route(fn: () => string): string;
export function route<T>(fn: (p: T) => string, params: Array<keyof T>): string;
export function route<T>(fn: (p: T) => string, params: Array<keyof T> = []) {
    const parameter = Object.fromEntries(params.map((p) => [p, ":" + p]));
    return fn(parameter as any);
}

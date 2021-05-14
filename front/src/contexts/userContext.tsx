import { createContext, Dispatch, FC, useEffect, useState } from 'react'
import { useEffectAsync } from '../hooks/async-hooks';
import { User } from '../models/user';
import { getCurrentUser, verifyToken } from '../services/auth-service';
import { headers } from '../services/config';

type UserValue = Omit<User, "password">;

export const UserContext = createContext<[UserValue, Dispatch<UserValue>, string[] | undefined]>([null!, () => null!, []]);


export const UserContextProvider: FC = props => {
    const [user, setUser] = useState<UserValue>(null!);
    const [userChecked, setUserChecked] = useState(false);
    const [favorites, setFavorites] = useState(undefined);

    useEffect(() => {
        (async () => {
            try {
                const unparsedUser = localStorage.getItem("user");
                if (unparsedUser) {
                    const parsedUser = JSON.parse(unparsedUser);
                    headers.Authorization = `Bearer ${parsedUser.accessToken}`;
                    const token = await verifyToken();
                    if (token.passed) {
                        setUser(parsedUser);
                        setUserChecked(true);
                    } else {
                        headers.Authorization = ``;
                        setUser(null!);
                    }
                }
            } catch (e) {
                headers.Authorization = ``;
                setUser(null!);
            }
            setUserChecked(true);
        })();
    }, []);

    useEffectAsync(async () => {
        if (localStorage.getItem("user")) {
            const result = await getCurrentUser(JSON.parse(localStorage.getItem("user")!).email);
            setFavorites(result.favorites)
        }
    }, []);

    return <UserContext.Provider value={[user, setUser, favorites]}>
        {userChecked ? props.children : null}
    </UserContext.Provider>;
}
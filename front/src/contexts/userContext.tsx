import { createContext, Dispatch, FC, useEffect, useState } from 'react'
import { User } from '../models/user';
import { verifyToken } from '../services/auth-service';
import { headers } from '../services/config';

type UserValue = Omit<User, "password">;

export const UserContext = createContext<[UserValue, Dispatch<UserValue>]>([null!, () => null!]);


export const UserContextProvider: FC = props => {
    const [user, setUser] = useState<UserValue>(null!);
    const [userChecked, setUserChecked] = useState(false);
    useEffect(() => {
        (async () => {
            try {
                const unparsedUser = localStorage.getItem("user");
                if (unparsedUser) {
                    const parsedUser = JSON.parse(unparsedUser);
                    console.log(parsedUser)
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
    console.log(userChecked);
    return <UserContext.Provider value={[user,setUser]}>
        {userChecked ? props.children : null}
    </UserContext.Provider>;
}
import { createContext, Dispatch, FC, useEffect, useState } from 'react'

export const SearchContext = createContext<[string,Dispatch<string>]>([null!, () => null!]);

export const SearchContextProvider: FC = props => {

    const [searchWord, setSearchWord] = useState<string>(null!);
    console.log(searchWord)

    return <SearchContext.Provider value={[searchWord,setSearchWord]}>
        {props.children}
    </SearchContext.Provider>;
}
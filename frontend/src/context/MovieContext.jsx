import {createContext, use, useContext, useState} from "react"

const MovieContext = createContext()

export const useMovieContect = () => useContext()

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    use()
    return <MovieContext.Provider>
        {children}
    </MovieContext.Provider>
}
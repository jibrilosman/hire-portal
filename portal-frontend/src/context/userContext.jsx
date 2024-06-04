import axios from "axios";
import { createContext ,useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children })  {
    const [user, setUser] = useState(null);
    const role = localStorage.getItem('role');

    useEffect(() => {
        if(!user) {
            axios.get('https://hire-portal-ypuf.onrender.com/api/contractors/profile').then(({data}) => {
                setUser(data);
            })
        }
        
    }, [user]);


    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

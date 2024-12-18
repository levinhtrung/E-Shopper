import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [totalQty, setTotalQty] = useState(0);

    useEffect(()=>{
        const saveQty = localStorage.getItem("totalQty")
        if(saveQty){
            setTotalQty(parseInt(saveQty, 10))
        }
    },[])

    const updateQty = (qty) => {
        setTotalQty(qty);
        localStorage.setItem("totalQty",qty)
    };

    return (
        <UserContext.Provider value={{ totalQty, updateQty }}>
            {children}
        </UserContext.Provider>
    );
};

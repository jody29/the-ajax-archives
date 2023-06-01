import { createContext, useState } from "react";

export const FilterContext = createContext()

export const Provider = ({ children }) => {
    const [selectedSeason, setSeason] = useState('2023-2024')

    return (
        <>
            <FilterContext.Provider value={{ selectedSeason, setSeason }}>
                {children}
            </FilterContext.Provider>
        </>
    )
}
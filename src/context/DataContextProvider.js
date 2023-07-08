import { createContext, useContext, useState } from "react";
import { cuisineData, restaurantsData } from "../constants";


const DataContext= createContext({cuisineData:[],restaurantsData:[]})


export const useDataContext=()=> useContext(DataContext);

const DataContextProvider=({children})=>{
    const [cuisine, setCuisine]=useState(cuisineData)
    const [restaurantsdata,setRestaurantData]=useState(restaurantsData)

    return(
        <DataContext.Provider  value={{cuisineData:cuisine, restaurantsData:restaurantsdata}} >
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider;
import { createSlice } from '@reduxjs/toolkit'


/*


   const initialState = {
    name:JSON.parse(localStorage.getItem("company")) || null,
    company: JSON.parse(localStorage.getItem("companyName")) || null,
    clientId:JSON.parse(localStorage.getItem("clientId")) || null,
  }



*/
const initialState = {
    name:localStorage.getItem("companyName") || null,
    company: localStorage.getItem("company") || null,
    clientId: localStorage.getItem("clientId") || null,
  }

export const companySlice = createSlice({
    name:'company-slice',
    initialState:initialState,
    reducers:{
  
        addCompany:(state,action)=>{
            const {company,name,clientId}=action.payload;
            state.company=company;
            state.name=name;
            state.clientId=clientId;
        },
  
        changeCompany:(state,action)=>{
            console.log("cambiara la compañia en el company slice:"+action.payload.company)
            state.company= action.payload.company;
            state.name= action.payload.name;
            state.clientId= action.payload.clientId;
        }
    }
  })

  

export const {
    addCompany,changeCompany
  } = companySlice.actions;
  
  export default companySlice.reducer;
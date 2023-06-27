import React, { useContext, useState } from 'react';
import axios from 'axios'
let BASE_URL = "https://ramesh-expense-tracker-backend.onrender.com/api/v1/";
const GlobalContext = React.createContext()


export const GlobalProvider = ({children}) => {
    const [income,setIncome] = useState([])
    const [expenses,setExpenses] = useState([])
    const [erroe,setError] = useState(null)


    // Income Calculaion

    const addIncome = async (income) => {
            const response = await axios.post(`${BASE_URL}add-income`, income);
            getIncome();
    };
    
    const getIncome = async () => {
        const response = await axios.get(`${BASE_URL}get-income`);
        setIncome(response.data);
    }
    const deleteIncome = async(id)=>{
        const response = await axios.delete(`${BASE_URL}del-income/${id}`);
        getIncome();
    }
    const totalIncome = ()=>{
        let totalIncome = 0;
        income.forEach((income)=>{
            totalIncome+=income.amount;
        });
        return totalIncome;
    }


    // ExpenseCalculation

    const addExpense = async (expenses)=>{
        let response  = await axios.post(`${BASE_URL}add-expense`, expenses)
        getExpense();
    }

    const getExpense = async ()=>{
        const response = await axios.get(`${BASE_URL}get-expense`, expenses);
        setExpenses(response.data);
    }

    const deleteExpense = async (id)=>{
        const response = await axios.delete(`${BASE_URL}del-expense/${id}`, expenses);
        getExpense();
    }

    const totalExpense = ()=>{
        let totalExpense =0;
        expenses.forEach((expense)=>{
            totalExpense+=expense.amount;
        });
        return totalExpense;
    }
    const balance =()=>{
        let balance =0;
        return Math.abs(totalIncome()-totalExpense());
    }
    return(
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpense,
            deleteExpense,
            totalExpense,
            income,
            expenses,
            balance,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
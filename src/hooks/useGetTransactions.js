import { useEffect, useState } from "react";
import { query, collection, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [transTotal, setTransTotal] = useState({
        balance: 0.0, 
        income: 0.0, 
        expenses: 0.0
    });

    const transCollectionRef = collection(db, "transactions");
    const {userId} = useGetUserInfo();

    const getTransactions = async () =>{
        let unsubscribe;
        try {
            const queryTransactions = query(
                transCollectionRef, 
                where("userId", "==", userId), 
                orderBy("createAt") 
            );

            unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
                let docs = [];
                let totalExpenses = 0;
                let totalIncome = 0;

                snapshot.forEach( (doc) => {
                    const data = doc.data();
                    const id = doc.id; 

                    docs.push({...data, id });

                    if (data.transactionType === "expense"){
                        totalExpenses += Number(data.transactionAmount);
                    } else {
                        totalIncome += Number(data.transactionAmount);
                    }
                });
                
                setTransactions(docs);

                let balance = totalIncome - totalExpenses;
                setTransTotal({
                    balance,
                    expenses: totalExpenses,
                    income: totalIncome
                })
            }); 
        } catch (error) {
            console.error(error);
        }
        return () => unsubscribe();
    };

    useEffect(() => {
        getTransactions()
    })

    return { transactions, transTotal };
}
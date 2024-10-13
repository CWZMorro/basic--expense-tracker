import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () =>{
    const transCollectionRef = collection(db, "transactions");
    const {userId} = useGetUserInfo();

    const addTransactions = async ({description, transactionAmount, transactionType}) => {
        await addDoc(transCollectionRef, {
            userId,
            description,
            transactionAmount,
            transactionType,
            createAt: serverTimestamp()
        })

    };

    return {addTransactions};
}
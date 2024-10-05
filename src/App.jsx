import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc,updateDoc, doc } from 'firebase/firestore';
import { ref,uploadBytes } from "firebase/storage";

const App = () => {
  const [bookList, setBookList] = useState([]);

  //New Book State
  const [newBookTitle, setNewTitle] = useState("");
  const [newBookReleaseDate, setNewReleaseDate] = useState(0);
  const [newReceivedAnOscar, setNewReceivedAnOscar] = useState(false);

  //Update Title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File upload state
  const [fileUpload, setFileUpload] = useState(null);

  const booksCollectionRef = collection(db, "books");
  const getBookList = async () => {
    //READ DATA FROM DATABASE
    //SET BOOKLIST
    try {
      const data = await getDocs(booksCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBookList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (id) =>{
    const bookDoc = doc(db, "books", id)
    await deleteDoc(bookDoc);
  };

  const updateBookTitle = async (id) =>{
    const bookDoc = doc(db, "books", id)
    await updateDoc(bookDoc, {title: updatedTitle});
  };

  useEffect(() => {
    getBookList();
  }, []);

  const OnSubmitBook = async () => {
    try{
    await addDoc(booksCollectionRef, {
      title: newBookTitle, 
      releaseDate: newBookReleaseDate, 
      receivedAnOscar: newReceivedAnOscar,
      userId: auth?.currentUser?.uid,
    });

    getBookList();
  }catch(error){
    console.error(error);
  }
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <div className='App'>
      <Auth />

      <div>
        <input 
        placeholder='Movie title...' 
        onChange={(e) => setNewTitle(e.target.value)}
        />
        <input 
        placeholder='Release date...' 
        type='number' 
        onChange={(e) => setNewReleaseDate(e.target.value)}
        />
        <input 
        type='checkbox' 
        onChange={(e) => setNewReceivedAnOscar(e.target.checked)}
        />
        <label>Received an Oscar</label>
        <button onClick={OnSubmitBook}>Submit Book</button>

      </div>
    <div>
      {bookList.map( (book) => (
        <div>
          <h1 style={{color: book.receivedAnOscar ? "green" : "red" }}> 
            {book.title} </h1>
          <p> Date: {book.releaseDate} </p>

          <button onClick={() => deleteBook(book.id)}>Delete book</button>

          <input 
          placeholder='new Title...' 
          onChange={(e) => setUpdatedTitle(e.target.value)}/>
          <button onClick={() => updateBookTitle(book.id)}>Update Title</button>
        </div>
      ))}
    </div>

    <div>
      <input 
      type='file' 
      onChange={(e) => setFileUpload(e.target.files[0])}/>
      <button onClick={uploadFile}>Upload File</button>
    </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'; 
import * as Icon from 'react-feather';
import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

import ModalForm from './ModalForm';
import ListCard from './ListCard';


const AddListBtn = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [text, setText] = useState(props.text);

  let customStyle = {
    width: 'fit-content',
    padding: '0.64em 1em',
    margin: '32px 0'
  }
  return(
    <>
      <Button 
      variant="primary" 
      style={customStyle}
      onClick={() => setModalShow(true)}>
        <Icon.Plus color='#fff' size={20} style={{marginRight: '8px'}}/>
        {text}
      </Button>{''}
      <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        onAdd={props.onSave}
      />
    </>
  );
}

console.log()

function App() {
  const [books, setBooks] = useState([]); 
  
  const addBook = (book) => {
    const id = uuidv4();
    const newBook = {id, ...book};

    setBooks([...books, newBook]);
    localStorage.setItem("book", JSON.stringify([...books, newBook]));
  }

  const deleteBook = (id) => {
    const deleteBook = books.filter((book) => book.id !== id);
    setBooks(deleteBook);
    localStorage.setItem("book", JSON.stringify(deleteBook));
    alert('book deleted')
  }

  const editBook = (id, value) => {
    let data = JSON.parse(localStorage.getItem("book"));

    const myData = data.map(x => {
      if(x.id === id){
        return {
          ...x,
          title: value.title,
          author: value.author,
          pages: value.pages
        }
      }
      return x;
    })
    localStorage.setItem("book", JSON.stringify(myData));
  }

  const getBooks = JSON.parse(localStorage.getItem("book"));

  useEffect(() => {
    if(getBooks == null) {
      setBooks([]);
    } else {
      setBooks(getBooks);
    }
  }, []);

  return (
    <div className="App">
        
      <div className="container">
        <h1 className="title"><span>📚</span>Reading List</h1>
        <AddListBtn 
        text='Add Book'
        onSave={addBook}
        />
        {
          books.map((book) => (
            <ListCard 
            id={book.id}
            title={book.title}
            author={book.author}
            pages={book.pages}
            onDelete={deleteBook}
            onUpdate={editBook}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;

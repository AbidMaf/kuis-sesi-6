import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'; 
import * as Icon from 'react-feather';
import Card from 'react-bootstrap/Card';
import ModalForm from './ModalForm';

const ListCard = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const customStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  }

  const [title, setTitle] = useState(props.title);
  const [author, setAuthor] = useState(props.author);
  const [pages, setPages] = useState(props.pages);
  return(
    <Card style={customStyle}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{author}</Card.Text>
      </Card.Body>
      <Card.Footer style={{height: '100% !important', backgroundColor: '#fffffe !important'}}>
        <a onClick={() => props.onDelete(props.id)}>
          <Icon.Trash2 color='#1a1a1a' size={20}/>
        </a>
        <a onClick={() => setModalShow(true)}>
         <Icon.Search color='#1a1a1a' size={20}/>
        </a>
        <ModalForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        onUpdate={props.onUpdate}
        id={props.id}
        title={title}
        author={author}
        pages={pages}
      />
      </Card.Footer>
    </Card>
  )
}

export default ListCard;
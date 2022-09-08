import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'; 
import * as Icon from 'react-feather';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { propTypes } from 'react-bootstrap/esm/Image';

const ModalForm = (props) => {
    const [title, setTitle] = useState(props.title);
    const [author, setAuthor] = useState(props.author);
    const [pages, setPages] = useState(props.pages);
    const onSubmit = (e) => {
    e.preventDefault();
    if(props.id === null){
        props.onAdd({ title, author, pages });
        setTitle('');
        setAuthor('');
        setPages('');
        alert('Book Added');
    } else {
        console.log('id before update: ', props.id)
        props.onUpdate(props.id, { title, author, pages });
        alert('Book Updated');
    }
  }

  return(
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Book
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" placeholder="Enter Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Read Page</Form.Label>
            <Form.Control type="number" placeholder="Enter last read page" value={pages} onChange={(e) => setPages(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

ModalForm.defaultProps = {
    id: null,
    title: '',
    author: '',
    pages: '',
}

export default ModalForm;
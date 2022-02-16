import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsApis from '../../api/PostsApis';
import ImageViewer from '../../components/ImageViewer';
import { Form } from 'react-bootstrap';
import DeleteAndSaveButtons from '../../components/DeleteAndSaveButtons';

const WritePostPage = ({ FileInput, userInfo }) => {
  const [post, setPost] = useState({
    title: '',
    content: '',
    userId: '',
    price: '',
    imageName: '',
    imageUrl: '',
    zonecode: '',
    isSoldOut: false,
  });
  const [image, setImage] = useState('');
  const { userId, zonecode } = userInfo;

  const navigate = useNavigate();

  const changeValue = (event) => {
    event.preventDefault();
    setPost((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
      userId: userId,
    }));
  };

  const onLoadFile = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const onDeleteFile = () => {
    URL.revokeObjectURL(image);
    setImage('');
  };

  const onFileChange = (file) => {
    setPost((prevState) => ({
      ...prevState,
      imageName: file.name,
      imageUrl: file.url,
      zonecode: zonecode,
      userid: userId,
    }));
  };

  const submitPost = async (event) => {
    try {
      event.preventDefault();
      const response = await PostsApis.writePost(post);
      console.log(response);
      if (response.status === 201) {
        navigate('/postlist');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form onSubmit={submitPost}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>상품명</Form.Label>
        <Form.Control
          type="text"
          placeholder="굿즈명"
          onChange={changeValue}
          name="title"
        />
        <Form.Label>가격</Form.Label>
        <Form.Control
          type="number"
          placeholder="숫자만 입력해주세요"
          onChange={changeValue}
          name="price"
        />
        <Form.Label>상품설명</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          onChange={changeValue}
          name="content"
        />
      </Form.Group>
      <ImageViewer image={image} />
      <FileInput onFileChange={onFileChange} onLoadFile={onLoadFile} />
      <DeleteAndSaveButtons onDeleteFile={onDeleteFile} />
    </Form>
  );
};

export default WritePostPage;

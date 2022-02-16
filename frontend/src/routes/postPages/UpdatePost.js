import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PostsApis from '../../api/PostsApis';
import ImageViewer from '../../components/ImageViewer';
import DeleteAndSaveButtons from '../../components/DeleteAndSaveButtons';

//아이디가 작성자와 동일할 경우에만 수정가능하도록 해야함
const UpdatePost = ({ FileInput, userInfo }) => {
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

  const { id } = useParams();
  const { userId, zonecode } = userInfo;
  const { imageUrl, title, content, price, imageName, isSoldOut } = post;

  const navigate = useNavigate();

  useEffect(() => {
    readPost();
  }, []);

  const readPost = async () => {
    try {
      const response = await PostsApis.getOnePost(id);
      if (response.status === 200) {
        const {
          ptitle,
          pcontent,
          userid,
          pnumber,
          imageUrl,
          price,
          imageName,
          isSoldOut,
          tcode,
        } = response.data;

        setPost((prevState) => ({
          ...prevState,
          title: ptitle,
          userId: userid,
          content: pcontent,
          readCount: pnumber,
          imageUrl,
          price,
          imageName,
          isSoldOut,
          zonecode: tcode,
        }));
      } else {
        alert(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeValue = (event) => {
    event.preventDefault();
    setPost((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onDeleteFile = () => {
    URL.revokeObjectURL(imageUrl);
    setPost((prevState) => ({ ...prevState, imageUrl: '' }));
  };

  const onLoadFile = (event) => {
    setPost((prevState) => ({
      ...prevState,
      imageUrl: URL.createObjectURL(event.target.files[0]),
    }));
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

  const submitPost = (event) => {
    console.log('submitpost', post);
    const PostData = {
      ptitle: title,
      pcontent: content,
      userid: userId,
      price,
      imageUrl,
      imageName,
      zonecode,
      isSoldOut,
    };
    event.preventDefault();
    fetch('/post/' + id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(PostData),
    })
      .then((res) => {
        if (res.statue === 200) return res.json();
      })
      .then((res) => {
        if (res !== null) {
          navigate('/postlist');
        }
      });
  };
  // 추후 axios로 리펙토리 예정
  //  const submitPost = async () => {
  //   try {
  //     const postData = { post, id };
  //     const response = await PostsApis.postUpdate(postData);
  //     console.log(response);
  //     if (response.data === 201) {
  //       navigate('/postlist');
  //     } else {
  //       return null;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Form onSubmit={submitPost}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>상품명</Form.Label>
        <Form.Control
          type="text"
          placeholder="굿즈명"
          onChange={changeValue}
          name="title"
          value={post.title || ''}
        />
        <Form.Label>가격</Form.Label>
        <Form.Control
          type="number"
          placeholder="숫자만 입력해주세요"
          onChange={changeValue}
          name="price"
          value={post.price || ''}
        />
        <Form.Label>상품설명</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          onChange={changeValue}
          name="content"
          value={post.content || ''}
        />
      </Form.Group>
      <ImageViewer image={imageUrl} />
      <FileInput onFileChange={onFileChange} onLoadFile={onLoadFile} />
      <DeleteAndSaveButtons onDeleteFile={onDeleteFile} />
    </Form>
  );
};

export default UpdatePost;

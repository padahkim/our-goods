import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import PostsApis from '../../api/PostsApis';
import styled from 'styled-components';
import Modal from '../../components/modal/ChattingModalPage';

//작성자,우편번호
//조회수넣어야함

const SellerInfo = styled.ul`
  display: flex;
  justify-content: flex-between;
`;
const Li = styled.li`
  margin: 1rem;
`;
const Img = styled.img`
  width: 800px;
`;

const Post = ({ userInfo }) => {

  const [modalOn, setModalOn] = useState(false);

    const openModal = (e) => {
      e.preventDefault();
      {userId ? (
        setModalOn(true)
      ) : ( 
        alert("로그인을 하셔야 본 서비스를 이용하실 수 있습니다.")
      )} 
    };

  const [post, setPost] = useState({
    userid: '',
    title: '',
    content: '',
    price: '',
    imageName: '',
    imageUrl: '',
    isSoldOut: false,
    zonecode: '',
  });
  useEffect(() => {
    readPost(id);
  }, []);
  const navigate = useNavigate();

  const { id } = useParams();
  const { userId } = userInfo;
  const { userid } = post;

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
          userid: userid,
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

  const deletePost = async () => {
    try {
      const response = await PostsApis.deleteOnePost(id);
      if ((response.data = 'ok')) {
        navigate('/postlist');
      } else {
        alert('삭제실패');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = (id) => {
    if (userId === userid) {
      navigate('/updatepost/' + id);
    } else {
      alert('작성자가 아닙니다');
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <hr />
      <SellerInfo>
        <Li>가격 : {post.price || ''}</Li>
        <Li>작성자:{post.userid || ''}</Li>
        <Li>위치:{post.zonecode || ''}</Li>
        <Li>
          <Button onClick={openModal}>채팅하기</Button>
          {modalOn && <Modal userId={userId}/>}
        </Li>
        <Li>
          <Button>거래상태</Button>
        </Li>
      </SellerInfo>
      <hr />
      <Img src={post.imageUrl || ''} />
      <h5>{post.content || ''}</h5>
      <Button onClick={() => updatePost(id)}> 수정</Button>
      <span> </span>
      <Button onClick={deletePost}>삭제</Button>
    </div>
  );
};
export default Post;

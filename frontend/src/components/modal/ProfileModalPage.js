import React, { useState } from 'react';
import styled from 'styled-components';
import AuthApis from '../../api/AuthApis';

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {

  const [edited, setEdited] = useState(selectedData);
  
  const onCancel = () => {
    handleCancel();
  }

  const onEditChange = (e) => {
    setEdited({
      ...edited,
      [e.target.name]: e.target.value
    })
  }

  const onSubmitEdit = (e) => {
    e.preventDefault();
    handleEditSubmit(edited);
    my_page(edited);
  }

  const { id, name, pw, email, phone, address } = edited;

  const my_page = async (edited) => {
    try {
      const response = await AuthApis.postProfileEdit({ id, name, pw, email, phone, address });
      console.log('postProfileEdit값', response);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Div>
    <Section>
      <Header>
        <Title>정보 수정</Title>
      </Header>
      <Form onSubmit={onSubmitEdit}>
        <Input
          type="text"
          name="userid"
          placeholder="아이디"
          value={edited.id}
          readOnly />
        <Input
          type="text"
          name="name"
          placeholder="이름"
          value={edited.name}
          onChange={onEditChange}  />
        <Input
          type="password"
          name="pw"
          placeholder="비밀번호"
          onChange={onEditChange} />
        <Input
          type="text"
          name="email"
          placeholder="이메일"
          value={edited.email}
          onChange={onEditChange}  />
        <Input
          type="text"
          name="phone"
          placeholder="전화번호"
          value={edited.phone}
          onChange={onEditChange} />
        <Input
          type="text"
          name="address"
          placeholder="주소"
          value={edited.address}
          readOnly />
      <Footer>
        <Button1 type='submit'>수정</Button1>
        <Button2 onClick={onCancel}>취소</Button2>
      </Footer>
      </Form>
    </Section>
    </Div>
    </>
  );
};
  
export default Modal;

const Div = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Section = styled.section`
  position: absolute;
  width: 50%;
  left: 25%;
  top: 15%;
  border: solid 1px #DEDEDE;
  border-radius: 0.3rem;
  background-color: #FFFFFF;
  animation: modal-show 0.3s;
`;
const Header = styled.header`
  max-width: 700px;
  margin: auto;
  padding: 1rem 1.5rem;
  border-bottom: solid 1px #DEDEDE;
`;

const Title = styled.span`
  font-size: 28px;
  padding-left: 4.5rem;
  font-weight: bold;
`;

const Form = styled.form`
  max-width: 700px;
  margin: auto;
`;

const Input = styled.input`
  margin: 0.9rem 6rem;
  padding: 0.5rem;
  width: 70%;
  text-aline: center;
  border-radius: 5px;
  border: solid 1px #DEDEDE;
`;

const Footer = styled.footer`
  max-width: 700px;
  margin: auto;
  padding: 1rem 6rem;
  border-top: solid 1px #DEDEDE;
`;

const Button1 = styled.button`
  width: 100px;
  border-radius: 5px;
  border: none;
  box-sizing: border-box;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  text-align: center;
  height: 40px;
  background-color: #008BEE;
  color: #ffffff;

  &:hover{
    opacity: 0.5;
  }
`;

const Button2 = styled.button`
  width: 100px;
  border-radius: 5px;
  border: solid 1px #666666;
  box-sizing: border-box;
  text-decoration: none;
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  text-align: center;
  height: 40px;
  margin: 0px 10px;
  background-color: #ffffff;
  color: #333333;

  &:hover{
    opacity: 0.5;
  }
`;
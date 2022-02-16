import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthApis from '../../api/AuthApis';
import Modal from '../../components/modal/ProfileModalPage';

const ProfileData = ({ userId, onLogout, isLogon, userInfo }) => {
  // const {id} = userId;
  const navigator = useNavigate();

  const [userEditData, setUserEditData] = useState(userInfo);
  const [selected, setSelected] = useState('');
  const [modalOn, setModalOn] = useState(false);
  const [updateDate, setUpdateDate] = useState(false);

  const handleSave = (edited) => {
    const userEditData = {
      id: edited.id,
      name: edited.name,
      pw: edited.pw,
      email: edited.email,
      phone: edited.phone,
      address: edited.address,
    };
    setUserEditData(userEditData);
    console.log(userEditData);
  };

  const handleRemove = () => {
    if (window.confirm('정말 탈퇴하십니까?')) {
      alert('삭제 됩니다');
      userRemoveData(userEditData);
      navigator('/');
      //onLogout(isLogon)
    } else {
      alert('취소합니다.');
    }
  };

  const { id, name, pw, email, phone } = userEditData;

  const userRemoveData = async (userEditData) => {
    try {
      const response = await AuthApis.postProfileRemove({ id });
      console.log('postProfileRemove값', response);
      await AuthApis.postLogout(response.data.isLogon);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setModalOn(true);

    const selectedData = {
      id: userInfo.id,
      name: userInfo.name,
      pw: userInfo.pw,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
    };

    setSelected(selectedData);
  };

  const handleCancel = () => {
    setModalOn(false);
  };

  const handleEditSubmit = (edited) => {
    console.log('edit', edited);
    handleSave(edited);
    setModalOn(false);
    setUpdateDate(true);
  };

  return (
    <>
      <TableSheet>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>NAME</TableHeader>
            <TableHeader>EMAIL</TableHeader>
            <TableHeader>PHONE</TableHeader>
            <TableHeader>ADDRESS</TableHeader>
            <TableHeader>EDIT</TableHeader>
            <TableHeader>DELETE</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {updateDate ? (
              <>
                <TableData>{userEditData.id}</TableData>
                <TableData>{userEditData.name}</TableData>
                <TableData>{userEditData.email}</TableData>
                <TableData>{userEditData.phone}</TableData>
                <TableData>{userEditData.address}</TableData>
              </>
            ) : (
              <>
                <TableData>{userInfo.id}</TableData>
                <TableData>{userInfo.name}</TableData>
                <TableData>{userInfo.email}</TableData>
                <TableData>{userInfo.phone}</TableData>
                <TableData>{userInfo.address}</TableData>
              </>
            )}
            <TableData onClick={handleEdit}>수정하기</TableData>
            <TableData onClick={handleRemove}>탈퇴하기</TableData>
          </TableRow>
        </TableBody>
      </TableSheet>
      {modalOn && (
        <Modal
          selectedData={selected}
          handleCancel={handleCancel}
          handleEditSubmit={handleEditSubmit}
          userId={userId}
        />
      )}
    </>
  );
};

export default ProfileData;

const TableSheet = styled.table`
  width: 1000px;
  margin: auto;
  margin-bottom: 2.5rem;
`;

const TableHead = styled.thead`
  font-size: 15px;
  color: #333333;
  border: 1px solid #666666;
`;

const TableHeader = styled.th`
  border: 1px solid #666666;
  padding: 3px 5px;
`;

const TableBody = styled.tbody`
  font-size: 14px;
  color: #333333;
`;

const TableRow = styled.tr`
  border: 1px solid #666666;
`;

const TableData = styled.td`
  border: 1px solid #666666;
  padding: 3px 5px;
  font-size: 14px;
  color: #333333;
`;

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthApis from '../../api/AuthApis';
import LoginPage from '../LoginPage';
import SignUpPage from '../signUpPage/SignUpPage';
import MyPage from './MyPage';
import MyPageRoutes from './mypage_menu/MyPageRoutes';

function MemberRoutes({ userInfo, userInfoHandler }) {
  const [wishData, setWishData] = useState('');

  const onWishId = async (userId) => {
    try {
      const response = await AuthApis.postWishId(userId);
      console.log('whisResponse값', response);
      wishHandler(response);
    } catch (error) {
      console.log(error);
    }
  };

  const wishHandler = (response) => {
    setWishData(response.data.map((item) => item));
  };

  const [orderList, setOrderList] = useState({
    buylist: '',
    selllist: '',
  });

  const onOrderId = async (userId) => {
    try {
      const response = await AuthApis.postOrderId(userId);
      console.log('orderlistResponse값', response);
      orderHandler(response);
    } catch (error) {
      console.log(error);
    }
  };

  const orderHandler = (response) => {
    setOrderList({
      buylist: response.data.buylist,
      selllist: response.data.selllist,
    });
  };

  return (
    <>
      <Routes>
        <Route
          path={'/my_page'}
          element={
            <MyPage
              userInfo={userInfo}
              onWishId={onWishId}
              onOrderId={onOrderId}
            />
          }
        />
        <Route
          path={'/my_page/*'}
          element={<MyPageRoutes wishData={wishData} orderList={orderList} />}
        />
        <Route
          path={'/login'}
          element={
            <LoginPage userInfo={userInfo} userInfoHandler={userInfoHandler} />
          }
        />
        <Route path={'/sign_up'} element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default MemberRoutes;

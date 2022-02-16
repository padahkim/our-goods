import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../../elements';
import styles from './myPage.module.css';
import styled from 'styled-components';
import ProfileData from './ProfileData';
import wish_list from '../../images/wish_list.svg';
import chat_list from '../../images/chat_list.svg';
import order_list from '../../images/order_list.svg';

const MyPage = ({ userInfo, onWishId, onOrderId }) => {
  const { userId } = userInfo;

  return (
    <div className={styles.container}>
      <Grid is_end width="1024px" margin="auto">
        <Link
          to="wish_list"
          className={styles.link}
          onClick={() => {
            onWishId(userId);
          }}
        >
          <Menu>
            <img
              style={{ display: 'block', margin: 'auto' }}
              src={wish_list}
              alt="관심 상품 리스트"
            />
            <P>위시리스트</P>
          </Menu>
        </Link>
        <Link to="chat_list" className={styles.link}>
          <Menu>
            <img
              style={{ display: 'block', margin: 'auto' }}
              src={chat_list}
              alt="채팅 목록"
            />
            <P>채팅</P>
          </Menu>
        </Link>
        <Link
          to="order_list"
          className={styles.link}
          onClick={() => {
            onOrderId(userId);
          }}
        >
          <Menu>
            <img
              style={{ display: 'block', margin: 'auto' }}
              src={order_list}
              alt="판매, 구매 목록"
            />
            <P>거래리스트</P>
          </Menu>
        </Link>
      </Grid>
      <Grid width="1024px" margin="auto">
        <Grid>
          <Span>나의 정보</Span>
          <ProfileData userId={userId} userInfo={userInfo}></ProfileData>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyPage;

const Menu = styled.div`
  &:hover {
    background-color: #d3d3d3;
    border-radius: 5px;
  }
`;

const P = styled.p`
  color: #333333;
  font-size: 10px;
  text-align: center;
  width: 50px;
  margin: auto;
`;

const Span = styled.span`
  padding: 0 12px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;

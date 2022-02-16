import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '../elements';

import styled from 'styled-components';
import styles from './css/Footer.module.css';

function Footer({ userInfo, onMyId }) {
  const { userId } = userInfo;

  const onLinkClick = (e) => {
    e.preventDefault();
    alert('로그인을 하셔야 본 서비스를 이용하실 수 있습니다.');
  };

  return (
    <div className={styles.container}>
      <Grid is_flex width="1024px" height="170px" margin="auto">
        <Grid>
          Menu
          <Link to="/" className={styles.link}>
            <Menu>Home</Menu>
          </Link>
          <Link to="/post" className={styles.link}>
            <Menu>Post</Menu>
          </Link>
          <>
            {userId ? (
              <Link
                to={`/member/my_page`}
                className={styles.link}
                onClick={() => {
                  onMyId(userId);
                }}
              >
                <Menu>MyPage</Menu>
              </Link>
            ) : (
              <Link to={`/`} className={styles.link} onClick={onLinkClick}>
                <Menu>MyPage</Menu>
              </Link>
            )}
          </>
        </Grid>
        <Grid>
          Contanct us
          <P>김동현 | d_k067@student.usc.edu.au</P>
          <P>김바다 | padahkim@gmail.com</P>
          <P>박혜경 | hyekyoung1996@gmail.com</P>
          <P>송지영 | songjjyy@naver.com</P>
          <P>이현수 | zxzc9712@gmail.com</P>
          <P>전정인 | wjddls1702@naver.com</P>
        </Grid>
        <Grid>
          Text
          <P>멀티캠퍼스(Multicampus)</P>
          <P>지능형 웹서비스 풀스택 1기</P>
          <P>2022.01.21~2022.02.15</P>
          <P>웹서비스 세미프로젝트입니다.</P>
        </Grid>
      </Grid>
    </div>
  );
}
export default Footer;

const Menu = styled.div`
  padding-top: 5px;
  color: #333333;
  font-size: 14px;
`;

const P = styled.div`
  padding-top: 5px;
  color: #333333;
  font-size: 13px;
`;

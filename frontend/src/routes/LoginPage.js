import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import AuthApis from '../api/AuthApis';

const LoginPage = ({ userInfoHandler }) => {
  const [userLoginInput, setUserLoginInput] = useState({
    id: '',
    password: '',
  });
  const [loginFail, setLoginFail] = useState(null);

  const { userIdInput, password } = userLoginInput;
  const navigator = useNavigate();

  const login = async (userLoginInput) => {
    try {
      const response = await AuthApis.postLogin({ userIdInput, password });
      console.log('postLoginResponse값', response);
      if (response.data.isLogon) {
        userInfoHandler(response);
        navigator('/');
      } else {
        setLoginFail(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginInput = (event) => {
    setUserLoginInput((prevState) => {
      return {
        ...prevState,
        //computed property names
        [event.target.name]: event.target.value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    login(userLoginInput);
  };

  return (
    <div className={styles.login}>
      <h3>로그인</h3>
      <form onSubmit={onSubmit}>
        <div className={styles.flex}>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>아이디</li>
            <input
              autoFocus
              name="userIdInput"
              placeholder="아이디를 입력하세요."
              onChange={handleLoginInput}
            />
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>비밀번호</li>
            <input
              type="text"
              name="password"
              placeholder="비밀번호를 입력하세요."
              autoComplete="username"
              onChange={handleLoginInput}
            />
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}>
              <button className={styles.submit} type="submit">
                로그인
              </button>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.item}></li>
            <li className={`${styles.item} ${styles.link}`}>
              <Link className={styles.link} to="/member/sign_up">
                회원가입
              </Link>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={styles.item}></li>
            <li className={`${styles.item} ${styles.link}`}>
              {loginFail && (
                <span className={styles.span}>
                  이메일 또는 비밀번호를 다시 확인하세요. 등록되지 않은
                  이메일이거나, 이메일 또는 비밀번호를 잘못 입력하셨습니다.
                </span>
              )}
            </li>
            <li className={styles.item}></li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

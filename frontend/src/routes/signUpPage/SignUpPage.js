import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.css';
import AuthApis from '../../api/AuthApis';
import DaumPostHook from './DaumPostHook';

const SignUpPage = () => {
  const [userRegInfo, setUserRegInfo] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    zonecode: '',
    address: '',
    detailAddress: '',
  });
  const [userRegAuthInfo, setUserRegAuthInfo] = useState({
    usableId: false,
    usableEmail: false,
    usablePassword: false,
    emailAuthNumber: '',
  });
  const [checkPassword, setCheckPassword] =
    useState('비밀번호 중복확인을 해주세요');
  const [userEmailAuthInput, setUserEmailAuthInput] = useState('');
  const [defaultRender, setDefaultRender] = useState({
    inputId: false,
    inputEmail: false,
  });
  useEffect(() => {
    passwordCheck();
  }, [userRegInfo]);

  const navigator = useNavigate();

  const { usableId, usableEmail, usablePassword } = userRegAuthInfo;
  const { inputId, inputEmail } = defaultRender;
  const { id, password, name, email, phone, zonecode, address, detailAddress } =
    userRegInfo;

  const handleInput = (event) => {
    setUserRegInfo((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddressData = (data) => {
    setUserRegInfo((prevState) => ({
      ...prevState,
      zonecode: data.zonecode,
    }));
    setUserRegInfo((prevState) => ({
      ...prevState,
      address: data.address,
    }));
  };

  const passwordCheck = () => {
    const { password, passwordConfirm } = userRegInfo;
    if (password.length < 1 || passwordConfirm < 1) {
      setCheckPassword('비밀번호 중복확인을 해주세요');
    } else if (password === passwordConfirm) {
      setCheckPassword('비밀번호 일치✅');
      setUserRegAuthInfo((prevState) => {
        return {
          ...prevState,
          usablePassword: true,
        };
      });
    } else {
      setCheckPassword('비밀번호 불일치❌');
    }
  };

  const idCheck = async () => {
    try {
      const response = await AuthApis.idCheck(id);
      ///console.log(response.data)///////////////////////response값 String
      setDefaultRender((prevState) => {
        return { ...prevState, inputId: true };
      });
      if (response.data === 'success') {
        setUserRegAuthInfo((prevState) => {
          return {
            ...prevState,
            usableId: true,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkEmail = async () => {
    // const { email } = userRegInfo;
    try {
      const response = await AuthApis.emailCheck(email);
      if (response.data) {
        console.log('이메일인증번호서버리턴값', response.data);
        setUserRegAuthInfo((prevState) => {
          return { ...prevState, emailAuthNumber: response.data };
        });
        /////response.data: string값으로 숫자4개, emailAuthNumberCheck()으로
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailAuthInput = (event) => {
    setUserEmailAuthInput(event.target.value);
  };

  const emailAuthNumberCheck = (emailAuthNumber) => {
    const emailAuthNumberString = `${emailAuthNumber}`;
    setDefaultRender((prevState) => {
      return { ...prevState, inputEmail: true };
    });
    if (emailAuthNumberString === userEmailAuthInput) {
      setUserRegAuthInfo((prevState) => {
        return { ...prevState, usableEmail: true };
      });
    }
  };

  const handleEmailAuthNumber = () => {
    const { emailAuthNumber } = userRegAuthInfo;
    emailAuthNumberCheck(emailAuthNumber);
  };

  const register = async (event) => {
    event.preventDefault();
    console.log(userRegInfo);

    if (!usableId) {
    } else if (!usableEmail) {
    } else if (!usablePassword) {
    } else if (
      !id ||
      !password ||
      !name ||
      !email ||
      !phone ||
      !detailAddress
    ) {
    } else {
      try {
        const response = await AuthApis.postRegister(userRegInfo);
        console.log('회원가입response', response); //여기 리스폰스값체크필요// 리스폰스 없이 진행하기로함
        navigator('/member/login');
        if (response.data) {
          navigator('/member/login');
        } else {
          /////////리스폰스값에따라 처리
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.register}>
      <h3>회원가입</h3>
      <form onSubmit={register}>
        <div className={styles.flex}>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>이름</li>
            <li className={styles.item}>
              <input
                autoFocus
                name="name"
                placeholder="이름을 입력하세요."
                onChange={handleInput}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>아이디</li>
            <li className={styles.item}>
              <input
                type="text"
                name="id"
                placeholder="아이디를 입력하세요."
                autoComplete="username"
                onChange={handleInput}
              />
            </li>
            <li className={styles.item}>
              <button className={styles.check} onClick={idCheck} type="button">
                중복확인
              </button>
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}>
              {inputId ? (
                usableId ? (
                  <span>사용하실수 있는 아이디입니다✅</span>
                ) : (
                  <span>중복된 아이디 입니다❌</span>
                )
              ) : (
                <span>아이디 중복 확인을 해주세요</span>
              )}
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>비밀번호</li>
            <li className={styles.item}>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                onChange={handleInput}
                name="password"
                autoComplete="new-password"
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>비밀번호 확인</li>
            <li className={styles.item}>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                name="passwordConfirm"
                autoComplete="new-password"
                onChange={handleInput}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}>
              <span>비밀번호확인: {checkPassword}</span>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>이메일</li>
            <li className={styles.item}>
              <input
                type="email"
                placeholder="이메일을 입력하세요."
                onChange={handleInput}
                name="email"
              />
            </li>
            <li className={styles.item}>
              <button
                className={styles.check}
                onClick={checkEmail}
                type="button"
              >
                인증번호전송
              </button>
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>인증번호확인</li>
            <li className={styles.item}>
              <input
                type="text"
                placeholder="이메일로 온 인증번호를 입력하세요."
                onChange={handleEmailAuthInput}
              />
            </li>
            <li className={styles.item}>
              <button
                className={styles.check}
                onClick={handleEmailAuthNumber}
                type="button"
              >
                인증번호확인
              </button>
            </li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}>
              {inputEmail ? (
                usableEmail ? (
                  <span>이메일 인증이 완료 되었습니다✅</span>
                ) : (
                  <span>인증 번호가 올바르지 않습니다❌</span>
                )
              ) : (
                <span>이메일 인증을 해주세요</span>
              )}
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>전화번호</li>
            <li className={styles.item}>
              <input
                type="text"
                placeholder="전화번호를 입력하세요."
                name="phone"
                onChange={handleInput}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}>주소</li>
            <li className={styles.item}>
              <DaumPostHook
                handleAddressInput={handleInput}
                handleAddressData={handleAddressData}
                zonecode={zonecode}
                address={address}
              />
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}>
              <button className={styles.submit} type="submit">
                가입하기
              </button>
            </li>
            <li className={styles.item}></li>
          </ul>
          <ul className={styles.container}>
            <li className={`${styles.item} ${styles.center}`}></li>
            <li className={styles.item}>
              {(!id ||
                !password ||
                !name ||
                !email ||
                !phone ||
                !zonecode ||
                !detailAddress) && <span>❌모든 항목을 작성해주세요</span>}
            </li>
            <li className={styles.item}></li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;

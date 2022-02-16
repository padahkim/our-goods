import AxiosInstance from './AxiosInstance';

const AuthApis = {
  postLogout(isLogon) {
    return AxiosInstance({
      url: '/member/logout',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { isLogon },
    });
  },

  postMyId(id) {
    return AxiosInstance({
      url: 'my_page',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {id},
    });
  },
  postWishId(id) {
    return AxiosInstance({
      url: 'wish_list',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {id},
    });
  },
  postOrderId(id) {
    return AxiosInstance({
      url: 'order_list',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {id},
    });
  },

  // 하단axiosInstance안에 있는 url들은 member/*라우터 안에있으므로 기본값으로 url앞에 froxy/member/가 붙어있으므로생략
  postLogin(userLoginInput) {
    const { userIdInput, password } = userLoginInput;

    console.log('postLogin값', userLoginInput);

    return AxiosInstance({
      url: 'login',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { id: userIdInput, pw: password },
    });
  },

  postRegister(userRegInfo) {
    const {
      id,
      password,
      name,
      email,
      phone,
      zonecode,
      address,
      detailAddress,
    } = userRegInfo;

    console.log('postRegister값', userRegInfo);

    return AxiosInstance({
      //post
      url: 'addMembers',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        id,
        pw: password,
        name,
        email,
        phone,
        zonecode: zonecode,
        address: address,
        detailAddress: detailAddress,
      },
    });
  },
  idCheck(id) {
    console.log('postIdCheck값', id);

    return AxiosInstance({
      //post idCheck값 req는 항상 success오도록 backendTest/server.js서버설정중
      url: 'memberIdCheck',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        id: id,
      },
    });
  },
  //
  emailCheck(email) {
    console.log('getEmailParams값', email);

    return AxiosInstance({
      url: 'mailCheck',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        email: email,
      },
    });
  },
  postProfileEdit(edited) {
    const {id, name, pw, email, phone, address } = edited;

    console.log('postEdit값', edited);

    return AxiosInstance({
      url: 'my_page/modInfo.do',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { 
        id: id,
        name: name,
        pw: pw,
        email: email,
        phone: phone,
        address: address, },
    });
  },
  postProfileRemove(userEditData) {
    const {id, name, pw, email, phone} = userEditData;

    console.log('postRemove값', userEditData);

    return AxiosInstance({
      url: '/member/my_page/removeUser.do',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { 
        id: id,
        name: name,
        pw: pw,
        email: email,
        phone: phone, },
    });
  },

  postChatContent(userData) {
    const { content, username } = userData;

    console.log('postChatContent값', userData);

    return AxiosInstance({
      url: 'postlist',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { 
        content: content,
        username: username
      },
    });
  },
  postSearch(searchInput) {
    const { keyword } = searchInput;

    console.log('postSearchParam값', searchInput);

    return AxiosInstance({
      url: 'search.do',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        keyword: keyword,
      },
    });
  },
};

export default AuthApis;

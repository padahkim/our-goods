import AxiosInstance from './AxiosInstance';

//(post)id를 pcode로 넘겨줘야함
const PostsApis = {
  getPostList() {
    return AxiosInstance({
      url: '/post',
      method: 'get',
    });
  },

  getOnePost(id) {
    const pcode = id;
    return AxiosInstance({
      url: '/post/' + pcode,
      method: 'get',
    });
  },

  writePost(post) {
    const {
      title,
      content,
      userId,
      price,
      imageUrl,
      imageName,
      zonecode,
      isSoldOut,
    } = post;

    return AxiosInstance({
      url: '/post',
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        ptitle: title,
        pcontent: content,
        userid: userId,
        price,
        imageUrl,
        imageName,
        zonecode,
        isSoldOut,
      },
    });
  },

  deleteOnePost(id) {
    const pcode = id;
    return AxiosInstance({
      url: '/post/' + pcode,
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      },
      data: { pcode },
    });
  },

  // postUpdate(postData) {
  //   const { post, id } = postData;
  //   return AxiosInstance({
  //     url: '/post/' + id,
  //     method: 'put',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     data: post,
  //   });
  // },
};

export default PostsApis;

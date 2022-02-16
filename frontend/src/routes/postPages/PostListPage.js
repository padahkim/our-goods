import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PostItem from '../../components/PostItem';
import PostsApis from '../../api/PostsApis';
import { Grid } from '../../elements';

const H1 = styled.h1`
  text-align: center;
  margin: 1rem;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(25rem, auto);
`;

const PostListPage = ({ userAuth }) => {
  const [posts, setPosts] = useState([]);
  const { isLogon } = userAuth;

  useEffect(() => {
    readPostLIsts();
  }, []);

  const readPostLIsts = async () => {
    try {
      const response = await PostsApis.getPostList();
      if (response.status === 200) {
        console.log(response.data);
        setPosts(response.data);
      } else {
        alert(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid width="1024px" margin="1rem auto">
    <div>
      {isLogon && (
        <Link
          to="/writepost"
          className="navbar-brand"
          style={{ color: 'black' }}
        >
          글쓰기
        </Link>
      )}
      <H1>굿즈 리스트</H1>
      <section>
        <Container>
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </Container>
      </section>
    </div>
    </Grid>
  );
};

export default PostListPage;

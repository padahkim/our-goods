import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PostListPage from './postPages/PostListPage';

const PostRoutes = ({ userAuth, userInfo }) => {
  return (
    <Routes>
      <Route path={'/list'} element={<PostListPage userAuth={userAuth} />} />
    </Routes>
  );
};

export default PostRoutes;

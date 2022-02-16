import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  display: flex;
  justify-content: flex-end;
`;

const PostHeader = () => {
  return (
    <nav>
      <Ul>
        <li>
          <Link
            to="/postlist"
            className="navbar-brand"
            style={{ color: 'black' }}
          >
            글목록
          </Link>
        </li>
        <li>
          <Link
            to="/writepost"
            className="navbar-brand"
            style={{ color: 'black', margin: 0 }}
          >
            글쓰기
          </Link>
        </li>
      </Ul>
    </nav>
  );
};

export default PostHeader;

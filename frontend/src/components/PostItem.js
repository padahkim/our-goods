import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './PostItem.module.css';

const PostItem = ({ post }) => {
  const { id, imageUrl } = post;
  return (
    <Card className={styles.section}>
      <Card.Body className={styles.container}>
        <Link to={'/post/' + id} style={{ backGround: 'white' }}>
          <img
            className={styles.img}
            src={imageUrl}
            alt="상품 이미지가 없는 포스트입니다"
          ></img>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default PostItem;

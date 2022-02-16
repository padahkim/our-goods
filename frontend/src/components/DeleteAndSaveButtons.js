import React from 'react';
import Button from './common/Button';

const DeleteAndSaveButtons = ({ onDeleteFile }) => {
  return (
    <>
      <Button type="button" onClick={onDeleteFile}>
        사진삭제
      </Button>
      <br></br>
      <Button type="submit" variant="primary">
        저장하기
      </Button>
    </>
  );
};

export default DeleteAndSaveButtons;

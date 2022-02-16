import React, { useRef, useState } from 'react';
import Button from '../components/common/Button';
import styled from 'styled-components';

const StyledInput = styled.input`
  display: none;
`;
const StyledLoading = styled.div`
  width: 2em;
  height: 2em;
  margin-left: 2rem;
  border-radius: 50%;
  border: 3px solid pink;
  border-top: 3px solid yellow;
  animation: spin linear infinite 2s;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ImageFileInput = ({ imageUploader, onLoadFile, onFileChange }) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (event) => {
    try {
      setLoading(true);
      const uploaded = await imageUploader.upload(event.target.files[0]);
      onLoadFile(event);
      setLoading(false);
      onFileChange({
        name: uploaded.original_filename,
        url: uploaded.url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <StyledInput
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      {!loading && <Button onClick={onButtonClick}>사진등록</Button>}
      {loading && <StyledLoading></StyledLoading>}
    </div>
  );
};

export default ImageFileInput;

import React, { useRef } from 'react';
import ReactDaumPost from 'react-daumpost-hook';

const DaumPostHook = ({
  handleAddressInput,
  handleAddressData,
  address,
  zonecode,
}) => {
  const ref = useRef(null);
  const postConfig = {
    onComplete: (data) => {
      handleAddressData(data);
    },
  };
  const postCode = ReactDaumPost(postConfig);
  return (
    <main>
      <input
        placeholder="우편번호를 입력하세요"
        name="zonecode"
        type="text"
        onClick={postCode}
        value={zonecode}
        onChange={handleAddressInput}
      />
      <input
        value={address}
        name="address"
        onChange={handleAddressInput}
      ></input>
      <input
        type="text"
        placeholder="상세주소를 입력하세요."
        name="detailAddress"
        onChange={handleAddressInput}
      />
    </main>
  );
};
export default DaumPostHook;

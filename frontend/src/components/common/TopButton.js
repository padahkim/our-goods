import React, {useState} from 'react';
import styled from "styled-components";
import top_button from "../../images/top_button.png"

function TopButton(){
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
	const scrolled = document.documentElement.scrollTop;
    scrolled > 70 ? setVisible(true) :setVisible(false);
  };

  const scrollToTop = () =>{
	  window.scrollTo({
	  top: 0,
	  behavior: 'smooth'
	  });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
	<Button onClick={scrollToTop} style={{display: visible ? 'inline' : 'none'}} />
  );
}

export default TopButton;

const Button = styled.div`
  position: fixed; 
  width: 100%;
  left: 92%;
  bottom: 10px;
  height: 85px;
  cursor: pointer;
  background-size: 85px 85px;
  background-image: url(${top_button});
  background-repeat: no-repeat;
  z-index: 1;
`
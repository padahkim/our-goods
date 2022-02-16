import { Grid } from "../../elements";
import styled from "styled-components";
import banner2 from "../../images/banner2.png";

function Banner2(){
  return (
    <>
      <div style={{
        padding: "3rem 0",
        backgroundColor: "#FFFFFF",
      }}>
      <Grid width="1024px" margin="auto">
        <Image1></Image1>
      </Grid>
      </div>
    </>
  );
}

export default Banner2;

const Image1 = styled.div`
  height: 600px;
  background-image: url(${banner2});
  background-size: 1024px 628px;
`;
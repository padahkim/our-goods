import { Grid } from "../../elements";
import styled from "styled-components";
import banner1 from "../../images/banner1.png";

function Banner1(){
  return (
    <>
      <div style={{
        padding: "3rem 0",
        backgroundColor: "#FBF7F3",
      }}>
      <Grid width="1024px" margin="auto">
        <Image1></Image1>
      </Grid>
      </div>
    </>
  );
}

export default Banner1;

const Image1 = styled.div`
  height: 600px;
  background-image: url(${banner1});
  background-size: 1024px 628px;
`;


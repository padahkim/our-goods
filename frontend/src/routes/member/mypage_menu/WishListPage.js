import React from "react";
import styled from "styled-components";
import { Grid } from "../../../elements";
import styles from "../myPage.module.css";


const WishListPage = ({wishData}) => {
  
  console.log(wishData);
  console.log(JSON.stringify(wishData));

  return (
    <div>
    {wishData !== '' ?
    <div className={styles.container}>
    <Grid width="1024px" margin="auto">
      <Span>관심 목록</Span>
      <TableSheet >
        <TableHead>
          <TableRow>
            <TableHeader>USERCODE</TableHeader>
            <TableHeader>POSTCODE</TableHeader>
            <TableHeader>POSTTITLE</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>{wishData.map(item => 
          <TableRow key={item.ptitle}>
            <TableData>{item.wucode}</TableData>
            <TableData>{item.wpcode}</TableData>
            <TableData>{item.ptitle}</TableData>
          </TableRow>
        )}
        </TableBody>
      </TableSheet>
      </Grid>
    </div>
     :
     null }
     
    </div>
  );
};

export default WishListPage;

const TableSheet = styled.table`
  width: 1000px;
  margin: auto;
  margin-bottom: 2.5rem;
`;

const TableHead = styled.thead`
  font-size: 15px;
  color: #333333;
  border: 1px solid #666666;
`;

const TableHeader = styled.th`
  border: 1px solid #666666;
  padding: 3px 5px;
`;

const TableBody = styled.tbody`
  font-size: 14px;
  color: #333333;
`;

const TableRow = styled.tr`
  border: 1px solid #666666;
`;

const TableData = styled.td`
  border: 1px solid #666666;
  padding: 3px 5px;
`;


const Span = styled.span`
  padding: 0 12px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;

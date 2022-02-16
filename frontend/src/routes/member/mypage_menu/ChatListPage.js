import React from "react";
import { Grid } from "../../../elements";
import styles from "../myPage.module.css";
import styled from "styled-components";

const ChatListPage = () => {
  return (
    <div className={styles.container}>
      <Grid width="1024px" margin="auto">
      <TableSheet >
        <TableHead>
          <TableRow>
            <TableHeader>POSTTITLE</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody> 
          <TableRow>
            {/* <TableData>{item.wucode}</TableData>
            <TableData>{item.wpcode}</TableData>
            <TableData>{item.ptitle}</TableData> */}
          </TableRow>
        </TableBody>
      </TableSheet>
      </Grid>
    </div>
  );
};

export default ChatListPage;

const TableSheet = styled.table`
  width: 1000px;
  margin: 5rem auto;
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


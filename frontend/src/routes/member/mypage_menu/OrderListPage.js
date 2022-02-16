import React from "react";
import styled from "styled-components";
import styles from "../myPage.module.css";
import { Grid } from "../../../elements";

const OrderListPage = ({orderList}) => {
  console.log(orderList);

  const sell = JSON.parse(JSON.stringify(orderList.selllist));
  const buy = JSON.parse(JSON.stringify(orderList.buylist));

  return (
    <div>
    {orderList.selllist !== '' && orderList.buylist!=='' ? 
    <>
    <div className={styles.container}>
      <Grid width="1024px" margin="1rem auto">
          <Span>판매 리스트</Span>
          <TableSheet>
            <TableHead>
              <TableRow>
                <TableHeader>PostCode</TableHeader>
                <TableHeader>PostTitle</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>{sell.map(item => <TableRow key={item.ptitle}>
              <TableData>{item.pcode}</TableData>
              <TableData>{item.ptitle}</TableData>
            </TableRow>
            )}
            </TableBody>
          </TableSheet>
        </Grid><Grid width="1024px" margin="auto">
            <Span>구매 리스트</Span>
            <TableSheet>
              <TableHead>
                <TableRow>
                  <TableHeader>PostTitle</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>{buy.map(item => <TableRow key={item.ptitle}>
                <TableData>{item.ptitle}</TableData>
              </TableRow>
              )}
              </TableBody>
            </TableSheet>
          </Grid>
          </div>
          </>
      : null}
    </div>
  );
};

export default OrderListPage;

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

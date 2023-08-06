import { useContext } from "react";

import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";
import {selectedrow} from "../../context/context";

const List = ({results,selectedcurrency}) => {
  const {possibleOrder}=useContext(selectedrow);
  let ordercheck=(id)=>{
    let data=results.find(item=>item["&id"]=id);
    return JSON.stringify(data.timestamps.orderSubmitted);
  }
  let currencycheck=(row)=>{
    let index=Object.keys(row).indexOf(selectedcurrency);
    const currvalue=Object.values(row)[index];
    return currvalue;
  }
  return (
    <table className={styles.container}>
      <thead>
        <ListHeader >
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          <ListHeaderCell>Order Volume / USD</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {possibleOrder.map((row) => (
          <ListRow row={row} result={results}>
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{ordercheck(row["&id"])}</ListRowCell>
            <ListRowCell>{currencycheck(row.bestExecutionData.orderVolume)}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;

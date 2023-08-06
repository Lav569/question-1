import { useContext } from "react";
import styles from "./ListRow.module.css";
import {selectedrow} from "../../context/context";
const ListCell = ({ children,row,result}) => {
  const {setSelectedOrderDetails}=useContext(selectedrow);
  const {setSelectedOrderTimeStamps}=useContext(selectedrow);
  const {setDirection}=useContext(selectedrow);
  return <tr className={styles.cell} 
  onClick={()=>{
    setSelectedOrderDetails(row.executionDetails);
    let data=result.find(item=>item["&id"]=row["&id"]);
    setSelectedOrderTimeStamps(data.timestamps);
    setDirection('row');
  }}
  >{children}</tr>;
};

export default ListCell;

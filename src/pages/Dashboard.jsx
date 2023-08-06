import {useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
// Components

import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import {selectedrow} from "../context/context";

// Styles

import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [direction,setDirection]=useState('column');
  let possibleOrder=[];
  if(!searchText){
    possibleOrder=mockData.results;
  }
    if(searchText){
      possibleOrder.length=0;
      mockData.results.forEach((row) =>{
        if(row["&id"].match(searchText.toUpperCase())){
            possibleOrder.push(row); 
        }
      })
    }
  let orders=0;
  for (let i = 0; i < mockData.results.length; i++) {
    if ( mockData.results[i] instanceof Object ) {
        orders++;
    }
  }
  let styelupdate={
    display: 'flex',
    flexDirection: direction,
    gap:"1em",
  }
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle primaryTitle="Orders" secondaryTitle={orders} />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div> 
      <selectedrow.Provider value={{setSelectedOrderDetails,setSelectedOrderTimeStamps,setDirection,possibleOrder}}>
      <div className={styles.content}>
        <div style={styelupdate}>
        <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details" style={{innerWidth:"50%"}}
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>
        <List results={timestamps.results} selectedcurrency={currency}/>
      </div>
      </selectedrow.Provider>
    </div>
  );
};

export default Dashboard;

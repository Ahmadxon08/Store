import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import FilteredItem from "../tab/FilteredItem";
import "./Filtered.scss";

const Filtered = () => {
  const types = ["bag", "medal", "trophies", "jersey"];
  const [activeTab, setActiveTab] = useState("bag");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <section>
      <div className="container">
        <div className="typeHead">
          <h2>Filter by: </h2>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            textColor="secondary"
            sx={{
              width: "100%",
              "& .MuiTabs-indicator": {
                backgroundColor: "#7421b0",
              },
              "& .MuiTab-root": {
                color: "#000000",
              },
              "& .Mui-selected": {
                color: "#7421b0",
              },
            }}>
            {types.map((type, index) => (
              <Tab key={index} label={type} value={type} />
            ))}
          </Tabs>
        </div>
        <div className="typeBody">
          <FilteredItem selectedType={activeTab} />
        </div>
      </div>
    </section>
  );
};

export default Filtered;

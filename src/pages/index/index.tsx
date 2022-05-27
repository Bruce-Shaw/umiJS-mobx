import React, { useState } from "react";
import { observer } from "mobx-react";
import { Table } from "antd";
import TabCatalog from "@/components/TabCatalog";
import styles from "./style.less";

const IndexPage: React.FC = observer(() => {
  const [currentTab, setCurrentTab] = useState<string>("index#1");
  const tabs = [
    { name: "测试", id: "index#1" },
    { name: "测试2", id: "index#2" },
    { name: "测试3", id: "index#3" },
  ];
  return (
    <div className={styles.container}>
      <TabCatalog
        list={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className={styles.content1} id="index#1" />
      <div className={styles.content2} id="index#2" />
      <div className={styles.content3} id="index#3" />
    </div>
  );
});

export default IndexPage;

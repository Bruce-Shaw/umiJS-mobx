import React from "react";
import { observer } from "mobx-react";
import { Button, Spin } from "antd";
import { useStores } from "@/pages/stores";
import styles from "./style.less";

const IndexPage: React.FC = observer(() => {
  const {
    loading: { loading, setLoading },
  } = useStores();

  return (
    <div className={styles.container}>
      <Button onClick={() => setLoading(true, "indexPage")}>Click</Button>
      <div className={styles.title}>
        <Spin spinning={loading.get("indexPage") || false} />
      </div>
    </div>
  );
});

export default IndexPage;

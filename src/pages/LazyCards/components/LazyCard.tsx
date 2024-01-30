import { useEffect } from "react";
import { Card } from "antd";
import styles from "./style.less";

export default (props: any) => {
  const { data } = props;

  useEffect(() => {
    // 此处可以进行异步数据请求
    console.log(data.name);
    setTimeout(() => {
      const dom = document.getElementById(data.id);
      if (dom) {
        dom.style.borderColor = "#4096FF";
      }
    }, 500);
  }, []);

  return (
    <Card key={data.id} className={styles.container} id={data.id}>
      {data.name}
    </Card>
  );
};

import { useEffect, useState } from "react";
import { Row } from "antd";
import LazyCard from "@/pages/LazyCards/components/LazyCard";
import LazyComponent from "@/components/LazyComponent";
import { getDataList } from "@/services/data";

export default () => {
  const [list, setList] = useState<any[]>([]);

  const getList = async () => {
    const result = await getDataList();
    if (result?.data?.pages) {
      setList(result.data.pages || []);
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Row>
      {list.map((item) => (
        <LazyComponent key={item.id} height={192} style={{ width: "2.86rem" }}>
          <LazyCard key={item.id} data={item} />
        </LazyComponent>
      ))}
    </Row>
  );
};

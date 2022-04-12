import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Row,
  Col,
  Input,
  InputNumber,
  Switch,
  Button,
  Table,
  Spin,
} from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useStores } from "@/stores";
import type { TData } from "@/typings/data";
import type { TPageInfo } from "@/typings/request";
import styles from "./style.less";

const Hooks: React.FC = observer(() => {
  const {
    data: { getDataList, dataList, dataPageInfo },
    loading: { loading },
  } = useStores();
  const [tempStr, setTempStr] = useState<string>();
  const [tempNum, setTempNum] = useState<number>();
  const [tempBool, setTempBool] = useState<boolean>();
  const [tempList, setTempList] = useState<TData[]>([]);
  const [tempPageInfo, setTempPageInfo] = useState<TPageInfo>({
    pageSize: 1,
    pageNow: 10,
    totalCount: 0,
  });
  const [tempMap, setTempMap] = useState<Map<number, boolean>>(new Map());

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    if (dataList.length) {
      setTempList(dataList);
      setTempPageInfo(dataPageInfo);
    }
  }, [dataList.length]);

  const columns = [
    {
      title: "id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "options",
      key: "options",
      dataIndex: "options",
      render: (text: any, record: TData) => [
        <RedoOutlined
          key="reload"
          className="link"
          onClick={() => {
            const newMap = new Map();
            newMap.set(record.id, !(tempMap.get(record.id) || false));
            setTempMap(newMap);
          }}
        />,
        tempMap.get(record.id) ? <Spin key="loading" className="ml8" /> : null,
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <Row className="mb16">
        <Col span={8}>
          <span className={styles.label}>字符串修改：</span>
          <Input
            style={{ width: "calc(100% - 0.86rem)" }}
            value={tempStr}
            onChange={(e) => setTempStr(e.target.value)}
          />
        </Col>
        <Col span={16}>
          <span className={styles.label}>数字修改：</span>
          <InputNumber value={tempNum} onChange={(v) => setTempNum(v)} />
          <span className={`${styles.label} ml8`}>布尔值修改：</span>
          <Switch checked={tempBool} onChange={(v) => setTempBool(v)} />
        </Col>
      </Row>
      <div className="mb16">
        <Button
          className="mb16"
          type="primary"
          onClick={() => {
            const newList = tempList.concat([
              { id: tempList.length, name: `新增${tempList.length}` },
            ]);
            setTempList(newList);
            setTempPageInfo({
              ...tempPageInfo,
              totalCount: tempPageInfo.totalCount + 1,
            });
          }}
        >
          列表插入
        </Button>
        <Table
          rowKey="id"
          loading={loading.get("data") || false}
          columns={columns}
          dataSource={tempList}
          pagination={{
            current: tempPageInfo.pageNow,
            pageSize: tempPageInfo.pageSize,
            total: tempPageInfo.totalCount,
            showTotal: (total) => `共 ${total} 条`,
          }}
        />
      </div>
    </div>
  );
});

export default Hooks;

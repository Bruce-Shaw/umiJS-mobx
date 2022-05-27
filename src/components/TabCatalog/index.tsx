import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react";
import { throttle } from "lodash";
import { Tabs } from "antd";
import { scrollAnimation } from "@/utils/utils";
import styles from "./style.less";

const { TabPane } = Tabs;

interface TItem {
  name: string;
  id: string;
}

interface TabCatalogProps {
  list: TItem[];
  currentTab: string;
  setCurrentTab: (v: string) => void;
}

const TabCatalog: React.FC<TabCatalogProps> = observer(
  ({ list = [], currentTab, setCurrentTab }) => {
    const scrollFunc = useCallback(() => {
      const scrollTop =
        (document.documentElement.scrollTop || document.body.scrollTop || 0) +
        60;
      list.forEach((it, idx) => {
        const { offsetTop } = document.getElementById(it.id) as HTMLElement;
        const afterOffsetTop =
          idx < list.length - 1
            ? (document.getElementById(list[idx + 1].id) as HTMLElement)
                .offsetTop
            : 0;
        if (
          (scrollTop < afterOffsetTop || !afterOffsetTop) &&
          scrollTop >= offsetTop
        ) {
          setCurrentTab(it.id);
        }
      });
    }, [list, setCurrentTab]);

    useEffect(() => {
      window.onscroll = throttle(scrollFunc, 50);

      return () => {
        window.onscroll = undefined;
      };
    }, [setCurrentTab, list]);

    const onChange = useCallback((key) => {
      setCurrentTab(key);
      const component = document.getElementById(key);
      if (component) {
        window.onscroll = undefined;
        const top = component.offsetTop - 60;
        scrollAnimation(top, undefined, () => {
          window.onscroll = scrollFunc;
        });
      }
    }, []);

    return (
      <div className={styles.container}>
        <Tabs activeKey={currentTab} onChange={onChange}>
          {list.map((it) => (
            <TabPane tab={it.name} key={it.id} />
          ))}
        </Tabs>
      </div>
    );
  }
);

export default TabCatalog;

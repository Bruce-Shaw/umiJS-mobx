import React, { useEffect, useRef, useState } from "react";
import { addTarget, removeTarget } from "@/utils/intersectionObserver";

type Props = {
  placeHolder?: React.ReactNode; // 占位组件
  height?: Number; // 默认组件高度
  children: React.ReactNode; // 懒加载内容
  onComponentInSight?: () => void; // 组件出现在视野里
  onComponentLazyBegin?: () => void; // 组件被占位渲染
  forceLoad?: boolean; // 强行渲染组件，即使不在视野内
  style?: object; // 样式
  contentStyle?: object; // 内部样式
};

/**
 * 懒加载工具组件
 */
export default React.memo((props: Props) => {
  const {
    placeHolder,
    height = 380,
    children,
    onComponentInSight,
    onComponentLazyBegin,
    forceLoad,
    style = {},
    contentStyle = {},
  } = props;

  // 生成唯一id
  const generateUniqId = () => {
    const random = Math.random().toString(36).substring(2, 9);
    const date = new Date().getTime();
    return random + date;
  };

  const elementId = useRef(generateUniqId());
  const [inSight, setInSight] = useState(false);

  useEffect(() => {
    addTarget({
      id: elementId.current,
      onInsight: () => {
        if (!inSight) {
          setInSight(true);
          if (onComponentInSight) {
            onComponentInSight();
          }
          removeTarget(elementId.current);
        }
      },
    });
    if (onComponentLazyBegin) {
      onComponentLazyBegin();
    }

    return () => {
      removeTarget(elementId.current);
    };
  }, []);

  useEffect(() => {
    if (forceLoad && !inSight) {
      setInSight(true);
      if (onComponentInSight) {
        onComponentInSight();
      }
      removeTarget(elementId.current);
    }
  }, [forceLoad, inSight]);

  const renderPlaceHolder = () => {
    if (placeHolder) {
      return <>{placeHolder}</>;
    }
    return (
      <div
        style={{
          height: `${height}px`,
          backgroundColor: "#fff",
          ...contentStyle,
        }}
      />
    );
  };

  return inSight ? (
    <>{children}</>
  ) : (
    <div id={elementId.current} style={style}>
      {renderPlaceHolder()}
    </div>
  );
});

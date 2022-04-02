import React from "react";
import { observer } from "mobx-react";

const BaseLayout: React.FC = observer(({ children }: any) => {
  return <div>{children}</div>;
});

export default BaseLayout;

import { configure } from "mobx";
import { message } from "antd";

configure({ enforceActions: "observed" });
message.config({ maxCount: 3 });

import React from "react";
import { IStoreConsumerProps } from "../models/IProviderProps";
import { storeObserver } from "../models/Store";
import { NodeEditor } from "./NodeEditor";

export const OutlineEditor = storeObserver(({ store }: IStoreConsumerProps) => (
  <div
    style={{
      minHeight: "100%",
      margin: "40px 0",
      padding: "0"
    }}
  >
    {store!.visitState!.flatList.map(({ node, level, isCollapsed }) => {
      return (
        <NodeEditor
          isCollapsed={isCollapsed}
          level={level}
          node={node}
          toggleCollapse={store!.visitState!.toggleCollapse}
        />
      );
    })}
  </div>
));

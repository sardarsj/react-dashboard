import React from "react";
import { Widget as WidgetType } from "../types/types";
// import Piel from "./diagram/Piel";
// import Stack from "./diagram/Stack";

interface WidgetProps {
  widget: WidgetType;
  removeWidget: () => void;
}

const Widget: React.FC<WidgetProps> = ({ widget, removeWidget }) => {
  return (
    <div className="border-2 bg-white rounded-lg p-2">
      <h3 className="font-semibold text-sm">{widget.name}</h3>
      {/* <p>{widget.text}</p> */}
      <button className="bg-red-500 border-2 " onClick={removeWidget}>
        Remove Widget
      </button>
      {/* <Piel /> */}
    </div>
  );
};

export default Widget;

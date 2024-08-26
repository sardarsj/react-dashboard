// Category.tsx
import React from "react";
import Widget from "./Widget";
import { CategoryType, Widget as WidgetType } from "../types/types";
import { IoIosAdd } from "react-icons/io";

interface CategoryProps {
  category: CategoryType;
  addWidget: (categoryId: number, widget: WidgetType) => void;
  removeWidget: (categoryId: number, widgetId: number) => void;
  openDrawer: () => void; // Add this prop
}

const Category: React.FC<CategoryProps> = ({ category, removeWidget, openDrawer }) => {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-bold mb-2">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            removeWidget={() => removeWidget(category.id, widget.id)}
          />
        ))}
        <div className="h-[300px] w-[400px] rounded bg-white p-4 flex justify-center items-center px-4">
          <button
            className="border-2 flex items-center"
            onClick={openDrawer} // Use the prop here
          >
            <IoIosAdd />
            Add Widget
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;

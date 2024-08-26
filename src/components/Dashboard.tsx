// Dashboard.tsx
import React, { useEffect, useState } from "react";
import Category from "./Category";
import { Widget, CategoryType } from "../types/types";
import { TbRefresh } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import WidgetDrawer from "./WidgetDrawer";

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/dummy.json");
        const data: CategoryType[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addWidget = (categoryId: number, widget: Widget) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, widget] }
          : category
      )
    );
  };

  const removeWidget = (categoryId: number, widgetId: number) => {
    setCategories(
      categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                (widget) => widget.id !== widgetId
              ),
            }
          : category
      )
    );
  };

  return (
    <main className="p-4 bg-slate-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">CNAPP Dashboard</h3>
        <div className="flex gap-1 text-xs">
          <button
            className="border-2 border-gray-600 rounded-md h-8 bg-white font-semibold text-gray-600 px-1"
            onClick={() => setIsDrawerOpen(true)}
          >
            Add Widget +
          </button>
          <button className="border-2 px-1 border-gray-600 rounded-md h-8 bg-white font-semibold">
            <TbRefresh className="text-sm text-gray-600" />
          </button>
          <button className="border-2 px-1 border-gray-600 rounded-md h-8 bg-white font-semibold">
            <BsThreeDotsVertical className="text-sm text-gray-600" />
          </button>
          <div className="flex items-center border-2 px-1 border-gray-600 rounded-md h-8 bg-white font-semibold">
            <FaClock className="mx-1 text-sm" />
            <Select>
              <SelectTrigger className="border-l-2 border-gray-600 h-8 w-[120px] text-xs text-gray-600 font-semibold">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Last 2 days</SelectItem>
                <SelectItem value="dark">Last week</SelectItem>
                <SelectItem value="system">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-2">
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            addWidget={addWidget}
            removeWidget={removeWidget}
            openDrawer={() => setIsDrawerOpen(true)} // Pass the function to open the drawer
          />
        ))}
      </div>
      
      <WidgetDrawer
        isOpen={isDrawerOpen}
        onOpenChange={(open) => setIsDrawerOpen(open)}
        categories={categories}
        addWidget={addWidget}
        removeWidget={removeWidget}
      />
    </main>
  );
};

export default Dashboard;

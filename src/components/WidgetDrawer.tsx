import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
} from "./ui/drawer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { Button } from "./ui/button";
import { RxCross2 } from "react-icons/rx";
import { Widget as WidgetType, CategoryType } from "../types/types";

interface WidgetDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryType[]; // Pass categories as props
  addWidget: (categoryId: number, widget: WidgetType) => void; // Function to add widget
  removeWidget: (categoryId: number, widgetId: number) => void; // Function to remove widget
}

const WidgetDrawer: React.FC<WidgetDrawerProps> = ({
  isOpen,
  onOpenChange,
  categories,
  addWidget,
  removeWidget,
}) => {
  // State to keep track of checked widgets
  const [checkedWidgets, setCheckedWidgets] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Initialize the checked state based on the existing widgets
    const initialCheckedState: { [key: number]: boolean } = {};
    categories.forEach(category => {
      category.widgets.forEach(widget => {
        initialCheckedState[widget.id] = true; // Assume all widgets are checked initially
      });
    });
    setCheckedWidgets(initialCheckedState);
  }, [categories]);

  const handleCheckboxChange = (widgetId: number) => {
    setCheckedWidgets(prevState => {
      const newState = { ...prevState, [widgetId]: !prevState[widgetId] };
      // Notify parent to remove or add the widget based on checked status
      const widgetToUpdate = findWidgetById(widgetId);
      if (widgetToUpdate) {
        if (newState[widgetId]) {
          addWidget(widgetToUpdate.categoryId, widgetToUpdate);
        } else {
          removeWidget(widgetToUpdate.categoryId, widgetId);
        }
      }
      return newState;
    });
  };

  const findWidgetById = (widgetId: number) => {
    // Find and return the widget by its ID
    for (const category of categories) {
      const widget = category.widgets.find(widget => widget.id === widgetId);
      if (widget) {
        return { ...widget, categoryId: category.id };
      }
    }
    return null;
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="flex justify-between items-center border-2 bg-blue-900 text-white font-semibold p-1">
          <DrawerTitle className="text-sm ml-3">Add Widget</DrawerTitle>
          <RxCross2
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          />
        </DrawerHeader>
        <DrawerDescription>
          Personalize your dashboard by adding the following widgets:
          <Tabs defaultValue="cspm" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="cspm">CSPM</TabsTrigger>
              <TabsTrigger value="cwpp">CWPP</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="ticket">Ticket</TabsTrigger>
            </TabsList>
            <TabsContent value="cspm">
              {categories
                .find(cat => cat.name === 'CSPM Executive Dashboard')
                ?.widgets.map(widget => (
                  <div key={widget.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={checkedWidgets[widget.id] || false}
                      onChange={() => handleCheckboxChange(widget.id)}
                    />
                    <label className="ml-2">{widget.name}</label>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="cwpp">
              {/* Similar code for CWPP */}
            </TabsContent>
            <TabsContent value="image">
              {/* Similar code for Image */}
            </TabsContent>
            <TabsContent value="ticket">
              {/* Similar code for Ticket */}
            </TabsContent>
          </Tabs>
        </DrawerDescription>
        <DrawerFooter className="flex-row">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DrawerClose>
          <Button variant="default" onClick={() => onOpenChange(false)}>
            Confirm
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WidgetDrawer;

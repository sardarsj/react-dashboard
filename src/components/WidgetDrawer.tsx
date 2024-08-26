import React from "react";
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
interface WidgetDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const WidgetDrawer: React.FC<WidgetDrawerProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <DrawerHeader className="flex justify-between items-center border-2 bg-blue-900 text-white font-semibold p-1">
          <DrawerTitle className="text-sm ml-3 ">Add Widget</DrawerTitle>
          <RxCross2
            onClick={() => onOpenChange(false)}
            className="cursor-pointer"
          />
        </DrawerHeader>
        <DrawerDescription>
          Personalize your dashboard by adding the following widget
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="cspm">CSPM</TabsTrigger>
              <TabsTrigger value="cwpp">CWPP</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="ticket">Ticket</TabsTrigger>
            </TabsList>
            <TabsContent value="cspm">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="cwpp">
              Change your password here.
            </TabsContent>
            <TabsContent value="image">
              Change your password here.
            </TabsContent>
            <TabsContent value="ticket">
              Change your password here.
            </TabsContent>
          </Tabs>
        </DrawerDescription>
        <DrawerFooter className="flex-row">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DrawerClose>
          <Button variant="default">Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default WidgetDrawer;

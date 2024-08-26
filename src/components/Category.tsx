import React from "react";
import Widget from "./Widget";
import { CategoryType, Widget as WidgetType } from "../types/types";

interface CategoryProps {
  category: CategoryType;
  addWidget: (categoryId: number, widget: WidgetType) => void;
  removeWidget: (categoryId: number, widgetId: number) => void;
}

const Category: React.FC<CategoryProps> = ({ category, removeWidget }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">{category.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            removeWidget={() => removeWidget(category.id, widget.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;





// import React, { useState } from "react";
// import Widget from "./Widget";
// import AddWidgetForm from "./AddWidget";
// import { Widget as WidgetType, CategoryType } from "../types/types";

// interface CategoryProps {
//   category: CategoryType;
//   addWidget: (categoryId: number, widget: WidgetType) => void;
//   removeWidget: (categoryId: number, widgetId: number) => void;
// }

// const Category: React.FC<CategoryProps> = ({
//   category,
//   addWidget,
//   removeWidget,
// }) => {
//   const [isFormVisible, setFormVisible] = useState(false);

//   const handleAddWidget = (name: string, text: string) => {
//     const newWidget: WidgetType = {
//       id: Date.now(),
//       name,
//       text,
//     };
//     addWidget(category.id, newWidget);
//     setFormVisible(false);
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-sm font-semibold mb-4">{category.name}</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-44">
//         {category.widgets.map((widget) => (
//           <Widget
//             key={widget.id}
//             widget={widget}
//             removeWidget={() => removeWidget(category.id, widget.id)}
//           />
//         ))}

//         <div className=" rounded-lg bg-white p-2">
//           this is the add content part
//         </div>
//       </div>
//       <button
//         className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md"
//         onClick={() => setFormVisible(!isFormVisible)}
//       >
//         + Add Widget
//       </button>
//       {isFormVisible && <AddWidgetForm onAddWidget={handleAddWidget} />}
//     </div>
//   );
// };

// export default Category;

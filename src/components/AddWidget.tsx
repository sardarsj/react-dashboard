import React, { useState } from "react";

interface AddWidgetFormProps {
  onAddWidget: (name: string, text: string) => void;
}

const AddWidgetForm: React.FC<AddWidgetFormProps> = ({ onAddWidget }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddWidget(name, text);
    setName("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Widget Name:</label>
        <input
          type="text"
          value={name}
          className="border-2 border-black"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Widget Text:</label>
        <input
          type="text"
          className="border-2 border-black"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Widget</button>
    </form>
  );
};

export default AddWidgetForm;

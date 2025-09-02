import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing..."); // Placeholder state

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 400,
    }),
    [placeholder]
  );

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="my-6 text-2xl font-bold">About Us</h2>
        <div>
          <JoditEditor
           
            ref={editor}
            value={content}
            config={config}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {}}
          />
          <button className="w-full bg-[#101749] p-2 text-white mt-2 rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

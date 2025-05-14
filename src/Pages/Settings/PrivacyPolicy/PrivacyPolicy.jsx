



import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const PrivacyPolicy = () => {
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
      <div className="bg-white rounded-lg p-6 md:p-10 mt-5">
        <h2 className="text-2xl font-bold mb-6">About Us</h2>
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

export default PrivacyPolicy;

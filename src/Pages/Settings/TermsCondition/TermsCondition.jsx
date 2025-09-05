import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useAddTermsConditionsMutation, useGetTermsConditionsQuery } from "../../../features/api/settingApi";
// import { useAddTermsConditionsMutation, useGetTermsConditionsQuery } from "../../../features/api/settingApi";

const TermsCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing...");

  // Redux query hook for GET request
  const { data, error, isLoading } = useGetTermsConditionsQuery();
  console.log(data)

  // Redux mutation hook for POST request
  const [addTermsConditions, { isLoading: isSaving, isError, error: saveError }] = useAddTermsConditionsMutation();

  // Fetch terms and conditions on load
  useEffect(() => {
    if (data?.data?.description) {
      setContent(data.data.description); // Populate the editor with fetched data
    }
  }, [data]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 400,
    }),
    [placeholder]
  );

  // Handle Save button click to update terms and conditions
  const handleSave = async () => {
    if (!content) {
      alert("Please enter terms and conditions before saving.");
      return;
    }

    try {
      await addTermsConditions({ description: content }).unwrap(); // Send the new content via the POST mutation
      alert("Terms and conditions saved successfully!");
    } catch (err) {
      alert(`Failed to save terms: ${saveError?.message || err.message}`);
    }
  };

  if (isLoading) return <div>Loading current terms...</div>;
  if (isError) return <div>Error loading terms: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="my-6 text-2xl font-bold">Terms Condition</h2>
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)} // Set content on blur
            onChange={(newContent) => {}} // Empty onChange handler
          />
          <button
            className="w-full bg-[#101749] p-2 text-white mt-2 rounded-lg"
            onClick={handleSave}
            disabled={isSaving} // Disable the button when saving
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          {isError && <p className="mt-2 text-red-500">{saveError?.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;

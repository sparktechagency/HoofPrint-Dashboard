import { message } from "antd";
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useAddAboutUsMutation, useGetAboutUsQuery } from "../../../features/api/settingApi";
// import JoditEditor from "jodit-react";
const JoditEditor = lazy(() => import("jodit-react"));

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing...");

  const { data, isLoading, isError } = useGetAboutUsQuery();
  const [addAboutUS, { isLoading: isSaving, isSuccess, isError: saveError }] = useAddAboutUsMutation();

  // ✅ AntD message system
  const [messageApi, contextHolder] = message.useMessage();
  const [isSaveSuccess, setIsSaveSuccess] = useState(null);

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data.data.description);
    }
  }, [data]);

  const handleSave = async () => {
    if (!content) {
      setIsSaveSuccess(false);  // Set save result to failure
      return;
    }

    try {
      await addAboutUS({ description: content }).unwrap(); // Ensure this is being called correctly
      setIsSaveSuccess(true);  // Set save result to success
    } catch (error) {
      setIsSaveSuccess(false);  // Set save result to failure
    }
  };

  useEffect(() => {
    if (isSaveSuccess === true) {
      messageApi.success("About Us saved successfully");
    }
    if (isSaveSuccess === false) {
      messageApi.error("Failed to save About Us");
    }
  }, [isSaveSuccess, messageApi]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 400,
    }),
    [placeholder]
  );

  if (isLoading) return <div>Loading current about us...</div>;
  if (isError) return <div>Error loading About Us.</div>;

  return (
   <Suspense fallback={<div>loading...</div>}>
      <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="my-6 text-2xl font-bold">About Us</h2>
        <div>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContent(newContent)}
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-[#101749] p-2 text-white mt-2 rounded-lg"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
   </Suspense>
  );
};

export default AboutUs;

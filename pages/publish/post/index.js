import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Layout from "../../../components/Layout";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
    ssr: false
});


function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
  }

export default function () {
    return (
        <Layout pageTitle="culture">
            <div className=" mb-4">
                <input placeholder="Title" className="px-2 rounded bg-gray-20 focus:outline-none focus:border-blue-300 w-full border-2 h-10" name="title" />
                <div className="flex space-x-3 space-x-4 pb-4 mt-4">
                    <input placeholder="Tags" className="flex-1 px-2 rounded bg-gray-20 w-auto max-w-full focus:outline-none focus:border-blue-300 border-2 h-10" name="title" />
                    <button className="flex-2 inline w-auto bg-blue-600 text-white h-10 rounded px-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-opacity-50">
                        Export post
                    </button>
                </div>

            </div>
            <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => <ReactMarkdown children={text} />}
                onChange={handleEditorChange}
            />
        </Layout>

    );
}
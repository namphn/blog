import Layout from "../../../components/Layout";
import BoldIcon from "../../../resource/svg/bold-svgrepo-com.svg";
import ItalicIcon from "../../../resource/svg/italic.svg"
import StrikeThrowIcon from "../../../resource/svg/strikethrough-svgrepo-com.svg"
import Heading1 from "../../../resource/svg/heading-h1-svgrepo-com.svg";
import Heading2 from "../../../resource/svg/heading-h2-svgrepo-com.svg";
import Heading3 from "../../../resource/svg/heading-h3-svgrepo-com.svg";
import HtmlTag from "../../../resource/svg/html-coding-svgrepo-com.svg"
import Quote from "../../../resource/svg/quote-svgrepo-com.svg"
import GenericList from "../../../resource/svg/list-svgrepo-com.svg"
import HeadNumList from "../../../resource/svg/listHeadNum-svgrepo-com.svg"
import HorizontalTextIcon from "../../../resource/svg/horizontal_text_icon.svg"
import TableIcon from "../../../resource/svg/table.svg"
import LinkIcon from "../../../resource/svg/hyperlink.svg"
import ImportImage from "../../../resource/svg/edit-image.svg"
import { useState } from "react";
import dynamic from "next/dynamic";
import MarkdownIt from 'markdown-it';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
})

const mdParser = new MarkdownIt(/* Markdown-it options */);

function Index() {
    const [selectText, setSelectText] = useState("");
    const [text, setText] = useState("");

    const getSelectText = () => {
        setSelectText(window.getSelection().toString());
    }
    const boldText = () => {
        if (selectText) {
            set
        }
    }
    return (
        <Layout pageTitle="create">
            <div className="h-80 mb-4">
                {/* <div>
                    <input placeholder="Title" className="px-2 rounded bg-gray-20 focus:outline-none focus:border-blue-300 w-full border-2 h-10" name="title" />
                    <input placeholder="Tags" className="px-2 rounded bg-gray-20 w-full focus:outline-none focus:border-blue-300 border-2 h-10 mt-4" name="title" />
                </div>
                <div className="h-full  mt-4">
                    <div className="rounded-t w-full h-10 bg-gray-200 flex justify-around items-center">
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <BoldIcon className="h-4 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <ItalicIcon className="h-4 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <StrikeThrowIcon className="h-4 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <Heading1 className="h-8 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <Heading2 className="h-8 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <Heading3 className="h-8 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <HtmlTag className="h-7 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <Quote className="h-4 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded" >
                                <GenericList className="h-5 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded" >
                                <HeadNumList className="h-5 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <HorizontalTextIcon className="h-5 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <TableIcon className="h-5 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <LinkIcon className="h-5 fill-current text-gray-500" />
                            </div>
                        </button>
                        <button>
                            <div className="w-8 h-8 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 rounded">
                                <ImportImage className="h-5 fill-current text-gray-500" />
                            </div>
                        </button>
                    </div>
                    <textarea onMouseUp={getSelectText}
                        onDoubleClick={getSelectText}
                        onChange={(value) => {setText(value)}}
                        placeholder="Content" className="px-2 rounded-b resize-none focus:outline-none focus:border-blue-300 bg-gray-20 w-full h-full border-2">
                        {text}
                    </textarea>
                </div> */}
                
            </div>
            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}/>
        </Layout>
    )
}

export default Index;
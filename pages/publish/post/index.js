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

function Index() {
    return (
        <Layout pageTitle="create">
            <div className="h-80 mb-4">
                <div>
                    <input placeholder="Title" className="px-2 rounded bg-gray-20 focus:outline-none focus:border-blue-300 w-full border-2 h-10" name="title" />
                    <input placeholder="Tags" className="px-2 rounded bg-gray-20 w-full focus:outline-none focus:border-blue-300 border-2 h-10 mt-4" name="title" />
                </div>
                <div className="h-full  mt-4">
                    <div className="rounded-t grid-flow-row w-full h-10 bg-gray-200 flex justify-around items-center">
                        <a title="Bold (Ctrl-B)">
                            <BoldIcon className="h-4 inline fill-current text-gray-500 " />
                        </a>
                        <a title="Italic (Ctrl-I)">
                            <ItalicIcon className="h-4 inline fill-current text-gray-500" />
                        </a>
                        <a>
                            <StrikeThrowIcon className="inline h-4 fill-current text-gray-500" />
                        </a>
                        <a>
                            <Heading1 className="h-8 inline fill-current text-gray-500" />
                        </a>
                        <a>
                            <Heading2 className="h-8 inline fill-current text-gray-500" />
                        </a>
                        <a>
                            <Heading3 className="h-8 inline fill-current text-gray-500" />
                        </a>
                        <a>
                            <HtmlTag className="h-7 inline fill-current text-gray-500" />
                        </a>
                        <a>
                            <Quote className="h-4 inline fill-current text-gray-500"/>
                        </a>
                        <a>
                            <GenericList className="h-5 inline fill-current text-gray-500"/>
                        </a>
                        <a>
                            <HeadNumList className="h-5 inline fill-current text-gray-500"/>
                        </a>
                        <a>
                            <HorizontalTextIcon className="h-5 inline fill-current text-gray-500" />
                        </a>
                        <a>
                            <TableIcon className="h-5 inline fill-current text-gray-500"/>
                        </a>
                        <a>
                            <LinkIcon className="h-5 inline fill-current text-gray-500"/>
                        </a>
                        <a>
                            <ImportImage className="h-5 inline fill-current text-gray-500"/>
                        </a>
                    </div>
                    <textarea placeholder="Content" className="px-2 rounded-b resize-none focus:outline-none focus:border-blue-300 bg-gray-20 w-full h-full border-2" />
                </div>
            </div>
        </Layout>
    )
}

export default Index;
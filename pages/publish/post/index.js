import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Layout from "../../../components/Layout";
import "./node_modules/quill-image-uploader/src/quill.imageUploader.css"

import 'react-quill/dist/quill.snow.css';
import React from "react";

import Select from 'react-select'

const options = [
    { value: 1, label: 'TECHNOLOGY' },
    { value: 2, label: 'PHOTOGRAPHY' },
    { value: 3, label: 'GAME' },
    { value: 4, label: 'POLITICS' },
    { value: 5, label: 'CULTURE' },
    { value: 6, label: 'SPORTS' }
]

dynamic(() => import("react-quill"), { ssr: false });

dynamic(() => import("quill-image-uploader"), { ssr: false });
// const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;


// #1 import quill-image-uploader


// #2 register module
Quill.register("modules/imageUploader", ImageUploader);


const save = async (title, summary, content) => {
    const allPost = await axios.post("http://localhost:8082/post")
                              .then(response => {
                                if(response.status == 200) {
                                  return response.data.data
                                }  
                              })
                             .catch(error => {
                                return []
                              })
}

export default function () {
    const [value, setValue] = React.useState();
    const onChange = (text) => {
        console.log(text);
        setValue(text);
    }

    const handleChange = (html) => {
        setValue(html);
    }

    const apiPostNewsImage() {
        // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("image", file);
  
            fetch(
              "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
              {
                method: "POST",
                body: formData
              }
            )
              .then(response => response.json())
              .then(result => {
                console.log(result);
                resolve(result.data.url);
              })
              .catch(error => {
                reject("Upload failed");
                console.error("Error:", error);
              });
          });
    }

    var modules = {
        // #3 Add "image" to the toolbar
        // toolbar: [["bold", "italic", "image"]],
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
          
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],
            ["image"]
            ['clean']                                         // remove formatting button
          ], 
        // # 4 Add module and upload function
        imageUploader: {
          upload: file => {
            return new Promise((resolve, reject) => {
              const formData = new FormData();
              formData.append("image", file);
    
              fetch(
                "https://api.imgbb.com/1/upload?key=d36eb6591370ae7f9089d85875e56b22",
                {
                  method: "POST",
                  body: formData
                }
              )
                .then(response => response.json())
                .then(result => {
                  console.log(result);
                  resolve(result.data.url);
                })
                .catch(error => {
                  reject("Upload failed");
                  console.error("Error:", error);
                });
            });
          }
        }
      };

    return (
        <Layout pageTitle="culture">
            <div className=" mb-4">
                <input placeholder="Title" className="px-2 rounded bg-gray-20 border-gray-300 focus:outline-none focus:border-blue-300 w-full border h-10" name="title" />
                <div className="flex space-x-3 space-x-4 pb-4 mt-4">
                    <Select 
                     closeMenuOnSelect={false}
                     isMulti
                     options={options} placeholder="Tags" className="flex-1 bg-gray-20 w-auto max-w-full focus:outline-none focus:border-blue-300 h-10" name="title" />
                    <button className="flex-2 inline w-auto bg-blue-600 text-white h-10 rounded px-2 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-opacity-50">
                        Export post
                    </button>
                </div>

            </div>
            <ReactQuill 
            theme="snow" value={value} 
            onChange={onChange}
            modules={{  
                modules
              }}  
            />
        </Layout>
        

    );
}
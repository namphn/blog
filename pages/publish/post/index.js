import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Layout from "../../../components/Layout";
import 'react-quill/dist/quill.snow.css';
import React from "react";
import Select from 'react-select'
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);


const options = [
  { value: 1, label: 'TECHNOLOGY' },
  { value: 2, label: 'PHOTOGRAPHY' },
  { value: 3, label: 'GAME' },
  { value: 4, label: 'POLITICS' },
  { value: 5, label: 'CULTURE' },
  { value: 6, label: 'SPORTS' }
]

const save = async (title, summary, content) => {
  const allPost = await axios.post("http://localhost:8082/post")
    .then(response => {
      if (response.status == 200) {
        return response.data.data
      }
    })
    .catch(error => {
      return []
    })
}

export default function () {
  const quillRef = React.useRef();
  const [quill, setQuill] = React.useState();

  React.useEffect(() => {
    const init = (quill2) => {
      console.log(quill2);
      setQuill(quill2)
    };
    const check = () => {
      if (quillRef.current) {
        init(quillRef.current);
        return;
      }
      setTimeout(check, 200);
    };
    check();
  }, [quillRef]);

  const [value, setValue] = React.useState('');
  const [exportHtml, setExportHtml] = React.useState();
  const onChange = (editor) => {
    setExportHtml(editor.getContents());
  }

  const handleChange = (html) => {
    setValue(html);
  }

  const apiPostNewsImage = () => {
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

  const imageHandler = () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append('image', file);

      // Save current cursor state
      console.log(quill.quillEditor)
      const range = quill.getEditorSelection(true);

      // Insert temporary loading placeholder image
      quill.insertEmbed(range.index, 'image', `${window.location.origin}/images/loaders/placeholder.gif`);

      // Move cursor to right side of image (easier to continue typing)
      quill.setSelection(range.index + 1);

      const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'

      // Remove placeholder image
      quill.deleteText(range.index, 1);

      // Insert uploaded image
      // this.quill.insertEmbed(range.index, 'image', res.body.image);
      quill.insertEmbed(range.index, 'image', res);
    };
  }

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
        forwardedRef={quillRef}
        theme="snow" value={value}
        onChange={setValue}
        modules={{
          toolbar: {
            container: [
              [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
              [{ size: [] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'video'],
              ['link', 'image', 'video'],
              ['clean'],
              ['code-block']
            ],
            handlers: {
              image: imageHandler
            }
          }
        }}
      />
    </Layout>
  );
}
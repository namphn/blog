import Layout from "../../../components/Layout";

function Index() {
    return (
        <Layout pageTitle="create">
            <div>
                <div> 
                    <input className="bg-gray-20 w-full border-2 h-10" name="title"/>
                    <input className="bg-gray-20 w-full border-2 h-10 mt-4" name="title"/>
                </div>
                <div>
                <textarea className="w-full h-50 border-2"/>
                </div>
            </div>
        </Layout>
    )
}

export default Index;
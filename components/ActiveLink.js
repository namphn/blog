import React from "react"
import Link from "next/Link"
import { useRouter} from "next/router"

function ActiveLink({ href, activeCLassName, children }) {
    const router = useRouter();

    const child = React.Children.only(children);

    let className = child.props.className || "";
    if(router.pathname == href && activeCLassName) {
        className = `${className} ${activeCLassName}`.trim();
    }

    return <Link href={href}>{React.cloneElement(child, { className })}</Link>
}

export default ActiveLink;
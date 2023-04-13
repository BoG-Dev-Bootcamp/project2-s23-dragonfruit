import Link from "next/link"


export default function Navbar() {
    return (
        <nav className = "nav">
            <Link href="/" className="title">Home</Link>
            <ul>
                {/* <CustomLink href="/home">Account</CustomLink> */}
                <CustomLink href="/addAnimal">Add a Friend</CustomLink>
                <CustomLink href="/addLog">Add a Log</CustomLink>
                <CustomLink href="/signIn">Log in</CustomLink>
                <CustomLink href="/contact">Contact</CustomLink>
            </ul>
        </nav>
    )
    
}

function CustomLink({ href, children, ...props}) {
    return(
        <li>
            <Link href={href} {...props}>{children}</Link>
        </li>
    )
}
import Link from "next/link"

/**
 * Reusable button component, type is "Link" for a link or anything else for a button with an onClick function
 * @param {type: string | undefined, link: string | undefined, buttonText: string | undefined, onClick: function | undefined, 
 *          buttonBox: button-default-box | undefined, buttonStyle: string | button-default, textStyle: string | "link-button-default"} props 
 * @returns a button
 */
export default function Button(props) {
    return (
        (props.type === "Link") ? ( // Link button
            <>
                <div className={props.buttonBox || "button-default-box"}>
                    <Link href={props.link} className={props.buttonStyle}>
                        <h1 className={props.textStyle || "link-button-default"}>
                            {props.buttonText}
                        </h1>
                    </Link>
                </div>
            </>
        ) : ( // Action button with onClick function
            <>
                <div className={props.buttonBox || "button-default-box" }>
                    <button type="button" className={props.buttonStyle || "button-default"} onClick={props.onClick}>
                        {props.buttonText}
                    </button>
                </div>
            </>
        )
    );
}
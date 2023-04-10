import Link from "next/link"

/**
 * Reusable button component, type is "Link" for a link or anything else for a button with an onClick function
 * @param {type: string | undefined, link: string | undefined, buttonText: string | undefined, onClick: function | undefined, 
 *          buttonBox: string | undefined, buttonStyle: string | undefined, textStyle: string | undefined} props 
 * @returns a button
 */
export default function Button(props) {
    return (
        (props.type === "Link") ? ( // Link button
            <>
                <div class={props.buttonBox}>
                    <Link href={props.link} class={props.buttonStyle}>
                        <h1 class={props.textStyle}>
                            {props.buttonText}
                        </h1>
                    </Link>
                </div>
            </>
        ) : ( // Action button with onClick function
            <>
                <div class={props.buttonBox}>
                    <button type="button" class={props.buttonStyle} onClick={props.onClick}>
                        {props.buttonText}
                    </button>
                </div>
            </>
        )
    );
}
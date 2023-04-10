
/**
 * Reusable textbox component
 * @param {textboxBox: string | undefined, value: string | undefined, placeholder: string | undefined
 *          textStyle: string  undefined, onChange: function | undefined, onKeyDown: function | undefined,
 *          type: string | text} props 
 * @returns a textbox
 */
export default function TextBox(props) {
    return (
        <div class={props.textboxBox}>
            <input type={props.type || "text"} value={props.value} placeholder={props.placeholder} class={props.textStyle}
                onChange={props.onChange} onKeyDown={props.onKeyDown} autocomplete="off"
            />
        </div>
    );
}
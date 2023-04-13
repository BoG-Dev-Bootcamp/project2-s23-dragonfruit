
/**
 * Reusable textbox component
 * @param {textboxBox: string | undefined, value: string | undefined, placeholder: string | undefined
 *          textStyle: string | textbox-default, onChange: function | undefined, onKeyDown: function | undefined,
 *          type: string | text, textboxBox: string | textbox-default-box} props 
 * @returns a textbox
 */
export default function TextBox(props) {
    return (
        <div class={props.textboxBox || "textbox-default-box"}>
            <input type={props.type || "text"} value={props.value} placeholder={props.placeholder} class={props.textStyle || "textbox-default"}
                onChange={props.onChange} onKeyDown={props.onKeyDown} autocomplete="off"
            />
        </div>
    );
}
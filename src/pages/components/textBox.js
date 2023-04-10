
/**
 * Reusable textbox component
 * @param {textboxBox: string | undefined, inputText: string | undefined, placeholder: string | undefined
 *          textStyle: string  undefined, onChange: function | undefined, onKeyDown: function | undefined} props 
 * @returns a textbox
 */
export default function TextBox(props) {
    return (
        <div class={props.textboxBox}>
            <input type="text" value={props.inputText} placeholder={props.placeholder} class={props.textStyle}
                onChange={props.onChange} onKeyDown={props.onKeyDown}
            />
        </div>
    );
}
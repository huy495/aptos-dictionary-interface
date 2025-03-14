/** Automatically increases the count of rows based on the content inside a textarea element. */
export function autoRowsHandler(e: { currentTarget: HTMLTextAreaElement }) {
	if (e.currentTarget.clientHeight < e.currentTarget.scrollHeight) {
		e.currentTarget.rows = e.currentTarget.rows + 1;
	}
}

/** Disables adding newlines inside a textarea element. */
export function disableNewlineHandler(e: KeyboardEvent) {
	if (e.key === 'Enter') e.preventDefault();
}

/** Disables adding newlines inside a textarea element. */
export function disableNewlineAndUnfocusHandler(
	e: KeyboardEvent & { currentTarget: HTMLTextAreaElement }
) {
	if (e.key === 'Enter') {
		e.preventDefault();
		e.currentTarget.blur();
	}
}

import type { Definition } from '$lib/stores/contract';

export function getDefinitionsOfAuthor(
	author_addr: string,
	allDefs: Map<string, Array<Definition>>
): Array<Definition & { word: string }> {
	const defsOfAuthors: Array<Definition & { word: string }> = [];

	for (const [word, defs] of allDefs) {
		for (const def of defs) {
			if (def.author_addr === author_addr) {
				defsOfAuthors.push({ ...def, word });
			}
		}
	}

	return defsOfAuthors;
}

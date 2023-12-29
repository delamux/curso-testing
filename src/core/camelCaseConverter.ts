/**
 *
 * An empty string should be returned as is. Example: "" ⇒ ""
 * For a word with the first letter in uppercase, the result should be the same. Example: "Foo" ⇒ "Foo"
 * For a text containing words with the first letter in uppercase, separated by spaces, return the words joined in camel case format. Example: "Foo Bar" ⇒ "FooBar"
 * For a text containing words with the first letter in uppercase, separated by hyphens or underscores, return the words joined. Example: "Foo_Bar-Foo" ⇒ "FooBarFoo"
 * For a word with the first letter in lowercase, the result should return the same word with the first letter in uppercase. Example: "foo" ⇒ "Foo"
 * For a text containing lowercase words, transform each word to uppercase and join them. Example: "foo_bar foo-bar" ⇒ "FooBarFooBar"
 * For a text containing a word completely in uppercase should transform the word in camelcase. Ex: "foo_bar_FOO"" => "FoobarFoo"
 */

export const camelCaseConverter = (text: string): string => {
	if (text?.length === 0) return '';

	return text
		.split(/\s+|-|_/)
		.map((word) => word.charAt(0).toUpperCase().concat(word.toLowerCase().slice(1, word.length)))
		.join('');
};

const firstCharCode = "a".charCodeAt(0);
const lastCharCode = "z".charCodeAt(0);

function* _serialId() {
  let count = 1;
  let alphabet = "a";
  while (true) {
    if (count === Number.MAX_SAFE_INTEGER) {
      count = 1;
      const charCode = alphabet.charCodeAt(0);
      const updatedValue = charCode < lastCharCode ? charCode + 1 : firstCharCode
      console.log(updatedValue);
      alphabet = String.fromCharCode(updatedValue);
    }
    yield `${alphabet}-${count++}`;
  }
}

export function createIdGenerator(prefix?: string): () => string {
  const generator = _serialId();
  return () => {
    const id = generator.next().value;
    return prefix ? `${prefix}-${id}` : `${id}`;
  };
}

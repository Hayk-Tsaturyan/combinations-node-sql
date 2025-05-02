const prefixLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

exports.createItems = function createItems(inputArray) {
  const items = [];
  let letterIndex = 0;

  for (const count of inputArray) {
    const prefix = prefixLetters[letterIndex++];
    for (let i = 1; i <= count; i++) {
      items.push(`${prefix}${i}`);
    }
  }

  return items;
}

exports.createCombinations =function createCombinations(items, length) {
  const results = [];

  function backtrack(start, path) {
    if (path.length === length) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < items.length; i++) {
      const current = items[i];
      const currentPrefixes = path.map(item => item[0]);
      if (!currentPrefixes.includes(current[0])) {
        path.push(current);
        backtrack(i + 1, path);
        path.pop();
      }
    }
  }

  backtrack(0, []);
  return results;
}


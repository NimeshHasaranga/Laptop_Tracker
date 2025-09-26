// shallow diff for simple field changes
export function diffObjects(prev, next, ignore = []) {
  const changes = [];
  const keys = new Set([...Object.keys(prev || {}), ...Object.keys(next || {})]);
  keys.forEach((k) => {
    if (ignore.includes(k)) return;
    const before = prev?.[k];
    const after = next?.[k];
    const same = JSON.stringify(before) === JSON.stringify(after);
    if (!same) changes.push({ path: k, from: before, to: after });
  });
  return changes;
}

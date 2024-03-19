export { analyzer };

function merge(value1: string[], value2: string[], key1: string[], key2: string[]) {
  // 去重合并
  const key: string[] = [];
  const merge_result: string[] = [];
  for (let i = 0; i < key1.length; i++) {
    if (key.includes(key1[i])) { // key1[i]已经出现过
      continue;
    }
    key.push(key1[i]);
    merge_result.push(value1[i]);
  }
  for (let i = 0; i < key2.length; i++) {
    if (key.includes(key2[i])) {
      continue;
    }
    key.push(key2[i]);
    merge_result.push(value2[i]);
  }
  return merge_result;
}

function duplicate(value1: string[], value2: string[], key1: string[], key2: string[]) {
  // 取共同部分
  const dup_result: string[] = [];
  for (let i = 0; i < key1.length; i++) {
    if (key2.includes(key1[i])) { // key2中存在key1[i]
      dup_result.push(value1[i]);
    }
  }
  return dup_result;
}

function diff(value1: string[], value2: string[], key1: string[], key2: string[]) {
  // 取差异部分，只会保留1中的内容
  const diff_result: string[] = [];
  for (let i = 0; i < key1.length; i++) {
    if (key2.includes(key1[i])) { // key2中存在key1[i]
      continue;
    }
    diff_result.push(value1[i]);
  }
  return diff_result;
}

function append(value1: string[], value2: string[], sep: string) {
  // 进行拼接
  const append_result: string[] = [];
  for (let i = 0; i < value1.length; i++) {
    if (value1[i].trim() === '') {
      continue;
    }
    let v2 = value2[i % value2.length];
    if (!v2.startsWith(sep)) {
      v2 = sep + v2;
    }
    append_result.push(value1[i] + v2);
  }
  return append_result;
}

function analyzer(
  input1: string,
  input2: string,
  mode = 'merge',
  lineSort = false,
  lineAll = true,
  preSize = 1,
  separate = '----',
  preCut = false,
) {
  const value1 = input1.split('\n');
  const value2 = input2.split('\n');
  let key1 = value1;
  let key2 = value2;
  if (!preCut || mode === 'append') {
    key1 = input1.split('\n');
    key2 = input2.split('\n');
  }
  const size = preSize;
  const sep = separate;
  if (!lineAll && size > 0 && sep !== '') {
    for (let i = 0; i < key1.length; i++) {
      key1[i] = key1[i].trim();
      const sp = key1[i].split(sep);
      if (sp.length <= size) {
        continue;
      }
      key1[i] = sp.slice(0, size).join(sep);
    }
    for (let i = 0; i < key2.length; i++) {
      key2[i] = key2[i].trim();
      const sp = key2[i].split(sep);
      if (sp.length <= size) {
        continue;
      }
      key2[i] = sp.slice(0, size).join(sep);
    }
  }
  let analyzer_result: string[] = [];
  switch (mode) {
    case 'merge':
      analyzer_result = merge(value1, value2, key1, key2);
      break;
    case 'duplicate':
      analyzer_result = duplicate(value1, value2, key1, key2);
      break;
    case 'diff':
      analyzer_result = diff(value1, value2, key1, key2);
      break;
    case 'append':
      analyzer_result = append(value1, value2, sep);
      break;
  }
  if (lineSort) {
    analyzer_result.sort();
  }
  return analyzer_result.join('\n');
}

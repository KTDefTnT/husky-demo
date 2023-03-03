var lengthOfLongestSubstring = function(s) {
  let result = 0;
  let start = 0;
  const map = new Map();
  for (let end = 0; end < s.length; end++) {
      const key = s[end];
      // 当前元素依然不在窗口内，扩大窗口 更新result
      if (!map.has(key)) {
          const subLength = end - start + 1;
          console.log(start, end, key, map);
          result = subLength > result ? subLength : result;
      } else {
        let flag = true;
        while (flag) {
          const deleteKey = s[start];
          console.log(deleteKey);
          if (deleteKey !== key) {
            map.delete(deleteKey)
            start++
          } else {
            start = map.get(key) + 1
            flag = false;
          }
        }
      }
      map.set(key, end);
  }

  console.log(result);
  return result;
};

const s = "etrtjmtfxtxc";

lengthOfLongestSubstring(s);
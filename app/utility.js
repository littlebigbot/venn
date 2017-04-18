export const getCombinations = (arr, prefix = []) => (
  arr.reduce((r,e,i) => (
    r.concat([...getCombinations(arr.slice(i + 1), prefix.concat(e)), prefix.concat(e)])
  ), [])
).sort((a, b) => b.length - a.length);

export const imgPrefix = (w, h) => `https://image.tmdb.org/t/p/w${w}${h ? `_and_h${h}_bestv2` : ''}/`;

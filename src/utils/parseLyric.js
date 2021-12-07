/**
 * 解析 歌词
 */
//  [00:00.000] 作词 : 陶旧
//  [00:01.000] 作曲 : 楚明玉
//  [00:02.000] 编曲 : 曾吴秋杰
//  [00:03.000] 制作人 : 曾吴秋杰
//  [00:17.71]出品：云上×深声文化
//  [00:32.46]电话我查询过了没欠费
//  [00:39.96]讯息随时听着网络畅通
//  [00:47.46]音量的开关我反复确认几遍
//  [00:54.45]是极致的忘我的期待
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

export function parseLyric(lyricString) {
  const lyrics = [];
  const lineString = lyricString.split("\n");
  // console.log(lineString);
  for (let line of lineString) {
    if (line) {
      const result = parseExp.exec(line);
      const time1 = result[1] * 60 * 1000;// 分 * 60
      const time2 = result[2] * 1000;// 秒
      const time3 = result[3].length === 3 ? +result[3] : result[3] * 10;
      const time = time1 + time2 + time3;
      const content = line.replace(parseExp, "").trim();
      const obj = { time, content };
      lyrics.push(obj);
    }
  }
  return lyrics;
}

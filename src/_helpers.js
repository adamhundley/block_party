export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function colorSample(colors, rejectColor) {
  let set = [0, 1, 2, 3];

  if(rejectColor) {
    set.splice(colors.indexOf(rejectColor), 1);
  }

  return colors[set[Math.floor(Math.random() * set.length)]];
}

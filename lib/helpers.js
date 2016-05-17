export function colorsSample() {
  let colors = ["#FFFF00", "#FD1C03", "#00FF00", "#0033FF", "#00FFFF", "#FF00FF", "#9D00FF"]

  return colors[Math.floor(Math.random() * colors.length)];
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

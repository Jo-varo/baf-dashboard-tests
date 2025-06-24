export const generateRandomNumber = (range: number[]) => {
  return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
}

export const getRandomDarkColor = () => {
  const dark_Colors = ['#e36f66', '#9949e3', '#780101', '#0e3607', '#071536']
  return dark_Colors[Math.floor(Math.random() * dark_Colors.length)];
}
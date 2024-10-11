const samplePoint = (i) =>
  i *
    (0.5 +
      Math.sin(i / 10) * 0.2 +
      Math.sin(i / 20) * 0.4 +
      Math.sin(i / randomFactor) * 0.8 +
      Math.sin(i / 500) * 0.5) +
  200;

let randomFactor = 25 + Math.random() * 25;

function generateLineData(numberOfPoints) {
  randomFactor = 25 + Math.random() * 25;
  const res = [];
  const date = new Date(Date.UTC(2018, 0, 1, 12, 0, 0, 0));
  for (let i = 0; i < numberOfPoints; ++i) {
    const time = date.getTime() / 1000;
    const value = samplePoint(i);
    res.push({
      time,
      value,
    });

    date.setUTCDate(date.getUTCDate() + 1);
  }

  return res;
}

const generateRandomColor = () => {
   const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
   const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
   const color = `#00${green}${blue}`;
   return color;
}

export {generateLineData, generateRandomColor};

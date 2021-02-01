// eslint-disable-next-line import/prefer-default-export
export function generateCards(count) {
  const array = new Array(count).fill('');
  let indexArray = array.map((i, index) => index);

  return array.map((item, index) => {
    let randVal = item;
    if (!item) {
      randVal = Math.ceil(Math.random() * 15);

      indexArray = indexArray.filter((ind) => ind !== index);
      const twinIndex = indexArray[Math.floor(Math.random() * indexArray.length)];
      indexArray = indexArray.filter((ind) => ind !== twinIndex);

      array[twinIndex] = randVal;
    }

    return randVal;
  });
}

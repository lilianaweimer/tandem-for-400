import data from './Apprentice_TandemFor400_Data.json';

// I'm doing this so that later if this becomes a real API call
// it will be much easier to implement
// and won't mess up testing
export const getQuestions = () => {
  let currentIndex = data.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = data[currentIndex];
    data[currentIndex] = data[randomIndex];
    data[randomIndex] = temporaryValue;
  }
  return Promise.resolve(data)
}
import data from './Apprentice_TandemFor400_Data.json';

// I'm doing this so that later if this becomes a real API call
// it will be much easier to implement
// and won't mess up testing
export const getQuestions = () => {
  console.log(Promise.resolve(data))
  return Promise.resolve(data)
}
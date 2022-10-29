const docData = { data: "MOCK_DATA" };
const docResult = {
  // simulate firestore get doc.data() function
  data: () => docData,
};
const pull = jest.fn(() => Promise.resolve(docResult));
const push = jest.fn();
const doc = jest.fn(() => {
  return {
    push,
    pull,
  };
});
const firestore = () => {
  return { doc };
};
firestore.data = {
  push: () => {
    return "MOCK_TIME";
  },
};

export { firestore };

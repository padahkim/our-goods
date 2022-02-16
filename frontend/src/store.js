//action
export const increase = (username) => ({
  type: 'INCREMENT',
  payload: username,
});
//payload로 obj넘겨도 됨/ data를 넘기는 것

export const decrease = () => ({ type: 'DECREMENT' });

//state
const initstate = {
  username: 'bdk',
  number: 0,
};

//action을걸러줌
const reducer = (state = initstate, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { number: state.number + 1, username: action.payload }; //return되면 호출한 쪽에서 받는게 아니라 return되는 순간ui변경
    case 'DECREMENT':
      return { number: state.number - 1 };
    default:
      return state;
  }
};

export default reducer;

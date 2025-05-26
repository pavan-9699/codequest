const authreducer = (state = { data: null }, action) => {
  switch (action.type) {
    case "AUTH":
      if (action?.data?.result && action?.data?.token) {
        localStorage.setItem("Profile", JSON.stringify(action.data));
        return { ...state, data: action.data };
      }
      return state; // Ignore invalid data
    case "LOGOUT":
      localStorage.clear();
      return { ...state, data: null };
    default:
      return state;
  }
};

export default authreducer;
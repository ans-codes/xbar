const initialState = {
  newMessage: false,
  newNotification: false
};

const cartItems = (state = initialState, action) => {
  switch (action.type) {
    case "CHAT_STATUS": {
      return {
        ...state,
        newMessage: action.payload
      };
    }
    case "NOTIFICATION_STATUS": {
      return {
        ...state,
        newNotification: action.payload
      };
    }
  }

  return state;
};

export default cartItems;

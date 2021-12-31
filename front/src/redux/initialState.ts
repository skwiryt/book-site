export const initialState = {
  products: {
    data: [],
    requests: {
      LOAD_PRODUCTS: {
        active: false,
        error: false,
      },
    },
  },
  cart: {
    lines: [],
    requests: {
      ADD_LINE: {
        active: false,
        error: false,
      },
      SEND_ORDER: {
        active: false,
        error: false,        
      },  
    },
  },  
};
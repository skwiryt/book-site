export interface IAppState {
  products: {
    data: {
      id: number
      title: string
      author: string
      cover_url: string
      pages: number
      price: number
      currency: string
    }[],
    requests: {
      [key: string]: {
        active: boolean,
        error: boolean,
      },
    },    
  }
  cart: {
    lines: {
      id: number
      title: string
      author: string
      cover_url: string
      pages: number
      price: number
      currency: string
      quantity: number
    }[],
    requests: {
      [key: string]: {
        active: boolean,
        error: boolean,
      },
    }
  }
}
export const initialState: IAppState= {
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

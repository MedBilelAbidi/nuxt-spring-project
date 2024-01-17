


export interface Product {
    id : number,
    name : string,
    price : number,
    quantity : number,
    imageUrl : string,
    description: string,
    discount: number
}

type SpringApi<K extends string | number | symbol, T> = {
    page : {
        number : number,
        size: number,
        totalElement:number,
        totalPages: number
    }
    _embedded : {
        [key in K]: T
    }
    _links: any
}

export type ProductsList = Product[];

interface ProdcutState {
    productList: ProductsList;
    productsPending: {
        productsList: boolean
    }
}

const state = (): ProdcutState => ({
    productList: [],
    productsPending:{
        productsList: false
    }
});

const getters = {
  getProductsList: (state: ProdcutState) => {
   return state.productList
  }
};

export const useProductStore = defineStore("productStore", {
  state,
  getters,
  actions: {

   
   async  fetchProducts() {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<SpringApi<"produits", ProductsList>>(
        "/",
        {
          method: "GET",
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        
      this.productList = response._embedded.produits


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  fetchProductSorted(sortOrder : string = 'asc') {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<SpringApi<"produits", ProductsList>>(
        `/sorted-by-price?order=${sortOrder}`,
        {
          method: "GET",
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        
      this.productList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },

   async  saveProducts(product: Product) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<ProductsList>(
        "/",
        {
          method: "POST",
          body : toRaw(product),
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        this.fetchProducts()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  editProducts(product: Product) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${product.id}`,
        {
          method: "PUT",
          body : toRaw(product),
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        this.fetchProducts()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  deleteProducts(id: string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${id}`,
        {
          method: "DELETE",
          baseURL: runTimeConfig.public.productBaseUrl,
        }
      );
        this.fetchProducts()

    } catch (error) {
    throw new Error(String(error))
    }
   }
  },
});

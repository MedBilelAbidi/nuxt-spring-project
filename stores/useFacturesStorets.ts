


export interface Facture {
    id : number,
    name : string,
    email: string
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

export type FacturesList = Facture[];

interface FactureState {
  factureList: FacturesList;
  facturePending: {
        facturesList: boolean
    }
}

const state = (): FactureState => ({
  factureList: [],
  facturePending:{
      facturesList: false
    }
});

const getters = {
  getFactureList: (state: FactureState) => {
   return state.factureList
  }
};

export const useFacturesStorets = defineStore("factureStorets", {
  state,
  getters,
  actions: {

   
   async  fetchFacture() {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<FacturesList>(
        "/",
        {
          method: "GET",
          baseURL: runTimeConfig.public.factureBaseUrl,
        }
      );
        console.log(response);
        
      this.factureList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  saveFacture(facture: Facture) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        "/",
        {
          method: "POST",
          body : toRaw(facture),
          baseURL: runTimeConfig.public.factureBaseUrl,
        }
      );
        this.fetchFacture()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  editFacture(facture: Facture) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${facture.id}`,
        {
          method: "PUT",
          body : toRaw(facture),
          baseURL: runTimeConfig.public.factureBaseUrl,
        }
      );
        this.fetchFacture()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  deleteFacture(id: string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${id}`,
        {
          method: "DELETE",
          baseURL: runTimeConfig.public.factureBaseUrl,
        }
      );
        this.fetchFacture()

    } catch (error) {
    throw new Error(String(error))
    }
   }
  },
});




export interface Client {
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

export type ClientsList = Client[];

interface ClientState {
  clientList: ClientsList;
  clientPending: {
        clientsList: boolean
    }
}

const state = (): ClientState => ({
  clientList: [],
  clientPending:{
      clientsList: false
    }
});

const getters = {
  getClientList: (state: ClientState) => {
   return state.clientList
  }
};

export const useClientStorets = defineStore("clientStorets", {
  state,
  getters,
  actions: {

   
   async  fetchClient() {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch<ClientsList>(
        "/",
        {
          method: "GET",
          baseURL: runTimeConfig.public.clientBaseUrl,
        }
      );
        
      this.clientList = response


    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  saveClient(client: Client) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        "/",
        {
          method: "POST",
          body : toRaw(client),
          baseURL: runTimeConfig.public.clientBaseUrl,
        }
      );
        this.fetchClient()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  editClient(client: Client) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${client.id}`,
        {
          method: "PUT",
          body : toRaw(client),
          baseURL: runTimeConfig.public.clientBaseUrl,
        }
      );
        this.fetchClient()

    } catch (error) {
    throw new Error(String(error))
    }
   },
   async  deleteClient(id: string) {
    const runTimeConfig = useRuntimeConfig();

    try {
      const response = await $fetch(
        `/${id}`,
        {
          method: "DELETE",
          baseURL: runTimeConfig.public.clientBaseUrl,
        }
      );
        this.fetchClient()

    } catch (error) {
    throw new Error(String(error))
    }
   }
  },
});

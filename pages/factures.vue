<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>
            Factures List 
        </h1>
        <Button @click="addFactureVisible = true" label="Add new Facture" icon="pi pi-plus" class="ms-3" />

    </div>
    <div class="card">

        <DataTable v-model:expandedRows="expandedRows" :value="factureStore.getFactureList" dataKey="id"
        tableStyle="min-width: 60rem">
        <template #empty>
            No Facture Found
        </template>
    <Column expander style="width: 5rem" />
    <Column field="id" header="ID"></Column>
    <Column field="clientID" header="Client ID"></Column>

    <Column field="client.name" header="Client">
    </Column>
    <Column field="client.email" header="Client">
    </Column>
    <Column field="dateFacture" header="Date">
    </Column>
    <Column field="price" header="Price">
        <template #body="slotProps">
            {{ slotProps.data.price }}
        </template>
    </Column>
    <Column field="price" header="Price">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" @click="addFactureVisible = true,collectEditData(slotProps.data)" rounded ></Button>

            <Button icon="pi pi-trash
            " @click="confirm1(slotProps.data.id)" severity="danger" rounded ></Button>
                </template>
    </Column>
    <template #expansion="slotProps">
        <div class="p-3">
            <h5>Product for facture with </h5>
            <DataTable :value="slotProps.data.facturekignes">
                <Column field="produitID" header="Product Id" sortable></Column>
                <Column field="produit.name" header="Product" sortable></Column>
                <Column field="produit.description" header="Product description" sortable></Column>

                <Column field="price" header="Price" sortable>
                    <template #body="slotProps">
                        {{ slotProps.data.price }}
                    </template>
                </Column>
                <Column field="produit.discount" header="Discount" sortable></Column>

                <Column field="imageUrl" header="Image" sortable>
                    <template #body="slotProps">
                        <img  :src="slotProps.data.produit.imageUrl" class="shadow-4" width="64"/>
                    </template>
                </Column>
                <Column field="quantity" header="Qunatity" sortable>
                </Column>
                <Column headerStyle="width:4rem" header="Action">
                    <template #body="slotProps">
                        <Button @click="collectData(slotProps.data)" icon="pi pi-search" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </template>
</DataTable>
<Dialog v-model:visible="detailsVisible" modal :header="selectedItem.name" :style="{ width: '500px' }" >
       
    <div class="p-4 border-1 surface-border surface-card border-round">
        <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ selectedItem.quantity }}</span>
            </div>
        </div>
        <div class="flex flex-column align-items-center gap-3 py-5">
            <img class="w-9 shadow-2 border-round" :src="selectedItem.produit.imageUrl" :alt="selectedItem.name" />
            <div class="text-2xl font-bold">{{ selectedItem.produit.name }}</div>
            <div class="text-1xl font-bold text-900">{{ selectedItem.produit.description }}</div>
        </div>
        <div class="flex align-items-center justify-content-center">
        
            <span class="text-2xl font-semibold">${{ selectedItem.price }}</span>
    
        </div>
    </div>

</Dialog>
        <Dialog 
        v-model:visible="addFactureVisible" 
        @after-hide="resetForm" modal 
        :header="uiMutateItems.title" :style="{ width: '800px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-column gap-3">
                <label class="d-block">
                   Client Name {{ numbOfProducts }}
                </label>
                <Dropdown v-model="userInputs.clientID" 
                :options="clientStore.getClientList" 
               
                filter optionLabel="name" 
                option-value="id"
                placeholder="Select a client" class="w-full" />

                <div v-if="userInputs.clientID">
                    <div class="d-flex justify-content-between align-items-end mb-3">
                        <h4>
                            Add Products
                        </h4>
                        <Button @click="addProductObject"  icon="pi pi-plus" severity="primary"  />
                    </div>
                    <div v-for="itemsCount in numbOfProducts" class="mb-4 pb-4 border-bottom">
                        <div class="d-flex justify-content-between  align-items-end mb-2">
                            <span>
                                Product N°{{ itemsCount }} Details 
                            </span>
                            <span>
                                <Button @click="deleteProductObject(itemsCount-1)"  icon="pi pi-times" severity="danger" text rounded  />

                            </span>
                         </div>
                         <Dropdown v-model="userInputs.facturekignes[itemsCount-1].produitID" 
                         @change="(e)=> onProductSelect(itemsCount-1, e)" 
                         :options="productStore.getProductsList" filter class="w-100"
                          optionLabel="name" option-value="id" placeholder="Select a product" />
                         <div class="row" v-if="userInputs.facturekignes[itemsCount-1].produitID">
                            <div class="col-6">
                                <label class="d-block">
                                    Product Quantity
                                 </label>
                                <InputNumber v-model="userInputs.facturekignes[itemsCount-1].quantity" @update:modelValue="calcProductPrice(itemsCount-1)" 
                                inputId="integeronly" class="w-100"/>
                            </div>
                            <div class="col-6">
                                <label class="d-block">
                                    Product Price
                                 </label>
                                <InputNumber v-model="userInputs.facturekignes[itemsCount-1].price" inputId="integeronly" class="w-100" disabled=""/>
                            </div>
                         </div>
                      </div>
                </div>

            </div>
            <template #footer>
                <div class="d-flex justify-content-between align-items-end">
                    <div>
                        <label class="h6 d-block" >Total Price:</label>
                        <InputNumber v-model="userInputs.price" inputId="integeronly"  disabled=""/>
                    </div>
                    <div>
                        <Button @click="addFactureVisible = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
                        <Button @click="handelFacture" :label="uiMutateItems.button" icon="pi pi-check" class="ms-3" />
                    </div>
                </div>



            </template>
        </Dialog>

        <ConfirmDialog></ConfirmDialog>
        <Toast />
    </div>

</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";


const clientStore = useClientStorets()
const factureStore = useFacturesStorets()
const productStore = useProductStore()

const numbOfProducts = ref(1)
const confirm = useConfirm();
const toast = useToast();
const selectedItem = ref({})
const addFactureVisible = ref(false)
const userInputs = reactive({
    facturekignes: [{
        produitID : '',
        quantity: undefined,
        price: undefined,
        produit: {}
    }],
    client : {},
    clientID: undefined,
    price: undefined
})
const expandedRows = ref([]);
const detailsVisible = ref(false)

const uiMutateItems = reactive({
    title: 'Add New Facture',
    button: 'Save new Facture'
})
const collectData = (item) =>{
    detailsVisible.value = true
    selectedItem.value = item
}
const collectEditData = (item) =>{
    uiMutateItems.button = 'Save Updates'
    uiMutateItems.title = 'Edit Factures'
    selectedItem.value = item
    numbOfProducts.value =  selectedItem.value.facturekignes.length 
    for (const key in selectedItem.value) {
         userInputs[key] = selectedItem.value[key]
    }
}
const onProductSelect = (index, e) =>{
    userInputs.facturekignes[index].produit =  productStore.getProductsList.find(item => item.id === userInputs.clientID);

    userInputs.facturekignes[index].price = userInputs.facturekignes[index].produit.price
    userInputs.facturekignes[index].quantity = 1
    let totalPrice = 0
    for (let index = 0; index < userInputs.facturekignes.length; index++) {
        const element = userInputs.facturekignes[index];
        totalPrice = totalPrice + element.price
    }
    userInputs.price = totalPrice
}
const calcProductPrice = (index) =>{
    if (!userInputs.facturekignes[index].quantity) {
        return
    }
    userInputs.facturekignes[index].price =  userInputs.facturekignes[index].produit.price * userInputs.facturekignes[index].quantity

    let totalPrice = 0
    for (let index = 0; index < userInputs.facturekignes.length; index++) {
        const element = userInputs.facturekignes[index];
        totalPrice = totalPrice + element.price
    }
    userInputs.price = totalPrice
}

const addProductObject = () =>{
    numbOfProducts.value++ 
    userInputs.facturekignes.push({
        produitID : '',
        quantity: undefined,
        price: undefined,
        produit: {}
    })
}
const deleteProductObject = (index) =>{
    console.log('deleteProductObject');
    numbOfProducts.value -= 1
    userInputs.facturekignes.splice(index, 1)
}
const resetForm = () =>{
    for (const key in userInputs) {
         userInputs[key] = undefined
         
    }
    userInputs.facturekignes = [{
        produitID : '',
        quantity: undefined,
        price: undefined,
        produit: {}
    }]
    numbOfProducts.value = 1
    uiMutateItems.button = 'Add New Facture'
    uiMutateItems.title = 'Save Facture'
}
const handelFacture = async () =>{
    if ( userInputs.id) {
       try {
         await  factureStore.editFacture(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have edited the facture', life: 3000 });
         addFactureVisible.value = false
       } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
       }
    }else{
     try {
         await  factureStore.saveFacture(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have saved the facture', life: 3000 });
         addFactureVisible.value = false

     } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
     }
    }
}

const confirm1 = (id) => {
    confirm.require({
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            factureStore.deleteFacture(id)
            addFactureVisible.value = false

        },
    
    });
};
onBeforeMount(async()=>{
    await factureStore.fetchFacture()
    await clientStore.fetchClient()
    await productStore.fetchProducts()

})
</script>

<style lang="scss" scoped>

</style>
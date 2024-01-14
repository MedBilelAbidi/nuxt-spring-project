
<template>
    <div class="card">
        <DataView :value="productStore.getProductsList" :layout="layout" paginator :rows="5">
            <template #header>
                <div class="flex justify-content-between">
                    <div>
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />
                        <Button @click="addProductVisible = true" label="Add new Product" icon="pi pi-plus" class="ms-3" />

                    </div>


                    <DataViewLayoutOptions v-model="layout" />
                </div>
            </template>

            <template #list="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4" :class="{ 'border-top-1 surface-border': index !== 0 }">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" :src="item.imageUrl" :alt="item.name" />
                            <div class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                                <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                    <div class="text-2xl font-bold text-900">{{ item.name }}</div>
                                    <div class="text-1xl font-bold text-900">{{ item.description }}</div>
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ item.quantity }}</span>
                                        </span>
                                        <Tag :value="getStockState(item.quantity)" :severity="getSeverity(getStockState(item.quantity))"></Tag>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center h-100  justify-content-between sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">${{ item.price }}</span>
                                    <div class="d-flex gap-2 flex-grow-1">
                                        <Button @click="collectEditData(item),addProductVisible = true" icon="pi pi-pencil" rounded ></Button>

                                        <Button icon="pi pi-search" @click="collectData(item),detailsVisible = true" rounded ></Button>
                                        <Button icon="pi pi-trash
                                        " @click="confirm1()" severity="danger" rounded ></Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-nogutter">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
                        <div class="p-4 border-1 surface-border surface-card border-round">
                            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                                <span class="flex align-items-center gap-2">
                                    <i class="pi pi-tag"></i>
                                    <span class="font-semibold">{{ item.quantity }}</span>
                                </span>
                                <Tag :value="getStockState(item.quantity)" :severity="getSeverity(getStockState(item.quantity))"></Tag>
                                <Button icon="pi pi-trash" @click="confirm1()" severity="danger" rounded ></Button>
                            </div>
                            <div class="flex flex-column align-items-center gap-3 py-5">
                                <img class="w-9 shadow-2 border-round" :src="item.imageUrl" :alt="item.name" />
                                <div class="text-2xl font-bold">{{ item.name }}</div>
                                <div class="text-1xl font-bold text-900">{{ item.description }}</div>
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <Button icon="pi pi-pencil" @click="addProductVisible = true,collectEditData(item)" rounded ></Button>

                                <span class="text-2xl font-semibold">${{ item.price }}</span>
                                <Button icon="pi pi-search" @click="collectData(item),detailsVisible = true" rounded ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>


        <Dialog v-model:visible="detailsVisible" modal :header="selectedItem.name" :style="{ width: '500px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
       
                <div class="p-4 border-1 surface-border surface-card border-round">
                    <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div class="flex align-items-center gap-2">
                            <i class="pi pi-tag"></i>
                            <span class="font-semibold">{{ selectedItem.quantity }}</span>
                        </div>
                        <Tag :value="getStockState(selectedItem.quantity)" 
                        :severity="getSeverity(getStockState(selectedItem.quantity))"></Tag>
                    </div>
                    <div class="flex flex-column align-items-center gap-3 py-5">
                        <img class="w-9 shadow-2 border-round" :src="selectedItem.imageUrl" :alt="selectedItem.name" />
                        <div class="text-2xl font-bold">{{ selectedItem.name }}</div>
                        <div class="text-1xl font-bold text-900">{{ selectedItem.description }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-between">
                        <Button icon="pi pi-trash
                        " @click="confirm1()" severity="danger" rounded ></Button>
                        <span class="text-2xl font-semibold">${{ selectedItem.price }}</span>
                        <Button icon="pi pi-pencil" rounded ></Button>
                    </div>
                </div>
       
        </Dialog>
        <Dialog 
        v-model:visible="addProductVisible" 
        @after-hide="resetForm" modal 
        :header="uiMutateItems.title" :style="{ width: '600px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-column gap-2">
                <label class="d-block">
                    Product name
                </label>
                <InputText type="text" v-model="userInputs.name" />
                <div class="d-flex gap-2">
                    <div class="col-6 p-0">
                        <label class="d-block">
                            Price
                        </label>
                        <InputNumber v-model="userInputs.price" inputId="currency-us" mode="currency" currency="USD" locale="en-US" />
                        
                    </div>
                    <div class="col-6 p-0">
                        <label class="d-block">
                            Discount
                        </label>
                        <InputNumber v-model="userInputs.Discount" inputId="currency-us" mode="currency" currency="USD" locale="en-US" />
                    </div>
                </div>

                <label class="d-block">
                    Quantity
                </label>
                <InputNumber v-model="userInputs.quantity" 
                inputId="horizontal-buttons" showButtons 
                buttonLayout="horizontal" :step="1" decrementButtonClass="p-button-danger" incrementButtonClass="p-button-success">
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
                <label class="d-block">
                    Product Image URL
                </label>
                <InputText type="text" v-model="userInputs.imageUrl " />

                <label class="d-block">
                    Description
                </label>
                <Textarea v-model="userInputs.description" rows="2" cols="25" />
            </div>
            <template #footer>
                <Button @click="addProductVisible = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
                <Button @click="handelProduct" :label="uiMutateItems.button" icon="pi pi-check" class="ms-3" />

            </template>
        </Dialog>
        <ConfirmDialog></ConfirmDialog>
        <Toast />
    </div>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const productStore = useProductStore()
const uiMutateItems = reactive({
    title: 'Add New Product',
    button: 'Save new Product'
})
const sortKey = ref();
const detailsVisible = ref(false)
const addProductVisible = ref(false)
const layout = ref('grid');
const selectedItem = ref({})
const userInputs = reactive({})
const sortOptions = ref([
    {label: 'Price High to Low', value: '!price'},
    {label: 'Price Low to High', value: 'price'},
]);
const collectData = (item) =>{
    selectedItem.value = item
}
const collectEditData = (item) =>{
    uiMutateItems.button = 'Save Updates'
    uiMutateItems.title = 'Edit Products'
    selectedItem.value = item
    for (const key in selectedItem.value) {
         userInputs[key] = selectedItem.value[key]
    }
}
const handelProduct = async () =>{
    if ( userInputs.id) {
       try {
         await  productStore.editProducts(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have edited the product', life: 3000 });
         addProductVisible.value = false
       } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
       }
    }else{
     try {
         await  productStore.saveProducts(userInputs)
         toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have saved the product', life: 3000 });
         addProductVisible.value = false

     } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
     }
    }
}
const resetForm = () =>{
    for (const key in userInputs) {
         userInputs[key] = undefined
    }
    uiMutateItems.button = 'Add New Product'
    uiMutateItems.title = 'Save new Product'
}
const confirm1 = () => {
    confirm.require({
        message: 'Are you sure you want to delete?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-text p-button-text',
        acceptClass: 'p-button-danger p-button-text',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            productStore.deleteProducts(selectedItem.value.id)
            addProductVisible.value = false

        },
    
    });
};
const getSeverity = (product) => {
    switch (product) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
const getStockState = (quantity) => {
    if (quantity > 50) {
        return 'INSTOCK';
    } else if (quantity <= 50 && quantity > 0) {
        return 'LOWSTOCK';
    } else {
        return 'OUTOFSTOCK';
    }
}

onBeforeMount(async()=>{
    await productStore.fetchProducts()
})

</script>

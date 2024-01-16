<template>
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1>
            Clients List 
        </h1>
        <Button @click="addClientVisible = true" label="Add new Client" icon="pi pi-plus" class="ms-3" />

    </div>
    <div class="card">

        <DataTable  ref="dt" :sortOrder="1" sortField="id" :value="clientStore.getClientList" paginator :rows="5" 
        @row-click="collectData($event)"  tableStyle="min-width: 50rem">
        <template #header>
            <div style="text-align: left">
                <Button icon="pi pi-external-link" label="Export" @click="exportCSV($event)" />
            </div>
        </template>
            <Column field="id" header="Id" sortable  style="width: 10%"></Column>
            <Column field="name" header="Name" sortable  style="width: 45%"></Column>
            <Column field="email" header="Email" sortable  style="width: 45%"></Column>
            <Column header="Actions"   style="width: 45%">
                <template #body="slotProps">
                    <div class="flex gap-2">
                        <Button icon="pi pi-trash
                        " @click="confirm1()" severity="danger" rounded ></Button>
                        <Button icon="pi pi-pencil" @click="addClientVisible = true,collectEditData(slotProps.data)" rounded ></Button>
                    </div>
                </template>

            </Column>
        </DataTable>
        <Dialog 
        v-model:visible="addClientVisible" 
        @after-hide="resetForm" modal 
        :header="uiMutateItems.title" :style="{ width: '400px' }" 
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="flex flex-column gap-2">
                <label class="d-block">
                   Client Name
                </label>
                <InputText type="text" v-model="userInputs.name" />
                <label class="d-block">
                    Client Email
                </label>
                <InputText type="text" v-model="userInputs.email " />

            </div>
            <template #footer>
                <Button @click="addClientVisible = false" label="Cancel" icon="pi pi-times" severity="secondary"  />
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
const selectedItem = ref({})
const clientStore = useClientStorets()
const addClientVisible = ref(false)
const userInputs = reactive({})
const uiMutateItems = reactive({
    title: 'Add New Client',
    button: 'Save new Client'
})
const collectData = (item) =>{
    selectedItem.value = item.data
}
const collectEditData = (item) =>{
    uiMutateItems.button = 'Save Updates'
    uiMutateItems.title = 'Edit Clients'
    selectedItem.value = item
    for (const key in selectedItem.value) {
         userInputs[key] = selectedItem.value[key]
    }
}
const resetForm = () =>{
    for (const key in userInputs) {
         userInputs[key] = undefined
    }
    uiMutateItems.button = 'Add New Client'
    uiMutateItems.title = 'Save Client'
}
const handelProduct = async () =>{
    if ( userInputs.id) {
       try {
         await  clientStore.editClient(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have edited the product', life: 3000 });
         addClientVisible.value = false
       } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
       }
    }else{
     try {
         await  clientStore.saveClient(userInputs)
         toast.add({ severity: 'success', summary: 'Success Message', detail: 'You have saved the product', life: 3000 });
         addClientVisible.value = false

     } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Somthing Wrong', life: 3000 });

        console.log(error);
     }
    }
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
            clientStore.deleteClient(selectedItem.value.id)
            addClientVisible.value = false

        },
    
    });
};
const dt = ref();

const exportCSV = () => {
    dt.value.exportCSV();
};
onBeforeMount(async()=>{
    await clientStore.fetchClient()
})
</script>

<style lang="scss" scoped>

</style>
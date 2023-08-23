<template>
    <h1 class="title">Historial de Movimientos</h1>
    <div class="tradeHistory">
        <div class="test">
            <div class="tableHistory">
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Accion</th>
                        <th scope="col">Divisa</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Dinero (en $ARS)</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Botones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="transaccion in investmentHistory"
                            :key="transaccion._id"
                        >
                            <td class="tg-kxt4">{{ transaccion.action}}</td>
                            <td class="tg-kxt4">{{ transaccion.crypto_code }}</td>
                            <td class="tg-kxt4">{{ transaccion.crypto_amount }}</td>
                            <td class="tg-kxt4">$ {{ Number(transaccion.money).toLocaleString() }}</td>
                            <td class="tg-kxt4">{{ new Date(transaccion.datetime).toLocaleString() }}</td>
                            <td class="buttons">
                                <button class="btn btn-primary" @click="openViewModal(getMovementToEdit(transaccion._id, true))" type="button">Ver</button>
                                <button class="btn btn-warning" @click="openEditModal(getMovementToEdit(transaccion._id, false))">Editar</button>
                                <button class="btn btn-danger" @click="deleteMovement(transaccion._id)">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="viewModal" v-if="viewModalVisible">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Detalles de la Transaccion</h2>
                </div>
                <div class="modal-body">
                    <p><strong>Accion:</strong> {{ newMovement.action }} </p>
                    <p><strong>Divisa:</strong> {{ newMovement.crypto_code }} </p>
                    <p><strong>Cantidad:</strong> {{ newMovement.crypto_amount }} </p>
                    <p><strong>Dinero (en $ARS):</strong> ${{ Number(newMovement.money).toLocaleString() }} </p>
                    <p><strong>Fecha:</strong> {{ new Date(newMovement.datetime).toLocaleString() }} </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" @click="closeViewModal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <div class="editModal" v-if="editModalVisible">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Editar Transaccion</h2>
                </div>
                <div class="modal-body">
                    <div class="form-group row updateForm">
                        <label for="action" class="col-md-4 col-form-label text-md-right">Accion</label>
                        <div class="col-md-6">
                            <select class="form-control" v-model="newMovement.action"  @change="getPrice(newMovement.action, newMovement.crypto_code)">
                                <option>
                                    {{newMovement.action}}
                                </option>
                                <option>
                                    {{otherAction}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row updateForm">
                        <label for="action" class="col-md-4 col-form-label text-md-right">Crypto</label>
                        <div class="col-md-6">
                            <select class="form-control" v-model="newMovement.crypto_code" @change="getPrice(newMovement.action, newMovement.crypto_code)">
                                <option v-for="crypto in cryptoList" :key="crypto.id">
                                    {{crypto.symbol}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row updateForm">
                        <label for="action" class="col-md-4 col-form-label text-md-right">Precio</label>
                        <div class="col-md-6">
                            <input type="text" name="crypto" id="disabledTextInput" class="form-control" disabled v-model="price">
                        </div>
                    </div>
                    <div class="form-group row updateForm">
                        <label for="action" class="col-md-4 col-form-label text-md-right">Cantidad</label>
                        <div class="col-md-6">
                            <input type="text" name="crypto" id="disabledTextInput" class="form-control" v-model="newMovement.crypto_amount">
                        </div>
                    </div>
                    <div class="form-group row updateForm">
                        <label for="action" class="col-md-4 col-form-label text-md-right">Dinero</label>
                        <div class="col-md-6">
                            <input type="text" name="crypto" id="disabledTextInput" class="form-control" v-model="newMovement.money">
                        </div>
                    </div>   
                    <div class="form-group row updateForm">
                        <label for="action" class="col-md-4 col-form-label text-md-right">Fecha</label>
                        <div class="col-md-6">
                            <input type="text" name="crypto" id="disabledTextInput" class="form-control" disabled v-model="newMovement.datetime">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeEditModal">Cerrar</button>
                    <button type="button" class="btn btn-warning" @click="reloadTable(postNewMovement(newMovement._id))">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>


</template>
<script>
import ServicesAxios from '@/services/ServicesAxios';
import Swal from 'sweetalert2';


    export default {
        name: "TradeHistory",
        data(){
            return {
                investmentHistory: [],
                movementId: null,
                newMovement: {
                    user_id: this.$store.state.username,
                    action: "",
                    crypto_code: "",
                    crypto_amount: "",
                    money: "",
                    datetime: "",
                },
                oldMovement: null,
                otherAction: null,
                
                formatDate: null,
                price: null,
                cryptoList: null,

                viewModalVisible: false,
                editModalVisible: false,
                selectedTransaction: null,
                editedTransaction: null,
            }
        },


        mounted(){
            if (this.$store.state.username === ''){
                Swal.fire("Usuario no encontrado");
                this.$router.push("/")
            }
            
            ServicesAxios.getMovements(this.$store.state.username).then((res) => {
                this.investmentHistory = res.data
                this.cryptoList = ServicesAxios.cryptos;
            })
            
        },
        methods:{
            reloadTable(){
                ServicesAxios.getMovements(this.$store.state.username).then((res) => {
                this.investmentHistory = res.data
                })
            },

            deleteMovement(id){
                let movementToDelete = null
                ServicesAxios.getMovementById(id).then((res)=>{
                    movementToDelete = res.data;
                })
                ServicesAxios.deleteMovement(id)
                .then(()=>{
                    this.$store.commit("deleteMovement", movementToDelete)
                    Swal.fire("Movimiento borrado");
                    this.reloadTable();
                })
                this.investmentHistory = "";
            },

            getMovementToEdit(id, isView){
                ServicesAxios.getMovementById(id).then((res)=>{
                    this.newMovement = res.data;
                    this.otherAction = this.newMovement.action === "sale" ? "purchase" : "sale";
                    
                    if (isView){
                        this.formatDate = new Date(this.newMovement.datetime).toLocaleString()
                    }
                    ServicesAxios.getCryptoData(this.newMovement.crypto_code).then((res) =>{
                        this.price = this.newMovement.action === "sale" ? res.totalBid : res.totalAsk;
                    })
                })
            },
            postNewMovement(id){
                ServicesAxios.updateMovement(id, this.newMovement).then(()=>{
                    Swal.fire("Exitoso")
                    if (this.newMovement.action === "purchase"){
                        this.$store.commit("newPurchase", this.newMovement)
                    }
                    else{
                        this.$store.commit("newSale", this.purchase)
                    }
                    this.editModalVisible = false;
                })
            },
            getPrice(action, crypto){
                let cryptoInfo 
                ServicesAxios.getCryptoData(crypto).then((res)=>{
                    cryptoInfo = res.data
                    if(action === "sale"){
                    this.newMovement.action = "sale";
                    this.otherAction = "purchase";
                    this.price = cryptoInfo.totalBid
                }
                else if (action === "purchase"){
                    this.newMovement.action = "purchase";
                    this.otherAction = "sale";
                    this.price = cryptoInfo.totalAsk
                }
                })
            },
            openViewModal(func){
                this.selectedTransaction = this.newMovement;
                this.viewModalVisible = true;
                this.editModalVisible = false;
            },
            openEditModal(func){
                this.selectedTransaction = this.newMovement;
                this.editedTransaction = { ...this.newMovement }
                this.viewModalVisible = false;
                this.editModalVisible = true;
            },
            closeViewModal(){
                this.viewModalVisible = false;
                this.selectedTransaction = null;
            },
            closeEditModal(){
                this.editModalVisible = false;
                this.editedTransaction = null;
            },
        }
    }

</script>
<style scoped>
.tradeHistory{
    margin: 5%;
    z-index: 1;
}
.buttons{
    display: flex;
    justify-content:space-evenly;
}
.updateForm{
    margin-top: 3%;
    margin-bottom: 3%;
}
.tableHistory{
    width: 100%;
}
.test{
    display: flex;
    justify-content: space-between;
}
.table{
    padding: 2%;
}
.title{
    margin: 5% 0 0 0;
    display: flex;
    justify-content: center;
}
.editModal, .viewModal{
    width: 500px;
    margin: 5%;
    margin-left: 32%;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    background-color: #ffffff;
    z-index: 2;
    position: absolute;
    top: 100px;
    left: 50px;
    /* transition: 5s; */
}
.modal-header{
    margin: 5%;
    width: 100%;
}
.modal-footer button{
    margin: 5%;
}
</style>

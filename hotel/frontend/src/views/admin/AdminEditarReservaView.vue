<template>
    <form
        class="formulario"
        method="POST"
        @submit.prevent="atualizarReserva(this.reservaID)"
    >
        <label for="usuario" class="usuario"
            >Cliente: <span>{{ nome }} {{ sobrenome }}</span></label
        >
        <label for="tipo">Tipo:</label>
        <select v-model="idAcomodacao" @change='filtrarNumero(idAcomodacao)'>
            <option
                v-for="acomodacao in acomodacoes"
                :key="acomodacao.id"
                :value="acomodacao.id_acomodacao"
            >
                {{ acomodacao.tipo }}
            </option>
        </select>
        <label for="numero">Número do quarto:</label>
        <select v-model="idQuarto" >
            <option value='' selected disabled >Quarto atual: {{numero}}</option>
            <option v-if="this.numerosQuartos == 0" value='' selected disabled >Tipo de acomodação sem quarto vago</option>
            <option v-else
                v-for="quarto in numerosQuartos"
                :key="quarto.id"
                :value="quarto.id_quarto"
            >
                {{ quarto.numero }}
            </option>
        </select>
        <label for="tipo">Serviços adicionais:</label>
        <div class="servicos">
            <div>
        <input class='checkbox' type="checkbox" value='Spa' v-model="servicosAdicionados" > Spa
            </div>
            <div>
        <input class='checkbox' type="checkbox" value='Trilha Ecológica' v-model="servicosAdicionados" > Trilha Ecológica
            </div>
            <div>
        <input class='checkbox' type="checkbox" value='Passeio de Barco' v-model="servicosAdicionados" > Passeio de barco
            </div>
            <div>
        <input class='checkbox' type="checkbox" value='Passeio Entre Ilhas ' v-model="servicosAdicionados" > Passeio entre ilhas
            </div>
            <div>
        <input class='checkbox' type="checkbox" value='Café da Manhã no Quarto' v-model="servicosAdicionados" > Café da manhã no quarto
            </div>
        </div>

        <label for="checkin">Check-in:</label>
        <input type="date" id="checkin" v-model="checkin" required />

        <label for="checkout">Check-out:</label>
        <input type="date" id="checkout" v-model="checkout" required />

        <label for="qtdpessoas">Quantidade de Pessoas:</label>
        <select v-model="qtdpessoas" id="qtdpessoas">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>   

        <label for="totaldesconto">Total de Desconto (%):</label>
        <input type="text" id="totaldesconto" v-model="desconto" />

        <label for="confirmacao">Confirmação:</label>
        <select v-model="confirmacao" id="confirmacao">
            <option value="confirmado">Confirmado</option>
            <option value="cancelado">Cancelado</option>
        </select>
        <label for="total">Total:</label>
        <input type="text" id="total" v-model='totaltela' disabled required />
        <label for="total">Total com desconto:</label>
        <input type="text" id="total" v-model='totaldesconto' disabled required /> 
        <button @click="this.atualizar">Editar Reserva</button>
    </form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'EditarReservaView',
    data() {
        return {
            reservaID: null,
            //* Reserva
            checkin: null,
            checkout: null,
            confirmacao: null,
            // data: null,
            // dataConfirmacao: null,
            qtdpessoas: null,
            total: null,
            desconto: null,
            idQuarto: null,
            idQuartoAnterior: null,
            totalcomdesconto: null,
            servicos: null,
            servicosAdicionados: [],
            // idUsuario: null,

            totaldesconto: null,
            totaltela: null,

            //*Quarto
            quartoPreco:null,
            quartos: null,
            quartosFiltrados: null,
            numerosQuartos: null,

            status: null,
            numero: null,

            //*Acomodações
            acomodacoes: null,
            idAcomodacao: null,

            preco: null,

            //*Usuário
            nome: null,
            sobrenome: null,

            //*Serviços
            servicosEscolhidos: null,
        }
    },
    methods: {
        async identificarReserva(id) {
            axios
                .get(`/api/reservas/${id}`)
                .then((response) => {
                    this.checkin = this.formatarData(response.data[0].checkin)
                    this.checkout = this.formatarData(response.data[0].checkout)
                    this.confirmacao = response.data[0].confirmacao
                    this.qtdpessoas = response.data[0].qtdpessoas
                    this.total = parseFloat(response.data[0].total)
                    this.desconto = response.data[0].totaldesconto
                    this.servicos = JSON.parse(response.data[0].servicos)
                    this.idQuarto = response.data[0].id_quarto
                    this.idQuartoAnterior = response.data[0].id_quarto
                    //*Quarto
                    this.status = response.data[0].status
                    this.numero = response.data[0].numero
                    this.idAcomodacao = response.data[0].id_acomodacao
                    //*Usuário
                    this.nome = response.data[0].nome
                    this.sobrenome = response.data[0].sobrenome
                    //*Acomodacão
                    this.preco = parseFloat(response.data[0].preco)
                    this.filtrarNumero(this.idAcomodacao)
                    this.carregarServicos()
                })
                .catch((error) => error)
        },
        async atualizarReserva(id) {
            
            const dados = {
                checkin: this.checkin,
                checkout: this.checkout,
                qtdpessoas: parseInt(this.qtdpessoas),
                total: this.total,
                totaldesconto: this.desconto,
                totalcomdesconto: this.totalcomdesconto,
                confirmacao: this.confirmacao,
                servicos: JSON.stringify(this.atualizarServicos()),
                idQuarto: this.idQuarto,
                idQuartoAnterior: this.idQuartoAnterior,
            }
            axios
                .patch(`/api/reservas/${id}`, dados)
                .then((response) => console.log(response))
                .catch((error) => error)

            this.$router.push('/admin/reservas')
        },
        totalServicos() {
            const servicos = this.atualizarServicos()
            let totalServicos = 0
            console.log(totalServicos);
            for (let total of servicos) {
                totalServicos += total.preco
            }
            return totalServicos
        },
        atualizarServicos() {
            const servicos = this.servicosAdicionados.map((item) => {return {nome:item, preco: 100}})
            return servicos
        },
        filtrarNumero(id_acomodacao) {
            axios
                .get(`/api/acomodacoes/tipos/${id_acomodacao}`)
                .then((response) => {
                    this.numerosQuartos = response.data
                })
                .catch((error) => error)

        },
        async calcularTotal(idQuarto, totalPessoas, checkin, checkout) {
            // let quarto = null
            await axios
            .get(`/api/acomodacoes/quartos/${idQuarto}`)
            .then((response) => (this.quartoPreco = parseFloat(response.data[0].preco)))
            const dataCheckin = new Date(checkin)
            const dataCheckout = new Date(checkout)
            const milissegundos = dataCheckout - dataCheckin
            const diferencaDias = milissegundos/(1000*60*60*24)
            if(totalPessoas <2) {
                const preco = this.quartoPreco*diferencaDias
                this.quartoPreco = preco
            }
            if(totalPessoas > 1) {
            const preco = this.quartoPreco
            this.quartoPreco = (preco + ((preco * 0.05)*totalPessoas))*diferencaDias 
            }
            const preco = this.quartoPreco + this.totalServicos()
            this.totalcomdesconto = this.calcularDesconto(preco, this.desconto) //para banco de dados
            this.totaldesconto = this.formatarMoeda(this.calcularDesconto(preco, this.desconto))
            this.total = preco
            this.totaltela = this.formatarMoeda(preco)
        },
        calcularDesconto(total, desconto) {
            const calculo = total * (1 - desconto / 100)
            return calculo
        },
        formatarData(data) {
            let formatarData = data.split('T')
            return formatarData[0]
        },
        formatarMoeda(valor) {
            const moeda = valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
            return moeda
        },
        carregarServicos(){
            const servicos = this.servicos
            console.log(servicos);
            if (servicos) {
                 servicos.forEach ((cadanome) => {
                    console.log(cadanome);
                    this.servicosAdicionados.push(cadanome.nome)
                })
            }
        }
    },
    updated() {
        console.log(this.servicosAdicionados)
        this.calcularTotal(this.idQuarto,this.qtdpessoas, this.checkin, this.checkout)
    },
    mounted() {
        this.reservaID = this.$route.params.id
        this.identificarReserva(this.$route.params.id)
        axios
            .get('/api/acomodacoes')
            .then((response) => (this.acomodacoes = response.data))
            axios
            .get('/api/acomodacoes/quartos')
            .then((response) => (this.quartos = response.data))
    },
}
</script>

<style lang='scss' scoped>
option[default] {
  display: none;
}
.formulario {
    width: 50%;
    margin: 0 auto;
    margin: 3% auto 0 auto;
    padding: 20px;
    background: #063f57;
    border-radius: 10px;
}
.formulario p {
    color: #a35700;
    font-weight: bold;
    line-height: 50px;
    font-size: 1.5rem;
    text-align: right;
    margin-right: 10px;
    cursor: pointer;
}
.formulario h2 {
    color: #ffffff;
    text-align: center;
}
.formulario label {
    width: 100%;
    display: block;
    color: #ffffff;
    margin: 5px 0;
}
.servicos {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    color: white;
    flex-direction: column;
}
.formulario .checkbox{
    flex-direction: column;
    height: 10px;
    width: 25px;
}
.formulario input,
.formulario select {
    width: 100%;
    height: 40px;
    font-size: 1rem;
    padding-left: 10px;
}
.formulario button {
    font-size: 1rem;
    padding: 10px 30px;
    background: #a35700;
    color: #ffffff;
    border: none;
    margin-top: 10px;
}
.usuario {
    font-weight: bold;
    font-size: 1.2rem;
}

</style>

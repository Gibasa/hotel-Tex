<template>
  <div class="detalhes">
    <button
      @click="showModal = !showModal"
      class="visualizar"
      title="Ver Reserva"
    >
      Ver Reserva
    </button>

    <div
      v-if="showModal"
      @click="showModal = false"
      class="modal__overlay"
      id="modal__overlay"
    >
      <div class="modal__detalhes" @click.stop="">
        <div class="modal__detalhes__itens">
          <i
            class="fa-sharp fa-solid fa-xmark fechar"
            id="btn__fechar__detalhes" @click="showModal = false"
          ></i>
          <div v-for="item in this.reserva" :key="item" class="detalhes">
            <div class="modal__detalhes__itens__img">
              <img :src="item.imagem" :alt="item.tipo" />
            </div>
            <div class="modal__detalhes__itens__descricao">
              <h2><span>Detalhes da Reserva</span></h2>
              <p><span>Acomodação:</span> {{ item.tipo }}</p>
              <p><span>Descrição:</span> {{ item.descricao }}</p>
              <p><span>Checkin:</span> {{ formatarData(item.checkin) }}</p>
              <p><span>Checkout:</span> {{ formatarData(item.checkout) }}</p>
              <p><span>Noites:</span> {{ item.noites }}</p>
              <p><span>Pessoas:</span> {{ item.qtdpessoas }}</p>
              <p><span>Preço Quarto:</span> {{ moeda(parseFloat(item.preco)) }}</p>
              <p>
                <span>Serviços Adicionais:</span> 
                <ul>
                  <li v-for="servico in JSON.parse(item.servicos)" :key="servico.nome">✅ {{ servico.nome }} -
                {{ moeda(servico.preco) }}</li>
                </ul>
              </p>
              <p class="total"><span>Total:</span> {{ moeda(parseFloat(item.totalcomdesconto)) }}</p>
            </div>
          </div>
          <button type="button" @click="showModal = false">Sair</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "ComponenteDetalhes",
  props: ["codigo"],
  data() {
    return {
      reserva: "",
      showModal: false,
    };
  },
  methods: {
    moeda(valor) {
      return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    },
    formatarData(data) {
            const dataS = new Date(data)
            var formatarData = dataS.toLocaleDateString('pt-BR')
            return formatarData
        },
    async fillBookings() {
            const id = JSON.parse(localStorage.getItem('token')).userID
            console.log(id)
            await axios
                .get(`/api/reservas/mybookings/${id}`)
                .then((res) => {
                    this.reserva = res.data
                    this.reserva = this.reserva.filter(element => element.id_reserva == this.codigo)
                })
                .catch((error) => console.log(error))
        },   
  },
  mounted() {
    this.fillBookings()
  },
};
</script>

<style lang="scss" scoped>
.modal__overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
}
.modal__detalhes {
  display: flex;
  background: #ffffff;
  border-radius: 5px;
  padding: 20px;
  width: 70%;

  .fechar {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    padding-right: 5px;
  }

  h2 {
    margin-bottom: 20px;
    text-transform: uppercase;

    span {
      border-bottom: 5px solid #a35700;
    }
  }

  button {
    padding: 10px 30px;
    margin-top: 20px;
    border: none;
    background: #176485;
    color: #ffffff;
    text-transform: uppercase;
    cursor: pointer;
  }
}
.detalhes {
  display: flex;
}
.modal__detalhes__itens__descricao {
  flex: 60%;
  padding-left: 20px;
  position: relative;
  text-align: left;

  p {
    margin-bottom: 5px;
    span {
      font-weight: bold;
    }
  }

  p:last-child {
    margin-top: 20px;
  }  
}

.modal__detalhes__itens__img {
  flex: 40%;
  img{
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    border-radius: 5px;
  }
}

.visualizar {
  width: 100%;
  border: none;
  color: #fff;
  padding: 5px;
  margin-right: 2px;
  cursor: pointer;
  background: #063f57;
}

</style>

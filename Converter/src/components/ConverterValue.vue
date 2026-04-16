<template>
<div class="wrapper">
  <div class="converter-card">

    <div class="block_1">
      <input type="number" v-model.number="amountFrom" placeholder="У меня есть" min="0">
      <input type="text" v-model="fromCurrency" placeholder="Выберите валюту" @click="showFrom = true; fetchCurrencies()">
      <ul v-if="showFrom" class="currency_list">
        <li v-for="currency in currencies" :key="currency" @click="selectFrom(currency)">
          {{ currency }}
        </li>
      </ul>
    </div>

    <img class="dollar" src="/src/assets/images/currency_exchange_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" @click="swap">

    <div class="block_2">
      <input type="number" v-model="amountTo" placeholder="Результат" readonly>
      <input type="text" v-model="toCurrency" placeholder="Выберите валюту" @click="showTo = true; fetchCurrencies()">
      <ul v-if="showTo" class="currency_list">
        <li v-for="currency in currencies" :key="currency" @click="selectTo(currency)">
          {{ currency }}
        </li>
      </ul>
    </div>
  </div>
   <div class="bg-red-600 font-bold italic">Этот текст я закастомизировал через аттрибуты tailwind</div>
</div>
</template>

<script>
import { apiClient } from '@/apiClient';

export default {
  data() {
    return {
      fromCurrency: '',
      toCurrency: '',
      amountFrom: " ",
      amountTo: " ",
      showFrom: false,
      showTo: false,
      currencies: [],
    };
  },
  methods: {
    swap() {
  const tempCurrency = this.fromCurrency;
  this.fromCurrency = this.toCurrency;
  this.toCurrency = tempCurrency;

  const tempAmount = this.amountFrom;
  this.amountFrom = this.amountTo;
  this.amountTo = tempAmount;

  this.convert();
},
    async fetchCurrencies() {
      try {
        const response = await apiClient.get('/api/rates', {
        });
        this.currencies = Object.keys(response.data.rates);
      } catch (error) {
        console.error('Ошибка:', error);
      }
    },
    async convert() {
      if (!this.fromCurrency || !this.toCurrency || !this.amountFrom) {
        this.amountTo = 0;
        return;
      }
try {
        const response = await apiClient.get('/api/convert', {
          params: {
            from: this.fromCurrency,
            to: this.toCurrency,
            amount: this.amountFrom,
          }
        });
        this.amountTo = parseFloat(response.data.result).toFixed(2);
      } catch (error) {
        console.error('Ошибка при конвертации:', error);
      }
    },
selectFrom(currency) {
      this.fromCurrency = currency;
      this.showFrom = false;
      this.convert();
    },
selectTo(currency) {
      this.toCurrency = currency;
      this.showTo = false;
      this.convert();
    },
handleKeydown(event) {
      if (event.key === 'Escape', 'Enter') {
        this.showFrom = false;
        this.showTo = false;
      }
    }
  },
watch: {
    amountFrom() {
      this.convert();
    },
    fromCurrency() {
      this.convert();
    },
    toCurrency() {
      this.convert();
    }
  },
mounted() {
    window.addEventListener('keydown', this.handleKeydown);
    this.fetchCurrencies(); 
  },
beforeUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style scoped>

.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


.converter-card {
  display: flex;
  align-items: center;
  gap: 50px;

  padding: 20px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);

  box-shadow: 0 20px 20px rgba(0,0,0,0.4);
}

input {
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 20px;

  background: rgba(255,255,255,0.12);
  color: white;

  width: 260px;
  transition: 0.2s;
}

input::placeholder {
  color: rgba(255,255,255,0.6);
}

input:focus {
  outline: none;
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.4);
}

input:hover {
  transform: translateY(-4px);
}

.block_1,
.block_2 {
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 15px;
}

.currency_list {
  position: absolute;
  top: 100%;
  background: rgba(20,20,30,1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  list-style: none;
  padding: 5px 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.65);
}

.currency_list li {
  padding: 10px;
  color: #fff;
  cursor: pointer;
  transition: 0.2 s;
}

.currency_list li:hover {
  background: rgba(0, 200, 255, 0.3);
}

.dollar {
  width: 50px;
  transition: 0.3s;
  cursor: pointer;
}

.dollar:hover {
  transform: rotate(180deg);
  opacity: 1;
}

.dollar {
  align-self: center;
  width: 70px;
  margin-top: 10px;
  cursor: default;
  user-select: none;
}

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"]:hover,
input[type="text"]:hover {
  cursor: pointer;
}

.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background: linear-gradient(to bottom, rgba(0, 247, 255, 0.4), transparent);
}
</style>

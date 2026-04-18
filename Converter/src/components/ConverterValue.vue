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
  position: relative;
  overflow: hidden;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at top left, rgba(255, 196, 120, 0.18), transparent 30%),
    radial-gradient(circle at bottom right, rgba(84, 170, 255, 0.22), transparent 35%),
    linear-gradient(145deg, #09131d 0%, #132738 48%, #1b3f58 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}


.converter-card {
  display: flex;
  align-items: center;
  gap: 38px;

  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 28px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.07));
  backdrop-filter: blur(22px);

  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

input {
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px 18px;
  border-radius: 16px;
  font-size: 20px;
  font-weight: 500;

  background: rgba(7, 19, 30, 0.42);
  color: white;

  width: 260px;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

input::placeholder {
  color: rgba(255,255,255,0.55);
}

input:focus {
  outline: none;
  border-color: rgba(120, 210, 255, 0.6);
  background: rgba(10, 28, 43, 0.7);
  box-shadow: 0 0 0 4px rgba(99, 194, 255, 0.14);
}

input:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
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
  top: calc(100% + 8px);
  background: rgba(8, 20, 31, 0.94);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  list-style: none;
  padding: 8px 0;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
  z-index: 2;
  box-shadow: 0 18px 40px rgba(0,0,0,0.45);
}

.currency_list li {
  padding: 12px 14px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, padding-left 0.2s ease;
}

.currency_list li:hover {
  background: rgba(99, 194, 255, 0.18);
  padding-left: 18px;
}

.dollar {
  width: 50px;
  padding: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.35s ease, background 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.dollar:hover {
  transform: rotate(180deg);
  background: rgba(99, 194, 255, 0.18);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
}

.dollar {
  align-self: center;
  width: 68px;
  margin-top: 10px;
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
  top: -48px;
  left: -60%;
  width: 220%;
  height: 180px;
  background:
    radial-gradient(circle at 8% 34%, rgba(255, 214, 138, 0.32), transparent 20%),
    radial-gradient(circle at 20% 18%, rgba(114, 201, 255, 0.26), transparent 20%),
    radial-gradient(circle at 34% 28%, rgba(255, 168, 128, 0.24), transparent 10%),
    radial-gradient(circle at 46% 20%, rgba(135, 227, 255, 0.2), transparent 20%),
    radial-gradient(circle at 58% 32%, rgba(255, 214, 138, 0.3), transparent 10%),
    radial-gradient(circle at 70% 18%, rgba(114, 201, 255, 0.26), transparent 11%),
    radial-gradient(circle at 84% 28%, rgba(255, 168, 128, 0.22), transparent 10%),
    radial-gradient(circle at 96% 20%, rgba(135, 227, 255, 0.2), transparent 9%),
    linear-gradient(90deg,
      rgba(255, 209, 122, 0.12) 0%,
      rgba(110, 205, 255, 0.18) 12.5%,
      rgba(255, 173, 135, 0.14) 25%,
      rgba(118, 220, 255, 0.18) 37.5%,
      rgba(255, 209, 122, 0.12) 50%,
      rgba(110, 205, 255, 0.18) 62.5%,
      rgba(255, 173, 135, 0.14) 75%,
      rgba(118, 220, 255, 0.18) 87.5%,
      rgba(255, 209, 122, 0.12) 100%);
  filter: blur(20px);
  transform-origin: center top;
  animation: topGlowWave 7s linear infinite;
  pointer-events: none;
}

.wrapper::after {
  content: "";
  position: absolute;
  right: -120px;
  bottom: -120px;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(93, 196, 255, 0.22), transparent 68%);
  pointer-events: none;
}

@keyframes topGlowWave {
  0% {
    transform: translate3d(0, 0, 0) scaleX(1) scaleY(1);
    opacity: 0.72;
    filter: blur(20px) hue-rotate(0deg);
  }
  50% {
    transform: translate3d(12%, 6px, 0) scaleX(1.03) scaleY(1.06);
    opacity: 0.96;
    filter: blur(24px) hue-rotate(10deg);
  }
  100% {
    transform: translate3d(24%, 0, 0) scaleX(1) scaleY(1);
    opacity: 0.78;
    filter: blur(20px) hue-rotate(0deg);
  }
}

@media (max-width: 768px) {
  .wrapper {
    height: auto;
    min-height: 100vh;
    padding: 20px;
    align-items: flex-start;
  }

  .converter-card {
    flex-direction: column;
    gap: 18px;
    width: 100%;
    padding: 22px 18px;
  }

  .block_1,
  .block_2 {
    width: 100%;
  }

  input {
    width: 100%;
    font-size: 16px;
    padding: 12px;
  }

  .dollar {
    transform: rotate(90deg);
    width: 54px;
    margin-top: 0;
  }

  .currency_list {
    max-height: 200px;
  }
}
</style>

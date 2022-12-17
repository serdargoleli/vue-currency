<template>
  <div class="main-content">
    <div class="social-media">
      <a href="https://github.com/serdargoleli" target="_blank">GitHub</a>
      <a href="https://www.linkedin.com/in/serdargoleli/" target="_blank">Linkedin</a>
      <a href="https://www.behance.net/serdargoleli" target="_blank">Behance</a>
      <a href="https://www.youtube.com/@serdargoleli" target="_blank">YouTube</a>
      <a href="https://medium.com/@serdargoleli" target="_blank">Medium</a>
    </div>
    <h1 class="title">Son Güncelleme: {{ updatedDate }}</h1>
    <div class="btn-group">
      <button class="btn mr-15" @click="type = 'currencies'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
          />
        </svg>

        DÖVİZ
      </button>
      <button class="btn" @click="type = 'gold'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
        ALTIN
      </button>
    </div>

    <table>
      <thead>
        <tr>
          <th class="text-left">Para Birimi</th>
          <th>Alış</th>
          <th>Satış</th>
          <th class="text-right">Değişim</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="currency in type == 'currencies' ? currencies : gold" :key="currency">
          <td class="text-left">{{ currency.name }}</td>
          <td>{{ currency.sell }}</td>
          <td>{{ currency.buy }}</td>
          <td class="text-right" :class="changeControl(currency.change) > 0 ? 'text-red' : 'text-green'">{{ currency.change }}</td>
        </tr>
      </tbody>
    </table>

    <small class="source">Kur bilgileri <a href="https://finans.truncgil.com/">finans.truncgil.com</a> adresinden çekilmiştir.</small>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  const currencies = ref(null);
  const gold = ref(null);
  const updatedDate = ref(null);
  const error = ref(null);
  let type = ref("currencies");
  let formatedCurrencies = [],
    formatedGold = [];
  fetch("https://finans.truncgil.com/today.json")
    .then((res) => res.json())
    .then((json) => {
      for (const [key, value] of Object.entries(json)) {
        let formattedName = key.replace(/-/gi, " ").toUpperCase();
        let isGold = key.search(/altin|bilezik|gumus/gi);
        if (key == "Update_Date") {
          const date = new Date(value);
          updatedDate.value = date.toLocaleString(["tr-TR"], {
            month: "long",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } else if (isGold > -1) {
          formatedGold.push({
            name: formattedName,
            sell: value["Alış"],
            buy: value["Satış"],
            change: value["Değişim"],
          });
        } else {
          formatedCurrencies.push({
            name: formattedName,
            sell: value["Alış"],
            buy: value["Satış"],
            change: value["Değişim"],
          });
        }
      }
      currencies.value = formatedCurrencies;
      gold.value = formatedGold;
    })
    .catch((err) => (error.value = err));

  function changeControl(change = "") {
    return change.search(/-/gi);
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    box-shadow: none;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    transition: all 0.3 cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  body {
    padding: 30px 0;
    background: #0c0b0b;
    color: #f1f1f1;
  }
  .social-media {
    margin-bottom: 20px;
  }
  a {
    font-weight: 200;
    color: #9e9d9d;
    text-decoration: none;
  }
  .social-media a {
    margin-right: 20px;
    font-size: 14px;
  }
  .social-media a:last-child {
    margin-right: 0;
  }
  .social-media a:hover {
    color: #fff;
  }
  .source {
    display: block;
    text-align: center;
    font-weight: 200;
    color: #cecece;
    margin-top: 10px;
  }
  .source,
  .source a {
    font-size: 12px;
  }
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .title {
    padding: 10px;
    background: rgba(43, 93, 255, 0.301);
    color: rgb(43, 93, 255);
    border-radius: 7px;
    margin-bottom: 20px;
    font-size: 14px;
  }
  .title strong {
    font-family: 800 !important;
  }
  table {
    width: 90%;
    border-collapse: collapse;
  }
  @media screen and (min-width: 992px) {
    table {
      width: 50%;
    }
  }
  thead {
    background: #242323;
    color: #9e9d9d;
  }

  thead th {
    text-align: right;
    padding: 10px;
    font-weight: 400;
    font-size: 14px;
    width: 25%;
  }
  thead th:first-child,
  tbody td:first-child {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  thead th:last-child,
  tbody td:last-child {
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
  }
  tbody tr:nth-child(even) {
    background: #5554542f;
    color: #e7e7e7;
  }
  tbody tr:nth-child(odd) {
    background: #0c0b0b;
    color: #e7e7e7;
  }
  tbody td:first-child {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
  tbody tr td {
    text-align: right;
    padding: 10px;
    font-weight: 100;
    font-size: 14px;
  }
  tbody tr:hover {
    background: #cecece;
    color: #0c0b0b;
  }
  tbody tr:hover td {
    font-weight: bold;
  }
  .text-green {
    color: #00c000;
  }
  .text-red {
    color: #ff0000;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .btn-group {
    margin-bottom: 20px;
    display: flex;
  }
  .btn {
    border: none;
    border-radius: 7px;
    padding: 8px 36px;
    font-size: 14px;
    cursor: pointer;
    background: #ff850061;
    color: #ff8500;
    transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .btn:hover {
    background: #ff8500;
    color: #0c0b0b;
  }
  .mr-15 {
    margin-right: 15px;
  }
</style>

<template>
<div id="app">
<button @click="addCard()">Add Card</button>
  <table>
  <tr><th>Data Property</th><th>Computed Property</th></tr>
  <tr>
  <td>
    <div v-for="(card, index) in cards" :key="index">
      <component  :is="card['card-type']" :title="card.card.title">
      </component>
    </div>
  </td>
  <td>
    <div v-for="(card, index) in computedNoCard1" :key="index">
      <component  :is="card['card-type']" :title="card.card.title">
      </component>
    </div>
  </td>
  </tr>
  </table>
  
</div>
</template>>

<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.16/vue.js">-->
<script>
import Vue from 'vue'
Vue.config.productionTip = false

Vue.component('card1', {
  template: '<div>Card:<span style="background-color:green">{{title}}</span></div>',
  props: ['title']
})

Vue.component('card2', {
  template: '<div>Card:<span style="background-color:blue">{{title}}</span></div>',
  props: ['title']
})

Vue.component('card3', {
  template: '<div>Card:<span style="background-color:yellow">{{title}}</span></div>',
  props: ['title']
})

new Vue({
  el: '#app',
  data() {
    return {
      cards: [
        {'card': {'title': 'I am one card1'}, 'card-type':'card1'},
        {'card': {'title': 'I am one card2'}, 'card-type':'card2'}
      ]
    }
  },
  computed: {
    computedNoCard1: function () {
      let availableCards = new Set(['card2', 'card3'])
      return this.cards.filter((item) => {
        return availableCards.has(item['card-type'])
      })
    }
  },
  methods: {
    addCard: function () {
      let supportedCards = ['card1', 'card2', 'card3']
      let seed = Math.floor(Math.random()*supportedCards.length)
      this.cards.push({'card': {'title': 'I am new card for ' + supportedCards[seed]}, 'card-type': supportedCards[seed]})
    }
  }
})
</script>
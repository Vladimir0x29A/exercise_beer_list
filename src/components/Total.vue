<template>
  <div class="beer-item">
    <div class="beer-item__container">
      <div class="beer-item__info beer-item__stream-el">
        <h3 class="beer-item__name">Statistics</h3>

        <div class="beer-item__properties">
          <div class="item-properties">
            <div
                v-for="property in properties"
                class="item-properties__property item-property"
            >
              <div class="item-property__title">{{ property.name }}</div>

              <div class="item-property__value">{{ round(goal[property.field]) }}</div>
              <div class="item-property__value">{{ round(achieved[property.field]) }}</div>
              <div class="item-property__value">{{ percentage[property.field] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

const RATE_CALORIES_PROTEINS      = 25;
const RATE_CALORIES_FATS          = 15;
const RATE_CALORIES_CARBOGYDRATES = 60;

const RATE_GRAMS_PROTEINS      = 4;
const RATE_GRAMS_FATS          = 9;
const RATE_GRAMS_CARBOGYDRATES = 4;

export default {
  name: "Total",
  data() {
    return {
      properties: [
        {name: 'Calories',      field: 'calories'},
        {name: 'Proteins',      field: 'proteins'},
        {name: 'Fats',          field: 'fats'},
        {name: 'Carbohydrates', field: 'carbohydrates'},
      ],
    };
  },
  computed: {
    ...mapState('settings', [
      'settings',
    ]),
    ...mapState('foodDailyItems', [
      'foodDailyItems',
    ]),
    ...mapState('foodItems', [
      'foodItems',
    ]),
    goal() {
      if (!Object.keys(this.settings).length) {
        return {
          calories:      0,
          proteins:      0,
          fats:          0,
          carbohydrates: 0,
        };
      }

      const {calories} = this.settings;

      return {
        calories,
        proteins:      calories * RATE_CALORIES_PROTEINS      / RATE_GRAMS_PROTEINS      / 100,
        fats:          calories * RATE_CALORIES_FATS          / RATE_GRAMS_FATS          / 100,
        carbohydrates: calories * RATE_CALORIES_CARBOGYDRATES / RATE_GRAMS_CARBOGYDRATES / 100,
      };
    },
    achieved() {
      return this.foodDailyItems
        .map(dailyItem => {
          const foodItem = this.foodItems.find(item => item.id === dailyItem.food_item_id);
          const grams = dailyItem.grams / 100;

          return {
            calories:      grams * foodItem.calories,
            proteins:      grams * foodItem.proteins,
            fats:          grams * foodItem.fats,
            carbohydrates: grams * foodItem.carbohydrates,
          };
        })
        .reduce((dailyItem, accum) => {
          const obj = {};

          Object.keys(accum).forEach(key => {
            obj[key] = dailyItem[key] + accum[key];
          });

          return obj;
        }, {
          calories:      0,
          proteins:      0,
          fats:          0,
          carbohydrates: 0,
        });
    },
    percentage() {
      if (!Object.keys(this.settings).length) {
        return {
          calories:      0,
          proteins:      0,
          fats:          0,
          carbohydrates: 0,
        };
      }

      return {
        calories:      Math.round(this.achieved.calories      / this.settings.calories  * 100),
        proteins:      Math.round(this.achieved.proteins      / this.goal.proteins      * 100),
        fats:          Math.round(this.achieved.fats          / this.goal.fats          * 100),
        carbohydrates: Math.round(this.achieved.carbohydrates / this.goal.carbohydrates * 100),
      };
    },
  },
  methods: {
    round(value) {
      return Math.round(value);
    },
  },
}
</script>

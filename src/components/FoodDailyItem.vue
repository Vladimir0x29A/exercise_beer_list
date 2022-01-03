<template>
  <div class="beer-item">
    <div class="beer-item__container">
      <!--<div class="beer-item__id beer-item__stream-el">{{ item.name }}</div>-->

      <div class="beer-item__info beer-item__stream-el">
        <h3
            v-if="!showEdit"
            class="beer-item__name"
        >
          {{ itemName }}
        </h3>

        <select
            v-else-if="editable"
            v-model="editable.food_item_id"
        >
          <option
              v-for="foodItem in foodItems"
              :value="foodItem.id"
          >{{ foodItem.name }}</option>
        </select>

        <!--<Multiselect
            :options="foodItems"
            v-model="selected"
            placeholder="Select food item"
            label="Food Item"
            track-by="id"
            name="name"
            data-name="name"
            :allow-empty="false"
        >
          <template
              slot="selection"
              slot-scope="{ values, search, isOpen }"
          >
            <span
                class="multiselect__single"
                v-if="values.length && !isOpen"
            >
              {{ values.length }} options selected
            </span>
          </template>
        </Multiselect>-->

        <!--<h3
            v-if="!showEdit"
            class="beer-item__name"
        >
          {{ item.name }}
        </h3>

        <input
            v-else-if="editable"
            class="beer-item__name-edit"
            v-model="editable.name"
        >-->

        <!--<div class="beer-item__description">Description</div>-->
        <!--<div class="beer-item__tips">Tips</div>-->

        <div class="beer-item__properties">
          <div class="item-properties">
            <div class="item-properties__property item-property">
              <div class="item-property__title">Grams</div>

              <div
                  v-if="!showEdit"
                  class="item-property__value"
              >
                {{ item.grams }}
              </div>

              <input
                  v-else-if="editable"
                  class="item-property__input"
                  min="0"
                  type="number"
                  v-model.number="editable.grams"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="beer-item-manage beer-item__stream-el">
        <button
            v-if="isAdder"
            class="beer-item-manage__item button button--green"
            @click="addItem"
        >
          <span class="button__span">Add</span>
        </button>

        <template v-else>
          <button
              v-if="!isEdit"
              class="beer-item-manage__item button"
              @click="startEditing"
          >
            <span class="button__span">Edit</span>
          </button>

          <button
              v-else
              class="beer-item-manage__item button button--green"
              @click="saveItem"
          >
            <span class="button__span">Save</span>
          </button>

          <button
              v-if="isEdit"
              class="beer-item-manage__item button button--red"
              @click="cancelEditing"
          >
            <span class="button__span">Cancel</span>
          </button>

          <button
              v-else
              class="beer-item-manage__item button button--red"
              @click="$emit('remove', item.id)"
          >
            <span class="button__span">Delete</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import {mapState} from "vuex";
import Multiselect from 'vue-multiselect';

export default {
  name: "FoodDailyItem",
  components: {
    Multiselect,
  },
  props: {
    isAdder: {
      type: Boolean,
      default: false,
    },
    /*selected: {
      type: Object,
      default() {
        return null;
      }
    },*/
    item: {
      type: Object,
      default() {
        return {
          id: 0,
          food_item_id: 0,
          grams: 0,
        };
      },
    },
  },
  data() {
    return {
      isEdit: false,
      editable: null,
    };
  },
  computed: {
    ...mapState('foodItems', [
      'foodItems',
    ]),
    showEdit() {
      return this.isEdit || this.isAdder;
    },
    itemName() {
      if (!this.foodItems || !this.foodItems.length) return '';
      const item = this.foodItems.find(item => item.id === this.item.food_item_id);
      return item.name;
    },
  },
  methods: {
    addItem() {
      const {food_item_id, grams} = this.editable;
      const possibleToAdd = food_item_id && grams;

      if (possibleToAdd) {
        this.$emit('save', this.editable);

        /*this.editable = {
          food_item_id: 0,
          grams: 0,
        };*/
      }
    },
    saveItem() {
      this.$emit('save', this.editable);
      this.isEdit = false;
      this.editable = null;
    },
    startEditing() {
      this.editable = cloneDeep(this.item);
      this.isEdit = true;
    },
    cancelEditing() {
      this.isEdit = false;
      this.editable = null;
    },
    keyListener(event) {
      switch (event.key) {
        case 'Enter':
          if (this.isAdder) {
            this.addItem();
            return;
          }

          this.saveItem();
          return;
        case 'Escape':
          this.cancelEditing();
          return;
      }
    },
  },
  watch: {
    isEdit(value) {
      if (value) {
        addEventListener('keydown', this.keyListener);
        return;
      }

      removeEventListener('keydown', this.keyListener);
    },
  },
  created() {
  },
  mounted() {
    if (this.isAdder) {
      this.editable = cloneDeep(this.item);
      this.isEdit = true;
    }
  },
  beforeDestroy() {
    removeEventListener('keydown', this.keyListener);
  },
}
</script>

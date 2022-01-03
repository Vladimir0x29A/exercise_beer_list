<template>
  <div class="beer-item">
    <div class="beer-item__container">
      <!--<div class="beer-item__id beer-item__stream-el">{{ item.name }}</div>-->

      <div class="beer-item__info beer-item__stream-el">
        <h3
            v-if="!showEdit"
            class="beer-item__name"
        >
          {{ item.name }}
        </h3>

        <input
            v-else-if="editable"
            class="beer-item__name-edit"
            v-model="editable.name"
            ref="name"
        >

        <!--<div class="beer-item__description">Description</div>-->
        <!--<div class="beer-item__tips">Tips</div>-->

        <div class="beer-item__properties">
          <div class="item-properties">
            <div
                v-for="property in properties"
                class="item-properties__property item-property"
            >
              <div class="item-property__title">{{ property.name }}</div>

              <div
                  v-if="!showEdit"
                  class="item-property__value"
              >
                {{ item[property.field] }}
              </div>

              <input
                  v-else-if="editable"
                  class="item-property__input"
                  min="0"
                  type="number"
                  v-model.number="editable[property.field]"
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

export default {
  name: "FoodItem",
  props: {
    isAdder: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default() {
        return {
          id: 0,
          name: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbohydrates: 0,
        };
      },
    },
  },
  data() {
    return {
      isEdit: false,
      editable: null,
      properties: [
        {name: 'Calories',      field: 'calories'},
        {name: 'Proteins',      field: 'proteins'},
        {name: 'Fats',          field: 'fats'},
        {name: 'Carbohydrates', field: 'carbohydrates'},
      ],
    };
  },
  computed: {
    showEdit() {
      return this.isEdit || this.isAdder;
    },
  },
  methods: {
    addItem() {
      const {name, calories, proteins, fats, carbohydrates} = this.editable;
      const possibleToAdd = name && (calories || proteins || fats || carbohydrates);

      if (possibleToAdd) {
        this.$emit('save', this.editable);

        this.editable = {
          name: '',
          calories: 0,
          proteins: 0,
          fats: 0,
          carbohydrates: 0,
        };

        this.$refs.name.focus();
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

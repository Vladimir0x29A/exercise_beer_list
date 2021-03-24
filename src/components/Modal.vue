<template>
  <transition name="anim-overlay">
    <div class="modal-overlay" v-if="isShown">
      <div class="anim-overlay__content modal">
        <div class="modal__container">
          <h3 class="modal__title">Edit</h3>

          <div class="modal__groups">
            <div class="modal__group modal-group">
              <label class="modal-group__label">
                <span class="modal-group__label-title">Name</span>

                <input type="text" class="modal-group__text-edit"
                       v-model="name"
                       ref="firstInput">
              </label>
            </div>

            <div class="modal__group modal-group">
              <label class="modal-group__label">
                <span class="modal-group__label-title">Description</span>
                <textarea class="modal-group__text-edit" v-model="description"></textarea>
              </label>
            </div>

            <div class="modal__group modal-button-group">
              <button class="button modal-button-group__item button--green" @click="save">
                <span class="button__span">Save</span>
              </button>

              <button class="button modal-button-group__item" @click="hide">
                <span class="button__span">Cancel</span>
              </button>
            </div>
          </div>
        </div>

        <button class="modal__close" @click="hide"></button>
      </div>
    </div>
  </transition>
</template>

<script>
import {eventBus} from "@/utils";

export default {
  name: "Modal",
  data: () => ({
    isShown: false,
    id: null,
    name: '',
    description: '',
  }),
  methods: {
    hide() {
      this.isShown = false;
      this.id = null;
      this.name = '';
      this.description = '';
    },
    keyPressHandler({keyCode}) {
      if (this.isShown) {
        if (keyCode === 27) { // 27 = Escape
          this.hide();
        } else if (keyCode === 13) { // 13 = Enter
          this.save();
        }
      }
    },
    save() {
      eventBus.$emit('saveBeerItem', {
        id: this.id,
        name: this.name,
        description: this.description,
      });

      this.hide();
    },
  },
  mounted() {
    eventBus.$on('showModal', payload => {
      const {id, name, description} = payload;

      this.id = id;
      this.name = name;
      this.description = description;

      this.isShown = true;

      this.$nextTick(() => {
        this.$refs.firstInput.focus();
      });
    });

    eventBus.$on('hideModal', () => {
      this.hide();
      document.removeEventListener('keydown', this.keyPressHandler);
    });

    document.addEventListener('keydown', this.keyPressHandler);
  },
}
</script>

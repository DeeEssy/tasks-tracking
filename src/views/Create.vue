<template>
  <div class="row">
    <div class="col s6 offset-s3">
      <h1>Create task</h1>
      <form @submit.prevent="createTask">
        <div class="input-field">
          <input v-model="title" id="title" required type="text" class="validate" />
          <label for="title">Title</label>
          <span class="helper-text" data-error="Required"></span>
        </div>

        <div class="chips chips-placeholder" ref="chips"></div>

        <div class="input-field">
          <textarea id="desc" class="materialize-textarea" v-model="desc"></textarea>
          <label for="desc">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px;">{{ desc.length }}/{{ maxDescLenght }}</span>
        </div>

         <input type="text" ref="datepicker" placeholder="Date" class="datepicker">

        <button class="btn" type="submit">Create task</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Create",
  data() {
    return {
      title: '',
      desc: '',
      maxDescLenght: 2048,
      chips: null,
      date: null
    }
  },
  mounted() {
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: 'Task tags'
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: 'dd.mm.yyyy',
      defaultDate: new Date(),
      setDefaultDate: true
    });
  },
  beforeDestroy() {
    this.destroyed();
  },
  methods: {
    ...mapMutations({
      addTask: 'addTask'
    }),
    createTask() {
      const newTask = {
        title: this.title,
        desc: this.desc,
        id: Date.now(),
        status: 'active',
        tags: this.chips.chipsData,
        date: this.date.date
      };
      this.addTask(newTask);
      this.$router.push('./list');
    },
    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    }
  }
};
</script>

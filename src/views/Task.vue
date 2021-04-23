<template>
  <div>
    <div v-if="currentTask">
      <form @submit.prevent="updateTask">
        <div class="input-field">
          <h4>{{ currentTask.title }}</h4>
        </div>

        <div class="chips chips-placeholder" ref="chips"></div>

        <div class="input-field">
          <textarea
            id="desc"
            style="min-height: 150px"
            class="materialize-textarea"
            v-model="desc"
          ></textarea>
          <label for="desc">Description</label>
          <span class="character-counter" style="float: right; font-size: 12px"
            >{{ desc.length }}/{{ maxDescLenght }}</span
          >
        </div>

        <input
          type="text"
          ref="datepicker"
          placeholder="Date"
          class="datepicker"
        />
        <template v-if="currentTask.status != 'finished'">
          <button class="btn" type="submit">Update task</button>
          <button @click="finishTask" type="button" class="btn">
            Finish task
          </button>
        </template>
      </form>
    </div>
    <template v-else>Task not found</template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getTaskById: "getTaskById",
    }),
    currentTask() {
      return this.getTaskById(+this.$route.params.id);
    },
  },
  data() {
    return {
      desc: "",
      maxDescLenght: 2048,
      chips: null,
      date: null,
    };
  },
  mounted() {
    this.desc = this.currentTask.desc;
    this.chips = M.Chips.init(this.$refs.chips, {
      placeholder: "Task tags",
      data: this.currentTask.tags,
    });
    this.date = M.Datepicker.init(this.$refs.datepicker, {
      format: "dd.mm.yyyy",
      defaultDate: new Date(this.currentTask.date),
      setDefaultDate: true,
    });
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  beforeDestroy() {
    this.destroyed();
  },
  methods: {
    ...mapMutations({
      addTask: "addTask",
      editTask: "editTask",
      completeTask: "completeTask",
    }),
    finishTask() {
      this.completeTask(this.currentTask.id);
      this.$router.push("/list");
    },
    updateTask() {
      this.editTask({
        id: this.currentTask.id,
        desc: this.desc,
        date: this.date.date,
      });
      this.$router.push("/list");
    },
    destroyed() {
      if (this.date && this.date.destroy) {
        this.date.destroy();
      }
      if (this.chips && this.chips.destroy) {
        this.chips.destroy();
      }
    },
  },
};
</script>
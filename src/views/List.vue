<template>
  <div class="list">
    <h1>List</h1>
    <hr />

    <div class="input-field">
      <select ref="select" v-model="filter">
        <option value="" disabled selected>Choose your option</option>
        <option value="active">Active</option>
        <option value="outdated">Outdated</option>
        <option value="finished">Finished</option>
      </select>
      <label>Filter</label>
      <button v-if="filter" class="btn" @click="filter = null">Clear filter</button>
    </div>

    <table v-if="getTasks.length">
      <thead>
        <tr>
          <th>Index</th>
          <th>Title</th>
          <th>Description</th>
          <th>ID</th>
          <th>Status</th>
          <th>Chips</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in filterTasks" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>
            <div class="text">{{ task.desc }}</div>
          </td>
          <td>{{ task.id }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.chips }}</td>
          <td>{{ new Date(task.date).toLocaleDateString() }}</td>
          <td>
            <router-link
              tag="button"
              class="btn btn-small"
              :to="`/task/${task.id}`"
              >Open</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No records to show</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      getTasks: "getTasks",
    }),
    filterTasks() {
      return this.getTasks.filter(el => !this.filter || el.status === this.filter)
    }
  },
  data() {
    return {
      filter: null
    }
  },
  mounted() {
    M.FormSelect.init(this.$refs.select, {});
  }
};
</script>
<style lang="scss" scoped>
td {
  max-width: 400px;
}
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 400px;
  white-space: nowrap;
}
</style>
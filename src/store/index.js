import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: JSON.parse(localStorage.getItem('localTasks') || '[]')
  },
  getters: {
    getTasks: (state) => state.tasks,
    getTaskById: (state) => id => state.tasks.find(t => t.id === id)
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
      localStorage.setItem('localTasks', JSON.stringify(state.tasks));
    },
    editTask(state, {id, desc, date}) {
      const idx = state.tasks.findIndex(t => t.id === id);
      const currentTask = state.tasks[idx];
      const status = new Date(date) > new Date() ? 'active' : 'outdated'

      state.tasks[idx] = { ...currentTask, date: date, desc: desc, status: status }
      //state.tasks[idx] = { ...currentTask, date, desc, status }  тоже самое что выше

      localStorage.setItem('localTasks', JSON.stringify(state.tasks));
    },
    completeTask(state, id) {
      state.tasks.find(t => {
        if(t.id === id) {
          t.status = 'finished'
        }
      });
      localStorage.setItem('localTasks', JSON.stringify(state.tasks));
    }
  },
})

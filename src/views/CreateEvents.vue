<template>
  <div>
    <h1>Create Events {{ user.name }}</h1>
    <p>This event was created by {{ user.id }}</p>
    <p>There are {{ getEventById(2) }} categories</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getEventById']),
    ...mapState(['user', 'categories'])
  }
};
</script>

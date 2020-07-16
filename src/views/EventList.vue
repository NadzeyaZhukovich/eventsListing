<template>
  <div>
    <h1>Events Listening</h1>
    <EventCart v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCart from '@/components/EventCart';
import { mapState } from 'vuex';

export default {
  components: { EventCart },
  created() {
    this.$store.dispatch('fetchEvent');
  },
  computed: mapState(['events'])
};
</script>

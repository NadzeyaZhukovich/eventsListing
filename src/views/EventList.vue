<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCart v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link :to="{ name: 'event-list', query: {page: page -1 }}" rel="prev">Prev Page</router-link> |
    </template>

    <template v-if="event.eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: {page: page +1 }}" rel="next">Next Page</router-link>
    </template>

  </div>
</template>

<script>
import EventCart from '@/components/EventCart';
import { mapState } from 'vuex';

export default {
  components: { EventCart },
  created() {
    this.$store.dispatch('event/fetchEvent', {
      perPage: 3,
      page: this.page
    });
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user'])
  }
};
</script>

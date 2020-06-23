<template>
  <div>
    <h1>Events Listening</h1>
    <EventCart v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCart from '@/components/EventCart';
import EventService from "../services/EventService";

export default {
  components: { EventCart },
  data() {
    return {
      events: []
    };
  },
  created() {
    EventService.getEvents()
      .then(responce => {
        this.events = responce.data
      })
      .catch( error => {
        console.log('There was an error:' + error.response)
      })
  }
};
</script>

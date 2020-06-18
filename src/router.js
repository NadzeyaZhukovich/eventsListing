import Vue from 'vue';
import Router from 'vue-router';
import EventList from './views/EventList';
import EventShow from './views/EventShow';
import EventCreate from './views/CreateEvents';

Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate
    }
  ]
});

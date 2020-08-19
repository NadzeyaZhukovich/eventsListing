import EventService from '@/services/EventService';

export const namespaced = true;

export const state = {
  events: [],
  eventsTotal: 0,
  event: {}
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENT(state, events) {
    state.events = events;
  },
  SET_EVENT_BY_ID(state, eventId) {
    state.event = eventId;
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal;
  }
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event);
        const notification = {
          type: 'success',
          message: 'Your event has benn created!'
        };
        dispatch('notification/add', notification, { root: true });
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
        throw error;
      });
  },
  fetchEvent({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
      .then(responce => {
        commit('SET_EVENTS_TOTAL', responce.headers['x-total-count']);
        commit('SET_EVENT', responce.data);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events: ' + error.message
        };
        dispatch('notification/add', notification, { root: true });
      });
  },
  fetchEventById({ commit, getters, dispatch }, eventId) {
    let event = getters.getEventById(eventId);
    if (event) {
      commit('SET_EVENT', event);
    } else {
      EventService.getEvent(eventId)
        .then(response => {
          commit('SET_EVENT_BY_ID', response.data);
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There was a problem fetching events: ' + error.message
          };
          dispatch('notification/add', notification, { root: true });
        });
    }
  }
};

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id);
  }
};

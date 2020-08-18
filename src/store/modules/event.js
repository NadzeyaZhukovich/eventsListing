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
    createEvent({ commit, dispatch, rootState }, event) {
        console.log('User creating Event is' + rootState.user.user.name)
        dispatch('moduleName/actionToCall', null, { root: true })
        return EventService.postEvent(event).then(() => {
            commit('ADD_EVENT', event);
        });
    },
    fetchEvent({ commit }, { perPage, page }) {
        EventService.getEvents(perPage, page)
            .then(responce => {
                commit('SET_EVENTS_TOTAL', responce.headers['x-total-count']);
                commit('SET_EVENT', responce.data);
            })
            .catch( error => {
                console.log('There was an error:' + error.response);
            })
    },
    fetchEventById({ commit, getters }, eventId) {
        let event =getters.getEventById(eventId);
        if(event) {
            commit('SET_EVENT', event);
        } else {
            EventService.getEvent(eventId)
                .then(response => {
                    commit('SET_EVENT_BY_ID', response.data);
                })
                .catch(error => {
                    console.log('There was an error:', error.response);
                });
        }
    }
};

export const getters = {
    getEventById: state => id => {
        return state.events.find(event => event.id === id);
    }
}
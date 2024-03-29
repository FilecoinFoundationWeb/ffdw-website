// ///////////////////////////////////////////////////////////////////// Imports
// -----------------------------------------------------------------------------
import GeneralSiteData from '@/content/pages/general.json'
import Settings from '@/content/data/settings.json'

// /////////////////////////////////////////////////////////////////////// State
// -----------------------------------------------------------------------------
const state = () => ({
  siteContent: {},
  modal: false,
  jobPostings: {},
  slateCollections: false,
  navigationOpen: false,
  page404: false
})

// ///////////////////////////////////////////////////////////////////// Getters
// -----------------------------------------------------------------------------
const getters = {
  siteContent: state => state.siteContent,
  modal: state => state.modal,
  jobPostings: state => state.jobPostings,
  slateCollections: state => state.slateCollections,
  navigationOpen: state => state.navigationOpen,
  page404: state => state.page404
}

// ///////////////////////////////////////////////////////////////////// Actions
// -----------------------------------------------------------------------------
const actions = {
  // //////////////////////////////////////////////////////////////// clearStore
  clearStore ({ commit }) {
    commit('CLEAR_STORE')
  },
  // /////////////////////////////////////////////////////////////// getBaseData
  async getBaseData ({ commit }, payload) {
    const key = typeof payload === 'string' ? payload : payload.key
    let data = false
    switch (key) {
      case 'general': data = GeneralSiteData; break
      case 'settings': data = Settings; break
      default : data = payload.data; break
    }
    if (data) {
      await this.dispatch('global/setSiteContent', { key, data })
    }
  },
  // ////////////////////////////////////////////////////////// getLeverPostings
  async getLeverPostings ({ commit }) {
    const response = await fetch('https://api.lever.co/v0/postings/filecoin?mode=json')
    try {
      const postings = await response.json()
      if (postings) {
        await this.dispatch('global/setJobPostings', postings)
      }
    } catch (error) {
      console.log(error)
    }
  },
  // //////////////////////////////////////////////////////////// setSiteContent
  setSiteContent ({ commit }, payload) {
    commit('SET_SITE_CONTENT', payload)
  },
  // ////////////////////////////////////////////////////////////////// setModal
  setModal ({ commit }, payload) {
    commit('SET_MODAL', payload)
  },
  async getSlateVideos ({ commit }) {
    try {
      const response = await this.$axios.get('https://slate.host/api/v2/get', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.$config.slateKey
        }
      })
      const collections = response.data.collections
      commit('GET_SLATE_VIDEOS', collections)
    } catch (e) {
      console.log('========================================== [getSlateVideos]')
      console.log(e)
      return false
    }
  },
  // //////////////////////////////////////////////////////////// setJobPostings
  setJobPostings ({ commit }, payload) {
    commit('SET_JOB_POSTINGS', payload)
  },
  // ///////////////////////////////////////////////////////// setNavigationOpen
  setNavigationOpen ({ commit }, toggle) {
    commit('SET_NAVIGATION_OPEN', toggle)
  },
  // //////////////////////////////////////////////////////////////// setPage404
  setPage404 ({ commit }, toggle) {
    commit('SET_PAGE_404', toggle)
  }
}

// /////////////////////////////////////////////////////////////////// Mutations
// -----------------------------------------------------------------------------
const mutations = {
  CLEAR_STORE (state) {
    state.siteContent = {}
  },
  SET_SITE_CONTENT (state, payload) {
    state.siteContent[payload.key] = payload.data
  },
  SET_MODAL (state, payload) {
    state.modal = payload
  },
  SET_JOB_POSTINGS (state, payload) {
    state.jobPostings = payload
  },
  GET_SLATE_VIDEOS (state, collections) {
    state.slateCollections = collections
  },
  SET_NAVIGATION_OPEN (state, toggle) {
    state.navigationOpen = toggle
  },
  SET_PAGE_404 (state, toggle) {
    state.page404 = toggle
  }
}

// ////////////////////////////////////////////////////////////////////// Export
// -----------------------------------------------------------------------------
export default {
  state,
  getters,
  actions,
  mutations
}

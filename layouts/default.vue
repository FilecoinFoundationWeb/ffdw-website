<template>
  <div class="master-container">

    <nuxt />

    <SiteFooter />

  </div>
</template>

<script>
// ===================================================================== Imports
import { mapGetters, mapActions } from 'vuex'

import SiteFooter from '@/components/SiteFooter'

const scrollToAnchor = (instance) => {
  const hash = instance.$route.hash.replace('#', '')
  if (hash) {
    const element = document.getElementById(hash) || document.querySelector(`[data-id='${hash}']`)
    if (element) {
      instance.$scrollToElement(element, 0, -10)
    }
  }
}

// ====================================================================== Export
export default {
  name: 'LayoutDefault',

  components: {
    SiteFooter
  },

  computed: {
    ...mapGetters({
      navigationOpen: 'global/navigationOpen'
    })
  },

  watch: {
    '$route' (newVal, oldVal) {
      this.setNavigationOpen(false)
      if (newVal.fullPath !== oldVal.fullPath) {
        const timeout = setTimeout(() => {
          scrollToAnchor(this)
          clearTimeout(timeout)
        }, 50)
      }
    },
    navigationOpen (state) {
      if (state) {
        document.body.classList.add('no-scroll')
      } else {
        document.body.classList.remove('no-scroll')
      }
    }
  },

  mounted () {
    const timeout = setTimeout(() => {
      scrollToAnchor(this)
      clearTimeout(timeout)
    }, 50)
  },

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    })
  }
}
</script>

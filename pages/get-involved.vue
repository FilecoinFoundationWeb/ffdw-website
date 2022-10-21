<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

    <CareersBlock
      :theme="careersTheme"
      :force-heading="careersHeading" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import GetInvolvedPageData from '@/content/pages/get-involved.json'
import SharedData from '@/content/data/shared.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CareersBlock from '@/components/CareersBlock'

// ====================================================================== Export
export default {
  name: 'PageGetInvolved',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    CareersBlock
  },

  data () {
    return {
      tag: 'get-involved'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'get-involved', data: GetInvolvedPageData })
    await store.dispatch('global/getBaseData', { key: 'careers_data', data: SharedData.careers })
    await store.dispatch('global/getLeverPostings')
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    pageData () {
      return this.siteContent[this.tag]
    },
    sections () {
      return this.pageData.page_content
    },
    header () {
      return this.pageData.header
    },
    careers () {
      return this.pageData.careers
    },
    careersTheme () {
      return this.careers.theme
    },
    careersHeading () {
      return this.careers.heading || false
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro_1 {
  padding-top: 12rem;
  padding-bottom: 0;
  @include mini {
    padding-top: 5rem;
  }
  .text-block {
    margin-top: -10rem;
    @include mini {
      margin-top: 10rem;
    }
    @include tiny {
      margin-top: 5rem;
    }
  }
  .image-block {
    @include mini {
      margin-top: 0;
    }
    .image {
      @include mini {
        position: relative;
        width: calc(100% + 2rem);
        left: -1rem;
      }
    }
  }
}

::v-deep #intro_2 {
  padding-top: 3rem;
  .image-block {
    @include mini {
      margin-bottom: 3rem;
    }
  }
}

::v-deep #intro_3 {
  padding: 0;
  .card-list-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card {
    margin-bottom: 5rem;
    width: calc(50% - #{math.div($containerWidth, 24)});
    @include mini {
      width: 100%;
    }
    &:nth-child(odd) {
      margin-right: math.div($containerWidth, 12);
      @include mini {
        margin-right: 0;
      }
    }
    .title {
      @include fontSize_Medium;
      margin-bottom: 1rem;
      @include mini {
        @include fontSize_Regular;
        @include leading_Regular;
      }
    }
    .description {
      @include p3;
    }
    .icon-after.arrow-down {
      svg {
        width: 0.75rem;
        transform: rotate(-90deg);
        rect {
          fill: $greenYellow;
        }
      }
    }
  }
}

::v-deep #callout {
  padding-bottom: 0;
  @include small {
    padding-top: 0;
  }
}

::v-deep #grants {
  padding-bottom: 0;
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    @include small {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }
  .text-block {
    @include small {
      margin-top: 3rem;
    }
  }
}

::v-deep #grants_accordion {
  padding-bottom: 7rem;
}
</style>

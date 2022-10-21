<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

    <CareersBlock theme="purple" />

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import AboutPageData from '@/content/pages/about.json'
import SharedData from '@/content/data/shared.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CareersBlock from '@/components/CareersBlock'

// ====================================================================== Export
export default {
  name: 'PageAbout',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    CareersBlock
  },

  data () {
    return {
      tag: 'about'
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'about', data: AboutPageData })
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
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro {
  padding-top: 9rem;
  .text-block {
    @include mini {
      margin-top: 10rem;
    }
    .heading {
      font-size: 3.0625rem;
      @include mini {
        font-size: 1.875rem; // 30pt
        line-height: 2.8125rem; // 45pt
      }
      @include tiny {
        width: calc(100vw - 100vw * 0.14);
      }
    }
  }
  .image-block {
    margin-top: 3rem;
    @include mini {
      margin-top: 0;
    }
    .image {
      @include mini {
        position: relative;
        width: calc(100% + 3rem);
        left: -2rem;
      }
    }
  }
}

::v-deep #intro_2 {
  padding-top: 0;
  padding-bottom: 3rem;
  .image-block {
    margin-top: -5rem;
    @include mini {
      margin-top: 0;
      margin-bottom: 3rem;
    }
  }
}

::v-deep #vision {
  padding: 0;
}

::v-deep #vision_2 {
  [data-block-id="col_1"] {
    .image-block {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 2.5rem;
        height: 2.5rem;
        background-color: $haiti;
      }
    }
  }
  [data-block-id="col_2"] {
    .text-block {
      padding: 0 2.5rem;
      @include mini {
        padding: 0;
        margin: 3rem 0;
      }
    }
  }
  [data-block-id="col_3"] {
    .column-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 100%;
    }
    .image-block {
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: 2.5rem;
        height: 2.5rem;
        background-color: $haiti;
      }
    }
  }
}

::v-deep #board,
::v-deep #advisors_1 {
  padding: 0;
}

::v-deep #advisors_2 {
  .card-list-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .card {
      width: 50%;
      &:nth-child(even) {
        &:after {
          display: none;
        }
      }
      &:nth-last-child(2) {
        &:after {
          height: 4px;
        }
      }
      .content {
        @include customMaxMQ ($containerWidth + 4rem) {
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          .image {
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 1rem;
          }
          .title {
            align-items: center;
          }
          .title-text,
          .title-suffix {
            text-align: center;
          }
        }
        @include small {
          padding: 2rem 1rem;
          .image {
            width: 6.25rem;
            height: 6.25rem;
          }
          .title-text {
            @include fontSize_Small;
            @include leading_Regular;
          }
          .title-suffix {
            @include fontSize_Tiny;
            @include leading_Small;
          }
        }
      }
    }
  }
}
</style>

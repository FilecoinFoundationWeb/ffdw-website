<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <BlockBuilder :sections="sections" />

    <section id="featured-post-list">
      <CardListBlock :block="{ cards: featuredPosts }" />
      <Button :button="viewAllButton" />
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import SettingsData from '@/content/data/settings.json'
import IndexPageData from '@/content/pages/index.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CardListBlock from '@/components/CardListBlock'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'PageIndex',

  components: {
    Modal,
    HeaderSelector,
    BlockBuilder,
    CardListBlock,
    Button
  },

  async asyncData ({ $content }) {
    const blogPosts = await $content('blog')
      .without(['body'])
      .sortBy('date', 'desc')
      .limit(3)
      .fetch()
    return { blogPosts }
  },

  data () {
    return {
      tag: 'index',
      blogPosts: []
    }
  },

  async fetch ({ store, $content }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'settings', data: SettingsData })
    await store.dispatch('global/getBaseData', { key: 'index', data: IndexPageData })
    await store.dispatch('global/getSlateVideos')
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
    featuredPosts () {
      const arr = []
      const len = this.blogPosts.length
      for (let i = 0; i < len; i++) {
        const post = this.blogPosts[i]
        const card = {
          type: 'B',
          action: 'nuxt-link',
          url: `/${post.slug}`,
          img: post.image,
          title: post.title,
          date: post.date || post.updatedAt,
          tags: post.tags,
          theme: 'purple-green',
          direction: i % 2 ? 'reverse' : 'forward'
        }
        arr.push(card)
      }
      return arr
    },
    viewAllButton () {
      return {
        type: 'C',
        action: 'nuxt-link',
        text: 'View All',
        url: '/blog'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep .header-selector .content {
  @include small {
    padding-right: 2rem;
  }
  @include mini {
    padding-right: 3rem;
  }
  @include tiny {
    padding-right: 4rem;
  }
}

::v-deep #about_1 {
  padding-top: 12rem;
  @include small {
    padding-top: 5rem;
  }
  .text-block {
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2.5rem;
      @include containerMaxMQ {
        height: 1rem;
      }
    }
    &:before {
      width: 2.5rem;
      top: 1rem;
      left: 100%;
      background-color: $perfume;
      @include containerMaxMQ {
        top: 3rem;
        left: calc(100vw - 6.25rem - 1rem);
        width: 1rem;
      }
    }
    &:after {
      width: calc((100vw - #{math.div($containerWidth, 12) * 10}) / 2 + 2.5rem + 0.5rem); // 100vw - grid(10-col) + col gutter + :after width
      top: 3.5rem;
      left: calc(100% + 2.5rem);
      background-color: $greenYellow;
      @include medium {
        width: calc(#{math.div($containerWidth, 12) * 2} + 7% + 2.5rem + 0.5rem);
      }
      @include containerMaxMQ {
        width: 6.25rem;
        top: 4rem;
        left: calc(100vw - 6.25rem);
      }
    }
  }
}

::v-deep #callout {
  @include medium {
    padding-bottom: 0;
  }
  @include small {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
}

::v-deep #intro_1 {
  padding-top: 2rem;
  padding-bottom: 0;
  .image-block {
    padding: 0 3rem;
  }
}

::v-deep #intro_2 {
  padding-top: 2rem;
  [data-block-id="col_2"] {
    @include mini {
      order: 1;
      .column-content {
        margin-top: 5rem;
      }
    }
  }
}

::v-deep #explore_1 {
  [class~="grid"],
  [class*="grid-"],
  [class*="grid_"] {
    @include mini {
      flex-direction: column-reverse;
    }
  }
  .text-block {
    @include mini {
      margin-top: 3rem;
    }
    .description {
      padding-right: 4rem;
      @include mini {
        padding-right: 0;
      }
    }
  }
}

::v-deep #accordion_1 {
  padding: 0;
  @include small {
    padding-bottom: 3rem;
  }
  .accordion-block {
    &:before {
      content: '';
      position: absolute;
      width: 20rem;
      height: 7rem;
      top: 20%;
      right: calc(100% + #{math.div($containerWidth, 12) * 3});
      background-color: $perfume;
    }
  }
  .text-block {
    .button-row {
      justify-content: flex-end;
    }
  }
}

::v-deep #grants {
  [data-block-id="image_left"] {
    .image-block {
      &:before {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: calc(50% + 3rem);
        top: -3rem;
        right: 100%;
        background-color: $greenYellow;
      }
    }
  }
  .text-block {
    padding: 0 2.25rem;
    @include small {
      padding: 0 1rem;
      &:before {
        content: '';
        position: absolute;
        width: 1.25rem;
        height: calc(50% + 3rem);
        top: -3rem;
        right: 100%;
        background-color: $greenYellow;
      }
      &:after {
        content: '';
        position: absolute;
        width: 1.25rem;
        height: calc(20% + 3rem);
        bottom: -3rem;
        left: 100%;
        background-color: $perfume;
      }
    }
  }
  [data-block-id="image_right"] {
    .image-block {
      &:before,
      &:after {
        content: '';
        position: absolute;
        width: 2.5rem;
      }
      &:before {
        height: calc(20% + 3rem);
        bottom: -3rem;
        left: 100%;
        background-color: $perfume;
      }
      &:after {
        height: 2.5rem;
        bottom: 0;
        right: 0;
        background-color: $haiti;
      }
    }
  }
}

::v-deep #spotlight {
  padding-top: 7rem;
  padding-bottom: 10rem;
  @include small {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  @include mini {
    padding-bottom: 2rem;
  }
  .video-block {
    @include small {
      margin-bottom: 5rem;
    }
    .preview-container {
      &:before,
      &:after {
        content: '';
        position: absolute;
        right: 100%;
        width: 2.5rem;
        @include mini {
          width: 1.25rem;
        }
      }
      &:before {
        top: 30%;
        height: 2.5rem;
        background-color: $greenYellow;
        @include mini {
          height: 1.25rem;
        }
      }
      &:after {
        bottom: -5rem;
        height: calc(50%);
        background-color: $perfume;
      }
    }
    .metadata {
      display: none;
    }
    .title {
      display: none;
    }
    .subtext {
      @include fontSize_Tiny;
      @include fontWeight_Regular;
      @include leading_Regular;
      text-transform: none;
    }
  }
}

::v-deep #featured-post-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  .button {
    margin-top: 3rem;
  }
}
</style>

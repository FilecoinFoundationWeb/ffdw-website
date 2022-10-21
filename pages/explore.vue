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
import ExplorePageData from '@/content/pages/explore.json'

import Modal from '@/components/Modal'
import HeaderSelector from '@/components/HeaderSelector'
import BlockBuilder from '@/components/BlockBuilder'
import CardListBlock from '@/components/CardListBlock'
import Button from '@/components/Button'

// ====================================================================== Export
export default {
  name: 'PageExplore',

  components: {
    Modal,
    BlockBuilder,
    HeaderSelector,
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
      tag: 'explore',
      blogPosts: []
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'settings', data: SettingsData })
    await store.dispatch('global/getBaseData', { key: 'explore', data: ExplorePageData })
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
      return this.siteContent[this.tag].page_content
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
          theme: 'red-green',
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
$gutter: calc((100% - #{$containerWidth}) / 2);

// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #learn_1 {
  padding-bottom: 0;
}

::v-deep #learn_2 {
  padding-bottom: 0;
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
        background-color: $coralRed;
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
        height: calc(20% + 4rem);
        top: calc(100% - 2.5rem);
        left: 100%;
        background-color: $coralRed;
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

::v-deep #learn_3 {
  padding-top: 4rem;
  padding-bottom: 2rem;
  @include small {
    padding-top: 2rem;
  }
  .text-block {
    @include small {
      padding: 0 1rem;
    }
  }
}

::v-deep #videos_2 {
  padding-top: 0;
  @include mini {
    padding-bottom: 0;
  }
  .slate-list-block {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &:before {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 100%;
      width: 2.5rem;
      height: 2.5rem;
      background-color: $greenYellow;
      z-index: 10;
      @include mini {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
  .video-block {
    position: relative;
    margin-bottom: 5.625rem;
    width: calc(50% - 0.5rem);
    @include mini {
      width: 100%;
    }
    &:after {
      content: '';
      position: absolute;
      top: calc(100% + 1rem);
      left: 0;
      width: 10rem;
      height: 5px;
      background-color: $cararra;
    }
    &:nth-child(odd) {
      margin-right: 1rem;
      @include mini {
        margin-right: 0;
      }
    }
    &:nth-child(4n+1),
    &:nth-child(4n+2),
    &:nth-child(4n+3) {
      .preview-container:before {
        opacity: 1;
      }
    }
    &:nth-child(4n+1) {
      .preview-container:before {
        top: 0;
        left: 0;
      }
    }
    &:nth-child(4n+2) {
      .preview-container:before {
        bottom: 0;
        right: 0;
      }
    }
    &:nth-child(4n+3) {
      .preview-container:before {
        top: 0;
        right: 0;
      }
    }
    &:nth-child(even):last-child {
      .preview-container {
        &:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 100%;
          width: 2.5rem;
          height: 2.5rem;
          background-color: $coralRed;
          @include mini {
            width: 1.25rem;
            height: 1.25rem;
          }
        }
      }
    }
    .preview-container {
      &:before {
        content: '';
        position: absolute;
        width: 2.5rem;
        height: 2.5rem;
        background-color: $haiti;
        opacity: 0;
        z-index: 10;
        @include mini {
          width: 1.25rem;
          height: 1.25rem;
        }
      }
    }
    .metadata {
      @include fontSize_Tiny;
    }
    .subtext {
      display: none;
    }
  }
}

::v-deep #callout {
  padding-bottom: 0;
  @include containerMaxMQ {
    padding-bottom: 5rem;
  }
  @include mini {
    padding-bottom: 3rem;
  }
}

::v-deep #tutorials_1 {
  padding-top: 0;
  .text-block {
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2.5rem;
    }
    &:before {
      left: calc(100% + 5rem);
      bottom: calc(2.5rem + 1rem);
      width: 2.5rem;
      background-color: $coralRed;
    }
    &:after {
      left: calc(100% + 5rem + 2.5rem);
      bottom: 1rem;
      width: 25rem;
      background-color: $greenYellow;
    }
  }
}

::v-deep #tutorials_2 {
  padding-top: 2rem;
  padding-bottom: 10rem;
  @include small {
    padding-bottom: 3rem;
  }
  .card-list-block {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card {
    margin-bottom: 5rem;
    width: calc(50% - #{math.div($containerWidth, 12)});
    @include mini {
      width: 100%;
    }
    &:nth-child(odd) {
      margin-right: math.div($containerWidth, 6);
      @include mini {
        margin-right: 0;
      }
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

::v-deep #latest_news {
  position: relative;
  @include small {
    padding-top: 0;
  }
  &:before {
    @include gradient_Background_RedGreen;
    content: '';
    position: absolute;
    bottom: 100%;
    left: calc(50% - #{math.div($containerWidth, 2)} - #{$gutter});
    width: $gutter;
    height: 7rem;
    @include small {
      display: none;
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

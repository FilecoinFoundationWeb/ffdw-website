<template>
  <div :class="[`page page-${tag}`]">

    <Modal />

    <HeaderSelector :header="header" />

    <section id="section-search">
      <div class="grid-middle">

        <div class="col-6_sm-5_mi-12">
          <div class="search-query">
            <span v-if="filterValue">Showing results for </span>
            {{ searchString }}
          </div>
        </div>

        <div class="col-5_sm-6_mi-12" data-push-left="off-1_mi-0">
          <Zero_Core__FilterBar
            id="zero-filter-bar"
            :filter-value="filterValue"
            placeholder="SEARCH"
            action="store">
            <template #icon>
              <div class="search-icon"></div>
            </template>
          </Zero_Core__FilterBar>
        </div>

      </div>
    </section>

    <section id="post-list">
      <PaginatedCards :block="paginatedCardsBlock" />
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import SettingsData from '@/content/data/settings.json'
import BlogPageData from '@/content/pages/blog.json'

import Modal from '@/components/Modal'
import PaginatedCards from '@/components/PaginatedCards'
import HeaderSelector from '@/components/HeaderSelector'

// ====================================================================== Export
export default {
  name: 'PageBlog',

  components: {
    Modal,
    PaginatedCards,
    HeaderSelector
  },

  async asyncData ({ $content }) {
    const blogPosts = await $content('blog')
      .without(['body'])
      .sortBy('date', 'desc')
      .fetch()
    return { blogPosts }
  },

  data () {
    return {
      tag: 'blog',
      blogPosts: []
    }
  },

  async fetch ({ store }) {
    await store.dispatch('global/getBaseData', 'general')
    await store.dispatch('global/getBaseData', { key: 'settings', data: SettingsData })
    await store.dispatch('global/getBaseData', { key: 'blog', data: BlogPageData })
  },

  head () {
    return this.$CompileSeo(this.$GetSeo(this.tag))
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      filterValue: 'core/filterValue'
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
    searchString () {
      return this.filterValue ? `'${this.filterValue}'` : ''
    },
    posts () {
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
    paginatedCardsBlock () {
      return {
        cards: this.posts,
        displayControls: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// /////////////////////////////////////////////////////////////////// Specifics
::v-deep #intro {
  .image {
    position: relative;
    margin-top: 9.5rem;
  }
  .image-block {
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: calc(100% - 0.5rem);
      width: 2.3125rem;
      height: 2.3125rem;
      transform: translateY(-100%);
      background-color: $greenYellow;
    }
  }
}

#section-search {
  margin-top: 7.5rem;
  margin-bottom: 2rem;
}

.search-query {
  @include fontWeight_Semibold;
  @include fontSize_Medium;
  color: $cararra;
  line-height: 1.6;
  margin-top: 1rem;
}

::v-deep #zero-filter-bar {
  background-color: $haiti;
  border: solid 0.125rem white;
  padding: 0.25rem 0.5rem;
  height: unset;
  width: 50%;
  right: 0;
  position: relative;
  margin-left: auto;
  margin-right: 0 !important;
  transition: 250ms ease;
  @include mini {
    margin-top: 2rem;
  }
  &.focused {
    width: 100%;
  }
  &:before {
    content: '';
    position: absolute;
    top: -0.125rem;
    left: -1.5rem;
    width: 1.5rem;
    height: calc(50% + 0.125rem);
    background-color: $haiti;
    border: inherit;
    border-right: none;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    right: -1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    border: inherit;
  }
}

::v-deep .input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
  background-color: $haiti;
  outline: 0;
  color: $cararra;
  margin-left: 0.5rem;
  text-transform: uppercase;
  @include fontWeight_Bold;
  font-size: 14px;
  letter-spacing: 0.05em;
  &::placeholder {
    font-size: 14px;
    color: $cararra;
    @include fontWeight_Bold;
    letter-spacing: 0.05em;
  }
}

::v-deep .search-icon {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='21.414' height='21.414' viewBox='0 0 21.414 21.414'%3e%3cg fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-width='2'%3e%3ccircle cx='8.5' cy='8.5' r='8.5' stroke='none'/%3e%3ccircle cx='8.5' cy='8.5' r='7.5' fill='none'/%3e%3c/g%3e%3cline x2='6' y2='6' transform='translate(14 14)' fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-width='2'/%3e%3c/svg%3e");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 1.125rem;
  background-color: $haiti;
  width: 100%;
  height: 100%;
}

::v-deep .card-list-block {
  width: 100%;
}
</style>

<template>
  <component
    :is="element"
    :to="element === 'nuxt-link' ? url : undefined"
    :href="element === 'a' ? url : undefined"
    :target="target"
    :class="[`card type__${type} theme__${theme} size__${size}`, { 'with-image': img, 'is-link': element !== 'div' }]">

    <!-- =============================== Only used for marquee functionality -->
    <!-- ========================== Must be a copy of the base content block -->
    <!-- <div v-if="type === 'B'" :class="['content', direction]">

      <img :src="img" class="image" />

      <div class="panel-text">
        <div v-if="title" class="title">
          {{ title }}
          <span v-if="titleSuffix" class="title-suffix">
            {{ titleSuffix }}
          </span>
        </div>
        <div class="info-wrapper">
          <div v-if="date" class="date" v-html="getDate('small')" />
          <div class="long-arrow-right">
            <IconLongArrowRight />
          </div>
        </div>
      </div>

    </div> -->

    <!-- =========================================================== Content -->
    <div :class="['content', direction]">

      <img :src="img" class="image" />

      <div class="panel-text">

        <div
          v-if="dateBefore"
          class="date-before"
          v-html="getDate(dateBefore, 'short')" />

        <div v-if="label" class="label">
          {{ label }}
        </div>

        <div v-if="title" class="title">
          <div v-if="icon" class="icon">
            <IconPixelHeart v-if="icon === 'pixel-heart'" />
            <IconPixelTwitter v-if="icon === 'pixel-twitter'" />
            <IconPixelGhost v-if="icon === 'pixel-ghost'" />
            <IconPixelDino v-if="icon === 'pixel-dino'" />
          </div>
          <span class="title-text">
            {{ title }}
          </span>
          <span v-if="titleSuffix" class="title-suffix">
            {{ titleSuffix }}
          </span>
        </div>

        <div
          v-if="description"
          class="description"
          v-html="description" />

        <div
          v-if="ctas && Array.isArray(ctas)"
          class="button-row">

          <Button
            v-for="(cta, index) in ctas"
            :key="index"
            :button="cta" />

        </div>

        <div class="info-wrapper">
          <div class="metadata">
            <span
              v-if="date"
              class="date"
              v-html="getDate(date, 'long')" />
            <template v-if="tags">
              <span class="bar">|</span>
              <span
                v-for="tag in tags"
                :key="tag"
                class="tag">
                {{ tag }}
              </span>
            </template>
          </div>
          <div class="long-arrow-right">
            <IconLongArrowRight />
          </div>
        </div>

      </div>

    </div>

    <div class="background" />

  </component>
</template>

<script>
// ====================================================================== Import
import Button from '@/components/Button'

import IconLongArrowRight from '@/components/icons/LongArrowRight'
import IconPixelHeart from '@/components/icons/PixelHeart'
import IconPixelTwitter from '@/components/icons/PixelTwitter'
import IconPixelGhost from '@/components/icons/PixelGhost'
import IconPixelDino from '@/components/icons/PixelDino'

// ====================================================================== Export
export default {
  name: 'Card',

  components: {
    Button,
    IconLongArrowRight,
    IconPixelHeart,
    IconPixelTwitter,
    IconPixelGhost,
    IconPixelDino
  },

  props: {
    card: {
      type: Object,
      required: true
    },
    forceImageType: {
      type: String,
      required: false,
      default: 'img'
    }
  },

  computed: {
    type () {
      return this.card.type
    },
    size () { // 'full' or 'compact'
      return this.card.size || 'full'
    },
    action () {
      return this.card.action || 'div'
    },
    element () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'div'; break
      }
      return tag
    },
    target () {
      return this.card.target || false
    },
    url () {
      return this.card.url
    },
    img () {
      return this.card.img
    },
    label () {
      return this.card.label
    },
    icon () {
      return this.card.icon
    },
    title () {
      return this.card.title
    },
    titleSuffix () {
      return this.card.title_suffix
    },
    description () {
      return this.card.description
    },
    date () {
      return this.card.date
    },
    dateBefore () {
      return this.card.date_before
    },
    direction () {
      return this.card.direction || 'forward'
    },
    theme () {
      return this.card.theme
    },
    tags () {
      const tags = this.card.tags
      return tags && Array.isArray(tags) ? tags : false
    },
    ctas () {
      return this.card.ctas
    }
  },

  methods: {
    getDate (date, format) {
      const start = this.$moment.utc(new Date(date))
      if (format === 'long') { return `${start.format('MMMM DD YYYY')}` }
      if (format === 'short') { return `${start.format('MM/D/YYYY')}` }
      return ''
    },
    shortenString (string, n) {
      const chars = string.split('')
      if (chars.length > n) {
        const shortened = chars.slice(0, n)
        return `${shortened.join('')}...`
      }
      return chars.join('')
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// Content
.card {
  position: relative;
  display: block;
  &:first-child:before,
  &:last-child:after {
    height: 4px;
  }
  &:first-child:before {
    top: -2px;
  }
  &:last-child:after {
    bottom: -2px;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    height: 2px;
    width: 100%;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  opacity: 0;
  transition: 250ms ease-in-out;
}

.content {
  display: flex;
  flex-direction: row;
  position: relative;
  z-index: 10;
  @include mini {
    flex-direction: column;
  }
  &.reverse {
    flex-direction: row-reverse;
    @include mini {
      flex-direction: column;
    }
  }
}

.panel-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.long-arrow-right {
  display: none;
}

// ////////////////////////////////////////////////////////////////////// Themes
.card {
  &.theme__purple-green {
    &:before, &:after,
    .background,
    .tag {
      @include gradient_Background_PurpleGreen;
    }
  }
  &.theme__red-purple {
    &:before, &:after,
    .background,
    .tag {
      @include gradient_Background_RedPurple;
    }
  }
  &.theme__red-green {
    &:before, &:after,
    .background,
    .tag {
      @include gradient_Background_RedGreen;
    }
  }
}

// ////////////////////////////////////////////////////////////////// Variations
// --------------------------------------------------------------- [Type] Common
.card {
  &.type__A,
  &.type__B,
  &.type__C {
    .title {
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        width: 1.5rem;
        margin-right: 1rem;
        svg {
          display: block;
        }
      }
    }
  }
  &.type__A,
  &.type__B {
    &:hover,
    &:focus-visible, {
      color: $haiti;
      .background {
        opacity: 1;
      }
    }
    .content {
      padding: 1rem calc((100% - #{$containerWidth}) / 2 + 0.5rem);
      @include containerMaxMQ {
        padding: 2rem calc(100vw * 0.07);
      }
    }
    .title,
    .date,
    .bar,
    .tag,
    .image {
      transition: 250ms ease-in-out;
    }
  }
}

// -------------------------------------------------------------------- [Type] A
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.card.type__A {
  &.size__compact {
    &:nth-child(odd) {
      .content {
        padding-left: calc((100vw - #{$containerWidth}) / 2 + 0.5rem);
        padding-right: 1rem;
      }
      &:before,
      &:after {
        width: 100vw;
      }
    }
    &:nth-child(even) {
      .content {
        padding-right: calc((100vw - #{$containerWidth}) / 2 + 0.5rem);
        padding-left: 1rem;
      }
    }
    .content {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
      &.reverse {
        .image {
          margin-right: 0;
          margin-left: 2rem;
        }
      }
    }
    .image {
      width: 9rem;
      height: 9rem;
      margin-right: 2rem;
    }
    .title {
      @include p1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      white-space: normal;
    }
    .title-suffix {
      @include fontWeight_Regular;
    }
  }
  .content {
    align-items: center;
    &.forward {
      justify-content: flex-start;
    }
    &.reverse {
      .image {
        margin-right: 0;
        margin-left: 3rem;
      }
    }
  }
  .image {
    width: 12.5rem;
    height: 12.5rem;
    margin-right: 3rem;
  }
  .title {
    @include h1;
    white-space: nowrap;
  }
}

// -------------------------------------------------------------------- [Type] B
.card.type__B {
  &:hover,
  &:focus-visible {
    &.theme__purple-green,
    &.theme__red-green {
      .tag {
        background: $haiti;
      }
    }
    .image {
      width: 19.5rem;
    }
    .long-arrow-right {
      margin-top: 2rem;
      margin-bottom: 0;
      opacity: 1;
    }
  }
  .content {
    &.reverse {
      .image {
        margin-right: 0;
        margin-left: 3rem;
        @include mini {
          margin-left: 0;
        }
      }
      .long-arrow-right {
        svg {
          left: auto;
          right: 0;
          transform: none;
        }
      }
    }
  }
  .image {
    align-self: center;
    width: 14.5rem;
    margin-right: 3rem;
    @include mini {
      align-self: flex-start;
      margin-bottom: 1rem;
    }
  }
  .panel-text {
    flex: 1;
    padding: 1rem 0;
  }
  .title {
    @include h3;
    margin-bottom: 1.5rem;
  }
  .metadata {
    @include label_2;
  }
  .bar {
    margin: 0 0.5rem;
  }
  .tag {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    -moz-background-clip: text !important;
    -moz-text-fill-color: transparent !important;
    &:not(:last-child) {
      &:after {
        content: ',';
        margin-left: -1px;
        margin-right: 0.25rem;
      }
    }
  }
  .long-arrow-right {
    display: block;
    position: relative;
    width: 100%;
    height: 1.5625rem;
    margin-bottom: -1.5625rem;
    opacity: 0;
    overflow: hidden;
    transition: 250ms ease-in-out;
    svg {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      transform: rotate(180deg);
    }
  }
}

// -------------------------------------------------------------------- [Type] C
.card.type__C {
  .date-before,
  .title,
  .description {
    margin-bottom: 0.5rem;
  }
  .date-before {
    @include fontWeight_Extrabold;
    font-size: 0.75rem;
  }
  .label {
    @include label_3;
    @include fontWeight_Semibold;
    align-self: flex-start;
    border: 2px solid $cararra;
    padding: 0.25rem 0.5rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
  }
  .title {
    @include label_2;
  }
  .title-text {
    flex: 1;
  }
  .description {
    @include label_3;
  }
}
</style>

<template>
  <component
    :is="tag"
    :to="tag === 'nuxt-link' ? url : undefined"
    :href="tag === 'a' ? url : undefined"
    :target="target"
    tabindex="0"
    :class="[`button type__${type} action__${action} theme__${theme} orientation__${orientation}`]"
    :data-text="text"
    @click="openModal">

    <template v-if="artifacts">
      <div
        v-for="(artifact, index) in artifacts"
        :key="index"
        :class="`artifact artifact-${index + 1}`" />
    </template>

    <div
      v-if="iconBefore"
      :class="['icon-before', iconBefore]">
      <IconArrowDown v-if="iconBefore === 'arrow-down'" />
      <IconFingerUp v-if="iconBefore === 'finger-up'" />
      <IconStar v-if="iconBefore === 'star'" />
      <IconTrippleArrowRight v-if="iconBefore === 'triple-arrow-right'" />
    </div>

    <span v-if="text" class="text">
      {{ text }}
    </span>

    <slot />

    <div
      v-if="iconAfter"
      :class="['icon-after', iconAfter]">
      <IconArrowDown v-if="iconAfter === 'arrow-down'" />
      <IconFingerUp v-if="iconAfter === 'finger-up'" />
    </div>

  </component>
</template>

<script>
// ====================================================================== Import
import { mapActions } from 'vuex'

import IconArrowDown from '@/components/icons/ArrowDown'
import IconFingerUp from '@/components/icons/IconFingerUp'
import IconStar from '@/components/icons/Star'
import IconTrippleArrowRight from '@/components/icons/TrippleArrowRight'

// ====================================================================== Export
export default {
  name: 'Button',

  components: {
    IconArrowDown,
    IconFingerUp,
    IconStar,
    IconTrippleArrowRight
  },

  props: {
    /*
      (A) → Primary CTA, with gradients (ex: Accordion on Home page)
      (B) → Same as the Primary CTA except black artifacts (ex: CTA in Header of Home page)
      (C) → Secondary CTA, usually clear with a white border (ex: just above Footer on Home page)
      (D) → Tertiary CTA, almost no styling except font-weight and color (ex: careers list)
      (E) → Navigation [top-level] (Nav + Footer)
      (F) → Navigation [subnav] (Nav)
      (X) → No styling + slot
    */
    button: {
      type: Object,
      required: true
    }
  },

  computed: {
    type () {
      return this.button.type
    },
    action () {
      return this.button.action || 'button'
    },
    tag () {
      const action = this.action
      let tag
      switch (action) {
        case 'a' : tag = 'a'; break
        case 'nuxt-link' : tag = 'nuxt-link'; break
        default : tag = 'button'; break
      }
      return tag
    },
    target () {
      return this.button.target
    },
    orientation () {
      return this.button.orientation || 'vertical'
    },
    iconBefore () {
      return this.button.icon_before
    },
    iconAfter () {
      return this.button.icon_after
    },
    text () {
      return this.button.text
    },
    url () {
      return this.button.url
    },
    theme () { // 'purple-green', 'red-purple', 'red-green', 'black', 'white'
      return this.button.theme || 'purple-green'
    },
    artifacts () {
      const type = this.type
      if (type === 'A') { return [1, 2, 3, 4, 5, 6] }
      if (type === 'B') { return [1, 2, 3, 4] }
      if (type === 'C') { return [1, 2, 3, 4] }
      return false
    }
  },

  methods: {
    ...mapActions({
      setModal: 'global/setModal'
    }),
    openModal () {
      this.$emit('buttonClicked', this.button)
      if (this.action === 'video') {
        this.setModal({
          action: 'video',
          url: this.url
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$artifact_b_size_1: 1.4375rem;
$artifact_b_size_2: 1.25rem;

// ///////////////////////////////////////////////////////////////////// General
.button {
  @include leading_Small;
  display: inline-flex;
  flex-direction: row;
  position: relative;
  transition: 250ms ease-in-out;
}

.text {
  display: block;
  position: relative;
  white-space: nowrap;
  z-index: 15;
}

.icon-before,
.icon-after {
  pointer-events: none;
  transition: 250ms ease-in-out;
  svg {
    display: block;
  }
}

// ////////////////////////////////////////////////////////////////// Variations
// -------------------------------------------------------------------- [Type] A
.type__A {
  @include fontSize_Tiny;
  @include fontWeight_Bold;
  line-height: 1;
  text-transform: uppercase;
  padding: 1rem 43px 46px 2.8125rem;
  color: $haiti;
  &:hover {
    &:after,
    .artifact-1,
    .artifact-2,
    .artifact-6 {
      opacity: 1;
    }
    .text {
      opacity: 0;
    }
  }
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 16px;
    left: 45px;
    color: $cararra;
    opacity: 0;
    z-index: 25;
    transition: 250ms ease-in-out;
  }
  &.theme__purple-green {
    @include gradient_Background_PurpleGreen;
    &:after {
      color: $greenYellow;
    }
  }
  &.theme__red-purple {
    @include gradient_Background_RedPurple;
    &:after {
      color: $perfume;
    }
  }
  &.theme__red-green {
    @include gradient_Background_RedGreen;
    &:after {
      color: $greenYellow;
    }
  }
  .artifact {
    position: absolute;
    background-color: $haiti;
    z-index: 20;
    transition: 250ms ease-in-out;
  }
  .artifact-1,
  .artifact-2,
  .artifact-6 {
    opacity: 0;
  }
  .artifact-1 {
    top: 2px;
    left: 2px;
    width: calc(100% - 1.5rem - 8px);
    height: calc(33.333% - 6px);
  }
  .artifact-2 {
    top: calc(33.333% - 4px);
    left: calc(1.5rem + 4px);
    width: calc(100% - 3rem - 10px);
    height: calc(33.333%);
  }
  .artifact-3 {
    bottom: 0;
    left: calc(1.5rem + 2px);
    width: calc(100% - 3rem - 6px);
    height: calc(33.333% + 2px);
  }
  .artifact-4 {
    bottom: 0;
    left: 0;
    width: calc(1.5rem + 2px);
    height: calc(66.666% + 2px);
  }
  .artifact-5 {
    top: 0;
    right: 0;
    width: calc(1.5rem + 4px);
    height: calc(66.666% - 2px);
  }
  .artifact-6 {
    bottom: 2px;
    right: 2px;
    width: 1.5rem;
    height: 1.5rem;
  }
}

// ---------------------------------------------------------------- [Type] B & C
$artifact_b_dimension: 1.5rem;

.type__B,
.type__C {
  @include fontSize_Tiny;
  @include fontWeight_Bold;
  line-height: 1;
  color: $cararra;
  text-transform: uppercase;
  padding: 1rem 1.3125rem;
  margin: 0 $artifact_b_dimension $artifact_b_dimension $artifact_b_dimension;
  &:hover {
    color: $haiti;
  }
  .artifact {
    position: absolute;
    background-color: $haiti;
    border-width: 2px;
    border-style: solid;
    transition: 250ms ease-in-out;
  }
  .artifact-1,
  .artifact-2 {
    height: 50%;
  }
  .artifact-3,
  .artifact-4 {
    width: $artifact_b_dimension;
    height: $artifact_b_dimension;
  }
  .artifact-1 {
    left: 2px;
    top: 0;
    width: calc(100% - 2px);
    border-left: 0;
    border-bottom: 0;
  }
  .artifact-2 {
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 0;
  }
  .artifact-3 {
    top: 0;
    right: calc(100% - 2px);
    border-right: 0;
  }
  .artifact-4 {
    top: 100%;
    left: 100%;
  }
}

.type__B {
  &:hover {
    .artifact {
      background-color: transparent;
    }
  }
  .artifact {
    border-color: $haiti;
  }
}

.type__C {
  &:hover {
    .artifact {
      background-color: $cararra;
    }
  }
  .artifact {
    border-color: $cararra;
  }
}

// -------------------------------------------------------------------- [Type] D
.type__D {
  @include fontSize_Tiny;
  @include fontWeight_Extrabold;
  align-items: center;
  text-transform: uppercase;
  &:hover {
    .icon-after {
      transform: translateX(2rem);
    }
  }
  &.theme__purple {
    color: $perfume;
  }
  &.theme__red {
    color: $coralRed;
  }
  &.theme__green {
    color: $greenYellow;
  }
  &.theme__white {
    color: $cararra;
  }
  .text {
    margin-right: 1rem;
  }
}

// -------------------------------------------------------------------- [Type] E
.type__E {
  @include fontSize_Tiny;
  @include fontWeight_Semibold;
  @include leading_Regular;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  &.orientation__horizontal {
    flex-direction: row;
  }
  .icon-before {
    position: relative;
  }
}

// -------------------------------------------------------------------- [Type] F
.type__F {
  @include fontSize_Tiny;
  @include fontWeight_Bold;
  line-height: 1;
  white-space: nowrap;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}
</style>

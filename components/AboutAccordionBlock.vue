<template>
  <div :class="['block about-accordion-block', `theme__${theme}`]">

    <Zero_Core__Accordion v-slot="{ active }">
      <Zero_Core__Accordion_Section
        v-for="(section, index) in sections"
        :key="index"
        :active="active">

        <Zero_Core__Accordion_Header tabindex="0">
          <div :class="['header-content', { reverse: section.direction === 'reverse' }]">
            <img :src="section.img" class="image" />
            <div v-if="section.title" class="title">
              <span class="title-text">
                {{ section.title }}
              </span>
              <span v-if="section.subtitle" class="subtitle">
                {{ section.subtitle }}
              </span>
            </div>
          </div>
        </Zero_Core__Accordion_Header>

        <Zero_Core__Accordion_Content>
          <div class="accordion-content-wrapper" v-html="section.content"></div>
        </Zero_Core__Accordion_Content>

        <div class="background" />

      </Zero_Core__Accordion_Section>
    </Zero_Core__Accordion>

  </div>
</template>

<script>
// ===================================================================== Imports
// import IconArrowDown from '@/components/icons/ArrowDown'

// ====================================================================== Export
export default {
  name: 'AboutAccordionBlock',

  components: {
    // IconArrowDown
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    sections () {
      return this.block.sections
    },
    theme () { // 'purple-green', 'red-purple', 'red-green'
      return this.block.theme || 'purple-green'
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.about-accordion-block {
  position: relative;
}

.accordion-header,
.accordion-content {
  position: relative;
  z-index: 10;
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

// ////////////////////////////////////////////////////////////////////// Themes
.theme__purple-green {
  .accordion-section {
    &:before, &:after, .background {
      @include gradient_Background_PurpleGreen;
    }
  }
}

.theme__red-purple {
  .accordion-section {
    &:before, &:after, .background {
      @include gradient_Background_RedPurple;
    }
  }
}

.theme__red-green {
  .accordion-section {
    &:before, &:after, .background {
      @include gradient_Background_RedGreen;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Section
.accordion-section {
  &:hover {
    color: $haiti;
  }
  &:before,
  &:after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background: $cararra;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
  &:first-child:before,
  &:after {
    content: '';
  }
  &.open {
    color: $haiti;
    .background {
      opacity: 1;
    }
    .title-text {
      &:before, &:after {
        transform: rotate(90deg);
      }
    }
    .icon {
      transform: rotate(180deg);
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Header
::v-deep .accordion-header {
  &:hover,
  &:focus-visible {
    ~ .background {
      opacity: 1;
    }
  }
}

.header-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem calc((100% - #{$containerWidth}) / 2 + #{$singleColumn * 1.5} + 0.5rem);
  cursor: pointer;
  @include small {
    padding: 2rem;
  }
  @include mini {
    flex-direction: column;
  }
  &.reverse {
    flex-direction: row-reverse;
    @include mini {
      flex-direction: column;
    }
    .title-text {
      padding-left: 0;
      &:before {
        right: calc(100% + 3rem);
      }
      &:after {
        right: calc(100% + 1rem);
      }
    }
    .image {
      margin-right: 0;
      margin-left: 2rem;
      @include mini {
        margin-left: 0;
      }
    }
  }
}

.image {
  width: 9rem;
  height: 9rem;
  margin-right: 2rem;
  @include mini {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}

.title {
  display: flex;
  flex-direction: column;
  @include mini {
    align-items: center;
    text-align: center;
  }
}

.title-text {
  @include fontSize_ExtraLarge;
  @include leading_Large;
  @include fontWeight_Semibold;
  position: relative;
  padding-left: 5rem;
  transition: 250ms ease-in-out;
  @include medium {
    font-size: 1.875rem; // 30pt
    line-height: 2.8125rem; // 45pt
  }
  &:before,
  &:after {
    content: '>';
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 2rem;
    height: 100%;
    transition: transform 250ms ease-in-out;
  }
  &:before {
    right: calc(100% - 2rem);
  }
  &:after {
    right: calc(100% - 4rem);
  }
}

.subtitle {
  @include fontWeight_Semibold;
  font-size: 30px;
  line-height: 3.125rem;
  transition: 250ms ease-in-out;
  @include medium {
    @include fontSize_Medium;
    @include leading_Medium;
  }
  @include mini {
    @include fontSize_Small;
    line-height: 1.875rem; // 30pt
  }
}

// ///////////////////////////////////////////////////////////////////// Content
::v-deep .accordion-content-wrapper {
  @include fontWeight_Medium;
  padding: 1rem calc((100% - #{$containerWidth}) / 2 + #{$singleColumn * 1.5} + 0.5rem);
  padding-bottom: 2rem;
  transition: 250ms ease-in-out;
  @include small {
    padding: 2rem;
    padding-top: 0;
  }
}
</style>

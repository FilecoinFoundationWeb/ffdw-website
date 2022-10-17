<template>
  <div :class="['block accordion-block', `theme__${theme}`]">

    <Zero_Core__Accordion v-slot="{ active }">
      <Zero_Core__Accordion_Section
        v-for="(section, index) in sections"
        :key="index"
        :active="active">

        <Zero_Core__Accordion_Header tabindex="0">
          <div class="label">
            {{ section.label }}
          </div>
          <IconArrowDown class="icon" />
        </Zero_Core__Accordion_Header>

        <Zero_Core__Accordion_Content>
          <div
            :class="['accordion-content-wrapper', 'basic-template-block-format', theme]"
            v-html="section.content">
          </div>
        </Zero_Core__Accordion_Content>

      </Zero_Core__Accordion_Section>
    </Zero_Core__Accordion>

  </div>
</template>

<script>
// ===================================================================== Imports
import IconArrowDown from '@/components/icons/ArrowDown'

// ====================================================================== Export
export default {
  name: 'AccordionBlock',

  components: {
    IconArrowDown
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
.accordion-block {
  position: relative;
}

// ////////////////////////////////////////////////////////////////////// Themes
.theme__purple-green {
  .accordion-section {
    &:before, &:after {
      @include gradient_Background_PurpleGreen;
    }
  }
}

.theme__red-purple {
  .accordion-section {
    &:before, &:after {
      @include gradient_Background_RedPurple;
    }
  }
}

.theme__red-green {
  .accordion-section {
    &:before, &:after {
      @include gradient_Background_RedGreen;
    }
  }
}

// ///////////////////////////////////////////////////////////////////// Section
.accordion-section {
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
    .icon {
      transform: rotate(180deg);
    }
  }
}

// ////////////////////////////////////////////////////////////////////// Header
::v-deep .accordion-header {
  @include p1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 1rem 0;
  margin: 1rem 1rem 1rem 0;
  cursor: pointer;
}

.label {
  @include p1;
}

.icon {
  width: 1rem;
  transition: 250ms ease-in-out;
}

// ///////////////////////////////////////////////////////////////////// Content
::v-deep .accordion-content-wrapper {
  padding-bottom: 2rem;
}
</style>

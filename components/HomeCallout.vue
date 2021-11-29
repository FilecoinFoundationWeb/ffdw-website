<template>
  <div class="home-callout">

    <div class="panel-left">
      <img :src="img_left" />
    </div>

    <div class="panel-right">
      <div class="panel-right-inner-content">
        <TextBlock :block="textBlock" />
        <SocialIcons />
        <h2 class="subheading">
          {{ text_2 }}
        </h2>
      </div>
    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import TextBlock from '@/components/TextBlock'
import SocialIcons from '@/components/SocialIcons'

// ====================================================================== Export
export default {
  name: 'HomeCallout',

  components: {
    TextBlock,
    SocialIcons
  },

  props: {
    img_left: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    },
    label: {
      type: [String, Boolean],
      required: false,
      default: false
    },
    text_1: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    },
    text_2: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    }
  },

  computed: {
    textBlock () {
      return {
        format: 'medium',
        label: this.label,
        heading: this.text_1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin specialHeading {
  font-size: 2.8125rem;
  line-height: 4.0625rem;
}

// ///////////////////////////////////////////////////////////////////// General
.home-callout {
  display: flex;
  flex-direction: row;
  max-width: 90rem;
  margin: 0 auto;
  color: $haiti;
}

.panel-left {
  width: 45%;
  img {
    width: 100%;
  }
}

.panel-right {
  @include gradient_Background_PurpleGreen;
  position: relative;
  width: 55%;
  margin-top: -5rem;
  margin-bottom: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: calc(#{math.div($containerWidth, 12)});
  padding-right: calc((100vw - #{$containerWidth}) / 2);
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $haiti;
  }
  &:before {
    width: 7.25rem;
    height: 7.25rem;
    top: 0;
    right: 0;
  }
  &:after {
    width: 2.5rem;
    height: 2.5rem;
    top: 7.25rem;
    right: 7.25rem;
  }
}

::v-deep .text-block {
  .label {
    margin-bottom: 3.75rem;
  }
  .heading {
    @include specialHeading;
  }
}

.social-icons {
  margin-top: 3rem;
}

.subheading {
  @include specialHeading;
  margin: 3rem 0;
}
</style>
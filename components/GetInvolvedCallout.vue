<template>
  <div class="get-involved-callout">

    <div class="panel-left">
      <img :src="img_left" />
    </div>

    <div class="panel-right">

      <div v-if="label" class="label">
        {{ label }}
      </div>

      <GetInvolvedCalloutSvg />

      <Button v-if="cta" :button="cta" />

    </div>

  </div>
</template>

<script>
// ===================================================================== Imports
import Button from '@/components/Button'
import GetInvolvedCalloutSvg from '@/components/svgs/GetInvolvedCalloutSvg'

// ====================================================================== Export
export default {
  name: 'GetInvolvedCallout',

  components: {
    Button,
    GetInvolvedCalloutSvg
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
    img_right: { /* eslint-disable-line */
      type: [String, Boolean],
      required: false,
      default: false
    },
    cta: {
      type: [Object, Boolean],
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin specialHeading {
  font-size: 2.8125rem;
  line-height: 4.0625rem;
  @include mini {
    @include fontSize_Large;
    @include leading_Large;
  }
}

// ///////////////////////////////////////////////////////////////////// General
.get-involved-callout {
  display: flex;
  flex-direction: row;
  max-width: 90rem;
  margin: 0 auto;
  color: $haiti;
}

img,
svg {
  width: 100%;
}

.panel-left {
  width: 45%;
  @include small {
    display: none;
  }
}

.panel-right {
  @include gradient_Background_RedGreen;
  position: relative;
  width: 55%;
  margin-top: -5rem;
  margin-bottom: 5rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
  padding-left: calc(#{math.div($containerWidth, 12)});
  padding-right: calc((100vw - #{$containerWidth}) / 2);
  @include small {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding-right: calc(#{math.div($containerWidth, 12)});
  }
  @include tiny {
    padding: 3rem;
  }
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
    @include mini {
      width: 3rem;
      height: 3rem;
    }
  }
  &:after {
    width: 2.5rem;
    height: 2.5rem;
    top: 7.25rem;
    right: 7.25rem;
    @include mini {
      width: 1.25rem;
      height: 1.25rem;
      top: 3rem;
      right: 3rem;
    }
  }
}

.label {
  @include label_2;
  margin-bottom: 4rem;
  @include mini {
    padding-right: 3rem;
  }
}

.button {
  margin-top: 2rem;
}
</style>

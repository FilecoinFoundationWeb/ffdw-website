<template>
  <nav
    ref="navigation"
    :class="[`navigation theme__${theme}`, { 'nav-open': navigationOpen }]">

    <button
      class="mobile-nav-toggle-button"
      @click="toggleMobileNav">
      <div class="line" />
      <div class="line" />
      <IconPixelClose class="icon-close" />
    </button>

    <div class="navigation-content">
      <div class="navigation-content-inner-wrapper">
        <div
          v-for="(section, sectionIndex) in navigation"
          :key="`section-${sectionIndex}`"
          :class="['nav-link-wrapper', { active: sectionIndex === activeItem }]">

          <Button
            :button="section.link"
            :class="['nav-link', { 'has-subnav': section.links }]"
            @focus.native="setActiveItem(sectionIndex)"
            @focusout.native="(e) => { checkForActiveElement(e) }" />

          <div
            v-if="section.links"
            class="subnav">
            <Button
              :button="{ type: 'X', action: 'nuxt-link', url: section.link.url, text: section.heading }"
              class="heading" />
            <div class="sublinks">
              <Button
                v-for="(link, linkIndex) in section.links"
                :key="`link-${linkIndex}`"
                :button="link"
                class="subnav-link"
                @click.native="sublinkClicked(link)"
                @keyup.native.enter="sublinkClicked(link)" />
            </div>
            <div class="subnav-artifacts" />
          </div>

        </div>
      </div>
    </div>

  </nav>
</template>

<script>
// ====================================================================== Import
import { mapGetters, mapActions } from 'vuex'

import Button from '@/components/Button'
import IconPixelClose from '@/components/icons/PixelClose'

// ====================================================================== Export
export default {
  name: 'NavBlock',

  components: {
    Button,
    IconPixelClose
  },

  props: {
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },

  data () {
    return {
      activeItem: -1,
      componentKey: 0
    }
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent',
      navigationOpen: 'global/navigationOpen'
    }),
    content () {
      return this.siteContent.general
    },
    navigation () {
      return this.content.navigation
    }
  },

  methods: {
    ...mapActions({
      setNavigationOpen: 'global/setNavigationOpen'
    }),
    toggleMobileNav () {
      this.setNavigationOpen(!this.navigationOpen)
    },
    setActiveItem (newIndex) {
      if (newIndex >= 0) {
        if (this.activeItem !== newIndex) {
          this.activeItem = newIndex
          this.componentKey++
        }
      }
    },
    checkForActiveElement (e) {
      if (this.$refs.navigation && e.relatedTarget) {
        const navActive = this.$refs.navigation.contains(e.relatedTarget)
        if (!navActive) {
          this.activeItem = -1
        }
      }
    },
    sublinkClicked (link) {
      if (link.url === this.$route.fullPath) {
        this.$nextTick(() => {
          const id = link.url.substring(link.url.indexOf('#') + 1)
          const element = document.getElementById(id) || document.querySelector(`[data-id='${id}']`)
          if (element) {
            this.$scrollToElement(element, 0, -50)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$iconDimension: 1.5rem;
$squareArtifactDimension: 2.5rem;

@mixin squareArtifact {
  content: '';
  position: absolute;
  width: $squareArtifactDimension;
  height: $squareArtifactDimension;
  background-color: $cararra;
}

// ///////////////////////////////////////////////////////////////////// General
.navigation {
  z-index: 1000;
  &.theme__light {
    @include small {
      color: $haiti;
    }
    ::v-deep .nav-link {
      .icon-before.star,
      .icon-after.finger-up {
        path {
          fill: $cararra;
        }
      }
    }
    .mobile-nav-toggle-button {
      .line {
        background-color: $cararra;
      }
    }
  }
  &.nav-open {
    .mobile-nav-toggle-button {
      .line {
        opacity: 0;
      }
      .icon-close {
        opacity: 1;
      }
    }
    .navigation-content {
      @include small {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }
    }
  }
}

.mobile-nav-toggle-button {
  display: none;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  padding: 1rem;
  margin-right: -1rem;
  outline: none;
  @include small {
    display: flex;
  }
  .line {
    height: 2px;
    background-color: $haiti;
    &:first-child {
      position: relative;
      width: 13px;
      margin-bottom: 4px;
      &:before {
        content: '';
        position: absolute;
        bottom: 100%;
        right: 100%;
        width: 2px;
        height: 2px;
        background-color: inherit;
      }
    }
    &:nth-child(2) {
      width: 20px;
    }
  }
  .icon-close {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 14px;
    height: 14px;
    opacity: 0;
    transition: 250ms ease-in-out;
  }
}

.navigation-content {
  @include small {
    display: flex;
    position: absolute;
    top: $navigationHeight_Mobile;
    left: $gutterMobile;
    width: calc(100vw - #{$gutterMobile * 2});
    max-height: calc(100vh - #{$navigationHeight_Mobile} - 2rem - 2.25rem * 2);
    background-color: $cararra;
    transform: translateY(1rem);
    opacity: 0;
    pointer-events: none;
    transition: 250ms ease-in-out;
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 2.5rem;
      background-color: inherit;
    }
    &:before {
      top: 100%;
      left: 0;
      width: calc(100% - 2.5rem);
    }
    &:after {
      top: calc(100% + 2.5rem);
      right: 0;
      width: 2.5rem;
    }
  }
  @include mini {
    height: calc(100vh - #{$navigationHeight_Mobile} - 2rem - 2.25rem * 2);
  }
}

.navigation-content-inner-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  @include small {
    align-items: flex-start;
    flex-wrap: wrap;
  }
  @include mini {
    flex-direction: column;
    flex-wrap: nowrap;
    overflow-y: scroll;
  }
}

.nav-link-wrapper {
  position: relative;
  @include small {
    width: 50%;
  }
  @include mini {
    width: 100%;
  }
  &.active,
  &:hover {
    .subnav {
      opacity: 1;
      visibility: visible;
      z-index: 100;
      transform: translate(-50%, -2rem);
      @include small {
        transform: translate(0, 0);
      }
    }
    ::v-deep .nav-link {
      &:not(.nuxt-link-active) {
        padding-bottom: $iconDimension;
        .icon-after.finger-up {
          opacity: 1;
          transform: translateY(-$iconDimension);
        }
      }
    }
  }
  &:not(:last-child) {
    margin-right: 1.875rem;
    @include small {
      margin-right: 0;
    }
  }
}

::v-deep .nav-link {
  @include fontSize_Mini;
  @include fontWeight_Semibold;
  &:not(.has-subnav) {
    @include small {
      @include fontSize_Mini;
      @include leading_Small;
      @include fontWeight_Bold;
      white-space: nowrap;
      padding: 2rem;
    }
  }
  &.has-subnav {
    @include small {
      display: none;
    }
  }
  &.nuxt-link-active {
    .icon-before.star {
      opacity: 1;
    }
  }
  .icon-before.star,
  .icon-after.finger-up {
    position: absolute;
    left: calc(50% - #{math.div($iconDimension, 2)});
    width: $iconDimension;
    opacity: 0;
    @include small {
      display: none;
    }
    path {
      fill: $haiti;
    }
  }
  .icon-before.star {
    bottom: 100%;
  }
  .icon-after.finger-up {
    top: 100%;
  }
}

.subnav {
  position: absolute;
  top: calc(100% + #{$squareArtifactDimension} + 3rem);
  left: 50%;
  padding: 2rem 2.25rem;
  padding-right: 4rem;
  background-color: $cararra;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%);
  z-index: -1;
  transition: 250ms ease-in-out;
  @include small {
    position: static;
    padding: 2rem;
    opacity: 1;
    background-color: transparent;
    visibility: visible;
    transform: translateX(0);
    z-index: 10;
  }
  &:before,
  &:after {
    @include squareArtifact;
    @include small {
      display: none;
    }
  }
  &:before {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  &:after {
    right: 100%;
    top: 0;
  }
}

.subnav-artifacts {
  position: absolute;
  top: 0;
  left: 100%;
  width: 3.5rem;
  height: 67%;
  background-color: $cararra;
  @include small {
    display: none;
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: $cararra;
  }
  &:before {
    top: 0;
    left: 3.5rem;
    width: 4.5rem;
    height: 4.5rem;
  }
  &:after {
    top: 100%;
    left: 100%;
    width: $squareArtifactDimension;
    height: $squareArtifactDimension;
  }
}

.sublinks {
  display: flex;
  flex-direction: column;
  @include small {
    padding-left: 1rem;
  }
}

.heading {
  @include fontSize_Mini;
  @include leading_Small;
  @include fontWeight_Bold;
  white-space: nowrap;
  color: $haiti;
  margin-bottom: 0.5rem;
}

::v-deep .subnav-link {
  padding: 0.75rem 0;
  &:hover {
    .icon-before.arrow-down {
      margin-left: 0;
      opacity: 1;
    }
  }
  &:last-child {
    padding-bottom: 0;
  }
  .icon-before.arrow-down {
    margin-left: -1.25rem;
    margin-right: 0.5rem;
    opacity: 0;
    transform: rotate(-90deg);
    transition: 250ms ease-in-out;
    @include small {
      display: none;
    }
    svg {
      width: 0.75rem;
      rect {
        fill: $haiti;
      }
    }
  }
  .text {
    color: $haiti;
  }
}
</style>

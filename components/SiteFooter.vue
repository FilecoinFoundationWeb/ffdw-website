<template>
  <footer id="site-footer">

    <section class="panel-top">
      <div class="grid">

        <div class="col-4_mi-12" data-push-left="off-1_mi-0">
          <Button :button="logoButton" class="logo-button">
            <FFDWLogo class="logo" />
          </Button>
        </div>

        <div class="col-6_mi-12" data-push-left="off-1_mi-0">
          <div class="primary-links-list">
            <div
              v-for="(link, index) in linksPrimary"
              :key="`primary-${index}`"
              class="link-wrapper">
              <Button :button="link" />
            </div>
          </div>
        </div>

      </div>
    </section>

    <section class="panel-bottom">
      <div class="grid">
        <div class="col-11_mi-12" data-push-left="off-1_mi-0">
          <div class="panel-bottom-wrapper">

            <div class="secondary-links-list">
              <Button
                v-for="(link, index) in linksSecondary"
                :key="`secondary-${index}`"
                :button="link" />
            </div>

            <SocialBar
              :hide-social-icons="true"
              :show-button-icons="true"
              :show-labels="true" />

          </div>
        </div>
      </div>
    </section>

    <div class="artifact artifact-1" />
    <div class="artifact artifact-2" />
    <div class="artifact artifact-3" />
    <div class="artifact artifact-4" />

  </footer>
</template>

<script>
// ====================================================================== Import
import { mapGetters } from 'vuex'

import FFDWLogo from '@/components/icons/FFDWLogo'
import Button from '@/components/Button'
import SocialBar from '@/components/SocialBar'

// ====================================================================== Export
export default {
  name: 'SiteFooter',

  components: {
    FFDWLogo,
    Button,
    SocialBar
  },

  computed: {
    ...mapGetters({
      siteContent: 'global/siteContent'
    }),
    content () {
      return this.siteContent.general
    },
    logoButton () {
      return this.content.logo_button
    },
    footer () {
      return this.content.footer
    },
    linksPrimary () {
      return this.footer.links_primary
    },
    linksSecondary () {
      return this.footer.links_secondary
    },
    social () {
      return this.content.social
    }
  }
}
</script>

<style lang="scss" scoped>
$singleColumn: math.div($containerWidth, 12);
$artifactHeight: 4.5rem;
$iconFingerDimension: 1.5rem;

@mixin secondaryButtonStyles {
  @include fontWeight_Extrabold;
  font-size: 0.75rem;
  text-transform: uppercase;
}

// ///////////////////////////////////////////////////////////////////// General
#site-footer {
  position: relative;
  color: $haiti;
  padding-top: 2.5rem;
  margin-top: 5rem;
}

[class~=col], [class*=col-], [class*=col_] {
  @include tiny {
    background-color: $cararra;
    padding: 0 1rem 1rem;
  }
}

.panel-top,
.panel-bottom {
  position: relative;
  z-index: 10;
}

.panel-top {
  padding-bottom: 2rem;
  @include tiny {
    padding-bottom: 0;
  }
}

.panel-bottom-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @include tiny {
    flex-direction: column;
    align-items: flex-start;
  }
}

// /////////////////////////////////////////////////////////////////// Artifacts
.artifact {
  position: absolute;
  background-color: $cararra;
  z-index: 5;
}

.artifact-1,
.artifact-2,
.artifact-3 {
  height: $artifactHeight;
}

.artifact-1 {
  width: calc(#{$containerWidth - $singleColumn * 2} + 9rem);
  top: 0;
  left: calc(50% - #{math.div($containerWidth, 2) - $singleColumn} - 4.5rem);
  @include tiny {
    width: 2rem;
    height: 2rem;
    top: calc(2.5rem - 2rem);
    right: calc(7% - 2rem);
    left: auto;
  }
}

.artifact-2 {
  width: calc(#{$containerWidth} + 7.5rem);
  top: $artifactHeight;
  left: calc(50% - #{math.div($containerWidth, 2)} - 3.75rem);
  &:before {
    content: '';
    position: absolute;
    bottom: 100%;
    right: 100%;
    width: 2.5rem;
    height: 2.5rem;
    background-color: inherit;
    @include tiny {
      display: none;
    }
  }
  @include tiny {
    height: 1.25rem;
    width: 1.25rem;
    top: auto;
    bottom: 50%;
    left: calc(7% - 0.75rem);
  }
}

.artifact-3 {
  height: calc(100% - #{$artifactHeight * 2});
  width: calc(#{$containerWidth} + 16rem);
  top: $artifactHeight * 2;
  left: calc(50% - #{math.div($containerWidth, 2)} - 8rem);
  @include tiny {
    height: 50%;
    width: 100vw;
    top: auto;
    bottom: 0;
    left: 0;
  }
}

// ///////////////////////////////////////////////////////////////////// Content
.logo-button {
  @include tiny {
    padding-top: 3rem;
  }
}

.logo {
  width: 16.5rem;
  color: $haiti;
}

::v-deep .primary-links-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @include mini {
    margin-top: 2rem;
  }
  @include tiny {
    flex-direction: column;
    padding-bottom: 2rem;
  }
  .icon-before.finger-up {
    width: 1.4375rem;
    opacity: 0;
    transform: translateX(-0.625rem) rotate(90deg);
    svg {
      path {
        fill: $coralRed;
      }
    }
  }
  .button {
    padding-left: 0.75rem;
    padding-right: 2.25rem;
    .text {
      margin: 0 0.5rem;
    }
    &:hover {
      color: $coralRed;
      transform: translateX(calc($iconFingerDimension + 1rem));
      .icon-before.finger-up {
        opacity: 1;
        transform: translateX(-0.375rem) rotate(90deg);
      }
    }
  }
}

.link-wrapper {
  display: flex;
  width: 50%;
  @include tiny {
    width: auto;
  }
}

.secondary-links-list {
  @include tiny {
    margin-bottom: 1rem;
  }
  .button {
    @include secondaryButtonStyles;
    &:hover {
      transform: scale(1.1);
    }
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}

::v-deep .social-bar {
  .social-icon {
    padding-right: 0.25rem;
    &:not(:last-child) {
      margin-right: 0.75rem;
    }
    .label {
      @include secondaryButtonStyles;
    }
  }
}
</style>

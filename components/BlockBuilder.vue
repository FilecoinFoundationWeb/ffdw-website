<template>
  <div class="sectionals">

    <section
      v-for="(section, sectionId) in sections"
      :id="sectionId"
      :key="sectionId"
      class="sectional">
      <div :class="[getGridClasses(section.grid), section.classNames]">
        <template v-for="(block, blockId) in section">
          <div
            v-if="blockAllowed(blockId)"
            :key="blockId"
            :class="[getColumnCount(block)]"
            :data-block-id="blockId"
            :data-push-left="getColumnPushCount(block, 'left')"
            :data-push-right="getColumnPushCount(block, 'right')">
            <div class="column-content">

              <!-- ========================================== [Block] Custom -->
              <template v-if="block.type === 'custom'">
                <component
                  :is="component.name"
                  v-for="(component, componentKey) in block.customizations"
                  :key="componentKey"
                  v-bind="component.props" />
              </template>

              <!-- ========================================= [Block] Dynamic -->
              <component
                :is="getComponentName(block)"
                v-else-if="block.type !== 'sectional'"
                v-bind="{ block }" />

              <!-- ======================= Recursive Sectional/Block imports -->
              <BlockBuilder
                v-else
                :sections="block.sections" />

            </div>
          </div>
        </template>
      </div>
    </section>

  </div>
</template>

<script>
// ====================================================================== Import
import TextBlock from '@/components/TextBlock'
import ImageBlock from '@/components/ImageBlock'
import VideoBlock from '@/components/VideoBlock'
import AccordionBlock from '@/components/AccordionBlock'
import AboutAccordionBlock from '@/components/AboutAccordionBlock'
// import SliderBlock from '@/components/SliderBlock'
import CardListBlock from '@/components/CardListBlock'
import SlateVideoBlock from '@/components/SlateVideoBlock'
// import SocialBar from '@/components/SocialBar'
// import TabbedSlider from '@/components/TabbedSlider'
// import PaginatedCards from '@/components/PaginatedCards'
import BlockBuilder from '@/components/BlockBuilder'
import ContactForm from '@/components/ContactForm'
import HomeCallout from '@/components/HomeCallout'
import ExploreCallout from '@/components/ExploreCallout'
import GetInvolvedCallout from '@/components/GetInvolvedCallout'

// ====================================================================== Export
export default {
  name: 'BlockBuilder',

  components: {
    TextBlock,
    ImageBlock,
    VideoBlock,
    AccordionBlock,
    AboutAccordionBlock,
    // SliderBlock,
    CardListBlock,
    SlateVideoBlock,
    // SocialBar,
    // TabbedSlider,
    // PaginatedCards,
    BlockBuilder,
    GetInvolvedCallout,
    HomeCallout,
    ExploreCallout,
    ContactForm
  },

  props: {
    sections: {
      type: Object,
      required: true
    }
  },

  methods: {
    getGridClasses (blockGrid) {
      const classList = ['grid']
      if (typeof blockGrid === 'object' && Array.isArray(blockGrid) && blockGrid.length > 0) {
        blockGrid.forEach(className => classList.push(`-${className}`))
      }
      return classList.join('')
    },
    blockAllowed (blockId) {
      return !['grid', 'classNames'].includes(blockId)
    },
    getColumnCount (block) {
      return block.cols.num
    },
    getColumnPushCount (block, direction) {
      return block.cols.hasOwnProperty(`push_${direction}`) ? block.cols[`push_${direction}`] : undefined
    },
    getComponentName (block) {
      const type = block.type
      let name = ''
      switch (type) {
        case 'text_block' : name = 'TextBlock'; break
        case 'image_block' : name = 'ImageBlock'; break
        case 'video_block' : name = 'VideoBlock'; break
        case 'accordion_block' : name = 'AccordionBlock'; break
        case 'about_accordion_block' : name = 'AboutAccordionBlock'; break
        // case 'slider_block' : name = 'SliderBlock'; break
        case 'card_list_block' : name = 'CardListBlock'; break
        case 'slate_video_block' : name = 'SlateVideoBlock'; break
        case 'paginated_cards' : name = 'PaginatedCards'; break
        case 'custom' : name = block.component; break
      }
      return name
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
.sectional {
  padding: 6rem 0;
  @include mini {
    padding: 3rem 0;
  }
}
</style>

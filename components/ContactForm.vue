<!-- eslint-disable -->
<template>
  <form
    ref="contactForm"
    :action="action"
    method="POST"
    class="form grid-middle">

    <div
      v-for="(field, i) in fields"
      :key="field.label"
      :class="[(field.cols && field.cols.num) || 'col-12', 'field']">
      <component
        :is="field.component || 'input'"
        ref="inputFields"
        :name="field.for"
        :type="getInputType(field.for)"
        :pattern="getValidationPattern(field.for)"
        :placeholder="field.label"
        :validation-message="field.validation"
        tabindex="0"
        class="input focus-visible"
        required="required"
        aria-required="true" />
      <span
        v-if="field.validation"
        :key="`validation-${i}-${componentKey}`"
        :class="['validation-message', { display: !validMessages[i] }]">
        {{ field.validation }}
      </span>
    </div>

    <div class="submit-container col-5" data-push-left="off-7">
      <div v-if="submitted" class="submit-message">
        {{ message }}
      </div>
      <input
        class="submit"
        type="submit"
        :value="submit"
        @click="onFormSubmit" />
    </div>

  </form>
</template>

<script>
// ====================================================================== Export
export default {
  name: 'ContactForm',

  props: {
    fields: {
      /* eslint-disable-line */
      type: Array,
      required: true
    },
    submit: {
      /* eslint-disable-line */
      type: String,
      required: true
    },
    message: {
      type: String,
      required: false,
      default: ''
    },
    action: {
      /* eslint-disable-line */
      type: String,
      required: true
    }
  },

  data () {
    return {
      validMessages: new Array(this.fields.length).fill(true),
      componentKey: 0,
      keyup: false
    }
  },

  computed: {
    submitted () {
      return this.$route.query.submit === 'success'
    }
  },

  mounted () {
    this.$nextTick(() => {
      if (this.$route.query.submit === 'success' && this.$refs.contactForm) {
        this.$scrollToElement(this.$refs.contactForm, 0, -50)
      }
    })
  },

  methods: {
    onFormSubmit () {
      this.$refs.inputFields.forEach((field, i) => {
        this.validMessages[i] = field.checkValidity()
      })
      this.componentKey++
    },
    getInputType (type) {
      return type === 'email' ? type : 'text'
    },
    getValidationPattern (type) {
      switch (type) {
        case 'email': return '[a-zA-Z0-9!#$%&\'*+\-/=?^_{|}~]{1,100}@[a-zA-Z0-9\-]{2,64}.[a-zA-Z.]{2,27}' /* eslint-disable-line */
        case 'phone': return '[-0-9xs()+{}#]{6,31}'
        case 'name': return '[^0-9]{2,100}'
        case 'message': return '.{50,25000}'
        case 'subject': return '.{1,200}'
        default : return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// ///////////////////////////////////////////////////////////////////// General
input,
textarea {
  position: relative;
  background: none;
  border: none;
  width: 100%;
  @include fontSize_Small;
  @include fontWeight_Semibold;
}

.input {
  padding: 0.5rem;
  border-radius: 2px;
  box-shadow: 0 0 0 3px rgba(white, 0);
  transition: box-shadow 200ms ease;
  &:focus {
    box-shadow: 0 0 0 3px rgba(white, 0.5);
    outline: 0;
  }
  &:focus:not(:focus-visible) {
   box-shadow: none;
   outline: 0;
  }
}

.input:focus-visible,
.input:moz-focusring {
  box-shadow: 0 0 0 3px rgba(white, 0.5);
  outline: 0;
}

// ///////////////////////////////////////////////////////////////////// Fields
::placeholder {
  color: $cararra;
  @include fontSize_Small;
  @include fontWeight_Semibold;
}

textarea {
  resize: none;
  min-height: 8rem;
}

.field {
  position: relative;
  display: flex;
  flex-direction: column;

  &:not(:first-child) {
    margin-top: 2rem;
  }

  &:after {
    width: 100%;
    height: 0.25rem;
    content: "";
    margin-top: 0.5rem;
    @include gradient_Background_RedPurple;
  }
}

.submit-container {
  padding: 1.5rem 0;
  position: relative;
  text-align: right;
}

.submit-message {
  @include fontWeight_Semibold;
  @include fontSize_Small;
  line-height: 1.7;
  letter-spacing: 0.03em;
  margin-bottom: 0.5rem;
}

.submit {
  width: auto;
}

.validation-message {
  display: none;
  position: absolute;
  right: 0.5rem;
  bottom: -1.5rem;
  &.display {
    display: inline;
  }
  color: red;
}
</style>

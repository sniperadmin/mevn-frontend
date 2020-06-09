import Vue from 'vue'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Profile from '@/views/Profile.vue'

describe('Profile', () => {
  let wrapper
  const localVue = createLocalVue()

  Vue.use(Vuetify)

  const vuetify = new Vuetify()

  beforeEach(() => {
    wrapper = shallowMount(Profile, {
      localVue,
      vuetify,
      mocks: {
        $store: {
          state: {
            user: {},
          },
          actions: {
            getProfile: jest.fn()
          },
          getters: {
            user: jest.fn(),
            isLoggedIn: jest.fn()
          }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })
  
  it('should load images', () => {
    const card = wrapper.find('v-card-stub')
    
    expect(card.exists()).toBe(true)
  })
})
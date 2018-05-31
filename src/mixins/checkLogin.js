import {
  mapState,
  mapActions,
  mapMutations,
  MapGetters
} from 'vuex';

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['id', 'userinfo'])
  }
}

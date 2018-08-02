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
  methods: {
    ...mapMutations(['SAVE_USERINFO']),
    get_user() {
      this.$axios.get( '/Api/Show/get_user', {
        params: {
          id: this.id
        }
      }).then(({
        data
      }) => {
        // 该用户有效
        this.SAVE_USERINFO(data[0]);
      })
    }
  },
  computed: {
    ...mapState(['id', 'userinfo', "location"])
  }
}

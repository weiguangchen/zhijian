import {
  mapState,
  mapActions,
  mapMutations,
  MapGetters
} from 'vuex';

export default {
  created() {
    this.getPosition();
  },
  methods: {
    ...mapMutations(['SET_LOCATION']),
    getPosition() {
      return new Promise((resolve, reject) => {
        var geolocation = new qq.maps.Geolocation();
        geolocation.getLocation(resolve);
      })

    }
  },
  computed: {
    ...mapState(["location"])
  }
}

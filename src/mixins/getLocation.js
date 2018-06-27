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
        var geolocation = new qq.maps.Geolocation('62KBZ-2WXKQ-5GI53-GDT33-LKMPV-34FWO','mykey');
        geolocation.getLocation(resolve);
      })

    }
  },
  computed: {
    ...mapState(["location"])
  }
}

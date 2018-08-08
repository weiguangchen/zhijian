
const getters = {
    currentLocation: (state) => {
        if(state.locationType == 1){
            // 定位地址
            return state.location;
        }else if(state.locationType == 2){
            // 手动选择地址
            return state.cityLocation;
        }
    },
}
export default getters
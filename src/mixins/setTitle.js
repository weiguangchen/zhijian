export default {
    created(){
        var router = this.$route;
        if(router.meta.title != '' && Object.keys(router.meta).length > 0){
            this.setMetaTitle(router.meta.title)
        }
    }
}
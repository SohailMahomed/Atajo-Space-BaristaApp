base = {

    init: function(cb) {
        atajo.log.d("BASE INIT");
        cb();
    },

    update: function(cb){
    	atajo.log.d("BASE UPDATE");
    	atajo.log.d(">>>>>>>>>>>");
    	cb();
    }
};;
// 场景类
function ItcastScence( options ) {
    this.stage = options.stage;
    //执行场景的初始化
    this.init = options.init || ItcastScence.voidFn;
    //执行场景的进场动画
    this.pre = options.pre || ItcastScence.voidFn;
    //执行场景的出场动画
    this.post = options.post || ItcastScence.voidFn;

    //当前场景的所有的层
    this.layers = options.layers || [new Konva.Layer()];
    this.name = options.name || '';
    this.init();
}

ItcastScence.prototype = {
	constructor: ItcastScence,
	voidFn: function() {},
	CurrentScence: null,
	//场景要进入舞台，只需要调用场景的 play方法。
	play: function () {
        var self = this;
                // doPre,
	    var doPre = function doPre() {
            // 把当前场景中的所有的层添加到舞台
            self.layers.forEach(function( val ){
                self.stage.add( val );
            });
            //设置当前场景为 this
            ItcastScence.currentScene = self;
            //执行当前场景的入场动画
            self.pre();
        };

        //如果不是第一个场景，先执行当前场景的出场动画，
        //然后执行下一个场景的入场动画
        //需要在场景的post方法中执行传进去的 next 方法。
        if (ItcastScence.currentScene) {
            //执行上一个场景的出场动画
            ItcastScence.currentScene.post(doPre);
        } else {
            //如果是第一个场景直接执行入场动画
            doPre();
        }
    }// play
};

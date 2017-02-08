function $(id) {
	return document.getElementById(id);
}

function initial() {
	button_play = $("button_play");
	my_video = $("my_video");
	progress = $("progress");
	progress_red = $("progress_red");

	button_play.addEventListener("click", button_active, false);
	button_play.addEventListener("click", progress_active, false);
	progress.addEventListener("click",mourse_play,false);
	// console.log(progress_red.offsetLeft);

}
//播放暂停的功能
function button_active(e) {
	if (button_play.innerHTML == "播放") {
		my_video.play();
		button_play.innerHTML = "暂停";
	} else {
		my_video.pause();
		button_play.innerHTML = "播放";
	}
}

//进度条的功能
function progress_active() {
	loop=setInterval(progress_go, 1); //每毫秒运行一次
}

function progress_go() {
	if (!my_video.ended) {
		var time_total = my_video.duration / 1000; //设置成毫秒
		var rate = 760 / time_total;
		//console.log(rate);
		var width_total = my_video.currentTime / 1000 * rate;
		progress_red.style.width = width_total + "px";
	}else{
		my_video.currentTime="0";
		button_play.innerHTML = "播放";
		progress_red.style.width = "0";
	}

}

//点击读条播放指定视频
function mourse_play(e){
	var mourse_left=e.clientX;
	var ele_left=progress.offsetLeft;
	var mourse_width=mourse_left-ele_left;
	
	var time_total = my_video.duration / 1000; //设置成毫秒
	var rate = 760 / time_total;
	var mourse_time=mourse_width/rate*1000;
	//console.log(mourse_time);

	my_video.currentTime=mourse_time;
	progress_red.style.width = mourse_width+"px";

}

window.addEventListener("load", initial, false);
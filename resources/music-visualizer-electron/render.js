// Vars & setup

let canvas = document.getElementById("output");
let ctx = canvas.getContext("2d");

function handleStream(stream) {
	let audioCtx = new AudioContext();
	let analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;

	let source = audioCtx.createMediaStreamSource(stream);

	source.connect(analyser);
	//this connects our music back to the default output, such as your speakers 
	// source.connect(audioCtx.destination);

	let data = new Uint8Array(analyser.frequencyBinCount);

	requestAnimationFrame(loopingFunction);

	function loopingFunction() {
		requestAnimationFrame(loopingFunction);
		analyser.getByteFrequencyData(data);
		draw(data);
	}

	function draw(data) {
		data = [...data];
		ctx.clearRect(0,0,canvas.width,canvas.height);
		let space = (canvas.width / data.length);
		data.forEach((value,i)=>{
			ctx.beginPath();
			ctx.moveTo(space*i,canvas.height); //x,y
			ctx.lineTo(space*i,canvas.height-value); //x,y
			ctx.stroke();
		});
	}
}

navigator.mediaDevices.getUserMedia({
	audio: {
		mandatory: {
			chromeMediaSource: 'desktop'
		}
	},
    video: {
		mandatory: {
			chromeMediaSource: 'desktop'
		}
    }
}).then((stream) => {
	handleStream(stream);
}).catch((e) => {
	console.error(e);
});


/*

Audio out selector:

{
	deviceId: "default",
	kind: "audiooutput"
}

*/
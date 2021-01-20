
// var audio = document.getElementById("source");
// audio.play();

let canvas = document.getElementById("output");
let ctx = canvas.getContext("2d");

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

function handleStream(stream) {
	let audioCtx = new AudioContext();
	let analyser = audioCtx.createAnalyser();

	let source = audioCtx.createMediaStreamSource(stream);

	source.connect(analyser);

	analyser.fftSize = 256;

	var bufferLength = analyser.frequencyBinCount;

	var dataArray = new Uint8Array(bufferLength);

	var WIDTH = canvas.width;
	//   WIDTH = 1000;
	var HEIGHT = canvas.height;
	//   var HEIGHT = 500;

	var barWidth = (WIDTH / bufferLength) * 1.25;
	var barHeight;
	var x = 0;

	function renderFrame() {
	requestAnimationFrame(renderFrame);

	x = 0;

	analyser.getByteFrequencyData(dataArray);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (var i = 0; i < bufferLength; i++) {
		barHeight = dataArray[i];
		
		var r = barHeight + (25 * (i/bufferLength));
		var g = 250 * (i/bufferLength);
		var b = 50;

		// ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(x, HEIGHT - barHeight - 10, barWidth, barHeight);

		x += barWidth + 5;
	}

	ctx.fillRect(0, HEIGHT - 5, WIDTH, HEIGHT);
	}

	// audio.play();
	renderFrame();
}
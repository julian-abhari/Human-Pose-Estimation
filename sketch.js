let video;
let poseNet;
let poseArray;
let skeleton;

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
	if (poses.length > 0) {
		poseArray = poses[0].pose;
		skeleton = poses[0].skeleton;
	}
}

function modelLoaded() {
	console.log("poseNet ready");
}

function draw() {
	image(video, 0, 0);

	if (poseArray) { // Checking if the poseArray exists
		fill(100, 0, 200);
		let eyeLeft = poseArray.leftEye;
		let eyeRight = poseArray.rightEye;
		let distance = dist(eyeLeft.x, eyeRight.x, eyeLeft.y, eyeRight.y);

		for (let i = 0; i < poseArray.keypoints.length; i += 1) {
			let x = poseArray.keypoints[i].position.x;
			let y = poseArray.keypoints[i].position.y;
			ellipse(x, y, 16, 16);
		}

		for (let i = 0; i < skeleton.length; i += 1) {
			let a = skeleton[i][0];
			let b = skeleton[i][1];
			strokeWeight(2);
			stroke(255);
			line(a.position.x, a.position.y, b.position.x, b.position.y);
		}
	}
}

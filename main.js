song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score="";

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('poseNet is intialized')
}

function gotPoses(results){
    if(results.length > 0){
        score = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist"+ score);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = "+ rightWristY);
    }
}


function draw(){
    image(video,0,0,600,500);
    if(score > 0.2){
        circle(leftWristX,leftWristY,20);
        numberLeftWristY=Number(leftWristY)
        remove_decimal=floor(numberLeftWristY)
        volume= remove_decimal/500;
        song.setVolume(volume);
        document.getElementById("volume").innerHTML=volume;
    }
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
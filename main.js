status = "";
objects = [];
video = "";

function preload() {
    alert1 = loadSound("alarms.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
}

function draw() {
    image(video, 0, 0, 380, 380);

    if(status != "") {
        objectDetector.detect(videoz, gotResults);
        objectslength = objects.length;
        for(i=0; i < objectslength; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            if(objects[i].label = "person") {
                document.getElementById("detected").innerHTML = "Baby Found";
                alert1.stop();
            }
            else {
                document.getElementById("detected").innerHTML = "Baby not found";
                alert1.play();
            }
            percent = floor(objects[i].confidence * 100);
            r = Math.random()*255;
            g = Math.random()*255;
            b = Math.random()*255;
            stroke(r, g, b);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function gotResults(error, results) {
    if(error) {
        console.log("Error");
        console.log(error);
        document.getElementById("status").innerHTML = "Error";
    }
    else {
        console.log(results);
        objects = results;
    }
}
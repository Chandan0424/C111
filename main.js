prediction_1="";



Webcam.set({
    image_format:'png',
    png_quality:100,
    width:300,
    height:300,
    flip_horiz:true
});
camera=document.getElementById("camera");
Webcam.attach(camera);

function show(){
    Webcam.snap(function(img){
        document.getElementById("output").innerHTML='<img id="caputredImage" src="'+img+'">'
    })
}
console.log(ml5.version);
model=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-nKKJ9Dn9/model.json",modelLoaded);
function modelLoaded(){
    console.log("Model is Loaded!");
}
function speak(){
    synth=window.SpeechSynthesis;
    speakData1="The First Prediction is "+prediction_1;
    utterThis=new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}

function output(){
    image=document.getElementById("caputredImage");
    model.classify(image,gotResult);
}

prediction_1=results[0].label;

function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        document.getElementById("result").innerText=prediction_1;

        speak();
    }
}


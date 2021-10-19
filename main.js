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
function Speak(){
    synth=window.speechSynthesis;
    speakData1="The Prediction is "+prediction_1;
    utterThis=new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}

function output(){
    image=document.getElementById("caputredImage");
    model.classify(image,gotResult);
    Speak();
}



function gotResult(error,results){
    if(error){
        console.log(error)
    }
    else{
        console.log(results);
        prediction_1=results[0].label;
        document.getElementById("result").innerHTML=prediction_1;

        if(prediction_1=="Win"){
            document.getElementById("update_emoji").innerHTML="✌";
        }
        else if(prediction_1=="Good"){
            document.getElementById("update_emoji").innerHTML="👍";
        }
        else if(prediction_1=="Bad"){
            document.getElementById("update_emoji").innerHTML="👎";
        }
        else if(prediction_1=="Hi"){
            document.getElementById("update_emoji").innerHTML="✋";
        }
        else if(prediction_1=="Punch"){
            document.getElementById("update_emoji").innerHTML="👊";
        }


    }
}


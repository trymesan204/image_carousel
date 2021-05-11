var wrappers = document.getElementById('carousel-image-wrapper');
let counter = 0;
var slider;
var reverse;

function imageSlider(){
    slider = setInterval( function() {
        counter -= 2;
        wrappers.style.marginLeft = counter + 'px';
        if(counter === -1800){
            clearInterval(slider);
            setTimeout(function(){
                reverseSlider();
            }, 1000);
        }else if(counter % -600 === 0) {
            clearInterval(slider);
            holdImage(true);
        }
    }, 5);
}

function holdImage(value){
    setTimeout(function() {
        if (value){
            imageSlider();
        }else{
            reverseSlider();
        }
    }, 1000);
}


function reverseSlider(){
    reverse = setInterval( function() {
        counter += 2;
        wrappers.style.marginLeft = counter + 'px';
        if (counter === 0 ){
            clearInterval(reverse);
            setTimeout(function(){
                imageSlider();
            }, 1000);
        }else if ( counter % -600 === 0){
            clearInterval(reverse);
            holdImage(false);
        }
    }, 5);
}

setTimeout(function() {
    imageSlider();
}, 1000);

var rightArrow = document.createElement('div');
rightArrow.style.width = '20px';
rightArrow.style.height = '20px';
rightArrow.style.borderRadius = '50%'
rightArrow.innerHTML = " > ";
rightArrow.style.textAlign = 'center';
rightArrow.style.position = 'absolute';
rightArrow.style.marginTop = '-210px';
rightArrow.style.marginLeft = "560px"
rightArrow.style.backgroundColor = 'red';
rightArrow.style.color = 'white';

var container = document.getElementById('carousel-container');
container.appendChild(rightArrow);

var leftArrow = document.createElement('div');
leftArrow.style.width = '20px';
leftArrow.style.height = '20px';
leftArrow.style.borderRadius = '50%'
leftArrow.innerHTML = " < ";
leftArrow.style.textAlign = 'center';
leftArrow.style.position = 'absolute';
leftArrow.style.marginTop = '-210px';
leftArrow.style.backgroundColor = 'red';
leftArrow.style.marginLeft = "20px";
leftArrow.style.color = 'white';

var container = document.getElementById('carousel-container');
container.appendChild(leftArrow);

leftArrow.addEventListener('click', function() {
    var position =  parseInt( counter / -600 ) * -600;
    wrappers.style.marginLeft = position +'px';
    counter = position;
    if ( counter === 0 ){
        counter = -1800;
        clearInterval(slider);
        clearInterval(reverse);
        holdImage(false);
    }else if( counter % -600 === 0){
        counter = ( counter / -600 - 1 ) * -600; 
    }

});

rightArrow.addEventListener('click', function() {
    var position =  parseInt( counter / -600 + 1 ) * -600;
    wrappers.style.marginLeft = position +'px';
    counter = position;
    if( counter === -1800 ){
        counter = 0;
        clearInterval(reverse);
        clearInterval(slider);
        holdImage(true);
    }else if (counter % -600 === 0){
        counter = ( counter / -600 + 1) * -600; 
    }
});

let indicatorContainer = document.createElement('div');
indicatorContainer.style.width = '50%';
indicatorContainer.style.backgroundColor = 'red';
indicatorContainer.style.marginTop = '-20px';
indicatorContainer.style.position ='absolute';
indicatorContainer.style.marginLeft = '220px';

container.appendChild(indicatorContainer);

var images = document.getElementsByTagName('IMG');
var indicators = [];
for (var i = 0; i < images.length; i++){
    let indicator = document.createElement('div');
    indicator.style.width = '10px';
    indicator.style.height = '10px';
    indicator.style.borderRadius = '50%';
    indicator.style.backgroundColor = 'blue';
    indicator.style.marginTop = "-20px";
    indicator.style.float = 'left';
    indicator.style.marginLeft =  10 * ( i * 2 + 5)  +'px';
    indicators.push(indicator);

    indicatorContainer.appendChild(indicator);

    indicator.addEventListener('click', function() {
        var left = parseInt(indicator.style.getPropertyValue('margin-left'));
        console.log(left);
        var numberImage = ( left - 50 ) / 20;
        console.log(numberImage);
        counter = (numberImage * -600);
        
        if(counter === 0){
            clearInterval(reverse);
            clearInterval(slider);
            holdImage(true);
        }
        if(counter === -1800){
            clearInterval(slider);
            clearInterval(reverse);
            holdImage(false);
        }
        wrappers.style.marginLeft = counter + 'px';
    });

    indicator.addEventListener('mouseover', function(){
        indicator.style.backgroundColor = 'red';
    });
}

function selectActive(){
    if (counter >= -300){
        var activeIndicator = indicators[0];
        activeIndicator.style.backgroundColor = 'red';
        indicators[1].style.backgroundColor = 'blue';
        indicators[2].style.backgroundColor = 'blue';
        indicators[3].style.backgroundColor = 'blue';
    }else if (counter >= -900){
        var activeIndicator = indicators[1];
        activeIndicator.style.backgroundColor = 'red';
        indicators[0].style.backgroundColor = 'blue';
        indicators[2].style.backgroundColor = 'blue';
        indicators[3].style.backgroundColor = 'blue';
    }else if (counter >= -1500){
        var activeIndicator = indicators[2];
        activeIndicator.style.backgroundColor = 'red';
        indicators[1].style.backgroundColor = 'blue';
        indicators[3].style.backgroundColor = 'blue';
        indicators[0].style.backgroundColor = 'blue';
    }else{
        var activeIndicator = indicators[3];
        activeIndicator.style.backgroundColor = 'red';
        indicators[0].style.backgroundColor = 'blue';
        indicators[1].style.backgroundColor = 'blue';
        indicators[2].style.backgroundColor = 'blue';
    }
}

setInterval( function(){
    selectActive();
}, 100);

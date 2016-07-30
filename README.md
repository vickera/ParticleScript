# ParticleScript
Javascript plugin for creating a parallax and particle effect. 
View the <a href="http://andrewvickerman.com/exp/ParticleScript.html">demo</a>. 

##Usage:
Create a new instance of ParticleScript
>var ps = new ParticleScript({property:value});

Clears the canvas and refills it with new particles
>ps.refresh();

Move the particles in relation to x/y coordinates
>ps.moveWith(x,y,{property:value});

##Defaults:
###ParticleScript defaults:
*	selector: '#canvas',        //canvas id, it must be an id not a class.
*	refresh: 40,                //refresh rate of the canvas in miliseconds
*	number: 200,                //the number of particles on the canvas at one time
*	color: 'random',            //color of particles. accepts a color name, hex, rgba, or an array of colors
*	size: 6,                    //size of the particles. if set as 1, all particles will be the same size. 
*	minSize: 0,                 //sets a minimum size of particles
*	speed: 40,                  //speed of the particles
*	minSpeed: 0,                //sets a minimum speed of particles
*	shape: 'circle',            //the shape of the particles. square and circle are supported
*	background: 'black',        //background color of the canvas
*	pull: 'down',               //pull the particles in a direction. up/down/left/right/static
*	height: window.innerHeight, //height of the canvas
*	width: window.innerWidth    //width of the canvas

###moveWith method defaults:
*  invertX: true,              //invert the x-axis
*  invertY: true,              //invert the y-axis
*  speed: 0.25                 //the speed of parallax effect

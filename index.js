

$(document).ready(function(){
			var welcomeNavCentering, aboutNavCentering, contactNavCentering;

			var colorHolder = ["#82589F", "#3B3B98", "#F97F51", "#B33771", "#3B3B98", "#FC427B", "#58B19F", "#20bf6b", "#8854d0", "#3867d6", "#0fb9b1", "#6F1E51", "#ED4C67", "#A3CB38", "#006266", "#6ab04c", "#e056fd", "#f9ca24", "#ffbe76", "#7ed6df", "#30336b", "#130f40", "#eb4d4b", "#498205"];

			//ALS0, NEED THIS JQUER STATEMENT HERE FIRST IN ORDER TO RESIZE THE DIVS ON THE SPAWN OF THE WEBPAGE
			var maxHeight = $(window).height();
			var newWidthHolder = $(window).width() - 260 + 'px';
			var onPage = 0;

			setWidthOfDescriptions(parseInt(newWidthHolder));

			//confusion arose over why .width() and .height() were not working properply with $(document).ready(), but ultimately I figured out that
			//The document ready event executes already when the HTML-Document is loaded and the DOM is ready, even if all the graphics haven’t loaded yet...
			//The window load event executes a bit later when the complete page is fully loaded, including all frames, objects and images. 
			$(window).on('load', function(){
	            centerTextInNavs();
	            // setWidthOfDescriptions();
			});

			//put in array l8r
			// can prob do wit jquery, but dont feel like messing w/ their obj notation stuff
			var content1 = document.getElementById("actual_collapsable1");
			var content2 = document.getElementById("actual_collapsable2");
			var content3 = document.getElementById("actual_collapsable3");
			var content4 = document.getElementById("actual_collapsable4");

			var currentOpen = null;

//////////////////////////////////////////////////////////////////////////
//VARIABLES WHICH CHOOSE WHICH COLORS TO CHOOSE FROM OUR COLORHOLDER ARRAY
//THE COLORS HAVE DIFF RANGES... BOX1 RANGES FROM COLORS 1-10, BOX2 FROM 11 TO 19 AND SO ON
//////////////////////////////////////////////////////////////////////////

			var box1Color = Math.floor(Math.random() * (10 + 1));
			var box2Color = Math.floor(Math.random() * (19 - 11 + 1) + 11);
			var box3Color = Math.floor(Math.random() * (23 - 20 + 1) + 20);

//////////////////////////////////////////////////////////////////////////
//makes sure that kareem abdul jabar is always laying on the bottom of the screen
//and also animates him popping out
//////////////////////////////////////////////////////////////////////////

			var kareemHeight = $("#kareem").height()/2 - 95;

			$("#kareem").css({
			    "bottom": -1 * kareemHeight - 10 + "px"
			});

			$("#kareem").animate({
				left: "-600px"
			});

//////////////////////////////////////////////////////////////////////////
//

			$("#collapsable1").click(function(){
                showCollapsable(1);
                currentOpen = content1;
			});
			$("#collapsable2").click(function(){
                showCollapsable(2);
                currentOpen = content2;
			});
			$("#collapsable3").click(function(){
                showCollapsable(3);
                currentOpen = content3;
			});
			$("#collapsable4").click(function(){
                showCollapsable(4);
                currentOpen = content4;
			});
			
			
//////////////////////////////////////////////////////////////////////////
//This code ALIGNS OUR DIVS WHEN THE PAGE LOADS(BEFORE RESIZING)
//AND IT ALSO GIVES THEM SUM RANDOM COLORS OBTAINED FROM A BASIC ARRAY HOLDING THEM
//////////////////////////////////////////////////////////////////////////

			$("#header-text").css({
					"height": (maxHeight / 3) - 50 + "px",
					"background": colorHolder[box1Color]
				});
			$("#about-section").css({
				"height": (maxHeight / 3) - 50 + "px",
				"background": colorHolder[box2Color]
			});
			$("#contact-section").css({
				"height": (maxHeight / 3) - 50 + "px",
				"background": colorHolder[box3Color]
			});
		
//////////////////////////////////////////////////////////////////////////
//THIS ONES FIRES WHENEVER I EXPLICITLY RESIZE THE WINDOW
//////////////////////////////////////////////////////////////////////////

			$(window).resize(function(){
				//here, whenever the page is resized, we give a value for a newWidth of our description pages
				//there is a variable, onPage always keeping track of which page we are on atm, in order to
				//update the current windows width in realtime rather than waiting for us to click the nav button for the page again. yeehaw
				centerTextInNavs();
				// setWidthOfDescriptions(parseInt(newWidthHolder));
				newWidthHolder = $(window).width() - 260 + 'px';

				if(onPage == 1){
					$("#chimchom-descriptive").css({
						width: newWidthHolder
					});
					setWidthOfDescriptions(parseInt(newWidthHolder));
				}else if(onPage == 2){
					$("#chimchom2-descriptive, #actual_collapsable1, #actual_collapsable2, #actual_collapsable3, #actual_collapsable4").css({
						width: newWidthHolder
					});
					setWidthOfDescriptions(parseInt(newWidthHolder));
				}else if(onPage == 3){
					$("#chimchom3-descriptive").css({
						width: newWidthHolder
					});
					setWidthOfDescriptions(parseInt(newWidthHolder));
				}


				
				maxHeight = $(window).height();
				$("#header-text, #about-section, #contact-section").css({
					"height": (maxHeight / 3) - 50 + "px"
				});
				
				
					// font-size: 23px;
					// font-size: 11.5px;
			});

//////////////////////////////////////////////////////////////////////////
//MOVES DIVS TO THE LEFT TO SHOW DESCRIPTIVE VERSION FOR BUTTON. 
//Changes content inside nav div to an image for simplicity
//also we move kareem across the screen and fade him out when any nav div is clicked
//////////////////////////////////////////////////////////////////////////

			$("#header-text").click(function(){
				showKareem();
				bringBackContent(1);
				moveContent(1);
				setWidthOfDescriptions(parseInt(newWidthHolder));
				updateContent();
			});

			$("#about-section").click(function(){
				showKareem();
				bringBackContent(2);
				moveContent(2);
				setWidthOfDescriptions(parseInt(newWidthHolder));
				updateContent();
			});

			$("#contact-section").click(function(){
				showKareem();
				bringBackContent(3);
				moveContent(3);
				setWidthOfDescriptions(parseInt(newWidthHolder));
				updateContent();
			});


//////////////////////////////////////////////////////////////////////////

			//logic on collapsable divs for project descriptions on about page
			//figures out which should be closed when one is opened.
			//if none are currently opened, then it simply just opens the one that is clicked

			//also makes sure to scroll the html page to any divs that appear and cut off the page
			//I just realized, i was trying to animate the html and body's scrolltop val, but i should be
			//animating the scrolltop of our chimchom descriptions as those are holding all the content for each section

			function showCollapsable(showThisOne){
			   var toggledCollapsable = showThisOne;

			     
			   if(toggledCollapsable == 1){
			       content = content1;
			       // content[0].style.height = "500px";
			   }else if(toggledCollapsable == 2){
			       content = content2;
			   }else if(toggledCollapsable == 3){
			       content = content3;
			   }else{
			       content = content4;
			   }

	     	   if(content.style.maxHeight){
	     	   		content.style.maxHeight = null;
	     	   }else{
	     	   		content.style.maxHeight = content.scrollHeight + "px";
	     	   		$('#chimchom2-descriptive').animate({scrollTop: jQuery(content).offset().top}, 200);
	     	   }

	     	   if(currentOpen !== null && currentOpen !== content){
	     	   	currentOpen.style.maxHeight = null;
	     	   }
			}

			function moveContent(checker){
				var div1;
				var div2;

				if(checker == 1){
					$div1 = $("#chimchom2-descriptive");
					$div2 = $("#chimchom3-descriptive");
					onPage = 1;
				}else if(checker == 2){
					$div1 = $("#chimchom-descriptive");
					$div2 = $("#chimchom3-descriptive");
					onPage = 2;
				}else{
					$div1 = $("#chimchom-descriptive");
					$div2 = $("#chimchom2-descriptive");
					onPage = 3;


				}

				//moves nav bars to the left!
				$("#header-text, #about-section, #contact-section").animate({
					left: '0%',
					width: '210px',
					marginRight: '0px'
					// position: 'fixed'
				},300);


				//brings the nav boxes to the back... text/links/back button to the front
				$("#bubble-holder").animate({
					zIndex: "1"
				});

				//these 2 statments move the other two descriptive pages not being used atm
				$div1.animate({
					right: newWidthHolder,
					width:''
				},700);

				$div2.animate({
					right: "0",
					width:''

				},700);


			};

			//makes the nav boxes hold basic icons rather than text.
			//since the nav boxes have gotten significantly smaller. idk, i think its nice!
			function updateContent(){
			    var spacer = ($("#header-text").height() - 120 ) / 2;
			    // console.log(spacer);
				$("#header-mini-pic").css({
					"width": "120px",
					"height": "120px",

					"padding-top":spacer + "px",

					"margin":"0 auto",

					"display": "block",

					"content": "url(./Images/open-hand.png)"
				});

				$("#about-mini-pic").css({
					"width": "120px",
					"height": "120px",

					"padding-top":spacer + "px",					

					"margin":"0 auto",

					"display": "block",

					"content": "url(./Images/question.png)"
				});

				$("#contact-mini-pic").css({
					"width": "120px",
					"height": "120px",

					"padding-top":spacer + "px",

					"margin":"0 auto",

					"display": "block",

					"content": "url(./Images/phone-book.png)"
				});

				$("#welcome, #about, #contact").text("");

				$("#welcome-text, #about-text, #contact-text").css({
					"display": "none"
				});
			}

			function bringBackContent(decider){
				//this will make sure all the divs we made dissapear at the first button click reappear for the next button click(whatever it may be)
				if(decider == 1){
					$("#chimchom-descriptive").animate({
						width:newWidthHolder,
						right:"0"
					},700);
				}else if(decider ==2){
					$("#chimchom2-descriptive").animate({
						width:newWidthHolder,
						right:"0"
					},700);
				}else if(decider == 3){
					$("#chimchom3-descriptive").animate({
						width:newWidthHolder,
						right:"0"
					},700);
				}
				// }else{
				// 	$("#header-descriptive,#about-descriptive, #contact-descriptive").animate({
				// 		width:"100%",
				// 		right:"0"
				// 	},1000);
				// }

			}

			function showKareem(){

				$("#kareem, #kareemimg").animate({
					left: "100%",
				}, 1800);

				$("#kareem").fadeOut(1);

				
			}
//////////////////////////////////////////////////////////////////////////
//this is for changing back our nav divs to original junks once bacc button is clicked
//////////////////////////////////////////////////////////////////////////
				
			$("#go-back").click(function(){
				onPage = 0;
				maxHeight = $(window).height();

				$("#header-text, #about-section, #contact-section").animate({
					height: (maxHeight / 3) - 50 + 'px',
					right: '0%',
					width: '100%',
					padding: '25'
				});
				
				

				// $("header-descriptive").animate({
				// 	width: "",
				// 	right:"0"
				// });

				$("#bubble-holder").css({
					zIndex: "20"
				});


				bringBackContent();

				//makes the nav boxes back to normal(no longer using icons)...
				//back to normal text and descriptions.
				$("#header-mini-pic, #about-mini-pic, #contact-mini-pic").css({
					"display": "none",
				});

				$("#welcome").text("WHY, HELLO!");
				$("#about").text("LEARN ABOUT ME");
				$("#contact").text("CONTACT ME");

				$("#welcome").css({
					"padding-top": welcomeNavCentering + "px",
					"font-size": "200%"
				});
				$("#about").css({
					"padding-top": aboutNavCentering + "px",
					"font-size": "200%"
				});
				$("#contact").css({
					"padding-top": contactNavCentering + "px",
					"font-size": "200%"
				});
				
				
				
				$("#welcome-text, #about-text, #contact-text").css({
					"display": "block"
				});
			});

//////////////////////////////////////////////////////////////////////////
//function used fir centering the text in our nav divs... the greeting, the p elements, etc
//////////////////////////////////////////////////////////////////////////

			function centerTextInNavs(){
                welcomeNavCentering = ((($("#header-text").height() - 50) - ($("#welcome").height() + $("#welcome-text").height() - 10)) / 2);
                aboutNavCentering = ((($("#about-section").height() - 50) - ($("#about").height() + $("#about-text").height() - 10)) / 2);
                contactNavCentering = ((($("#contact-section").height() - 50) - ($("#contact").height() + $("#contact-text").height() - 10)) / 2);

                $("#welcome").css({
					    "padding-top": welcomeNavCentering + "px",
				    	"font-size": "200%"
			    });
			     $("#about").css({
					    "padding-top": aboutNavCentering + "px",
				    	"font-size": "200%"
			    });
			     $("#contact").css({
					    "padding-top": contactNavCentering + "px",
				    	"font-size": "200%"
			    });
            }


            function setWidthOfDescriptions(width){
            	var windowWidth = width;
            	var descriptionWidth = windowWidth * .75;

            	console.log(windowWidth + "*" + ".75" + "=" + descriptionWidth);

            	$("#chimchom-descriptive p, #chimchom2-descriptive p, #chimchom3-descriptive p").css({
            		width: descriptionWidth + "px"
            	});
            }

    

//////////////////////////////////////////////////////////////////////////
//ok now i need to somehow make a logic section to determine how and when to transition our
//divs from left to right...
//like, if i click on about section first, the about section will obv scroll over...
//but if i hit the contact button, maybe the about section can scroll to the left... or back to the right!!! idk!
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////

			setInterval(function() {counter()}, 0);

			function counter(){
					// $("#imgHolder").animate({width: "210px", height: "210px"});
					// $("#imgHolder").animate({width: "200px", height:"200px"});
			}

//////////////////////////////////////////////////////////////////////////
		});
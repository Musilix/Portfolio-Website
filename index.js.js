$(document).ready(function(){
			var colorHolder = ["#82589F", "#3B3B98", "#F97F51", "#B33771", "#3B3B98", "#FC427B", "#58B19F", "#20bf6b", "#8854d0", "#3867d6", "#0fb9b1", "#6F1E51", "#ED4C67", "#A3CB38", "#006266", "#6ab04c", "#e056fd", "#f9ca24", "#ffbe76", "#7ed6df", "#30336b", "#130f40", "#eb4d4b", "#498205"];
			// $('body').css('background', '#ffffff').fadeOut(1, function(){
			// 	$('body').css('background', '#ffff00').fadeIn(1000);
			// });

			// I ALSO NOTICE SOMETHING IN HERE................ THE DIVS I WANT TO HAVE RESIZED DO IT PROPERLY WHEN I EXPLICITLY MOVE THE WINDOW AROUND
			//BUT, IF I RESIZE THE WINDOW BY DRAGGIN AND UNLOCKING IT FROM WHERE IT IS - WHICH MAKES IT SIZE DOWN TO WHEREEVER I HAD RESIZED IT BEFORE CLIPPING IT TO THE SIDE, TOP, OR BOTTOM OF THE WINDOW - IT DOESNT REGISTER THE RESIZE... SO FIGURE SOMETHING OUT ABOUT THAT AND YOURE GOOD.

			//ALS0, NEED THIS JQUER STATEMENT HERE FIRST IN ORDER TO RESIZE THE DIVS ON THE SPAWN OF THE WEBPAGE
			var maxHeight = $("html").height();
			var newWidthHolder = $(window).width() - 260 + 'px';
			var onPage = 0;

			var welcometNavCentering;
			var aboutNavCentering;
			var contactNavCentering;

			//put in array l8r
			var content1 = document.getElementById("actual_collapsable1");
			var content2 = document.getElementById("actual_collapsable2");
			var content3 = document.getElementById("actual_collapsable3");
			var content4 = document.getElementById("actual_collapsable4");

			var currentOpen = null;

			var x = {'foo':'bar'}
			var y = {'baz':x}
			var z = y['baz']['foo']

			console.log(z);

//////////////////////////////////////////////////////////////////////////
//VARIABLES WHICH CHOOSE WHICH COLORS TO CHOOSE FROM OUR COLORHOLDER ARRAY
//THE COLORS HAVE DIFF RANGES... BOX1 RANGES FROM COLORS 1-10, BOX2 FROM 11 TO 19 AND SO ON
//////////////////////////////////////////////////////////////////////////

			var box1Color = Math.floor(Math.random() * (10 + 1));
			var box2Color = Math.floor(Math.random() * (19 - 11 + 1) + 11);
			var box3Color = Math.floor(Math.random() * (23 - 20 + 1) + 20);


			var kareemHeight = $("#kareem").height()/2 - 95;
			$("#kareem").css({
			    "bottom": -1 * kareemHeight - 10 + "px"
			});

			$("#kareem").animate({
				left: "-600px"
			});
			
			
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
			
			function showCollapsable(showThisOne){
			   var toggledCollapsable = showThisOne;
			   
			 //  $(content1, content2, content3, content4).animate({
			 //      display: "none"
			 //  },100));
			   
			   // $("#actual_collapsable1, #actual_collapsable2, #actual_collapsable3, #actual_collapsable4").css({
			   //     "max-height": "0px"
			   // });

			   
			   
			   if(toggledCollapsable == 1){
			       content = content1;
			       // console.log(content[0]);
			       // content[0].style.height = "500px";
			   }else if(toggledCollapsable == 2){
			       content = content2;
			   }else if(toggledCollapsable == 3){
			       content = content3;
			   }else{
			       content = content4;
			   }
			   //need to make content "active" as content... the collapsable has no display atm; meaning its not techincally there. not active. so we add this to keep it invisible but still active in tha game!
			   // content.toggle("active");
			  
	     	   if(content.style.maxHeight){
	     	   		content.style.maxHeight = null;
	     	   }else{
	     	   		content.style.maxHeight = content.scrollHeight + "px";
	     	   		// currentOpenCollapsable.style.maxHeight = null;
	     	   }

	     	   if(currentOpen !== null && currentOpen !== content){
	     	   	currentOpen.style.maxHeight = null;
	     	   }
	     	   
			}
			
			
//////////////////////////////////////////////////////////////////////////
//this code ALIGNS OUR FUCKING DIVS WHEN THE PAGE LOADS(BEFORE RESIZING)
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
            centerTextInNavs();
			$(window).resize(function(){
				//here, whenever the page is resized, we give a value for a newWidth of our description pages
				//there is a variable, onPage always keeping track of which page we are on atm, in order to
				//update the current windows width in realtime rather than waiting for us to click the nav button for the page again. yeehaw
				centerTextInNavs();
				newWidthHolder = $(window).width() - 260 + 'px';
				if(onPage == 1){
					$("#chimchom-descriptive").css({
						width: newWidthHolder
					});
				}else if(onPage == 2){
					$("#chimchom2-descriptive, #actual_collapsable1,#actual_collapsable2,#actual_collapsable3,#actual_collapsable4").css({
						width: newWidthHolder
					});
				}else if(onPage == 3){
					$("#chimchom3-descriptive").css({
						width: newWidthHolder
					});
				}
				
				maxHeight = $(window).height();
				$("#header-text, #about-section, #contact-section").css({
					"height": (maxHeight / 3) - 50 + "px"
				});
				
				
					// font-size: 23px;
					// font-size: 11.5px;
			});

//////////////////////////////////////////////////////////////////////////
//MOVES DIVS TO THE LEFT TO SHOW DESCRIPTIVE VERSION FOR BUTTON. CHANGES TEXT DISPLAYED IN BOXES TOO
//////////////////////////////////////////////////////////////////////////

			$("#header-text").click(function(){
				showKareem();
				bringBackContent(1);
				moveContent(1);
				updateContent();
			});

			$("#about-section").click(function(){
				bringBackContent(2);
				moveContent(2);
				updateContent();
			});

			$("#contact-section").click(function(){
				bringBackContent(3);
				moveContent(3);
				updateContent();
			});

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
				},300);

				$div2.animate({
					right: newWidthHolder,
					width:''

				},300);
			};

			//makes the nav boxes hold basic icons rather than text.
			//since the nav boxes have gotten significantly smaller. idk, i think its nice!
			function updateContent(){
			    var spacer = ($("#header-text").height() - 120 ) / 2;
				$("#header-mini-pic").css({
					"width": "120px",
					"height": "120px",

					"padding-top":spacer + "px",

					"vertical-align":"middle",

					"margin":"0 auto",

					"display": "block",

					"content": "url(./Images/open-hand.png)"
				});
				$("#welcome").text("");


				$("#about-mini-pic").css({
					"width": "120px",
					"height": "120px",

					"padding-top":spacer + "px",					

					"vertical-align":"middle",

					"margin":"0 auto",

					"display": "block",

					"content": "url(./Images/question.png)"
				});
				$("#about").text("");


				$("#contact-mini-pic").css({
					"width": "120px",
					"height": "120px",

					"padding-top":spacer + "px",

					"vertical-align":"middle",

					"margin":"0 auto",

					"display": "block",

					"content": "url(./Images/phone-book.png)"
				});
				$("#contact").text("");
				// $("#welcome, #about, #contact").text("HI");

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
					},1100);
				}else if(decider ==2){
					$("#chimchom2-descriptive").animate({
						width:newWidthHolder,
						right:"0"
					},1500);
				}else if(decider == 3){
					$("#chimchom3-descriptive").animate({
						width:newWidthHolder,
						right:"0"
					},1500);
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
//this is for changing back our nav divs to original shits once bacc button is clicked
//////////////////////////////////////////////////////////////////////////

            function centerTextInNavs(){
                welcomeNavCentering = ((($("#header-text").height() - 50) - ($("#welcome").height() + $("#welcome-text").height() - 10)) / 2);
                aboutNavCentering = ((($("#about-section").height() - 50) - ($("#about").height() + $("#about-text").height() - 10)) / 2);
                contactNavCentering = ((($("#contact-section").height() - 50) - ($("#contact").height() + $("#contact-text").height() - 10)) / 2);
            
                $("#welcome").css({
					    "padding-top": welcomeNavCentering + "px",
				    	"font-size": "25px"
			    });
			     $("#about").css({
					    "padding-top": aboutNavCentering + "px",
				    	"font-size": "25px"
			    });
			     $("#contact").css({
					    "padding-top": contactNavCentering + "px",
				    	"font-size": "25px"
			    });
            }
				
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
					"font-size": "25px"
				});
				$("#about").css({
					"padding-top": aboutNavCentering + "px",
					"font-size": "25px"
				});
				$("#contact").css({
					"padding-top": contactNavCentering + "px",
					"font-size": "25px"
				});
				
				
				
				$("#welcome-text, #about-text, #contact-text").css({
					"display": "block"
				});
			});


            

//////////////////////////////////////////////////////////////////////////
//ok now i need to somehow make a logic section to determine how and when to transition our
//divs from left to right...
//like, if i click on about section first, the about section will obv scroll over...
//but if i hit the contact button, maybe the about section can scroll to the left... or back to the right!!! idk!
//////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////

			setInterval(function() {counter()}, 0);

			function counter(){
					$("#imgHolder").animate({width: "210px", height: "210px"});
					$("#imgHolder").animate({width: "200px", height:"200px"});
			}

//////////////////////////////////////////////////////////////////////////
		});
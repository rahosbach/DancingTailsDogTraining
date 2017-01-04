'use strict';var $isMobile,windowHeight,windowWidth,preload,cover;var showMenu=false;$(document).ready(function(){$isMobile=navigator.userAgent.match(/(Phone|iPod|iPad|Android|BlackBerry)/);windowWidth=$(window).width();windowHeight=$(window).height();windowResize()
document.addEventListener("scroll",headerScroll,false);document.addEventListener("touchmove",headerScroll,false);$(window).scroll(function(){headerScroll();})
var temp=new Image();temp.src="../Dancing-Tails-Dog-Training-low.jpg";temp.onload=function(){$('html body').css("opacity",1);logoAnimation();preloadImages();}
$('#mobileMenu').click(function(){if(!showMenu){showMenu=true;$('.navItem').addClass('showMenu');$('nav').css({height:$(window).height(),"overflow-y":"scroll"});}else{showMenu=false;$('.navItem').removeClass('showMenu');$('nav').css({height:"77px","overflow-y":"hidden"});}})
$('#brand, .navItem').click(function(){showMenu=false;$('.navItem').removeClass('showMenu');$('nav').css({height:"77px","overflow-y":"hidden"});});trackIndex();})
function checkMobile(){if($isMobile!=null){$('body').addClass("mobileMode");$('.bg').css("background-attachment","scroll");}}function layoutResize(){windowWidth=$(window).width();windowHeight=$(window).height();checkMobile();$('.splash').css('height',windowHeight);$('#footerSpace').css('height',$('footer').height()+40);$('#services .panelContainer:first-child').css('height',windowHeight-77);if(windowWidth<=400)$('.pageEnd').css('height',windowHeight*0.8);else $('.pageEnd').css('height',windowHeight*0.54);if(windowWidth<701)$('#video .panelContainer p').removeClass('hideBottom');else $('#video .panelContainer p').addClass('hideBottom');if(windowWidth>520){showMenu=false;$('.navItem').removeClass('showMenu');$('nav').css({height:"77px","overflow-y":"hidden"});}if(windowWidth>=2000){loadHighRes();window.setTimeout(function(){if(windowWidth>=3000){loadHighRes();}},500);}}function windowResize(){$(window).resize(function(){if($(window).width()!=windowWidth||$(window).height()!=windowHeight){layoutResize();}});}function hoverEffect(parent,child){$(parent).hover(function(){$(this).find(child).removeClass("hideBottom");},function(){$(this).find(child).addClass("hideBottom");})}function logoAnimation(){window.setTimeout(function(){$("#logoText").css("top",0);$("#homeCover").find(".hideBottom").removeClass("hideBottom");window.setTimeout(function(){$("#logoDog1").css({"opacity":1,"top":0});window.setTimeout(function(){$("#logoDog2").css({"opacity":1,"top":0});window.setTimeout(function(){$("#logoDog3").css({"opacity":1,"top":0});},800);},800);},800);},800);}function headerScroll(){var pattern=/.+\/([^\/]+)/;var regexpMatches=pattern.exec(window.location.href);if(regexpMatches[1]=="services"){if($('#categoryOutter').height()*0.5+windowHeight>=$(window).scrollTop()+windowHeight){$('#categoryInner').removeClass("fixed");}else if($(window).scrollTop()+windowHeight+$('#categoryOutter').height()*0.7-$('#categoryOutter').height()<$('#categoryOutter').offset().top){fixedCategory();}else{$('#categoryInner').removeClass("fixed");if($(window).scrollTop()+windowHeight-$('#categoryOutter').offset().top>=70||$(window).scrollTop()+windowHeight-$('#categoryOutter').offset().top<=150)$('#categoryInner .grid-third').find('.panel').css("height",$(window).scrollTop()+windowHeight-$('#categoryOutter').offset().top);}}}function fixedCategory(){$('#categoryInner').addClass("fixed");if($(window).scrollTop()+windowHeight-$('#categoryOutter').offset().top>=70||$(window).scrollTop()+windowHeight-$('#categoryOutter').offset().top<=150)$('#categoryInner .grid-third').find('.panel').css("height",$(window).scrollTop()+windowHeight-$('#categoryOutter').offset().top);}function loadingHome(){if(cover!=null)cover.onload=null;var url="../Dancing-Tails-Dog-Training-standard.jpg";cover=new Image();cover.src=url;var bgUrl="url('"+url+"')";cover.onload=function(){$("#homeCover").css("background-image",bgUrl);logoAnimation();}}function loadingContact(){if(cover!=null)cover.onload=null;var url="../Golden-Retriever-Lay-Contact-standard.jpg";cover=new Image();cover.src=url;var bgUrl="url('"+url+"')";cover.onload=function(){$('html body').css("opacity",1);$(".splash").css("background-image",bgUrl);$(".splash").find(".hideBottom").removeClass("hideBottom");}}function preloadImages(){var temp=new Array();var images=["../French-Bulldog-Training-Sit-low.jpg","../Training-Walking-On-Leash-low.jpg","https://yt3.ggpht.com/-JJL7Q1EM588/AAAAAAAAAAI/AAAAAAAAAAA/5HgAWEqoNyU/s240-c-k-no/photo.jpg","https://i.ytimg.com/vi/5ckKE-pHR5Y/hqdefault.jpg","../Alyssa-Hosbach-low.jpg","../Golden-Retriever-Lay-Contact-standard.jpg"];for(var i=0;i<images.length;i++){temp[i]=new Image();temp[i].src=images[i];}}function loadHighRes(){if(preload!=null)preload.onload=null;preload=new Array();var bg=$("#main").find(".bg, img");var i;for(i=0;i<bg.length;i++){var imageUrl;if($(bg[i]).attr('src')===undefined){var imageUrl=$(bg[i]).attr("style").match(/background-image.+/)[0];var pattern=/.+\/([^\/'");]+)/;imageUrl=pattern.exec(imageUrl);imageUrl="../"+imageUrl[1];}else{imageUrl=$(bg[i]).attr('src')}var res=imageUrl.match(/-.+\./);if(res&&res[0].substring(1,res[0].length-1)!="high"){if(res[0].substring(1,res[0].length-1)=="low"){imageUrl=imageUrl.replace(/-.+\./,"-standard.");}else if(res[0].substring(1,res[0].length-1)=="standard"){imageUrl=imageUrl.replace(/-.+\./,"-high.");}}preloading(bg[i],imageUrl,i);}}function preloading(selector,url,i){preload[i]=new Image();preload[i].src=url;if($(selector).attr('src')===undefined){var bgUrl="url('"+url+"')";preload[i].onload=function(){$(selector).css("background-image",bgUrl);}}else{preload[i].onload=function(){$(selector).attr('src',url);}}}function setVideoID(id){videoID=id;}var player,videoID,iframeLoaded=false;function onYouTubeIframeAPIReady(){player=new YT.Player('player',{height:'500',width:'840',videoId:videoID,events:{'onReady':onPlayerReady,}});}function onPlayerReady(event){event.target.playVideo();}var done=false;function onPlayerStateChange(event){if(event.data==YT.PlayerState.PLAYING&&!done){setTimeout(stopVideo,6000);done=true;}}function stopVideo(){player.stopVideo();}function validate(selector){var pattern,input,match,validated;var $input;if($(selector).attr('id')==$('#userName').attr('id')||$(selector).attr('id')==$('#dogName').attr('id')||$(selector).attr('id')==$('#dogBreed').attr('id')){pattern=/[a-zA-Z ]+/;$input=$(selector).find('input');input=$input.val().toUpperCase();match=input.match(pattern);validated=(match==input?true:false);}else if($(selector).attr('id')==$('#userPhone').attr('id')){$input=$(selector).find('input');input=$input.val();if(input.match(/[a-zA-Z]/)){validated=false;}else{input=input.replace(/[^0-9]/g,"");validated=input.length==10||input.length==11?true:false;}}else if($(selector).attr('id')==$('#userEmail').attr('id')){pattern=/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b/;$input=$(selector).find('input');input=$input.val().toLowerCase();match=input.match(pattern);validated=(match==input?true:false);}else if($(selector).attr('id')==$('#messageContent').attr('id')||$(selector).attr('id')==$('#dogAge').attr('id')||$(selector).attr('id')==$('#how').attr('id')){$input=$(selector).find('textarea').length?$(selector).find('textarea'):$(selector).find('input');input=$input.val();validated=(input!=''?true:false);}if(validated){$(selector).find('.validation').removeClass("glyphicon glyphicon-remove red").addClass("glyphicon glyphicon-ok green");$input.css("border-color","#1BA39C");}else{$(selector).find('.validation').removeClass("glyphicon glyphicon-ok green").addClass("glyphicon glyphicon-remove red");$input.css("border-color","red");}return validated;}Date.prototype.formatDate=function(){var monthArr=["January","February","March","April","May","June","July","August","September","October","November","December"];var weekdayArr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return monthArr[this.getMonth()]+" "+this.getDate()+", "+this.getFullYear()+" - "+weekdayArr[this.getDay()];}
Date.prototype.convertDate=function(){var month=(this.getMonth()+1).toString();var date=this.getDate().toString();return this.getFullYear()+"-"+(month.length==2?month:"0"+month[0])+"-"+(date.length==2?date:"0"+date[0]);}
Date.prototype.formatTime=function(){var hours=this.getHours();var minutes=this.getMinutes();var AMPM=hours>=12?'PM':'AM';hours=hours%12;hours=hours?hours:12;minutes=minutes<10?'0'+minutes:minutes;var time=hours+':'+minutes+' '+AMPM;return time;}
String.prototype.formatPhone=function(){var temp=this;if(this.length==10)temp='1'+this;return[temp.slice(0,1)," (",temp.slice(1,4),") ",temp.slice(4,7),"-",temp.slice(7,this.length)].join('');}
String.prototype.capitalizedFirst=function(){return this.replace(/\w\S*/g,function(word){return word.charAt(0).toUpperCase()+word.substr(1).toLowerCase();});}
function trackPage(page){(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-60893247-1','www.dancingtailsdogtraining.com');ga('send',{'hitType':'pageview','page':page});}function trackIndex(){$('#menu .navItem').on('click',function(){ga('send','event','button','click','NavMenu');});$('#navContact a').on('click',function(){ga('send','event','button','click','NavPhone');});$('footer .grid-third:last-child ul li a').on('click',function(){ga('send','event','button','click','FooterMenu');});$('footer .grid-third:first-child aside:first-child a').on('click',function(){ga('send','event','button','click','FooterContact');});$('footer .grid-third:last-child .socialMedia a').on('click',function(){ga('send','event','button','click','SocialMedia');});$('footer .grid-third:last-child .credit a').on('click',function(){ga('send','event','button','click','zxz');});}function trackHome(){$('.pageEnd a').on('click',function(){ga('send','event','button','click','banner');});}function trackServices(){$('#categoryInner .grid-third .panel').on('click',function(){ga('send','event','button','click','categoryButtons');});$('.pageEnd a').on('click',function(){ga('send','event','button','click','banner');});};function trackPhilosophy(){$('.listItem a').on('click',function(){ga('send','event','button','click','Resources');});$('.pageEnd a').on('click',function(){ga('send','event','button','click','banner');});};function trackVideos(){$('#youtube a').on('click',function(){ga('send','event','button','click','Youtube');});};function trackAbout(){$('#bio > .panelContainer:nth-child(2) button').on('click',function(){ga('send','event','button','click','ReadMore');});};function trackContact(){$('.contactInfo a').on('click',function(){ga('send','event','button','click','pageContact');});};
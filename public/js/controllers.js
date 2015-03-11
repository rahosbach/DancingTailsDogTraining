'use strict';

/* Controllers */
function HomeCtrl($scope, $http){
  window.scrollTo(0,0);
  loadingHome();
  layoutResize();
  $http.get('api/reviews')
    .success(function(data, status, headers, config){
      $scope.reviews = data.reviews;
    });
  $scope.moveDown = function(){
      $("html, body").animate({scrollTop:$("#customer").offset().top-80}, '500', 'swing');
  }
}
function AboutCtrl($scope){
  window.scrollTo(0,0);
  $scope.ReadMore=false;
  layoutResize();
}
function PhilosophyCtrl($scope){
  window.scrollTo(0,0);
  layoutResize();
}
function ContactCtrl($scope, $http){
  window.scrollTo(0,0);
  layoutResize();
  loadingContact();
  hoverEffect("#contact .contactInfo .grid-half:last-child .panel","p");
  $scope.moveDown = function(){
      $("html, body").animate({scrollTop:$(".contactInfo").offset().top-80}, '500', 'swing');
  }
  $('#userName').change(function(){
    validate($(this));
  });
  $('#userPhone').change(function(){
    validate($(this));
  });
  $('#userEmail').change(function(){
    validate($(this));
  });
  $('#dogName').change(function(){
    validate($(this));
  });
  $('#dogBreed').change(function(){
    validate($(this));
  });
  $('#dogAge').change(function(){
    validate($(this));
  });
  $('#messageContent').change(function(){
    validate($(this));
  });
  $('#how').change(function(){
    validate($(this));
  });

  $scope.form = {};
  $scope.submitMessage = function(){
    var temp = new Date();
    $scope.form.date = {
      full:temp,
      date:temp.formatDate(),
      time:temp.formatTime()
    };
    var validitymsg = "validated";
    if (!validate($('#userName')) || !validate($('#userEmail')) || !validate($('#userPhone')) || !validate($('#dogName')) || !validate($('#dogBreed')) || !validate($('#dogAge')) || !validate($('#messageContent')) || !validate($('#how'))){
      validitymsg = "Something is not right..\n";
      if (!validate($('#userName'))){
        validitymsg = validitymsg+"\nInvalid Name. [Alphabet A-Z Only]";
      } 
      if (!validate($('#userEmail'))){
        validitymsg = validitymsg+"\nInvalid E-mail. [John.Smith@example.com]";
      }
      if (!validate($('#userPhone'))){
        validitymsg = validitymsg+"\nInvalid Phone Number. [9-10 numbers]";
      }
      if (!validate($('#dogName'))){
        validitymsg = validitymsg+"\nInvalid Dog Name. [Alphabet A-Z Only]";
      }
      if (!validate($('#dogBreed'))){
        validitymsg = validitymsg+"\nInvalid Breed. [Alphabet A-Z Only]";
      }
      if (!validate($('#dogAge'))){
        validitymsg = validitymsg+"\nInvalid Dog Age.";
      }
      if (!validate($('#messageContent'))){
        validitymsg = validitymsg+"\nEmpty Message. ";
      }
      if (!validate($('#how'))){
        validitymsg = validitymsg+"\nPlease let us know how you heard about us.";
      }

    }
    $scope.form.owner = $scope.form.owner.capitalizedFirst();
    $scope.form.phone = $scope.form.phone.replace(/[^0-9]/g,"").formatPhone();
    $scope.form.email = $scope.form.email.toLowerCase();
    $scope.form.dog = $scope.form.dog.capitalizedFirst();
    $scope.form.breed = $scope.form.breed.capitalizedFirst();
    $scope.form.age = $scope.form.age.capitalizedFirst();

    if(validitymsg == "validated"){
      if(confirm("Ready to send?")==true){
        $http.post('/api/messages/new', $scope.form)
        .success(function(data){
          $scope.sent="Message Sent! Thank you for your interest in Dancing Tails. I'll get back to you as soon as possible."
          $('#messageResult').fadeIn("fast");
        })
      }
    }
    else{
      console.log(validitymsg);
      alert(validitymsg);
    }
  }
  $scope.close = function(){
    $('#messageResult').fadeOut("fast");
  }
}
function ServicesCtrl($scope,$http,$timeout){
  window.scrollTo(0,0);
  layoutResize();
  $("#services2 .grid-third .panel:first-child").hover(
    function(){
      $(this).find("h1").css("top","47%");
    },
    function(){
      $(this).find("h1").css("top","50%");
    }
  );

  $http.get('api/services')
    .success(function(data, status, headers, config){
      $scope.services = data.services;
    });
  $scope.moveDown = function(){
    $("html, body").animate({scrollTop:$(".serviceInner").offset().top-$(window).height()/2}, '500', 'swing');
  }
  $scope.showDetails = function(session){
    $("html, body").animate({scrollTop:$(".serviceInner").offset().top-80}, '500', 'swing');
    $scope.services.forEach(function(category, i){
      category.packages.forEach(function(pack, i){
        if (i == session) pack.state = !pack.state;
        else pack.state = false;
      });
    });
  }
  $scope.showProgram = function(program){
    if ($scope.services[program].state==true){
      $(".serviceInner").css({height:"0"});
      $("html, body").animate({scrollTop:$(".serviceInner").offset().top-$(window).height()/2}, '500', 'swing')
      $timeout(function(){
        $scope.services[program].state = false;
      }, 500);
    }
    else{
      $(".serviceInner").css({height:"100%"});
      $("html, body").animate({scrollTop:$(".serviceInner").offset().top-80}, '500', 'swing');
      $(".price").removeClass("active");
      $(".price").click(function(){
        if (!($(this).hasClass("active"))) {
          $(".price").removeClass("active");
          $(this).addClass("active");
        }
        else $(this).removeClass("active");
      })
      $scope.services.forEach(function(category, i){
        if(i==program) category.state = true;
        else category.state = false;
        category.packages.forEach(function(pack, i){
          pack.state = false;
        });
      })
    }
  }
}
function VideosCtrl($scope,$http,$timeout){
  window.scrollTo(0,0);
  layoutResize();
  $http.get('api/videos')
    .success(function(data, status, headers, config){
        $scope.channel = data.channel;
        $scope.videos = data.videos;
      });

  $scope.playVideo = function (id){
    $("#playerLayer").removeClass("invisible").css("opacity",1);
    if(iframeLoaded) player.loadVideoById(id);
    else{
      iframeLoaded = true;
      setVideoID(id);
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[1];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }
  $scope.closeVideo = function(){
    stopVideo();
    $("#playerLayer").css("opacity",0);
    $timeout(function(){$("#playerLayer").addClass("invisible")},500);
  }
  $scope.hoverEffect = function(){
    if ($(window).width() < 701) $('#video .panelContainer p').removeClass('hideBottom');
    else $('#video .panelContainer p').addClass('hideBottom');
    hoverEffect(".panelContainer", "p");
    $("#video .grid-half .panelContainer").hover(
      function(){
        if ($(window).width() > 700){
          $(this).find(".viewButton").css("top","47%");
        }
      },
      function(){
        if ($(window).width() > 701){
          $(this).find(".viewButton").css("top","50%");
        }
      }
    );
    $("#video .viewButton").hover(function(){
      $(this).find("path").css("fill","#1BA39C");
      $(this).find("polygon").css("stroke","#1BA39C")
    },function(){
      $(this).find("path").css("fill","#ffffff");
      $(this).find("polygon").css("stroke","#ffffff")
    });
  }
}
function MessagesCtrl($scope, $http, $route){
  $scope.all=true;
  $http.get('api/messages')
    .success(function(data, status, headers, config){
      $scope.messages = data;
    });
  $scope.starMessage = function(id, starred){
    $http.put('api/messages/'+id, {"starred":starred})
      .success(function(data){
      })
  }

  $scope.deleteMessage = function(id){
    var currentMsg = "#"+id;
    if(confirm("Are you sure you want to delete this message?")==true){
      $http.delete('api/messages/'+id)
        .success(function(data){
          $(currentMsg).fadeOut("fast");
        })
    }
  }
  $scope.viewStarred = function(){
    $scope.all = false;
    $scope.starred = true;
    $http.get('api/starredMessages')
      .success(function(data, status, headers, config){
        $scope.messages = data;
      })
  }
  $scope.viewAll = function(){
    $scope.all = true;
    $scope.starred = false;
    $http.get('api/messages')
      .success(function(data, status, headers, config){
        $scope.messages = data;
      });
  }
}
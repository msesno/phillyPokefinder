
// GLOBAL VARIABLES
var res;
var thumb;
var character = {};
var despawn = moment();
var localDump = [];
var filteredSearch = [];

var imgSrc;
$(document).ready(function () {

  // $("audio#opening-theme")[0].play();
  $("#submit").click(HandleSearchSubmit);
  $("#btnRefresh").click(Refresh);


  $('.play').click(function(){
    var $this = $(this);
    var id = $this.attr('id').replace(/btn/, '');
    $this.toggleClass('active');
    if($this.hasClass('active')){
        $this.text('pause music'); 
        $('audio#opening-theme')[0].play();        
    } else {
        $this.text('play music');
        $('audio#opening-theme')[0].pause();
    }
  });

  var config = {
    apiKey: "AIzaSyCI3XGNh4Nvo8rXYDWnVc7KYbNdwxTRbYY",
    authDomain: "phila-pokedex.firebaseapp.com",
    databaseURL: "https://phila-pokedex.firebaseio.com",
    projectId: "phila-pokedex",
    storageBucket: "phila-pokedex.appspot.com",
    messagingSenderId: "678564572304"
  };

  firebase.initializeApp(config);

  

  var database = firebase.database();


  var settings = {


    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://discordapp.com/api/channels/563834169579405341/messages",
    "method": "GET",
    "headers": {
      "Authorization": "Bot NTY1OTY1NDQ2MzkwNDgwOTA2.XLCf5Q.JzzvHzmlsNLyHZTRFcWBe0GQ3kQ",
      "cache-control": "no-cache",
      "Postman-Token": "66e2a65e-162b-4431-af25-333f03cd6b83"
    }
  }




      $.ajax(settings).then(function (response) {
        console.log(response);
        res = response;



        for (var i = 0; i < 5; i++) {
          console.log("i: " + i);
          AddCharacterList(i, GrabCharInfo, database);
         
        }

      });



      function GrabCharInfo(statsArr) {
        var charName = statsArr[0];
        var charIV = statsArr[2];
        var charCP = statsArr[8];
        var charLvl = statsArr[5];
        var dsTime = despawn;
        var charThumb = imgSrc;
        console.log("charThumb: " + charThumb);



        character = {
          name: charName,
          IV: charIV,
          CP: charCP,
          Lvl: charLvl,
          Img: charThumb,
          DSP: despawn
        }
        console.log(JSON.stringify(character));

        AddCharRow();

        function AddCharRow() {
          console.log("AddCharRow:");
          var tr = $("<tr>");

          AddImage();
          console.log("Add imaged");

          DisplayStat(charName);
          DisplayStat(charIV);
          DisplayStat(charCP);
          DisplayStat(charLvl);
          DisplayTime(despawn);
          console.log("Display Stat");

          function AddImage() {
            var td = $("<td>");
            td.html(thumb);
            tr.append(td);
            console.log("Add image 2");
          }

          function DisplayStat(item) {
            var td = $("<td>");
            td.text(item);
            tr.append(td);
            $("tbody").append(tr);
          }

          function DisplayTime(item) {
            var td = $("<td>");
            var temp = moment(item).format("h:mm a");
            td.text(temp);
            tr.append(td);
            $("tbody").append(tr);
          }
        }
      }
    });







function AddCharacterList(i, GrabCharInfo, database) {
  console.log("Add Character List i: " + i);
  thumb = GrabThumbNail(res[i]);
  console.log("Add Character List i: " + i);
  GrabStats(res[i]);
  console.log("Add Character List i: " + i);
  GrabCharInfo(statsArr);
  console.log("Grab Char Info: " + i);
  // database.ref().push(character);
  // console.log("Firevase: " + i);
  localDump.push(character);
  // console.log("localDump " + i);
  despawn = GrabDespawn(res[i]);
  // console.log("Add Character List i: " + i);
}

  function GrabThumbNail(item) {
    // console.log("GrabThumbnail: " + item);
    imgSrc = item.embeds[0].thumbnail.url;
    var img = $("<img>");
    img.attr("src", imgSrc);
    return img;
  }

  function GrabStats(item) {
    statsArr = [];
    stats = item.embeds[0].fields[0].name;
    var dsTime = item.embeds[0].fields[1].name;
    var dsArr = dsTime.split(" ");
    dsTime = dsArr[1];
    
    console.log("DS Time: " + dsTime);
    statsArr = stats.split(" ");
   // console.log("Stats Array" + statsArr);
    return statsArr;
  }
  function GrabDespawn(item) {
    statsArr = [];
    stats = item.embeds[0].fields[1].name;
    console.log("stats despawn" + statsArr);
   // console.log(stats);
    statsArr = stats.split(" ");
    // console.log("Stats Array" + statsArr);
    var time = moment(statsArr[1] + statsArr[2], "hh:mm a");
    console.log("time: " + time.format("hh:mm a"));
    console.log("Grab Despawn");
    

    return time;
  }
 


  function HandleSearchSubmit(event) {
      // console.log("Search Submit");
      event.preventDefault();
      // console.log("Inside Search");
      // Search by name 
      var name = $("#person").val().trim();
      for(var i=0;i<localDump.length;i++) {
        if(localDump[i].name == name) {
          filteredSearch.push(localDump[i]);
          
        }
      }
      for (var i=0;i<filteredSearch.length;i++) {
        console.log(filteredSearch[i]);
        ShowFiltered(filteredSearch[i]);
      }
      
  }

  function ShowFiltered(item) {
    console.log("Show Filtered");
    $("tbody").empty();
    var tr = $("<tr>");

          var tempImg = GrabThumbNail(item.Img);
          AddImage(tempImg);

          DisplayStat(item.name);
          DisplayStat(item.IV);
          DisplayStat(item.CP);
          DisplayStat(item.Lvl);
           DisplayTime(despawn);
         
          function AddImage(img) {
            var td = $("<td>");
            td.html(img);
            tr.append(td);
          }

          function DisplayStat(item) {
            var td = $("<td>");
            td.text(item);
            tr.append(td);
            $("tbody").append(tr);
          }
          function GrabThumbNail(item) {
            // console.log("Item: " + item);
            var newImgSrc = item;
            var img = $("<img>");
            img.attr("src", item);
            return img;
          }
          function DisplayTime(item) {
            var td = $("<td>");
            var temp = moment(item).format("h:mm a");
            td.text(temp);
            tr.append(td);
            $("tbody").append(tr);
          }
  }
function Refresh() {
  $("tbody").empty();
 
  for(var i=0;i<localDump.length;i++) {
    var tr = $("<tr>");
    thumb = GrabThumbNail(localDump[i].Img);
    AddImage(thumb);
    

    DisplayStat(localDump[i].name);
    DisplayStat(localDump[i].IV);
    DisplayStat(localDump[i].CP);
    DisplayStat(localDump[i].Lvl);
    DisplayTime(localDump[i].DSP);
    console.log("Display Stat");

    function GrabThumbNail(item) {
      // console.log("Item: " + item);
      var newImgSrc = item;
      var img = $("<img>");
      img.attr("src", item);
      return img;
    }
    function AddImage(thumb) {
      var td = $("<td>");
      td.html(thumb);
      tr.append(td);
      console.log("Add image 2");
    }

    function DisplayStat(item) {
      var td = $("<td>");
      td.text(item);
      tr.append(td);
      $("tbody").append(tr);
    }
    function GrabDespawn(item) {
      statsArr = [];
      console.log("Refresh GrabDespawn: " + item);
      statsArr = stats.split(" ");

      var time = moment(statsArr[1] + statsArr[2], "hh:mm a");
      console.log("time: " + time.format("hh:mm a"));
      console.log("Grab Despawn");
      
  
      return time;
    }

    function DisplayTime(item) {
      var td = $("<td>");
      var temp = moment(item).format("h:mm a");
      console.log("Refresh Time: " + temp);
      td.text(temp);
      tr.append(td);
      $("tbody").append(tr);
    }


  }

};
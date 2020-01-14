const Puppeteer = require('puppeteer');
var telegram = require('telegram-bot-api');
const fs = require('fs');
var mysql = require('mysql');
var Browsers = [];
var InGame = [{
  Team1:"xd",
  Team2:"xd2"
}];
InGame.push({
  Team1:"asd0",
  Team2:"asdas"
})
var CurrentGames = [];
var api = new telegram({
        token: 'API'
});

const preparePageForTests = async (page) => {
              // Pass the User-Agent Test.
              const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
                'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
              await page.setUserAgent(userAgent);

              // Pass the Webdriver Test.
              await page.evaluateOnNewDocument(() => {
                Object.defineProperty(navigator, 'webdriver', {
                  get: () => false,
                });
              });

              // Pass the Chrome Test.
              await page.evaluateOnNewDocument(() => {
                // We can mock this in as much depth as we need for the test.
                window.navigator.chrome = {
                  runtime: {},
                  // etc.
                };
              });

              // Pass the Permissions Test.
              await page.evaluateOnNewDocument(() => {
                const originalQuery = window.navigator.permissions.query;
                return window.navigator.permissions.query = (parameters) => (
                  parameters.name === 'notifications' ?
                    Promise.resolve({ state: Notification.permission }) :
                    originalQuery(parameters)
                );
              });

              // Pass the Plugins Length Test.
              await page.evaluateOnNewDocument(() => {
                // Overwrite the `plugins` property to use a custom getter.
                Object.defineProperty(navigator, 'plugins', {
                  // This just needs to have `length > 0` for the current test,
                  // but we could mock the plugins too if necessary.
                  get: () => [1, 2, 3, 4, 5],
                });
              });

              // Pass the Languages Test.
              await page.evaluateOnNewDocument(() => {
                // Overwrite the `plugins` property to use a custom getter.
                Object.defineProperty(navigator, 'languages', {
                  get: () => ['en-US', 'en'],
                });
              });
            }
 async function tryMe(){
const puppeteer = Puppeteer.launch({args: ['--disable-features=site-per-process'], headless:true,
            ignoreHTTPSErrors: true,
            defaultViewport: null})

      var browser = await puppeteer;
      var page = await browser.newPage()
      await preparePageForTests(page);
      await page.goto('https://www.bet365.com/#/IP/');


await Promise.all([
    await page.waitForFunction('document.getElementsByClassName("ipo-TeamStack ").length>0'),
]);

var Scrapping = await page.evaluate(() => {
  var Ikony = document.getElementsByClassName("ipo-ClassificationBarButtonBase_Label ");
  var JestIkona = -1;
  for(var a=0; a<Ikony.length; a++){
      console.log(Ikony[a].innerText);
    if(Ikony[a].innerText=="Soccer"){
      var JestIkona=a;
    }
  }
  if(JestIkona<0){
    return "leave";
  }else{
    Ikony[JestIkona].click();
  }

  var Matches = document.getElementsByClassName("ipo-TeamStack ");
  console.log(Matches + "ASD")
  var AllTeams = [];
  for(var x=0; x<Matches.length; x++){
    var TeamName1 = Matches[x].getElementsByClassName("ipo-TeamStack_TeamWrapper ")[0];
    var TeamName2 = Matches[x].getElementsByClassName("ipo-TeamStack_TeamWrapper ")[1];
    AllTeams.push({
      id: x,
      Team1: TeamName1.innerText,
      Team2: TeamName2.innerText
    })
  }

  return AllTeams;
});
  browser.close();
if(Scrapping=="leave"){
  console.log("Nie ma zakladki football")
  return;
}


  console.log(Scrapping.length);
  for(var p=0; p<Scrapping.length; p++){
    const puppeteer = Puppeteer.launch({args: ['--disable-features=site-per-process'], headless:true,
                ignoreHTTPSErrors: true,
                defaultViewport: null})

          var browser = await puppeteer;

          Browsers.push(browser);

  }
  var Time=25000;
  //Tutaj bedzie CurrentGames
  for(var lel=0; lel<Scrapping.length; lel++){
    if(lel==0){
      Time=100;
    }else{
    Time = 5000;
    Time = Time*(lel)
   }
    console.log("czas:"+Time)
    setTimeout(GoTo, Time, lel);
  }
  console.log(Browsers.length);

setTimeout(Start, Time+5000);
function Start(){
  console.log("Automatic search started")
  setInterval(FindNew, 10000)
}
async function FindNew(){
  const puppeteer = Puppeteer.launch({args: ['--disable-features=site-per-process'], headless:true,
              ignoreHTTPSErrors: true,
              defaultViewport: null})

        var browser = await puppeteer;

        Browsers.push(browser);
        var BrowserLength = Browsers.length;
        var Counter = BrowserLength-1;
        GoTo(Counter)
}

} // koniec funkcji
async function GoTo(p){

  var browser = Browsers[p];
  var page = await browser.newPage()

  await preparePageForTests(page);
  await page.goto('https://www.bet365.com/#/IP/', {timeout:424049324});

  await Promise.all([
      await page.waitForFunction('document.getElementsByClassName("ipo-TeamStack ").length>0', {timeout:42404932}),
  ]);

  var Click = await page.evaluate((InGame) => {
    var Ikony = document.getElementsByClassName("ipo-ClassificationBarButtonBase_Label ");
    var JestIkona = -1;
    for(var a=0; a<Ikony.length; a++){
        console.log(Ikony[a].innerText);
      if(Ikony[a].innerText=="Soccer"){
        var JestIkona=a;
        break;
      }
    }
    if(JestIkona<0){
      console.log(JestIkona+ "ASD")
      return "leave";
    }else{
      Ikony[JestIkona].click();
    }
    var Matches = document.getElementsByClassName("ipo-TeamStack ");
    var WentTo = [];
    var LookingFor = -1;
    var JestTakiMecz=-1;

    for(var x=0; x<Matches.length; x++){
      console.log("Attempt: "+x)
      JestTakiMecz=0;
      var TeamName1 = Matches[x].getElementsByClassName("ipo-TeamStack_TeamWrapper ")[0].innerText;
      var TeamName2 = Matches[x].getElementsByClassName("ipo-TeamStack_TeamWrapper ")[1].innerText;
      console.log(TeamName1);
      console.log(TeamName2);
      console.log(InGame)
      console.log(InGame.InGame)
        for(var j=0; j<InGame.InGame.length; j++){
          if(InGame.InGame[j].Team1 !== TeamName1 && InGame.InGame[j].Team2 !== TeamName2){
            // Jest okej, sprwadzamy dalej
            console.log("HERE DZIALAM")
          }else{
            JestTakiMecz= -1;
            break;
          }
      }
      if(JestTakiMecz<0){
        console.log("jest taki mecz w trakcie analizy");
      }else{
        console.log("MZOE TUTAJ")
        WentTo.push({
          param: x,
          Team1: TeamName1,
          Team2: TeamName2
        })
        console.log("MZOE TUTAJ")
        Matches[x].click();
        return WentTo;
        break;
      }

    }

  }, {InGame});
  if(Click=="leave"){
    console.log("Nie ma zakladki football (Szukanie meczu)")
    browser.close();
    return;
  }
  if(Click){
  console.log(Click);
  InGame.push({
    Team1: Click[0].Team1,
    Team2: Click[0].Team2
  });
}else{
  console.log("Jest juz taki mecz")
  await browser.close();
  return 'koniec';
}
  await Promise.all([
      await page.waitForFunction('document.getElementsByClassName("lv-MatchLiveView ").length>0', {timeout:42404932}),
  ]);
  var Working = 0;
  var IsInjury = 0;
  var TimeOfInjury = 0;
  var TotalInjury = 0;
  var TimeToSend = 0;
  var Sprawdzaj = setInterval(async function(){
    var Analize = await page.evaluate((IsInjury, TimeOfInjury) => {
        var Details = [];
        var Text = document.getElementsByClassName("ml1-AnimatedTextBar ml1-CommonAnimations_H2Text ")[0].innerText;
        var Time = document.getElementsByClassName("ml1-ScoreHeaderSoccer_Clock")[0].innerText;
        if(Text=="Injury"){
          IsInjury = 1;
          Details.push({
            Text: Text,
            Time: Time,
            IsInjury:1
          })
        }else{
          IsInjury=0;
          Details.push({
            Text: "Injury",
            Time: Time,
            IsInjury:0
          })
        }
        console.log(Details);
        return Details
    }, {IsInjury, TimeOfInjury});
    IsInjury = Analize[0].IsInjury;
    var HalfTime = Analize[0].Time.indexOf("45:00");
    var FullTime = Analize[0].Time.indexOf("90:");
    if(HalfTime>-1){
      TotalInjury=0;
      console.log("Zerujemy TotalInjury: "+ TotalInjury)
    }

    if(FullTime>-1){
      TotalInjury=0;
      clearInterval(Sprawdzaj);
      await browser.close();
      console.log(InGame);
      for(wi=0; wi<InGame.length; wi++){
      	if(InGame[wi].Team1==Click[0].Team1 && InGame[wi].Team2==Click[0].Team2){
          InGame.splice(wi, 1);
        }
      }
      console.log("Wychodzimy z meczu")
      console.log(InGame);
      return 'koniec';

    }


    if(TimeOfInjury>1 && IsInjury==0){
      TotalInjury = TotalInjury + TimeOfInjury;
      TimeOfInjury = 0;
      if(TotalInjury>200){
        TimeToSend = 1;
      }
    }

    if(TotalInjury>200 && IsInjury==0 && TimeToSend==1){
      api.sendMessage({
        chat_id: '-396496203',
        text: Click[0].Team1 + " vs " + Click[0].Team2 + " | Laczny czas w sekundach: " + TotalInjury + " | Powod: " + Analize[0].Text + " | Minuta meczu ostatniego injury: " + Analize[0].Time
      })
      .then(function(data)
      {
        //console.log(util.inspect(data, false, null));
      })
      .catch(function(err)
      {
        console.log(err);
      });
      TimeToSend=0;
    }

if(IsInjury==1){
TimeOfInjury++;
}else{
TimeOfInjury=0;
}
    //console.log(Analize);
  }, 1000);

}
tryMe();
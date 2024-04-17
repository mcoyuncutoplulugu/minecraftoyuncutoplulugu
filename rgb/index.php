<link rel="icon" href="https://cdn.discordapp.com/attachments/1178654017543471135/1191131999583350814/20231217_213549_0000-photoaidcom-cropped.png?ex=65a4531e&is=6591de1e&hm=d6129a963dbad3f40dcf2649e5f3c58ff7f5662f24a20beafde38befb9e239d9&" type="image/x-icon" />

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/rgb-style.css">
    <link rel="shortcut icon" href="https://cdn.discordapp.com/attachments/1178654017543471135/1191131999583350814/20231217_213549_0000-photoaidcom-cropped.png?ex=65a4531e&is=6591de1e&hm=d6129a963dbad3f40dcf2649e5f3c58ff7f5662f24a20beafde38befb9e239d9&" type="image/x-icon">
    <script type="text/javascript" src="js/1.9.1-jquery.min.js"></script>
    <script type="text/javascript" src="js/js-bootstrap.min.js"></script>
    <title>MOT • RGB</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="robots" content="index, follow">
        <script type="application/ld+json">
        {
            "@context": "https://schema.org/",
            "@type": "Person",
            "name": "Rainy Project",
            "url": "https://rainyproject.com",
            "image": "",
            "jobTitle": "Minecraft Team"
        }
    </script>
            <link rel="canonical" href="https://rainyproject.com/">
    <meta name="author" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
            <meta name="description" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
        <meta name="keywords" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
    <meta property="og:locale" content="tr_TR">
            <meta property="og:type" content="website">
        <meta property="og:title" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
                <meta name="og:description" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
            <meta property="og:url" content="https://rainyproject.com/">
            <meta property="og:site_name" content="RMinecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
                <meta name="twitter:title" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
        <meta name="twitter:creator" content="Minecraft Oyuncu Topluluğu, kitlesinin yeni sunucu arayışlarına hızlı ve kaliteli şekilde destek olmayı hedeflemiş bir Minecraft topluluğudur.">
        <meta name="twitter:card" content="summary">
    <link rel="icon" type="image/png" href="https://cdn.discordapp.com/attachments/1178654017543471135/1191131999583350814/20231217_213549_0000-photoaidcom-cropped.png?ex=65a4531e&is=6591de1e&hm=d6129a963dbad3f40dcf2649e5f3c58ff7f5662f24a20beafde38befb9e239d9&">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  </head>

  <body id="bg" class="container" style="font-family: Quicksand;">
  
    <div id="hexColorTemplate" style="display:none;">
      <div class="row">
        <label for="color-$NUM">Renk #$NUM</label>
        <input class="form-control col-md-1 hexColor" id="color-$NUM" style="border-radius: 10px;" value="$VAL" data-jscolor="{preset:'small dark', position:'right'}" oninput="javascript: updateOutputText(event)" onchange="javascript: updateOutputText(event); Cookies.set(`#${$NUM}`, document.getElementById('color-$NUM').value, { expires: 7, path: '' })">
      </div>
    </div>
    
    <div id="content">
      <a href="/" target="_blank"><h1 id="title">Minecraft Oyuncu Topluluğu</h1></a>
      <p id="graylabel1" class="gray" style="padding-bottom: 10px;"></p>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-2" style="padding-left: 0;">
            <div id="hexColors" class="container-fluid">
              <!-- Will be populated in JavaScript -->
            </div>
          </div>
          <div class="col-md-10" style="padding-right: 0;">
            <div class="container-fluid">
              <div class="row">
                <div id="output">
                  <label id="label4" for="outputText">Çıktı</label>
                  <label id="graylabel2" class="gray" for="outputText" style="font-weight: normal;">RGB yazılar için burayı kopyala!</label>
                  <pre id="outputText" style="border-radius: 10px; white-space: pre-wrap; height: 70px; margin-right: 15px; font-family: MinecraftRegular; margin-bottom: 5px;" onclick="copyTextToClipboard(this.textContent);"></pre>
                  <p id="error">256 karakterden fazla olduğu için kutuya sığmayabilir.</p>
                </div>
              </div>
              <div class="row">
                <div id="coloredNick" class="minecraft"></div>
              </div>
              <div class="row">
                <div class="col-md-3" style="padding-left: 0;">
                  <label for="nickname">Mesaj</label>
                  <input class="form-control" id="nickname" type="text" maxlength="100" placeholder="Your Text" value="Minecraft Oyuncu Topluluğu" oninput="javascript: updateOutputText(event);" onchange="javascript: updateOutputText(event)">
                </div>
              </div>
              <div class="row">
                <div class="col-md-3" style="padding-left: 0;">
                  <label for="output-format">Çıktı formatı</label>
                  <select id="output-format" class="form-control" onchange="updateOutputText(event);">
                    <option value="0">Normal (rrggbb)</option>
                    <option value="2">Eski (&amp;x&amp;r&amp;r&amp;g&amp;g&amp;b&amp;b)</option>
                    <option value="6">Konsol (§x§r§r§g§g§b§b)</option>
                    <option value="8">MOTD (\u00A7x)</option>
                    <option value="1">Sohbet ()</option>
                    <option value="7">BBCode [COLOR=#rrggbb]</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3" style="padding-left: 0;">
                  <label for="color-preset">Renk Ayarı</label>
                  <select id="color-preset" class="form-control" onchange="preset(this.value); updateOutputText(event); ">
                    <option value="0">Yok</option>
                    <option value="1">Rengarenk</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <label for="numOfColors">Renk Sayısı</label>
                <input class="form-control" style="width: 75px;" value="2" id="numOfColors" type="number" min="2" max="10" onchange="updateOutputText(event); toggleColors(this.value);" oninput="updateOutputText(event); toggleColors(this.value);">
              </div>
              <div class="row">
                <div id="dbold">
                  <input type="checkbox" id="bold" onclick="updateOutputText(event);">
                  <label for="bold">Kalın</label>
                </div>
                <div id="ditalics">
                  <input type="checkbox" id="italics" onclick="updateOutputText(event);">
                  <label for="italics">Eğik</label>
                </div>
                <div id="dunderline">
                  <input type="checkbox" id="underline" onclick="updateOutputText(event);">
                  <label for="underline">Altı çizili</label>
                </div>
                <div id="dstrike">
                  <input type="checkbox" id="strike" onclick="updateOutputText(event);">
                  <label for="strike">Ortası çizili</label>
                </div>
                <div id="appearance">
                  <input type="checkbox" id="darkmode" onclick="darkMode();">
                  <label for="darkmode" style="margin-bottom: 0px;margin-top: 0px;"> Karanlık Mod</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/.-9408-jscolor.js"></script>
    <script src="js/.-6120-script.js"></script>
    
  
    </body>
    
    <SCRIPT LANGUAGE="Javascript"><!--
// ***********************************************
// Bu kodu www.zekican.net adresinden aldınız..
// ***********************************************
var isNS = (navigator.appName == "Netscape") ? 1 : 0;
var EnableRightClick = 0;
if(isNS)
document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
function mischandler(){
if(EnableRightClick==1){ return true; }
else {return false; }
}
function mousehandler(e){
if(EnableRightClick==1){ return true; }
var myevent = (isNS) ? e : event;
var eventbutton = (isNS) ? myevent.which : myevent.button;
if((eventbutton==2)||(eventbutton==3)) return false;
}
function keyhandler(e) {
var myevent = (isNS) ? e : window.event;
if (myevent.keyCode==96)
EnableRightClick = 1;
return;
}
document.oncontextmenu = mischandler;
document.onkeypress = keyhandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;
//-->
</script>

<!-- WhatsApp ekleme -->
<script type="text/javascript">
    (function () {
        var options = {
            whatsapp: "902323482828", // WhatsApp numarası
            call_to_action: "Merhaba, nasıl yardımcı olabilirim?", // Görüntülenecek yazı
            position: "left", // Sağ taraf için 'right' sol taraf için 'left'
        };
        var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
        var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
        var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
    })();
</script>
<!-- WhatsApp ekleme -->

<script src="https://cdn.jsdelivr.net/npm/@widgetbot/crate@3" async defer>
  new Crate({
    server: '1178617983090835516',
    channel: '1188573336561791019'
  })
</script>



</html>

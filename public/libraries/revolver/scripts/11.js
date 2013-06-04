if (msgs[i].innerHTML.match(/^\/reactionfaces/)) {
  msgs[i].innerHTML = '<style type="text/css">.reaction-faces-list{list-style:none;width:500px;padding:0;margin:0}.reaction-faces-list li{float:left;width:250px;height:58px;font-size:11px;font-weight:bold;text-align:left}.reaction-faces-list img{margin:0 8px 4px 0;vertical-align:middle}</style><ul class="reaction-faces-list"><li><img src="http://i.imgur.com/BALjlSS.png" width="50" height="50" />:fffuuu:</li><li><img src="http://i.imgur.com/QPOk2cC.png" width="50" height="50" />:fffuuutears:</li><li><img src="http://i.imgur.com/lQJIB4D.png" width="50" height="50" />:joy:</li><li><img src="http://i.imgur.com/DTZAAki.png" width="50" height="50" />:happy:</li><li><img src="http://i.imgur.com/ItEWEGQ.png" width="50" height="50" />:wat:</li><li><img src="http://i.imgur.com/Sm7FxxZ.png" width="50" height="50" />:why:</li><li><img src="http://i.imgur.com/18M2A9t.png" width="50" height="50" />:okay:</li><li><img src="http://i.imgur.com/ePcg4eO.png" width="50" height="50" />:sad:</li><li><img src="http://i.imgur.com/7xwztYz.png" width="50" height="50" />:lol:</li><li><img src="http://i.imgur.com/4iHEint.png" width="50" height="50" />:pokerface:</li><li><img src="http://i.imgur.com/8mjPZHY.png" width="50" height="50" />:no:</li><li><img src="http://i.imgur.com/gYrm5BN.gif" width="50" height="50" />:kiddingme:</li><li><img src="http://i.imgur.com/q9AUeao.png" width="50" height="50" />:foreveralone:</li><li><img src="http://i.imgur.com/vMY9rnZ.jpg" width="50" height="50" />:foreveralonehappy:</li><li><img src="http://i.imgur.com/KYITacA.png" width="50" height="50" />:foreveralonedisapproval:</li><li><img src="http://i.imgur.com/7gGAvfl.png" width="50" height="50" />:yuno:</li><li><img src="http://i.imgur.com/MEiwQsa.png" width="50" height="50" />:biggrin:</li><li><img src="http://i.imgur.com/ST4U4r5.jpg" width="50" height="50" />:crying:</li><li><img src="http://i.imgur.com/WxTozYS.gif" width="50" height="50" />:megusta:</li><li><img src="http://i.imgur.com/pQ3f8uW.jpg" width="50" height="50" />:challengeaccepted:</li><li><img src="http://i.imgur.com/TUPik02.jpg" width="50" height="50" />:gtfo:</li><li><img src="http://i.imgur.com/XfCzUWB.jpg" width="50" height="50" />:watchout:</li><li><img src="http://i.imgur.com/bAZX0e1.png" width="50" height="50" />:notbad:</li><li><img src="http://i.imgur.com/ebx28bM.png" width="50" height="50" />:notbadmichelle:</li><li><img src="http://i.imgur.com/PE57n2V.jpg" width="50" height="50" />:seriously:</li><li><img src="http://i.imgur.com/8tkHKIg.jpg" width="50" height="50" />:truestory:</li><li><img src="http://i.imgur.com/PN6JV6D.png" width="50" height="50" />:youdontsay:</li><li><img src="http://i.imgur.com/zsXsEug.gif" width="50" height="50" />:dark:</li><li><img src="http://i.imgur.com/g8HArup.png" width="50" height="50" />:darkrage:</li><li><img src="http://i.imgur.com/6Bywiru.png" width="50" height="50" />:ilied:</li><li><img src="http://i.imgur.com/2PU46CT.png" width="50" height="50" />:cerealguy:</li><li><img src="http://i.imgur.com/JuyXaZS.png" width="50" height="50" />:cerealguyspit:</li><li><img src="http://i.imgur.com/CHwHGIN.jpg" width="50" height="50" />:allthethings:</li><li><img src="http://i.imgur.com/NCZSQnv.gif" width="50" height="50" />:trollface:</li><li><img src="http://i.imgur.com/eiAddoy.jpg" width="50" height="50" />:trollfaceking:</li><li><img src="http://i.imgur.com/NWELTrV.gif" width="50" height="50" />:trollfaceumad:</li><li><img src="http://i.imgur.com/jyUp1BI.gif" width="50" height="50" />:trollfacedealwithit:</li><li><img src="http://i.imgur.com/DhdtAek.png" width="50" height="50" />:trollfacesad:</li><li><img src="http://i.imgur.com/POqH3u8.gif" width="50" height="50" />:trollfaceie:</li><li><img src="http://i.imgur.com/Vkib6FC.gif" width="50" height="50" />:trollfacedance:</li></ul>';
} else {
  if (msgs[i].innerHTML.match(/:fffuuu:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:fffuuu:/, '<img src="http://i.imgur.com/BALjlSS.png" width="50" height="50" alt=":fffuuu:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:fffuuutears:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:fffuuutears:/, '<img src="http://i.imgur.com/QPOk2cC.png" width="50" height="50" alt=":fffuuutears:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:joy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:joy:/, '<img src="http://i.imgur.com/lQJIB4D.png" width="50" height="50" alt=":joy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:happy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:happy:/, '<img src="http://i.imgur.com/DTZAAki.png" width="50" height="50" alt=":happy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:wat:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:wat:/, '<img src="http://i.imgur.com/ItEWEGQ.png" width="50" height="50" alt=":wat:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:why:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:why:/, '<img src="http://i.imgur.com/Sm7FxxZ.png" width="50" height="50" alt=":why:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:okay:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:okay:/, '<img src="http://i.imgur.com/18M2A9t.png" width="50" height="50" alt=":okay:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:sad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:sad:/, '<img src="http://i.imgur.com/ePcg4eO.png" width="50" height="50" alt=":sad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:lol:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:lol:/, '<img src="http://i.imgur.com/7xwztYz.png" width="50" height="50" alt=":lol:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:pokerface:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:pokerface:/, '<img src="http://i.imgur.com/4iHEint.png" width="50" height="50" alt=":pokerface:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:no:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:no:/, '<img src="http://i.imgur.com/8mjPZHY.png" width="50" height="50" alt=":no:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:kiddingme:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:kiddingme:/, '<img src="http://i.imgur.com/gYrm5BN.gif" width="50" height="50" alt=":kiddingme:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:foreveralone:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:foreveralone:/, '<img src="http://i.imgur.com/q9AUeao.png" width="50" height="50" alt=":foreveralone:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:foreveralonehappy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:foreveralonehappy:/, '<img src="http://i.imgur.com/vMY9rnZ.jpg" width="50" height="50" alt=":foreveralonehappy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:foreveralonedisapproval:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:foreveralonedisapproval:/, '<img src="http://i.imgur.com/KYITacA.png" width="50" height="50" alt=":foreveralonedisapproval:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:yuno:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:yuno:/, '<img src="http://i.imgur.com/7gGAvfl.png" width="50" height="50" alt=":yuno:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:biggrin:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:biggrin:/, '<img src="http://i.imgur.com/MEiwQsa.png" width="50" height="50" alt=":biggrin:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:crying:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:crying:/, '<img src="http://i.imgur.com/ST4U4r5.jpg" width="50" height="50" alt=":crying:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:megusta:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:megusta:/, '<img src="http://i.imgur.com/WxTozYS.gif" width="50" height="50" alt=":megusta:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:challengeaccepted:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:challengeaccepted:/, '<img src="http://i.imgur.com/pQ3f8uW.jpg" width="50" height="50" alt=":challengeaccepted:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:gtfo:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:gtfo:/, '<img src="http://i.imgur.com/TUPik02.jpg" width="50" height="50" alt=":gtfo:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:watchout:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:watchout:/, '<img src="http://i.imgur.com/XfCzUWB.jpg" width="50" height="50" alt=":watchout:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:notbad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:notbad:/, '<img src="http://i.imgur.com/bAZX0e1.png" width="50" height="50" alt=":notbad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:notbadmichelle:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:notbadmichelle:/, '<img src="http://i.imgur.com/ebx28bM.png" width="50" height="50" alt=":notbadmichelle:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:seriously:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:seriously:/, '<img src="http://i.imgur.com/PE57n2V.jpg" width="50" height="50" alt=":seriously:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:truestory:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:truestory:/, '<img src="http://i.imgur.com/8tkHKIg.png" width="50" height="50" alt=":truestory:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:youdontsay:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:youdontsay:/, '<img src="http://i.imgur.com/PN6JV6D.png" width="50" height="50" alt=":youdontsay:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:dark:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:dark:/, '<img src="http://i.imgur.com/zsXsEug.gif" width="50" height="50" alt=":dark:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:darkdrage:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:darkrage:/, '<img src="http://i.imgur.com/g8HArup.png" width="50" height="50" alt=":darkrage:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:ilied:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:ilied:/, '<img src="http://i.imgur.com/6Bywiru.png" width="50" height="50" alt=":ilied:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:cerealguy:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:cerealguy:/, '<img src="http://i.imgur.com/2PU46CT.png" width="50" height="50" alt=":cerealguy:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:cerealguyspit:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:cerealguyspit:/, '<img src="http://i.imgur.com/JuyXaZS.png" width="50" height="50" alt=":cerealguyspit:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:allthethings:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:allthethings:/, '<img src="http://i.imgur.com/CHwHGIN.jpg" width="50" height="50" alt=":allthethings:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollface:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollface:/, '<img src="http://i.imgur.com/NCZSQnv.gif" width="50" height="50" alt=":trollface:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfaceking:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfaceking:/, '<img src="http://i.imgur.com/eiAddoy.jpg" width="50" height="50" alt=":trollfaceking:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfaceumad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfaceumad:/, '<img src="http://i.imgur.com/NWELTrV.gif" width="50" height="50" alt=":trollfaceumad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfacedealwithit:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfacedealwithit:/, '<img src="http://i.imgur.com/jyUp1BI.gif" width="50" height="50" alt=":trollfacedealwithit:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfacesad:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfacesad:/, '<img src="http://i.imgur.com/DhdtAek.png" width="50" height="50" alt=":trollfacesad:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfaceie:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfaceie:/, '<img src="http://i.imgur.com/POqH3u8.gif" width="50" height="50" alt=":trollfaceie:" style="margin: 2px 4px; vertical-align: middle" />');
  }
  if (msgs[i].innerHTML.match(/:trollfacedance:/)) {
    msgs[i].innerHTML = msgs[i].innerHTML.replace(/:trollfacedance:/, '<img src="http://i.imgur.com/Vkib6FC.gif" width="50" height="50" alt=":trollfacedance:" style="margin: 2px 4px; vertical-align: middle" />');
  }
}
# ME_FakeDLC-Demo
Version 1.0.0

This plugin reads a file at game launch to set switches and variables and emulate dlc. 
It's actually to unlock already locked content. You can mix this up with native rpg maker overwriting adaptation to make an actual DLC system.

Parameters:
 - File name:
 
   The file this plugin will read

  
 - Overwrite on load:
 
  Sets if to run it on "Load game" or only in "New Game"
  
About:
  This is a plugin request by A-ster in RPG Maker Forums.
  The actual idea behind the request was to unlock already present content but unachievable by normal means, by just changing the contents of a text file.
  
  Most of RPG Maker projects allow overwriting their files if the limits are the same, allowing it to improve after release.
  The main problem is, the game itself won't notice it's been changed. This plugin takes care of that.
  There's also some games with locked content until you "pay for a dlc", rendering them as paid locked content rather than dlc,
  you can use this plugin for this too.
  
  Place a file in <Project>/data named as what you wrote in "File name", dlc.json by default with the switches/variables to set.
  Remember to write the extension too! TXT and extensionless should do, too.
  
	If you want to set a switch on, you use 
  	{
  	"MEFD_Switches": {
			"on": [X,Y,Z]
  	}
  Where X, Y and Z are the switch numbers. If you use one, don't place the comma!
  The same if you want to turn them off, but on "off".
  
  For variables it's slightly different.
  
	"MEFD_Vars": {
		"X": [
			Y,
			Z,
		]
	}
  In this example, you set var Y and var Z to X, for example, 

	"MEFD_Vars": {
		"4": [1,2,15]
	}
would make var 1, var 2 and var 15 values exactly 4.

  Beware, since this is a public script, these instructions can be checked by cheaters!
  
  @Terms of use
  - Common:
  -  Free to use as in money.
  -  Feel free to modify to redistribute it.
  -  This plugin comes as is, with no guarantees.
  -  I'll try to give support about it, but I can't say I will do it for sure.
  - Non Commercial:
  -  No credit required unless you modify it then credit yourself, in other words,
    no claiming as your own!
  - Commercial:
  -  Give credit me as the author of this plugin, I don't mind if you do so in some
    scene or some easter egg.
  -  Report any bugs, incompatibilities and issues with this plugin to me, even if
    you have someone else fixing them.
  
  FAQ:
  Q: Why is the name FakeDLC? It just unlocks already present content
  A: The request was "A plugin to make it feel like DLC, even if it's just locked content". This plugin just unlocks that protected content, and along the default RPG Maker behavior to keep things together, you can mix it to make it a actual DLC plugin.
  
  
  
   @MightDo  List:
  	- Extras: Plugin commands to enable and disable content in-game. This is in order so you can mix it with a online shop if you know how.


You can always: 

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/S6S717SV2)

Happy RPG Making!

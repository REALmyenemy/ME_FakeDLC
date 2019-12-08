/*:
 * @pluginversion 1.0.0
 * 
 * @plugindesc It reads a file at game launch to set switches and variables and emulate dlc
 *
 * @author myenemy
 * 
 * @param File name
 * @desc The file this plugin will read
 * @default dlc.json
 * 
 * @param Overwrite on load
 * @desc If true, it will override values every load, otherwise, only on new game.
 * @default true
 * 
 * @help
 * This is a plugin request by A-ster in RPG Maker Forums.
 * Most of RPG Maker projects allow overwriting their files if the limits are the same, allowing it to improve after release.
 * The main problem is, the game itself won't notice it's been changed. This plugin takes care of that.
 * There's also some games with locked content until you "pay for a dlc", rendering them as paid locked content rather than dlc,
 * you can use this plugin for this too.
 * 
 * Place a file in Project/data named as what you wrote in "File name", dlc.json by default, with the switches/variables to set.
 * Remember to write the extension too! TXT and extensionless should do, too, just keep the format inside the document.
 * Format for the text file:
 * 
 * -Switches:
 * For switches use "MEFD_Switches" object and a property "on" or "off" for their respective status. 
 * Example:
 * "MEFD_Switches": {
 * 		"on": [1],
 *		"off": [4,	5,	6]
 *	}
 * In this example, upon start, it will set switch number 1 on, and turn 4, 5 and 6 off.
 *
 * -Variables:
 * For variables use "value" and a list of values with the value to set it to
 * Example:
 * "MEFD_Vars": {
 *		"4": [1, 2],
 *		"0": 8,
 *	}
 * In this example, upon start, it will set variabless 1 and 2 to 4, and variable 8 to 0.
 * 
 * 
 * Beware, since this is a public script, these instructions can be checked by cheaters!
 * 
 * @Terms of use
 * - Common:
 * -  Free to use as in money.
 * -  Feel free to modify to redistribute it.
 * -  This plugin comes as is, with no guarantees.
 * -  I'll try to give support about it, but I can't say I will do it for sure.
 * - Non Commercial:
 * -  No credit required unless you modify it then credit yourself, in other words,
 *   no claiming as your own!
 * - Commercial:
 * -  Give credit me as the author of this plugin, I don't mind if you do so in some
 *   scene or some easter egg.
 * -  Report any bugs, incompatibilities and issues with this plugin to me, even if
 *   you have someone else fixing them.
 * 
 * FAQ:
 * Q: Why is the name FakeDLC? It just unlocks already present content
 * A: The request was "A plugin to make it feel like DLC, even if it's just locked content". This plugin just unlocks that protected content, and along the default RPG Maker behavior to keep things together, you can mix it to make it a actual DLC plugin.
 * 
 *  @ToDo  List:
 *  --Make it so it's setable from editor for debugging reasons
 * 	--Add "extras": They can add raw names and I'll make a function and a plugin command to check if content is listed or not.
 *  --On extras, add keys for the plugin command.
 * 
*/
const fs = require('fs');
var enablePlugin=true;
var override=true;

var data;

var _commandNewGame=Scene_Title.prototype.commandNewGame;
var _loadSuccess=Scene_Load.prototype.onLoadSuccess;


(function()
{
	var parameters = PluginManager.parameters('ME_FakeDLC');
	var fileName=parameters['File name'];
	override = parameters['Overwrite on load'];

	data = fs.readFileSync('data/'+fileName, "utf-8");
	enablePlugin= data?  true:false;
	
})();


Scene_Title.prototype.commandNewGame = function() {
	_commandNewGame.call(this);
	setUnlocks();
};

Scene_Load.prototype.onLoadSuccess = function() {
	_loadSuccess.call(this);
	if (override)
		setUnlocks();
};


function setUnlocks()
{
	if (enablePlugin) {
		var jsonData = JSON.parse(data);

		setSwitches(jsonData.MEFD_Switches.on,true);
		setSwitches(jsonData.MEFD_Switches.off,false);

		setVars(jsonData.MEFD_Vars);
	}
}

var setSwitches= function(switches, state)
{
	if (switches)
		if (Array.isArray(switches)) //We are playing with numbers in a language where all natives are string. No cautions are enough
			for (var i=0;i<switches.length;i++)
			{
				$gameSwitches.setValue(switches[i], state);
			}
		else
		{
			$gameSwitches.setValue(values, state);
		}
}

var setVars= function (vars)
{
	var variables = vars;

	var keys = Object.getOwnPropertyNames(variables)
	for (var i = 0; i < keys.length; i++) {
		var variable = variables[keys[i]];
		
		if (Array.isArray(variable)) {
			for (var j = 0; j < variable.length; j++) {
				$gameVariables.setValue(variable[j], parseInt(keys[i]));
			}
		}
		else {
			$gameVariables.setValue(variable, parseInt(keys[i]));
		}

	}
}


var before = $("before");
var liner = $("liner");
var command = $("typer");
var textarea = $("texter");
var terminal = $("terminal");

var git = 0;
var commands = [];

// init
textarea.value = "";
command.innerHTML = textarea.value;


const enterKey = e => {
	if (e.keyCode == 181){
		document.location.reload(true);
	}

	if (e.keyCode == 13) {
		commands.push(command.innerHTML);
		git = commands.length;
		addLine("visitor@nathanieladiah.github.io:~$ " + command.innerHTML, "no-animation", 0);
		commander(command.innerHTML.toLowerCase());
		command.innerHTML = "";
		textarea.value = "";
	}

	if (e.keyCode == 30 && git != 0) {
		git -= 1;
		textarea.value = commands[git];
		command.innerHTML = textarea.value;
	}

	if (e.keyCode == 40 && git != commands.length) {
		git += 1;
		if (commands[git] === undefined) {
			textarea.value = "";
		} else {
			textarea.value = commands[git];
		}
		command.innerHTML = textarea.value;
	}
}

const commander = cmd => {
	switch (cmd.toLowerCase()) {
		case "help":
			loopLines(help, "color2 margin", 80);
			break;
		case "whois":
			loopLines(whois, "color2 margin", 80);
			break;
		case "whoami":
			loopLines(whoami, "color2 margin", 80);
			break;
		case "projects":
			loopLines(projects, "color2 margin", 80);
			break;
		case "history":
			addLine("<br>", "", 0);
			loopLines(commands, "color2", 80);
			addLine("<br>", "command", 80 * commands.length + 50);
			break;
		case "clear":
			setTimeout(() => {
				terminal.innerHTML = '<a id="before"></a>';
				before = $("before");
			}, 1);
			break;
		case "banner":
			loopLines(banner, "", 80);
			break;
		default:
			addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
			break;
	}
}

const newTab = link => {
	setTimeout(() => {
		window.open(link, "_blank");
	}, 500);
}

const addLine = (text, style, time) => {
	var t = "";
	for (let i = 0; i < text.length; i++) {
		if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
			t += "&nbsp;&nbsp;";
			i++;
		} else {
			t += text.charAt(i);
		}
	}

	setTimeout(() => {
		var next = document.createElement("p");
		next.innerHTML = t;
		next.className = style;

		before.parentNode.insertBefore(next, before);

		window.scrollTo(0, document.body.offsetHeight);
	}, time);
}

const loopLines = (name, style, time) => {
	name.forEach((item, index) => {
		addLine(item, style, index * time);
	});
}

setTimeout(() => {
	loopLines(banner, "", 80);
	textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);


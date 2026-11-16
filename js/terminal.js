(function () {
  const form = document.querySelector("#terminal-form");
  const input = document.querySelector("#terminal-input");
  const output = document.querySelector("#terminal-output");
  if (!form || !input || !output) return;

  const home = document.body.dataset.home || "index.html";
  const history = [];
  let cursor = -1;
  let draft = "";

  function line(text, className) {
    const row = document.createElement("div");
    row.className = "term-line" + (className ? " " + className : "");
    row.textContent = text;
    output.append(row);
    return row;
  }

  function echo(command) {
    const row = document.createElement("div");
    row.className = "term-line";
    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "visitor@portfolio:~$ ";
    const cmd = document.createElement("span");
    cmd.className = "cmd";
    cmd.textContent = command;
    row.append(prompt, cmd);
    output.append(row);
  }

  function scrollDown() {
    const screen = output.parentElement;
    if (screen) screen.scrollTop = screen.scrollHeight;
  }

  function go(hash) {
    line("Opening " + hash + " …", "muted-line");
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = home + hash;
  }

  const commands = {
    help: function () {
      [
        "Available commands",
        "  help        Show this list",
        "  whoami      Professional introduction",
        "  skills      Technical skills",
        "  projects    Open the projects section",
        "  about       Open About Me",
        "  contact     Show contact information",
        "  education   Academic information",
        "  clear       Clear the terminal"
      ].forEach(function (text) {
        line(text, text.startsWith(" ") ? "" : "out");
      });
    },
    whoami: function () {
      [
        "Abanoub Emad Makrem",
        "System & Network Administrator",
        "",
        "Third-year student at the Faculty of Computers and Artificial Intelligence, Cairo University.",
        "Seeking an IT infrastructure, system administration, or network administration internship.",
        "Focused on Linux administration, enterprise networking, and practical lab work."
      ].forEach(function (text) { line(text); });
    },
    skills: function () {
      [
        "Hands-on",
        "  Linux: RHEL 9, users and groups, permissions, ACLs, sudo, systemd, storage, OpenSSH",
        "  Networking: IPv4, VLSM, VLANs, 802.1Q, SVIs, static routing, Packet Tracer",
        "  Infrastructure: VirtualBox, RHEL server baseline, Windows 10 client familiarity",
        "",
        "Currently studying",
        "  RHCSA preparation, CCNA preparation, cloud fundamentals, Docker, DevOps"
      ].forEach(function (text) { line(text); });
    },
    projects: function () { go("#projects"); },
    about: function () { go("#about"); },
    contact: function () {
      [
        "Email     AbanoubEmadMakrem@outlook.com",
        "LinkedIn  https://www.linkedin.com/in/abanoub-emad-11b39717b/",
        "GitHub    https://github.com/AbanoubEmadM",
        "CV        Download CV in the contact section"
      ].forEach(function (text) { line(text); });
    },
    education: function () {
      [
        "Faculty of Computers and Artificial Intelligence",
        "Cairo University",
        "Bachelor of Computers and Artificial Intelligence",
        "Academic level: third-year student",
        "Expected graduation: 2028"
      ].forEach(function (text) { line(text); });
    },
    clear: function () {
      output.replaceChildren();
    }
  };

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const raw = input.value;
    const command = raw.trim().toLowerCase();
    echo(raw.trim());
    input.value = "";
    cursor = -1;
    draft = "";

    if (!command) {
      scrollDown();
      return;
    }

    if (history[history.length - 1] !== command) history.push(command);

    if (Object.prototype.hasOwnProperty.call(commands, command)) {
      commands[command]();
    } else {
      line("Command not found. Type 'help' to see available commands.");
    }
    scrollDown();
  });

  input.addEventListener("keydown", function (event) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    if (!history.length) return;
    event.preventDefault();

    if (event.key === "ArrowUp") {
      if (cursor === -1) draft = input.value;
      cursor = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      input.value = history[cursor];
      return;
    }

    if (cursor === -1) return;
    cursor += 1;
    if (cursor >= history.length) {
      cursor = -1;
      input.value = draft;
    } else {
      input.value = history[cursor];
    }
  });
})();

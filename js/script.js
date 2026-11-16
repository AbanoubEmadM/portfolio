(function () {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  const screen = document.querySelector("#hero-screen");
  if (screen) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = [
      { type: "cmd", text: "whoami" },
      { type: "out", text: "System & Network Administrator" },
      { type: "cmd", text: "cat introduction.txt" },
      {
        type: "out",
        text: "Building, managing, and securing reliable IT infrastructure through practical experience in Linux administration, networking, and enterprise systems."
      },
      { type: "cmd", text: "cat identity.txt" },
      { type: "out", text: "Abanoub Emad Makrem" },
      { type: "out", text: "FCAI, Cairo University · Third year · Expected graduation 2028" }
    ];

    function addCommand(text) {
      const row = document.createElement("div");
      row.className = "term-line";
      const prompt = document.createElement("span");
      prompt.className = "prompt";
      prompt.textContent = "visitor@portfolio:~$ ";
      const cmd = document.createElement("span");
      cmd.className = "cmd";
      cmd.textContent = text;
      row.append(prompt, cmd);
      screen.append(row);
      return cmd;
    }

    function addOutput(text) {
      const row = document.createElement("div");
      row.className = "term-line out";
      row.textContent = text;
      screen.append(row);
    }

    function addCursor() {
      const row = document.createElement("div");
      row.className = "term-line";
      const prompt = document.createElement("span");
      prompt.className = "prompt";
      prompt.textContent = "visitor@portfolio:~$ ";
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.setAttribute("aria-hidden", "true");
      row.append(prompt, cursor);
      screen.append(row);
    }

    if (reduce) {
      lines.forEach(function (line) {
        if (line.type === "cmd") addCommand(line.text);
        else addOutput(line.text);
      });
      addCursor();
    } else {
      let index = 0;

      function next() {
        if (index >= lines.length) {
          addCursor();
          return;
        }
        const line = lines[index];
        index += 1;
        if (line.type === "out") {
          addOutput(line.text);
          window.setTimeout(next, 280);
          return;
        }
        const cmd = addCommand("");
        let char = 0;
        const timer = window.setInterval(function () {
          char += 1;
          cmd.textContent = line.text.slice(0, char);
          if (char >= line.text.length) {
            window.clearInterval(timer);
            window.setTimeout(next, 240);
          }
        }, 28);
      }

      next();
    }
  }

  const dialog = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxCaption = document.querySelector("#lightbox-caption");
  if (dialog && lightboxImage && typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-lightbox]").forEach(function (button) {
      button.addEventListener("click", function () {
        const img = button.querySelector("img");
        lightboxImage.src = button.getAttribute("data-full") || (img ? img.src : "");
        lightboxImage.alt = img ? img.alt : "";
        if (lightboxCaption) {
          lightboxCaption.textContent = button.getAttribute("data-caption") || "";
        }
        dialog.showModal();
      });
    });

    dialog.querySelectorAll("[data-close]").forEach(function (button) {
      button.addEventListener("click", function () {
        dialog.close();
      });
    });

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }
})();

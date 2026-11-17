# Abanoub Emad Makrem — IT Infrastructure Portfolio

A responsive, terminal-inspired portfolio for an aspiring System & Network Administrator. It is built with semantic HTML, CSS, and vanilla JavaScript and can be hosted on GitHub Pages without a backend or build step.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server. The project detail pages are linked from the Infrastructure Labs section.

## Portfolio contents

- Profile, education, and categorized technical skills.
- Two project case studies:
  - Elramly Soft — a Red Hat Enterprise Linux 9 and VirtualBox small-business lab.
  - Multi-Site Enterprise — a Cisco Packet Tracer campus, data center, and WAN lab.
- Learning and certification status, with no unearned credentials or progress claims.
- A simulated portfolio terminal. It accepts only the documented commands and never runs operating-system commands.
- Downloadable CV, project links, and contact information.

The network topology is a Packet Tracer simulation, not a physically deployed production network. The Linux lab is presented as ongoing; its completed and planned work is distinguished on the case-study page.

## Structure

```text
.
├── index.html
├── projects/
│   ├── elramly-soft.html
│   └── multi-site.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── navigation.js
│   ├── script.js
│   └── terminal.js
└── assets/
    ├── cv/
    ├── fonts/
    ├── icons/
    └── images/
```

## Deployment

Publish the repository root with GitHub Pages. Keep the existing relative paths intact; no environment variables, package installation, or server-side configuration are required.

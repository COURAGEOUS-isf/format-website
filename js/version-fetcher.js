function onLoad() {
    fetch("schemas/list.json", { cache: "no-store" })
        .then((response) => response.json())
        .then(async (json) => {
            let content = "";
            for (const version of json) {
                content += `<div>`;
                content += `<div style="white-space:nowrap;">`;
                content += `<a class="version-link button" target="_blank" href="schemas/${version.name}.json"><img type="image/svg+xml" src="img/download-solid.svg"></img> Download</a>`
                content += `<a class="version-link button" target="_blank" href="visualizer/?hideEditor&maxLevel=99&surl=../schemas/${version.name}.json"><img type="image/svg+xml" src="img/file-lines-solid.svg"></img> Docs</a>`;

                let changelog;
                try {
                    const response = await fetch(`schemas/changelogs/${version.name}.html`);

                    if (response.status === 200) {
                        changelog = await response.text();
                    } else {
                        changelog = null;
                    }
                } catch (error) {
                    console.error(error);
                    changelog = null;
                }

                if (changelog !== null) {
                    content += `<button id="changelog-${version.name}-button" class="version-link button" href="#"><img type="image/svg+xml" src="img/file-lines-solid.svg"></img> Info</button>`
                }
                if (version.draft) {
                    content += `<span class="draft badge">DRAFT</span>`;
                }
                content += version.name;
                content += `<span class="version-date">${version.date}</span>`;
                content += "</div>";
                if (changelog !== null) {
                    content += `<div id="changelog-${version.name}" style="display:none; padding-left:2em; border-left-color:black;border-left-width: 5px;border-left-style: dotted;"><h3>Changelog for ${version.name}:</h3>${changelog}`;
                    if (version.track2kml_total) {
                        content += `<h3 style="font-size:80%;">Track2kml versions with complete support: <span class="badge complete-support">${version.track2kml_total}</span></h3>`;
                    } else {
                        content += `<h3 style="font-size:80%;">No version of track2kml exists with complete support for this version</h3>`;
                    }
                    if (version.track2kml_partial) {
                        content += `<h3 style="font-size:80%;">Track2kml versions with partial support: <span class="badge partial-support">${version.track2kml_partial}</span></h3>`;
                    }
                    content += `</div>`;
                }
                content += "</div>";
            }
            document.getElementById("content").innerHTML = content;

            for (const version of json) {
                let button = document.getElementById(`changelog-${version.name}-button`);
                if (button) {
                    button.addEventListener("click", () => {
                        console.log(document);
                        let style = document.getElementById(`changelog-${version.name}`).style;
                        if (style.display == "none") {
                            style.display = "block"
                        } else {
                            style.display = "none"
                        }
                    }, false);
                }
            }
        });

    fetch("track2kml/list.json", { cache: "no-store" })
        .then((response) => response.json())
        .then(async (json) => {
            let content = "";
            for (const version of json) {
                content += `<div>`;
                content += `<div style="white-space:nowrap;">`;
                content += `<a class="version-link button" target="_blank" href="track2kml/${version.name}.zip"><img type="image/svg+xml" src="img/download-solid.svg"></img> Download</a>`

                let changelog;
                try {
                    const response = await fetch(`track2kml/changelogs/${version.name}.html`);

                    if (response.status === 200) {
                        changelog = await response.text();
                    } else {
                        changelog = null;
                    }
                } catch (error) {
                    console.error(error);
                    changelog = null;
                }

                if (changelog !== null) {
                    content += `<button id="changelog2-${version.name}-button" class="version-link button" href="#"><img type="image/svg+xml" src="img/file-lines-solid.svg"></img> Changelog</button>`
                }
                if (version.draft) {
                    content += `<span class="draft-badge">DRAFT</span>`;
                }
                content += version.name;
                content += `<span class="version-date">${version.date}</span>`;
                content += "</div>";
                if (changelog !== null) {
                    content += `<div id="changelog2-${version.name}" style="display:none;"><h3>Changelog for ${version.name}:</h3>${changelog}</div>`;
                }
                content += "</div>";
            }
            document.getElementById("content2").innerHTML = content;

            for (const version of json) {
                let button = document.getElementById(`changelog2-${version.name}-button`);
                if (button) {
                    button.addEventListener("click", () => {
                        console.log(document);
                        let style = document.getElementById(`changelog2-${version.name}`).style;
                        if (style.display == "none") {
                            style.display = "block"
                        } else {
                            style.display = "none"
                        }
                    }, false);
                }
            }
        });
}
window.onload = onLoad;

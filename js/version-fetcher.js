function onLoad() {
    fetch("schemas/list.json")
        .then(response => response.json())
        .then(json => {
            let content = "";
            for (const version of json) {
                content += `<div>
                    <a class="version-link button" target="_blank" href="schemas/${version.name}.json"><img type="image/svg+xml" src="img/download-solid.svg"></img> Download</a>
                    <a class="version-link button" target="_blank" href="visualizer/?hideEditor&maxLevel=99&surl=../schemas/${version.name}.json"><img type="image/svg+xml" src="img/file-lines-solid.svg"></img> Docs</a>
                    ${version.name}`;
                if (version.draft) {
                    content += `<span class="draft-badge">DRAFT</span>`;
                }
                content += "</div>";
            }
            document.getElementById("content").innerHTML = content;
        });
}
window.onload = onLoad;
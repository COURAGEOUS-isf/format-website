function onLoad() {
    fetch("schemas/list.json")
        .then(response => response.json())
        .then(json => {
            let content = "";
            for (const version of json) {
                content += `<div>
                    <a class="version-link button" target="_blank" href="schemas/schema-${version.name}.json"><img type="image/svg+xml" src="download-solid.svg"></img> Download</a>
                    <a class="version-link button" target="_blank" href="https://grvc.us.es/courageous/visualizer/?hideEditor&maxLevel=99&surl=/courageous/schema-${version.name}.json"><img type="image/svg+xml" src="eye-solid.svg"></img> Preview</a>
                    ${version.name}
                </div>`;
            }
            document.getElementById("content").innerHTML = content;
        });
}
window.onload = onLoad;
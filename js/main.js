var nav = document.getElementById('entry-nav');
var entries = document.getElementsByClassName('entry');

for (let i = 0; i < entries.length; ++i) {
    let title = entries[i].querySelector('h2').innerHTML;
    let navElement = document.createElement('li');
    let entryLink = document.createElement('a');
    entryLink.appendChild(document.createTextNode(title));
    navElement.appendChild(entryLink);
    console.log(navElement);
    nav.appendChild(navElement);
}


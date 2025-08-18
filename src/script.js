setTimeout(() => {
// builds URL search query from search params, handles different domains scenarios
function buildMapsLink() {
    const searchQuery = new URLSearchParams(window.location.search).get('q');
    const currentUrl = new URL(window.location);
    const hostname = currentUrl.hostname;
    const mapsHostname = hostname.startsWith('www.') ? hostname.replace('www.', 'maps.') : `maps.${hostname}`;
    return `${currentUrl.protocol}//${mapsHostname}/maps?q=${searchQuery}`;
}

// DOM elements (all of these can possibly exist due to google's AB testing changing their UI)
const buttonContainer = document.querySelector('.IUOThf'); // round "bubble" buttons right below the search input
const tabsContainer = document.querySelector('.beZ0tf'); // tabs right below the search input

// Using selector array as sometimes multiple different selectors are used for the same element depending on the variant rendered by Google
const smallMapThumbnailElement = ['.lu-fs', '.V1GY4c']; // small thumbnail with a map, usually on the right side
const addressMapContainer = document.querySelector('.lu_map_section');
const placesMapContainer = document.querySelector('.S7dMR');
const countryMapContainer = document.querySelector('.zMVLkf');

// We use this to avoid duplicate "Open in maps" buttons in certain situations
let alreadyHasMapsButtonAppended = false;

function hasMapTabAlreadyDisplayed() {
    const links = tabsContainer.getElementsByTagName('a');
    let tabAlreadyDisplayed = false;

    for (let i = 0; i < links.length; i++) {
        if (links[i].href.includes('/maps')) {
            tabAlreadyDisplayed = true;
            break;
        }
    }

    alreadyHasMapsButtonAppended = tabAlreadyDisplayed;
    return tabAlreadyDisplayed;
}

// if tabs exist, add the maps tab
// we start with "tabs" variant first because its only used for the top-most navigation
// while round buttons are also used as subnavigation in search results, images etc.
if (tabsContainer && !hasMapTabAlreadyDisplayed()) {
    const tabButtonWrapper = document.createElement('div');
    tabButtonWrapper.role = 'listitem';
    const tabsButton = document.createElement('a');

    const mapSpan = document.createElement('span');
    mapSpan.classList.add('R1QWuf');
    mapSpan.textContent = 'Open in Maps';

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('mXwfNd');
    innerDiv.appendChild(mapSpan);

    tabsButton.classList.add('C6AK7c');
    tabButtonWrapper.appendChild(tabsButton);
    tabsButton.appendChild(innerDiv);
    tabsButton && (tabsButton.href = buildMapsLink());
    tabsButton.classList.add('remove-text-underline');

    // Insert as third tab (after the second child)
    const children = tabsContainer.children;
    if (children.length >= 2) {
        tabsContainer.insertBefore(tabButtonWrapper, children[2]);
    } else {
        tabsContainer.appendChild(tabButtonWrapper);
    }
    alreadyHasMapsButtonAppended = true;
}

// ---------------------------
// if buttons exist -AND- we HAVE NOT appended a different variant already,
// add the maps round button
if (buttonContainer && !alreadyHasMapsButtonAppended) {
    const mapsButton = document.createElement('a');
    mapsButton.classList.add('nPDzT', 'T3FoJb');

    const mapDiv = document.createElement('div');
    mapDiv.jsname = 'bVqjv';
    mapDiv.classList.add('GKS7s');

    const mapSpan = document.createElement('span');
    mapSpan.classList.add('FMKtTb', 'UqcIvb');
    mapSpan.jsname = 'pIvPIe';
    mapSpan.textContent = 'Maps';

    mapDiv.appendChild(mapSpan);
    mapsButton.appendChild(mapDiv);
    
    mapsButton && (mapsButton.href = buildMapsLink());
    buttonContainer.prepend(mapsButton);

    alreadyHasMapsButtonAppended = true;
}


// if map thumbnail exists
if (smallMapThumbnailElement.length) {
    setTimeout(() => {
        smallMapThumbnailElement.forEach((elementSelector) => {
            const targettedElement = document.querySelector(elementSelector);
            
            // check if element exists on the page
            if (targettedElement) {
                if (targettedElement.parentNode.tagName.toLowerCase() === 'a') {
                    // if its already an a tag, just update its href attribute with the generated maps link
                    targettedElement.parentNode.href = buildMapsLink();
                } else {
                    // otherwise create a new a tag with href attribute set to generated maps link, then wrap it around the element
                    const wrapperLink = document.createElement('a');
                    wrapperLink.href = buildMapsLink();
                    targettedElement.parentNode.insertBefore(wrapperLink, targettedElement);
                    targettedElement.parentNode.removeChild(targettedElement);
                    wrapperLink.appendChild(targettedElement);
                }
            }
        });
        
    }, 0)
}

// if address map is shown (the one right below search bar), make it clickable
if (addressMapContainer) {
    const mapWrapperLinkEl = document.createElement('a');
    mapWrapperLinkEl.text = 'Open in Maps';
    mapWrapperLinkEl.classList = 'open-in-maps-extension-button';
    addressMapContainer.style.position = 'relative';

    mapWrapperLinkEl && (mapWrapperLinkEl.href = buildMapsLink());
    
    // Add the button as an overlay instead of wrapping the entire container
    addressMapContainer.appendChild(mapWrapperLinkEl);
    window.setTimeout(function() {
        mapWrapperLinkEl.style.opacity = '1';
    }, 100); 
}

// if places map is shown (the one right below search bar), make it clickable
if (placesMapContainer) {
    const mapWrapperLinkEl = document.createElement('a');
    mapWrapperLinkEl.text = 'Open in Maps';
    mapWrapperLinkEl.classList = 'open-in-maps-extension-button';

        
    placesMapContainer.style.position = 'relative';
    mapWrapperLinkEl && (mapWrapperLinkEl.href = buildMapsLink());
    placesMapContainer.append(mapWrapperLinkEl);
    window.setTimeout(function() {
        mapWrapperLinkEl.style.opacity = '1';
    }, 100); 
}
    
// if "green tinted country map" is shown (the one that appears below search bar), add a new button within that map that allows user to open it 
// in google maps instead while persisting the normal behavior of extending the map container if clicked within the UI map element
if (countryMapContainer) {
    const mapWrapperLinkEl = document.createElement('a');
    mapWrapperLinkEl.text = 'Open in Maps';
    mapWrapperLinkEl.classList = 'open-in-maps-extension-button';


    mapWrapperLinkEl && (mapWrapperLinkEl.href = buildMapsLink());
    countryMapContainer.append(mapWrapperLinkEl);
    window.setTimeout(function() {
        mapWrapperLinkEl.style.opacity = '1';
    }, 100); 
}
}, 250);

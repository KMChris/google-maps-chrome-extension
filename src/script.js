// DOM elements (all of these can possibly exist due to google's AB testing changing their UI)
const buttonContainer = document.querySelector('.IUOThf'); // round buttons right below the search input
const tabsContainer = document.querySelector('.crJ18e'); // tabs right below the search input

// Using selector array as sometimes multiple different selectors are used for the same element depending on the variant rendered by Google
const smallMapThumbnailElement = ['.lu-fs', '.V1GY4c']; // small thumbnail with a map, usually on the right side
const addressMapContainer = document.querySelector('#pimg_1');
const placesMapContainer = document.querySelector('.S7dMR')
const countryMapContainer = document.querySelector('.CYJS5e.W0urI.SodP3b.GHMsie.ZHugbd.UivI7b > .zMVLkf');

// build simple URL search query from search params
const searchQuery = new URLSearchParams(window.location.search).get('q');
const parts = new URL(window.location).hostname.split('.');
const topLevelDomainCode = parts[parts.length - 1];
const mapsLink = `http://maps.google.${topLevelDomainCode}/maps?q=${searchQuery}`;


// enable extension functionality only for non mobile screens to keep things simple
// mobile chrome cannot use extensions and there's a near zero amount of usage of web usage on really small screens.
if (window.innerWidth > 500) {
    // ---------------------------
    // if buttons exist, add the maps button
    if (buttonContainer) {
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
        
        mapsButton && (mapsButton.href = mapsLink);
        buttonContainer.prepend(mapsButton);
    }
    
    // if tabs exist, add the maps tab
    if (tabsContainer) {
        const tabsButton = document.createElement('a');
        tabsButton.classList.add('LatpMc', 'nPDzT', 'T3FoJb');
    
        const mapSpan = document.createElement('span');
        mapSpan.classList.add('YmvwI');
        mapSpan.textContent = 'Maps';
    
        tabsButton.appendChild(mapSpan);
        tabsButton && (tabsButton.href = mapsLink);
    
        if (tabsContainer.children.length > 0) {
            tabsContainer.insertBefore(tabsButton, tabsContainer.firstElementChild.nextSibling);
        } else {
            tabsContainer.appendChild(tabsButton);
        }
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
                        targettedElement.parentNode.href = mapsLink;
                    } else {
                        // otherwise create a new a tag with href attribute set to generated maps link, then wrap it around the element
                        const wrapperLink = document.createElement('a');
                        wrapperLink.href = mapsLink;
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
        mapWrapperLinkEl && (mapWrapperLinkEl.href = mapsLink);
    
        addressMapContainer.parentElement.insertBefore(mapWrapperLinkEl, addressMapContainer);
        mapWrapperLinkEl.appendChild(addressMapContainer);
    }
    
    // if places map is shown (the one right below search bar), make it clickable
    if (placesMapContainer) {
        const mapWrapperLinkEl = document.createElement('a');
        mapWrapperLinkEl.text = 'Open in Maps';
        mapWrapperLinkEl.classList = 'open-in-maps-extension-button';
           
        placesMapContainer.style.position = 'relative';
        mapWrapperLinkEl && (mapWrapperLinkEl.href = mapsLink);
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
    
        mapWrapperLinkEl && (mapWrapperLinkEl.href = mapsLink);
        countryMapContainer.append(mapWrapperLinkEl);
        window.setTimeout(function() {
          mapWrapperLinkEl.style.opacity = '1';
        }, 100); 
    }
}


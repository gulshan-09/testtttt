import { useEffect } from 'react';

function DynamicTitle({ pageTitle, pageDescription, pageKeywords }) {
  useEffect(() => {

    document.title = pageTitle;

    const existingTags = document.querySelectorAll('meta[name="description"]');
    existingTags.forEach(tag => {
      tag.setAttribute('content', pageDescription);
    });

    const existingKeyword = document.querySelector('meta[name="keywords"]');
    if (existingKeyword) {
        existingKeyword.setAttribute('content', pageKeywords);
    }

    const existingOgTitle = document.querySelector('meta[property="og:title"]');
    if (existingOgTitle) {
      existingOgTitle.setAttribute('content', pageTitle);
    }

    const existingOgDescription = document.querySelector('meta[property="og:description"]');
    if (existingOgDescription) {
      existingOgDescription.setAttribute('content', pageDescription);
    }

    const existingOgUrl = document.querySelector('meta[property="og:url"]');
    if (existingOgUrl) {
      existingOgUrl.setAttribute('href', window.location.href);
    }

    const existingCanonicalLink = document.querySelector('link[rel="canonical"]');
    if (existingCanonicalLink) {
      existingCanonicalLink.setAttribute('href', window.location.href);
    }

  }, [pageTitle, pageDescription, pageKeywords]);

  return null;
}

export default DynamicTitle;

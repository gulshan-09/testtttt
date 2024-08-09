// server/metadata.js
const metadata = {
    '/': {
      title: 'Home Page | MySite',
      description: 'Welcome to the home page of MySite.',
      keywords: 'home, mysite, welcome'
    },
    '/home': {
      title: 'Home Page | MySite',
      description: 'Welcome to the home page of MySite.',
      keywords: 'home, mysite, welcome'
    },
    '/about': {
      title: 'about Page | MySite',
      description: 'Welcome to the about page of MySite.',
      keywords: 'about, mysite, welcome'
    },
    '/watch/:id': (id) => ({
      title: `${id} Watch Online | MySite`,
      description: `Watch ${id} online. Enjoy high-quality streaming of ${id}.`,
      keywords: `${id}, watch online, streaming`
    }),
    // Add other routes here
  };
  
  module.exports = metadata;
  
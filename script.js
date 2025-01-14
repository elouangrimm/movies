document.getElementById('redirectBtn').addEventListener('click', function() {
    redirectToVidSrc();
  });
  
  document.getElementById('imdbCode').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      redirectToVidSrc();
    }
  });
  
  function redirectToVidSrc() {
    const imdbCode = document.getElementById('imdbCode').value.trim();
  
    if (imdbCode) {
      const url = `https://vidsrc.in/embed/movie?imdb=${imdbCode}`;
      window.location.href = url;
    } else {
      alert('Please enter a valid IMDb code.');
    }
  }  
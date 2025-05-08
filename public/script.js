async function startDownload() {
  const url = document.getElementById('videoUrl').value;
  const quality = document.getElementById('quality').value;
  const resultDiv = document.getElementById('result');
  
  if (!url) {
    resultDiv.innerHTML = '<div class="error">Masukkan URL video!</div>';
    return;
  }

  resultDiv.innerHTML = '<div class="loading">Memproses...</div>';
  
  try {
    const response = await fetch('/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, quality })
    });
    
    const data = await response.json();
    
    if (data.url) {
      resultDiv.innerHTML = `
        <div class="success">
          <a href="${data.url}" download class="download-btn">💾 Klik untuk Download</a>
          <p>Atau salin link ini:</p>
          <input type="text" value="${data.url}" readonly>
          <p><small>Gunakan download manager seperti IDM untuk kecepatan maksimal</small></p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = '<div class="error">Video tidak ditemukan!</div>';
    }
  } catch (error) {
    resultDiv.innerHTML = '<div class="error">Terjadi error! Coba lagi.</div>';
  }
}

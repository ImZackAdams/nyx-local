async function fetchLib(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    return await res.text();
  }
  
  document.getElementById('builderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const label = document.getElementById('label').value.trim();
    const amount = parseFloat(document.getElementById('amount').value.trim());
    const recipient = document.getElementById('recipient').value.trim();
    if (!label || !recipient || isNaN(amount) || amount <= 0) {
      alert('Invalid input');
      return;
    }
  
    // Load libs once
    const web3Lib = await fetchLib('https://unpkg.com/@solana/web3.js@1.95.3/lib/index.iife.js');
    const nyxpayLib = await fetchLib('https://unpkg.com/nyxpay-pay-sdk@latest/dist/nyxpay-pay-sdk.umd.js');
  
    // Load template
    const templateRes = await fetch('../checkout-template/template.html');
    let template = await templateRes.text();
  
    // Replace placeholders
    template = template
      .replace(/{{RECIPIENT}}/g, recipient)
      .replace(/{{AMOUNT}}/g, amount)
      .replace(/{{LABEL}}/g, label)
      .replace('{{WEB3_LIB}}', web3Lib)
      .replace('{{NYXPAY_SDK}}', nyxpayLib);
  
    // Generate downloadable file
    const blob = new Blob([template], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const filename = `nyxpay-checkout-${label.replace(/\s+/g, '-').toLowerCase()}.html`;
  
    const link = document.getElementById('downloadLink');
    link.href = url;
    link.download = filename;
    link.textContent = `Download ${filename}`;
    document.getElementById('output').classList.remove('hidden');
  });
  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nyx-Local – Checkout Builder</title>
  <style>
    body { font-family: sans-serif; background: #0a0a0a; color: #f5f5f5; padding: 2rem; text-align: center; }
    .container { max-width: 500px; margin: auto; background: #161616; padding: 30px; border-radius: 10px; }
    label { display: block; margin-top: 1rem; }
    input { width: 100%; padding: 0.5rem; margin-top: 0.5rem; border-radius: 4px; border: none; }
    button { margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #FEB02E; color: black; font-weight: bold; border: none; border-radius: 6px; cursor: pointer; }
    .btn { background: #FEB02E; color: black; padding: 10px 16px; font-weight: bold; border-radius: 6px; display: inline-block; margin-top: 1rem; }
    .hidden { display: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Nyx-Local Checkout Builder</h1>
    <p>Generate a single HTML checkout file you can send to anyone.</p>

    <form id="builderForm">
      <label for="label">Item Name/Reason:</label>
      <input type="text" id="label" placeholder="e.g. nyxpay Hat" required />

      <label for="amount">Amount (SOL):</label>
      <input type="number" id="amount" placeholder="e.g. 25" required min="0.01" step="0.01"/>

      <label for="recipient">Recipient Wallet:</label>
      <input type="text" id="recipient" placeholder="Your Solana wallet address" required />

      <button type="submit">Generate Checkout File</button>
    </form>

    <div id="output" class="hidden">
      <h2>✅ File Generated</h2>
      <a id="downloadLink" class="btn" download>Download Checkout File</a>
    </div>
  </div>

  <script>
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
        alert('Please enter valid values.');
        return;
      }

      // Fetch libs ONCE at build time
      const web3Lib = await fetchLib('https://unpkg.com/@solana/web3.js@1.95.3/lib/index.iife.js');
      const nyxpayLib = await fetchLib('https://unpkg.com/nyxpay-pay-sdk@latest/dist/nyxpay-pay-sdk.umd.js');

      // Fetch template
      const templateRes = await fetch('../checkout-template/template.html');
      let template = await templateRes.text();

      // Replace placeholders
      template = template
        .replace(/{{RECIPIENT}}/g, recipient)
        .replace(/{{AMOUNT}}/g, amount)
        .replace(/{{LABEL}}/g, label)
        .replace('{{WEB3_LIB}}', web3Lib)
        .replace('{{NYXPAY_SDK}}', nyxpayLib);

      // Create downloadable blob
      const blob = new Blob([template], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const filename = `nyxpay-checkout-${label.replace(/\s+/g, '-').toLowerCase()}.html`;

      // Auto-download
      const link = document.getElementById('downloadLink');
      link.href = url;
      link.download = filename;
      link.textContent = `Download ${filename}`;
      document.getElementById('output').classList.remove('hidden');

      // Trigger download immediately
      link.click();
    });
  </script>
</body>
</html>

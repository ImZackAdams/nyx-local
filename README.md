# nyx-local

**An HTML file is the transport layer.**  

You're not sending a payment request or invoice. **You're sending the entire fucking payment processor.**

Client side compute. All logic is executed on your local machine (if you want).  
Decentralized via the filesystem. No domain, no DNS, no cloud. Just open the file and go.  
Permissionless. No registration. No platform dependency. Just files.

---

## Who

Nobody. Not a company. Not a startup.  
Not a service you have to sign up for.

No team, because teams have meetings, and meetings are where ideas go to die.  
No founder, because this doesn't need a business model or a pitch deck.  
Just code that does a thing without asking for your email.

---

## What

An HTML file that becomes a crypto payment terminal.  
Your payment processor is now an email attachment.

60mb of JavaScript that handles what entire payment stacks do.  
A static file becomes a checkout page. Static files don't have uptime requirements.  
The browser handles payment logic. Your browser is a transport layer we forgot how to use.

---

## When

Right now. Not "coming soon." Not "beta access."

---

## Where

Anywhere you can open an HTML file and connect to the internet.  
Your laptop. Their phone. That old computer in the garage. A Raspberry Pi.

Email it like a document. Host it on IPFS. Put it on a USB drive.  
Send it however you want.  
No servers to crash. Needs internet for blockchain transactions.  
Decentralized via filesystem because your computer already knows how to store files.

---

## Why

Because crypto was supposed to be p2p electronic cash and somehow we ended up needing accounts and APIs and third party services just to send and receive money.

Because "decentralized" should not mean "please connect to our centralized infrastructure."  
Because permissionless should actually be permissionless, not "create an account first."  
Because we already had everything we needed to build this. We just forgot.  
Because WHY do you need to pay a middleman 3%?.

---

## How

1. Open `builder/index.html` in any browser  
2. Fill out recipient, amount, memo like you're addressing an envelope  
3. Download the generated payment terminal  
4. Send it however you want  
5. They open it, connect wallet, broadcast transaction to the blockchain

Pure HTML, CSS, and JS.  
No frameworks. No dependencies. No build system. No server.

Connects directly to the blockchain for transaction broadcasting.  
View source to understand it. Fork it. Modify it. Make it better. Make it Worse.

The browser is the runtime.  
The filesystem is your storage.  
The blockchain is your server.  
We already had distributed computing. We just called it the web.











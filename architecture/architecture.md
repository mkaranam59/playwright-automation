# The 3-Layer Architecture

Playwright relies on a **Language-Agnostic RPC (Remote Procedure Call) architecture** divided into three distinct layers:

1. **The Client (Your Test)** — Written in TypeScript, Python, Java, or C#.
2. **The Playwright Server (The Driver)** — A Node.js background process that acts as the translator.
3. **The Browser Binary** — The Chromium, Firefox, or WebKit executable running as a separate OS process.

---

## Step-by-Step Execution & Communication Flow

### Step 1: Initialisation & Handshake (The Driver Boot)

- **The Action:** You run `npx playwright test` or `pytest`.
- **The Handshake:** The Client spawns a local background process executing the Playwright Driver (a bundled Node.js CLI tool).
- **The Protocol:** The Client establishes a persistent connection with the Driver using standard input/output streams (`stdio`) or a WebSocket connection.
- **The Verification:** They exchange JSON-RPC handshake messages to verify API version compatibility.

### Step 2: Browser Instantiation

- **The Action:** Your code executes `chromium.launch()`.
- **The Protocol:** The Client sends a JSON-RPC request to the Driver:

  ```json
  {"method": "launchBrowser", "params": {"browserName": "chromium"}}
  ```

- **The Execution:** The Driver goes to your local `ms-playwright` folder and executes the raw browser binary command-line process (e.g., `chrome.exe` or `headless-shell`).
- **The Target Protocol:** The Driver launches the browser with specific flags to expose its internal debugging port, enabling communication via **CDP (Chrome DevTools Protocol)** for Chromium, or custom equivalents for Firefox and WebKit.

### Step 3: Test Execution (Command Transmission)

Let's look at what happens when your test executes:

```ts
await page.click('#submit');
```

- **Layer 1 (Client ➡️ Driver):**
  The Client serialises the `click` command into a generic JSON-RPC payload indicating the target element and action. It sends this over the `stdio`/WebSocket stream to the Driver.

- **Layer 2 (Driver Processing):**
  The Driver receives the JSON payload. It acts as a router, translating the abstract `click` command into the highly specific, low-level commands required by that exact browser's engine.

- **Layer 3 (Driver ➡️ Browser Binary):**
  The Driver sends raw automated instructions into the browser binary using WebSockets over the debugging port (e.g., CDP).

- **In-Browser Execution:**
  The browser engine locates the element, scrolls it into view, ensures it is visible and actionable (actionability checks), and dispatches trusted raw OS-level mouse events directly into the page's DOM.

### Step 4: The Response Loop

- **The Event:** The browser successfully registers the click and updates its state.
- **The Protocol:** The browser sends a completion event message via CDP back to the Driver.
- **The Return:** The Driver routes a success response payload back to the Client via the `stdio` stream.
- **The Code:** Your test code receives the resolving `Promise` (or unblocks the thread in Python) and moves to the next line.

### Step 5: Teardown & Process Cleanup

- **The Action:** The test finishes or fails.
- **The Protocol:** The Client sends a close message down the pipe.
- **The Destruction:** The Driver sends a terminal command to shut down the browser contexts and issues a `SIGTERM` signal to kill the browser binary process.
- **The Exit:** The Driver process itself exits, freeing up all local system resources.

---

## Summary of Protocols Used

| Boundary                          | Connection Type                     | Protocol Used                                              |
|------------------------------------|--------------------------------------|--------------------------------------------------------------|
| Test Code ➡️ Playwright Driver     | Local Pipe Stream / WebSockets       | JSON-RPC (standardised JSON messages)                         |
| Playwright Driver ➡️ Browser Binary | Local TCP/WebSocket Connection       | CDP (Chromium), Juggler (Firefox), or Playwright-WebKit       |

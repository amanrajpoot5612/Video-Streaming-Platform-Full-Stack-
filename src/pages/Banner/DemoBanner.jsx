import { useState } from "react";

const CopyButton = ({ text, label }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return <button type="button" className="bugsy-btn bugsy-btn--subtle bugsy-btn--compact" onClick={copy}>{copied ? "Copied" : `Copy ${label}`}</button>;
};

const DemoBanner = () => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <aside className="demo-banner" aria-label="Demo account details">
      <div className="demo-banner__copy">
        <strong>Demo account</strong>
        <span>Username <code>Aman56123</code></span>
        <CopyButton text="Aman56123" label="username" />
        <span>Password <code>Aman56123</code></span>
        <CopyButton text="Aman56123" label="password" />
      </div>
      <button type="button" className="bugsy-btn bugsy-btn--subtle bugsy-btn--compact" onClick={() => setVisible(false)}>Hide</button>
    </aside>
  );
};

export default DemoBanner;

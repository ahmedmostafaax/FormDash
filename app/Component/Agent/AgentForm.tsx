"use client";

import { useState, useEffect } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AgentForm() {
  // --- Form fields ---
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [callType, setCallType] = useState("inbound");
  const [language, setLanguage] = useState("");
  const [voice, setVoice] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("");
  const [latency, setLatency] = useState(0.5);
  const [speed, setSpeed] = useState(110);
  const [callScript, setCallScript] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [allowHangUp, setAllowHangUp] = useState(true);
  const [allowCallback, setAllowCallback] = useState(false);
  const [liveTransfer, setLiveTransfer] = useState(false);

  const [attachments, setAttachments] = useState<File[]>([]);
  const [attachmentIds, setAttachmentIds] = useState<string[]>([]);

  const [languages, setLanguages] = useState<any[]>([]);
  const [voices, setVoices] = useState<any[]>([]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

  // --- Fetch dropdown data ---
  useEffect(() => {
    fetch(`${API_BASE}/languages`).then(r => r.json()).then(setLanguages);
    fetch(`${API_BASE}/voices`).then(r => r.json()).then(setVoices);
    fetch(`${API_BASE}/prompts`).then(r => r.json()).then(setPrompts);
    fetch(`${API_BASE}/models`).then(r => r.json()).then(setModels);
  }, []);

  // --- File upload ---
  async function uploadFile(file: File) {
    const res1 = await fetch(`${API_BASE}/attachments/upload-url`, { method: "POST" });
    const { key, signedUrl } = await res1.json();

    await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/octet-stream" },
      body: file,
    });

    const res3 = await fetch(`${API_BASE}/attachments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
      }),
    });

    const data = await res3.json();
    return data.id;
  }

  // --- Save Agent ---
  async function handleSave() {
    const ids: string[] = [];
    for (const file of attachments) {
      const id = await uploadFile(file);
      ids.push(id);
    }
    setAttachmentIds(ids);

    const payload = {
      name,
      description,
      callType,
      language,
      voice,
      prompt,
      model,
      latency,
      speed,
      callScript,
      serviceDescription,
      attachments: ids,
      tools: { allowHangUp, allowCallback, liveTransfer },
    };

    const res = await fetch(`${API_BASE}/agents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return alert("Failed to save agent");
    const data = await res.json();
    alert(`Agent saved! ID: ${data.id}`);
  }

  // --- Test Call ---
  async function handleTestCall() {
    if (!attachmentIds.length) return alert("Save agent first!");
    const agentId = attachmentIds[0]; // مثال سريع

    const res = await fetch(`${API_BASE}/agents/${agentId}/test-call`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: "John",
        lastName: "Doe",
        gender: "male",
        phoneNumber: "+1234567890",
      }),
    });

    const data = await res.json();
    alert(`Test call ${data.status}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <div>
        <label className="block font-semibold mb-1">Name</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Description</label>
        <input
          className="w-full border px-2 py-1 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Call Type</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={callType}
          onChange={(e) => setCallType(e.target.value)}
        >
          <option value="inbound">Inbound</option>
          <option value="outbound">Outbound</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Language</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Select language</option>
          {languages.map((l) => (
            <option key={l.id} value={l.id}>
              {l.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Voice</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="">Select voice</option>
          {voices.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name} [{v.tag}]
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Prompt</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        >
          <option value="">Select prompt</option>
          {prompts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Model</label>
        <select
          className="w-full border px-2 py-1 rounded"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="">Select model</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-2">
        <div>
          <label className="block font-semibold mb-1">Latency</label>
          <input
            className="border px-2 py-1 rounded w-full"
            type="number"
            value={latency}
            onChange={(e) => setLatency(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Speed</label>
          <input
            className="border px-2 py-1 rounded w-full"
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Call Script</label>
        <textarea
          className="w-full border px-2 py-1 rounded"
          value={callScript}
          onChange={(e) => setCallScript(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Service Description</label>
        <textarea
          className="w-full border px-2 py-1 rounded"
          value={serviceDescription}
          onChange={(e) => setServiceDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Attachments</label>
        <input
          type="file"
          onChange={(e) => e.target.files && setAttachments([e.target.files[0]])}
        />
      </div>

      <div className="flex space-x-4">
        <label>
          <input
            type="checkbox"
            checked={allowHangUp}
            onChange={(e) => setAllowHangUp(e.target.checked)}
          /> Allow Hang Up
        </label>
        <label>
          <input
            type="checkbox"
            checked={allowCallback}
            onChange={(e) => setAllowCallback(e.target.checked)}
          /> Allow Callback
        </label>
        <label>
          <input
            type="checkbox"
            checked={liveTransfer}
            onChange={(e) => setLiveTransfer(e.target.checked)}
          /> Live Transfer
        </label>
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save Agent
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleTestCall}
        >
          Test Call
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Circle, Palette, User } from "lucide-react";
import Button from "./Button";
import { BALL_SPEEDS } from "@/lib/gameConfig";
import { savePlayerSetup } from "@/lib/storage";

const colorOptions = [
  { label: "Teal", value: "#2dd4bf" },
  { label: "Rose", value: "#fb7185" },
  { label: "Yellow", value: "#facc15" },
  { label: "Sky", value: "#38bdf8" },
  { label: "Violet", value: "#a78bfa" },
  { label: "Lime", value: "#a3e635" },
];

const initialValues = {
  name: "",
  username: "",
  ballColor: "",
  paddleColor: "",
  brickColor: "",
  speed: "",
};

export default function SetupForm() {
  const router = useRouter();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  function updateValue(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  function validate() {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = "Name is required.";
    if (!values.username.trim()) nextErrors.username = "Username is required.";
    if (!values.ballColor) nextErrors.ballColor = "Choose a ball color.";
    if (!values.paddleColor) nextErrors.paddleColor = "Choose a paddle color.";
    if (!values.brickColor) nextErrors.brickColor = "Choose a brick color.";
    if (!values.speed) nextErrors.speed = "Choose a ball speed.";
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    savePlayerSetup({
      ...values,
      name: values.name.trim(),
      username: values.username.trim(),
      createdAt: new Date().toISOString(),
    });
    router.push("/grounds");
  }

  return (
    <form onSubmit={handleSubmit} className="panel mx-auto max-w-3xl p-5 sm:p-7">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white sm:text-3xl">Player setup</h1>
        <p className="mt-2 text-sm text-slate-300">Choose your identity, colors, and starting speed.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <User size={16} aria-hidden="true" /> Name
          </span>
          <input
            className="field"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            placeholder="e.g Alex"
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="mt-2 text-sm text-rose-300">{errors.name}</p>}
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <User size={16} aria-hidden="true" /> Username
          </span>
          <input
            className="field"
            value={values.username}
            onChange={(event) => updateValue("username", event.target.value)}
            placeholder="brickmaster"
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && <p id="username-error" className="mt-2 text-sm text-rose-300">{errors.username}</p>}
        </label>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ColorPicker
          label="Ball color"
          icon={<Circle size={16} aria-hidden="true" />}
          value={values.ballColor}
          error={errors.ballColor}
          onChange={(value) => updateValue("ballColor", value)}
        />
        <ColorPicker
          label="Paddle/Bat color"
          icon={<Palette size={16} aria-hidden="true" />}
          value={values.paddleColor}
          error={errors.paddleColor}
          onChange={(value) => updateValue("paddleColor", value)}
        />
        <ColorPicker
          label="Normal brick color"
          icon={<Palette size={16} aria-hidden="true" />}
          value={values.brickColor}
          error={errors.brickColor}
          onChange={(value) => updateValue("brickColor", value)}
        />
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-semibold text-slate-200">Ball speed</legend>
        <div className="grid grid-cols-3 gap-3">
          {BALL_SPEEDS.map((speed) => (
            <label
              key={speed.value}
              className={`cursor-pointer rounded-md border p-3 text-center text-sm font-bold transition ${
                values.speed === speed.value
                  ? "border-teal-300 bg-teal-300 text-slate-950"
                  : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
              }`}
            >
              <input
                className="sr-only"
                type="radio"
                name="speed"
                value={speed.value}
                checked={values.speed === speed.value}
                onChange={(event) => updateValue("speed", event.target.value)}
              />
              {speed.label}
            </label>
          ))}
        </div>
        {errors.speed && <p className="mt-2 text-sm text-rose-300">{errors.speed}</p>}
      </fieldset>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button href="/" variant="secondary">Back</Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}

function ColorPicker({ label, icon, value, error, onChange }) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-200">
        {icon} {label}
      </legend>
      <div className="grid grid-cols-3 gap-2">
        {colorOptions.map((color) => (
          <label
            key={`${label}-${color.value}`}
            className={`grid cursor-pointer place-items-center rounded-md border p-2 transition ${
              value === color.value ? "border-white bg-white/15" : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
            title={color.label}
          >
            <input
              className="sr-only"
              type="radio"
              name={label}
              value={color.value}
              checked={value === color.value}
              onChange={() => onChange(color.value)}
            />
            <span className="size-8 rounded-full border border-white/25" style={{ backgroundColor: color.value }} />
          </label>
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-rose-300">{error}</p>}
    </fieldset>
  );
}

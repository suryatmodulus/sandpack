import React, { useState } from "react";

import { useSandpack } from "../hooks/useSandpack";
import {
  SandpackPreview,
  SandpackProvider,
  SandpackThemeProvider,
  OpenInCodeSandboxButton,
  RefreshButton,
  SandpackLayout,
  SandpackCodeViewer,
  SandpackCodeEditor,
  SandpackTranspiledCode,
  useCodeSandboxLink,
  useSandpackTheme,
  useActiveCode,
  useSandpackNavigation,
  SandpackStack,
  ViewportSize,
  ViewportOrientation,
} from "../index";

export default {
  title: "presets/Custom Sandpack",
};

export const UsingSandpackLayout: React.FC = () => (
  <SandpackProvider template="react">
    <SandpackLayout theme="codesandbox-dark">
      <SandpackStack>
        <SandpackTranspiledCode />
      </SandpackStack>
      <SandpackCodeViewer />
    </SandpackLayout>
  </SandpackProvider>
);

export const UsingVisualElements: React.FC = () => (
  <SandpackProvider activePath="/App.js" template="react">
    <SandpackThemeProvider theme="codesandbox-dark">
      <SandpackCodeEditor
        customStyle={{
          width: 500,
          height: 300,
        }}
      />

      <SandpackPreview
        customStyle={{
          border: "1px solid red",
          marginBottom: 4,
          marginTop: 4,
          width: 500,
          height: 300,
        }}
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
      />

      <div
        style={{
          display: "flex",
          width: 500,
          justifyContent: "space-between",
        }}
      >
        <OpenInCodeSandboxButton />
        <RefreshButton />
      </div>
    </SandpackThemeProvider>
  </SandpackProvider>
);

const CustomOpenInCSB = () => {
  const url = useCodeSandboxLink();
  return <a href={url}>Open in CodeSandbox</a>;
};

const CustomRefreshButton = () => {
  const { refresh } = useSandpackNavigation();
  return (
    <button onClick={() => refresh()} type="button">
      Refresh Sandpack
    </button>
  );
};

const CustomCodeEditor = () => {
  const { code, updateCode } = useActiveCode();
  const { theme } = useSandpackTheme();

  return (
    <textarea
      onChange={(evt) => updateCode(evt.target.value)}
      style={{
        width: 400,
        height: 200,
        padding: 8,
        fontFamily: theme.typography.monoFont,
        fontSize: theme.typography.fontSize,
        background: theme.palette.defaultBackground,
        border: `1px solid ${theme.palette.inactiveText}`,
        color: theme.palette.activeText,
        lineHeight: 1.4,
      }}
    >
      {code}
    </textarea>
  );
};

export const UsingHooks: React.FC = () => (
  <SandpackProvider template="react">
    <SandpackThemeProvider>
      <CustomCodeEditor />

      <SandpackPreview
        customStyle={{ border: "1px solid red", width: 400, height: 300 }}
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
      />

      <div
        style={{
          display: "flex",
          width: 400,
          margin: "8px 0",
          justifyContent: "space-between",
        }}
      >
        <CustomRefreshButton />
        <CustomOpenInCSB />
      </div>

      <div style={{ width: 400 }}>
        <SandpackTranspiledCode />
      </div>
    </SandpackThemeProvider>
  </SandpackProvider>
);

const code1 = `import React from 'react'

function Kitten() {
  return (
    <img 
      src="https://placekitten.com/200/200" 
      alt="Kitten" 
    />
  )
}

export default function KittenGallery() {
  return (
    <section>
      <h1>A Gallery of Adorable Kittens</h1>
      <Kitten />
      <Kitten />
      <Kitten />
    </section>
  );
}`;
const code2 = `import React from 'react'

export default function KittenGallery() {
  return (
    <img 
      src="https://placekitten.com/200/200" 
      alt="Kitten" 
    />
  )
}`;

const CustomPreview = () => {
  const { sandpack } = useSandpack();

  return (
    <iframe
      ref={sandpack.iframeRef}
      style={{
        width: 400,
        height: 400,
      }}
      title="Sandpack Preview"
    />
  );
};

export const JustIframe = (): React.ReactElement => {
  const [first, setFirst] = React.useState(true);
  const code = first ? code1 : code2;

  return (
    <SandpackProvider
      customSetup={{
        files: {
          "/App.js": code,
        },
      }}
      template="react"
    >
      <CustomPreview />
      <div
        style={{
          display: "flex",
          width: 400,
          margin: "8px 0",
          justifyContent: "space-between",
        }}
      >
        <CustomRefreshButton />
        <button onClick={() => setFirst(!first)} type="button">
          Switch
        </button>
        <CustomOpenInCSB />
      </div>
    </SandpackProvider>
  );
};

const ResponsivePreview = () => {
  const [viewport, setViewport] = useState<ViewportSize>("Moto G4");
  const [
    viewportOrientation,
    setViewportOrientation,
  ] = useState<ViewportOrientation>("portrait");

  return (
    <div style={{ border: "1px solid #ccc", marginRight: 8, marginTop: 8 }}>
      <select onChange={(evt) => setViewport(evt.target.value as ViewportSize)}>
        <option value="Moto G4">Moto G4</option>
        <option value="iPhone X">iPhone X</option>
        <option value="Pixel 2">Pixel 2</option>
        <option value="Surface Duo">Surface Duo</option>
        <option value="iPad">iPad</option>
      </select>

      <select
        onChange={(evt) =>
          setViewportOrientation(evt.target.value as ViewportOrientation)
        }
      >
        <option value="portrait">portrait</option>
        <option value="landscape">landscape</option>
      </select>
      <SandpackPreview
        viewportOrientation={viewportOrientation}
        viewportSize={viewport}
      />
    </div>
  );
};

export const MultiplePreviews: React.FC = () => {
  const [previewCount, setPreviewCount] = useState(3);

  const previewIndexes = [...Array(previewCount).keys()];

  return (
    <SandpackProvider
      template="react"
      customSetup={{ files: { "/App.js": code1 } }}
    >
      <SandpackThemeProvider>
        <SandpackCodeEditor />

        <button onClick={() => setPreviewCount(previewCount + 1)}>
          Add Preview
        </button>

        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {previewIndexes.map((previewIndex) => (
            <ResponsivePreview key={previewIndex} />
          ))}
        </div>
      </SandpackThemeProvider>
    </SandpackProvider>
  );
};

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  docs: {
    autodocs: true
  },
  core: {
    builder: "@storybook/builder-vite"
  },
  viteFinal: async (config) => {
    // Asegúrate de que Vite pueda resolver los archivos CSS
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': '/src'
      };
    }
    return config;
  }
};

export default config;
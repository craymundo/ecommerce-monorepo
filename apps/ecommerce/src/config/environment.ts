interface Environment {
  stage: "development" | "staging" | "production";
}

const environments: Record<string, Environment> = {
  development: {
    stage: "development",
  },
  staging: {
    stage: "staging",
  },
  production: {
    stage: "production",
  },
};

export const env = environments[import.meta.env.VITE_APP_ENV || "development"];

import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.footballtournament.app",
  appName: "Football Tournament Manager",
  webDir: "out",
  server: {
    androidScheme: "https",
  },
  android: {
    buildOptions: {
      keystorePath: "android/app/football-tournament.keystore",
      keystoreAlias: "football-tournament",
    },
  },
};

export default config;

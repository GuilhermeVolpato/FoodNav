module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@context": "./src/context",
            "@hooks": "./src/hooks",
            "@screens": "./src/screens",
            "@theme": "./src/theme",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};

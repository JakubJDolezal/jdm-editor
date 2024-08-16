{
  lib,
  config,
  dream2nix,
  ...
}: {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-lock-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

nodejs-granular-v3 = {
  runBuild=true;
  buildScript = "npm run build-storybook";
  installMethod = "copy";
};
  mkDerivation = {
    src = lib.cleanSourceWith { # 
      src = lib.cleanSource ./.;
      filter = name: type:
        !(builtins.any (x: x) [
          (lib.hasSuffix ".nix" name)
          (lib.hasSuffix "flake.lock" name)
        ]);
    };

  # configurePhase = lib.mkForce ''
  # '';
  preBuild = ''
  '';
  postBuild = ''
  '';
  buildPhase = ''
  '';
  preInstall = ''
  '';
  postInstall = ''
  '';
   installPhase=  ''
    mkdir -p $out/docs 
    cp -r docs $out/
    mkdir -p $out/bin
    echo '#!/usr/bin/env sh' > $out/bin/consensus-engine
    echo 'http-server $out/docs "$@"' >> $out/bin/consensus-engine
    chmod +x $out/bin/consensus-engine
   '';
   distPhase = ''
   '';
  postFixup = ''
  '';
};

  deps = {nixpkgs, ...}: {
    inherit
      (nixpkgs)
      fetchFromGitHub
      stdenv
      http-server
      ;
  };

  nodejs-package-lock-v3 = {
    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
  };

  name = "consensus-engine";
  version = "0.1.0";
}

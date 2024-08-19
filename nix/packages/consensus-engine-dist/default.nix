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
    runBuild = true;
    installMethod = "copy";
  };
  mkDerivation = {
    src = lib.cleanSourceWith {
      # TODO: Use absolue path
      src = lib.cleanSource ../../..;
      # TODO: purge the nix folder
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
# TODO: use a varialbe for the binaries
    installPhase = ''
      mkdir -p $out/dist
      cp -r dist $out/
      mkdir -p $out/bin
      echo '#! /usr/bin/env nix-shell' > $out/bin/consensus-engine-dist
      echo '#! nix-shell -i bash -p http-server' >> $out/bin/consensus-engine-dist
      echo 'http-server ${placeholder "out"}/dist "$@"' >> $out/bin/consensus-engine-dist
      chmod +x $out/bin/consensus-engine-dist
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

  name = "consensus-engine-dist";
  version = "0.1.0";
}

{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    devenv.url = "github:cachix/devenv";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
  };

  outputs = inputs @ {
    flake-parts,
    nixpkgs,
    process-compose-flake,
    services-flake,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
        process-compose-flake.flakeModule
      ];
      systems = nixpkgs.lib.systems.flakeExposed;
      perSystem = {
        config,
        self',
        inputs',
        pkgs,
        system,
        ...
      }: {
        # Per-system attributes can be defined here. The self' and inputs'
        # module parameters provide easy access to attributes of the same
        # system.

        # Equivalent to  inputs'.nixpkgs.legacyPackages.hello;
        formatter = pkgs.alejandra;
        process-compose."default" = {config, ...}: {
          imports = [
            inputs.services-flake.processComposeModules.default
          ];

          # Add a pgweb process, that knows how to connect to our northwind db
          settings.processes.storybook = let
            pnpm = "${pkgs.corepack}/bin/pnpm";
          in {command = "${pkgs.bash}/bin/bash -c '${pnpm} install && ${pnpm} storybook'";};
        };
        devenv.shells.default = {
          # https://devenv.sh/reference/options/
          packages = [pkgs.hello];
          languages.javascript = {
            enable = true;
            corepack = {
              enable = true;
            };
          };
          enterShell = ''
            hello
          '';
        };
      };
    };
}

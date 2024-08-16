{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    devenv.url = "github:cachix/devenv";
    process-compose-flake.url = "github:Platonic-Systems/process-compose-flake";
    services-flake.url = "github:juspay/services-flake";
    dream2nix.url = "github:nix-community/dream2nix";
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ {
      flake-parts,
      nixpkgs,
      process-compose-flake,
      services-flake,
      dream2nix,
      gitignore,
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
      packages.nodeapp = dream2nix.lib.evalModules {
       packageSets.nixpkgs = pkgs;
        modules = [
          # Import our actual package definiton as a dream2nix module from ./default.nix
          ./default.nix
          {
            # Aid dream2nix to find the project root. This setup should also works for mono
            # repos. If you only have a single project, the defaults should be good enough.
            paths.projectRoot = ./.;
            # can be changed to ".git" or "flake.nix" to get rid of .project-root
            paths.projectRootFile = "flake.nix";
            paths.package = ./.;
          }
        ];
      };
      

# Equivalent to  inputs'.nixpkgs.legacyPackages.hello;
      formatter = pkgs.alejandra;
      process-compose."default" = {config, ...}: {
        imports = [
          inputs.services-flake.processComposeModules.default
        ];

# Add a pgweb process, that knows how to connect to our northwind db
        settings.processes.storybook.command = self'.packages.nodeapp;
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

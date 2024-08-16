{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
    devenv.url = "github:cachix/devenv";
  };

  outputs = inputs @ {
    flake-parts,
    nixpkgs,
    ...
  }:
    flake-parts.lib.mkFlake {inherit inputs;} {
      imports = [
        inputs.devenv.flakeModule
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
        packages.default = pkgs.hello;
        formatter = pkgs.alejandra;

        devenv.shells.default = {
          # https://devenv.sh/reference/options/
          packages = [pkgs.hello];
          languages.javascript = {
            enable = true;
            pnpm = {
              enable = true;
              install.enable = true;
            };
          };
          enterShell = ''
            hello
          '';

          processes.storybook.exec = "pnpm storybook";
        };
      };
    };
}

{
  inputs = {
    utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };
  outputs = {
    self,
    nixpkgs,
    utils,
  }:
    utils.lib.eachDefaultSystem (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config = {
            allowUnfree = true;
          };
        };
        screaming-frog = pkgs.callPackage ./pkgs/screaming-frog.nix {};
      in {
        devShell = pkgs.mkShell {
          name = "my-shell";
          buildInputs = with pkgs; [
            nodejs
            nodePackages.prisma
            prisma-engines
            screaming-frog
          ];
        };
      }
    );
}
